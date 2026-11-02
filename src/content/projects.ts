// Case studies, live sites, and creative work.
// `media` fields are ids from src/content/media.generated.json, which
// `npm run import-media` writes. Missing ids render as labelled placeholders.

export type ArchiveLink = { label: string; href?: string; to?: string; kind: 'demo' | 'live' | 'in-progress' };

export type ToolItem = {
  id: string;
  title: string;
  org: string;
  year: string;
  description: string;
  links: ArchiveLink[];
  media?: string;
};

// Work is grouped by type. Descriptions are factual; demos run on sample data.

// AI enablement at ARB Meetings & Events.
export const aiEnablement: ToolItem[] = [
  {
    id: 'claude-team',
    title: 'Claude Team rollout and knowledge base',
    org: 'ARB Meetings & Events',
    year: '2026',
    description:
      'Company-wide adoption of Claude Team across a 10-person team, with core systems, client project files, and shared documents connected into one central knowledge base.',
    links: [{ label: 'How I approach systems integration', to: '/#systems', kind: 'demo' }],
  },
  {
    id: 'client-digest',
    title: 'Automated digests',
    org: 'ARB Meetings & Events',
    year: '2026',
    description:
      'Claude automations that read project boards, inboxes, team chat, calendars, meeting summaries, and notes docs: a weekly client-by-client team digest, a daily shared-inbox triage that logs and assigns requests, and a personal daily brief with a time review and pre-drafted project updates.',
    links: [{ label: 'See all three', to: '/lab/client-digest', kind: 'demo' }],
  },
];

// Tools and automation at ARB Meetings & Events.
export const tools: ToolItem[] = [
  {
    id: 'speaker-graphic',
    title: 'Speaker graphic generator',
    org: 'ARB Meetings & Events',
    year: '2026',
    description:
      'Asked for one Canva template, I built a tool instead: the program agenda loaded in, a layout refined with Claude over rounds of QA so any length of name or session title fits, and a page where speakers get a custom graphic in two clicks. About 100 speakers used it, and it boosted the event’s buzz on LinkedIn.',
    links: [
      { label: 'Open the live tool', href: 'https://fimcon.org/en/speaker-social', kind: 'live' },
      { label: 'The story and a demo', to: '/lab/speaker-graphic', kind: 'demo' },
    ],
  },
  {
    id: 'logo-resizer',
    title: 'Logo resizer',
    org: 'ARB Meetings & Events',
    year: '2026',
    description:
      'Reads folders of exhibitor and sponsor logos, resizes them to the exact specs apps and websites need, and downloads them in one click.',
    links: [{ label: 'Try the demo', to: '/lab/logo-resizer', kind: 'demo' }],
  },
  {
    id: 'session-archive',
    title: 'Session archive pipeline',
    org: 'ARB Meetings & Events',
    year: '2026',
    description:
      'Apps Script moved session footage directly to pay-per-view streaming on Bunny Stream, replacing subscription hosting. Includes the searchable viewer interface, rebuilt here with sample sessions.',
    links: [{ label: 'Try the demo', to: '/lab/session-archive', kind: 'demo' }],
  },
];

export type Site = {
  name: string;
  kind: string;
  year: string;
  blurb: string;
  url?: string;
  /** Media id of a locally hosted copy (HTML via import-media). Used instead of `url` once imported. */
  localPage?: string;
  media?: string;
  status?: 'live' | 'in-progress';
};

export const freelanceSites: Site[] = [
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
    name: 'Katelyn’s World',
    kind: 'Interactive 3D',
    year: '2026',
    blurb: 'A real-time WebGL New Orleans sunset scene.',
    url: '/katelyns-world/',
    media: 'site-3d-world',
    status: 'live',
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

// Websites built at ARB Meetings & Events, shown as one entry with the events as tags,
// so the clients aren't presented as Katelyn's own.
export type SiteGroup = {
  title: string;
  org: string;
  blurb: string;
  media: string[];
  sites: { name: string; url: string; status?: 'in-progress' }[];
};

export const arbSites: SiteGroup = {
  title: 'Conference websites',
  org: 'Built for ARB Meetings & Events',
  blurb: 'Event websites and pages built while at ARB Meetings & Events: home pages, agendas, calls for sessions, registration, hotel and travel, sponsorship, and FAQs.',
  media: ['site-adnet-2027', 'site-cdc'],
  sites: [
    { name: 'AdNet 2027 Annual Conference', url: 'https://adnetcf.org/page/conference-2027' },
    { name: 'American Chronic Disease Convention', url: 'https://staging.chronicdiseaseconvention.com', status: 'in-progress' },
  ],
};

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
