import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Image from 'next/image';
import PageBanner from '@/components/PageBanner';
import Gallery from '@/components/Gallery';
import Certs from '@/components/Certs';
import Green from '@/components/Green';
import CBtn from '@/components/CBtn';
import QuoteForm from '@/components/QuoteForm';
import { Check } from '@/components/Icons';
import { SITE, BRANDS, OWNER, CERTS, LOCATIONS } from '@/lib/data';
import { IMG } from '@/lib/images';
import { listMedia } from '@/lib/media';
import JsonLd, { crumbs } from '@/components/JsonLd';

export const metadata: Metadata = { title: 'About Us', description: `About ${SITE.name}: solar EPC company (installation and services) in Kanpur, led by ${OWNER.name}. Key regions: ${SITE.regions}.`, alternates: { canonical: '/about' } };

export default function About() {
  const owner = fs.existsSync(path.join(process.cwd(), 'public', 'img', 'owner.webp'));
  return (
    <>
      <PageBanner img={IMG.installers} eyebrow="About us" title="A Kanpur solar company that stays after the install." lead="Engineering, procurement and construction under one roof." />

      <section className="sec"><div className="wrap"><div className="g2">
        <div className="card prose" data-reveal>
          <p className="eyebrow">The company</p>
          <p>SS Indo Solar is a Kanpur-based solar EPC (engineering, procurement and construction) company. We build grid-connected rooftop, ground-mounted, off-grid and hybrid solar plants for residential, institutional, industrial and commercial clients, and look after them for years.</p>
          <p>We are an ex-Waaree authorised franchise and an F-Class customer of Waaree Energies Limited, and an UPNEDA-empanelled vendor for PM Surya Ghar. Our crews do the civil work, the mounting, the cabling and the earthing themselves.</p>
          <ul className="chips"><li>Ex-Waaree authorised franchise</li><li>F-Class customer, Waaree Energies Limited</li><li>UPNEDA empanelled</li></ul>
        </div>
        <div className="card" data-reveal><p className="eyebrow">At a glance</p><dl className="facts">
          <dt>Owner</dt><dd>{OWNER.name}</dd><dt>Registered</dt><dd>{SITE.founded}</dd><dt>Business type</dt><dd>EPC (Installation &amp; Services)</dd>
          <dt>Head office</dt><dd>{SITE.address}</dd><dt>Key operating regions</dt><dd>{SITE.regions}</dd></dl></div>
      </div></div></section>

      <section className="sec tight"><div className="wrap">
        <div className="sec-h"><p className="eyebrow">Renewable energy · Green energy</p><h2 className="h2" data-split>Our goal: less carbon, more sunlight.</h2><p className="lead">Every system we install replaces grid power that is mostly made from coal. <a href="/#green" style={{ textDecoration: 'underline' }}>Estimate the CO2 your roof could avoid.</a></p></div>
        <Green compact />
      </div></section>

      <section className="sec"><div className="wrap"><div className="split owner">
        <div className="media" data-img>{owner ? <Image src="/img/owner.webp" alt={OWNER.name} fill sizes="(max-width:900px) 100vw, 55vw" /> : <div className="mono" aria-hidden="true">SK</div>}</div>
        <div className="card" data-reveal><p className="eyebrow">Meet the owner</p><h2 className="h2" style={{ fontSize: 'clamp(28px,3.6vw,46px)' }}>{OWNER.name}</h2><p className="lead" style={{ marginTop: 8 }}>{OWNER.role}</p>
          <ul className="ticks">{OWNER.points.map((p) => <li key={p}><Check />{p}</li>)}</ul><div><CBtn external href="https://wa.me/917906786485?text=Hello%2C%20I%20would%20like%20to%20speak%20to%20the%20owner.">Speak to the owner</CBtn></div></div>
      </div></div></section>

      <section className="sec tight" id="innovation" style={{ scrollMarginTop: 90 }}><div className="wrap">
        <div className="sec-h"><p className="eyebrow">Credentials and certifications</p><h2 className="h2" data-split>Approved, certified and patented.</h2><p className="lead">Including our co-patented solar-powered EV charging station design. Tap a card to read it in full.</p></div>
        <Certs items={CERTS} />
      </div></section>

      <section className="sec"><div className="wrap">
        <div className="sec-h"><p className="eyebrow">Offices, warehouse and branches</p><h2 className="h2" data-split>Close to where you are.</h2><p className="lead">Key operating regions: {SITE.regions}.</p></div>
        <div className="locs" data-stagger>{LOCATIONS.map((l) => { const m = listMedia(l.dir); return (
          <article key={l.slug} className="loc"><span className="tag sun" style={{ alignSelf: 'flex-start' }}>{l.kind}</span><h3>{l.title}</h3><p>{l.text}</p>
            {m.length ? <Gallery items={m} alt={l.title} /> : <div className="empty">Photos coming soon.</div>}</article>); })}</div>
      </div></section>

      <section className="sec tight"><div className="wrap"><div className="sec-h"><p className="eyebrow">Brands we work with</p><ul className="chips" style={{ justifyContent: 'center' }}>{BRANDS.map((b) => <li key={b}>{b}</li>)}</ul></div></div></section>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'AboutPage', name: 'About SS Indo Solar', url: `${SITE.url}/about`, mainEntity: { '@type': 'Person', name: OWNER.name, jobTitle: OWNER.role, worksFor: { '@type': 'LocalBusiness', name: SITE.name }, alumniOf: { '@type': 'CollegeOrUniversity', name: 'Aligarh Muslim University' }, hasCredential: [{ '@type': 'EducationalOccupationalCredential', name: 'Rooftop Solar Photovoltaic Entrepreneur, NSQF Level 6 (Skill India, QP SGJ/Q0104)' }, { '@type': 'EducationalOccupationalCredential', name: 'M.Tech, Electrical Engineering (Instrumentation and Control)' }] } }} /><JsonLd data={crumbs([['Home', '/'], ['About', '/about']])} />
      <section className="sec"><div className="wrap"><div className="qb"><div className="bgm"><Image src={IMG.sunset} alt="" fill sizes="100vw" /></div><div><h2>Let us look at your roof.</h2><p>Share your monthly bill and we will reply on WhatsApp.</p></div><QuoteForm /></div></div></section>
    </>
  );
}
