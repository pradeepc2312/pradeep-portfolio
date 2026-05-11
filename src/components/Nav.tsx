import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Code2, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/cn';

type NavLinkItemProps = {
  to: string;
  label: string;
  isActive: boolean;
  onNavigate: () => void;
  mobile?: boolean;
};

function NavLinkItem({ to, label, isActive, onNavigate, mobile }: NavLinkItemProps): JSX.Element {
  return (
    <Link
      to={to}
      onClick={onNavigate}
      className={cn(
        'font-body font-semibold tracking-widest uppercase transition-colors whitespace-nowrap',
        mobile ? 'text-lg py-1' : 'text-[0.92rem]',
        isActive ? 'text-accent' : 'text-muted hover:text-fg',
      )}
    >
      {label}
    </Link>
  );
}

export function Nav(): JSX.Element {
  const location = useLocation();
  const reduce = useReducedMotion() ?? false;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      if (y < 60) {
        // always show near the top
        setVisible(true);
      } else if (y > lastY.current + 6) {
        // scrolling down — hide
        setVisible(false);
        setOpen(false);
      } else if (y < lastY.current - 4) {
        // scrolling up — show
        setVisible(true);
      }
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const path = location.pathname;
  const workActive    = path === '/' || path.startsWith('/work');
  const aboutActive   = path === '/about';
  const contactActive = path === '/contact';

  return (
    <>
      {/* Fixed top bar — centers the pill */}
      <motion.header
        className="fixed left-0 right-0 top-0 z-50 flex items-start justify-center px-5 pt-5"
        animate={{ y: visible ? 0 : -110, opacity: visible ? 1 : 0 }}
        transition={reduce ? { duration: 0 } : { duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
      >

        {/* Floating pill */}
        <motion.nav
          aria-label="Primary"
          className={cn(
            'flex w-full max-w-[860px] items-center justify-between',
            'rounded-full bg-bg border border-border px-7 py-4',
            'transition-shadow duration-300',
            scrolled
              ? 'shadow-[0_6px_32px_rgba(44,37,9,0.13)]'
              : 'shadow-[0_2px_16px_rgba(44,37,9,0.08)]',
          )}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0 }}
        >
          {/* ── Logo ── */}
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 shrink-0"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white shadow-sm">
              <Code2 size={15} strokeWidth={2.2} />
            </span>
            <span className="font-mono text-[1.05rem] font-bold tracking-tight text-fg leading-none">
              Pradeep<span className="text-accent">.</span>
            </span>
          </Link>

          {/* ── Desktop links ── */}
          <div className="hidden md:flex items-center gap-8">
            <NavLinkItem to="/#work"   label="Work"    isActive={workActive}    onNavigate={() => undefined} />
            <NavLinkItem to="/about"   label="About"   isActive={aboutActive}   onNavigate={() => undefined} />
            <NavLinkItem to="/contact" label="Contact" isActive={contactActive} onNavigate={() => undefined} />
          </div>

          {/* ── CTA button ── */}
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center rounded-full bg-accent px-6 py-3 font-body text-[0.88rem] font-bold text-white shrink-0 transition-all hover:bg-accent/85 hover:shadow-[0_0_0_3px_rgba(139,92,246,0.2)]"
          >
            Get in touch
          </Link>

          {/* ── Hamburger (mobile) ── */}
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-fg transition-colors hover:bg-border/50 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-drawer"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </motion.nav>

        {/* ── Mobile drawer ── */}
        <AnimatePresence>
          {open ? (
            <motion.div
              id="mobile-drawer"
              className="absolute left-5 right-5 top-[4.5rem] z-40 rounded-2xl border border-border bg-bg px-6 py-6 shadow-xl md:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={
                reduce
                  ? { opacity: 0 }
                  : { opacity: 0, y: -10, transition: { duration: 0.16, ease: [0.25, 1, 0.5, 1] } }
              }
              transition={reduce ? { duration: 0 } : { duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="flex flex-col gap-5">
                <NavLinkItem to="/#work"   label="Work"    isActive={workActive}    onNavigate={() => setOpen(false)} mobile />
                <NavLinkItem to="/about"   label="About"   isActive={aboutActive}   onNavigate={() => setOpen(false)} mobile />
                <NavLinkItem to="/contact" label="Contact" isActive={contactActive} onNavigate={() => setOpen(false)} mobile />
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-1 inline-flex w-full items-center justify-center rounded-full bg-accent px-5 py-2.5 font-body text-sm font-bold text-white"
                >
                  Get in touch
                </Link>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
