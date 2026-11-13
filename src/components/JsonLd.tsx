import { SITE } from '@/lib/data';

const u = (p: string) => (p.startsWith('http') ? p : SITE.url.replace(/\/$/, '') + p);
export const crumbs = (list: [string, string][]) => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: list.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: u(path) })) });
export const faqLd = (items: { q: string; a: string }[]) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) });

/** Server-rendered JSON-LD. "<" and line separators are escaped so the data can never break out of the script tag. */
export default function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
