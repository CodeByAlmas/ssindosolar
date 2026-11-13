'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { WIPE } from '@/lib/wipe';
import { HERO } from '@/lib/images';
import { Logo, LOGO } from './Logo';

type W = Window & { __plDone?: boolean };
const finish = () => { (window as W).__plDone = true; window.dispatchEvent(new Event('preloader:done')); };
const ASSETS = HERO.map((h) => h.img);
const [vx, , vw] = LOGO.vb.split(' ').map(Number);
const SHIFT = ((vx + vw / 2) - (LOGO.mark[0] + LOGO.mark[2]) / 2) / vw * 100; // % of logo width to centre the mark alone
const TEXT_W = LOGO.name[2] - 222 + 6;

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null), pF = useRef<SVGPathElement>(null), pG = useRef<SVGPathElement>(null);
  const [done, setDone] = useState(false);
  useEffect(() => {
    let seen = false; try { seen = sessionStorage.getItem('ssis') === '1'; } catch {}
    if (seen || matchMedia('(prefers-reduced-motion: reduce)').matches) { setDone(true); finish(); return; }
    const html = document.documentElement; html.style.overflow = 'hidden';
    const r = root.current!, svg = r.querySelector<SVGSVGElement>('.pl4-logo')!;
    const hut = svg.querySelector('.lg-hut')!, sun = svg.querySelector('.lg-sun')!, rv = svg.querySelector('.lg-rv')!, name = svg.querySelector('.lg-name')!, tag = svg.querySelector('.lg-tag')!;
    const rays = ['.lg-ray2', '.lg-ray3', '.lg-ray4', '.lg-ray0', '.lg-ray1'].map((s) => svg.querySelector(s)!);
    const num = r.querySelector<HTMLElement>('.pl4-num')!, bar = r.querySelector<HTMLElement>('.pl4-bar i')!;
    gsap.set(svg, { xPercent: SHIFT }); gsap.set(hut, { opacity: 0, scale: 0.8, svgOrigin: '197 745' });
    gsap.set(rays, { opacity: 0, y: 20, scale: 0.3, svgOrigin: '197.4 735' }); gsap.set(rv, { attr: { width: 0 } }); gsap.set(name, { x: -42 }); gsap.set(tag, { x: -56 });
    let loaded = 0, introDone = false, leaving = false, v = 0, raf = 0;
    ASSETS.forEach((src) => { const im = new Image(); im.onload = im.onerror = () => { loaded++; }; im.src = src; });
    const leave = () => {
      if (leaving) return; leaving = true;
      const tl = gsap.timeline({ onComplete: () => { try { sessionStorage.setItem('ssis', '1'); } catch {} html.style.overflow = ''; setDone(true); } });
      tl.to(svg, { scale: 1.06, opacity: 0, duration: 0.5, ease: 'power2.in' }, 0.15).to('.pl4-count', { opacity: 0, duration: 0.3 }, 0)
        .to(pF.current, { attr: { d: WIPE.midOut }, duration: 0.5, ease: 'power2.in' }, 0.5).to(pF.current, { attr: { d: WIPE.gone }, duration: 0.6, ease: 'power3.out' })
        .to(pG.current, { attr: { d: WIPE.midOut }, duration: 0.5, ease: 'power2.in' }, 0.62).to(pG.current, { attr: { d: WIPE.gone }, duration: 0.6, ease: 'power3.out' }).add(finish, 1.0);
    };
    const tick = () => { v += (Math.min(loaded / ASSETS.length, 1) * 100 - v) * 0.12; num.textContent = String(Math.round(v)); bar.style.transform = `scaleX(${v / 100})`; if (introDone && loaded >= ASSETS.length && v > 98) { cancelAnimationFrame(raf); leave(); } else raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    const E = 'expo.inOut';
    const tl = gsap.timeline({ delay: 0.15, onComplete: () => { introDone = true; } });
    tl.to(hut, { opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out' }, 0)
      .to(rays, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'back.out(1.6)', stagger: 0.08 }, 0.6)
      .to(sun, { filter: 'drop-shadow(0 0 9px rgba(255,237,0,.95))', duration: 0.35, yoyo: true, repeat: 1 }, 1.45)
      .to(rv, { attr: { width: TEXT_W }, duration: 1.2, ease: E }, 2.0).to(svg, { xPercent: 0, duration: 1.2, ease: E }, 2.0)
      .to(name, { x: 0, duration: 1.2, ease: E }, 2.0).to(tag, { x: 0, duration: 1.2, ease: E }, 2.12).to({}, { duration: 0.45 });
    return () => { cancelAnimationFrame(raf); tl.kill(); html.style.overflow = ''; };
  }, []);
  if (done) return null;
  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <clipPath id="clipF" clipPathUnits="objectBoundingBox"><path ref={pF} d={WIPE.fullTop} /></clipPath>
        <clipPath id="clipG" clipPathUnits="objectBoundingBox"><path ref={pG} d={WIPE.fullTop} /></clipPath>
      </svg>
      <div className="pl3-g" style={{ clipPath: 'url(#clipG)' }} />
      <div ref={root} className="pl4" style={{ clipPath: 'url(#clipF)' }} role="status" aria-label="Loading SS Indo Solar">
        <div className="pl4-bar"><i /></div>
        <Logo reveal className="lg pl4-logo" />
        <p className="pl4-count"><span className="pl4-num">0</span>%</p>
      </div>
    </>
  );
}
