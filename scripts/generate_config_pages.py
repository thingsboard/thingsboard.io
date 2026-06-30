import re
import shutil
import subprocess
import sys
import os


# repo_type -> GitHub <owner>/<repo>. PE / Edge-PE / TBMQ-PE are private;
# fetching relies on the caller's `gh auth login` session.
REPOS = {
    'ce': 'thingsboard/thingsboard',
    'pe': 'thingsboard/thingsboard-pe',
    'tbmq': 'thingsboard/tbmq',
    'tbmq-pe': 'thingsboard/tbmq-pe',
    'edge': 'thingsboard/thingsboard-edge',
    'edge-pe': 'thingsboard/thingsboard-edge-pe',
}


def fetch_file(repo, branch, path):
    """Fetch a single raw file from GitHub via the `gh` CLI.

    Uses the GitHub contents API with the raw media type so it works for both
    public and private repos, authenticating through the user's `gh` session.
    """
    if shutil.which('gh') is None:
        sys.exit("Error: the 'gh' CLI is required but was not found on PATH. "
                 "Install it and run 'gh auth login'.")
    api_path = f'repos/{repo}/contents/{path}?ref={branch}'
    result = subprocess.run(
        ['gh', 'api', api_path, '-H', 'Accept: application/vnd.github.raw'],
        capture_output=True, text=True,
    )
    if result.returncode != 0:
        sys.exit(f"Error: failed to fetch '{path}' from {repo}@{branch}.\n"
                 f"{result.stderr.strip()}")
    return result.stdout


def extract_properties_with_comments(text):
    properties = {}

    lines = text.splitlines(keepends=True)
    index = 0
    key_level_map = {0: ''}
    parse_line('', '', '', key_level_map, 0, index, lines, properties)

    return properties


def parse_line(table_name, table_description, comment, key_level_map, parent_line_level, index, lines, properties, has_section_properties=False, after_empty_comment=False):
    if index >= len(lines):
        return
    line = lines[index]
    line_level = (len(line) - len(line.lstrip())) if line.strip() else 0
    line = line.strip()
    # if line is empty - parse next line
    if not line:
        index = index + 1
        parse_line(table_name, table_description, comment, key_level_map, line_level, index, lines, properties, has_section_properties, after_empty_comment)
    # if line is a comment - save comment and parse next line
    else:
        if line_level == 0:
            key_level_map = {0: ''}
        if line.startswith('#'):
            if line_level == 0:
                comment_text = line.lstrip('#')
                if not comment_text.strip():
                    # Empty '#' line — next level-0 comment must start a new section
                    index = index + 1
                    parse_line(table_name, table_description, comment, key_level_map, line_level, index, lines, properties, has_section_properties, after_empty_comment=True)
                    return
                if has_section_properties or after_empty_comment:
                    # Properties already seen or preceded by an empty comment line —
                    # this comment starts a new section
                    table_name = comment_text
                    table_description = ''
                    has_section_properties = False
                elif table_name:
                    # Name set, no properties yet — append to the description (preserving line breaks)
                    table_description = (table_description + '\n' + comment_text) if table_description else comment_text
                else:
                    # Nothing set yet — this line is the section name
                    table_name = comment_text
                after_empty_comment = False
            elif line_level == parent_line_level:
                comment = comment + '\n' + line.lstrip('#') if comment else line.lstrip('#')
            else:
                comment = line.lstrip('#')
            index = index + 1
            parse_line(table_name, table_description, comment, key_level_map, line_level, index, lines, properties, has_section_properties, after_empty_comment=False)
        else:
            # Check if it's a property line
            if ':' in line:
                # clean comment if level was changed
                if line_level != parent_line_level:
                    comment = ''
                key, value = line.split(':', 1)
                if key.startswith('- '):
                    key = key.lstrip('- ')
                key_level_map[line_level] = key
                value = value.strip()
                if value.split('#')[0]:
                    current_key = ''
                    for k in key_level_map.keys():
                        if k <= line_level:
                            current_key = ((current_key + '.') if current_key else '') + key_level_map[k]
                    properties[current_key] = (value, comment, table_name, table_description)
                    comment = ''
                    has_section_properties = True
                index = index + 1
                parse_line(table_name, table_description, comment, key_level_map, line_level, index, lines, properties, has_section_properties)


def extract_property_info(properties):
    rows = []
    for property_name, value in properties.items():
        if '#' in value[0]:
            value_parts = value[0].split('#')
            comment = value_parts[1]
        else:
            comment = value[1]
        pattern = r'\"\$\{(.*?)\:(.*?)\}\"'
        match = re.match(pattern, value[0])
        table_description = value[3]
        if match is not None:
            rows.append((property_name, match.group(1), match.group(2), comment, value[2], table_description))
        else:
            rows.append((property_name, "", value[0].split('#')[0], comment, value[2], table_description))
    return rows


_HTML_TAG_RE = re.compile(
    r'(</?(?:ul|ol|li|br|p|b|strong|em|i)(?:\s[^>]*)?>)',
    re.IGNORECASE,
)

_URL_RE = re.compile(r'https?://[^\s<>"\'()\[\]]+')


def _escape_mdx(text):
    return (
        text.replace('&', '&amp;')
        .replace('<', '&lt;')
        .replace('>', '&gt;')
        .replace('{', '&#123;')
        .replace('}', '&#125;')
        .replace('_', '&#95;')
        .replace('*', '&#42;')
    )


def _escape_plain_text(text):
    # Escape MDX-special characters, but wrap any http(s):// URLs as {'...'}
    # JSX string expressions so MDX does not auto-link them.
    result = []
    last_end = 0
    for m in _URL_RE.finditer(text):
        url = m.group(0)
        # Drop trailing punctuation that is likely sentence-level, not part of the URL
        while url and url[-1] in '.,;:!?':
            url = url[:-1]
        if not url:
            continue
        start = m.start()
        end = start + len(url)
        result.append(_escape_mdx(text[last_end:start]))
        safe_url = url.replace('\\', '\\\\').replace("'", "\\'")
        result.append("{'" + safe_url + "'}")
        last_end = end
    result.append(_escape_mdx(text[last_end:]))
    return ''.join(result)


def escape_cell(text):
    text = str(text).replace('\n', ' ').strip()
    # Normalize <br> to JSX-compatible self-closing form
    text = re.sub(r'<br\s*/?>', '<br />', text, flags=re.IGNORECASE)
    # Split on known safe HTML tags; preserve them, escape everything else
    parts = _HTML_TAG_RE.split(text)
    result = []
    for i, part in enumerate(parts):
        if i % 2 == 1:  # captured HTML tag — preserve as-is
            result.append(part)
        else:            # plain text — escape MDX-special characters + neutralize URLs
            result.append(_escape_plain_text(part))
    return ''.join(result)


def generate_section(table_name, rows, product='ce'):
    if not any(row[1] for row in rows):
        return ''
    html = f'## {table_name.strip()}\n\n'
    table_description = rows[0][5].strip() if rows and len(rows[0]) > 5 else ''
    if table_description:
        # Preserve multi-line descriptions as <br /> so multi-paragraph banners stay readable
        table_description = table_description.replace('\n', '<br />')
        html += f'<Banner variant="{product}">{escape_cell(table_description)}</Banner>\n\n'
    html += '<div class="config-def-list">\n'
    for row in rows:
        _, env_var, default_val, description = [escape_cell(c) for c in row[:4]]
        if not env_var:
            continue
        html += '  <div class="config-def-item">\n'
        meta_parts = []
        if env_var:
            meta_parts.append(f'<code class="config-def-env">{env_var}</code>')
        if default_val:
            meta_parts.append(f'<span class="config-def-label">Default</span> <code>{default_val}</code>')
        if meta_parts:
            html += f'    <p class="config-def-meta">{" · ".join(meta_parts)}</p>\n'
        if description:
            html += f'    <p class="config-def-desc">{description}</p>\n'
        html += '  </div>\n'
    html += '</div>\n'
    return html


def group_properties_by_table(data):
    property_groups = {}

    for row in data:
        table_name = row[4]

        if table_name not in property_groups:
            property_groups[table_name] = []

        property_groups[table_name].append(row)

    return property_groups


def _find_section(key, default_props):
    """Find the (table_name, table_description) for a key by checking ancestors then siblings in default_props."""
    parts = key.split('.')
    # Walk up the key hierarchy looking for a direct match
    for length in range(len(parts), 0, -1):
        prefix = '.'.join(parts[:length])
        if prefix in default_props:
            return default_props[prefix][2], default_props[prefix][3]
    # Fall back to any sibling under the same parent prefix
    for length in range(len(parts) - 1, 0, -1):
        prefix = '.'.join(parts[:length]) + '.'
        for k, v in default_props.items():
            if k.startswith(prefix):
                return v[2], v[3]
    return '', ''


def _detect_product(output_file):
    """Detect the Banner variant from the output file path."""
    if '/pe/' in output_file:
        return 'pe'
    if '/trendz/' in output_file:
        return 'trendz'
    return 'ce'


def _read_existing_description(output_file):
    """Return the existing 'description:' frontmatter line from output_file, if any.

    These descriptions are hand-curated SEO text the generator cannot derive
    from the YAML, so they must survive regeneration.
    """
    if not os.path.exists(output_file):
        return None
    with open(output_file, 'r') as f:
        lines = f.readlines()
    if not lines or lines[0].strip() != '---':
        return None
    for line in lines[1:]:
        if line.strip() == '---':
            break
        if line.startswith('description:'):
            return line.rstrip('\n')
    return None


def write_page(output_file, sidebar_label, content):
    """Write the generated page, preserving any existing 'description:' frontmatter."""
    description = _read_existing_description(output_file)
    front = f'---\ntitle: {sidebar_label} Configuration\n'
    if description:
        front += description + '\n'
    front += f'sidebar:\n  label: {sidebar_label}\n---\n\n'
    front += "import Banner from '~/components/Banner.astro';\n\n"

    os.makedirs(os.path.dirname(os.path.abspath(output_file)), exist_ok=True)
    with open(output_file, 'w') as f:
        f.write(front)
        f.write(content)


def update_page(repo, branch, input_path, output_file, sidebar_label):
    text = fetch_file(repo, branch, input_path)
    properties = extract_properties_with_comments(text)
    property_info = extract_property_info(properties)
    property_groups = group_properties_by_table(property_info)
    product = _detect_product(output_file)

    content = ''
    for group in property_groups:
        section = generate_section(group, property_groups[group], product)
        if section:
            content += section + '\n'

    write_page(output_file, sidebar_label, content)
    print(f"Generated {output_file} from {repo}@{branch}/{input_path}")


def update_page_from_config(repo, branch, config_dir, output_file, sidebar_label):
    """Like update_page, but reads from two separate node-config files:
    - default.yml: default values and descriptions (inline or block comments)
    - custom-environment-variables.yml: environment variable names
    """
    default_path = f'{config_dir}/default.yml'
    env_path = f'{config_dir}/custom-environment-variables.yml'

    default_props = extract_properties_with_comments(fetch_file(repo, branch, default_path))
    env_props = extract_properties_with_comments(fetch_file(repo, branch, env_path))

    rows = []
    for key, env_data in env_props.items():
        # env_data[0] is the raw value, e.g. '"TB_QUEUE_TYPE" #kafka (Apache Kafka)'
        env_var = env_data[0].split('#')[0].strip().strip('"')
        if not env_var:
            continue

        if key in default_props:
            def_raw, def_comment, table_name, table_description = default_props[key]
            if '#' in def_raw:
                val_part, desc_part = def_raw.split('#', 1)
                default_val = val_part.strip().strip('"')
                description = desc_part.strip()
            else:
                default_val = def_raw.strip().strip('"')
                description = def_comment
        else:
            default_val = ''
            description = ''
            table_name, table_description = _find_section(key, default_props)

        rows.append((key, env_var, default_val, description, table_name, table_description))

    property_groups = group_properties_by_table(rows)
    product = _detect_product(output_file)

    content = ''
    for group in property_groups:
        section = generate_section(group, property_groups[group], product)
        if section:
            content += section + '\n'

    write_page(output_file, sidebar_label, content)
    print(f"Generated {output_file} from {repo}@{branch}/{config_dir}")


# Per repo_type list of pages to generate. Each page is a tuple:
#   ('yml',    <src path in upstream repo>, <output mdx>, <sidebar label>)
#   ('config', <config dir in upstream repo>, <output mdx>, <sidebar label>)
PAGES = {
    'ce': [
        ('yml', 'application/src/main/resources/thingsboard.yml',
         'src/content/docs/docs/reference/configuration/core-rule-engine-config.mdx', 'Core and Rule Engine'),
        ('yml', 'transport/http/src/main/resources/tb-http-transport.yml',
         'src/content/docs/docs/reference/configuration/http-transport-config.mdx', 'HTTP Transport'),
        ('yml', 'transport/mqtt/src/main/resources/tb-mqtt-transport.yml',
         'src/content/docs/docs/reference/configuration/mqtt-transport-config.mdx', 'MQTT Transport'),
        ('yml', 'transport/coap/src/main/resources/tb-coap-transport.yml',
         'src/content/docs/docs/reference/configuration/coap-transport-config.mdx', 'CoAP Transport'),
        ('yml', 'transport/lwm2m/src/main/resources/tb-lwm2m-transport.yml',
         'src/content/docs/docs/reference/configuration/lwm2m-transport-config.mdx', 'LwM2M Transport'),
        ('yml', 'transport/snmp/src/main/resources/tb-snmp-transport.yml',
         'src/content/docs/docs/reference/configuration/snmp-transport-config.mdx', 'SNMP Transport'),
        ('yml', 'msa/vc-executor/src/main/resources/tb-vc-executor.yml',
         'src/content/docs/docs/reference/configuration/vc-executor-config.mdx', 'VC Executor'),
        ('config', 'msa/js-executor/config',
         'src/content/docs/docs/reference/configuration/js-executor-config.mdx', 'JS Executor'),
    ],
    'pe': [
        ('yml', 'application/src/main/resources/thingsboard.yml',
         'src/content/docs/docs/pe/reference/configuration/core-rule-engine-config.mdx', 'Core and Rule Engine'),
        ('yml', 'transport/http/src/main/resources/tb-http-transport.yml',
         'src/content/docs/docs/pe/reference/configuration/http-transport-config.mdx', 'HTTP Transport'),
        ('yml', 'transport/mqtt/src/main/resources/tb-mqtt-transport.yml',
         'src/content/docs/docs/pe/reference/configuration/mqtt-transport-config.mdx', 'MQTT Transport'),
        ('yml', 'transport/coap/src/main/resources/tb-coap-transport.yml',
         'src/content/docs/docs/pe/reference/configuration/coap-transport-config.mdx', 'CoAP Transport'),
        ('yml', 'transport/lwm2m/src/main/resources/tb-lwm2m-transport.yml',
         'src/content/docs/docs/pe/reference/configuration/lwm2m-transport-config.mdx', 'LwM2M Transport'),
        ('yml', 'transport/snmp/src/main/resources/tb-snmp-transport.yml',
         'src/content/docs/docs/pe/reference/configuration/snmp-transport-config.mdx', 'SNMP Transport'),
        ('yml', 'msa/vc-executor/src/main/resources/tb-vc-executor.yml',
         'src/content/docs/docs/pe/reference/configuration/vc-executor-config.mdx', 'VC Executor'),
        ('config', 'msa/js-executor/config',
         'src/content/docs/docs/pe/reference/configuration/js-executor-config.mdx', 'JS Executor'),
        ('yml', 'integration/executor/src/main/resources/tb-integration-executor.yml',
         'src/content/docs/docs/pe/reference/configuration/ie-executor-config.mdx', 'Integration Executor'),
        ('yml', 'report/src/main/resources/tb-report.yml',
         'src/content/docs/docs/pe/reference/configuration/report-service-config.mdx', 'Report Service'),
    ],
    'tbmq': [
        ('yml', 'application/src/main/resources/thingsboard-mqtt-broker.yml',
         'src/content/docs/docs/mqtt-broker/installation/config.mdx', 'TBMQ'),
        ('yml', 'integration/executor/src/main/resources/tbmq-integration-executor.yml',
         'src/content/docs/docs/mqtt-broker/installation/ie-config.mdx', 'Integration Executor'),
    ],
    'tbmq-pe': [
        ('yml', 'application/src/main/resources/thingsboard-mqtt-broker.yml',
         'src/content/docs/docs/mqtt-broker/pe/installation/config.mdx', 'TBMQ'),
        ('yml', 'integration/executor/src/main/resources/tbmq-integration-executor.yml',
         'src/content/docs/docs/mqtt-broker/pe/installation/ie-config.mdx', 'Integration Executor'),
    ],
    'edge': [
        ('yml', 'application/src/main/resources/tb-edge.yml',
         'src/content/docs/docs/edge/installation/config.mdx', 'Edge Configuration'),
    ],
    'edge-pe': [
        ('yml', 'application/src/main/resources/tb-edge.yml',
         'src/content/docs/docs/edge/pe/installation/config.mdx', 'Edge PE Configuration'),
    ],
}


if __name__ == '__main__':
    sys.setrecursionlimit(10000)
    if len(sys.argv) != 3:
        sys.exit("Usage: generate_config_pages.py <repo_type> <branch>\n"
                 "  <repo_type>: " + ", ".join(REPOS.keys()))

    tb_repo_type = sys.argv[1].lower()
    branch = sys.argv[2]

    if tb_repo_type not in REPOS:
        sys.exit(f"Invalid 'repo_type' '{tb_repo_type}'. "
                 f"Choose one of: {', '.join(REPOS.keys())}.")

    repo = REPOS[tb_repo_type]
    for kind, src, output_file, label in PAGES[tb_repo_type]:
        if kind == 'config':
            update_page_from_config(repo, branch, src, output_file, label)
        else:
            update_page(repo, branch, src, output_file, label)
