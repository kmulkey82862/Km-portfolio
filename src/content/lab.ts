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
    blurb: 'Built instead of a Canva template: speakers download a custom, correctly sized graphic in two clicks.',
    provesLine: 'Used by about 100 speakers. Links to the live tool, plus a rebuild you can try.',
  },
  {
    slug: 'logo-resizer',
    title: 'Logo resizer',
    blurb: 'Add sponsor logos, choose output sizes, and download every size as a ZIP.',
    provesLine: 'Rebuilt from the tool used for exhibitor and sponsor logos.',
  },
  {
    slug: 'client-digest',
    title: 'Automated digests',
    blurb: 'Three Claude-built digests: a weekly team overview, a shared inbox triage, and my own daily Chaos Brief.',
    provesLine: 'Rebuilt with placeholder clients and people.',
  },
  {
    slug: 'session-archive',
    title: 'Session archive',
    blurb: 'A searchable on-demand archive: browse by day, search by session or speaker, and open a recording.',
    provesLine: 'Rebuilt from the pay-per-view session archive built for a conference, shown here with sample sessions.',
  },
];
