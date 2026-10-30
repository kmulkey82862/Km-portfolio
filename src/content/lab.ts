// Working demos. Every demo runs in the browser on sample data only.

export type LabDemo = {
  slug: string;
  title: string;
  blurb: string;
  provesLine: string;
};

export const labDemos: LabDemo[] = [
  {
    slug: 'speaker-graphic',
    title: 'Speaker graphic generator',
    blurb: 'Upload a headshot, type a name and session, download a share-ready graphic. Text sizes itself to fit.',
    provesLine: 'The production tool was used by about 100 speakers.',
  },
  {
    slug: 'logo-resizer',
    title: 'Logo resizer',
    blurb: 'Drop a pile of sponsor logos, pick the specs, download every size as one ZIP.',
    provesLine: 'Replaced hand-resizing exhibitor and sponsor logos for apps and websites.',
  },
  {
    slug: 'registration-codes',
    title: 'Comp registration codes',
    blurb: 'Generate unique codes, preview the merged email, simulate redemptions, and see who gets a reminder.',
    provesLine: 'The real system handled 300–400 invitees per event.',
  },
  {
    slug: 'client-digest',
    title: 'Client digest',
    blurb: 'Watch an automation scan a project board, an inbox, and meeting notes, then write the client update.',
    provesLine: 'Mirrors the daily and weekly digests I built in Claude.',
  },
];
