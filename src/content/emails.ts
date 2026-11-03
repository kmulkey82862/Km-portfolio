export type EmailSample = { file: string; title: string; type: string };

export const ARB_EMAIL_NOTE =
  'Work created by Katelyn Mulkey as an employee of ARB Meetings & Events. Client names, logos, and dates have been redacted and replaced with fictional stand-ins for privacy. All work product and trademarks belong to ARB Meetings & Events and its respective clients. Shown for portfolio purposes only.';

// Rebuilt copies with placeholder client aliases, Jane Doe-style names, and dates that don't exist.
export const arbEmails: EmailSample[] = [
  { file: 'client-a-networking-breakfast.html', title: 'Networking breakfast', type: 'Onsite day-of' },
  { file: 'client-a-conference-app.html', title: 'Conference app launch', type: 'App download' },
  { file: 'client-a-lead-retrieval.html', title: 'Lead retrieval update', type: 'Exhibitor update' },
  { file: 'client-a-huddle-up.html', title: 'Huddle Up at the Harbor', type: 'Networking event invite' },
  { file: 'client-b-launch.html', title: 'Conference launch', type: 'Registration launch' },
  { file: 'client-c-launch-wireframe.html', title: 'Launch email wireframe', type: 'Wireframe' },
];
