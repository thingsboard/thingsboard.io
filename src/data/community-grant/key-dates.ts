// The two fixed dates `/community-grant-program/` names, in the page body and
// inside FAQ answers alike. They live here for the same reason the announcement
// day does: each is stated several times across two files, and a date that moves
// must not leave a copy behind — nothing in the build would catch it, and the
// page would simply show two different deadlines.
//
// Display strings, because both are rendered as prose; the ISO form is for the
// `datetime` attributes on the key-dates timeline. Unlike the announcement day
// these are known, so they are plain constants rather than a rendered fragment.

/**
 * Registration closes. The same day 4.3 LTS stops receiving security updates and
 * grandfathered branding rights can no longer be registered — the page presents
 * all three as one date, so they share one constant.
 */
export const REGISTRATION_CLOSES = 'July 20, 2027';
export const REGISTRATION_CLOSES_ISO = '2027-07-20';

/** Community Edition 4.2 LTS stops receiving security updates. */
export const LTS_4_2_EOL = 'February 15, 2027';
export const LTS_4_2_EOL_ISO = '2027-02-15';
