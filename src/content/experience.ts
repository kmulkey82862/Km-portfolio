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
          'Automated client digests from project systems and shared inboxes, and routed Zoom summaries into each client’s Monday.com workspace.',
          'Administered Monday.com, standardizing client workspaces and integrating Brevo, Jotform, and Google Workspace.',
        ],
      },
      {
        heading: 'Tools & systems',
        bullets: [
          'Developed an OCR receipt scanner, a speaker graphic generator used by about 100 speakers, and a pay-per-view video archive.',
          'Engineered a registration code system for 300–400 invitees: unique codes, personalized emails, redemption tracking, and reminders.',
          'Owned post-conference evaluations and reporting as a client product, condensing results into overviews and briefs tailored to steering committees, funders, and the internal team.',
          'Authored a 39-page outcomes report drawing on 9 data sources, and designed interactive dashboards in Claude and Looker Studio.',
          'Configured conference apps on vFairs, Bravura, and Whova; FIMCON’s app reached 75.1% adoption, about 1.5x the industry benchmark.',
        ],
      },
      {
        heading: 'Marketing & communications',
        bullets: [
          'Researched user personas and built the full-funnel content strategy and website for a chronic disease convention, plus email, LinkedIn, and web content for FIMCON 2026.',
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
    dates: 'Feb 2024 – Jun 2025',
    highlights: [
      'Managed Google Ads ($2K–$15K/mo), achieving a 65% YoY conversion increase and 62% lower cost per conversion through PMax, strategic pruning, and AI-informed copy.',
      'Built dashboards and automated reporting in Narrative BI and Google Sheets, cutting quarterly inventory QA from 24 hours to under one.',
      'Directed SEO, site optimization, and digital asset creation to grow organic traffic and conversion rates.',
      'Maintained IT infrastructure and connected Myriad to the website inventory system to improve operational efficiency.',
      'Conducted market analysis and negotiated sponsorships aligned with brand strategy.',
    ],
  },
  {
    id: 'morgan',
    title: 'Digital Manager & Analytics Coordinator',
    company: 'Morgan & Co.',
    dates: 'Oct 2022 – Jul 2023',
    highlights: [
      'As the agency’s first and only SEO specialist, scoped and led every SEO project, defining what the work included and seeing it through.',
      'Adapted reporting and analytics as projects ran, using client feedback and pushback on contract terms to decide what to measure.',
      'Rebuilt client reporting in Looker Studio, saving 4–5 hours per report and making performance reviews more strategic.',
      'Coached the team to raise its baseline SEO and analytics knowledge.',
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
      'Set up automated lead nurture workflows in HubSpot to support cross-channel campaigns.',
      'Aligned email, paid media, and SEO for a consistent strategy across the full funnel.',
      'Created marketing reports and KPI dashboards in Looker Studio and Supermetrics, tracking performance against client goals.',
      'Contributed to proposals and campaign planning using past performance data and client objectives.',
    ],
  },
  {
    id: 'cura',
    title: 'Director of Marketing & Brand Creative',
    company: 'Cura OS',
    dates: 'May 2021 – Oct 2021',
    highlights: [
      'Created marketing strategies structured around S.M.A.R.T. goals, with measurable targets for each channel.',
      'Led company-wide Pipedrive CRM adoption, streamlining lead handling and sales workflows.',
      'Designed a Mailchimp drip campaign driven by persona segmentation and campaign analytics.',
      'Directed a full brand identity and website redesign to improve UX and support conversion goals.',
      'Developed creative assets across email, social, and digital, with campaign tracking and iteration cycles.',
    ],
  },
  {
    id: 'si-am',
    title: 'Account Manager & Coordinator',
    company: 'Search Influence',
    dates: 'Nov 2019 – Jun 2021',
    highlights: [
      'Ran multi-channel strategy for regulated industries (finance, legal, medical, higher ed), aligning paid, organic, and website efforts.',
      'Led funnel-stage planning, coordinating messaging, targeting, and content across the customer journey.',
      'Trained in Lean methodology; implemented Zapier workflows for lead handling, CRM integration, and campaign consistency.',
      'Drove a 49% increase in inquiries for Palo Alto University and a 77% ROI lift for a plastic surgery client.',
      'Delivered strategic reports that turned analytics into clear next steps for full-funnel campaigns.',
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
  { group: 'Marketing', items: ['Brevo', 'HubSpot', 'Mailchimp', 'WordPress, Unbounce', 'Google Ads, Adalysis', 'Meta Ads', 'PR Newswire'] },
  { group: 'Analytics', items: ['Google Analytics 4', 'Looker Studio', 'Supermetrics', 'Narrative BI'] },
  { group: 'Event tech', items: ['vFairs', 'Bravura', 'Whova', 'YourEvent', 'Bunny Stream'] },
  { group: 'Campaigns', items: ['Email drips', 'Lead nurture', 'A/B testing', 'SEO content', 'Re-engagement & event promotion'] },
  { group: 'Industries', items: ['Events & associations', 'Healthcare', 'Legal', 'Finance', 'Higher ed', 'Retail', 'Political'] },
];

