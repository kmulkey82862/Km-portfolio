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
          'Led company-wide adoption of Claude Team, connecting core systems, client files, and shared docs into one knowledge base for a 10-person team.',
          'Noticed the team was getting too many emails and sitting in calls that weren’t theirs; analyzed shared-inbox volume (one person handled about 80%), made the case, and replaced both with a weekly client digest.',
          'Built Claude automations that turn every Zoom summary into a living project record in Monday.com, with task updates drafted for review, saving an estimated 1.5–2.5 hours per person each week.',
          'When a colleague left, set up twice-daily AI triage of her 40+ daily emails so nothing got lost in the handoff, saving an estimated 1.5–2.5 hours a day.',
        ],
      },
      {
        heading: 'Tools & systems',
        bullets: [
          'Built a speaker graphic generator that fits any name and session to the brand and updates from the agenda. About 100 speakers made their own, saving an estimated 20–30 design hours, and they were a hit on LinkedIn.',
          'Built a logo resizer that took the back-and-forth, and the mental load, out of getting 150 sponsors’ logos into every required size.',
          'Owned the post-event survey and reporting program, condensing a lot of information into executive summaries for steering committees, funders, and staff, including a 39-page outcomes report from 9 data sources.',
          'Engineered a registration code system for 300–400 invitees and set up conference apps; FIMCON’s hit 75.1% adoption, 1.5x the benchmark.',
        ],
      },
      {
        heading: 'Marketing & communications',
        bullets: [
          'Researched personas and built the full-funnel strategy and website for a chronic disease convention, plus FIMCON 2026 email and LinkedIn content.',
          'Ran 30 Brevo campaigns at a 98.1% delivery rate and 39.8% click-to-open rate, over 2x the industry average; one press release earned 559 media pickups, including AP News.',
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
      'Ran IT and SEO, connected Myriad to the website inventory system, and negotiated sponsorships backed by market analysis.',
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
      'Rebuilt client reporting in Looker Studio, saving 4–5 hours per report, and challenged the team to raise its baseline SEO and analytics knowledge.',
      'Co-managed paid media for healthcare (LCMC), gaming, legal, and hospitality clients across Google Ads and Meta, running QA and KPI monitoring.',
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
    ],
  },
  {
    id: 'si-am',
    title: 'Account Manager & Coordinator',
    company: 'Search Influence',
    dates: 'Nov 2019 – Jun 2021',
    highlights: [
      'Ran full-funnel strategy for regulated industries (finance, legal, medical, higher ed), planning how content nurtures people toward the goal.',
      'Drove a 49% increase in inquiries for Palo Alto University and a 77% ROI lift for a plastic surgery client.',
      'Owned 20 training modules and knowledge-base articles, keeping them current as industry and company standards changed.',
      'Trained in Lean methodology; built Zapier workflows for lead handling and CRM integration.',
    ],
  },
  {
    id: 'si-ac',
    title: 'Account Coordinator',
    company: 'Search Influence',
    dates: 'Sep 2018 – Nov 2019',
    highlights: [
      'Owned the company blog as Search Influence’s own account coordinator and let the data decide what got written: built the editorial calendar from analytics, trends, and sales priorities, and managed up to 6 posts a month.',
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

