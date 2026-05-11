import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { getProjectBySlug } from '../data/projects';
import { RichBody } from '../lib/renderRichText';
import { tweenTransition } from '../lib/motionPresets';

export function WorkDetail(): JSX.Element {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const reduce = useReducedMotion() ?? false;
  const project = slug === undefined ? undefined : getProjectBySlug(slug);

  if (project === undefined) {
    return (
      <>
        <Helmet>
          <title>Project not found — Pradeep C</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="mx-auto max-w-screen-xl px-5 pb-24 pt-28 md:px-10 md:pt-36">
          <p className="font-body text-muted">This project is not in the archive.</p>
          <Link
            to="/#work"
            className="mt-6 inline-block font-mono text-sm text-accent underline-offset-4 hover:underline"
          >
            Return to work
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${project.title} (${project.year}) — Pradeep C`}</title>
        <meta name="description" content={project.summary} />
        <link rel="canonical" href={`https://pradeepc.dev/work/${project.slug}`} />
      </Helmet>
      <article className="mx-auto max-w-screen-xl px-5 pb-24 pt-24 md:px-10 md:pt-32">
        <motion.header
          initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={tweenTransition(reduce, 0.45)}
        >
          <Link
            to="/#work"
            className="font-mono text-[0.75rem] uppercase tracking-widest text-muted transition-colors hover:text-accent"
          >
            ← All work
          </Link>
          <h1 className="mt-6 font-mono text-3xl font-medium tracking-tight text-fg md:text-5xl">{project.title}</h1>
          <p className="mt-4 max-w-2xl font-body text-base text-muted">{project.summary}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {project.liveUrl !== undefined ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 font-mono text-[0.75rem] text-fg transition-colors hover:border-accent"
              >
                <ExternalLink size={16} strokeWidth={1.5} aria-hidden />
                Live site
              </a>
            ) : null}
            {project.repoUrl !== undefined ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 font-mono text-[0.75rem] text-fg transition-colors hover:border-accent"
              >
                <Github size={16} strokeWidth={1.5} aria-hidden />
                Repository
              </a>
            ) : null}
          </div>
          <dl className="mt-8 flex flex-wrap gap-8 font-body text-sm text-muted">
            <div>
              <dt className="font-mono text-[0.65rem] uppercase tracking-widest">Year</dt>
              <dd className="mt-1 text-fg">{project.year}</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.65rem] uppercase tracking-widest">Role</dt>
              <dd className="mt-1 text-fg">{project.role}</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.65rem] uppercase tracking-widest">Stack</dt>
              <dd className="mt-1 text-fg">{project.tech.join(' · ')}</dd>
            </div>
          </dl>
        </motion.header>

        <motion.figure
          className="mt-10 overflow-hidden rounded-lg border border-border bg-surface"
          initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={tweenTransition(reduce, 0.45)}
        >
          <img
            src={project.cover}
            alt={project.coverAlt}
            className="aspect-video w-full object-cover md:aspect-[21/9]"
            loading="eager"
            decoding="async"
          />
        </motion.figure>

        <motion.div
          className="mx-auto mt-12 max-w-3xl"
          initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={tweenTransition(reduce, 0.45)}
        >
          <div className="mb-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-border bg-code-bg px-2 py-1 font-mono text-[0.65rem] uppercase tracking-wide text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
          <RichBody text={project.body} paragraphClassName="font-body text-base leading-relaxed text-muted" />
        </motion.div>
      </article>
    </>
  );
}
