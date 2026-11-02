'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { WIPE } from '@/lib/wipe';
import { HERO } from '@/lib/images';

type W = Window & { __plDone?: boolean };
const finish = () => { (window as W).__plDone = true; window.dispatchEvent(new Event('preloader:done')); };
const ASSETS = [...HERO.map((h) => h.img), '/logo.png', '/logo-dark.png'];

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null), pF = useRef<SVGPathElement>(null), pG = useRef<SVGPathElement>(null);
  const [done, setDone] = useState(false);
  useEffect(() => {
    let seen = false; try { seen = sessionStorage.getItem('ssis') === '1'; } catch {}
    if (seen || matchMedia('(prefers-reduced-motion: reduce)').matches) { setDone(true); finish(); return; }
    const html = document.documentElement; html.style.overflow = 'hidden';
    const q = (s: string) => root.current!.querySelector<HTMLElement>(s)!;
    const num = q('.pl3-num'), fill = q('.pl3-sun i'), bar = q('.pl3-bar i');
    let loaded = 0; ASSETS.forEach((src) => { const im = new Image(); im.onload = im.onerror = () => { loaded++; }; im.src = src; });
    const t0 = performance.now(); let v = 0, raf = 0, leaving = false;
    gsap.from('.pl3-logo', { y: 26, opacity: 0, duration: 1, ease: 'expo.out', delay: 0.1 }); gsap.from('.pl3-tag', { opacity: 0, y: 12, duration: 0.8, delay: 0.4 });
    const leave = () => {
      if (leaving) return; leaving = true; cancelAnimationFrame(raf);
      const tl = gsap.timeline({ onComplete: () => { try { sessionStorage.setItem('ssis', '1'); } catch {} html.style.overflow = ''; setDone(true); } });
      tl.to('.pl3-mid,.pl3-count', { opacity: 0, y: -24, duration: 0.45, ease: 'power2.in' }, 0.25)
        .to(pF.current, { attr: { d: WIPE.midOut }, duration: 0.5, ease: 'power2.in' }, 0.7).to(pF.current, { attr: { d: WIPE.gone }, duration: 0.6, ease: 'power3.out' })
        .to(pG.current, { attr: { d: WIPE.midOut }, duration: 0.5, ease: 'power2.in' }, 0.82).to(pG.current, { attr: { d: WIPE.gone }, duration: 0.6, ease: 'power3.out' })
        .add(finish, 1.2);
    };
    const tick = () => {
      const target = Math.min(loaded / ASSETS.length, (performance.now() - t0) / 2400);
      v += (target * 100 - v) * 0.1; if (target >= 1 && v > 99) v = 100;
      num.textContent = String(Math.round(v)).padStart(2, '0'); fill.style.transform = `translateY(${100 - v}%)`; bar.style.transform = `scaleX(${v / 100})`;
      if (v >= 100) leave(); else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); html.style.overflow = ''; };
  }, []);
  if (done) return null;
  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <clipPath id="clipF" clipPathUnits="objectBoundingBox"><path ref={pF} d={WIPE.fullTop} /></clipPath>
        <clipPath id="clipG" clipPathUnits="objectBoundingBox"><path ref={pG} d={WIPE.fullTop} /></clipPath>
      </svg>
      <div className="pl3-g" style={{ clipPath: 'url(#clipG)' }} />
      <div ref={root} className="pl3" style={{ clipPath: 'url(#clipF)' }} role="status" aria-label="Loading SS Indo Solar">
        <div className="pl3-bar"><i /></div>
        <div className="pl3-mid">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="pl3-logo" src="/logo.png" alt="SS Indo Solar" />
          <div className="pl3-sun" aria-hidden="true"><i /></div>
          <p className="pl3-tag">Powering the Nation</p>
        </div>
        <p className="pl3-count"><span className="pl3-num">00</span><em>%</em></p>
      </div>
    </>
  );
}
