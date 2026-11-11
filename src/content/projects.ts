// Case studies, live sites, and creative work.
// `media` fields are ids from src/content/media.generated.json, which
// `npm run import-media` writes. Missing ids render as labelled placeholders.

export type ArchiveLink = { label: string; href?: string; to?: string; kind: 'demo' | 'live' | 'in-progress' };

export type ToolItem = {
  id: string;
  title: string;
  org?: string;
  year: string;
  description: string;
  links: ArchiveLink[];
  media?: string;
  /** One or two sentences for the Tools cards. */
  teaser?: string;
  /** Card image: public/media/tool-<image>-600.webp and -1200.webp. */
  image?: string;
};

// Work is grouped by type. Descriptions are factual; demos run on sample data.

// AI enablement, in-house.
export const aiEnablement: ToolItem[] = [
  {
    id: 'claude-team',
    title: 'Claude Team rollout and knowledge base',
    year: '2026',
    description:
      'Company-wide adoption of Claude Team across a 10-person team, with core systems, client project files, and shared documents connected into one central knowledge base.',
    links: [],
  },
];

// Internal tools, in-house.
export const tools: ToolItem[] = [
  {
    id: 'speaker-graphic',
    title: 'Speaker graphic generator',
    image: 'speaker',
    teaser: 'Fits any name and session to the brand, so about 100 speakers made their own graphic in two clicks. They were a hit on LinkedIn.',
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
    image: 'logo',
    teaser: 'Turns a folder of messy sponsor logos into every size the app, site, and emails need, without distortion, in one click.',
    year: '2026',
    description:
      'Reads folders of exhibitor and sponsor logos, resizes them to the exact specs apps and websites need, and downloads them in one click.',
    links: [{ label: 'Try the demo', to: '/lab/logo-resizer', kind: 'demo' }],
  },
  {
    id: 'session-archive',
    title: 'Session archive pipeline',
    image: 'archive',
    teaser: 'Moved session recordings to pay-per-view streaming, with a searchable on-demand archive for attendees.',
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
  /** Where it's hosted and how it was built. */
  platform?: string;
};

export const freelanceSites: Site[] = [
  {
    name: 'Web Deva Digital',
    kind: 'Studio website',
    year: '2026',
    blurb: 'The site for my freelance studio: AI consulting, web design, and marketing for New Orleans businesses.',
    platform: 'Custom build · Netlify (webdevadigital.com coming soon)',
    url: 'https://webdevadigital.netlify.app',
    media: 'site-web-deva',
    status: 'live',
  },
  {
    name: 'Matt Chapin Music',
    kind: 'Artist website',
    year: '2025',
    blurb:
      'A site for a New Orleans jazz guitarist and composer, built from his idea of what would look cool. The interactive hero layers photographs, animated type, a moonlight effect, and drifting music notes. On the media page, a visualizer above the player moves to the rhythm of one of his original suites as it plays.',
    platform: 'Custom build · Netlify with a custom domain',
    url: 'https://mattchapinmusic.com',
    media: 'site-matt-chapin',
    status: 'live',
  },
  {
    name: 'Lighthouse Strategy Group',
    kind: 'Consulting firm',
    year: '2025',
    blurb:
      'Developed closely with the owner to match her brand and bring its elements to life, including a custom hero. The custom HTML runs inside Squarespace so she can manage the site herself.',
    platform: 'Custom HTML · Squarespace',
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
    name: 'Web Deva Component Bank',
    kind: 'UI library',
    year: '2026',
    blurb: 'A browsable bank of interface components I show clients when we scope a build.',
    url: 'https://webdevacomponents.netlify.app',
    media: 'site-component-bank',
    status: 'live',
  },
];

// Event websites built in-house, shown as one entry with the events as tags,
// so the clients aren't presented as Katelyn's own.
export type SiteGroup = {
  title: string;
  org: string;
  blurb: string;
  note: string;
  media: string[];
  sites: { name: string; url: string; platform: string; blurb: string; archived?: boolean }[];
};

export const arbSites: SiteGroup = {
  title: 'Conference websites',
  org: 'Event websites',
  blurb: 'Event websites built in-house: home pages, agendas, calls for sessions, registration, hotel and travel, sponsorship, and FAQs. I was the creative director and designer on these, working within each client’s brand guidelines.',
  note: 'The HTML for these sites is preserved here as the version that was entirely my work. Live sites change as others optimize them or update content, so these link to archived copies instead of the live URLs. Forms are switched off in the copies.',
  media: ['site-adnet-2027', 'site-cdc'],
  sites: [
    {
      name: 'Convention Website',
      url: '/work/acdc/',
      platform: 'Custom HTML, CSS, and JavaScript · WordPress',
      blurb:
        'Six pages and a site-wide header, footer, and mailing-list pop-up. The scroll animation where the eight sector pieces of glass come together was my idea; I found and handcrafted each piece so it could work.',
      archived: true,
    },
    {
      name: 'Conference Website',
      url: '/work/adnet/',
      platform: 'Custom HTML pages · YourEvent',
      blurb: 'Home, agenda, call for sessions, registration, hotel and travel, sponsorship, sponsors, and FAQ pages.',
      archived: true,
    },
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
