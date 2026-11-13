import type { Metadata } from 'next';
import Image from 'next/image';
import PageBanner from '@/components/PageBanner';
import TLink from '@/components/TLink';
import { PROJECTS } from '@/lib/data';
import { IMG, PROJECT_FALLBACK } from '@/lib/images';
import { listMedia, splitMedia } from '@/lib/media';
import JsonLd, { crumbs } from '@/components/JsonLd';

export const metadata: Metadata = { title: 'Solar Projects', description: 'Darul Uloom Deoband 300 kW, Vidyagyan School Sitapur 300 kW, Unnao 50 kW, Jajmau 25 kW, Chennai off-grid and a Fatehpur solar pump.', alternates: { canonical: '/projects' } };

export default function Projects() {
  return (
    <>
      <PageBanner img={IMG.field} eyebrow="Projects" title="Where the sun now works for us." lead="Across Uttar Pradesh and beyond: schools, madarsas, farms and campuses." />
      <section className="sec"><div className="wrap"><div className="g3" data-stagger>{PROJECTS.map((p) => {
        const { images, videos } = splitMedia(listMedia(`projects/${p.slug}`)); const cover = images[0]?.src ?? PROJECT_FALLBACK[p.slug];
        return (<TLink key={p.slug} href={`/projects/${p.slug}`} className="pj"><div className="media"><Image src={cover} alt={p.title} fill sizes="(max-width:900px) 100vw, 33vw" /><span className="tag sun">{p.capacity}</span></div>
          <div className="meta"><div><h3>{p.title}</h3><p>{p.kind}, {p.place}</p></div>{videos.length > 0 && <span className="tag">▶ {videos.length}</span>}</div></TLink>);
      })}</div></div></section>
      <JsonLd data={crumbs([['Home', '/'], ['Projects', '/projects']])} />
    </>
  );
}
