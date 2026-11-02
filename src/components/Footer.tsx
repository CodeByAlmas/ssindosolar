'use client';
import { useRef } from 'react';
import TLink from './TLink';
import CBtn from './CBtn';
import { wa } from './Chrome';
import { SITE } from '@/lib/data';

const EXPLORE: [string, string][] = [['/services', 'Services'], ['/projects', 'Projects'], ['/installation', 'Installation'], ['/products', 'Products'], ['/about', 'About'], ['/faq', 'FAQ'], ['/contact', 'Contact']];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const move = (e: React.PointerEvent) => { const r = ref.current!.getBoundingClientRect(); ref.current!.style.setProperty('--mx', `${e.clientX - r.left}px`); ref.current!.style.setProperty('--my', `${e.clientY - r.top}px`); };
  return (
    <footer className="ft" ref={ref} onPointerMove={move}>
      <div className="ft-in">
        <div className="ft-top">
          <div><h2>Ready to switch your roof to solar?</h2><p>Share your monthly bill and we will size the system and send a quote on WhatsApp.</p></div>
          <div className="ft-btns"><CBtn v="sun" external href={wa('Hello, I would like a solar quote.')}>Get a quote</CBtn><CBtn v="light ghost" external href={`tel:${SITE.phones[0].replace(/\s/g, '')}`}>Call us</CBtn></div>
        </div>
        <div className="ft-grid">
          <div className="ft-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-dark.png" alt="SS Indo Solar, Powering the Nation" />
            <p>Solar EPC company and wholesale distributor in Kanpur. UPNEDA-empanelled PM Surya Ghar vendor.</p>
          </div>
          <div><h3>Explore</h3>{EXPLORE.map(([h, l]) => <TLink key={h} href={h}>{l}</TLink>)}</div>
          <div><h3>Visit</h3><p>{SITE.address}</p></div>
          <div><h3>Contact</h3>{SITE.phones.map((p) => <a key={p} href={`tel:${p.replace(/\s/g, '')}`}>{p}</a>)}{SITE.emails.map((e) => <a key={e} href={`mailto:${e}`}>{e}</a>)}</div>
          <div><h3>Elsewhere</h3><a href={SITE.indiamart} target="_blank" rel="noopener noreferrer">IndiaMART</a><a href={SITE.instagram} target="_blank" rel="noopener noreferrer">Instagram</a><a href={wa('Hello')} target="_blank" rel="noopener noreferrer">WhatsApp</a></div>
        </div>
        <p className="ft-word" aria-hidden="true">SS INDOSOLAR</p>
        <div className="ft-bot"><small>© {new Date().getFullYear()} {SITE.name}. All rights reserved. GST {SITE.gst}</small><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top ↑</button></div>
      </div>
    </footer>
  );
}
