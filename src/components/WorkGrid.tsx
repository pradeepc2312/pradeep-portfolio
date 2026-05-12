import { useMemo, useState } from 'react';
import { projects, projectMatchesFilter, WORK_FILTERS, type WorkFilter } from '../data/projects';
import { cn } from '../lib/cn';
import { ProjectCard } from './ProjectCard';

type WorkGridProps = {
  id?: string;
};

export function WorkGrid({ id }: WorkGridProps): JSX.Element {
  const [active, setActive] = useState<WorkFilter>('All');

  const filtered = useMemo(() => {
    const list = projects.filter((p) => projectMatchesFilter(p, active));
    return [...list].sort((a, b) => {
      if (a.featured !== b.featured) {
        return a.featured ? -1 : 1;
      }
      return b.year - a.year;
    });
  }, [active]);

  return (
    <section id={id} className="mx-auto max-w-screen-xl px-5 py-14 md:px-10 md:py-20" aria-labelledby="work-heading">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 id="work-heading" className="font-mono text-xl font-medium tracking-tight text-fg md:text-2xl">
            Selected work
          </h2>
          <p className="mt-3 max-w-xl font-body text-sm text-muted">
            Production systems, open-source experiments, and interfaces tuned for latency and clarity.
          </p>
        </div>
      </div>

      <div
        className="mb-10 flex flex-wrap gap-2 border-b border-border pb-4"
        role="tablist"
        aria-label="Filter projects"
      >
        {WORK_FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            role="tab"
            aria-selected={active === filter}
            onClick={() => setActive(filter)}
            className={cn(
              'rounded-md border px-3 py-1.5 font-mono text-[0.75rem] uppercase tracking-wide transition-colors',
              active === filter
                ? 'border-accent bg-accent/15 text-fg'
                : 'border-border bg-code-bg text-muted hover:border-accent/50 hover:text-fg',
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
