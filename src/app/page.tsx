import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import Hero from '@/components/Hero';
import CBtn from '@/components/CBtn';
import Media from '@/components/Media';
import TLink from '@/components/TLink';
import QuoteForm from '@/components/QuoteForm';
import PowerFlow from '@/components/PowerFlow';
import Green from '@/components/Green';
import Co2Estimator from '@/components/Co2Estimator';
import { wa } from '@/components/Chrome';
import { Check, Home as HomeIc, Building, Drop, Pump, Bolt, Arrow } from '@/components/Icons';
import { PROJECTS, FAQS, BRANDS, SITE } from '@/lib/data';
import { SVCS } from '@/lib/services-data';
import { IMG, PROJECT_FALLBACK } from '@/lib/images';
import { listMedia, splitMedia } from '@/lib/media';
import JsonLd, { faqLd } from '@/components/JsonLd';

const SOL = [
  { t: 'Residential rooftop', d: 'Net-metered home systems with PM Surya Ghar support.', img: IMG.house, ic: <HomeIc /> },
  { t: 'Commercial and industrial', d: 'From shops and schools to 300 kW campuses.', img: IMG.school, ic: <Building /> },
  { t: 'Solar water heaters', d: 'Waaree ETC heaters for homes, hostels and hospitals.', img: IMG.heaters, ic: <Drop /> },
  { t: 'Solar pumps', d: 'Irrigation pumps with PM-KUSUM subsidy support.', img: IMG.pump, ic: <Pump /> },
  { t: 'Hybrid solar systems', d: 'Solar with battery backup and grid support.', img: IMG.inverterWall, ic: <Bolt /> },
];

export default function Home() {
  const projects = PROJECTS.map((p) => ({ ...p, img: splitMedia(listMedia(`projects/${p.slug}`)).images[0]?.src ?? PROJECT_FALLBACK[p.slug] }));
  const upneda = fs.existsSync(path.join(process.cwd(), 'public', 'img', 'upneda-building.webp')) ? '/img/upneda-building.webp' : '/docs/upneda-empanelment.jpeg';
  return (
    <>
      <Hero />
      <section className="sec"><div className="wrap">
        <div className="sec-h"><p className="eyebrow">Why SS Indo Solar</p><h2 className="h2" data-split>Solar that is designed, built and looked after by one team.</h2>
          <ul className="chips" style={{ justifyContent: 'center' }}><li>Ex-Waaree authorised franchise</li><li>F-Class customer of Waaree Energies Limited</li><li>Key regions: Uttar Pradesh and Delhi NCR</li></ul></div>
        <div className="g3" data-stagger>
          <TLink href="/services/epc" className="pc"><Image src={IMG.installers} alt="" fill sizes="(max-width:900px) 100vw, 33vw" /><span className="no">01</span>
            <div><h3>Turnkey EPC</h3><p>One team from the first client meeting to design, installation and commissioning. One contract, one bill.</p></div></TLink>
          <a href={SITE.upnedaUrl} target="_blank" rel="noopener noreferrer" className="pc" aria-label="Verify SS Indo Solar on the UPNEDA website"><Image src={upneda} alt="" fill sizes="(max-width:900px) 100vw, 33vw" style={{ objectPosition: 'top' }} /><span className="no">02</span>
            <div><h3>UPNEDA registered</h3><p>Empanelled vendor for PM Surya Ghar residential rooftop solar in Uttar Pradesh. Check it yourself on UPNEDA.</p><span className="vlink">Verify on UPNEDA <Arrow /></span></div></a>
          <TLink href="/about#innovation" className="pc"><Image src={IMG.carport} alt="" fill sizes="(max-width:900px) 100vw, 33vw" /><span className="no">03</span>
            <div><h3>EV charging</h3><p>Our patented solar-powered EV charging station design, Indian Patent 429440.</p></div></TLink>
        </div>
      </div></section>

      <section className="sec tight"><div className="wrap"><div className="split">
        <div className="card" data-reveal>
          <p className="eyebrow">Energy savings, made easy</p>
          <h2 className="h2" style={{ fontSize: 'clamp(26px,3.4vw,44px)' }}>A system sized to your bill, not to a brochure.</h2>
          <p className="lead" style={{ marginTop: 16 }}>Tell us what you pay today. We design for your roof, your load and your net-metering policy, then handle everything after.</p>
          <ul className="ticks"><li><Check />Site survey, layout and blueprint</li><li><Check />Tier-I modules and inverters</li><li><Check />Net-metering liasoning handled</li></ul>
          <div><CBtn href="/services">Our services</CBtn></div>
        </div>
        <div className="media" data-img><Image src={IMG.house} alt="Rooftop solar on a home" fill sizes="(max-width:900px) 100vw, 55vw" />
          <div className="chip glass" style={{ right: 18, bottom: 18 }}><b>300<small style={{ fontSize: 14 }}> kW</small></b><small>our largest<br />projects</small></div>
          <div className="chip glass" style={{ left: 18, top: 18 }}><b>9 - 5</b><small>office hours<br />support</small></div></div>
      </div></div></section>

      <section className="sec"><div className="wrap">
        <div className="sec-h"><p className="eyebrow">What we do</p><h2 className="h2" data-split>Five services that cover the whole journey.</h2></div>
        <div className="g5" data-stagger>{SVCS.map((v, i) => (
          <TLink key={v.slug} href={`/services/${v.slug}`} className="card svc"><span className="no2">0{i + 1}</span><div><h3>{v.short}</h3><p>{v.blurb}</p></div><span className="icn"><Arrow /></span></TLink>))}</div>
      </div></section>

      <section className="sec tight"><div className="wrap">
        <div className="sec-h"><p className="eyebrow">Solutions</p><h2 className="h2" data-split>Solar for every roof and every field.</h2></div>
        <div className="g5" data-stagger>{SOL.map((s) => (
          <TLink key={s.t} href="/services" className="pc tallpc"><Image src={s.img} alt="" fill sizes="(max-width:900px) 100vw, 20vw" /><div><span className="icn">{s.ic}</span><h3>{s.t}</h3><p>{s.d}</p></div></TLink>))}</div>
      </div></section>

      <div className="wrap"><PowerFlow /></div>

      <section className="sec" id="green"><div className="wrap">
        <div className="sec-h"><p className="eyebrow">Renewable energy · Green energy</p><h2 className="h2" data-split>Every unit we install is a unit of coal not burned.</h2><p className="lead">Our goal is simple: reduce CO2 emissions, one roof, one school and one factory at a time.</p></div>
        <div className="g2 co2g"><Green /><Co2Estimator /></div>
      </div></section>

      <section className="sec tight"><div className="wrap">
        <div className="mrow"><div><p className="eyebrow">Projects</p><h2 className="h2" data-split>Where we have delivered.</h2></div><CBtn href="/projects" v="ghost">All projects</CBtn></div>
        <div className="g3" data-stagger>{projects.map((p) => (
          <TLink key={p.slug} href={`/projects/${p.slug}`} className="pj"><div className="media"><Image src={p.img} alt={p.title} fill sizes="(max-width:900px) 100vw, 33vw" /><span className="tag sun">{p.capacity}</span></div>
            <div className="meta"><div><h3>{p.title}</h3><p>{p.kind}, {p.place}</p></div></div></TLink>))}</div>
      </div></section>

      <section className="sec tight"><div className="wrap"><div className="stats" data-reveal>
        <div><b><span data-count="500">0</span><em>+</em></b><span>solar systems commissioned</span></div>
        <div><b><span data-count="300">0</span><em> kW</em></b><span>our largest single projects</span></div>
        <div><b>9<em>-</em>5</b><span>office hours support after commissioning</span></div>
        <div><b><span data-count="5">0</span></b><span>branch and office locations in UP</span></div>
      </div></div></section>

      <div className="mq" aria-hidden="true">
        <div>
          {[...BRANDS, ...BRANDS].map((b, i) => (
            <div key={i} className="mq-item">
              <Image 
                src={b.logo} 
                alt={b.name} 
                width={150} 
                height={50} 
              />
            </div>
          ))}
        </div>
      </div>

      <section className="sec"><div className="wrap"><div className="qb" data-reveal>
        <div className="bgm"><Image src={IMG.sunset} alt="" fill sizes="100vw" /></div>
        <div><p className="eyebrow" style={{ color: 'rgba(255,255,255,.8)' }}>Free quote</p><h2>Tell us your bill. We will size the system.</h2><p>Share a few details and we will reply on WhatsApp with a recommended system size and a quote.</p></div>
        <QuoteForm />
      </div></div></section>

      <section className="sec tight"><div className="wrap"><div className="fq">
        <div><p className="eyebrow">FAQ</p><h2 className="h2" data-split>Questions we hear most.</h2><p className="lead" style={{ margin: '16px 0 28px' }}>Cannot find yours? Message us and a person will reply.</p><CBtn external href={wa('Hello, I have a question about solar.')}>Ask on WhatsApp</CBtn></div>
        <div className="acc" data-stagger>{FAQS.slice(0, 5).map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</div>
      </div></div></section>
      <JsonLd data={faqLd(FAQS.slice(0, 5))} />
    </>
  );
}