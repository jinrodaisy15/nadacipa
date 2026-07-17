import { useState, useRef, useEffect, useCallback } from 'react';

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Format time helper
  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Update progress
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTime(formatTime(audio.currentTime));
      }
    };

    const handleLoaded = () => {
      setDuration(formatTime(audio.duration));
      setIsLoaded(true);
    };

    const handleEnded = () => {
      audio.currentTime = 0;
      audio.play();
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', handleLoaded);
    audio.addEventListener('canplaythrough', handleLoaded);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', handleLoaded);
      audio.removeEventListener('canplaythrough', handleLoaded);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Set volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!hasInteracted) setHasInteracted(true);

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  }, [isPlaying, hasInteracted]);

  // Seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const newTime = (Number(e.target.value) / 100) * audio.duration;
    audio.currentTime = newTime;
    setProgress(Number(e.target.value));
  };

  // Close panel when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };
    if (isExpanded) {
      document.addEventListener('mousedown', handleClick);
      document.addEventListener('touchstart', handleClick as EventListener);
    }
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick as EventListener);
    };
  }, [isExpanded]);

  return (
    <>
      {/* Audio element */}
      <audio
        ref={audioRef}
        src="/music/semua-aku-dirayakan.mp3"
        preload="metadata"
        loop
      />

      {/* Floating music button */}
      <div ref={panelRef} className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-40">
        {/* Expanded panel */}
        <div className={`transition-all duration-500 ease-out ${
          isExpanded
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}>
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-rose-200/40 border border-rose-100 p-4 mb-3 w-[280px] sm:w-[300px]">
            {/* Song info */}
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-rose-gold to-rose-gold-light rounded-xl flex items-center justify-center flex-shrink-0 ${isPlaying ? 'animate-pulse-heart' : ''}`}>
                <span className="text-lg sm:text-xl">🎵</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-poppins text-warm-brown text-xs sm:text-sm font-semibold truncate">
                  Semua Aku Dirayakan
                </p>
                <p className="font-poppins text-warm-brown/50 text-[10px] sm:text-xs truncate">
                  Nadin Amizah
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-3">
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-rose-100 rounded-full appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-3.5
                    [&::-webkit-slider-thumb]:h-3.5
                    [&::-webkit-slider-thumb]:bg-rose-gold
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:shadow-md
                    [&::-webkit-slider-thumb]:shadow-rose-200
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:w-3.5
                    [&::-moz-range-thumb]:h-3.5
                    [&::-moz-range-thumb]:bg-rose-gold
                    [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:border-0
                    [&::-moz-range-thumb]:shadow-md
                    [&::-moz-range-thumb]:cursor-pointer
                    [&::-moz-range-track]:bg-rose-100
                    [&::-moz-range-track]:rounded-full
                    [&::-moz-range-track]:h-1.5"
                  style={{
                    background: `linear-gradient(to right, #b76e79 0%, #b76e79 ${progress}%, #fce4ec ${progress}%, #fce4ec 100%)`,
                  }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="font-poppins text-[9px] sm:text-[10px] text-warm-brown/40">{currentTime}</span>
                <span className="font-poppins text-[9px] sm:text-[10px] text-warm-brown/40">{duration}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* Play/Pause button */}
              <button
                onClick={togglePlay}
                className="w-10 h-10 bg-gradient-to-br from-rose-gold to-rose-gold-dark rounded-full flex items-center justify-center shadow-lg shadow-rose-200/50 active:scale-95 transition-transform flex-shrink-0"
              >
                {isPlaying ? (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Volume control */}
              <div className="flex items-center gap-2 flex-1">
                <button
                  onClick={() => setVolume(volume > 0 ? 0 : 0.5)}
                  className="flex-shrink-0 w-7 h-7 flex items-center justify-center"
                >
                  {volume === 0 ? (
                    <svg className="w-4 h-4 text-warm-brown/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-warm-brown/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume * 100}
                  onChange={(e) => setVolume(Number(e.target.value) / 100)}
                  className="flex-1 h-1.5 bg-rose-100 rounded-full appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-3
                    [&::-webkit-slider-thumb]:h-3
                    [&::-webkit-slider-thumb]:bg-rose-gold
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:shadow-sm
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:w-3
                    [&::-moz-range-thumb]:h-3
                    [&::-moz-range-thumb]:bg-rose-gold
                    [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:border-0
                    [&::-moz-range-thumb]:cursor-pointer
                    [&::-moz-range-track]:bg-rose-100
                    [&::-moz-range-track]:rounded-full
                    [&::-moz-range-track]:h-1.5"
                  style={{
                    background: `linear-gradient(to right, #b76e79 0%, #b76e79 ${volume * 100}%, #fce4ec ${volume * 100}%, #fce4ec 100%)`,
                  }}
                />
              </div>
            </div>

            {/* Not loaded hint */}
            {!isLoaded && hasInteracted && (
              <p className="font-poppins text-rose-gold/60 text-[10px] mt-2 text-center">
                ⚠️ File musik belum ditemukan. Taruh file MP3 di public/music/
              </p>
            )}
          </div>
        </div>

        {/* Floating toggle button */}
        <button
          onClick={() => {
            if (!isExpanded) {
              setIsExpanded(true);
            } else if (!isPlaying) {
              togglePlay();
            } else {
              setIsExpanded(!isExpanded);
            }
          }}
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 active:scale-90 ml-auto ${
            isPlaying
              ? 'bg-gradient-to-br from-rose-gold to-rose-gold-dark shadow-rose-300/50'
              : 'bg-white border-2 border-rose-200 shadow-rose-200/30'
          }`}
        >
          <div className="relative">
            {isPlaying ? (
              <>
                {/* Animated music bars */}
                <div className="flex items-end gap-[3px] h-5">
                  <div className="w-[3px] bg-white rounded-full animate-bounce" style={{ height: '60%', animationDelay: '0s', animationDuration: '0.6s' }} />
                  <div className="w-[3px] bg-white rounded-full animate-bounce" style={{ height: '100%', animationDelay: '0.15s', animationDuration: '0.5s' }} />
                  <div className="w-[3px] bg-white rounded-full animate-bounce" style={{ height: '40%', animationDelay: '0.3s', animationDuration: '0.7s' }} />
                  <div className="w-[3px] bg-white rounded-full animate-bounce" style={{ height: '80%', animationDelay: '0.1s', animationDuration: '0.55s' }} />
                </div>
                {/* Ping animation */}
                <div className="absolute inset-0 -m-1 rounded-full border-2 border-rose-gold animate-ping opacity-20" />
              </>
            ) : (
              <span className="text-xl sm:text-2xl">🎵</span>
            )}
          </div>
        </button>
      </div>
    </>
  );
}
