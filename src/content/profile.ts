// Single source of truth for who Katelyn is. Edit here, not in components.

export const profile = {
  firstName: 'Katelyn',
  lastName: 'Mulkey',
  positioning: 'AI Operations & Marketing Systems',
  // Résumé summary, verbatim.
  summary:
    'I find where work gets lost, in inboxes, meetings, and handoffs, and build the systems that make it manageable. Hands-on with generative AI since 2023, I roll it out to teams, connect the tools they already use, and condense a lot of information into briefs people can act on.',
  email: 'contactkmulkey@gmail.com',
  phone: '985.778.7982',
  phoneHref: 'tel:+19857787982',
  location: 'New Orleans, LA',
  workStyle: 'Remote or hybrid',
  locationLong: 'New Orleans, Louisiana',
  // Drop the latest resume at public/Katelyn_Mulkey_Resume.pdf (see README).
  resumePath: '/Katelyn_Mulkey_Resume.pdf',
  linkedin: '', // add when ready
  webDeva: {
    name: 'Web Deva',
    blurb: 'My freelance studio: websites and interactive builds for artists, consultants, and small teams.',
    componentBank: 'https://webdevacomponents.netlify.app',
  },
} as const;

export const education = {
  degree: 'BS, Marketing',
  school: 'University of New Orleans',
  year: '2018',
  honors: ['Outstanding Marketing Senior; Alpha Mu Alpha; Alpha Lambda Delta'],
  certifications: ['Information Mapping certification · structured technical writing, FS Pro'],
};

export const awards = [
  { org: 'US Social Media Awards', year: '2020', title: 'Best Strategic Use of Social Media' },
  { org: 'PRAL Flambeaux Awards', year: '2019', title: 'Outstanding Advertising Campaign · “Vote Parks & Rec”' },
];
