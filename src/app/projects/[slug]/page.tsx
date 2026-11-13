import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import PageBanner from '@/components/PageBanner';
import Gallery from '@/components/Gallery';
import Certs from '@/components/Certs';
import CBtn from '@/components/CBtn';
import TLink from '@/components/TLink';
import JsonLd, { crumbs } from '@/components/JsonLd';
import { PROJECTS, PROJECT_DOCS, SITE } from '@/lib/data';
import { PROJECT_FALLBACK } from '@/lib/images';
import { listMedia, splitMedia } from '@/lib/media';

export const dynamicParams = false;
export function generateStaticParams() { return PROJECTS.map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  return p ? { title: `${p.title}, ${p.capacity}`, description: `${p.title}: ${p.capacity} ${p.kind}, ${p.place}. Installed by SS Indo Solar.`, alternates: { canonical: `/projects/${p.slug}` } } : {};
}

export default async function Project({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) notFound();
  const { images, videos } = splitMedia(listMedia(`projects/${p.slug}`)); const cover = images[0]?.src ?? PROJECT_FALLBACK[p.slug];
  const others = PROJECTS.filter((x) => x.slug !== p.slug).slice(0, 3);
  return (
    <>
      <PageBanner img={cover} eyebrow={`${p.capacity}, ${p.kind}`} title={p.title} lead={p.place} />
      <section className="sec tight"><div className="wrap"><div className="facts-row" data-stagger>
        <div><small>Capacity</small><b>{p.capacity}</b></div><div><small>System type</small><b>{p.kind}</b></div><div><small>Location</small><b>{p.place}</b></div><div><small>Installed by</small><b>{SITE.name}</b></div>
      </div></div></section>
      {images.length > 0 && <section className="sec tight"><div className="wrap"><div className="sub-h"><h2>Photos</h2><small>{images.length} {images.length === 1 ? 'photo' : 'photos'}</small></div><Gallery items={images} alt={p.title} /></div></section>}
      {videos.length > 0 && <section className="sec tight"><div className="wrap"><div className="sub-h"><h2>Videos</h2><small>{videos.length} {videos.length === 1 ? 'video' : 'videos'}</small></div>
        <div className="vgrid">{videos.map((v) => <figure key={v.src} className="vid"><video controls preload="metadata" playsInline src={`${v.src}#t=0.4`} aria-label={`${p.title} video: ${v.title}`} />{v.title && <figcaption>{v.title}</figcaption>}</figure>)}</div></div></section>}
      {images.length + videos.length === 0 && <section className="sec tight"><div className="wrap"><div className="empty">Photos and videos of this project are coming soon.</div></div></section>}
      {PROJECT_DOCS[p.slug] && <section className="sec tight"><div className="wrap"><div className="sub-h"><h2>Approvals and documents</h2></div><div style={{ maxWidth: 420 }}><Certs items={PROJECT_DOCS[p.slug]} /></div></div></section>}
      <section className="sec tight"><div className="wrap"><div className="mrow"><h2 className="h2" style={{ fontSize: 'clamp(24px,3vw,38px)' }}>More projects</h2><CBtn href="/projects" v="ghost">All projects</CBtn></div>
        <div className="g3">{others.map((o) => (<TLink key={o.slug} href={`/projects/${o.slug}`} className="pj"><div className="media"><Image src={splitMedia(listMedia(`projects/${o.slug}`)).images[0]?.src ?? PROJECT_FALLBACK[o.slug]} alt={o.title} fill sizes="(max-width:900px) 100vw, 33vw" /><span className="tag sun">{o.capacity}</span></div><div className="meta"><div><h3>{o.title}</h3><p>{o.place}</p></div></div></TLink>))}</div></div></section>
      <JsonLd data={crumbs([['Home', '/'], ['Projects', '/projects'], [p.title, `/projects/${p.slug}`]])} />
    </>
  );
}
