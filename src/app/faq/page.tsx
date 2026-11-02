import type { Metadata } from 'next';
import PageBanner from '@/components/PageBanner';
import CBtn from '@/components/CBtn';
import { wa } from '@/components/Chrome';
import { FAQS } from '@/lib/data';
import { IMG } from '@/lib/images';

export const metadata: Metadata = { title: 'FAQ', description: 'Frequently asked questions about SS Indo Solar.', alternates: { canonical: '/faq' } };

export default function FAQ() {
  return (
    <>
      <PageBanner img={IMG.house} eyebrow="FAQ" title="Frequently asked questions." lead="Quick answers about solar, subsidy and how we work." />
      <section className="sec"><div className="wrap"><div className="fq">
        <div><p className="eyebrow">Still curious?</p><h2 className="h2" data-split>Ask a person.</h2><p className="lead" style={{ margin: '16px 0 28px' }}>Message us and we will reply on WhatsApp.</p><CBtn external href={wa('Hello, I have a question about solar.')}>Ask on WhatsApp</CBtn></div>
        <div className="acc" data-stagger>{FAQS.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</div>
      </div></div></section>
    </>
  );
}
