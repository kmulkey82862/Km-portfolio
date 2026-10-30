export type Role = {
  id: string;
  title: string;
  company: string;
  dates: string;
  note?: string;
  highlights: string[];
};

export const experience: Role[] = [
  {
    id: 'arb',
    title: 'Integrated Systems & Marketing Operations',
    company: 'ARB Meetings & Events',
    dates: 'Jan 2026 – Present',
    note: '10-person conference company · events of 400 to 1,800 attendees',
    highlights: [
      'Led company-wide adoption of Claude Team. Connected core systems, client project files, and shared documents into one central knowledge base.',
      'Built Claude automations that send daily or weekly client digests, and route Zoom meeting summaries into each client’s Monday.com workspace so they’re searchable by AI.',
      'Built an AI RFP scanner that searches industry sources each morning and starts response drafts from company information.',
      'Built AI-assisted and Apps Script tools: an OCR receipt scanner, a speaker graphic generator used by about 100 speakers, and a video archive pipeline that replaced subscription hosting with pay-per-view streaming.',
      'Built a complimentary registration system for 300–400 invitees with unique codes, merged emails, redemption tracking, and reminder drips.',
      'Built live dashboards in Claude and Looker Studio, and a 39-page outcomes report combining 9 data sources with industry benchmarks.',
      'Administered Monday.com and integrated Brevo, Jotform, and Google Workspace to cut repetitive work.',
    ],
  },
  {
    id: 'comeaux',
    title: 'Marketing Administrator & IT Administrator',
    company: 'Comeaux Furniture, Appliance & Mattress',
    dates: 'Feb 2024 – Jun 2025',
    highlights: [
      'Managed Google Ads ($2K–$15K/mo): 65% YoY conversion increase and 62% lower cost per conversion.',
      'Built dashboards and automated reporting in Narrative BI and Google Sheets, cutting quarterly inventory QA from 24 hours to under 1 hour.',
      'Directed SEO, website optimization, and digital asset creation.',
      'Maintained infrastructure and automated sync between Myriad and the website inventory.',
    ],
  },
  {
    id: 'morgan',
    title: 'Digital Manager & Analytics Coordinator',
    company: 'Morgan & Co.',
    dates: 'Oct 2022 – Jul 2023',
    highlights: [
      'Overhauled client reporting in Looker Studio, saving 4–5 hours per report.',
      'Managed paid media and analytics for healthcare, gaming, legal, and hospitality clients.',
      'Delivered creative strategy using ChatGPT and AI video platforms for branded video.',
    ],
  },
  {
    id: 'si-coord',
    title: 'Sales & Marketing Coordinator',
    company: 'Search Influence',
    dates: 'Dec 2021 – Oct 2022',
    highlights: [
      'Built and optimized automated lead nurture workflows in HubSpot.',
      'Produced reports and dashboards in Looker Studio and Supermetrics.',
    ],
  },
  {
    id: 'cura',
    title: 'Director of Marketing and Brand Creative',
    company: 'Cura OS',
    dates: 'May 2021 – Oct 2021',
    highlights: [
      'Led company-wide Pipedrive CRM adoption.',
      'Built a persona-segmented Mailchimp drip campaign.',
      'Led a full brand identity and website redesign.',
    ],
  },
  {
    id: 'si-am',
    title: 'Account Manager & Coordinator',
    company: 'Search Influence',
    dates: 'Nov 2019 – Jun 2021',
    highlights: [
      'Ran multi-channel strategy for regulated industries: finance, legal, medical, higher ed.',
      'Built Zapier workflows for lead handling and CRM integration.',
      'Drove a 49% increase in inquiries for Palo Alto University and a 77% ROI lift for a plastic surgery client.',
    ],
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'AI & development',
    items: ['Claude (Team, Code, Cowork)', 'ChatGPT', 'Gemini', 'Google Apps Script', 'HTML/CSS', 'JavaScript', 'Next.js', 'GitHub', 'Netlify'],
  },
  {
    group: 'Systems & platforms',
    items: ['Monday.com', 'Google Workspace', 'Brevo', 'Jotform', 'Notion', 'HubSpot', 'Mailchimp', 'Zapier', 'Pipedrive', 'WordPress', 'vFairs', 'Bravura', 'Whova', 'Bunny Stream'],
  },
  {
    group: 'Analytics & reporting',
    items: ['Google Analytics 4', 'Looker Studio', 'Supermetrics', 'Narrative BI', 'Custom dashboards'],
  },
  {
    group: 'Paid & earned media',
    items: ['Google Ads (Search, Display, PMax)', 'Meta Ads', 'Adalysis', 'PR Newswire'],
  },
];
