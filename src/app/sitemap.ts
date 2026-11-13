import type { MetadataRoute } from 'next';
import { SVCS } from '@/lib/services-data';
import { SITE, PROJECTS } from '@/lib/data';
export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/services', '/projects', '/installation', '/about', '/faq', '/contact', ...SVCS.map((s) => '/services/' + s.slug), ...PROJECTS.map((p) => '/projects/' + p.slug)].map((p) => ({ url: SITE.url + p, lastModified: new Date(), priority: p === '' ? 1 : 0.7 }));
}
