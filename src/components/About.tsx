import { motion, useReducedMotion } from 'framer-motion';
import { User, Mail, MapPin, Calendar, Code2, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { tweenTransition } from '../lib/motionPresets';

type AboutProps = { id?: string };

// ─── sub-components ───────────────────────────────────────────────────────────

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 group">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20 transition-all group-hover:bg-accent/20">
        <Icon size={15} strokeWidth={2} />
      </span>
      <div>
        <p className="font-mono text-[0.6rem] uppercase tracking-widest text-muted">{label}</p>
        <p className="font-body text-sm font-medium text-fg">{value}</p>
      </div>
    </div>
  );
}

function StatCard({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-8 text-center shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-[0_8px_30px_rgba(139,92,246,0.12)]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={tweenTransition(reduce, 0.35, delay)}
    >
      {/* hover gradient bg */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.07) 0%, transparent 70%)' }} />
      <Code2 size={20} strokeWidth={1.6} className="mx-auto mb-3 text-accent/60 transition-colors group-hover:text-accent" />
      <p className="font-mono text-4xl font-bold" style={{ background: 'linear-gradient(135deg,#8B5CF6,#34D399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        {value}
      </p>
      <p className="mt-1.5 font-body text-xs tracking-wide text-muted">{label}</p>
    </motion.div>
  );
}

// ─── main component ───────────────────────────────────────────────────────────
export function About({ id }: AboutProps): JSX.Element {
  const reduce = useReducedMotion() ?? false;

  return (
    <section id={id} aria-labelledby="about-heading" className="relative overflow-hidden bg-bg py-28 md:py-36">

      {/* background decorations */}
      <div aria-hidden className="pointer-events-none absolute -left-32 top-1/3 h-72 w-72 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #8B5CF6, transparent)' }} />
      <div aria-hidden className="pointer-events-none absolute -right-32 bottom-1/4 h-64 w-64 rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #059669, transparent)' }} />

      <div className="relative mx-auto max-w-screen-xl px-5 md:px-10">

        {/* ── heading ── */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={tweenTransition(reduce, 0.35)}
        >
          <p className="mb-2 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-accent">
            &gt; whoami
          </p>
          <h2 id="about-heading" className="font-body text-4xl font-bold tracking-tight text-fg md:text-5xl">
            About <span className="text-accent">Me</span>
          </h2>
          <div className="mx-auto mt-3 flex items-center justify-center gap-2">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-accent/60" />
            <div className="h-1.5 w-1.5 rounded-full bg-accent" />
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-accent/60" />
          </div>
          <p className="mt-4 font-body text-sm text-muted">Let me introduce myself</p>
        </motion.div>

        {/* ── two-column layout ── */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-20">

          {/* ── LEFT: avatar + quick info ── */}
          <motion.div
            className="flex flex-col items-center gap-8 lg:col-span-2 lg:items-start"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={tweenTransition(reduce, 0.45)}
          >
            {/* avatar */}
            <div className="relative">
              {/* gradient ring */}
              <div className="rounded-full p-[3px]" style={{ background: 'linear-gradient(135deg,#8B5CF6,#059669)' }}>
                <div className="rounded-full bg-bg p-[3px]">
                  <img
                    src="/avatar.png"
                    alt="Pradeep C"
                    className="h-44 w-44 rounded-full object-cover object-top md:h-52 md:w-52"
                  />
                </div>
              </div>
              {/* available badge */}
              <span className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-border bg-bg px-3 py-1 font-mono text-[0.65rem] text-accent2 shadow-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent2/60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent2" />
                </span>
                Available for work
              </span>
            </div>

            {/* name + role */}
            <div className="text-center lg:text-left">
              <h3 className="font-mono text-xl font-bold uppercase tracking-wider text-fg">Pradeep C</h3>
              <p className="mt-1 font-body text-sm font-medium text-accent">Full Stack Developer &amp; Creative Engineer</p>
            </div>

            {/* info list */}
            <div className="w-full space-y-3 rounded-2xl border border-border bg-surface/60 p-5 backdrop-blur-sm">
              <InfoRow icon={User}     label="Name"     value="Pradeep C" />
              <div className="h-px bg-border/60" />
              <InfoRow icon={Mail}     label="Email"    value="pradeep@email.com" />
              <div className="h-px bg-border/60" />
              <InfoRow icon={MapPin}   label="Location" value="Chennai, Tamil Nadu" />
              <div className="h-px bg-border/60" />
              <InfoRow icon={Calendar} label="Age"      value="22" />
            </div>
          </motion.div>

          {/* ── RIGHT: bio + currently ── */}
          <motion.div
            className="flex flex-col gap-9 lg:col-span-3"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={tweenTransition(reduce, 0.45)}
          >
            {/* bio */}
            <div className="space-y-4 font-body text-[1.02rem] leading-relaxed text-fg/80">
              <p>
                Hey! I'm <span className="font-semibold text-fg">Pradeep C</span>, a full-stack developer
                based in <span className="font-semibold text-accent">Chennai, India</span>, passionate about
                building clean, functional web applications using both frontend and backend technologies.
              </p>
              <p>
                Since 2022, I've been crafting production-grade <span className="font-semibold text-fg">React &amp; Node.js</span> systems — from
                cloud-native deployments on AWS to tight developer-experience tooling. I'm also passionate
                about open-source and have completed{' '}
                <span className="font-semibold text-accent">20+ projects</span> across various domains.
              </p>
              <p>
                I care about performance, observability, and systems that teams can confidently extend. If that
                matches how your team thinks, <span className="font-semibold text-accent">let's build something great together.</span>
              </p>
            </div>

          </motion.div>
        </div>

        {/* ── stats row ── */}
        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <StatCard value="20+"   label="Projects Completed" delay={0} />
          <StatCard value="1000+" label="Hours of Coding"    delay={0.1} />
          <StatCard value="10+"   label="Technologies"       delay={0.2} />
        </div>

      </div>
    </section>
  );
}
