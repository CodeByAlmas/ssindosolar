import Image from 'next/image';
import Hero from '@/components/Hero';
import CBtn from '@/components/CBtn';
import Media from '@/components/Media';
import TLink from '@/components/TLink';
import QuoteForm from '@/components/QuoteForm';
import { wa } from '@/components/Chrome';
import { Check, Sun, Home as HomeIc, Bolt, Shield, Building, Drop, Pump } from '@/components/Icons';
import { PROJECTS, FAQS, BRANDS, SITE } from '@/lib/data';
import { IMG, PROJECT_FALLBACK } from '@/lib/images';
import { listMedia } from '@/lib/media';

const SOL = [
  { t: 'Residential rooftop', d: 'Net-metered home systems with PM Surya Ghar support.', img: IMG.house, ic: <HomeIc /> },
  { t: 'Commercial and industrial', d: 'From shops and schools to 300 kW campuses.', img: IMG.school, ic: <Building /> },
  { t: 'Solar water heaters', d: 'Waaree ETC heaters for homes, hostels and hospitals.', img: IMG.heaters, ic: <Drop /> },
  { t: 'Solar pumps', d: 'Irrigation pumps with PM-KUSUM subsidy support.', img: IMG.pump, ic: <Pump /> },
];

const STEPS = [
  ['Survey and design', 'We study your bill, roof and weather data and share a 2D/3D layout.'],
  ['Equipment', 'Tier-I modules, inverters and BOS at competitive prices with warranty.'],
  ['Install and commission', 'Mounting, cabling, earthing and grid connection as per State ERC rules.'],
  ['Care for years', 'Monitoring, module cleaning and 24x7 service support.'],
];

// Rich SEO, GEO & AEO Schema for Google Search and AI Bots
const localSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'SolarEnergyService'],
  name: 'SS INDO SOLAR',
  alternateName: 'SS Indo Solar Kanpur',
  url: 'https://www.ssindosolar.com',
  telephone: '+919451875234',
  taxID: '09ADSFS9952N1ZQ',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'M.I.G. - 86, K.D.A. Colony, Jajmau',
    addressLocality: 'Kanpur',
    addressRegion: 'Uttar Pradesh',
    postalCode: '208010',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 26.4312,
    longitude: 80.4072,
  },
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    name: 'UPNEDA Empanelled Vendor (PM Surya Ghar)',
    identifier: 'CNB2506102720',
  },
};

export default function Home() {
  const projects = PROJECTS.map((p) => ({
    ...p,
    img: listMedia(`projects/${p.slug}`).find((m) => m.type === 'image')?.src ?? PROJECT_FALLBACK[p.slug],
  }));

  return (
    <>
      {/* Search & Answer Engine Optimization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }}
      />

      <Hero />

      {/* Why SS Indo Solar Section: Single-line heading with smooth scroll reveal */}
      <section className="sec">
        <div className="wrap">
          <div
            className="sec-h"
            style={{
              maxWidth: '1160px',
              width: '100%',
              margin: '0 auto clamp(28px, 4vw, 52px)',
              padding: '0 8px',
            }}
          >
            <p className="eyebrow">Why SS Indo Solar</p>
            <h2
              className="h2"
              data-split
              style={{
                fontSize: 'clamp(20px, 2.5vw, 42px)',
                lineHeight: 1.15,
                letterSpacing: '-0.035em',
                whiteSpace: 'nowrap',
                textAlign: 'center',
                margin: '0 auto',
                width: '100%',
                maxWidth: '100%',
              }}
            >
              Solar that is designed, built and looked after by one team.
            </h2>
          </div>

          <div className="g3 w1" data-stagger>
            {/* Card 1: Visual Card */}
            <div className="pc">
              <Image
                src={IMG.worker}
                alt="Technician fixing a solar module"
                fill
                priority
                sizes="(max-width:900px) 100vw, 40vw"
              />
              <div className="chip glass" style={{ top: 18, left: 18 }}>
                <b>500+</b>
                <small>
                  systems
                  <br />
                  commissioned
                </small>
              </div>
              <div>
                <span className="icn">
                  <Sun />
                </span>
                <h3>Made for Indian rooftops</h3>
                <p>Our own crews install every system, from civil work to commissioning.</p>
              </div>
            </div>

            {/* Card 2: UPNEDA Empanelled */}
            <div className="card tall">
              <span className="icn">
                <Shield />
              </span>
              <div>
                <h3>UPNEDA empanelled</h3>
                <p>Approved vendor for residential rooftop solar under PM Surya Ghar in Uttar Pradesh, approved on 10-06-2025[cite: 2].</p>
              </div>
            </div>

            {/* Card 3: One Contract, One Bill */}
            <div className="card tall">
              <span className="icn">
                <Bolt />
              </span>
              <div>
                <h3>One contract, one bill</h3>
                <p>Survey, equipment, installation, net-metering paperwork and maintenance, all from us[cite: 6, 9, 11].</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Untouched Subsequent Sections */}
      <section className="sec tight"><div className="wrap"><div className="split">
        <div className="card" data-reveal>
          <p className="eyebrow">Energy savings, made easy</p>
          <h2 className="h2" style={{ fontSize: 'clamp(26px,3.4vw,44px)' }}>A system sized to your bill, not to a brochure.</h2>
          <p className="lead" style={{ marginTop: 16 }}>Tell us what you pay today. We design for your roof, your load and your net-metering policy, then handle everything after.</p>
          <ul className="ticks"><li><Check />Site survey and 2D/3D design</li><li><Check />Tier-I modules and inverters</li><li><Check />Net-metering paperwork handled</li></ul>
          <div><CBtn href="/services">Our services</CBtn></div>
        </div>
        <div className="media" data-img><Image src={IMG.house} alt="Rooftop solar on a home" fill sizes="(max-width:900px) 100vw, 55vw" />
          <div className="chip glass" style={{ right: 18, bottom: 18 }}><b>300<small style={{ fontSize: 14 }}> kW</small></b><small>our largest<br />projects</small></div>
          <div className="chip glass" style={{ left: 18, top: 18 }}><b>24x7</b><small>service<br />support</small></div></div>
      </div></div></section>

      <section className="sec"><div className="wrap">
        <div className="sec-h"><p className="eyebrow">Solutions</p><h2 className="h2" data-split>Solar for every roof and every field.</h2></div>
        <div className="g4" data-stagger>{SOL.map((s) => (
          <TLink key={s.t} href="/services" className="pc"><Image src={s.img} alt="" fill sizes="(max-width:900px) 100vw, 25vw" /><div><span className="icn">{s.ic}</span><h3>{s.t}</h3><p>{s.d}</p></div></TLink>))}</div>
      </div></section>

      <section className="sec tight"><div className="wrap">
        <div className="sec-h"><p className="eyebrow">How it works</p><h2 className="h2" data-split>From your bill to your first unit, in four steps.</h2></div>
        <div className="g4" data-stagger>{STEPS.map(([t, d], i) => <div key={t} className="card step"><span className="n">0{i + 1}</span><h3>{t}</h3><p>{d}</p></div>)}</div>
        <Media src={IMG.carportWide} ratio="21/7" cls="strip" sizes="100vw" alt="Solar carport over a parking lot" />
      </div></section>

      <section className="sec"><div className="wrap">
        <div className="mrow"><div><p className="eyebrow">Projects</p><h2 className="h2" data-split>Where we have delivered.</h2></div><CBtn href="/projects" v="ghost">All projects</CBtn></div>
        <div className="g3" data-stagger>{projects.map((p) => (
          <TLink key={p.slug} href={`/projects/${p.slug}`} className="pj"><div className="media"><Image src={p.img} alt={p.title} fill sizes="(max-width:900px) 100vw, 33vw" /><span className="tag sun">{p.capacity}</span></div>
            <div className="meta"><div><h3>{p.title}</h3><p>{p.kind}, {p.place}</p></div></div></TLink>))}</div>
      </div></section>

      <section className="sec tight"><div className="wrap"><div className="stats" data-reveal>
        <div><b><span data-count="500">0</span><em>+</em></b><span>solar systems commissioned</span></div>
        <div><b><span data-count="300">0</span><em> kW</em></b><span>our largest single projects</span></div>
        <div><b>24<em>x</em>7</b><span>service support after commissioning</span></div>
        <div><b><span data-count="8">0</span></b><span>leading brands we supply and install</span></div>
      </div></div></section>

      <div className="mq" aria-hidden="true"><div>{[...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS].map((b, i) => <span key={i}>{b}</span>)}</div></div>

      <section className="sec"><div className="wrap"><div className="qb" data-reveal>
        <div className="bgm"><Image src={IMG.sunset} alt="" fill sizes="100vw" /></div>
        <div><p className="eyebrow" style={{ color: 'rgba(255,255,255,.8)' }}>Free quote</p><h2>Tell us your bill. We will size the system.</h2><p>Share a few details and we will reply on WhatsApp with a recommended system size and a quote.</p></div>
        <QuoteForm />
      </div></div></section>

      <section className="sec tight"><div className="wrap"><div className="fq">
        <div><p className="eyebrow">FAQ</p><h2 className="h2" data-split>Questions we hear most.</h2><p className="lead" style={{ margin: '16px 0 28px' }}>Cannot find yours? Message us and a person will reply.</p><CBtn external href={wa('Hello, I have a question about solar.')}>Ask on WhatsApp</CBtn></div>
        <div className="acc" data-stagger>{FAQS.slice(0, 5).map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</div>
      </div></div></section>
    </>
  );
}