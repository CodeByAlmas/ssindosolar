import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { SITE, OWNER } from '@/lib/data';
import JsonLd from '@/components/JsonLd';
import Preloader from '@/components/Preloader';
import Transition from '@/components/Transition';
import Smooth from '@/components/Smooth';
import AskSol from '@/components/AskSol';
import { WhatsAppFab } from '@/components/Chrome';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Interactions from '@/components/Interactions';

const pj = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--f-pj', display: 'swap' });
const inter = Inter({ subsets: ['latin'], axes: ['opsz'], variable: '--f-inter', display: 'block' });

export const viewport: Viewport = { themeColor: '#ffffff', width: 'device-width', initialScale: 1 };
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: 'SS Indo Solar Kanpur | Solar EPC, Rooftop Solar, PM Surya Ghar Vendor', template: '%s | SS Indo Solar Kanpur' },
  description: SITE.description,
  keywords: ['solar EPC Kanpur', 'rooftop solar Kanpur', 'PM Surya Ghar Kanpur', 'solar net metering liasoning', 'solar AMC', 'solar module cleaning', 'solar installation Uttar Pradesh', 'SS Indo Solar'],
  alternates: { canonical: '/' },
  openGraph: { type: 'website', siteName: SITE.name, locale: 'en_IN', title: 'SS Indo Solar, Kanpur', description: SITE.description, url: SITE.url, images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'SS Indo Solar, solar EPC company in Kanpur' }] },
  twitter: { card: 'summary_large_image', title: 'SS Indo Solar, Kanpur', description: SITE.description, images: ['/og.jpg'] },
  other: { 'geo.region': 'IN-UP', 'geo.placename': 'Kanpur', 'format-detection': 'telephone=no' },
  robots: { index: true, follow: true },
};

const jsonLd = [
  {
    '@context': 'https://schema.org', '@type': ['LocalBusiness', 'ProfessionalService'], '@id': `${SITE.url}/#org`,
    name: SITE.name, alternateName: 'SS Indosolar', slogan: SITE.tagline, url: SITE.url, description: SITE.description, foundingDate: String(SITE.founded),
    logo: { '@type': 'ImageObject', url: `${SITE.url}/logo.png`, width: 1400, height: 263 }, image: `${SITE.url}/og.jpg`,
    founder: { '@type': 'Person', name: OWNER.name, jobTitle: OWNER.role }, vatID: SITE.gst,
    areaServed: [{ '@type': 'State', name: 'Uttar Pradesh' }, { '@type': 'AdministrativeArea', name: 'Delhi NCR' }, { '@type': 'City', name: 'Kanpur' }, { '@type': 'City', name: 'Kaimganj' }, { '@type': 'City', name: 'Farrukhabad' }, { '@type': 'City', name: 'Aligarh' }],
    address: { '@type': 'PostalAddress', streetAddress: 'MIG 86, K.D.A. Colony, Jajmau', addressLocality: SITE.city, addressRegion: SITE.state, postalCode: '208010', addressCountry: 'IN' },
    telephone: SITE.phones, email: SITE.emails[0], contactPoint: [{ '@type': 'ContactPoint', contactType: 'sales', telephone: SITE.phones[0], email: SITE.emails[0], areaServed: 'IN', availableLanguage: ['English', 'Hindi'] }],
    sameAs: [SITE.indiamart, SITE.instagram],
    knowsAbout: ['Solar EPC', 'Rooftop solar', 'On-grid solar', 'Off-grid solar', 'Hybrid solar', 'Net metering', 'Solar water heaters', 'Solar pumps', 'PM Surya Ghar', 'PM-KUSUM', 'Solar EV charging'],
    hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Solar services', itemListElement: ['Turnkey solar EPC', 'Solar system design and site survey', 'Net metering liasoning', 'Annual maintenance contract (AMC)', 'Module cleaning system (MCS)'].map((n) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: n } })) },
  },
  { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${SITE.url}/#site`, url: SITE.url, name: SITE.name, inLanguage: 'en-IN', publisher: { '@id': `${SITE.url}/#org` } },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${pj.variable}`} suppressHydrationWarning>
      <head>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<style>.pl4 { display: none !important; }</style>`,
          }}
        />
      </head>
      <body>
        <Interactions />
        <a className="skip" href="#main">Skip to content</a>
        <Preloader />
        <Transition>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </Transition>
        <WhatsAppFab />
        <AskSol />
        <Smooth />
        <JsonLd data={jsonLd} />
      </body>
    </html>
  );
}