'use client';
import { useEffect } from 'react';
import gsap from 'gsap';

type W = Window & { __plDone?: boolean };
export default function Interactions() {
  useEffect(() => {
    const d = document.documentElement; let started = false;
    const start = () => {
      if (started || !d.classList.contains('intro')) return; started = true;
      Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 700))]).then(() => requestAnimationFrame(() => requestAnimationFrame(() => {
        d.classList.add('intro-play'); setTimeout(() => d.classList.remove('intro', 'intro-play'), 3300);
      })));
    };
    if ((window as W).__plDone) start(); else window.addEventListener('preloader:done', start, { once: true });
    if (!matchMedia('(hover:hover)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let mag: HTMLElement | null = null;
    const move = (e: PointerEvent) => {
      const m = (e.target as Element).closest<HTMLElement>('.cbtn,.ask-btn');
      if (mag && mag !== m) gsap.to(mag, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,.5)' });
      mag = m;
      if (m) { const r = m.getBoundingClientRect(); gsap.to(m, { x: (e.clientX - r.left - r.width / 2) * 0.2, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.35, ease: 'power3.out' }); }
    };
    document.addEventListener('pointermove', move);
    return () => document.removeEventListener('pointermove', move);
  }, []);
  return null;
}
