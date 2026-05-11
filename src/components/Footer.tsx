import { ArrowUp } from 'lucide-react';
import { useLiveClock } from '../hooks/useLiveClock';

export function Footer(): JSX.Element {
  const time = useLiveClock();

  const scrollTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto flex max-w-screen-xl flex-col items-start justify-between gap-6 px-5 py-6 font-body text-sm text-muted md:flex-row md:items-center md:px-10">
        <p className="font-mono text-fg">© 2025 Pradeep C</p>
        <p className="flex flex-wrap items-center gap-2 md:justify-center">
          <span>Chennai · GMT+5:30</span>
          <span aria-hidden className="text-border">
            ·
          </span>
          <span className="tabular-nums tracking-tight text-fg" aria-live="polite">
            {time}
          </span>
        </p>
        <button
          type="button"
          onClick={scrollTop}
          className="inline-flex items-center gap-2 font-mono text-fg transition-colors hover:text-accent"
        >
          <ArrowUp size={18} strokeWidth={1.5} aria-hidden />
          Back to top
        </button>
      </div>
    </footer>
  );
}
