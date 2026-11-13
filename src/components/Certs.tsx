'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export interface Cert { src: string; title: string; sub: string }
export default function Certs({ items }: { items: Cert[] }) {
  const [o, setO] = useState<number | null>(null);
  useEffect(() => {
    if (o === null) return;
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setO(null); if (e.key === 'ArrowRight') setO((i) => (i! + 1) % items.length); if (e.key === 'ArrowLeft') setO((i) => (i! - 1 + items.length) % items.length); };
    addEventListener('keydown', k); return () => removeEventListener('keydown', k);
  }, [o, items.length]);
  return (
    <>
      <div className="certs" data-stagger>
        {items.map((c, i) => (
          <button key={c.src} className="cert" onClick={() => setO(i)} aria-label={`Open ${c.title}`}>
            <span className="cert-i"><Image src={c.src} alt={c.title} fill sizes="(max-width:900px) 50vw, 25vw" style={{ objectFit: 'cover', objectPosition: 'top' }} /></span>
            <b>{c.title}</b><small>{c.sub}</small>
          </button>))}
      </div>
      {o !== null && (
        <div className="lb" role="dialog" aria-modal="true" aria-label={items[o].title} onClick={() => setO(null)}>
          <button className="lb-x" aria-label="Close">×</button>
          <div className="lb-body" onClick={(e) => e.stopPropagation()}><Image src={items[o].src} alt={items[o].title} fill sizes="100vw" style={{ objectFit: 'contain' }} /></div>
        </div>)}
    </>
  );
}
