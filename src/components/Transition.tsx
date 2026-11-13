'use client';
import { createContext, useContext, useEffect, useRef, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';
import { WIPE } from '@/lib/wipe';
import { Logo } from './Logo';

const Ctx = createContext<(href: string) => void>(() => {});
export const useNav = () => useContext(Ctx);
const LABELS: Record<string, string> = { '/': 'Home', '/services': 'Services', '/projects': 'Projects', '/installation': 'Installation', '/about': 'About', '/faq': 'FAQ', '/contact': 'Contact', '/products': 'Equipment' };
const SVC: Record<string, string> = { epc: 'EPC', 'system-design': 'System Design', liasoning: 'Liasoning', amc: 'AMC', mcs: 'MCS' };
const labelOf = (h: string) => { const p = h.split('#')[0]; if (p.startsWith('/services/')) return SVC[p.split('/')[2]] ?? 'Services'; return LABELS[p] ?? (p.startsWith('/projects/') ? 'Projects' : 'SS Indo Solar'); };

export default function Transition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const path = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const pA = useRef<SVGPathElement>(null), pB = useRef<SVGPathElement>(null), label = useRef<HTMLParagraphElement>(null);
  const wire = useRef<SVGPathElement>(null), dot = useRef<SVGCircleElement>(null);
  const busy = useRef(false), first = useRef(true);
  const chars = () => Array.from(label.current!.querySelectorAll<HTMLElement>('i'));
  const mark = () => { const m = root.current!.querySelector('.tg2-mark')!; return { hut: m.querySelector('.lg-hut')!, rays: ['.lg-ray2', '.lg-ray3', '.lg-ray4', '.lg-ray0', '.lg-ray1'].map((s) => m.querySelector(s)!) }; };

  const go = useCallback((href: string) => {
    if (busy.current) return;
    if (href.split('#')[0] === path || matchMedia('(prefers-reduced-motion: reduce)').matches) { router.push(href); return; }
    busy.current = true;
    label.current!.textContent = ''; labelOf(href).split('').forEach((c) => { const o = document.createElement('span'), i = document.createElement('i'); i.textContent = c === ' ' ? '\u00a0' : c; o.appendChild(i); label.current!.appendChild(o); });
    const { hut, rays } = mark();
    gsap.set(root.current, { display: 'block' }); gsap.set([pA.current, pB.current], { attr: { d: WIPE.empty } }); gsap.set(chars(), { yPercent: 110 });
    gsap.set(hut, { opacity: 0, scale: 0.8, svgOrigin: '197 745' }); gsap.set(rays, { opacity: 0, y: 14, scale: 0.3, svgOrigin: '197.4 735' });
    gsap.to('main', { opacity: 0.3, scale: 0.965, y: -24, transformOrigin: '50% 0', duration: 1, ease: 'power2.in' });
    const tl = gsap.timeline({ onComplete: () => router.push(href) });
    tl.to(pA.current, { attr: { d: WIPE.mid }, duration: 0.42, ease: 'power2.in' }, 0).to(pA.current, { attr: { d: WIPE.full }, duration: 0.42, ease: 'power2.out' })
      .to(pB.current, { attr: { d: WIPE.mid }, duration: 0.42, ease: 'power2.in' }, 0.11).to(pB.current, { attr: { d: WIPE.full }, duration: 0.42, ease: 'power2.out' })
      .to(hut, { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' }, 0.62)
      .to(rays, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)', stagger: 0.05 }, 0.72)
      .to(chars(), { yPercent: 0, duration: 0.65, ease: 'expo.out', stagger: 0.03 }, 0.8)
      .fromTo(wire.current, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.inOut' }, 0.85)
      .fromTo(dot.current, { attr: { cx: 0 }, opacity: 1 }, { attr: { cx: 400 }, duration: 0.6, ease: 'power2.inOut' }, 0.85).to({}, { duration: 0.2 });
  }, [path, router]);

  useEffect(() => {
    const hh = location.hash; if (hh && document.querySelector(hh)) setTimeout(() => document.querySelector(hh)?.scrollIntoView(), 700); else window.scrollTo(0, 0);
    if (first.current) { first.current = false; return; }
    if (!busy.current) return;
    gsap.set('main', { clearProps: 'transform,opacity,transformOrigin' }); gsap.set([pA.current, pB.current], { attr: { d: WIPE.fullTop } });
    const { hut, rays } = mark();
    gsap.timeline({ onComplete: () => { busy.current = false; gsap.set(root.current, { display: 'none' }); } })
      .to(chars(), { yPercent: -110, duration: 0.35, ease: 'power3.in', stagger: 0.02 }, 0.05).to([hut, ...rays], { opacity: 0, y: -16, duration: 0.3, ease: 'power2.in' }, 0.05)
      .to(pB.current, { attr: { d: WIPE.midOut }, duration: 0.45, ease: 'power2.in' }, 0.4).to(pB.current, { attr: { d: WIPE.gone }, duration: 0.5, ease: 'power3.out' })
      .to(pA.current, { attr: { d: WIPE.midOut }, duration: 0.45, ease: 'power2.in' }, 0.52).to(pA.current, { attr: { d: WIPE.gone }, duration: 0.5, ease: 'power3.out' })
      .fromTo('main > *', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', clearProps: 'transform,opacity' }, 0.85);
  }, [path]);

  return (
    <Ctx.Provider value={go}>
      {children}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <clipPath id="clipA" clipPathUnits="objectBoundingBox"><path ref={pA} d={WIPE.empty} /></clipPath>
        <clipPath id="clipB" clipPathUnits="objectBoundingBox"><path ref={pB} d={WIPE.empty} /></clipPath>
      </svg>
      <div ref={root} className="tg2" aria-hidden="true">
        <div className="tg2-a" style={{ clipPath: 'url(#clipA)' }} />
        <div className="tg2-b" style={{ clipPath: 'url(#clipB)' }}>
          <Logo markOnly className="lg tg2-mark" />
          <p ref={label} className="tg2-label" />
          <svg className="tg2-wire" viewBox="0 0 400 20" aria-hidden="true"><path d="M0 10 H400" stroke="rgba(255,255,255,.18)" strokeWidth="3" fill="none" /><path ref={wire} d="M0 10 H400" pathLength={1} fill="none" stroke="#ffed00" strokeWidth="3" strokeDasharray="1" strokeDashoffset="1" /><circle ref={dot} cx="0" cy="10" r="6" fill="#ffed00" opacity="0" /></svg>
        </div>
      </div>
    </Ctx.Provider>
  );
}
