import type { Metadata } from 'next';
import Image from 'next/image';
import PageBanner from '@/components/PageBanner';
import Gallery from '@/components/Gallery';
import CBtn from '@/components/CBtn';
import { SITE, BRANDS } from '@/lib/data';
import { IMG } from '@/lib/images';
import { listMedia } from '@/lib/media';

export const metadata: Metadata = { title: 'About Us', description: `About ${SITE.name}: solar EPC company and wholesale distributor in Kanpur, led by ${SITE.owner}.`, alternates: { canonical: '/about' } };

export default function About() {
  return (
    <>
      <PageBanner img={IMG.installers} eyebrow="About us" title="A Kanpur solar company that stays after the install." lead="Engineering, procurement and construction under one roof." />
      <section className="sec"><div className="wrap"><div className="g2">
        <div className="card prose" data-reveal>
          <p className="eyebrow">Our story</p>
          <p>SS Indo Solar is a Kanpur-based solar EPC (engineering, procurement and construction) company. We build grid-connected rooftop, ground-mounted and off-grid solar plants for residential, institutional, industrial and commercial clients.</p>
          <p>We are also wholesale distributors of solar modules, inverters, batteries and water heaters. The business is led by {SITE.owner} and every product is checked before it is supplied.</p>
        </div>
        <div className="card" data-reveal><p className="eyebrow">At a glance</p><dl className="facts">
          <dt>Owner</dt><dd>{SITE.owner}</dd><dt>Registered</dt><dd>{SITE.founded}</dd><dt>Business type</dt><dd>EPC, wholesaler and distributor</dd><dt>Office</dt><dd>{SITE.address}</dd><dt>GST</dt><dd>{SITE.gst}</dd><dt>Payment</dt><dd>Cash, Cheque, DD</dd><dt>Shipment</dt><dd>By road</dd></dl></div>
      </div></div></section>
      <section className="sec tight"><div className="wrap"><div className="split">
        <div className="card" data-reveal><p className="eyebrow">Approved vendor</p><h2 className="h2" style={{ fontSize: 'clamp(26px,3.4vw,44px)' }}>UPNEDA empanelment</h2>
          <p className="lead" style={{ margin: '16px 0 26px' }}>On 10-06-2025, UPNEDA empanelled SS Indo Solar as a vendor for residential rooftop solar installation in Uttar Pradesh under PM Surya Ghar / Grid Connected Solar Rooftop Programme Phase-II. Vendor code CNB2506102720.</p><div><CBtn href="/services">What we offer</CBtn></div></div>
        <div className="media" data-img style={{ minHeight: 420 }}><Image src="/docs/upneda-empanelment.jpeg" alt="UPNEDA empanelment letter for SS Indo Solar" fill sizes="(max-width:900px) 100vw, 55vw" style={{ objectFit: 'contain', background: '#fff' }} /></div>
      </div></div></section>
      <section className="sec"><div className="wrap"><div className="sec-h"><p className="eyebrow">Brands we work with</p><ul className="chips" style={{ justifyContent: 'center' }}>{BRANDS.map((b) => <li key={b}>{b}</li>)}</ul></div>
        <div className="mrow"><h2 className="h2" data-split style={{ fontSize: 'clamp(24px,3vw,38px)' }}>Our office</h2></div><Gallery items={listMedia('office')} alt="SS Indo Solar office, Jajmau, Kanpur" /></div></section>
    </>
  );
}
