import type { ReactNode } from 'react';
import {
  Braces,
  Cloud,
  Database,
  FileCode2,
  GitBranch,
  Github,
  Layers,
  ListTodo,
  Monitor,
  Package,
  Server,
  Terminal,
  Workflow,
} from 'lucide-react';

type StackCellProps = {
  label: string;
  icon: ReactNode;
};

function StackCell({ label, icon }: StackCellProps): JSX.Element {
  return (
    <div className="flex items-center gap-2 rounded border border-border bg-code-bg px-2 py-2">
      <span className="shrink-0 text-accent" aria-hidden>
        {icon}
      </span>
      <span className="font-body text-[0.75rem] text-muted">{label}</span>
    </div>
  );
}

type StackColumnProps = {
  title: string;
  children: ReactNode;
};

function StackColumn({ title, children }: StackColumnProps): JSX.Element {
  return (
    <div>
      <h3 className="border-b border-border pb-2 font-mono text-[0.75rem] font-medium uppercase tracking-widest text-fg">
        {title}
      </h3>
      <div className="mt-3 flex flex-col gap-2">{children}</div>
    </div>
  );
}

type TechStackProps = {
  id?: string;
};

const iconProps = { size: 18, strokeWidth: 1.5 } as const;

export function TechStack({ id }: TechStackProps): JSX.Element {
  return (
    <section id={id} className="border-y border-border bg-surface/40 py-14 md:py-18" aria-labelledby="stack-heading">
      <div className="mx-auto max-w-screen-xl px-5 md:px-10">
        <h2 id="stack-heading" className="font-mono text-xl font-medium tracking-tight text-fg md:text-2xl">
          Built with
        </h2>
        <p className="mt-2 max-w-2xl font-body text-sm text-muted">
          A practical stack: typed frontends, predictable APIs, and automation that survives on-call.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-5 md:gap-6">
          <StackColumn title="Languages">
            <StackCell label="TypeScript" icon={<FileCode2 {...iconProps} />} />
            <StackCell label="JavaScript" icon={<Braces {...iconProps} />} />
            <StackCell label="SQL" icon={<Database {...iconProps} />} />
          </StackColumn>
          <StackColumn title="Frontend">
            <StackCell label="React" icon={<Layers {...iconProps} />} />
            <StackCell label="Vite" icon={<Workflow {...iconProps} />} />
            <StackCell label="Tailwind CSS" icon={<Package {...iconProps} />} />
          </StackColumn>
          <StackColumn title="Backend">
            <StackCell label="Node.js" icon={<Server {...iconProps} />} />
            <StackCell label="REST / GraphQL" icon={<GitBranch {...iconProps} />} />
            <StackCell label="PostgreSQL" icon={<Database {...iconProps} />} />
          </StackColumn>
          <StackColumn title="DevOps">
            <StackCell label="Docker" icon={<Package {...iconProps} />} />
            <StackCell label="AWS" icon={<Cloud {...iconProps} />} />
            <StackCell label="GitHub Actions" icon={<Github {...iconProps} />} />
          </StackColumn>
          <StackColumn title="Tools">
            <StackCell label="Neovim" icon={<Terminal {...iconProps} />} />
            <StackCell label="Linear" icon={<ListTodo {...iconProps} />} />
            <StackCell label="Chrome DevTools" icon={<Monitor {...iconProps} />} />
          </StackColumn>
        </div>
      </div>
    </section>
  );
}
