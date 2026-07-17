import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Our Story', href: '#story' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Love Letter', href: '#letter' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 safe-top ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-lg shadow-rose-100/50 py-2 sm:py-3'
            : 'bg-transparent py-3 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 min-h-[44px]">
            <span className="text-xl sm:text-2xl animate-pulse-heart">💗</span>
            <span className={`font-dancing text-xl sm:text-2xl font-bold transition-colors duration-300 ${
              scrolled ? 'text-rose-gold' : 'text-white'
            }`}>
              Our Love
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`font-poppins text-sm font-medium transition-all duration-300 hover:text-rose-gold relative group ${
                  scrolled ? 'text-warm-brown' : 'text-white'
                }`}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-gold transition-all duration-300 group-hover:w-full rounded-full" />
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-3 -mr-2 min-h-[44px] min-w-[44px] items-center justify-center"
            aria-label="Menu"
          >
            <span className={`w-5 h-0.5 rounded-full transition-all duration-300 ${scrolled ? 'bg-warm-brown' : 'bg-white'} ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-5 h-0.5 rounded-full transition-all duration-300 ${scrolled ? 'bg-warm-brown' : 'bg-white'} ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-0.5 rounded-full transition-all duration-300 ${scrolled ? 'bg-warm-brown' : 'bg-white'} ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white/95 backdrop-blur-xl shadow-2xl flex flex-col animate-fade-in">
            {/* Close button */}
            <div className="flex justify-end p-4">
              <button 
                onClick={() => setMenuOpen(false)} 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-rose-50 text-warm-brown"
              >
                ✕
              </button>
            </div>

            {/* Nav links */}
            <div className="flex-1 flex flex-col px-6 pt-4">
              <div className="text-center mb-8">
                <span className="text-3xl">💕</span>
                <p className="font-dancing text-2xl text-rose-gold mt-2">Our Love</p>
              </div>
              {navItems.map((item, idx) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-poppins text-warm-brown hover:text-rose-gold transition-colors py-4 border-b border-rose-100/60 text-base flex items-center gap-3"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <span className="text-sm">{['🏠', '📖', '📅', '📸', '💌'][idx]}</span>
                  {item.label}
                </a>
              ))}
            </div>

            {/* Bottom decorative */}
            <div className="p-6 text-center">
              <p className="font-poppins text-xs text-warm-brown/40">Made with 💕</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
