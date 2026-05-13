import { useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram, Mail, Phone, MapPin, Send } from 'lucide-react';
import { tweenTransition } from '../lib/motionPresets';

type ContactProps = { id?: string };

// ── data ───────────────────────────────────────────────────────────────────────

const contactDetails = [
  { Icon: Mail,   label: 'Email',    value: 'pradeepc2312@gmail.com', href: 'mailto:[EMAIL_ADDRESS]' },
  { Icon: Phone,  label: 'Phone',    value: '+91 7339286248',     href: 'tel:+917339286248' },
  { Icon: MapPin, label: 'Location', value: 'Theni, Tamil Nadu, India',  href: '#' },
];

const socials = [
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/pradeep-c-701980377/', Icon: Linkedin,  color: '#0A66C2' },
  { label: 'GitHub',    href: 'https://github.com/pradeepc2312',           Icon: Github,   color: '#24292e' },
  { label: 'Twitter',   href: 'https://twitter.com/pradeepc',          Icon: Twitter,  color: '#1DA1F2' },
  { label: 'Instagram', href: '#',                                     Icon: Instagram,color: '#E1306C' },
] as const;

// ── underline field ────────────────────────────────────────────────────────────

function UnderlineField({
  id, label, type = 'text', placeholder, value, onChange, as, rows,
}: {
  id: string; label: string; type?: string; placeholder: string;
  value: string; onChange: (v: string) => void; as?: 'textarea'; rows?: number;
}) {
  const base =
    'w-full bg-transparent pt-6 pb-2 font-body text-sm text-fg placeholder:text-muted/40 outline-none border-b-2 border-border transition-all duration-300 focus:border-accent resize-none';

  return (
    <div className="group relative">
      <label
        htmlFor={id}
        className="absolute top-1.5 left-0 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted transition-colors duration-200 group-focus-within:text-accent"
      >
        {label}
      </label>
      {as === 'textarea' ? (
        <textarea
          id={id}
          rows={rows ?? 4}
          placeholder={placeholder}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={base}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={base}
        />
      )}
    </div>
  );
}

// ── main export ────────────────────────────────────────────────────────────────

export function Contact({ id }: ContactProps): JSX.Element {
  const reduce = useReducedMotion() ?? false;
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:hello@pradeepc.dev?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section
      id={id}
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-bg py-16 md:py-28"
    >
      {/* blobs */}
      <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-[420px] w-[420px] -translate-y-1/3 translate-x-1/3 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #8B5CF6, transparent)' }} />
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 translate-y-1/3 -translate-x-1/3 rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #059669, transparent)' }} />

      <div className="relative mx-auto max-w-screen-xl px-5 md:px-10">

        {/* ── heading ── */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={tweenTransition(reduce, 0.4)}
        >
          <p className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-accent">
            • Contact
          </p>
          <h2
            id="contact-heading"
            className="font-body text-5xl font-extrabold leading-tight tracking-tight text-fg md:text-6xl lg:text-7xl"
          >
            Let's Work
            <br />
            <span className="text-accent">Together.</span>
          </h2>
        </motion.div>

        {/* ── two-col body ── */}
        <div className="grid grid-cols-1 gap-16 md:grid-cols-5 md:gap-12 lg:gap-20">

          {/* LEFT — 2/5 */}
          <div className="flex flex-col gap-10 md:col-span-2">

            {/* stacked contact rows */}
            <div className="flex flex-col">
              {contactDetails.map(({ Icon, label, value, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 border-b border-border py-5 transition-colors duration-200 first:border-t hover:border-accent/40"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...tweenTransition(reduce, 0.38), delay: i * 0.08 }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-accent transition-all duration-200 group-hover:border-accent/50 group-hover:bg-accent group-hover:text-white">
                    <Icon size={17} strokeWidth={1.8} aria-hidden />
                  </div>
                  <div>
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">{label}</p>
                    <p className="mt-0.5 font-body text-sm font-semibold text-fg transition-colors group-hover:text-accent">{value}</p>
                  </div>
                  <svg
                    aria-hidden
                    className="ml-auto h-4 w-4 -translate-x-1 text-muted/30 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100"
                    fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                  </svg>
                </motion.a>
              ))}
            </div>

            {/* social pills */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...tweenTransition(reduce, 0.35), delay: 0.28 }}
            >
              <p className="mb-4 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
                Find me online
              </p>
              <div className="flex flex-wrap gap-2">
                {socials.map(({ label, href, Icon, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={reduce ? {} : { scale: 1.08, y: -2 }}
                    whileTap={reduce ? {} : { scale: 0.95 }}
                    className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 font-body text-xs font-medium text-fg shadow-sm transition-all duration-200 hover:border-accent/40 hover:shadow-[0_4px_14px_rgba(139,92,246,0.15)]"
                  >
                    <Icon size={13} style={{ color }} aria-hidden />
                    {label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT — 3/5 */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={tweenTransition(reduce, 0.5)}
          >
            <div className="rounded-3xl border border-border bg-surface/50 p-8 backdrop-blur-sm md:p-10">
              <p className="mb-8 font-body text-sm text-muted">
                Drop me a message and I'll get back within{' '}
                <span className="font-semibold text-fg">24 hours</span>.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <UnderlineField
                    id="contact-name"
                    label="Your Name"
                    placeholder="Pradeep"
                    value={form.name}
                    onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                  />
                  <UnderlineField
                    id="contact-email"
                    label="Email Address"
                    type="email"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                  />
                </div>

                <UnderlineField
                  id="contact-message"
                  label="Your Message"
                  as="textarea"
                  rows={4}
                  placeholder="Hello, I'd like to talk about..."
                  value={form.message}
                  onChange={(v) => setForm((f) => ({ ...f, message: v }))}
                />

                <motion.button
                  type="submit"
                  whileHover={reduce ? {} : { scale: 1.02, y: -1 }}
                  whileTap={reduce ? {} : { scale: 0.98 }}
                  className="group relative flex items-center justify-center gap-3 self-start overflow-hidden rounded-2xl bg-accent px-8 py-4 font-body text-sm font-semibold text-white shadow-[0_4px_20px_rgba(139,92,246,0.3)] transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(139,92,246,0.45)]"
                >
                  <span aria-hidden className="absolute inset-0 -translate-x-full bg-white/10 skew-x-[-18deg] transition-transform duration-700 group-hover:translate-x-full" />
                  <Send size={15} strokeWidth={2} aria-hidden />
                  {sent ? '✓ Message sent!' : 'Send Message'}
                </motion.button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
