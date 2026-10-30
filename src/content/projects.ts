// Case studies, live sites, and creative work.
// `media` fields are ids from src/content/media.generated.json, which
// `npm run import-media` writes. Missing ids render as labelled placeholders.

export type CaseStudy = {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  proof: { label: string; href?: string; to?: string; status?: 'live' | 'in-progress' | 'demo' }[];
  stack: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: 'work-arb',
    eyebrow: 'AI enablement · ARB Meetings & Events',
    title: 'Claude as the central hub for a 10-person team',
    summary:
      'I rolled out Claude Team company-wide, then wired it to the systems the team already lived in: Monday.com, shared inboxes, Google Workspace, Zoom, Jotform, and Brevo. Most of these automations were built in about six to eight weeks.',
    proof: [
      { label: 'Explore the systems map', to: '/#systems', status: 'demo' },
      { label: 'Run a client digest', to: '/lab/client-digest', status: 'demo' },
    ],
    stack: ['Claude Team', 'Claude skills & connectors', 'Monday.com', 'Apps Script', 'Brevo'],
  },
  {
    id: 'work-tools',
    eyebrow: 'Internal tools · ARB Meetings & Events',
    title: 'Small tools that removed whole categories of busywork',
    summary:
      'A speaker graphic generator about 100 speakers used to make their own promo cards. A logo resizer that turns a folder of sponsor logos into every spec an app or site needs, in one click. A comp registration system for 300–400 invitees. A video pipeline that moved footage straight to pay-per-view streaming.',
    proof: [
      { label: 'Speaker graphic generator', to: '/lab/speaker-graphic', status: 'demo' },
      { label: 'Logo resizer', to: '/lab/logo-resizer', status: 'demo' },
      { label: 'Registration codes', to: '/lab/registration-codes', status: 'demo' },
      { label: 'FIMCON session archive', href: 'https://fimcon.org/en/fimcon-2026-session-recordings', status: 'live' },
    ],
    stack: ['Canvas API', 'Google Apps Script', 'Bunny Stream', 'JSZip'],
  },
  {
    id: 'work-fimcon',
    eyebrow: 'Marketing systems · FIMCON 2026',
    title: 'A convention that sold out in a day',
    summary:
      'Role-specific email, LinkedIn, and web content for each audience, a PR Newswire release, attendee app setup, and social toolkits for attendees, speakers, and sponsors. I produced all the analytics, including a 39-page outcomes report combining 9 data sources with industry benchmarks.',
    proof: [
      { label: 'Session archive', href: 'https://fimcon.org/en/fimcon-2026-session-recordings', status: 'live' },
      { label: 'Speaker social tool', href: 'https://fimcon.org/en/speaker-social', status: 'live' },
      { label: 'Attendee app page', href: 'https://fimcon.org/en/fimcon-2026-app', status: 'live' },
    ],
    stack: ['Brevo', 'PR Newswire', 'Attendee app', 'Looker Studio'],
  },
  {
    id: 'work-comeaux',
    eyebrow: 'Performance marketing · Comeaux Furniture',
    title: 'More conversions for less, and a day of QA down to an hour',
    summary:
      'I restructured Google Ads around PMax with strategic pruning and AI-informed copy, and automated inventory reporting between Myriad, the website, and Google Sheets.',
    proof: [],
    stack: ['Google Ads', 'Narrative BI', 'Google Sheets', 'Myriad'],
  },
];

export type Site = {
  name: string;
  kind: string;
  year: string;
  blurb: string;
  url?: string;
  media?: string;
  status?: 'live' | 'in-progress';
};

export const sites: Site[] = [
  {
    name: 'Matt Chapin Music',
    kind: 'Artist website',
    year: '2025',
    blurb: 'A moody, cinematic site for a New Orleans jazz guitarist and composer.',
    url: 'https://mattchapinmusic.com',
    media: 'site-matt-chapin',
    status: 'live',
  },
  {
    name: 'Lighthouse Strategy Group',
    kind: 'Consulting firm',
    year: '2025',
    blurb: 'A clean, credible presence for an independent consultant.',
    url: 'https://lighthousestrategygroup.com',
    media: 'site-lighthouse',
    status: 'live',
  },
  {
    name: 'Katelyn’s 3D World',
    kind: 'Interactive 3D',
    year: '2026',
    blurb: 'A real-time WebGL New Orleans sunset scene.',
    url: 'https://nice-dune-0010c2e10.7.azurestaticapps.net',
    media: 'site-3d-world',
    status: 'live',
  },
  {
    name: 'Chronic Disease Convention',
    kind: 'Convention website & content strategy',
    year: '2026',
    blurb: 'Full-funnel content strategy and website. Launching soon.',
    url: 'https://staging.chronicdiseaseconvention.com',
    media: 'site-cdc',
    status: 'in-progress',
  },
  {
    name: 'Vermin Mother',
    kind: 'Band website · design & content',
    year: '',
    blurb: 'Design and content for an independent band.',
    media: 'site-vermin-mother',
  },
  {
    name: 'Web Deva Component Bank',
    kind: 'UI library',
    year: '2026',
    blurb: 'A browsable bank of interface components I show clients when we scope a build.',
    url: 'https://webdivacomponents.netlify.com',
    media: 'site-component-bank',
    status: 'live',
  },
];

export type CreativeItem = {
  id: string;
  title: string;
  client: string;
  kind: string;
  media: string[];
  note?: string;
};

export const creative: CreativeItem[] = [
  {
    id: 'hnoc',
    title: 'Yet She Is Advancing',
    client: 'The Historic New Orleans Collection',
    kind: 'Exhibition promo · video & design tests',
    media: ['hnoc-video', 'hnoc-1', 'hnoc-2', 'hnoc-3'],
  },
  {
    id: 'gotta-geaux',
    title: 'Gotta Geaux',
    client: 'Comeaux Furniture',
    kind: 'AI-edited video promo & Canva template',
    media: ['comeaux-gotta-geaux'],
  },
  {
    id: 'comeaux-brand',
    title: 'Infographics, social & email',
    client: 'Comeaux Furniture',
    kind: 'Branded assets',
    media: ['comeaux-infographic-1', 'comeaux-social-1', 'comeaux-email-1'],
  },
  {
    id: 'jazz-fest',
    title: 'Jazz Fest social promos',
    client: 'Margot Manning',
    kind: 'Music promo · motion',
    media: ['jazzfest-1', 'jazzfest-2'],
  },
  {
    id: 'music-misc',
    title: 'Gesso & Busted on Bourbon',
    client: 'New Orleans music',
    kind: 'Promo design',
    media: ['gesso-promo', 'busted-on-bourbon'],
  },
  {
    id: 'smo',
    title: 'Social & email program',
    client: 'Sewing Machine Outlet',
    kind: 'Instagram, stories & email graphics',
    media: ['smo-social-1', 'smo-email-1'],
  },
  {
    id: 'cura',
    title: 'Brand identity',
    client: 'Cura OS',
    kind: 'Identity & website redesign',
    media: ['cura-1', 'cura-2'],
  },
];
