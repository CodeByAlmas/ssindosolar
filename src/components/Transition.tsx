'use client';
import { createContext, useContext, useEffect, useRef, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';
import { WIPE } from '@/lib/wipe';

const Ctx = createContext<(href: string) => void>(() => {});
export const useNav = () => useContext(Ctx);
const LABELS: Record<string, string> = { '/': 'Home', '/services': 'Services', '/projects': 'Projects', '/installation': 'Installation', '/products': 'Products', '/about': 'About', '/faq': 'FAQ', '/contact': 'Contact' };
const labelOf = (h: string) => { const p = h.split('#')[0]; return LABELS[p] ?? (p.startsWith('/projects/') ? 'Projects' : 'SS Indo Solar'); };

export default function Transition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const path = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const pA = useRef<SVGPathElement>(null), pB = useRef<SVGPathElement>(null), label = useRef<HTMLParagraphElement>(null);
  const busy = useRef(false), first = useRef(true);
  const chars = () => Array.from(label.current!.querySelectorAll<HTMLElement>('i'));

  const go = useCallback((href: string) => {
    if (busy.current) return;
    if (href.split('#')[0] === path || matchMedia('(prefers-reduced-motion: reduce)').matches) { router.push(href); return; }
    busy.current = true;
    label.current!.innerHTML = labelOf(href).split('').map((c) => `<span><i>${c === ' ' ? '&nbsp;' : c}</i></span>`).join('');
    gsap.set(root.current, { display: 'block' });
    gsap.set([pA.current, pB.current], { attr: { d: WIPE.empty } });
    gsap.set(chars(), { yPercent: 110 });
    const tl = gsap.timeline({ onComplete: () => router.push(href) });
    tl.to(pA.current, { attr: { d: WIPE.mid }, duration: 0.45, ease: 'power2.in' }, 0).to(pA.current, { attr: { d: WIPE.full }, duration: 0.45, ease: 'power2.out' })
      .to(pB.current, { attr: { d: WIPE.mid }, duration: 0.45, ease: 'power2.in' }, 0.12).to(pB.current, { attr: { d: WIPE.full }, duration: 0.45, ease: 'power2.out' })
      .to(chars(), { yPercent: 0, duration: 0.7, ease: 'expo.out', stagger: 0.035 }, 0.65);
  }, [path, router]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (first.current) { first.current = false; return; }
    if (!busy.current) return;
    gsap.set([pA.current, pB.current], { attr: { d: WIPE.fullTop } });
    gsap.timeline({ onComplete: () => { busy.current = false; gsap.set(root.current, { display: 'none' }); } })
      .to(chars(), { yPercent: -110, duration: 0.4, ease: 'power3.in', stagger: 0.02 }, 0.1)
      .to(pB.current, { attr: { d: WIPE.midOut }, duration: 0.45, ease: 'power2.in' }, 0.45).to(pB.current, { attr: { d: WIPE.gone }, duration: 0.5, ease: 'power3.out' })
      .to(pA.current, { attr: { d: WIPE.midOut }, duration: 0.45, ease: 'power2.in' }, 0.57).to(pA.current, { attr: { d: WIPE.gone }, duration: 0.5, ease: 'power3.out' })
      .fromTo('main > *', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', clearProps: 'transform,opacity' }, 0.95);
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
        <div className="tg2-b" style={{ clipPath: 'url(#clipB)' }}><p ref={label} className="tg2-label" /></div>
      </div>
    </Ctx.Provider>
  );
}
