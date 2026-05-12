import { motion, useReducedMotion } from 'framer-motion';
import { tweenTransition } from '../lib/motionPresets';

type SkillsProps = { id?: string };

// ── skill data ────────────────────────────────────────────────────────────────

const row1 = [
  { label: 'React',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { label: 'HTML5',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { label: 'CSS3',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { label: 'JavaScript',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { label: 'TypeScript',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { label: 'Bootstrap',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
  { label: 'Tailwind',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
];

const row2 = [
  { label: 'Node.js',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { label: 'MongoDB',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { label: 'Firebase',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
  { label: 'Python',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { label: 'Java',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { label: 'C',           icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
  { label: 'PostgreSQL',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
];

const softSkills = [
  'Problem Solving', 'Teamwork', 'Communication',
  'Creativity', 'Time Management', 'Adaptability', 'Continuous Learning',
];

// ── marquee row ───────────────────────────────────────────────────────────────

function SkillCard({ label, icon }: { label: string; icon: string }) {
  return (
    <div className="group mx-5 flex shrink-0 flex-col items-center gap-3 rounded-2xl border border-border bg-surface/70 px-8 py-5 backdrop-blur-sm transition-all duration-300 hover:border-accent/50 hover:bg-surface hover:shadow-[0_6px_24px_rgba(139,92,246,0.13)]">
      <img
        src={icon}
        alt={label}
        className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-110"
      />
      <span className="font-body text-xs font-medium text-muted group-hover:text-fg transition-colors whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

function MarqueeRow({
  skills,
  direction,
}: {
  skills: { label: string; icon: string }[];
  direction: 'left' | 'right';
}) {
  // Duplicate for seamless loop
  const doubled = [...skills, ...skills];
  const cls = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right';

  return (
    <div className="marquee-fade overflow-hidden">
      <div
        className={`flex w-max ${cls} hover:[animation-play-state:paused]`}
      >
        {doubled.map((s, i) => (
          <SkillCard key={`${s.label}-${i}`} label={s.label} icon={s.icon} />
        ))}
      </div>
    </div>
  );
}

// ── main export ───────────────────────────────────────────────────────────────

export function Skills({ id }: SkillsProps): JSX.Element {
  const reduce = useReducedMotion() ?? false;

  return (
    <section id={id} aria-labelledby="skills-heading" className="relative overflow-hidden bg-bg py-16 md:py-24">

      {/* background decorations */}
      <div aria-hidden className="pointer-events-none absolute -right-32 top-1/4 h-72 w-72 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #8B5CF6, transparent)' }} />
      <div aria-hidden className="pointer-events-none absolute -left-32 bottom-1/3 h-64 w-64 rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #059669, transparent)' }} />

      {/* ── heading ── */}
      <div className="relative mx-auto max-w-screen-xl px-5 md:px-10">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={tweenTransition(reduce, 0.35)}
        >
          <p className="mb-2 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-accent">
            &gt; skills
          </p>
          <h2 id="skills-heading" className="font-body text-4xl font-bold tracking-tight text-fg md:text-5xl">
            What I'm <span className="text-accent">Good At</span>
          </h2>
          <div className="mx-auto mt-3 flex items-center justify-center gap-2">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-accent/60" />
            <div className="h-1.5 w-1.5 rounded-full bg-accent" />
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-accent/60" />
          </div>
          <p className="mt-4 font-body text-sm text-muted">My Skills</p>
        </motion.div>
      </div>

      {/* ── marquee rows (full-width, outside container) ── */}
      <motion.div
        className="flex flex-col gap-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={tweenTransition(reduce, 0.5, 0.15)}
      >
        <MarqueeRow skills={row1} direction="left" />
        <MarqueeRow skills={row2} direction="right" />
      </motion.div>

      {/* ── soft skills ── */}
      <div className="relative mx-auto max-w-screen-xl px-5 md:px-10">
        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={tweenTransition(reduce, 0.35, 0.2)}
        >
          <h3 className="mb-6 font-body text-xl font-semibold text-accent">Soft Skills</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {softSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-border bg-surface/60 px-5 py-2 font-body text-sm text-fg transition-all duration-200 hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

    </section>
  );
}
