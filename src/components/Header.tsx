'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import TLink from './TLink';
import CBtn from './CBtn';
import { wa } from './Chrome';
import { SITE } from '@/lib/data';
import { SVCS } from '@/lib/services-data';
import { Logo } from './Logo';

const LINKS: [string, string][] = [['/projects', 'Projects'], ['/installation', 'Installation'], ['/about', 'About'], ['/contact', 'Contact']];

export default function Header() {
  const [open, setOpen] = useState(false), [s, setS] = useState(false);
  const path = usePathname();
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => { const f = () => setS(scrollY > 30); f(); addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f); }, []);
  useEffect(() => { const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); }; document.addEventListener('keydown', k); document.documentElement.style.overflow = open ? 'hidden' : ''; return () => { document.removeEventListener('keydown', k); document.documentElement.style.overflow = ''; }; }, [open]);
  const cur = (h: string) => (path.startsWith(h) ? 'page' : undefined);
  return (
    <>
      <header className="hd" data-s={s} data-o={open}>
        <div className="hd-in">
          <TLink href="/" className="hd-logo" aria-label="SS Indo Solar, home">
            <Logo className="lg" />
          </TLink>
          <nav className="hd-nav" aria-label="Primary">
            <div className="dd">
              <TLink href="/services" aria-current={cur('/services')}>Services<svg viewBox="0 0 12 12" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M2 4.5l4 4 4-4" /></svg></TLink>
              <div className="mega"><div className="mega-in">
                {SVCS.map((v) => <TLink key={v.slug} href={`/services/${v.slug}`} className="mi"><b>{v.short}</b><span>{v.blurb}</span></TLink>)}
                <TLink href="/services" className="mi all"><b>All services</b><span>Grid-tied, off-grid, hybrid, thermal, pumps and more.</span></TLink>
              </div></div>
            </div>
            {LINKS.map(([h, l]) => <TLink key={h} href={h} aria-current={cur(h)}>{l}</TLink>)}
          </nav>
          <div className="hd-r">
            <CBtn v="sun sm" external href={wa('Hello, I would like a solar quote.')}>Get a quote</CBtn>
            <button className="burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="sheet" onClick={() => setOpen(!open)}><i /><i /></button>
          </div>
        </div>
      </header>
      <div className="sheet" id="sheet" data-o={open} aria-hidden={!open}>
        <nav aria-label="Menu">
          <TLink href="/" className="l" onClick={() => setOpen(false)}><span>Home</span></TLink>
          <TLink href="/services" className="l" onClick={() => setOpen(false)}><span>Services</span></TLink>
          <div className="sub">{SVCS.map((v) => <TLink key={v.slug} href={`/services/${v.slug}`} onClick={() => setOpen(false)}>{v.short}</TLink>)}</div>
          {[...LINKS, ['/faq', 'FAQ']].map(([h, l]) => <TLink key={h} href={h} className="l" onClick={() => setOpen(false)}><span>{l}</span></TLink>)}
        </nav>
        <small>{SITE.address}<br />{SITE.phones[0]} · {SITE.emails[0]}</small>
      </div>
    </>
  );
}
