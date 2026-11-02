// Nodes for the systems-integration diagram: kinds of business software connected to an AI
// knowledge base, and what the connection produces. Labeled by software type, not by vendor
// or employer, because this illustrates a skill rather than any one company's setup.

export type SystemNode = {
  id: string;
  label: string;
  side: 'in' | 'hub' | 'out';
  detail: string;
  links?: string[]; // ids of outputs this input feeds
  demo?: string; // route to a lab demo
};

export const systemNodes: SystemNode[] = [
  {
    id: 'pm',
    label: 'Project management',
    side: 'in',
    detail: 'Boards, tasks, and status across client or team workspaces. Structured, standardized, and automated so the data stays usable.',
    links: ['digests', 'notes', 'dashboards'],
  },
  {
    id: 'email',
    label: 'Shared inboxes',
    side: 'in',
    detail: 'Threads and requests, scanned for open and pending items so nothing waits on someone remembering it.',
    links: ['digests'],
  },
  {
    id: 'docs',
    label: 'Cloud documents',
    side: 'in',
    detail: 'Project files and shared documents, connected into one knowledge base a whole team can ask questions of.',
    links: ['dashboards', 'digests'],
  },
  {
    id: 'meetings',
    label: 'Video meetings',
    side: 'in',
    detail: 'Meeting summaries, routed automatically to the right project so they’re searchable later.',
    links: ['notes'],
  },
  {
    id: 'forms',
    label: 'Forms & registration',
    side: 'in',
    detail: 'Intake and registration data, integrated with project tools and email so it doesn’t need retyping.',
    links: ['dashboards'],
  },
  {
    id: 'esp',
    label: 'Email marketing',
    side: 'in',
    detail: 'Campaign and engagement data, fed into reporting.',
    links: ['dashboards'],
  },
  {
    id: 'hub',
    label: 'AI assistant',
    side: 'hub',
    detail:
      'The central knowledge base, set up in an AI assistant such as Claude. Shared skills, prompts, and connectors give a team one place to ask about any project, and unattended workflows check in and report when they finish.',
  },
  {
    id: 'digests',
    label: 'Status digests',
    side: 'out',
    detail: 'Daily or weekly emails listing in-progress and pending items, built from project tools and inboxes.',
    demo: '/lab/client-digest',
  },
  {
    id: 'notes',
    label: 'Routed meeting notes',
    side: 'out',
    detail: 'Meeting summaries filed into the right project workspace, searchable by AI.',
  },
  {
    id: 'dashboards',
    label: 'Dashboards & reports',
    side: 'out',
    detail: 'Interactive dashboards on live platform data, and reports that combine several sources.',
  },
];
