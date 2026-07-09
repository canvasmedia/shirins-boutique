'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Only show on desktop
    if (typeof window === 'undefined') return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.12);
      ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.12);
      if (ring) {
        ring.style.left = `${ringPos.current.x}px`;
        ring.style.top = `${ringPos.current.y}px`;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    const onEnterClickable = () => setIsHovering(true);
    const onLeaveClickable = () => setIsHovering(false);

    const addListeners = () => {
      document.querySelectorAll('a, button, [data-cursor="pointer"], input, select, textarea, label').forEach(el => {
        el.addEventListener('mouseenter', onEnterClickable);
        el.addEventListener('mouseleave', onLeaveClickable);
      });
    };

    // Re-add listeners when DOM changes
    const observer = new MutationObserver(() => {
      addListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    addListeners();
    window.addEventListener('mousemove', onMove);

    return () => {
      window.removeEventListener('mousemove', onMove);
      observer.disconnect();
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  return (
    <>
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${isHovering ? 'cursor-hover-dot' : ''}`}
        style={{
          opacity: isVisible ? 1 : 0,
          width: isHovering ? '12px' : '8px',
          height: isHovering ? '12px' : '8px',
          backgroundColor: isHovering ? '#C08A8A' : '#D4AF37',
          position: 'fixed',
          top: 0,
          left: 0,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease, opacity 0.3s ease',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovering ? '48px' : '32px',
          height: isHovering ? '48px' : '32px',
          border: `1.5px solid ${isHovering ? 'rgba(192,138,138,0.5)' : 'rgba(212,175,55,0.6)'}`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          transform: 'translate(-50%, -50%)',
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.25s ease, height 0.25s ease, border-color 0.25s ease, opacity 0.3s ease',
        }}
      />
    </>
  );
}
