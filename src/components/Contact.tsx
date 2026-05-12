import { Github, Linkedin, Rss, Twitter } from 'lucide-react';

const socials = [
  { label: 'GitHub', href: 'https://github.com/pradeepc', Icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pradeepc', Icon: Linkedin },
  { label: 'Twitter / X', href: 'https://twitter.com/pradeepc', Icon: Twitter },
  { label: 'Dev.to', href: 'https://dev.to/pradeepc', Icon: Rss },
] as const;

type ContactProps = {
  id?: string;
};

export function Contact({ id }: ContactProps): JSX.Element {
  return (
    <section
      id={id}
      className="mx-auto max-w-screen-xl px-5 py-14 md:px-10 md:py-20"
      aria-label="Contact Pradeep C"
    >
      <a
        href="mailto:hello@pradeepc.dev"
        className="block font-mono text-[clamp(1.5rem,5vw,5rem)] font-medium leading-none tracking-tight text-fg transition-colors hover:text-accent"
      >
        hello@pradeepc.dev
      </a>

      <div className="mt-8 flex flex-wrap items-center gap-6">
        {socials.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="text-muted transition-colors hover:text-fg"
            aria-label={label}
          >
            <Icon size={20} strokeWidth={1.5} aria-hidden />
          </a>
        ))}
      </div>

      <div className="mt-10 inline-flex items-center gap-3 rounded-full bg-accent2 px-5 py-2 font-body text-sm font-medium text-bg">
        <span className="relative flex h-2 w-2" aria-hidden>
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bg/40" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-bg" />
        </span>
        Open to work · Q3 2025
      </div>
    </section>
  );
}
