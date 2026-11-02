'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import TLink from './TLink';
import CBtn from './CBtn';
import { wa } from './Chrome';
import { SITE } from '@/lib/data';

const LINKS: [string, string][] = [['/services', 'Services'], ['/projects', 'Projects'], ['/installation', 'Installation'], ['/products', 'Products'], ['/about', 'About'], ['/contact', 'Contact']];

export default function Header() {
  const [open, setOpen] = useState(false), [s, setS] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const path = usePathname();
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => { const f = () => setS(scrollY > 30); f(); addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f); }, []);
  useEffect(() => { const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); }; document.addEventListener('keydown', k); document.documentElement.style.overflow = open ? 'hidden' : ''; return () => { document.removeEventListener('keydown', k); document.documentElement.style.overflow = ''; }; }, [open]);
  return (
    <>
      <header className="hd" ref={ref} data-s={s} data-o={open}>
        <div className="hd-in">
          <TLink href="/" className="hd-logo" aria-label="SS Indo Solar, home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="w" src="/logo-dark.png" alt="" />{/* eslint-disable-next-line @next/next/no-img-element */}<img className="d" src="/logo.png" alt="SS Indo Solar" />
          </TLink>
          <nav className="hd-nav" aria-label="Primary">{LINKS.slice(0, 5).map(([h, l]) => <TLink key={h} href={h} aria-current={path.startsWith(h) ? 'page' : undefined}>{l}</TLink>)}</nav>
          <div className="hd-r">
            <CBtn v="sun sm" external href={wa('Hello, I would like a solar quote.')}>Get a quote</CBtn>
            <button className="burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="sheet" onClick={() => setOpen(!open)}><i /><i /></button>
          </div>
        </div>
      </header>
      <div className="sheet" id="sheet" data-o={open} aria-hidden={!open}>
        <nav aria-label="Menu">{[['/', 'Home'], ...LINKS, ['/faq', 'FAQ']].map(([h, l], i) => <TLink key={h} href={h} className="l" onClick={() => setOpen(false)}><span style={{ '--i': i } as React.CSSProperties}>{l}</span></TLink>)}</nav>
        <small>{SITE.address}<br />{SITE.phones[0]} · {SITE.emails[0]}</small>
      </div>
    </>
  );
}
