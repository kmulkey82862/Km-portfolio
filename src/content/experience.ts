// Résumé content, word for word from the final résumé (public/Katelyn_Mulkey_Resume.pdf).
// Keep it in sync with the PDF; don't paraphrase here.

export type Bullet = string | { text: string; sub: string[] };

export type Role = {
  id: string;
  title: string;
  company: string;
  dates: string;
  note?: string;
  highlights?: Bullet[];
  /** Bullets under small headings, as on the ARB entry. */
  groups?: { heading: string; bullets: string[] }[];
};

export const experience: Role[] = [
  {
    id: 'arb',
    title: 'Integrated Systems & Marketing Operations',
    company: 'ARB Meetings & Events',
    dates: 'Jan 2026 – Current',
    groups: [
      {
        heading: 'AI adoption & automation',
        bullets: [
          'Led company-wide adoption of Claude Team, unifying core systems, client files, and shared documents into one central knowledge base for a 10-person team.',
          'Automated daily and weekly client digests from project systems and shared inboxes, and routed Zoom meeting summaries into each client’s Monday.com workspace.',
          'Administered Monday.com, standardizing client workspaces and integrating Brevo, Jotform, and Google Workspace.',
        ],
      },
      {
        heading: 'Tools & systems',
        bullets: [
          'Developed an OCR receipt scanner, a speaker graphic generator used by about 100 speakers, and a video archive pipeline that replaced subscription hosting with pay-per-view streaming.',
          'Engineered a registration code system for 300–400 invitees, from unique codes and personalized emails to redemption tracking and reminder drips.',
          'Designed interactive dashboards in Claude and Looker Studio, and authored a 39-page outcomes report drawing on 9 data sources.',
          'Configured conference apps on vFairs, Bravura, and Whova; FIMCON’s app reached 75.1% adoption, about 1.5x the industry benchmark.',
        ],
      },
      {
        heading: 'Marketing & communications',
        bullets: [
          'Created a full-funnel content strategy and website for a chronic disease convention, plus email, LinkedIn, and web content for FIMCON 2026.',
          'Ran 30 Brevo campaigns at a 98.1% delivery rate and 39.8% click-to-open rate, over 2x the industry average; earned 559 media pickups, including AP News, from one press release.',
          'Produced social media toolkits for attendees, speakers, and sponsors, and hired and directed the photographer for 3 of 4 on-site conferences, managing the full image library.',
        ],
      },
    ],
  },
  {
    id: 'comeaux',
    title: 'Marketing Administrator & IT Administrator',
    company: 'Comeaux Furniture, Appliance & Mattress',
    dates: 'Feb 2024 – Jun 2025',
    highlights: [
      'Managed Google Ads ($2K–$15K/mo), achieving a 65% YoY conversion increase and 62% lower cost per conversion through PMax, strategic pruning, and AI-informed copy.',
      'Automated reporting in Narrative BI and Google Sheets, cutting quarterly inventory QA from 24 hours to under one.',
      'Connected Myriad to the website inventory system and directed SEO and site optimization.',
    ],
  },
  {
    id: 'morgan',
    title: 'Digital Manager & Analytics Coordinator',
    company: 'Morgan & Co.',
    dates: 'Oct 2022 – Jul 2023',
    highlights: [
      'Rebuilt client reporting in Looker Studio, saving 4–5 hours per report.',
      'Managed paid media and analytics for healthcare (LCMC), gaming, legal, and hospitality clients.',
      'Produced branded video content using ChatGPT and AI video platforms.',
    ],
  },
  {
    id: 'si-coord',
    title: 'Sales & Marketing Coordinator',
    company: 'Search Influence',
    dates: 'Dec 2021 – Oct 2022',
    highlights: [
      'Set up automated lead nurture workflows in HubSpot and aligned email, paid media, and SEO across the funnel.',
      'Created client KPI dashboards in Looker Studio and Supermetrics.',
    ],
  },
  {
    id: 'cura',
    title: 'Director of Marketing & Brand Creative',
    company: 'Cura OS',
    dates: 'May 2021 – Oct 2021',
    highlights: ['Led company-wide Pipedrive CRM adoption and a persona-segmented Mailchimp drip campaign.', 'Directed a full brand identity and website redesign.'],
  },
  {
    id: 'si-am',
    title: 'Account Manager & Coordinator',
    company: 'Search Influence',
    dates: 'Nov 2019 – Jun 2021',
    highlights: [
      'Ran multi-channel strategy for regulated industries: finance, legal, medical, and higher ed.',
      'Implemented Zapier workflows for lead handling and CRM integration.',
      'Drove a 49% increase in inquiries for Palo Alto University and a 77% ROI lift for a plastic surgery client.',
    ],
  },
];

export const expertise = [
  'AI enablement & adoption',
  'Workflow automation',
  'Systems integration',
  'Data & dashboards',
  'Web development & UX/UI',
  'Digital marketing',
];

export const skills: { group: string; items: string[] }[] = [
  { group: 'AI & build', items: ['Claude (Team, Code, Cowork)', 'ChatGPT', 'Gemini', 'Google Apps Script', 'HTML/CSS, JavaScript', 'Next.js', 'GitHub, Netlify'] },
  { group: 'Operations', items: ['Monday.com', 'Google Workspace', 'Notion', 'Jotform', 'Zapier', 'Pipedrive', 'Salesforce (basic)'] },
  { group: 'Marketing', items: ['Brevo', 'HubSpot', 'Mailchimp', 'WordPress', 'Google Ads', 'Meta Ads', 'PR Newswire'] },
  { group: 'Analytics', items: ['Google Analytics 4', 'Looker Studio', 'Supermetrics', 'Narrative BI'] },
  { group: 'Event tech', items: ['vFairs', 'Bravura', 'Whova', 'YourEvent', 'Bunny Stream'] },
];

export const selectedWork = [
  { label: 'Matt Chapin Music', href: 'https://mattchapinmusic.com', display: 'mattchapinmusic.com' },
  { label: 'Web component library', href: 'https://webdivacomponents.netlify.com', display: 'webdivacomponents.netlify.com' },
  { label: 'Lighthouse Strategy Group', href: 'https://lighthousestrategygroup.com', display: 'lighthousestrategygroup.com' },
  { label: 'FIMCON session archive', href: 'https://fimcon.org/en/fimcon-2026-session-recordings', display: 'fimcon.org/en/fimcon-2026-session-recordings' },
];
