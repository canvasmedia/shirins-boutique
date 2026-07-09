'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { useSite } from '@/lib/context';

export default function BookFlipToggle() {
  const { mode, setMode } = useSite();
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0); // 0 = retail (closed), 180 = wholesale (open)
  const [isAnimating, setIsAnimating] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const scrollAccum = useRef(0);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hintShown = useRef(false);
  const prefersReduced = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  }, []);

  // Sync rotation with mode
  useEffect(() => {
    if (mode === 'retail') {
      setRotation(0);
    } else {
      setRotation(180);
    }
  }, [mode]);

  // Idle animation
  const resetIdle = useCallback(() => {
    setIsIdle(false);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      setIsIdle(true);
    }, 4000);
  }, []);

  useEffect(() => {
    resetIdle();
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [resetIdle]);

  const completeFlip = useCallback((toWholesale: boolean) => {
    const targetRotation = toWholesale ? 180 : 0;
    setIsAnimating(true);
    setRotation(targetRotation);
    setTimeout(() => {
      setMode(toWholesale ? 'wholesale' : 'retail');
      setIsAnimating(false);
    }, 450);
  }, [setMode]);

  const handleClick = useCallback(() => {
    const goWholesale = mode === 'retail';
    completeFlip(goWholesale);
    resetIdle();
  }, [mode, completeFlip, resetIdle]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    if (prefersReduced.current) return;
    if (isAnimating) return;

    resetIdle();
    if (!hintShown.current) {
      setShowHint(false);
      hintShown.current = true;
    }

    scrollAccum.current += e.deltaY * 0.3;
    scrollAccum.current = Math.max(0, Math.min(180, scrollAccum.current));

    const newRot = scrollAccum.current;
    setRotation(newRot);

    // Snap when near extremes
    if (newRot >= 160 && mode === 'retail') {
      completeFlip(true);
      scrollAccum.current = 180;
    } else if (newRot <= 20 && mode === 'wholesale') {
      completeFlip(false);
      scrollAccum.current = 0;
    }
  }, [isAnimating, mode, completeFlip, resetIdle]);

  useEffect(() => {
    scrollAccum.current = mode === 'wholesale' ? 180 : 0;
  }, [mode]);

  // Show hint on first hover
  const handleMouseEnter = useCallback(() => {
    setIsIdle(false);
    if (!hintShown.current) {
      setShowHint(true);
      setTimeout(() => setShowHint(false), 2500);
    }
  }, []);

  const isWholesale = mode === 'wholesale';
  const isFlipping = rotation > 5 && rotation < 175;
  const showBack = rotation > 90;

  const idleClass = isIdle && !prefersReduced.current && !isWholesale
    ? 'animate-[corner-lift_2.5s_ease-in-out_infinite]'
    : '';

  return (
    <div className="relative flex items-center" onMouseEnter={handleMouseEnter}>
      {/* Hint tooltip */}
      {showHint && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-ink text-ivory text-[10px] font-montserrat tracking-wide px-2 py-1 rounded pointer-events-none z-50 opacity-90">
          Scroll to flip ↕
        </div>
      )}

      <div
        ref={containerRef}
        className={`book-flip-container relative cursor-pointer select-none`}
        style={{ width: 84, height: 56 }}
        onClick={handleClick}
        onWheel={handleWheel}
        aria-label={`Switch to ${isWholesale ? 'Retail' : 'Wholesale'} mode`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}
      >
        {/* Book spine */}
        <div
          className="absolute inset-0 rounded-r-md overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1A1A1A 0%, #2a2a2a 100%)',
            boxShadow: '2px 2px 8px rgba(0,0,0,0.3), inset -2px 0 4px rgba(255,255,255,0.05)',
          }}
        >
          {/* Gold foil edge */}
          <div className="absolute inset-0 rounded-r-md" style={{
            border: '1px solid rgba(212,175,55,0.4)',
            boxShadow: 'inset 0 0 0 2px rgba(212,175,55,0.15)',
          }} />
          {/* Pages stacked effect */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute right-0 top-0 bottom-0"
              style={{
                width: 2,
                right: 4 + i * 2,
                background: `rgba(247, 242, 234, ${0.15 - i * 0.04})`,
              }}
            />
          ))}
        </div>

        {/* Page that flips */}
        <div
          className={`book-page absolute inset-0 ${idleClass}`}
          style={{
            transformOrigin: 'left center',
            transform: `rotateY(${-rotation}deg)`,
            transition: isAnimating ? 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Front face — RETAIL */}
          <div
            className="absolute inset-0 rounded-r-md flex flex-col items-center justify-center backface-hidden"
            style={{
              background: 'linear-gradient(135deg, #2a2420 0%, #1A1A1A 100%)',
              border: '1px solid rgba(212,175,55,0.5)',
              backfaceVisibility: 'hidden',
              boxShadow: 'inset -4px 0 12px rgba(212,175,55,0.08)',
              opacity: showBack ? 0 : 1,
              transition: 'opacity 0.15s ease',
            }}
          >
            <span
              className="font-playfair text-gold tracking-[0.12em] text-[9px] font-bold uppercase"
              style={{ fontVariant: 'small-caps', letterSpacing: '0.15em', lineHeight: 1 }}
            >
              RETAIL
            </span>
            <div className="mt-1 w-8 h-px bg-gold opacity-50" />
            <div className="mt-1 flex gap-0.5">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-0.5 h-2 rounded-full bg-gold opacity-30" />
              ))}
            </div>
          </div>

          {/* Back face — WHOLESALE */}
          <div
            className="absolute inset-0 rounded-r-md flex flex-col items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #1B2A6B 0%, #2a3d8f 100%)',
              border: '1px solid rgba(100,130,220,0.4)',
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              boxShadow: 'inset -4px 0 12px rgba(100,150,255,0.1)',
            }}
          >
            <span
              className="font-playfair text-[8px] font-bold tracking-wider uppercase"
              style={{ color: '#a8c0ff', fontVariant: 'small-caps', letterSpacing: '0.12em' }}
            >
              WHOLESALE
            </span>
            <div className="mt-1 w-8 h-px opacity-50" style={{ background: '#a8c0ff' }} />
            <div className="mt-1 flex gap-0.5">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-0.5 h-2 rounded-full opacity-30" style={{ background: '#a8c0ff' }} />
              ))}
            </div>
          </div>
        </div>

        {/* Mode indicator dot */}
        <div
          className="absolute -top-1 -right-1 w-2 h-2 rounded-full transition-colors duration-300"
          style={{ background: isWholesale ? '#6B8FFF' : '#D4AF37' }}
        />
      </div>
    </div>
  );
}
