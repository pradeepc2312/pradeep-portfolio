import type { Project } from '../types/project';

export const projects: Project[] = [
  {
    slug: 'forge-cli',
    title: 'Forge',
    year: 2024,
    role: 'Creator & maintainer',
    cover:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80',
    coverAlt: 'Laptop screen showing dense source code in a dark editor theme',
    tags: ['Open Source', 'Tooling', 'Node.js'],
    tech: ['Node.js', 'TypeScript', 'oclif', 'Vitest', 'esbuild'],
    summary:
      'Forge is a zero-config CLI that scaffolds repositories, wires linting and tests, and keeps templates in sync across teams.',
    body: `Shipping developer tooling means optimising for cold starts and predictable behaviour on every OS. Forge wraps opinionated defaults in composable recipes so squads can adopt the same baseline without inheriting a monolithic generator.

The runtime is built on Node with TypeScript-first templates, streaming prompts, and a plugin surface for internal packages. Telemetry is opt-in and documented; releases are signed and published through GitHub Actions with provenance enabled.

Since open-sourcing the project, contributors have added adapters for pnpm workspaces and Bun test runners. The focus stays narrow: make the first hour of a new service boringly fast so engineers can spend energy on product logic instead.`,
    liveUrl: 'https://forge-cli.dev',
    repoUrl: 'https://github.com/pradeepc/forge-cli',
    featured: true,
  },
  {
    slug: 'canvas-weave',
    title: 'Canvas Weave',
    year: 2023,
    role: 'Full-stack engineer',
    cover:
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=1600&q=80',
    coverAlt: 'Abstract flowing lines in blue and violet suggesting networked collaboration',
    tags: ['Web', 'Real-time', 'Canvas'],
    tech: ['React', 'WebSockets', 'Canvas API', 'Zustand', 'Rust (edge relay)'],
    summary:
      'Canvas Weave is a low-latency collaborative whiteboard for remote architecture reviews, pairing a CRDT-backed document model with hardware-accelerated strokes.',
    body: `Latency budgets drove most architectural calls. The browser canvas handles raster strokes while vector primitives sync through a compact binary protocol over WebSockets, with presence and locks mediated by a small edge relay.

React keeps the toolbar and layer chrome predictable; the heavy lifting stays off the main thread where possible. Session replay hooks help teams audit decisions without exporting raw canvas bitmaps.

Pilot teams cut review prep time by standardising stencil libraries and measurement overlays. The product roadmap prioritises accessibility for keyboard-first navigation and contrast-safe themes.`,
    liveUrl: 'https://canvasweave.app',
    repoUrl: 'https://github.com/pradeepc/canvas-weave',
    featured: false,
  },
  {
    slug: 'ledgerly-cloud',
    title: 'Ledgerly Cloud',
    year: 2023,
    role: 'Frontend lead',
    cover:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
    coverAlt: 'Analytics dashboard with charts and KPI tiles on a dark interface',
    tags: ['Web', 'AWS', 'Analytics'],
    tech: ['React', 'AWS SDK', 'Recharts', 'TanStack Query', 'OpenTelemetry'],
    summary:
      'Ledgerly Cloud surfaces AWS spend alongside utilisation signals so FinOps teams can catch drift before invoices close.',
    body: `Finance stakeholders wanted narratives, not another cost table. The dashboard layers anomaly detection on top of tagged resources, with saved views for product lines and environments.

Recharts handles responsive visualisations while TanStack Query manages cache lifetimes against the AWS Cost Explorer API. Sensitive credentials never touch the browser; a thin BFF signs short-lived requests.

Rollouts included guardrails for IAM least privilege and exportable evidence packs for audits. Adoption grew fastest among teams running multi-account landing zones.`,
    liveUrl: 'https://ledgerly.cloud',
    repoUrl: 'https://github.com/pradeepc/ledgerly',
    featured: true,
  },
  {
    slug: 'pocket-ledger',
    title: 'Pocket Ledger',
    year: 2022,
    role: 'Mobile engineer',
    cover:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=80',
    coverAlt: 'Hand holding a smartphone outdoors with a minimal finance app visible',
    tags: ['Mobile', 'Finance', 'React Native'],
    tech: ['React Native', 'SQLite', 'Expo', 'Zod', 'MMKV'],
    summary:
      'Pocket Ledger is an offline-first expense tracker for contractors who need receipts categorised without surrendering data to third-party aggregators.',
    body: `SQLite remains the source of truth on device, with migrations versioned and tested on real hardware profiles. Sync is explicit: users opt into encrypted backups rather than silent cloud merges.

The UI favours thumb reach, large tap targets, and fast search across merchants. Zod validates imports from bank CSV exports so bad rows never corrupt balances.

Beta feedback emphasised battery impact; batching writes and coalescing list renders brought idle drain down materially. The codebase stays strict TypeScript end to end.`,
    liveUrl: 'https://pocketledger.app',
    repoUrl: 'https://github.com/pradeepc/pocket-ledger',
    featured: false,
  },
  {
    slug: 'prism-ui',
    title: 'Prism UI',
    year: 2022,
    role: 'Design engineer',
    cover:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1600&q=80',
    coverAlt: 'React logo reflected on a glass surface with soft gradient lighting',
    tags: ['Open Source', 'React', 'Design Systems'],
    tech: ['React', 'Storybook', 'Rollup', 'Vanilla Extract', 'a11y eslint'],
    summary:
      'Prism UI is a compact headless component kit with accessible defaults, token-driven theming, and tree-shakeable bundles for internal design systems.',
    body: `Most teams do not need another maximal component gallery. Prism UI ships primitives with strict prop contracts, focus management baked in, and Storybook stories that double as visual regression baselines.

Rollup produces ESM and CJS artefacts with explicit side-effect flags so bundlers can prune aggressively. Styles lean on Vanilla Extract for type-safe tokens without shipping a runtime CSS-in-JS tax.

The project welcomes contributions but guards scope: no bespoke charts or data grids here—only the atoms product teams reimplement poorly. Documentation pages are generated from the same source as the IDE hints.`,
    liveUrl: 'https://prism-ui.dev',
    repoUrl: 'https://github.com/pradeepc/prism-ui',
    featured: true,
  },
  {
    slug: 'pipeline-lens',
    title: 'Pipeline Lens',
    year: 2021,
    role: 'Creator',
    cover:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80',
    coverAlt: 'Server room corridor with blue accent lighting along racks',
    tags: ['Tooling', 'CI/CD', 'D3.js'],
    tech: ['React', 'GitHub API', 'D3.js', 'GraphQL', 'Vite'],
    summary:
      'Pipeline Lens visualises GitHub Actions workflows as interactive graphs, highlighting flaky jobs and queue time across repositories.',
    body: `CI pain rarely shows up in a single red badge. Pipeline Lens ingests workflow runs via the GitHub API, normalises job graphs, and renders them with D3 so teams can compare durations week over week.

GraphQL keeps polling efficient for monorepos with dozens of workflows. Client charts debounce updates and downgrade to tabular mode on smaller screens.

Early adopters used the tool to justify cache investments and parallelisation tweaks. The roadmap explores annotations from deploy systems so release correlation stays visible in one surface.`,
    liveUrl: 'https://pipelinelens.dev',
    repoUrl: 'https://github.com/pradeepc/pipeline-lens',
    featured: false,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const WORK_FILTERS = ['All', 'Web', 'Mobile', 'Open Source', 'Tooling'] as const;
export type WorkFilter = (typeof WORK_FILTERS)[number];

export function projectMatchesFilter(project: Project, filter: WorkFilter): boolean {
  if (filter === 'All') {
    return true;
  }
  return project.tags.includes(filter);
}
