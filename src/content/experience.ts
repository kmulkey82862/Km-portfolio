// Résumé content, word for word from the final résumé. Keep it in sync with the PDF;
// don't paraphrase here.

export type Bullet = string | { text: string; sub: string[] };

export type Role = {
  id: string;
  title: string;
  company: string;
  dates: string;
  note?: string;
  highlights: Bullet[];
};

export const experience: Role[] = [
  {
    id: 'arb',
    title: 'Integrated Systems & Marketing Operations',
    company: 'ARB Meetings & Events',
    dates: 'Jan 2026 – Current',
    note: '10-person conference planning company; events ranged from 400 to 1,800 attendees',
    highlights: [
      'Led company-wide adoption of Claude Team across a 10-person team. Connected core systems, client project files, and shared documents into one central knowledge base, which increased team productivity.',
      {
        text: 'Built Claude automations that:',
        sub: [
          'scan project systems and shared inboxes to send daily or weekly client digests of in-progress and pending items;',
          'route Zoom meeting summaries into each client’s Monday.com workspace so they’re searchable by AI.',
        ],
      },
      'Built an AI RFP scanner that searches industry sources each morning for relevant bids and starts response drafts from company information.',
      {
        text: 'Built AI-assisted and Google Apps Script tools:',
        sub: [
          'an OCR receipt scanner that logs expenses to a reconciliation sheet;',
          'a speaker graphic generator used by about 100 speakers;',
          'a video archive pipeline that replaced subscription hosting with pay-per-view streaming.',
        ],
      },
      'Built a complimentary registration system for 300–400 invitees. It generated unique codes, merged them into personalized emails, tracked redemption, and sent reminder drips to anyone who hadn’t registered.',
      'Built interactive dashboards in Claude and Looker Studio connected to live platform data. Produced all analytics reporting, including a 39-page outcomes report combining 9 data sources with industry benchmarks.',
      'Administered Monday.com: built workflows, automations, and reporting, and standardized workspace structure across client accounts. Integrated Brevo, Jotform, and Google Workspace to cut repetitive work.',
      'Built a full-funnel content strategy and website for a chronic disease convention. Created role-specific email, LinkedIn, and web content for FIMCON 2026, which sold out general admission one day after launch and drew 752 attendees.',
      'Ran 30 Brevo email campaigns (109K+ sends) at a 98.1% delivery rate and 39.8% click-to-open rate, more than double the events-industry average. Managed a PR Newswire release that earned 559 media pickups, including AP News.',
      'Configured attendee apps on vFairs, Bravura, and Whova (FIMCON reached 75.1% adoption, about 1.5x the benchmark). Built role-specific social toolkits for attendees, speakers, and sponsors.',
    ],
  },
  {
    id: 'comeaux',
    title: 'Marketing Administrator & IT Administrator',
    company: 'Comeaux Furniture, Appliance & Mattress',
    dates: 'Feb 2024 – Jun 2025',
    highlights: [
      'Managed Google Ads campaigns ($2K–$15K/mo), achieving a 65% YoY conversion increase and a 62% drop in cost per conversion through PMax campaigns, strategic pruning, and AI-informed copy.',
      'Created performance dashboards and automated reporting in Narrative BI and Google Sheets, cutting quarterly inventory QA from 24 hours to under 1 hour.',
      'Directed SEO, website optimization, and digital asset creation.',
      'Maintained infrastructure and implemented automation between Myriad and website inventory systems.',
    ],
  },
  {
    id: 'morgan',
    title: 'Digital Manager & Analytics Coordinator',
    company: 'Morgan & Co.',
    dates: 'Oct 2022 – Jul 2023',
    highlights: [
      'Overhauled the agency’s client reporting workflow in Looker Studio, saving 4–5 hours per report.',
      'Managed paid media and analytics for healthcare (LCMC), gaming, legal, and hospitality clients (Google Ads, Meta).',
      'Delivered creative and performance strategy using ChatGPT and AI video creation platforms for branded video content.',
      'Conducted QA, KPI monitoring, and audience performance analysis for multi-platform campaigns.',
    ],
  },
  {
    id: 'si-coord',
    title: 'Sales & Marketing Coordinator',
    company: 'Search Influence',
    dates: 'Dec 2021 – Oct 2022',
    highlights: [
      'Built and optimized automated lead nurture workflows in HubSpot.',
      'Kept email, paid media, and SEO campaigns aligned across the full funnel.',
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
      'Built a Mailchimp drip campaign with persona segmentation.',
      'Led a full brand identity and website redesign.',
      'Created creative assets across email, social, and digital, with tracking and iteration cycles.',
    ],
  },
  {
    id: 'si-am',
    title: 'Account Manager & Coordinator',
    company: 'Search Influence',
    dates: 'Nov 2019 – Jun 2021',
    highlights: [
      'Ran multi-channel strategy for clients in regulated industries (finance, legal, medical, higher ed).',
      'Built Zapier automation workflows for lead handling and CRM integration.',
      'Drove a 49% increase in inquiries for Palo Alto University and a 77% ROI lift for a plastic surgery client.',
      'Delivered strategic reports translating analytics into actions.',
    ],
  },
];

// "YourEvent" is left out of platforms until its spelling is confirmed.
export const skills: { group: string; items: string[] }[] = [
  {
    group: 'Technical expertise',
    items: ['AI Enablement & Adoption', 'AI-Assisted Development', 'Generative AI', 'Workflow Automation', 'Systems Integration', 'Website Development', 'UX/UI Design', 'Data Analytics', 'Digital Strategy', 'Lean Process Optimization'],
  },
  {
    group: 'AI & development',
    items: ['Claude (Team, Code, Cowork)', 'ChatGPT (multi-year)', 'Gemini', 'Google Apps Script', 'HTML/CSS', 'JavaScript', 'Next.js', 'GitHub', 'Netlify', 'AI video and ad creation platforms'],
  },
  {
    group: 'Marketing & event platforms',
    items: ['Monday.com', 'Google Workspace', 'Brevo', 'Jotform', 'Notion', 'vFairs', 'Bravura', 'Whova', 'Bunny Stream', 'HubSpot', 'Mailchimp', 'Zapier', 'Pipedrive', 'Salesforce (basic)', 'WordPress', 'Unbounce', 'Content creation and management platforms'],
  },
  {
    group: 'Analytics & reporting',
    items: ['Google Analytics 4', 'Looker Studio', 'Supermetrics', 'Narrative BI', 'Custom dashboards', 'Client-facing reports'],
  },
  {
    group: 'Paid & earned media',
    items: ['Google Ads (Search, Display, PMax)', 'Meta Ads', 'Adalysis', 'Adzooma', 'PR Newswire'],
  },
  {
    group: 'Campaign execution',
    items: ['Email drip and lead nurture workflows', 'A/B testing', 'SEO content', 'Event promotion', 'Re-engagement'],
  },
  {
    group: 'Industries',
    items: ['Events and conferences', 'Regulated industries (legal, finance, healthcare)', 'Higher ed', 'Political', 'Retail'],
  },
];
