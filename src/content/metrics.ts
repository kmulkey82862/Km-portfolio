// Featured numbers. Each one names the work that produced it.
// Source for FIMCON figures: FIMCON 2026 Outcomes Report (39 pages, authored by Katelyn).

export type Metric = {
  value: string;
  label: string;
  context: string;
  source: string;
  anchor?: string; // in-page link to the work that proves it
};

export const metrics: Metric[] = [
  {
    value: '39.8%',
    label: 'click-to-open rate',
    context: 'More than double the events-industry average, with 98.1% delivery across 30 campaigns and 109K+ sends.',
    source: 'Brevo · ARB Meetings & Events',
    anchor: '#work-arb',
  },
  {
    value: '1 day',
    label: 'to sell out general admission',
    context: '752 attendees and a 607-person waitlist for FIMCON 2026, driven by role-specific email, LinkedIn, and web content.',
    source: 'FIMCON 2026 Outcomes Report',
    anchor: '#work-fimcon',
  },
  {
    value: '559',
    label: 'media pickups',
    context: 'From one PR Newswire release, including AP News.',
    source: 'PR Newswire · FIMCON 2026',
    anchor: '#work-fimcon',
  },
  {
    value: '75.1%',
    label: 'attendee app adoption',
    context: 'About 1.5× the industry benchmark, plus role-specific social toolkits for attendees, speakers, and sponsors.',
    source: 'Attendee app · FIMCON 2026',
    anchor: '#work-fimcon',
  },
  {
    value: '<1 hour',
    label: 'quarterly inventory QA, down from 24',
    context: 'Automated reporting in Narrative BI and Google Sheets replaced a full day of manual checks.',
    source: 'Comeaux Furniture',
    anchor: '#work-comeaux',
  },
  {
    value: '+65%',
    label: 'YoY conversions',
    context: 'With 62% lower cost per conversion, through PMax, strategic pruning, and AI-informed copy on $2K–$15K/mo budgets.',
    source: 'Google Ads · Comeaux Furniture',
    anchor: '#work-comeaux',
  },
  {
    value: '300–400',
    label: 'unique registration codes',
    context: 'Generated, merged into personalized emails, tracked to redemption, and followed up with reminder drips automatically.',
    source: 'Comp registration system · ARB',
    anchor: '/lab/registration-codes',
  },
  {
    value: '+49%',
    label: 'inquiries for Palo Alto University',
    context: 'Plus a 77% ROI lift for a plastic surgery client, across regulated-industry accounts.',
    source: 'Search Influence',
    anchor: '#experience',
  },
];
