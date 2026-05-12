import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTypewriter } from '../hooks/useTypewriter';
import { tweenTransition } from '../lib/motionPresets';
import { ParticleBackground } from './ParticleBackground';

type HeroProps = {
  id?: string;
};

export function Hero({ id }: HeroProps): JSX.Element {
  const reduce = useReducedMotion() ?? false;
  const line1 = useTypewriter('> Hello, I\'m', { msPerChar: 45 });
  const line3 = useTypewriter('Full-Stack Developer & Creative Engineer', {
    msPerChar: 40,
    enabled: line1.isComplete,
  });

  return (
    <section
      id={id}
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-5 pb-28 pt-24 md:px-10 md:pb-32 md:pt-28"
      aria-label="Introduction"
    >
      <ParticleBackground />
      <div className="relative z-10 mx-auto flex w-full max-w-screen-xl flex-col-reverse items-center gap-10 md:flex-row md:items-center md:justify-between">

        {/* ── Left: text ── */}
        <motion.div
          className="flex-1 space-y-4 font-mono"
          initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={tweenTransition(reduce, 0.35)}
        >
          <p className="text-base text-muted">
            <span>{line1.display}</span>
            {!line1.isComplete ? <span className="caret-blink text-accent">▍</span> : null}
          </p>

          {line1.isComplete ? (
            <h1 className="text-[clamp(2.5rem,9vw,8rem)] font-medium leading-none tracking-tight text-fg">
              Pradeep C
            </h1>
          ) : null}

          {line1.isComplete ? (
            <p className="max-w-xl font-body text-[1.1rem] leading-relaxed text-muted">
              <span>{line3.display}</span>
              {line1.isComplete ? <span className="caret-blink text-accent">▍</span> : null}
            </p>
          ) : null}

          {line3.isComplete ? (
            <motion.div
              className="mt-10 flex flex-wrap gap-4"
              initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={tweenTransition(reduce, 0.3)}
            >
              <Link
                to="/#work"
                className="rounded-md bg-accent px-5 py-2.5 font-body text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                View my work
              </Link>
              <Link
                to="/contact"
                className="rounded-md border border-accent px-5 py-2.5 font-body text-sm font-medium text-fg transition-colors hover:bg-accent/10"
              >
                Get in touch
              </Link>
            </motion.div>
          ) : null}
        </motion.div>

        {/* ── Right: profile photo ── */}
        <motion.div
          className="shrink-0"
          initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={tweenTransition(reduce, 0.45)}
        >
          {/* gradient ring */}
          <div className="rounded-full p-[3px]" style={{ background: 'linear-gradient(135deg, #8B5CF6, #059669)' }}>
            {/* subtle inner border */}
            <div className="rounded-full bg-bg p-[3px]">
              <img
                src="/avatar.png"
                alt="Pradeep C — profile photo"
                className="h-52 w-52 rounded-full object-cover object-top shadow-xl md:h-64 md:w-64 lg:h-72 lg:w-72"
              />
            </div>
          </div>
        </motion.div>

      </div>

      {/* ── Scroll to explore ── */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 z-10 flex flex-col items-center gap-1"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.6, ease: 'easeOut' }}
      >
        <span className="font-mono text-[0.72rem] tracking-[0.18em] text-muted uppercase select-none">
          Scroll to explore
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-bounce text-muted"
          aria-hidden="true"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <polyline points="19 12 12 19 5 12" />
        </svg>
      </motion.div>

    </section>
  );
}
