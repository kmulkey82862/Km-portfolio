export type EmailSample = { file: string; title: string; type: string };
export type EmailSet = { id: string; org: string; title: string; note?: string; emails: EmailSample[] };

// Files live in public/emails/. Links inside the emails are switched off.
export const emailSets: EmailSet[] = [
  {
    id: 'arb',
    org: 'Built for ARB Meetings & Events',
    title: 'Conference emails',
    note: 'Work created by Katelyn Mulkey as an employee of ARB Meetings & Events. All work product and trademarks belong to ARB Meetings & Events and its respective clients. Shown for portfolio purposes only; links are disabled.',
    emails: [
      { file: 'acdc-2026-launch.html', title: 'ACDC 2026 launch', type: 'Launch announcement' },
      { file: 'adnet-2027-launch.html', title: 'AdNet 2027 is open', type: 'Registration launch' },
      { file: 'namd-conference-app.html', title: 'NAMD conference app', type: 'App launch' },
      { file: 'namd-genedx-networking-break.html', title: 'GeneDx Sweet Shoppe', type: 'Networking break' },
    ],
  },
  {
    id: 'smo',
    org: 'Sewing Machine Outlet',
    title: 'Retail promo emails',
    note: 'Screenshots of the emails as sent.',
    emails: [
      { file: 'smo-mothers-day.html', title: 'Mother’s Day financing', type: 'Seasonal promo' },
      { file: 'smo-christmas-in-july.html', title: 'Christmas in July', type: 'Sale' },
      { file: 'smo-last-day-financing.html', title: 'Last day: 0% APR', type: 'Countdown' },
      { file: 'smo-kids-sewing-camp.html', title: 'Kids sewing camp', type: 'Event' },
      { file: 'smo-closed-july-4th.html', title: 'Closed for July 4th', type: 'Store notice' },
    ],
  },
];
