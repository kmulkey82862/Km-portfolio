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
          'Led company-wide adoption of Claude Team, unifying core systems, client files, and shared docs into one knowledge base for a 10-person team.',
          'Analyzed shared-inbox volume, found one person handled about 80% of messages, and led a workflow change that cut inbox and meeting load for everyone else, replacing it with a weekly client digest.',
          'Administered Monday.com, integrating Brevo, Jotform, and Google Workspace, and built Claude automations that file Zoom summaries into each client’s workspace and draft task updates, saving an estimated 1.5–2.5 hours per person weekly.',
          'Piloted a daily brief across Gmail, Google Chat, Monday.com, content calendars, and an AI time tracker, with one-click task updates and time logging.',
          'After a colleague left, set up twice-daily AI triage of her 40+ daily emails, routing each to the right teammate, saving an estimated 1.5–2.5 hours a day.',
        ],
      },
      {
        heading: 'Tools & systems',
        bullets: [
          'Built a speaker graphic generator that uses dynamic templating to fit any name and session to the brand and regenerates from agenda data; about 100 speakers made their own and shared them widely on LinkedIn, saving an estimated 20–30 design hours.',
          'Built a logo resizer that sizes 150 sponsors’ logos at the correct aspect ratio and resolution (an estimated 10–15 hours saved per conference), plus an OCR receipt scanner and a pay-per-view video archive.',
          'Engineered a registration code system for 300–400 invitees: unique codes, personalized emails, redemption tracking, and reminders.',
          'Owned the post-event survey and reporting program for clients, turning results into executive summaries for steering committees, funders, and staff.',
          'Authored a 39-page outcomes report drawing on 9 data sources, and designed interactive dashboards in Claude and Looker Studio.',
          'Configured conference apps on vFairs, Bravura, and Whova; FIMCON’s app reached 75.1% adoption, about 1.5x the industry benchmark.',
        ],
      },
      {
        heading: 'Marketing & communications',
        bullets: [
          'Researched personas and built the full-funnel strategy and website for a chronic disease convention, plus FIMCON 2026 email and LinkedIn content.',
          'Ran 30 Brevo campaigns at a 98.1% delivery rate and 39.8% click-to-open rate, over 2x the industry average; earned 559 media pickups, including AP News, from one press release.',
          'Produced social media toolkits for attendees, speakers, and sponsors, and directed photography for 3 of 4 on-site conferences.',
        ],
      },
    ],
  },
  {
    id: 'comeaux',
    title: 'Marketing Administrator & IT Administrator',
    company: 'Comeaux Furniture, Appliance & Mattress',
    dates: 'Feb 2024 – Sep 2025',
    highlights: [
      'Managed Google Ads ($2K–$15K/mo): 65% YoY conversion lift and 62% lower cost per conversion via PMax, restructuring, and AI-informed copy.',
      'Built dashboards and automated reporting in Narrative BI and Google Sheets, cutting quarterly inventory QA from 24 hours to under one.',
      'Directed SEO, site optimization, and digital assets, and connected Myriad to the website inventory system.',
      'Maintained IT infrastructure, conducted market analysis, and negotiated sponsorships aligned with brand strategy.',
    ],
  },
  {
    id: 'morgan',
    title: 'Digital Manager & Analytics Coordinator',
    company: 'Morgan & Co.',
    dates: 'Oct 2022 – Jul 2023',
    highlights: [
      'As the agency’s first and only SEO specialist, scoped requirements and deliverables for every SEO project and led them through delivery.',
      'Defined KPIs and the measurement framework, adapting reporting as projects ran based on client feedback and pushback on contract terms.',
      'Rebuilt client reporting in Looker Studio, saving 4–5 hours per report, and trained the team in SEO and analytics.',
      'Co-managed paid media for healthcare (LCMC), gaming, legal, and hospitality clients across Google Ads and Meta.',
      'Ran QA, KPI monitoring, and audience performance analysis, and produced branded video content with AI tools.',
    ],
  },
  {
    id: 'si-coord',
    title: 'Sales & Marketing Coordinator',
    company: 'Search Influence',
    dates: 'Dec 2021 – Oct 2022',
    highlights: [
      'Set up automated lead nurture workflows in HubSpot and aligned email, paid media, and SEO across the funnel.',
      'Continued owning the company blog, and built proposals and sales materials from performance data in Looker Studio.',
    ],
  },
  {
    id: 'cura',
    title: 'Director of Marketing & Brand Creative',
    company: 'Cura OS',
    dates: 'May 2021 – Oct 2021',
    highlights: [
      'Created marketing strategies structured around S.M.A.R.T. goals, with measurable targets for each channel.',
      'Directed a full brand identity and website rebuild, growing the site from one landing page to twelve SEO-optimized pages.',
      'Built buyer personas, sales funnels, and internal documentation, and led company-wide Pipedrive CRM adoption.',
      'Designed a persona-segmented Mailchimp drip campaign and created assets across email, social, and digital.',
    ],
  },
  {
    id: 'si-am',
    title: 'Account Manager & Coordinator',
    company: 'Search Influence',
    dates: 'Nov 2019 – Jun 2021',
    highlights: [
      'Ran multi-channel, full-funnel strategy for regulated industries (finance, legal, medical, higher ed), coordinating messaging, targeting, and content.',
      'Drove a 49% increase in inquiries for Palo Alto University and a 77% ROI lift for a plastic surgery client.',
      'Owned 20 training modules and knowledge-base articles, writing and updating them as industry and company standards changed.',
      'Trained in Lean methodology; implemented Zapier workflows for lead handling, CRM integration, and campaign consistency.',
    ],
  },
  {
    id: 'si-ac',
    title: 'Account Coordinator',
    company: 'Search Influence',
    dates: 'Sep 2018 – Nov 2019',
    highlights: [
      'Owned the company blog as Search Influence’s own account coordinator: built the editorial calendar from analytics, trends, and sales priorities, assigned up to 6 posts a month company-wide, and managed the editorial workflow.',
      'Defined editorial guidelines, gave hands-on draft feedback, and measured content-to-pipeline impact against S.M.A.R.T. goals.',
      'Led stakeholder interviews and requirements gathering across New Orleans City Park, co-wrote its website RFP, and evaluated vendor proposals.',
      'Coordinated the Vote Parks & Rec millage campaign, which passed: paid and Facebook ads, Unbounce landing pages, a Zapier yard-sign sign-up workflow, and reporting. Found and wrote its two winning award submissions.',
    ],
  },
];

export const expertise = [
  'AI enablement & adoption',
  'Workflow automation',
  'Systems integration',
  'Data analytics & BI reporting',
  'Web development & UX/UI',
  'Digital marketing',
];

export const skills: { group: string; items: string[] }[] = [
  { group: 'AI & build', items: ['Claude (Team, Code, Cowork)', 'ChatGPT', 'Gemini', 'Google Apps Script', 'HTML/CSS, JavaScript', 'Next.js', 'GitHub, Netlify'] },
  { group: 'Operations', items: ['Monday.com', 'Google Workspace', 'Notion', 'Jotform', 'Zapier', 'Pipedrive', 'Salesforce (basic)'] },
  { group: 'Marketing', items: ['Brevo', 'HubSpot', 'Mailchimp', 'WordPress, Unbounce', 'Google Ads, Adalysis', 'Meta Ads', 'PR Newswire'] },
  { group: 'Analytics', items: ['Google Analytics 4', 'Looker Studio', 'Supermetrics', 'Narrative BI'] },
  { group: 'Event technology', items: ['vFairs', 'Bravura', 'Whova', 'YourEvent', 'Bunny Stream'] },
  { group: 'Channels & tactics', items: ['Email automation', 'Lead nurture', 'A/B testing', 'SEO content', 'Win-back campaigns & event promotion'] },
  { group: 'Industries', items: ['Events & associations', 'Healthcare', 'Legal', 'Finance', 'Higher ed', 'Retail', 'Political'] },
];

