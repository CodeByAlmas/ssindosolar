'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';

export default function Smooth() {
  const path = usePathname();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lenis: Lenis | null = null, tick: ((t: number) => void) | null = null;
    if (!reduce) { lenis = new Lenis({ lerp: 0.1 }); lenis.on('scroll', ScrollTrigger.update); tick = (t) => lenis!.raf(t * 1000); gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0); }
    const ctx = gsap.context(() => {
      if (reduce) return;
      const st = (el: Element, start = 'top 88%') => ({ trigger: el, start, once: true });
      gsap.utils.toArray<HTMLElement>('[data-split]').forEach((h) => {
        const words = (h.textContent || '').split(' ');
        h.innerHTML = words.map((w) => `<span class="w"><span>${w}&nbsp;</span></span>`).join('');
        gsap.from(h.querySelectorAll('.w>span'), { yPercent: 115, duration: 1, ease: 'expo.out', stagger: 0.05, scrollTrigger: st(h) });
      });
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => gsap.from(el, { y: 40, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: st(el) }));
      gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((el) => gsap.from(el.children, { y: 44, opacity: 0, duration: 0.95, ease: 'power3.out', stagger: 0.1, scrollTrigger: st(el, 'top 85%') }));
      gsap.utils.toArray<HTMLElement>('[data-img]').forEach((el) => {
        const img = el.querySelector('img'); if (!img) return;
        gsap.fromTo(el, { clipPath: 'inset(10% 6% 10% 6% round 28px)' }, { clipPath: 'inset(0% 0% 0% 0% round 28px)', duration: 1.3, ease: 'expo.out', clearProps: 'clipPath', scrollTrigger: st(el, 'top 90%') });
        gsap.fromTo(img, { yPercent: -7 }, { yPercent: 7, ease: 'none', scrollTrigger: { trigger: el, scrub: true } });
      });
      gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
        const end = Number(el.dataset.count), o = { v: 0 };
        gsap.to(o, { v: end, duration: 2.2, ease: 'power2.out', scrollTrigger: st(el, 'top 92%'), onUpdate: () => { el.textContent = String(Math.round(o.v)); } });
      });
    });
    ScrollTrigger.refresh();
    return () => { ctx.revert(); if (tick) gsap.ticker.remove(tick); lenis?.destroy(); };
  }, [path]);
  return null;
}
