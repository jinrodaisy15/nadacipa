import FloatingHearts from './components/FloatingHearts';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import OurStory from './components/OurStory';
import Timeline from './components/Timeline';
import SpecialMoments from './components/SpecialMoments';
import ParallaxQuote from './components/ParallaxQuote';
import Gallery from './components/Gallery';
import LoveLetter from './components/LoveLetter';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';

export default function App() {
  return (
    <div className="relative min-h-screen bg-blush overflow-x-hidden">
      <FloatingHearts />
      <Navbar />
      <HeroSection />
      <OurStory />
      <SpecialMoments />
      <ParallaxQuote />
      <Timeline />
      <Gallery />
      <LoveLetter />
      <Footer />
      <BackToTop />
    </div>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <a
      href="#home"
      className={`fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 w-11 h-11 sm:w-12 sm:h-12 bg-rose-gold text-white rounded-full flex items-center justify-center shadow-lg shadow-rose-300/50 active:bg-rose-gold-dark transition-all duration-300 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      title="Kembali ke atas"
    >
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </a>
  );
}
