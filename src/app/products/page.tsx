import type { Metadata } from 'next';
import Image from 'next/image';
import PageBanner from '@/components/PageBanner';
import { wa } from '@/components/Chrome';
import { CATEGORIES } from '@/lib/data';
import { IMG } from '@/lib/images';

export const metadata: Metadata = { title: 'Solar Products', description: 'Solar panels, inverters, batteries, Waaree solar water heaters and street lights, wholesale from Kanpur.', alternates: { canonical: '/products' } };

export default function Products() {
  const ld = { '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: CATEGORIES.flatMap((c) => c.products).map((p, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'Product', name: p.name, image: p.img, ...(p.price ? { offers: { '@type': 'Offer', priceCurrency: 'INR', price: p.price.replace(/[^\d]/g, '') } } : {}) } })) };
  return (
    <>
      <PageBanner img={IMG.heaters} eyebrow="Products" title="Panels, inverters, batteries and heaters." lead="Wholesale supply from Kanpur. Message us the product name for today's price." />
      <section className="sec tight"><div className="wrap">
        <nav className="pnav" aria-label="Product categories">{CATEGORIES.map((c) => <a key={c.slug} href={`#${c.slug}`}>{c.title}</a>)}</nav>
        {CATEGORIES.map((c) => (
          <div key={c.slug} id={c.slug} className="pcat" style={{ scrollMarginTop: 100 }}>
            <div><h2 data-split>{c.title}</h2><p>{c.blurb}</p></div>
            <div className="pgrid" data-stagger>{c.products.map((p) => (
              <article key={p.name} className="prod"><Image src={p.img.replace('125x125', '500x500')} alt={p.name} width={300} height={300} unoptimized /><h3>{p.name}</h3><p>{p.note}</p>{p.price && <strong>{p.price}</strong>}
                <a href={wa(`Hello, I would like the price of "${p.name}".`)} target="_blank" rel="noopener noreferrer">Ask for price</a></article>))}</div>
          </div>))}
      </div></section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, '\\u003c') }} />
    </>
  );
}
