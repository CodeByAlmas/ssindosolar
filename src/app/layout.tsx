import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { SITE, FAQS } from '@/lib/data';
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
  keywords: ['solar EPC Kanpur', 'rooftop solar Kanpur', 'PM Surya Ghar Kanpur', 'solar panel Kanpur', 'solar distributor Kanpur', 'Waaree solar water heater Kanpur', 'solar inverter Kanpur', 'solar battery', 'solar street light', 'SS Indo Solar'],
  alternates: { canonical: '/' },
  openGraph: { type: 'website', siteName: SITE.name, locale: 'en_IN', title: 'SS Indo Solar, Kanpur', description: SITE.description, url: SITE.url },
  twitter: { card: 'summary_large_image', title: 'SS Indo Solar, Kanpur', description: SITE.description },
  robots: { index: true, follow: true },
};

const jsonLd = [
  {
    '@context': 'https://schema.org', '@type': ['LocalBusiness', 'Store'], '@id': `${SITE.url}/#org`,
    name: SITE.name, url: SITE.url, description: SITE.description, foundingDate: String(SITE.founded),
    founder: { '@type': 'Person', name: SITE.owner }, vatID: SITE.gst, areaServed: 'India',
    address: { '@type': 'PostalAddress', streetAddress: 'MIG 86, K.D.A. Colony, Jajmau', addressLocality: SITE.city, addressRegion: SITE.state, postalCode: '208010', addressCountry: 'IN' },
    telephone: SITE.phones[0], email: SITE.emails[0], logo: `${SITE.url}/logo.png`,
    sameAs: [SITE.indiamart, SITE.instagram], paymentAccepted: 'Cash, Cheque, Demand Draft',
    makesOffer: ['Solar panels', 'Solar inverters', 'Solar batteries', 'Solar water heaters', 'Solar street lights'].map((n) => ({ '@type': 'Offer', itemOffered: { '@type': 'Product', name: n } })),
  },
  { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${pj.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "(function(){try{var d=document.documentElement;if(sessionStorage.getItem('ssis')==='1')d.classList.add('pl-skip');if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('intro');setTimeout(function(){d.classList.remove('intro','intro-play')},9000)}}catch(e){}})()" }} />
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      </body>
    </html>
  );
}
