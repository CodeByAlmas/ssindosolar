import type { MetadataRoute } from 'next';
import { SITE, PROJECTS } from '@/lib/data';
export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/services', '/projects', '/installation', '/products', '/about', '/faq', '/contact', ...PROJECTS.map((p) => '/projects/' + p.slug)].map((p) => ({ url: SITE.url + p, lastModified: new Date(), priority: p === '' ? 1 : 0.7 }));
}
