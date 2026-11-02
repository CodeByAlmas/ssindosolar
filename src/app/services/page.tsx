import type { Metadata } from 'next';
import PageBanner from '@/components/PageBanner';
import CBtn from '@/components/CBtn';
import Media from '@/components/Media';
import QuoteForm from '@/components/QuoteForm';
import Image from 'next/image';
import { Check, Sun, Bolt, Drop, Pump, Building, Wrench } from '@/components/Icons';
import { SERVICES, CLIENTS, BRANDS } from '@/lib/data';
import { IMG } from '@/lib/images';

export const metadata: Metadata = { title: 'Solar Services', description: 'Rooftop on-grid, off-grid, solar thermal, solar pump and C&I solar. Design to O&M under one contract, Kanpur.', alternates: { canonical: '/services' } };
const IC = [<Sun key="a" />, <Bolt key="b" />, <Drop key="c" />, <Pump key="d" />, <Building key="e" />, <Wrench key="f" />];
const FLOW = [
  ['System design and site survey', 'We study your bill, net-metering policy, roof viability and weather data, then fix the best structure and share a 2D/3D model.'],
  ['Equipment procurement', 'Modules, inverters and BOS from Tier-I, bankable manufacturers at competitive prices with warranty.'],
  ['Installation and commissioning', 'Mounting, grid connectivity and paperwork as per State ERC regulations. One contract, one bill.'],
  ['Operation and maintenance', 'Monitoring, mechanized module cleaning and 24x7 service support.'],
];

export default function Services() {
  return (
    <>
      <PageBanner img={IMG.pergola} eyebrow="Services" title="From design to maintenance, under one contract." lead="Grid-tied, off-grid, thermal and pump systems for homes, businesses and farms." />
      <section className="sec"><div className="wrap"><div className="g3" data-stagger>{SERVICES.map((s, i) => <div key={s.title} className="card tall"><span className="icn">{IC[i]}</span><div><h3>{s.title}</h3><p>{s.text}</p></div></div>)}</div></div></section>
      <section className="sec tight"><div className="wrap">
        <div className="sec-h"><p className="eyebrow">Our process</p><h2 className="h2" data-split>Four steps, one team.</h2></div>
        <div className="g4" data-stagger>{FLOW.map(([t, d], i) => <div key={t} className="card step"><span className="n">0{i + 1}</span><h3>{t}</h3><p>{d}</p></div>)}</div>
      </div></section>
      <section className="sec"><div className="wrap"><div className="split">
        <div className="card" data-reveal><p className="eyebrow">Finance and subsidy</p><h2 className="h2" style={{ fontSize: 'clamp(26px,3.4vw,44px)' }}>Help with the paperwork and the money.</h2>
          <ul className="ticks"><li><Check />PM Surya Ghar for homes, as a UPNEDA-empanelled vendor</li><li><Check />PM-KUSUM guidance for farmers and rural clients</li><li><Check />MSME, NBFC, SIDBI and bank finance assistance</li><li><Check />80% accelerated depreciation on commercial rooftop systems</li></ul>
          <div><CBtn external href="https://wa.me/917906786485?text=Hello%2C%20I%20would%20like%20to%20know%20about%20subsidy%20and%20finance.">Ask about subsidy</CBtn></div></div>
        <Media src={IMG.house} alt="Residential rooftop solar" ratio="auto" style={{ minHeight: 340 }} />
      </div></div></section>
      <section className="sec tight"><div className="wrap"><div className="g2">
        <div className="card"><p className="eyebrow">Who we work for</p><ul className="chips" style={{ margin: 0 }}>{CLIENTS.map((c) => <li key={c} style={{ background: '#fff' }}>{c}</li>)}</ul></div>
        <div className="card"><p className="eyebrow">Brands</p><ul className="chips" style={{ margin: 0 }}>{BRANDS.map((c) => <li key={c} style={{ background: '#fff' }}>{c}</li>)}</ul></div>
      </div></div></section>
      <section className="sec"><div className="wrap"><div className="qb"><div className="bgm"><Image src={IMG.field} alt="" fill sizes="100vw" /></div><div><h2>Send us your electricity bill.</h2><p>We will recommend a system size and share a quote on WhatsApp.</p></div><QuoteForm /></div></div></section>
    </>
  );
}
