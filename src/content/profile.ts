// Single source of truth for who Katelyn is. Edit here, not in components.

export const profile = {
  firstName: 'Katelyn',
  lastName: 'Mulkey',
  positioning: 'AI Operations & Marketing Systems',
  // Résumé summary, verbatim.
  summary:
    'AI operations and marketing systems professional working hands-on with generative AI since 2023. Leads AI adoption, connects core business systems, and builds AI-assisted tools and automations that cut manual data work and turn scattered information into clear, measurable results.',
  email: 'contactkmulkey@gmail.com',
  phone: '985.778.7982',
  phoneHref: 'tel:+19857787982',
  location: 'New Orleans, LA',
  locationLong: 'New Orleans, Louisiana',
  // Drop the latest resume at public/Katelyn_Mulkey_Resume.pdf (see README).
  resumePath: '/Katelyn_Mulkey_Resume.pdf',
  linkedin: '', // add when ready
  webDeva: {
    name: 'Web Deva',
    blurb: 'My freelance studio: websites and interactive builds for artists, consultants, and small teams.',
    componentBank: 'https://webdivacomponents.netlify.com',
  },
} as const;

export const education = {
  degree: 'BS Marketing',
  school: 'University of New Orleans',
  year: '2018',
  honors: [
    'Outstanding Marketing Senior 2018',
    'Alpha Mu Alpha Marketing Honors Society',
    'Alpha Lambda Delta Academic Honor Society',
  ],
};

export const awards = [
  {
    title: 'Best Strategic Use of Social Media',
    org: 'US Social Media Awards',
    year: '2020',
    project: 'Vote Parks & Rec – New Orleans Parish',
  },
  {
    title: 'Outstanding Advertising Campaign',
    org: 'PRAL Flambeaux Awards',
    year: '2019',
    project: 'Vote Parks & Rec – New Orleans Parish',
  },
];
