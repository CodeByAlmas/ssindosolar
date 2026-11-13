'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import CBtn from './CBtn';
import { wa } from './Chrome';
import { Wa, Insta, Phone } from './Icons';
import { HERO } from '@/lib/images';
import { SITE } from '@/lib/data';

const H1 = 'Solar power, built for your roof.'.split(' ');
export default function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setTimeout(() => setI((n) => (n + 1) % HERO.length), 6500); return () => clearTimeout(t);
  }, [i]);
  const next = HERO[(i + 1) % HERO.length];
  return (
    <section className="hero" aria-label="Introduction">
      {HERO.map((s, k) => <div key={s.img} className={`hero-s${k === i ? ' on' : ''}`}><Image src={s.img} alt="" fill priority={k === 0} sizes="100vw" /></div>)}
      <div className="hero-c">
        <p className="eyebrow">Solar EPC company, Kanpur</p>
        <h1 aria-label="Solar power, built for your roof.">{H1.map((w, k) => <span key={k} className="w" style={{ '--i': k } as React.CSSProperties}><span>{w}&nbsp;</span></span>)}</h1>
        <p className="lead">Rooftop, off-grid, pumps and water heaters. Designed, installed and looked after by one team.</p>
        <div className="hero-btns"><CBtn v="light" external href={wa('Hello, I would like a free solar quote.')}>Get a free quote</CBtn><CBtn v="light ghost" href="/projects">View projects</CBtn></div>
      </div>
      <div className="hero-soc">
        <a href={wa('Hello')} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><Wa /></a>
        <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Insta /></a>
        <a href={`tel:${SITE.phones[0].replace(/\s/g, '')}`} aria-label="Call us"><Phone /></a>
      </div>
      <button className="hero-card glass" onClick={() => setI((i + 1) % HERO.length)} aria-label={`Next slide: ${next.title}`}>
        <span className="th"><Image src={next.img} alt="" fill sizes="110px" /></span>
        <span style={{ flex: 1, minWidth: 0 }}><b>{next.title}</b><small>{next.sub}</small></span>
        <span className="ring"><svg viewBox="0 0 46 46"><circle className="bg" cx="23" cy="23" r="20" /><circle key={i} className="fg" cx="23" cy="23" r="20" /></svg>{i + 1}/{HERO.length}</span>
      </button>
    </section>
  );
}
