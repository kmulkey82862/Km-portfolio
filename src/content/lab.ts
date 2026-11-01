// Browser versions of tools from the archive. Every demo runs on sample data only.

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
    blurb: 'Upload a headshot, enter a name and session, and download a graphic. Text resizes to fit.',
    provesLine: 'The production version was used by about 100 speakers.',
  },
  {
    slug: 'logo-resizer',
    title: 'Logo resizer',
    blurb: 'Add sponsor logos, choose output sizes, and download every size as a ZIP.',
    provesLine: 'Rebuilt from the tool used for exhibitor and sponsor logos.',
  },
  {
    slug: 'registration-codes',
    title: 'Complimentary registration codes',
    blurb: 'Generate unique codes, preview the merged email, and simulate redemptions and reminders.',
    provesLine: 'The production system handled 300–400 invitees.',
  },
  {
    slug: 'client-digest',
    title: 'Client digest',
    blurb: 'A sample client digest built from a project board, an inbox, and meeting notes.',
    provesLine: 'Based on the daily and weekly digests built in Claude.',
  },
];
