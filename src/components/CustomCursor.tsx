'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const mutationTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Only show on desktop with a real mouse pointer
    if (typeof window === 'undefined') return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReduced) return;

    const dot = dotRef.current;
    if (!dot) return;

    const onMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      if (dot) {
        dot.style.left = `${e.clientX}px`;
        dot.style.top = `${e.clientY}px`;
      }
    };

    const onEnterClickable = () => setIsHovering(true);
    const onLeaveClickable = () => setIsHovering(false);

    const addListeners = () => {
      document.querySelectorAll('a, button, [data-cursor="pointer"], input, select, textarea, label').forEach(el => {
        el.addEventListener('mouseenter', onEnterClickable);
        el.addEventListener('mouseleave', onLeaveClickable);
      });
    };

    // Debounced MutationObserver — waits 200ms after DOM settles before re-attaching
    const observer = new MutationObserver(() => {
      if (mutationTimeout.current) clearTimeout(mutationTimeout.current);
      mutationTimeout.current = setTimeout(() => {
        addListeners();
      }, 200);
    });

    observer.observe(document.body, { childList: true, subtree: true });
    addListeners();
    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      observer.disconnect();
      if (mutationTimeout.current) clearTimeout(mutationTimeout.current);
    };
  }, [isVisible]);

  return (
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
        willChange: 'left, top',
      }}
    />
  );
}
