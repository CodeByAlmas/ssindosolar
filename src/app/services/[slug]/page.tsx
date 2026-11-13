import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import PageBanner from '@/components/PageBanner';
import CBtn from '@/components/CBtn';
import TLink from '@/components/TLink';
import QuoteForm from '@/components/QuoteForm';
import JsonLd, { crumbs, faqLd } from '@/components/JsonLd';
import { Check, Arrow } from '@/components/Icons';
import { SVCS, SVC_EXTRA } from '@/lib/services-data';
import { SITE } from '@/lib/data';
import { IMG } from '@/lib/images';

export const dynamicParams = false;
export function generateStaticParams() { return SVCS.map((s) => ({ slug: s.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = SVCS.find((x) => x.slug === slug);
  return s ? { title: s.title, description: `${s.lead} SS Indo Solar, Kanpur.`, alternates: { canonical: `/services/${s.slug}` } } : {};
}

export default async function Service({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = SVCS.find((x) => x.slug === slug);
  if (!s) notFound();
  const ex = SVC_EXTRA[s.slug], faqs = ex?.faq.map(([q, a]) => ({ q, a })) ?? [];
  const others = SVCS.filter((x) => x.slug !== s.slug);
  const svcLd = { '@context': 'https://schema.org', '@type': 'Service', name: s.title, serviceType: s.short, description: s.lead, provider: { '@type': 'LocalBusiness', name: SITE.name, url: SITE.url }, areaServed: ['Uttar Pradesh', 'Delhi NCR'], url: `${SITE.url}/services/${s.slug}` };
  return (
    <>
      <PageBanner img={s.img} eyebrow={s.eyebrow} title={s.title} lead={s.lead} />
      <section className="sec"><div className="wrap"><div className="split">
        <div className="card" data-reveal><p className="eyebrow">What is included</p><ul className="ticks" style={{ marginTop: 6 }}>{s.includes.map((i) => <li key={i}><Check />{i}</li>)}</ul>
          <div><CBtn external href={`https://wa.me/917906786485?text=${encodeURIComponent(`Hello, I would like to know about ${s.short}.`)}`}>Talk to us about {s.short}</CBtn></div></div>
        <div className="media" data-img style={{ minHeight: 360 }}><Image src={s.img} alt={s.short} fill sizes="(max-width:900px) 100vw, 55vw" /></div>
      </div></div></section>
      <section className="sec tight"><div className="wrap">
        <div className="sec-h"><p className="eyebrow">How it works</p><h2 className="h2" data-split>Four steps, no surprises.</h2></div>
        <div className="g4" data-stagger>{s.steps.map(([t, d], i) => <div key={t} className="card step"><span className="n">0{i + 1}</span><h3>{t}</h3><p>{d}</p></div>)}</div>
      </div></section>
      {ex?.survey && <>
        <section className="sec tight" id="site-survey" style={{ scrollMarginTop: 90 }}><div className="wrap">
          <div className="sec-h"><p className="eyebrow">Our site survey</p><h2 className="h2" data-split>Everything we check before we design.</h2><p className="lead">Each rooftop survey follows a written format, so nothing is missed and every project starts from the same standard.</p></div>
          <div className="g2" data-stagger>{ex.survey.check.map(([t, items]) => <div key={t} className="card"><h3 style={{ marginTop: 0 }}>{t}</h3><ul className="ticks">{items.map((i) => <li key={i}><Check />{i}</li>)}</ul></div>)}</div>
        </div></section>
        <section className="sec tight"><div className="wrap"><div className="g2">
          <div className="card" data-reveal><p className="eyebrow">How we survey</p><ul className="ticks">{ex.survey.how.map((i) => <li key={i}><Check />{i}</li>)}</ul></div>
          <div className="card" data-reveal><p className="eyebrow">Documents we ask you for</p><ul className="ticks">{ex.survey.docs.map((i) => <li key={i}><Check />{i}</li>)}</ul><p className="lead" style={{ fontSize: 14 }}>Do not worry if you do not have everything. We will tell you what is essential for your site.</p></div>
        </div></div></section>
      </>}
      {s.extra && <section className="sec tight"><div className="wrap"><div className="sec-h"><h2 className="h2" data-split>{s.extra.title}</h2></div>
        <div className="g3" data-stagger>{s.extra.items.map(([t, d]) => <div key={t} className="card tall"><span className="icn"><Check /></span><div><h3>{t}</h3><p>{d}</p></div></div>)}</div>
        {s.note && <p className="lead" style={{ margin: '24px auto 0', textAlign: 'center' }}>{s.note}</p>}</div></section>}
      {faqs.length > 0 && <section className="sec tight"><div className="wrap"><div className="fq"><div><p className="eyebrow">Questions</p><h2 className="h2" data-split>{s.short}, answered.</h2></div><div className="acc" data-stagger>{faqs.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</div></div></div></section>}
      <section className="sec tight"><div className="wrap"><div className="mrow"><h2 className="h2" style={{ fontSize: 'clamp(24px,3vw,38px)' }}>More services</h2><CBtn href="/services" v="ghost">All services</CBtn></div>
        <div className="g4" data-stagger>{others.map((o) => <TLink key={o.slug} href={`/services/${o.slug}`} className="card svc"><div><h3>{o.short}</h3><p>{o.blurb}</p></div><span className="icn"><Arrow /></span></TLink>)}</div></div></section>
      <section className="sec"><div className="wrap"><div className="qb"><div className="bgm"><Image src={IMG.sunset} alt="" fill sizes="100vw" /></div><div><h2>Let us plan yours.</h2><p>Share your monthly bill and we will reply on WhatsApp.</p></div><QuoteForm /></div></div></section>
      <JsonLd data={svcLd} /><JsonLd data={crumbs([['Home', '/'], ['Services', '/services'], [s.short, `/services/${s.slug}`]])} />{faqs.length > 0 && <JsonLd data={faqLd(faqs)} />}
    </>
  );
}
