// Nodes for the interactive systems map: what fed Claude at ARB, and what came out.

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
    id: 'monday',
    label: 'Monday.com',
    side: 'in',
    detail: 'Client workspaces, boards, and task status. I administered it: standardized structures across accounts, built workflows and automations.',
    links: ['digests', 'notes', 'dashboards'],
  },
  {
    id: 'inboxes',
    label: 'Shared inboxes',
    side: 'in',
    detail: 'Client threads and requests, scanned for open and pending items.',
    links: ['digests'],
  },
  {
    id: 'workspace',
    label: 'Google Workspace',
    side: 'in',
    detail: 'Client project files and shared documents, connected into one knowledge base the whole team can query.',
    links: ['rfp', 'dashboards', 'digests'],
  },
  {
    id: 'zoom',
    label: 'Zoom',
    side: 'in',
    detail: 'Meeting summaries, routed to the right client automatically.',
    links: ['notes'],
  },
  {
    id: 'jotform',
    label: 'Jotform',
    side: 'in',
    detail: 'Registration, speaker, and sponsor intake, integrated with Monday.com and Brevo.',
    links: ['dashboards'],
  },
  {
    id: 'brevo',
    label: 'Brevo',
    side: 'in',
    detail: '30 campaigns and 109K+ sends. Campaign data flowed into reporting.',
    links: ['dashboards'],
  },
  {
    id: 'claude',
    label: 'Claude Team',
    side: 'hub',
    detail: 'The central knowledge base. Shared skills, prompts, and connectors let a 10-person team ask one place about every client, and unattended workflows check in and report when they finish.',
  },
  {
    id: 'digests',
    label: 'Client digests',
    side: 'out',
    detail: 'Daily or weekly emails listing in-progress and pending items per client, built from project systems and inboxes.',
    demo: '/lab/client-digest',
  },
  {
    id: 'notes',
    label: 'Routed meeting notes',
    side: 'out',
    detail: 'Zoom summaries filed into each client’s Monday.com workspace, so they’re searchable by AI later.',
  },
  {
    id: 'rfp',
    label: 'RFP scanner',
    side: 'out',
    detail: 'Searches industry sources every morning for relevant bids and starts response drafts from company information.',
  },
  {
    id: 'dashboards',
    label: 'Dashboards & reports',
    side: 'out',
    detail: 'Interactive dashboards in Claude and Looker Studio on live platform data, and a 39-page outcomes report from 9 sources.',
  },
];
