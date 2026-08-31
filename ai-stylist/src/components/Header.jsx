import { useState } from 'react';

const NAV_LINKS = [
  { label: 'Collections', href: '../collection.html' },
  { label: 'AI Stylist', href: '#' },
  { label: 'About', href: '../about.html' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bone">
      <div className="max-w-[1440px] mx-auto px-[64px] max-md:px-5 flex items-center justify-between h-20">
        <a href="../index.html" className="font-display text-[22px] tracking-[0.08em] uppercase text-charcoal">
          SISSY'S <span className="font-semibold text-gold">LUXURY</span>
          <span className="hidden sm:inline text-xs font-body tracking-[0.15em] text-grey-dark ml-3 uppercase">
            | AI Stylist
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-xs tracking-[0.15em] uppercase font-semibold font-body transition-colors duration-150 relative after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-gold after:w-0 hover:after:w-full after:transition-all after:duration-300 ${
                link.label === 'AI Stylist' ? 'text-gold' : 'text-charcoal hover:text-gold'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <button className="nav-action-btn w-10 h-10 flex items-center justify-center text-charcoal hover:text-gold transition-colors" aria-label="Profile">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>

          <button
            className="lg:hidden flex flex-col gap-[5px] w-6 cursor-pointer py-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <span className={`block h-[1.5px] bg-charcoal transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
            <span className={`block h-[1.5px] bg-charcoal transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-[1.5px] bg-charcoal transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-grey-subtle bg-bone">
          <div className="px-5 py-6 space-y-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`block text-xs tracking-[0.15em] uppercase font-semibold font-body py-2 ${
                  link.label === 'AI Stylist' ? 'text-gold' : 'text-charcoal'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
