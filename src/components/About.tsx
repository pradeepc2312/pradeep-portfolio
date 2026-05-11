import { motion, useReducedMotion } from 'framer-motion';
import { tweenTransition } from '../lib/motionPresets';

type SkillBarProps = {
  label: string;
  value: number;
};

function SkillBar({ label, value }: SkillBarProps): JSX.Element {
  return (
    <div>
      <div className="flex justify-between font-mono text-[0.75rem] text-muted">
        <span>{label}</span>
        <span className="tabular-nums text-fg">{value}%</span>
      </div>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-surface">
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

type AboutProps = {
  id?: string;
};

export function About({ id }: AboutProps): JSX.Element {
  const reduce = useReducedMotion() ?? false;

  return (
    <section id={id} className="mx-auto max-w-screen-xl px-5 py-18 md:px-10 md:py-28" aria-labelledby="about-heading">
      <motion.div
        className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12"
        initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={tweenTransition(reduce, 0.45)}
      >
        <div className="space-y-6 lg:col-span-6">
          <h2 id="about-heading" className="font-mono text-xl font-medium tracking-tight text-fg md:text-2xl">
            About
          </h2>
          <div className="space-y-4 font-body text-base leading-relaxed text-fg">
            <p>
              I am Pradeep C, a full-stack developer and creative engineer based in Chennai. I build web platforms and
              internal tools where performance, observability, and maintainability are part of the product story—not an
              afterthought.
            </p>
            <p>
              My work sits across React and Node.js, cloud-native deployments on AWS, and the glue scripts that keep
              teams shipping: CI pipelines, CLI ergonomics, and tight feedback loops between design and implementation.
            </p>
            <p>
              I care about open-source sustainability, clear documentation, and systems that juniors can extend without
              fear. If that matches how your team operates, we should talk.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-code-bg p-5">
            <h3 className="font-mono text-[0.75rem] font-medium uppercase tracking-widest text-accent">Currently</h3>
            <ul className="mt-3 list-inside list-disc space-y-2 font-body text-sm text-muted">
              <li>Deepening Rust for systems utilities alongside TypeScript services.</li>
              <li>Reading &quot;Designing Data-Intensive Applications&quot; with notes tied to real AWS bills.</li>
              <li>Contributing patches to developer tooling around test parallelisation.</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-10 lg:col-span-6">
          <div className="rounded-lg border border-border bg-surface p-6">
            <h3 className="font-mono text-[0.75rem] font-medium uppercase tracking-widest text-muted">Focus radar</h3>
            <p className="mt-2 font-body text-xs text-muted">Self-assessed emphasis across dimensions I optimise for.</p>
            <div className="mt-6 flex justify-center">
              <SkillsRadar />
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-[0.65rem] text-muted sm:grid-cols-5">
              <div className="text-center">
                <dt className="text-fg">React</dt>
                <dd className="text-muted">UI systems</dd>
              </div>
              <div className="text-center">
                <dt className="text-fg">Node</dt>
                <dd className="text-muted">APIs</dd>
              </div>
              <div className="text-center">
                <dt className="text-fg">Cloud</dt>
                <dd className="text-muted">AWS</dd>
              </div>
              <div className="text-center">
                <dt className="text-fg">DX</dt>
                <dd className="text-muted">Tooling</dd>
              </div>
              <div className="col-span-2 text-center sm:col-span-1">
                <dt className="text-fg">Perf</dt>
                <dd className="text-muted">Latency</dd>
              </div>
            </dl>
          </div>

          <div className="space-y-5 rounded-lg border border-border bg-code-bg p-6">
            <h3 className="font-mono text-[0.75rem] font-medium uppercase tracking-widest text-fg">Capability depth</h3>
            <div className="space-y-4">
              <SkillBar label="React / TypeScript" value={92} />
              <SkillBar label="Node.js services" value={88} />
              <SkillBar label="AWS / infra" value={82} />
              <SkillBar label="CI/CD + DX" value={86} />
              <SkillBar label="Data visualisation" value={74} />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function SkillsRadar(): JSX.Element {
  return (
    <svg viewBox="0 0 200 200" className="h-48 w-full max-w-[220px]" aria-hidden>
      <polygon
        points="100,20 170,70 150,160 50,160 30,70"
        fill="none"
        stroke="currentColor"
        className="text-border"
        strokeWidth="1"
      />
      <polygon points="100,40 150,78 135,140 65,140 50,78" fill="rgba(139,92,246,0.15)" stroke="#8B5CF6" strokeWidth="1.5" />
      <line x1="100" y1="100" x2="100" y2="20" stroke="#E8D98A" strokeWidth="1" />
      <line x1="100" y1="100" x2="170" y2="70" stroke="#E8D98A" strokeWidth="1" />
      <line x1="100" y1="100" x2="150" y2="160" stroke="#E8D98A" strokeWidth="1" />
      <line x1="100" y1="100" x2="50" y2="160" stroke="#E8D98A" strokeWidth="1" />
      <line x1="100" y1="100" x2="30" y2="70" stroke="#E8D98A" strokeWidth="1" />
      <circle cx="100" cy="100" r="3" fill="#8B5CF6" />
    </svg>
  );
}
