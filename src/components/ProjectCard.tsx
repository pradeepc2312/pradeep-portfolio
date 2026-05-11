import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Project } from '../types/project';
import { cn } from '../lib/cn';
import { tweenTransition } from '../lib/motionPresets';

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps): JSX.Element {
  const reduce = useReducedMotion() ?? false;

  return (
    <motion.article
      initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={tweenTransition(reduce, 0.45)}
    >
      <Link
        to={`/work/${project.slug}`}
        className={cn(
          'group block overflow-hidden rounded-lg border border-border bg-surface outline-none',
          'transition-[transform,box-shadow,border-color] duration-[250ms] ease-[cubic-bezier(0.25,1,0.5,1)]',
          'hover:-translate-y-1 hover:border-accent hover:shadow-[0_0_0_1px_#8B5CF6]',
          'focus-visible:ring-2 focus-visible:ring-accent',
        )}
        aria-label={`View project ${project.title}`}
      >
        <div className="relative aspect-video overflow-hidden">
          <img
            src={project.cover}
            alt={project.coverAlt}
            className="h-full w-full object-cover grayscale transition-[filter] duration-[400ms] group-hover:grayscale-0"
            loading="lazy"
            decoding="async"
          />
          {project.featured ? (
            <span className="absolute right-3 top-3 rounded border border-border bg-code-bg/90 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-accent2">
              Featured
            </span>
          ) : null}
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded bg-accent2/90 px-2 py-0.5 font-mono text-[0.65rem] font-medium text-bg"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2 border-t border-border p-4">
          <h2 className="font-mono text-base font-medium tracking-tight text-fg">{project.title}</h2>
          <p className="font-body text-[0.8rem] text-muted">
            <span className="tabular-nums">{project.year}</span>
            <span className="mx-2 text-border">·</span>
            <span>{project.role}</span>
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
