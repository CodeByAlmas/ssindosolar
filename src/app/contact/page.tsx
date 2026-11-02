import type { Metadata } from 'next';
import PageBanner from '@/components/PageBanner';
import QuoteForm from '@/components/QuoteForm';
import { Pin, Phone, Mail, Wa } from '@/components/Icons';
import { wa } from '@/components/Chrome';
import { SITE } from '@/lib/data';
import { IMG } from '@/lib/images';

export const metadata: Metadata = { title: 'Contact', description: 'Contact SS Indo Solar, Kanpur, by phone, email, WhatsApp or IndiaMART.', alternates: { canonical: '/contact' } };

export default function Contact() {
  return (
    <>
      <PageBanner img={IMG.carportWide} eyebrow="Contact" title="Let's talk about your roof." lead="WhatsApp is the fastest way to reach us." />
      <section className="sec"><div className="wrap"><div className="g2">
        <div className="info" data-stagger>
          <div className="card"><span className="icn"><Pin /></span><div><h3>Visit</h3><p>{SITE.address}</p></div></div>
          <div className="card"><span className="icn"><Phone /></span><div><h3>Call</h3>{SITE.phones.map((p) => <a key={p} href={`tel:${p.replace(/\s/g, '')}`}>{p}</a>)}</div></div>
          <div className="card"><span className="icn"><Mail /></span><div><h3>Email</h3>{SITE.emails.map((e) => <a key={e} href={`mailto:${e}`}>{e}</a>)}</div></div>
          <div className="card"><span className="icn"><Wa /></span><div><h3>Elsewhere</h3><a href={wa('Hello')} target="_blank" rel="noopener noreferrer">WhatsApp</a><a href={SITE.indiamart} target="_blank" rel="noopener noreferrer">IndiaMART profile</a><a href={SITE.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></div></div>
        </div>
        <div data-reveal><h2 className="h2" style={{ fontSize: 'clamp(26px,3.4vw,44px)', marginBottom: 20 }}>Get a quote on WhatsApp</h2><QuoteForm dark /></div>
      </div></div></section>
    </>
  );
}
