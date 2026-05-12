import { ArrowUp, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLiveClock } from '../hooks/useLiveClock';

const socials = [
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/pradeepc', Icon: Linkedin  },
  { label: 'GitHub',    href: 'https://github.com/pradeepc',           Icon: Github   },
  { label: 'Twitter',   href: 'https://twitter.com/pradeepc',          Icon: Twitter  },
  { label: 'Instagram', href: '#',                                     Icon: Instagram },
] as const;

const navLinks = [
  { label: 'About',          href: '#about'          },
  { label: 'Skills',         href: '#skills'         },
  { label: 'Work',           href: '#work'           },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact',        href: '#contact'        },
];

export function Footer(): JSX.Element {
  const time = useLiveClock();

  const scrollTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden border-t border-border bg-surface/60">

      {/* subtle top glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />

      <div className="mx-auto max-w-screen-xl px-5 md:px-10">

        {/* ── upper row: brand + nav + socials ── */}
        <div className="flex flex-col gap-8 py-10 md:flex-row md:items-start md:justify-between">

          {/* brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent font-mono text-[0.7rem] font-bold text-white">
                P
              </span>
              <span className="font-mono text-sm font-semibold text-fg">Pradeep C</span>
            </div>
            <p className="max-w-[200px] font-body text-xs leading-relaxed text-muted">
              Full-stack developer crafting clean, performant interfaces.
            </p>
          </div>

          {/* nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="font-body text-xs text-muted transition-colors duration-200 hover:text-accent"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* socials */}
          <div className="flex items-center gap-2.5">
            {socials.map(({ label, href, Icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-bg text-muted transition-colors duration-200 hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
              >
                <Icon size={14} strokeWidth={1.8} aria-hidden />
              </motion.a>
            ))}
          </div>
        </div>

        {/* ── divider ── */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* ── lower row: copyright + clock + back to top ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-5">

          {/* copyright */}
          <p className="font-mono text-[0.7rem] text-muted">
            © 2025 Pradeep C · Built with React & TypeScript
          </p>

          {/* live clock */}
          <div className="flex items-center gap-2 rounded-full border border-border bg-bg px-4 py-1.5">
            <span className="relative flex h-1.5 w-1.5" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent2/60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent2" />
            </span>
            <span className="font-mono text-[0.7rem] text-muted">Chennai · GMT+5:30</span>
            <span className="font-mono text-[0.7rem] tabular-nums text-fg" aria-live="polite">
              {time}
            </span>
          </div>

          {/* back to top */}
          <motion.button
            type="button"
            onClick={scrollTop}
            aria-label="Back to top"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 rounded-full border border-border bg-bg px-4 py-1.5 font-mono text-[0.7rem] text-muted transition-colors duration-200 hover:border-accent/50 hover:text-accent"
          >
            <ArrowUp size={12} strokeWidth={2} aria-hidden />
            Back to top
          </motion.button>
        </div>

      </div>
    </footer>
  );
}
