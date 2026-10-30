// Single source of truth for who Katelyn is. Edit here, not in components.

export const profile = {
  firstName: 'Katelyn',
  lastName: 'Mulkey',
  positioning: 'AI Operations & Marketing Systems',
  summary:
    'AI operations and marketing systems professional working hands-on with generative AI since 2023. I lead AI adoption, connect core business systems, and build AI-assisted tools and automations that cut manual data work and turn scattered information into clear, measurable results.',
  email: 'contactkmulkey@gmail.com',
  phone: '985.778.7982',
  phoneHref: 'tel:+19857787982',
  location: 'New Orleans, LA',
  coordinates: '29.95° N, 90.07° W',
  availability: 'Open to remote and hybrid roles',
  // Drop the latest resume at public/Katelyn_Mulkey_Resume.pdf (see README).
  resumePath: '/Katelyn_Mulkey_Resume.pdf',
  linkedin: '', // add when ready
  webDeva: {
    name: 'Web Deva',
    blurb: 'My freelance studio: websites and interactive builds for artists, consultants, and small teams.',
    componentBank: 'https://webdivacomponents.netlify.com',
  },
} as const;

export const capabilities = [
  'Write Claude skills and shared prompts',
  'Build connectors between business systems',
  'Run unattended Claude workflows that check in and report when work finishes',
  'Use Claude in the browser, with human oversight',
  'Train teams to adopt AI and keep using it',
];

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
