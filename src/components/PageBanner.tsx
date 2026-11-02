import Image from 'next/image';
import type { ReactNode } from 'react';

export default function PageBanner({ eyebrow, title, lead, img }: { eyebrow: string; title: string; lead?: ReactNode; img: string }) {
  return (
    <section className="pb">
      <div className="pb-m"><Image src={img} alt="" fill priority sizes="100vw" /></div>
      <div className="pb-in wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
      </div>
    </section>
  );
}
