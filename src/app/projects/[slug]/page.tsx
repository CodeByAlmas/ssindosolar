import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import PageBanner from '@/components/PageBanner';
import Gallery from '@/components/Gallery';
import CBtn from '@/components/CBtn';
import TLink from '@/components/TLink';
import { PROJECTS } from '@/lib/data';
import { PROJECT_FALLBACK } from '@/lib/images';
import { listMedia } from '@/lib/media';

export const dynamicParams = false;
export function generateStaticParams() { return PROJECTS.map((p) => ({ slug: p.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = PROJECTS.find((x) => x.slug === params.slug);
  return p ? { title: `${p.title}, ${p.capacity}`, description: `${p.title}: ${p.capacity} ${p.kind}, ${p.place}. SS Indo Solar.`, alternates: { canonical: `/projects/${p.slug}` } } : {};
}

export default function Project({ params }: { params: { slug: string } }) {
  const p = PROJECTS.find((x) => x.slug === params.slug);
  if (!p) notFound();
  const media = listMedia(`projects/${p.slug}`); const cover = media.find((m) => m.type === 'image')?.src ?? PROJECT_FALLBACK[p.slug];
  const others = PROJECTS.filter((x) => x.slug !== p.slug).slice(0, 3);
  return (
    <>
      <PageBanner img={cover} eyebrow={`${p.capacity}, ${p.kind}`} title={p.title} lead={p.place} />
      <section className="sec"><div className="wrap">
        <div className="mrow"><h2 className="h2" style={{ fontSize: 'clamp(24px,3vw,38px)' }}>Project gallery</h2><CBtn href="/projects" v="ghost">All projects</CBtn></div>
        <Gallery items={media} alt={p.title} />
      </div></section>
      <section className="sec tight"><div className="wrap"><div className="mrow"><h2 className="h2" style={{ fontSize: 'clamp(24px,3vw,38px)' }}>More projects</h2></div>
        <div className="g3">{others.map((o) => (<TLink key={o.slug} href={`/projects/${o.slug}`} className="pj"><div className="media"><Image src={listMedia(`projects/${o.slug}`).find((m) => m.type === 'image')?.src ?? PROJECT_FALLBACK[o.slug]} alt={o.title} fill sizes="(max-width:900px) 100vw, 33vw" /><span className="tag sun">{o.capacity}</span></div><div className="meta"><div><h3>{o.title}</h3><p>{o.place}</p></div></div></TLink>))}</div></div></section>
    </>
  );
}
