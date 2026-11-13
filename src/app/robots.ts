import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/data';

// Search engines and AI answer engines are welcome (SEO, AEO, GEO). Only the API is off limits.
const AI = ['GPTBot', 'ChatGPT-User', 'OAI-SearchBot', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'CCBot'];
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/products'] }, ...AI.map((userAgent) => ({ userAgent, allow: '/', disallow: ['/api/'] }))], sitemap: `${SITE.url}/sitemap.xml`, host: SITE.url };
}
