import { useEffect, useRef, useState, useCallback } from 'react';

interface Photo {
  src: string;
  title: string;
  description: string;
  category: string;
}

const photos: Photo[] = [
  {
    src: '/images/adventure-1.jpg',
    title: 'Hiking Bersama',
    description: 'Menaklukkan gunung bersama, melihat dunia dari ketinggian',
    category: 'adventure',
  },
  {
    src: '/images/adventure-2.jpg',
    title: 'Sunset di Danau',
    description: 'Menikmati keindahan sunset yang magis berdua',
    category: 'romantic',
  },
  {
    src: '/images/adventure-3.jpg',
    title: 'Taman Bunga',
    description: 'Dikelilingi keindahan bunga-bunga yang cantik',
    category: 'romantic',
  },
  {
    src: '/images/adventure-4.jpg',
    title: 'Bersepeda Berdua',
    description: 'Petualangan seru bersepeda di pedesaan',
    category: 'adventure',
  },
  {
    src: '/images/adventure-5.jpg',
    title: 'Camping Malam',
    description: 'Malam romantis di bawah bintang-bintang',
    category: 'adventure',
  },
  {
    src: '/images/adventure-6.jpg',
    title: 'Hutan Berkabut',
    description: 'Menjelajahi hutan yang misterius dan indah',
    category: 'adventure',
  },
  {
    src: '/images/couple-date.jpg',
    title: 'Dinner Romantis',
    description: 'Malam spesial dengan candlelight dinner',
    category: 'romantic',
  },
  {
    src: '/images/hero-couple.jpg',
    title: 'Silhouette Cinta',
    description: 'Bayangan kita di bawah langit senja',
    category: 'romantic',
  },
];

export default function Gallery() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [filter, setFilter] = useState<'all' | 'adventure' | 'romantic'>('all');
  const [lightbox, setLightbox] = useState<{ photo: Photo; index: number } | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeaderVisible(true);
      },
      { threshold: 0.2 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  const filteredPhotos = filter === 'all' ? photos : photos.filter(p => p.category === filter);

  const filters = [
    { key: 'all' as const, label: 'Semua', emoji: '📷' },
    { key: 'adventure' as const, label: 'Adventure', emoji: '🏔️' },
    { key: 'romantic' as const, label: 'Romantis', emoji: '💕' },
  ];

  const openLightbox = useCallback((photo: Photo, index: number) => {
    setLightbox({ photo, index });
  }, []);

  const navigateLightbox = useCallback((direction: 'prev' | 'next') => {
    if (!lightbox) return;
    const currentIdx = lightbox.index;
    let newIdx: number;
    if (direction === 'next') {
      newIdx = (currentIdx + 1) % filteredPhotos.length;
    } else {
      newIdx = (currentIdx - 1 + filteredPhotos.length) % filteredPhotos.length;
    }
    setLightbox({ photo: filteredPhotos[newIdx], index: newIdx });
  }, [lightbox, filteredPhotos]);

  // Swipe support for lightbox
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      navigateLightbox(diff > 0 ? 'next' : 'prev');
    }
  };

  return (
    <section id="gallery" className="relative py-16 sm:py-24 md:py-32 bg-gradient-romantic overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/3 w-64 sm:w-96 h-64 sm:h-96 bg-rose-300 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 sm:w-72 h-48 sm:h-72 bg-purple-300 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <div ref={headerRef} className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="font-poppins text-rose-gold text-xs sm:text-sm tracking-[0.25em] uppercase">Kenangan Kita</span>
          <h2 className="font-dancing text-4xl sm:text-5xl md:text-6xl text-warm-brown mt-2 sm:mt-3 mb-3 sm:mb-4">Photo Gallery</h2>
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 sm:w-12 h-px bg-rose-gold/40" />
            <span className="text-lg sm:text-xl">📸</span>
            <span className="w-8 sm:w-12 h-px bg-rose-gold/40" />
          </div>
          <p className="font-poppins text-warm-brown/60 mt-3 sm:mt-4 max-w-lg mx-auto text-xs sm:text-sm px-4">
            Kumpulan momen-momen terbaik yang kita habiskan bersama. Setiap foto menyimpan cerita yang tak ternilai.
          </p>
        </div>

        {/* Filter buttons */}
        <div className={`flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-10 flex-wrap transition-all duration-1000 delay-200 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`font-poppins text-xs sm:text-sm px-4 py-2 sm:px-5 sm:py-2.5 rounded-full transition-all duration-300 flex items-center gap-1.5 sm:gap-2 ${
                filter === f.key
                  ? 'bg-rose-gold text-white shadow-lg shadow-rose-200'
                  : 'bg-white/70 text-warm-brown active:bg-white border border-rose-100'
              }`}
            >
              <span>{f.emoji}</span>
              {f.label}
            </button>
          ))}
        </div>

        {/* Photo grid — 2 columns on mobile, 3 on tablet, 4 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {filteredPhotos.map((photo, idx) => (
            <GalleryCard
              key={photo.src + filter}
              photo={photo}
              index={idx}
              onClick={() => openLightbox(photo, idx)}
            />
          ))}
        </div>

        {/* Hint text */}
        <div className={`text-center mt-6 sm:mt-10 transition-all duration-1000 delay-500 ${headerVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="font-poppins text-warm-brown/40 text-[11px] sm:text-xs italic">
            💡 Tap foto untuk melihat lebih detail • Geser untuk navigasi
          </p>
        </div>
      </div>

      {/* Lightbox - Mobile optimized */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 lightbox-overlay bg-black/90 flex items-center justify-center animate-fade-in"
          onClick={() => setLightbox(null)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="relative w-full h-full flex flex-col items-center justify-center p-3 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-3 right-3 sm:top-5 sm:right-5 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-xl active:bg-white transition-colors"
            >
              <span className="text-warm-brown text-base">✕</span>
            </button>

            {/* Navigation arrows — desktop */}
            <button
              onClick={() => navigateLightbox('prev')}
              className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 rounded-full items-center justify-center shadow-lg hover:bg-white transition-colors"
            >
              <svg className="w-5 h-5 text-warm-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => navigateLightbox('next')}
              className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 rounded-full items-center justify-center shadow-lg hover:bg-white transition-colors"
            >
              <svg className="w-5 h-5 text-warm-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image container */}
            <div className="w-full max-w-3xl bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up">
              <img
                src={lightbox.photo.src}
                alt={lightbox.photo.title}
                className="w-full max-h-[60vh] sm:max-h-[65vh] object-cover"
              />
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-playfair text-base sm:text-xl font-semibold text-warm-brown">{lightbox.photo.title}</h3>
                    <p className="font-poppins text-warm-brown/60 text-xs sm:text-sm mt-0.5 sm:mt-1">{lightbox.photo.description}</p>
                  </div>
                  <span className="text-xs bg-soft-pink text-rose-gold px-2 py-1 rounded-full font-poppins capitalize flex-shrink-0 ml-3">
                    {lightbox.photo.category === 'adventure' ? '🏔️ Adventure' : '💕 Romantic'}
                  </span>
                </div>
                {/* Photo counter */}
                <p className="font-poppins text-warm-brown/30 text-[10px] sm:text-xs mt-2 sm:mt-3">
                  {lightbox.index + 1} / {filteredPhotos.length}
                </p>
              </div>
            </div>

            {/* Swipe hint on mobile */}
            <p className="sm:hidden font-poppins text-white/40 text-[10px] mt-3">
              ← Geser untuk foto lainnya →
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

function GalleryCard({ photo, index, onClick }: { photo: Photo; index: number; onClick: () => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`gallery-card cursor-pointer transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
      onClick={onClick}
    >
      <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-md sm:shadow-lg border-2 border-white bg-white group">
        <div className="overflow-hidden aspect-[3/4]">
          <img
            src={photo.src}
            alt={photo.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        {/* Overlay on hover/tap */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 sm:group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-3 sm:p-4">
          <span className="text-white font-playfair text-sm sm:text-base font-semibold">{photo.title}</span>
          <span className="text-white/80 font-poppins text-[10px] sm:text-xs mt-0.5">{photo.description}</span>
        </div>
        {/* Always visible title on mobile */}
        <div className="sm:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2.5">
          <span className="text-white font-poppins text-[11px] font-medium">{photo.title}</span>
        </div>
        {/* Category badge */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/90 backdrop-blur-sm rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shadow-md">
          <span className="text-xs sm:text-sm">
            {photo.category === 'adventure' ? '🏔️' : '💕'}
          </span>
        </div>
      </div>
    </div>
  );
}
