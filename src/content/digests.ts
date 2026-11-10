// Three automated digests, rebuilt with placeholder clients (Client A–D) and people.
// The panels explain what each one reads and does; the prompts themselves stay private.

export type DigestId = 'team' | 'inbox' | 'chaos';

const CLIENT_COLORS: Record<string, string> = { 'Client A': '#8fa6b6', 'Client B': '#d58aa3', 'Client C': '#772450', 'Client D': '#7f7c1e' };

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const F = 'font-family:Helvetica,Arial,sans-serif;';

function shell(kicker: string, title: string, sub: string, accent: string, body: string, footer: string) {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;background:#f4f3ef">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:22px 10px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#fff;border-radius:14px;overflow:hidden">
<tr><td style="height:6px;font-size:0;background:linear-gradient(90deg,#8fa6b6 0 25%,#d58aa3 25% 50%,#772450 50% 75%,#7f7c1e 75%)">&nbsp;</td></tr>
<tr><td style="background:#14171a;padding:30px 34px">
<div style="${F}font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:${accent}">${kicker}</div>
<div style="${F}font-size:27px;line-height:1.25;color:#fff;font-weight:300;padding:10px 0 8px">${title}</div>
<div style="${F}font-size:13px;color:#9aa0a6">${sub}</div>
</td></tr>
${body}
<tr><td style="padding:18px 34px;border-top:1px solid #eceae4;${F}font-size:12px;color:#9a9a92;text-align:center">${footer}</td></tr>
</table></td></tr></table></body></html>`;
}

const chip = (label: string, bg: string, fg = '#fff') =>
  `<span style="display:inline-block;background:${bg};color:${fg};border-radius:20px;padding:5px 12px;${F}font-size:11px;font-weight:bold;letter-spacing:.5px;margin:0 6px 6px 0">${label}</span>`;

const section = (label: string, color: string, inner: string) =>
  `<tr><td style="padding:24px 34px 4px">${chip(label, color)}</td></tr><tr><td style="padding:6px 34px 6px">${inner}</td></tr>`;

const card = (title: string, detail: string, color: string, tag?: string, tagColor = '#b23b00') =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafaf8;border-radius:10px;margin-bottom:9px"><tr>
<td width="4" style="background:${color}">&nbsp;</td><td style="padding:13px 16px">
<span style="${F}font-size:14.5px;font-weight:bold;color:#14171a">${esc(title)}</span>${tag ? `<span style="${F}font-size:10px;font-weight:bold;letter-spacing:.5px;color:${tagColor};padding-left:8px">${tag}</span>` : ''}
<div style="${F}font-size:13px;line-height:1.55;color:#55595e;padding-top:4px">${esc(detail)}</div></td></tr></table>`;

const button = (label: string, bg: string, fg = '#fff') =>
  `<a href="#" style="display:inline-block;background:${bg};color:${fg};border-radius:6px;padding:7px 12px;${F}font-size:12px;font-weight:bold;text-decoration:none;margin:8px 6px 0 0">${label}</a>`;

// ---------- 1. Team weekly digest: client-by-client overview ----------
function teamEmail() {
  const clients: [string, [string, string, string?][]][] = [
    ['Client A', [
      ['Registration opened on schedule', 'Early registrations are tracking ahead of last year. Confirmation emails verified.', 'DONE'],
      ['Speaker confirmations', '31 of 40 confirmed. Reminder goes out Tuesday to the remaining nine.', 'IN PROGRESS'],
      ['Decision needed: keynote order', 'Raised in Thursday’s client call. Client wants options by Friday.', 'NEEDS DECISION'],
    ]],
    ['Client B', [
      ['Call for sessions closes this week', 'Four proposals so far. Plan: one more push to smaller member organizations.', 'IN PROGRESS'],
      ['Sponsor prospectus v2', 'With the client for review since Monday. Follow up Wednesday if no reply.', 'WAITING'],
    ]],
    ['Client C', [
      ['Website launch', 'Staging site shared with the team. Collecting feedback before launch.', 'IN PROGRESS'],
      ['Platform recommendation', 'Two vendor demos done; itemized quotes requested. Decision due before renewal.', 'NEEDS DECISION'],
    ]],
    ['Client D', [
      ['Post-event recordings', 'All sessions uploaded and the archive page is live.', 'DONE'],
      ['Planning call time', 'Invite and client options show different time zones. Confirm before Thursday.', 'WAITING'],
    ]],
  ];
  const tagColor: Record<string, string> = { DONE: '#2f9e62', 'IN PROGRESS': '#6b7a86', WAITING: '#c68a12', 'NEEDS DECISION': '#d0342c' };
  const body =
    `<tr><td style="padding:18px 34px;background:#f3f6f8;border-bottom:1px solid #e4e8ec;${F}font-size:14px;line-height:1.5;color:#14171a"><strong>This week:</strong> <span style="color:#55595e">two decisions are waiting on clients (A and C), and Client B’s call for sessions closes Friday.</span></td></tr>` +
    clients
      .map(([name, items]) =>
        section(name, CLIENT_COLORS[name], items.map(([t, d, tag]) => card(t, d, CLIENT_COLORS[name], tag, tag ? tagColor[tag] : undefined)).join('')),
      )
      .join('');
  return shell('Client name', 'Weekly team digest', 'Every client, one page. Monday morning · sent to the whole team', '#c9d6df', body, 'Compiled from project boards, inboxes, meeting summaries, calendars, and client notes docs.');
}

// ---------- 2. Shared inbox triage ----------
function inboxEmail() {
  const rows: [string, string, string, string, string][] = [
    ['Client A', 'Exhibitor asking how to upload booth materials', 'Jane Doe', 'Today', 'High'],
    ['Client B', 'Sponsor requesting an invoice copy', 'John Doe', 'Tomorrow', 'Medium'],
    ['Client A', 'Attendee missing from the pre-event list', 'Sam Lee', 'Today', 'High'],
    ['Client C', 'Vendor follow-up on quote', 'Alex Smith', 'This week', 'Low'],
    ['Client D', 'Speaker asking for their recording link', 'Jane Doe', 'Tomorrow', 'Medium'],
  ];
  const pc: Record<string, string> = { High: '#d0342c', Medium: '#c68a12', Low: '#8a8363' };
  const table =
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="${F}font-size:12.5px;border:1px solid #eceae4;border-radius:8px;overflow:hidden">
<tr style="background:#f6f5f1;color:#7d7880;text-transform:uppercase;font-size:10px;letter-spacing:1px"><td style="padding:9px 10px">Client</td><td style="padding:9px 10px">Request</td><td style="padding:9px 10px">Owner</td><td style="padding:9px 10px">Due</td></tr>` +
    rows
      .map(
        ([c, r, o, d, p]) =>
          `<tr style="border-top:1px solid #eceae4"><td style="padding:9px 10px;white-space:nowrap"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${CLIENT_COLORS[c]};margin-right:6px"></span>${c}</td><td style="padding:9px 10px;color:#14171a">${esc(r)} <span style="color:${pc[p]};font-weight:bold;font-size:10px">${p.toUpperCase()}</span></td><td style="padding:9px 10px;white-space:nowrap">${o}</td><td style="padding:9px 10px;white-space:nowrap;color:#55595e">${d}</td></tr>`,
      )
      .join('') +
    `</table>`;
  const body =
    `<tr><td style="padding:16px 34px 0">${chip('NEW TODAY 5', '#d0342c')}${chip('STILL OPEN 3', '#8fa6b6')}${chip('CLOSED 7', '#2f9e62')}</td></tr>` +
    section('Logged and assigned', '#14171a', table + `<div style="${F}font-size:12px;color:#7d7880;padding-top:8px">Every row was added to the shared tracking sheet and assigned by the routing rules. Owners were notified and tasks created with due dates.</div>`) +
    section('Still open from earlier', '#8fa6b6',
      card('Exhibitor portal questions', 'Asked three times since last week. Escalated to the team lead.', '#8fa6b6', 'OVERDUE', '#d0342c') +
      card('Payment form for a sponsor', 'Waiting on the client to confirm which forms they need.', '#8fa6b6', 'WAITING', '#c68a12')) +
    section('Closed since yesterday', '#2f9e62', card('7 requests resolved', 'Marked complete in the sheet after a reply was found in the inbox.', '#2f9e62'));
  return shell('Client name', 'Shared inbox · daily triage', 'Nothing falls through the cracks. Every weekday at 7 AM · sent to the team', '#f3d2dc', body, 'Requests are logged to a tracking sheet, assigned by rule, and checked against replies the next day.');
}

// ---------- 3. Katelyn's Chaos Brief ----------
function chaosEmail() {
  const updates: [string, string, string, string][] = [
    ['Client B', 'Sponsor spotlight email', 'Status: Drafting → Sent', 'Sent this morning to the full list. Results will be in Friday’s report.'],
    ['Client A', 'NEW: Lounge branding', 'Create item · Owner: Katelyn · Working on it', 'Wording approved by the client. Layout in progress with the vendor.'],
    ['Client C', 'Platform recommendation', 'Add update', 'Second demo done; quote requested for 800 registrants. Decision due before renewal.'],
  ];
  const updateCards = updates
    .map(
      ([c, title, change, comment], i) =>
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eceae4;border-radius:10px;margin-bottom:10px"><tr><td style="padding:14px 16px">
<div style="${F}font-size:11px;color:#7d7880">${i + 1}. <span style="color:${CLIENT_COLORS[c]};font-weight:bold">${c}</span> · ${esc(change)}</div>
<div style="${F}font-size:14.5px;font-weight:bold;color:#14171a;padding:4px 0">${esc(title)}</div>
<div style="${F}font-size:13px;line-height:1.5;color:#55595e;background:#fafaf8;border-left:3px solid #c9d6df;padding:8px 10px">“${esc(comment)}”</div>
${button('Post update', '#772450')}${button('Edit first', '#f3d2dc', '#5e1b3e')}${button('Skip', '#eceae4', '#55595e')}
</td></tr></table>`,
    )
    .join('');
  const time =
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="${F}font-size:13px">` +
    [
      ['Client A', '2h 40m', 'Logged'],
      ['Client B', '1h 55m', 'Logged'],
      ['Client C', '1h 10m', 'No update posted yet'],
      ['Internal', '0h 45m', 'Logged'],
    ]
      .map(
        ([c, h, s]) =>
          `<tr><td style="padding:6px 0;width:110px"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${CLIENT_COLORS[c] ?? '#14171a'};margin-right:6px"></span>${c}</td><td style="padding:6px 0;font-weight:bold">${h}</td><td style="padding:6px 0;color:${s.startsWith('No') ? '#d0342c' : '#7d7880'}">${s}</td></tr>`,
      )
      .join('') +
    `</table>`;
  const body =
    `<tr><td style="padding:16px 34px 0">${chip('INBOX 3', '#8fa6b6')}${chip('CHAT 4', '#d58aa3')}${chip('COMMS 2', '#d0342c')}${chip('MEETINGS 3', '#14171a')}${chip('WAITING ON YOU 2', '#7f7c1e')}</td></tr>` +
    `<tr><td style="padding:14px 34px;${F}font-size:14px;line-height:1.5"><strong>At a glance:</strong> <span style="color:#55595e">Your sharpest deadline is a Client B email due to send today. Your supervisor asked for the agenda draft in chat yesterday afternoon.</span></td></tr>` +
    section('What you were asked to do', '#d58aa3',
      card('Agenda draft for Client A', 'Asked in a direct chat message from your supervisor yesterday at 4:10 PM.', '#d58aa3', 'TODAY') +
      card('Send a sponsor their invoice copy', 'Assigned to you in the shared inbox tracker.', '#d58aa3', 'TODAY')) +
    section('Comms calendar', '#d0342c',
      card('Client B sponsor spotlight sends today', 'Still marked Drafting in the email platform, not scheduled.', '#d0342c', 'DUE') +
      card('Client A reception invite is a day overdue', 'Send date was yesterday.', '#d0342c', 'OVERDUE')) +
    section('Meetings', '#14171a', card('10:00 Client C check-in · 2:30 team sync', 'Prep note: bring the platform quote comparison to the check-in.', '#14171a')) +
    section('Who’s waiting on you', '#7f7c1e', card('Two teammates', 'Jane is waiting on logo files; John needs your sign-off on the program book ad.', '#7f7c1e')) +
    section('Time review', '#8fa6b6', time + `<div style="${F}font-size:12px;color:#7d7880;padding-top:6px">From your time tracker. Client C has time logged but no update in the project board, so one is drafted below.</div>`) +
    section('Project board updates ready for review', '#772450', `<div style="${F}font-size:12px;color:#7d7880;padding-bottom:8px">Nothing is posted until you choose. The comment text is exactly what would post.</div>` + updateCards);
  return shell('Client name', 'Katelyn’s Chaos Brief', 'Only what needs you, sorted before the day starts. Every weekday at 7 AM · sent only to me', '#e0457f', body, 'Reads email, team chat, the project board, calendars, comms calendars, meeting summaries, notes docs, and the time tracker.');
}

export const DIGESTS: Record<DigestId, { label: string; cadence: string; build: () => string; reads: string[]; does: string[]; why: string }> = {
  team: {
    label: 'Team weekly digest',
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
    label: 'Shared inbox triage',
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

