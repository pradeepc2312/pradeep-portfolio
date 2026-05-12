import { motion, useReducedMotion } from 'framer-motion';
import { Mail, MapPin, Calendar, ArrowUpRight, Code2, Layers, Rocket } from 'lucide-react';
import { tweenTransition } from '../lib/motionPresets';

type AboutProps = { id?: string };

const details = [
  { Icon: Mail,     label: 'Email',    value: 'hello@pradeepc.dev' },
  { Icon: MapPin,   label: 'Location', value: 'Chennai, Tamil Nadu' },
  { Icon: Calendar, label: 'Age',      value: '22' },
];

const stats = [
  { Icon: Rocket, value: '20+', label: 'Projects Shipped' },
  { Icon: Code2,  value: '3+',  label: 'Years Coding'     },
  { Icon: Layers, value: '10+', label: 'Tech Stack'       },
];

export function About({ id }: AboutProps): JSX.Element {
  const reduce = useReducedMotion() ?? false;

  return (
    <section id={id} aria-labelledby="about-heading" className="relative overflow-hidden bg-bg py-16 md:py-24">

      {/* blobs */}
      <div aria-hidden className="pointer-events-none absolute -left-32 top-1/3 h-80 w-80 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #8B5CF6, transparent)' }} />
      <div aria-hidden className="pointer-events-none absolute -right-32 bottom-1/4 h-64 w-64 rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #059669, transparent)' }} />

      <div className="relative mx-auto max-w-screen-xl px-5 md:px-10">

        {/* ── top: eyebrow + large heading ── */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={tweenTransition(reduce, 0.4)}
        >
          <p className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-accent">
            &gt; whoami
          </p>
          <h2
            id="about-heading"
            className="font-body text-5xl font-extrabold leading-[1.08] tracking-tight text-fg md:text-6xl lg:text-[5rem]"
          >
            About <span className="text-accent">Me</span>
          </h2>
        </motion.div>

        {/* ── main two-col ── */}
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-5 lg:gap-20">

          {/* ── LEFT 3/5: bio + stats + CTA ── */}
          <motion.div
            className="flex flex-col gap-8 lg:col-span-3"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={tweenTransition(reduce, 0.45)}
          >
            {/* bio */}
            <div className="space-y-5 font-body text-[1.05rem] leading-relaxed text-fg/80">
              <p>
                Hey! I'm{' '}
                <span className="font-semibold text-fg">Pradeep C</span>, a full-stack developer
                based in{' '}
                <span className="font-semibold text-accent">Chennai, India</span>, passionate about
                building clean, functional web applications using both frontend and backend
                technologies.
              </p>
              <p>
                Since 2022, I've been crafting production-grade{' '}
                <span className="font-semibold text-fg">React &amp; Node.js</span> systems — from
                cloud-native deployments on AWS to tight developer-experience tooling. I'm also
                passionate about open-source and have completed{' '}
                <span className="font-semibold text-accent">20+ projects</span> across various
                domains.
              </p>
              <p>
                I care about performance, observability, and systems that teams can confidently
                extend. If that matches how your team thinks,{' '}
                <span className="font-semibold text-accent">
                  let's build something great together.
                </span>
              </p>
            </div>

            {/* stats row */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map(({ Icon, value, label }, i) => (
                <motion.div
                  key={label}
                  className="group flex flex-col gap-2 rounded-2xl border border-border bg-surface/60 px-5 py-4 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_4px_20px_rgba(139,92,246,0.1)]"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...tweenTransition(reduce, 0.35), delay: 0.1 + i * 0.07 }}
                >
                  <Icon size={18} className="text-accent transition-transform duration-200 group-hover:scale-110" aria-hidden />
                  <p className="font-mono text-2xl font-bold text-fg">{value}</p>
                  <p className="font-body text-xs text-muted">{label}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <motion.a
                href="#contact"
                whileHover={reduce ? {} : { y: -2, scale: 1.02 }}
                whileTap={reduce ? {} : { scale: 0.97 }}
                className="group inline-flex items-center gap-2 rounded-2xl bg-accent px-7 py-3.5 font-body text-sm font-semibold text-white shadow-[0_4px_18px_rgba(139,92,246,0.28)] transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(139,92,246,0.42)]"
              >
                Get in touch
                <ArrowUpRight size={15}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden />
              </motion.a>
              <motion.a
                href="#work"
                whileHover={reduce ? {} : { y: -2 }}
                className="font-body text-sm font-medium text-muted underline underline-offset-4 transition-colors hover:text-accent"
              >
                View my work →
              </motion.a>
            </div>
          </motion.div>

          {/* ── RIGHT 2/5: name + role + detail rows + badge ── */}
          <motion.div
            className="flex flex-col gap-6 lg:col-span-2"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={tweenTransition(reduce, 0.45)}
          >
            {/* name card */}
            <div className="rounded-3xl border border-border bg-surface/60 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-3">
                {/* monogram */}
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-purple-400 font-mono text-lg font-bold text-white shadow-md">
                  P
                </div>
                <div>
                  <h3 className="font-mono text-base font-bold uppercase tracking-wider text-fg">Pradeep C</h3>
                  <p className="font-body text-xs text-accent">Full Stack Developer &amp; Creative Engineer</p>
                </div>
              </div>

              {/* availability */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent2/30 bg-accent2/10 px-3.5 py-1.5">
                <span className="relative flex h-1.5 w-1.5" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent2/60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent2" />
                </span>
                <span className="font-mono text-[0.62rem] font-medium text-accent2">Open to work · 2025</span>
              </div>

              {/* detail rows */}
              <div>
                {details.map(({ Icon, label, value }, i) => (
                  <motion.div
                    key={label}
                    className="group flex items-center gap-4 border-b border-border/70 py-3.5 last:border-b-0"
                    initial={{ opacity: 0, x: 14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...tweenTransition(reduce, 0.32), delay: 0.15 + i * 0.07 }}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-bg text-muted transition-all duration-200 group-hover:border-accent/50 group-hover:bg-accent/10 group-hover:text-accent">
                      <Icon size={14} strokeWidth={1.8} aria-hidden />
                    </div>
                    <div>
                      <p className="font-mono text-[0.55rem] uppercase tracking-[0.15em] text-muted/70">{label}</p>
                      <p className="mt-0.5 font-body text-sm font-semibold text-fg">{value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
