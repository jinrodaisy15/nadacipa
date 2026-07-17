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

export default function App() {
  return (
    <div className="relative min-h-screen bg-blush">
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

      {/* Back to top button */}
      <BackToTop />
    </div>
  );
}

function BackToTop() {
  return (
    <a
      href="#home"
      className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-rose-gold text-white rounded-full flex items-center justify-center shadow-lg shadow-rose-300/50 hover:bg-rose-gold-dark transition-all duration-300 hover:scale-110"
      title="Kembali ke atas"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </a>
  );
}
