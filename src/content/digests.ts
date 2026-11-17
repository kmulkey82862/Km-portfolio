// Three automated digests, rebuilt with placeholder clients (a retailer, a law firm, a
// restaurant, and a nonprofit) and placeholder people.
// The panels explain what each one reads and does; the prompts themselves stay private.

export type DigestId = 'team' | 'inbox' | 'chaos';


const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const F = "font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;";
const INK = '#17151a';
const SOFT = '#5f5b64';
const FAINT = '#8d8992';
const RULE = '#eee9ed';

const STATUS: Record<string, [string, string]> = {
  DONE: ['#e6f3eb', '#22784a'],
  'IN PROGRESS': ['#e6edf2', '#4a6274'],
  WAITING: ['#fbf0d9', '#8e6208'],
  'NEEDS DECISION': ['#fbe4e2', '#b0261d'],
  OVERDUE: ['#fbe4e2', '#b0261d'],
  TODAY: ['#fbe6ee', '#a3164f'],
  DUE: ['#fbe6ee', '#a3164f'],
  HIGH: ['#fbe4e2', '#b0261d'],
  MEDIUM: ['#fbf0d9', '#8e6208'],
  LOW: ['#eef0e2', '#5f5c17'],
};
const pill = (label: string) => {
  const [bg, fg] = STATUS[label] ?? ['#eeeaee', SOFT];
  return `<span style="display:inline-block;background:${bg};color:${fg};border-radius:999px;padding:3px 9px;${F}font-size:10px;font-weight:bold;letter-spacing:.6px;white-space:nowrap">${label}</span>`;
};

function shell(o: { title: string; sub: string; date: string; accent: string; stats: [string, string][]; body: string; footer: string }) {
  const stats = o.stats
    .map(
      ([n, l], i) =>
        `<td align="center" width="${Math.floor(100 / o.stats.length)}%" style="padding:14px 6px;${i ? `border-left:1px solid ${RULE};` : ''}"><div style="${F}font-size:24px;font-weight:bold;color:${INK};line-height:1">${n}</div><div style="${F}font-size:10px;letter-spacing:1px;text-transform:uppercase;color:${FAINT};padding-top:6px">${l}</div></td>`,
    )
    .join('');
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;background:#f2f0f2">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 10px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#fff;border:1px solid #e6e1e5;border-radius:14px;overflow:hidden">
<tr><td style="height:5px;font-size:0;line-height:0;background:${o.accent}">&nbsp;</td></tr>
<tr><td style="padding:22px 32px 0">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
<td style="${F}font-size:10.5px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:#a3164f">Client name</td>
<td align="right" style="${F}font-size:12px;color:${FAINT}">${o.date}</td></tr></table>
<div style="${F}font-size:30px;line-height:1.15;font-weight:bold;letter-spacing:-.5px;color:${INK};padding:14px 0 6px">${o.title}</div>
<div style="${F}font-size:14px;line-height:1.5;color:${SOFT}">${o.sub}</div>
</td></tr>
<tr><td style="padding:18px 32px 4px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8f6f8;border-radius:10px"><tr>${stats}</tr></table></td></tr>
${o.body}
<tr><td style="padding:20px 32px 24px;border-top:1px solid ${RULE};${F}font-size:11.5px;line-height:1.6;color:${FAINT}">${o.footer}<br>Written by a scheduled Claude task. Links are disabled in this preview.</td></tr>
</table></td></tr></table></body></html>`;
}

const callout = (label: string, text: string, accent: string) =>
  `<tr><td style="padding:16px 32px 4px"><div style="border-left:3px solid ${accent};background:#fbf8fa;border-radius:0 8px 8px 0;padding:12px 16px;${F}font-size:14px;line-height:1.55;color:${SOFT}"><strong style="color:${INK}">${label}</strong> ${text}</div></td></tr>`;

const heading = (label: string, right = '') =>
  `<tr><td style="padding:24px 32px 8px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid ${RULE}"><tr>
<td style="padding:0 0 10px;${F}font-size:16px;font-weight:bold;color:${INK}">${label}</td>
<td align="right" style="padding:0 0 10px;${F}font-size:12px;color:${FAINT}">${right}</td></tr></table></td></tr>`;

const row = (title: string, detail: string, tag?: string) =>
  `<tr><td style="padding:0 32px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid ${RULE}"><tr>
<td style="padding:11px 0">${tag ? `${pill(tag)}&nbsp; ` : ''}<span style="${F}font-size:14px;font-weight:bold;color:${INK}">${esc(title)}</span>
<div style="${F}font-size:13px;line-height:1.5;color:${SOFT};padding-top:3px">${esc(detail)}</div></td></tr></table></td></tr>`;

const button = (label: string, kind: 'primary' | 'outline' | 'text') => {
  const st =
    kind === 'primary'
      ? 'background:#772450;color:#fff;border:1px solid #772450'
      : kind === 'outline'
        ? `background:#fff;color:#772450;border:1px solid #d9b7c6`
        : `background:transparent;color:${FAINT};border:1px solid transparent`;
  return `<a href="#" style="display:inline-block;${st};border-radius:7px;padding:7px 13px;${F}font-size:12px;font-weight:bold;text-decoration:none;margin:10px 6px 0 0">${label}</a>`;
};

// ---------- 1. Team weekly digest: client-by-client overview ----------
function teamEmail() {
  const clients: [string, [string, string, string][]][] = [
    ['Retail client', [
      ['Holiday sale landing page', 'Live since Thursday. Conversions are up week over week.', 'DONE'],
      ['Google Ads budget shift', 'Moving spend from Search to Performance Max for the holiday push.', 'IN PROGRESS'],
      ['Product feed errors', 'Twelve products rejected in Merchant Center. Client to choose: fix the titles or pause them.', 'NEEDS DECISION'],
    ]],
    ['Law firm client', [
      ['Intake form automation', 'New consultation requests now land in the CRM with a follow-up task. Testing with the paralegals.', 'IN PROGRESS'],
      ['Review request emails', 'Template with the managing partner for approval since Monday.', 'WAITING'],
    ]],
    ['Restaurant client', [
      ['New menu photos', 'Uploaded to the website and the Google Business Profile.', 'DONE'],
      ['Weekend reservation dip', 'Bookings down 18% since the hours change. Options: a promo email or an Instagram push.', 'NEEDS DECISION'],
    ]],
    ['Nonprofit client', [
      ['Year-end giving campaign', 'Email series drafted. Donation page is in review.', 'IN PROGRESS'],
      ['Board report dashboard', 'Waiting on access to last year’s donor data before it can be finished.', 'WAITING'],
    ]],
  ];
  const body =
    callout('This week:', 'two decisions are waiting on clients (the retailer and the restaurant), and the nonprofit’s year-end email series starts Monday.', '#8fa6b6') +
    clients
      .map(([name, items]) => heading(name, `${items.length} updates`) + items.map(([t, d, tag]) => row(t, d, tag)).join(''))
      .join('');
  return shell({
    title: 'Weekly Team Digest',
    sub: 'Every client on one page: what’s done, in progress, waiting, and needing a decision.',
    date: 'Mon, Nov 9 · 8:00 AM',
    accent: '#8fa6b6',
    stats: [['4', 'Clients'], ['9', 'Updates'], ['2', 'Decisions'], ['2', 'Done']],
    body,
    footer: 'Sources: project board, shared inboxes, meeting summaries, calendars, and client notes.',
  });
}

// ---------- 2. Shared inbox triage ----------
function inboxEmail() {
  const rows: [string, string, string, string, string][] = [
    ['Retail client', 'Customer asking where their online order is', 'Jane Doe', 'Today', 'HIGH'],
    ['Law firm client', 'New client asking for a consultation time', 'John Doe', 'Today', 'HIGH'],
    ['Restaurant client', 'Private event inquiry for 40 guests', 'Sam Lee', 'Tomorrow', 'MEDIUM'],
    ['Nonprofit client', 'Donor asking for a tax receipt', 'Alex Smith', 'Tomorrow', 'MEDIUM'],
    ['Retail client', 'Vendor following up on a wholesale quote', 'Jane Doe', 'This week', 'LOW'],
  ];
  const initials = (n: string) => n.split(' ').map((w) => w[0]).join('');
  const th = `${F}font-size:10px;letter-spacing:1px;text-transform:uppercase;color:${FAINT};padding:9px 10px;text-align:left;font-weight:normal`;
  const table =
    `<tr><td style="padding:0 32px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${RULE};border-radius:10px;border-collapse:separate;overflow:hidden">
<tr style="background:#f8f6f8"><th style="${th}">Client</th><th style="${th}">Request</th><th style="${th}">Owner</th><th style="${th}">Due</th></tr>` +
    rows
      .map(
        ([c, r, o, d, p]) =>
          `<tr><td style="padding:11px 10px;border-top:1px solid ${RULE};white-space:nowrap;${F}font-size:12.5px;color:${INK}">${c}</td>
<td style="padding:11px 10px;border-top:1px solid ${RULE};${F}font-size:13px;line-height:1.45;color:${INK}">${esc(r)}<div style="padding-top:5px">${pill(p)}</div></td>
<td style="padding:11px 10px;border-top:1px solid ${RULE};white-space:nowrap;${F}font-size:12.5px;color:${SOFT}"><span style="display:inline-block;width:22px;height:22px;line-height:22px;text-align:center;border-radius:50%;background:#efe9ee;color:#772450;font-size:9.5px;font-weight:bold;margin-right:6px">${initials(o)}</span>${o}</td>
<td style="padding:11px 10px;border-top:1px solid ${RULE};white-space:nowrap;${F}font-size:12.5px;color:${SOFT}">${d}</td></tr>`,
      )
      .join('') +
    `</table><div style="${F}font-size:12px;line-height:1.5;color:${FAINT};padding:10px 0 0">Each request was logged to the tracking sheet and assigned by the routing rules. Owners were notified and tasks created with due dates.</div></td></tr>`;
  const body =
    callout('Today:', 'five new requests, two of them high priority. One older request is overdue and has been escalated.', '#d58aa3') +
    heading('New and assigned', '5 requests') +
    table +
    heading('Still open from earlier', '2 requests') +
    row('Donor portal login issue', 'Asked three times since last week. Escalated to the team lead.', 'OVERDUE') +
    row('Gift card refund request', 'Waiting on the retail client to approve the refund.', 'WAITING') +
    heading('Closed since yesterday', '7 requests') +
    row('Seven requests resolved', 'Marked complete in the sheet after a reply was found in the inbox.', 'DONE');
  return shell({
    title: 'Shared Inbox Triage',
    sub: 'Nothing falls through the cracks: every new request logged, assigned, and checked against replies.',
    date: 'Tue, Nov 10 · 7:00 AM',
    accent: '#d58aa3',
    stats: [['5', 'New'], ['3', 'Still open'], ['7', 'Closed'], ['1', 'Overdue']],
    body,
    footer: 'Sources: the shared inbox, the tracking sheet, and the team roster and routing rules.',
  });
}

// ---------- 3. Katelyn's Chaos Brief ----------
function chaosEmail() {
  const updates: [string, string, string, string][] = [
    ['Restaurant client', 'Weekend brunch email', 'Status: Drafting → Sent', 'Sent this morning to the full list. Results will be in Friday’s report.'],
    ['Retail client', 'New item: Holiday gift guide page', 'Create item · Owner: Katelyn', 'Product list approved by the client. Layout in progress.'],
    ['Law firm client', 'Intake automation', 'Add update', 'Second round of testing done. Two edge cases left before launch.'],
  ];
  const updateCards = updates
    .map(
      ([c, title, change, comment]) =>
        `<tr><td style="padding:0 32px 10px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${RULE};border-radius:12px"><tr><td style="padding:14px 16px">
<div style="${F}font-size:12px;color:${FAINT}"><strong style="color:${INK}">${c}</strong> · ${esc(change)}</div>
<div style="${F}font-size:15px;font-weight:bold;color:${INK};padding:9px 0 6px">${esc(title)}</div>
<div style="${F}font-size:13px;line-height:1.55;color:${SOFT};background:#f8f6f8;border-radius:8px;padding:9px 12px">“${esc(comment)}”</div>
${button('Post update', 'primary')}${button('Edit first', 'outline')}${button('Skip', 'text')}
</td></tr></table></td></tr>`,
    )
    .join('');
  const time =
    `<tr><td style="padding:4px 32px 0"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">` +
    [
      ['Retail client', '2h 40m', 'Logged'],
      ['Restaurant client', '1h 55m', 'Logged'],
      ['Law firm client', '1h 10m', 'No update posted yet'],
      ['Internal', '0h 45m', 'Logged'],
    ]
      .map(
        ([c, h, s]) =>
          `<tr><td style="padding:7px 0;border-bottom:1px solid ${RULE};${F}font-size:13px;color:${INK}">${c}</td><td style="padding:7px 0;border-bottom:1px solid ${RULE};${F}font-size:13px;font-weight:bold;color:${INK}">${h}</td><td align="right" style="padding:7px 0;border-bottom:1px solid ${RULE};${F}font-size:12px;color:${s.startsWith('No') ? '#b0261d' : FAINT}">${s}</td></tr>`,
      )
      .join('') +
    `</table><div style="${F}font-size:12px;line-height:1.5;color:${FAINT};padding-top:8px">From the time tracker. The law firm has time logged but no update on the board, so one is drafted below.</div></td></tr>`;
  const body =
    callout('At a glance:', 'your sharpest deadline is the restaurant’s brunch email, due to send today, and the retail client asked for gift guide copy in chat yesterday afternoon.', '#a3164f') +
    heading('What you were asked to do', '2 items') +
    row('Gift guide copy for the retail client', 'Asked in a direct chat message yesterday at 4:10 PM.', 'TODAY') +
    row('Send the nonprofit their dashboard login', 'Assigned to you in the shared inbox tracker.', 'TODAY') +
    heading('Content calendar', '2 sends') +
    row('Restaurant brunch email sends today', 'Still marked Drafting in the email platform, not scheduled.', 'DUE') +
    row('Nonprofit giving-day post', 'The scheduled date was yesterday.', 'OVERDUE') +
    heading('Meetings', '2 today') +
    row('10:00 Law firm check-in · 2:30 team sync', 'Prep note: bring the intake testing results to the check-in.') +
    heading('Who’s waiting on you', '2 people') +
    row('Two teammates', 'Jane is waiting on photo selects; John needs your sign-off on the holiday ad copy.', 'WAITING') +
    heading('Time review', 'Yesterday') +
    time +
    heading('Board updates ready for review', '3 drafts') +
    `<tr><td style="padding:2px 32px 10px;${F}font-size:12px;color:${FAINT}">Nothing posts until you choose. The text is exactly what would post.</td></tr>` +
    updateCards;
  return shell({
    title: 'Katelyn’s Chaos Brief',
    sub: 'Only what needs me, sorted before the day starts, with board updates already drafted.',
    date: 'Tue, Nov 10 · 7:00 AM',
    accent: '#a3164f',
    stats: [['3', 'Inbox'], ['4', 'Chat'], ['2', 'Comms'], ['3', 'Meetings']],
    body,
    footer: 'Sources: email, team chat, the project board, calendars, content calendars, meeting summaries, notes, and the time tracker.',
  });
}

export const DIGESTS: Record<DigestId, { label: string; cadence: string; build: () => string; reads: string[]; does: string[]; why: string }> = {
  team: {
    label: 'Weekly Team Digest',
    cadence: 'Weekly · whole team',
    build: teamEmail,
    reads: ['Project management boards', 'Shared inboxes', 'Meeting summaries from the week', 'Calendars', 'Ongoing client notes docs'],
    does: [
      'Builds a client-by-client overview: what’s done, in progress, waiting, and needing a decision.',
      'Leads with a one-line “this week” summary so the most important thing is never buried.',
    ],
    why: 'Status for several long-running client projects lived across boards, inboxes, meeting summaries, and calendars. This condenses all of it into a one-page brief the whole team can read in a few minutes. Getting there took many rounds of prompting and refinement in Claude, with my direction on what to include, what to cut, and what order it goes in.',
  },
  inbox: {
    label: 'Shared Inbox Triage',
    cadence: 'Daily · team',
    build: inboxEmail,
    reads: ['The shared inbox', 'The tracking sheet', 'Team roster and routing rules'],
    does: [
      'Logs each new request to a shared tracking sheet and assigns an owner using criteria I defined.',
      'Can notify the owner by email and create a task in the project management system with a due date.',
      'Checks the next day for a reply and closes the request, or flags it as overdue.',
    ],
    why: 'A busy shared inbox, condensed into a short daily brief: what came in, who owns it, and what’s overdue. When many people work one inbox, the risk is assuming someone else replied. I wrote the routing rules and refined the output over several iterations, and more triggers can be added as the team needs them.',
  },
  chaos: {
    label: 'Katelyn’s Chaos Brief',
    cadence: 'Daily · just me',
    build: chaosEmail,
    reads: ['My inbox and the shared inbox', 'Team chat, including direct messages', 'Project board', 'Calendar and comms calendars', 'Meeting summaries and notes docs', 'My time tracker'],
    does: [
      'Pulls out what I was asked to do, what’s due in the comms calendars, my meetings, and who’s waiting on me.',
      'Reviews tracked time against the project board and pre-drafts the updates I haven’t posted, with buttons to post, edit, or skip.',
      'Team chat isn’t something Claude connects to on its own, so I found and set up a tool that lets it read chat alongside email.',
    ],
    why: 'Everything across email, team chat, the project board, and calendars, condensed into a brief of only what needs me. Our team moved fast and a lot happened in chat, so things got lost. I refined it over many prompts, with specific direction at each step, until it worked as a supercharged to-do list that keeps the project board honest.',
  },
};

