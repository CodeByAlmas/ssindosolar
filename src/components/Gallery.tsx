'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { Media } from '@/lib/media';

export default function Gallery({ items, alt }: { items: Media[]; alt: string }) {
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') setOpen((i) => (i === null ? i : (i + 1) % items.length));
      if (e.key === 'ArrowLeft') setOpen((i) => (i === null ? i : (i - 1 + items.length) % items.length));
    };
    addEventListener('keydown', k); return () => removeEventListener('keydown', k);
  }, [open, items.length]);

  if (!items.length) return <p className="empty">Photos coming soon.</p>;
  const cur = open === null ? null : items[open];
  return (
    <>
      <div className="gal">
        {items.map((m, i) => (
          <button key={m.src} className="gal-item" onClick={() => setOpen(i)} aria-label={`Open ${alt} ${m.type} ${i + 1}`}>
            {m.type === 'image'
              ? <Image src={m.src} alt={`${alt} ${i + 1}`} fill sizes="(max-width:700px) 50vw, 25vw" />
              : <><video src={m.src + '#t=0.5'} muted playsInline preload="metadata" /><span className="play" aria-hidden="true">▶</span></>}
          </button>
        ))}
      </div>
      {cur && (
        <div className="lb" role="dialog" aria-modal="true" onClick={() => setOpen(null)}>
          <button className="lb-x" aria-label="Close">×</button>
          <div className="lb-body" onClick={(e) => e.stopPropagation()}>
            {cur.type === 'image'
              ? <Image src={cur.src} alt={alt} fill sizes="100vw" style={{ objectFit: 'contain' }} />
              : <video src={cur.src} controls autoPlay playsInline />}
          </div>
        </div>
      )}
    </>
  );
}
