// Three automated digests, rebuilt with placeholder clients (a retailer, a law firm, a
// restaurant, and a nonprofit) and placeholder people. Each has its own look on purpose:
// the team digest is branded Web Deva Digital, the inbox triage reads like an ops
// dashboard, and the daily brief is a warm personal morning note. All markup is
// table-based with inline styles so it survives real email clients.

export type DigestId = 'team' | 'inbox' | 'chaos';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const F = "font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;";

const page = (bg: string, inner: string) => `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;background:${bg}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:28px 12px">
${inner}
</td></tr></table></body></html>`;

const fine = (color: string) =>
  `<span style="color:${color}">Written by a scheduled Claude task. Links are disabled in this preview.</span>`;

// =====================================================================
// 1. Weekly Team Digest — Web Deva Digital brand
// =====================================================================
const WD = {
  pink: '#f0429a', pinkSoft: '#ff7ab6', blush: '#ffe3ef', blushDeep: '#ffc7de', berry: '#a3134f',
  green: '#d8e96f', greenPale: '#f3f8d4', greenDeep: '#4f5c0e',
  cerulean: '#1c8ad4', ceruleanDeep: '#0b5c94', ceruleanPale: '#dff0fb',
  ink: '#141414', muted: '#5c4652', paper: '#fbf8f5', line: '#f4b6d1',
};
const WDF = "font-family:'Helvetica Now Display','Helvetica Neue',Helvetica,Arial,sans-serif;";

const wdPill = (label: string) => {
  const map: Record<string, [string, string]> = {
    DONE: [WD.greenPale, WD.greenDeep],
    'IN PROGRESS': [WD.ceruleanPale, WD.ceruleanDeep],
    WAITING: [WD.blush, WD.berry],
    'NEEDS DECISION': [WD.pink, WD.ink],
  };
  const [bg, fg] = map[label] ?? [WD.blush, WD.berry];
  return `<span style="display:inline-block;background:${bg};color:${fg};border:1.5px solid ${fg === WD.ink ? WD.ink : bg};border-radius:999px;padding:3px 10px;${WDF}font-size:10px;font-weight:bold;letter-spacing:1.2px;white-space:nowrap">${label}</span>`;
};

function teamEmail() {
  const clients: [string, string, [string, string, string][]][] = [
    ['Retail client', WD.pink, [
      ['Holiday sale landing page', 'Live since Thursday. Conversions are up week over week.', 'DONE'],
      ['Google Ads budget shift', 'Moving spend from Search to Performance Max for the holiday push.', 'IN PROGRESS'],
      ['Product feed errors', 'Twelve products rejected in Merchant Center. Client to choose: fix the titles or pause them.', 'NEEDS DECISION'],
    ]],
    ['Law firm client', WD.cerulean, [
      ['Intake form automation', 'New consultation requests now land in the CRM with a follow-up task. Testing with the paralegals.', 'IN PROGRESS'],
      ['Review request emails', 'Template with the managing partner for approval since Monday.', 'WAITING'],
    ]],
    ['Restaurant client', WD.green, [
      ['New menu photos', 'Uploaded to the website and the Google Business Profile.', 'DONE'],
      ['Weekend reservation dip', 'Bookings down 18% since the hours change. Options: a promo email or an Instagram push.', 'NEEDS DECISION'],
    ]],
    ['Nonprofit client', WD.pinkSoft, [
      ['Year-end giving campaign', 'Email series drafted. Donation page is in review.', 'IN PROGRESS'],
      ['Board report dashboard', 'Waiting on access to last year’s donor data before it can be finished.', 'WAITING'],
    ]],
  ];
  const stats: [string, string, string][] = [
    ['4', 'Clients', WD.blushDeep],
    ['9', 'Updates', WD.ceruleanPale],
    ['2', 'Decisions', WD.pink],
    ['2', 'Done', WD.green],
  ];
  const statTiles = stats
    .map(
      ([n, l, bg]) =>
        `<td width="25%" style="padding:0 4px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${bg};border:2px solid ${WD.ink};border-radius:14px"><tr><td align="center" style="padding:14px 2px">
<div style="${WDF}font-size:30px;font-weight:900;line-height:1;color:${WD.ink}">${n}</div>
<div style="${WDF}font-size:9.5px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:${WD.ink};padding-top:6px">${l}</div></td></tr></table></td>`,
    )
    .join('');
  const sections = clients
    .map(
      ([name, dot, items]) =>
        `<tr><td style="padding:26px 32px 6px"><table role="presentation" cellpadding="0" cellspacing="0"><tr>
<td style="background:#fff;border:2px solid ${WD.ink};border-radius:999px;padding:6px 14px 6px 10px;${WDF}font-size:14px;font-weight:bold;color:${WD.ink}"><span style="display:inline-block;width:11px;height:11px;border-radius:50%;background:${dot};border:1.5px solid ${WD.ink};vertical-align:-1px;margin-right:8px"></span>${name}</td>
<td style="padding-left:10px;${WDF}font-size:12px;color:${WD.muted}">${items.length} updates</td></tr></table></td></tr>` +
        items
          .map(
            ([t, d, tag]) =>
              `<tr><td style="padding:0 32px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1.5px dashed ${WD.line}"><tr><td style="padding:12px 0">
${wdPill(tag)}<div style="${WDF}font-size:15px;font-weight:bold;color:${WD.ink};padding-top:7px">${esc(t)}</div>
<div style="${WDF}font-size:13.5px;line-height:1.5;color:${WD.muted};padding-top:3px">${esc(d)}</div></td></tr></table></td></tr>`,
          )
          .join(''),
    )
    .join('');
  const inner = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border:2px solid ${WD.ink};border-radius:22px;box-shadow:6px 6px 0 ${WD.ink};overflow:hidden">
<tr><td style="background:${WD.pink};height:10px;font-size:0;line-height:0">&nbsp;</td></tr>
<tr><td style="padding:26px 32px 0">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
<td><img src="/media/web-deva-wordmark-email.png" width="150" height="53" alt="Web Deva Digital" style="display:block;border:0"></td>
<td align="right" style="${WDF}font-size:12px;color:${WD.muted}">Mon, Nov 9 · 8:00 AM</td></tr></table>
<div style="${WDF}font-size:11px;font-weight:bold;letter-spacing:3.5px;text-transform:uppercase;color:${WD.berry};padding-top:24px">Weekly Team Digest</div>
<div style="${WDF}font-size:34px;line-height:1.05;font-weight:900;letter-spacing:-1px;color:${WD.ink};padding:8px 0 8px">Your week, every client, one page.</div>
<div style="${WDF}font-size:15px;line-height:1.5;color:${WD.muted}">What’s done, what’s moving, what’s stuck, and what needs a decision.</div>
</td></tr>
<tr><td style="padding:22px 27px 4px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>${statTiles}</tr></table></td></tr>
<tr><td style="padding:20px 32px 4px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${WD.green};border:2px solid ${WD.ink};border-radius:16px"><tr><td style="padding:16px 18px">
<span style="display:inline-block;background:${WD.ink};color:${WD.green};border-radius:999px;padding:4px 11px;${WDF}font-size:10px;font-weight:bold;letter-spacing:2px">THIS WEEK</span>
<div style="${WDF}font-size:15px;line-height:1.55;color:${WD.ink};padding-top:9px">Two decisions are waiting on clients (<strong>the retailer</strong> and <strong>the restaurant</strong>), and the nonprofit’s year-end email series starts <strong>Monday</strong>.</div>
</td></tr></table></td></tr>
${sections}
<tr><td style="padding:28px 0 0"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${WD.blush};border-top:2px solid ${WD.ink}"><tr><td style="padding:18px 32px 20px;${WDF}font-size:11.5px;line-height:1.65;color:${WD.muted}">
<strong style="color:${WD.berry}">Web Deva Digital</strong> · Sources: project board, shared inboxes, meeting summaries, calendars, and client notes.<br>${fine(WD.muted)}</td></tr></table></td></tr>
</table>`;
  return page(WD.blush, inner);
}

// =====================================================================
// 2. Shared Inbox Triage — an operations dashboard
// =====================================================================
const OPS = { navy: '#1d2840', navySoft: '#2b3858', teal: '#14b8a6', tealPale: '#d6f5f1', amber: '#f59e0b', amberPale: '#fff4dc', red: '#e5484d', redPale: '#fde7e8', ink: '#1d2433', soft: '#5b6578', faint: '#8a93a6', rule: '#e6e9ef', bg: '#eef1f6' };
const PRIORITY: Record<string, string> = { HIGH: OPS.red, MEDIUM: OPS.amber, LOW: OPS.teal };

function inboxEmail() {
  const rows: [string, string, string, string, string][] = [
    ['Retail client', 'Customer asking where their online order is', 'Jane Doe', 'Today', 'HIGH'],
    ['Law firm client', 'New client asking for a consultation time', 'John Doe', 'Today', 'HIGH'],
    ['Restaurant client', 'Private event inquiry for 40 guests', 'Sam Lee', 'Tomorrow', 'MEDIUM'],
    ['Nonprofit client', 'Donor asking for a tax receipt', 'Alex Smith', 'Tomorrow', 'MEDIUM'],
    ['Retail client', 'Vendor following up on a wholesale quote', 'Jane Doe', 'This week', 'LOW'],
  ];
  const initials = (n: string) => n.split(' ').map((w) => w[0]).join('');
  const headStats: [string, string, string][] = [['5', 'New', '#ffffff'], ['2', 'Still open', '#ffffff'], ['7', 'Closed', OPS.teal], ['1', 'Overdue', '#ff8a8e']];
  const stats = headStats
    .map(
      ([n, l, c], i) =>
        `<td width="25%" style="padding:14px 8px 18px;${i ? `border-left:1px solid ${OPS.navySoft};` : ''}"><div style="${F}font-size:28px;font-weight:bold;line-height:1;color:${c}">${n}</div><div style="${F}font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#aab4cc;padding-top:6px">${l}</div></td>`,
    )
    .join('');
  const list = rows
    .map(
      ([c, r, o, d, p]) =>
        `<tr><td style="padding:0 28px 8px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid ${OPS.rule};border-left:5px solid ${PRIORITY[p]};border-radius:8px"><tr>
<td style="padding:12px 14px"><div style="${F}font-size:11px;color:${OPS.faint};letter-spacing:.3px">${c} · <span style="color:${PRIORITY[p]};font-weight:bold">${p}</span></div>
<div style="${F}font-size:14px;font-weight:bold;color:${OPS.ink};padding-top:4px">${esc(r)}</div></td>
<td align="right" width="150" style="padding:12px 14px;white-space:nowrap"><span style="display:inline-block;width:24px;height:24px;line-height:24px;text-align:center;border-radius:50%;background:${OPS.navy};color:#fff;${F}font-size:10px;font-weight:bold;vertical-align:middle">${initials(o)}</span>
<span style="${F}font-size:12.5px;color:${OPS.soft};padding-left:6px;vertical-align:middle">${o}</span><div style="${F}font-size:11px;color:${OPS.faint};padding-top:4px">Due ${d.toLowerCase()}</div></td></tr></table></td></tr>`,
    )
    .join('');
  const label = (t: string, n: string) =>
    `<tr><td style="padding:22px 28px 10px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="${F}font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:${OPS.ink}">${t}</td><td align="right" style="${F}font-size:12px;color:${OPS.faint}">${n}</td></tr></table></td></tr>`;
  const flag = (tone: 'red' | 'amber', title: string, detail: string, tag: string) => {
    const [bg, fg] = tone === 'red' ? [OPS.redPale, OPS.red] : [OPS.amberPale, '#b45309'];
    return `<tr><td style="padding:0 28px 8px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${bg};border-radius:8px"><tr><td style="padding:12px 14px">
<span style="${F}font-size:10px;font-weight:bold;letter-spacing:1.2px;color:${fg}">${tag}</span><div style="${F}font-size:14px;font-weight:bold;color:${OPS.ink};padding-top:3px">${esc(title)}</div><div style="${F}font-size:12.5px;line-height:1.5;color:${OPS.soft};padding-top:2px">${esc(detail)}</div></td></tr></table></td></tr>`;
  };
  const inner = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:${OPS.bg};border-radius:12px;overflow:hidden">
<tr><td style="background:${OPS.navy};padding:22px 28px 0">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
<td style="${F}font-size:11px;font-weight:bold;letter-spacing:2px;color:${OPS.teal}">● SHARED INBOX</td>
<td align="right" style="${F}font-size:12px;color:#aab4cc">Tue, Nov 10 · 7:00 AM</td></tr></table>
<div style="${F}font-size:26px;font-weight:bold;color:#fff;padding:12px 0 4px">Inbox Triage</div>
<div style="${F}font-size:13.5px;line-height:1.5;color:#c6cee0;padding-bottom:6px">Every new request logged, assigned, and checked against replies.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:10px;border-top:1px solid ${OPS.navySoft}"><tr>${stats}</tr></table>
</td></tr>
<tr><td style="padding:20px 28px 0"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${OPS.amberPale};border:1px solid #fcd581;border-radius:8px"><tr><td style="padding:12px 14px;${F}font-size:13.5px;line-height:1.5;color:#7a4b07"><strong>Heads up:</strong> two high-priority requests came in overnight, and one older request is overdue and has been escalated.</td></tr></table></td></tr>
${label('New and assigned', '5 requests')}
${list}
<tr><td style="padding:2px 28px 0;${F}font-size:11.5px;line-height:1.5;color:${OPS.faint}">Logged to the tracking sheet and routed by the rules. Owners were notified and tasks created with due dates.</td></tr>
${label('Still open', '2 requests')}
${flag('red', 'Donor portal login issue', 'Asked three times since last week. Escalated to the team lead.', 'OVERDUE')}
${flag('amber', 'Gift card refund request', 'Waiting on the retail client to approve the refund.', 'WAITING ON CLIENT')}
${label('Closed since yesterday', '7 requests')}
<tr><td style="padding:0 28px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${OPS.tealPale};border-radius:8px"><tr><td style="padding:12px 14px;${F}font-size:13.5px;color:#0f5f56"><strong>7 resolved.</strong> Marked complete after a reply was found in the inbox.</td></tr></table></td></tr>
<tr><td style="padding:22px 28px 22px;${F}font-size:11.5px;line-height:1.6;color:${OPS.faint}">Sources: the shared inbox, the tracking sheet, and the team roster and routing rules.<br>${fine(OPS.faint)}</td></tr>
</table>`;
  return page('#dfe4ec', inner);
}

// =====================================================================
// 3. My Daily Brief — a warm personal morning note
// =====================================================================
const MB = { plum: '#4a2459', plumSoft: '#7a4a8c', coral: '#ff6f59', peach: '#ffd9c2', cream: '#fff8f1', sand: '#f6ebe0', ink: '#2a1f2d', soft: '#6b5a66', faint: '#9b8a94', rule: '#efe1d6', sage: '#5f8a6a', sagePale: '#e5f0e7' };

function chaosEmail() {
  const top3: [string, string, string][] = [
    ['Restaurant brunch email', 'Due to send today and still marked Drafting. Schedule it before 11.', MB.coral],
    ['Gift guide copy', 'The retail client asked in chat yesterday at 4:10 PM.', MB.plumSoft],
    ['Nonprofit dashboard login', 'Assigned to you in the shared inbox tracker.', MB.sage],
  ];
  const top = top3
    .map(
      ([t, d, c], i) =>
        `<tr><td style="padding:0 0 12px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
<td width="46" valign="top"><div style="width:34px;height:34px;line-height:34px;border-radius:50%;background:${c};color:#fff;text-align:center;${F}font-size:16px;font-weight:bold">${i + 1}</div></td>
<td><div style="${F}font-size:15px;font-weight:bold;color:${MB.ink}">${esc(t)}</div><div style="${F}font-size:13px;line-height:1.5;color:${MB.soft};padding-top:2px">${esc(d)}</div></td></tr></table></td></tr>`,
    )
    .join('');
  const section = (title: string, body: string) =>
    `<tr><td style="padding:10px 30px 4px"><div style="${F}font-size:12px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;color:${MB.plum};padding:14px 0 10px;border-top:1px solid ${MB.rule}">${title}</div>${body}</td></tr>`;
  const timeline = [
    ['Today', 'Restaurant brunch email', 'Drafting · not scheduled', MB.coral],
    ['Yesterday', 'Nonprofit giving-day post', 'Missed its date. Reschedule or skip.', '#c2410c'],
  ]
    .map(
      ([when, what, note, c]) =>
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td width="84" valign="top" style="${F}font-size:12px;font-weight:bold;color:${c};padding:2px 0 12px">${when}</td>
<td valign="top" style="border-left:2px solid ${c};padding:0 0 12px 14px"><div style="${F}font-size:14px;font-weight:bold;color:${MB.ink}">${what}</div><div style="${F}font-size:12.5px;color:${MB.soft};padding-top:2px">${note}</div></td></tr></table>`,
    )
    .join('');
  const meetings = [
    ['10:00', 'Law firm check-in', 'Bring the intake testing results.'],
    ['2:30', 'Team sync', ''],
  ]
    .map(
      ([t, m, n]) =>
        `<table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:8px"><tr><td style="background:${MB.sand};border-radius:8px;padding:8px 12px;${F}font-size:13px;font-weight:bold;color:${MB.plum}">${t}</td><td style="padding-left:12px;${F}font-size:14px;color:${MB.ink}"><strong>${m}</strong>${n ? `<span style="color:${MB.soft}"> · ${n}</span>` : ''}</td></tr></table>`,
    )
    .join('');
  const hours: [string, number, string][] = [['Retail client', 160, 'Logged'], ['Restaurant client', 115, 'Logged'], ['Law firm client', 70, 'No update posted'], ['Internal', 45, 'Logged']];
  const max = 160;
  const bars = hours
    .map(
      ([c, m, s]) =>
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:9px"><tr>
<td width="130" style="${F}font-size:12.5px;color:${MB.ink}">${c}</td>
<td><table role="presentation" width="${Math.round((m / max) * 100)}%" cellpadding="0" cellspacing="0"><tr><td style="background:${s.startsWith('No') ? MB.coral : MB.plumSoft};height:12px;border-radius:6px;font-size:0;line-height:0">&nbsp;</td></tr></table></td>
<td width="110" align="right" style="${F}font-size:12px;color:${s.startsWith('No') ? MB.coral : MB.faint}"><strong style="color:${MB.ink}">${Math.floor(m / 60)}h ${String(m % 60).padStart(2, '0')}m</strong><br>${s}</td></tr></table>`,
    )
    .join('');
  const drafts: [string, string, string, string][] = [
    ['Restaurant client', 'Weekend brunch email', 'Status: Drafting → Sent', 'Sent this morning to the full list. Results will be in Friday’s report.'],
    ['Retail client', 'Holiday gift guide page', 'New item · Owner: Katelyn', 'Product list approved by the client. Layout in progress.'],
    ['Law firm client', 'Intake automation', 'Add update', 'Second round of testing done. Two edge cases left before launch.'],
  ];
  const btn = (label: string, primary: boolean) =>
    `<a href="#" style="display:inline-block;${primary ? `background:${MB.plum};color:#fff;border:1px solid ${MB.plum}` : `background:#fff;color:${MB.plum};border:1px solid #d9c6d6`};border-radius:999px;padding:7px 15px;${F}font-size:12px;font-weight:bold;text-decoration:none;margin:10px 6px 0 0">${label}</a>`;
  const draftCards = drafts
    .map(
      ([c, title, change, comment]) =>
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid ${MB.rule};border-radius:14px;margin-bottom:10px"><tr><td style="padding:14px 16px">
<div style="${F}font-size:11.5px;color:${MB.faint}"><strong style="color:${MB.plum}">${c}</strong> · ${esc(change)}</div>
<div style="${F}font-size:15px;font-weight:bold;color:${MB.ink};padding:6px 0 8px">${esc(title)}</div>
<div style="${F}font-size:13px;line-height:1.55;color:${MB.soft};background:${MB.cream};border-left:3px solid ${MB.coral};border-radius:0 8px 8px 0;padding:9px 12px">“${esc(comment)}”</div>
${btn('Post update', true)}${btn('Edit first', false)}<a href="#" style="display:inline-block;color:${MB.faint};${F}font-size:12px;text-decoration:none;margin:10px 0 0 4px">Skip</a>
</td></tr></table>`,
    )
    .join('');
  const inner = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:${MB.cream};border-radius:24px;overflow:hidden">
<tr><td style="background:linear-gradient(135deg,#ffe3c9 0%,#ffb59e 45%,#e9a7d6 100%);background-color:#ffc4ae;padding:30px 30px 26px">
<div style="${F}font-size:12px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;color:${MB.plum}">My Daily Brief · Tue, Nov 10</div>
<div style="${F}font-size:32px;line-height:1.1;font-weight:bold;color:${MB.ink};padding:12px 0 6px">Good morning, Katelyn.</div>
<div style="${F}font-size:15px;line-height:1.5;color:#4b3646">Three things matter most today. Everything else is below, sorted.</div>
<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:16px"><tr>
${[['3', 'inbox'], ['4', 'chat'], ['2', 'sends'], ['2', 'meetings']].map(([n, l]) => `<td style="padding-right:8px"><span style="display:inline-block;background:rgba(255,255,255,.7);border-radius:999px;padding:6px 12px;${F}font-size:12.5px;color:${MB.plum}"><strong>${n}</strong> ${l}</span></td>`).join('')}
</tr></table></td></tr>
<tr><td style="padding:24px 30px 6px"><div style="${F}font-size:12px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;color:${MB.coral};padding-bottom:14px">Top 3 for today</div><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${top}</table></td></tr>
${section('Content calendar', timeline)}
${section('Meetings', meetings)}
${section('Who’s waiting on you', `<div style="${F}font-size:14px;line-height:1.6;color:${MB.ink}"><strong>Jane</strong> needs photo selects. <strong>John</strong> needs your sign-off on the holiday ad copy.</div>`)}
${section('Yesterday’s time', `${bars}<div style="${F}font-size:12px;line-height:1.5;color:${MB.faint};padding-top:4px">The law firm has time logged but no board update, so one is drafted below.</div>`)}
${section('Board updates ready to post', `<div style="${F}font-size:12.5px;color:${MB.faint};padding-bottom:10px">Nothing posts until you choose. The text is exactly what would post.</div>${draftCards}`)}
<tr><td style="padding:18px 30px 26px;${F}font-size:11.5px;line-height:1.6;color:${MB.faint}">Sources: email, team chat, the project board, calendars, content calendars, meeting summaries, notes, and the time tracker.<br>${fine(MB.faint)}</td></tr>
</table>`;
  return page('#f3e7dd', inner);
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
    label: 'My Daily Brief',
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

