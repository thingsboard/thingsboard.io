SET my.dur = '120';

DROP VIEW  IF EXISTS d;
DROP TABLE IF EXISTS qs;
CREATE TEMP TABLE qs (t timestamptz, rows_written bigint, active int, latched int, queued int);

DO $$
DECLARE
  is_citus bool; act_sql text; rows_sql text;
  u bigint; a int; l int; q int; i int;
BEGIN
  SELECT EXISTS(SELECT 1 FROM pg_extension WHERE extname='citus') INTO is_citus;

  -- guard: sampling the wrong database silently yields all-zero deltas
  IF current_database() <> 'thingsboard' THEN
    RAISE EXCEPTION 'connected to "%"; reconnect with -d thingsboard', current_database();
  END IF;

  IF is_citus THEN
    -- Reference tables are replicated to every node, so they are counted once on
    -- the coordinator rather than summed with the hash shards across workers.
    rows_sql := $q$SELECT (SELECT coalesce(sum(result::bigint),0) FROM run_command_on_workers($w$
                    select coalesce(sum(t.n_tup_ins+t.n_tup_upd),0)
                      from (select pg_stat_clear_snapshot()) c, pg_stat_user_tables t
                      join pg_dist_shard s on t.relname = s.logicalrelid::text||'_'||s.shardid
                      join pg_dist_partition d on d.logicalrelid = s.logicalrelid
                     where d.partmethod = 'h'$w$))
                 + (SELECT coalesce(sum(t.n_tup_ins+t.n_tup_upd),0) FROM pg_stat_user_tables t
                     WHERE NOT EXISTS (SELECT 1 FROM pg_dist_partition d
                                        WHERE d.logicalrelid = t.relid AND d.partmethod = 'h'))$q$;
    act_sql := $a$SELECT count(*),
                         count(*) FILTER (WHERE wait_event_type = 'LWLock'),
                         count(*) FILTER (WHERE wait_event_type = 'Lock')
                  FROM citus_stat_activity
                  WHERE state = 'active'
                    AND datname = current_database()
                    AND global_pid <> citus_backend_gpid()
                    AND application_name NOT LIKE 'citus_run_command%'$a$;
    RAISE NOTICE 'Citus: % (coordinator + all workers)', current_database();
  ELSE
    rows_sql := 'SELECT tup_inserted + tup_updated FROM pg_stat_database WHERE datname=current_database()';
    act_sql  := $a$SELECT count(*),
                          count(*) FILTER (WHERE wait_event_type = 'LWLock'),
                          count(*) FILTER (WHERE wait_event_type = 'Lock')
                   FROM pg_stat_activity
                   WHERE state = 'active'
                     AND datname = current_database()
                     AND pid <> pg_backend_pid()$a$;
    RAISE NOTICE 'standalone Postgres: %', current_database();
  END IF;

  FOR i IN 1..(current_setting('my.dur')::int) LOOP
    PERFORM pg_stat_clear_snapshot();
    EXECUTE rows_sql INTO u;
    EXECUTE act_sql INTO a, l, q;
    INSERT INTO qs VALUES (clock_timestamp(), u, a, l, q);
    PERFORM pg_sleep(1);
  END LOOP;
END $$;

CREATE TEMP VIEW d AS
  SELECT t,
         extract(epoch FROM t - lag(t) OVER (ORDER BY t))          AS secs,
         rows_written - lag(rows_written) OVER (ORDER BY t)        AS drows,
         CASE WHEN active > 0 THEN 100.0*queued/active END        AS pq,
         CASE WHEN active > 0 THEN 100.0*latched/active END       AS pl
  FROM qs;

\echo ''
\echo '  Each row groups the time Postgres spent at that level of heavyweight lock'
\echo '  contention, and the write rate it sustained during that time.'
\echo ''
\echo '    Write rate drops as lock wait rises  ->  Postgres is the bottleneck.'
\echo '    Write rate holds up across all rows  ->  the limit is somewhere else.'
\echo '    wal_latch_pct rises WITH throughput - it is a latch, not a queue.'
\echo '    Ignore rows with a low sample count.'
\echo ''
SELECT CASE WHEN pq <  25 THEN 'under 25%'
            WHEN pq <  50 THEN '25 - 50%'
            WHEN pq <  75 THEN '50 - 75%'
            ELSE               'over 75%' END        AS lock_wait_share,
       count(*)                                      AS samples,
       round(sum(secs))                              AS seconds,
       to_char(sum(drows)/sum(secs),'FM999,999,999') AS rows_written_per_s,
       round(avg(pl))                                AS wal_latch_pct
FROM d WHERE drows IS NOT NULL AND pq IS NOT NULL AND secs > 0
GROUP BY 1 ORDER BY min(pq);