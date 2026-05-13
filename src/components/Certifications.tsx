import { motion, useReducedMotion } from 'framer-motion';
import { tweenTransition } from '../lib/motionPresets';
import image0 from '../assets/MongoDB.pdf';
import image1 from '../assets/oracelse17.pdf';

type CertificationsProps = { id?: string };

// ── certification data ─────────────────────────────────────────────────────────

const certs = [
  {
    title: 'Oracle Java SE 17 Developer',
    issuer: 'Oracle',
    year: '2025',
    href: image1,
  },
  {
    title: 'MongoDB Associate Developer',
    issuer: 'MongoDB',
    year: '2024',
    href: image0,
  },
];

// ── badge icon ─────────────────────────────────────────────────────────────────

function BadgeIcon() {
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent via-purple-400 to-accent/60 shadow-md">
      {/* Ribbon / award badge SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M12 2a5 5 0 1 1 0 10A5 5 0 0 1 12 2zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM8.21 13.89 7 23l5-3 5 3-1.21-9.12A5.98 5.98 0 0 1 12 14a5.98 5.98 0 0 1-3.79-1.11z" />
      </svg>
    </div>
  );
}

// ── eye icon ───────────────────────────────────────────────────────────────────

function EyeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

// ── cert card ──────────────────────────────────────────────────────────────────

function CertCard({
  title,
  issuer,
  year,
  href,
  delay,
}: {
  title: string;
  issuer: string;
  year: string;
  href: string;
  delay: number;
}) {
  const reduce = useReducedMotion() ?? false;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      id={`cert-${title.toLowerCase().replace(/\s+/g, '-')}`}
      aria-label={`View certificate: ${title} by ${issuer}`}
      className="group flex items-center gap-4 rounded-2xl border border-border bg-surface/70 px-6 py-5 backdrop-blur-sm transition-colors duration-300 hover:border-accent/50 hover:bg-surface hover:shadow-[0_8px_32px_rgba(139,92,246,0.15)]"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={reduce ? {} : { y: -5, scale: 1.02 }}
      viewport={{ once: true }}
      transition={{ ...tweenTransition(reduce, 0.4), delay }}
    >
      {/* badge */}
      <BadgeIcon />

      {/* info */}
      <div className="min-w-0 flex-1">
        <p className="font-body text-sm font-semibold text-fg group-hover:text-accent transition-colors duration-200">
          {title}
        </p>
        <p className="mt-0.5 font-body text-xs text-muted">
          {issuer} · {year}
        </p>
      </div>

      {/* view button */}
      <span className="flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-code-bg px-3 py-1.5 font-body text-xs font-medium text-muted transition-all duration-200 group-hover:border-accent/50 group-hover:bg-accent/10 group-hover:text-accent">
        <EyeIcon />
        View
      </span>
    </motion.a>
  );
}

// ── main export ────────────────────────────────────────────────────────────────

export function Certifications({ id }: CertificationsProps): JSX.Element {
  const reduce = useReducedMotion() ?? false;

  return (
    <section
      id={id}
      aria-labelledby="certs-heading"
      className="relative overflow-hidden bg-bg py-16 md:py-24"
    >
      {/* background decorations */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #8B5CF6, transparent)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-1/3 h-60 w-60 rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #059669, transparent)' }}
      />

      <div className="relative mx-auto max-w-screen-xl px-5 md:px-10">

        {/* ── heading ── */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={tweenTransition(reduce, 0.35)}
        >
          <p className="mb-2 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-accent">
            • Certifications
          </p>
          <h2
            id="certs-heading"
            className="font-body text-4xl font-bold tracking-tight text-fg md:text-5xl"
          >
            Verified{' '}
            <span className="text-accent">credentials</span>
          </h2>

          {/* decorative divider */}
          <div className="mx-auto mt-4 flex items-center justify-center gap-2">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-accent/60" />
            <div className="h-1.5 w-1.5 rounded-full bg-accent" />
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-accent/60" />
          </div>
        </motion.div>

        {/* ── cards grid ── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 max-w-3xl mx-auto">
          {certs.map((cert, i) => (
            <CertCard
              key={cert.title}
              title={cert.title}
              issuer={cert.issuer}
              year={cert.year}
              href={cert.href}
              delay={i * 0.1}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
