import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/data';
export default function robots(): MetadataRoute.Robots {
  // AI crawlers allowed on purpose: GEO/AEO
  return { rules: [{ userAgent: '*', allow: '/', disallow: '/api/' }], sitemap: `${SITE.url}/sitemap.xml` };
}
