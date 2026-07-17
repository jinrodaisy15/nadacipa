import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Our Story', href: '#story' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Love Letter', href: '#letter' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-lg shadow-rose-100/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <span className="text-2xl animate-pulse-heart">💗</span>
          <span className={`font-dancing text-2xl font-bold transition-colors duration-300 ${
            scrolled ? 'text-rose-gold' : 'text-white'
          }`}>
            Our Love
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
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
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className={`w-6 h-0.5 transition-all duration-300 ${scrolled ? 'bg-warm-brown' : 'bg-white'} ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 transition-all duration-300 ${scrolled ? 'bg-warm-brown' : 'bg-white'} ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 transition-all duration-300 ${scrolled ? 'bg-warm-brown' : 'bg-white'} ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-500 overflow-hidden ${menuOpen ? 'max-h-80' : 'max-h-0'}`}>
        <div className="bg-white/95 backdrop-blur-md px-4 py-4 space-y-3 shadow-lg">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block font-poppins text-warm-brown hover:text-rose-gold transition-colors py-2 border-b border-rose-100 last:border-0"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
