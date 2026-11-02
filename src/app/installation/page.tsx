import type { Metadata } from 'next';
import Image from 'next/image';
import PageBanner from '@/components/PageBanner';
import Gallery from '@/components/Gallery';
import QuoteForm from '@/components/QuoteForm';
import { STEPS } from '@/lib/data';
import { IMG, STEP_FALLBACK } from '@/lib/images';
import { listMedia } from '@/lib/media';

export const metadata: Metadata = { title: 'Installation Process', description: 'Solar installation process: civil foundation, structure mounting, DC/AC cabling, earthing and lightning arrestor, with site photos.', alternates: { canonical: '/installation' } };
const DESC: Record<string, string> = {
  'civil-foundation': 'Pedestals and footings are cast to the structural design so the array stays put through wind and monsoon.',
  'structure-mounting': 'Galvanised structures are levelled and tilted for your location, then the modules are clamped on.',
  'dc-ac-cabling': 'UV-rated DC cables, proper conduits, DCDB and ACDB, and clean terminations to the inverter and meter.',
  earthing: 'Dedicated earth pits with copper electrodes bring the whole array safely to ground.',
  'lightning-arrestor': 'A lightning arrestor with its own earthing protects the roof and everything under it.',
};

export default function Installation() {
  return (
    <>
      <PageBanner img={IMG.installers} eyebrow="Installation" title="How a solar system is actually built." lead="Every step is done on site by our own crew. Here is what happens, and what it looks like." />
      <section className="sec tight"><div className="wrap">{STEPS.map((s, i) => {
        const media = listMedia(`process/${s.slug}`); const fb = STEP_FALLBACK[s.slug];
        return (
          <div key={s.slug} className="irow" data-reveal>
            <div><span className="n">Step {i + 1}</span><h2>{s.title}</h2><p>{DESC[s.slug]}</p></div>
            {media.length ? <Gallery items={media} alt={s.title} /> : fb ? <div className="media" data-img style={{ aspectRatio: '16/10' }}><Image src={fb} alt={s.title} fill sizes="(max-width:900px) 100vw, 60vw" /></div> : <div className="empty">Site photos for this step are coming soon.</div>}
          </div>);
      })}</div></section>
      <section className="sec"><div className="wrap"><div className="qb"><div className="bgm"><Image src={IMG.sunset} alt="" fill sizes="100vw" /></div><div><h2>Want this on your roof?</h2><p>Share your bill and we will come back with a size and a quote.</p></div><QuoteForm /></div></div></section>
    </>
  );
}
