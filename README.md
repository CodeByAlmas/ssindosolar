# SS Indo Solar website

Next.js 16 (App Router), React 19, TypeScript, GSAP + Lenis. No database, no login, no form backend: the smallest possible attack surface.

## Run
```
npm install
cp .env.example .env.local     # then fill the values
npm run dev                    # http://localhost:3000
npm run build && npm start     # production
```

## Things to configure (.env.local and src/lib/data.ts)
- `NEXT_PUBLIC_SITE_URL`: the real domain (used by sitemap, canonical URLs, JSON-LD, social image).
- `NEXT_PUBLIC_WHATSAPP`: WhatsApp number with country code, digits only.
- `ANTHROPIC_API_KEY`: for the "Ask Sol" assistant (server-only). Without it Sol just points to WhatsApp.
- `SITE.upnedaUrl` in `src/lib/data.ts`: the exact UPNEDA page where customers can verify the empanelment.
- Branch addresses and phone numbers: `LOCATIONS` in `src/lib/data.ts`.

## Content map
- Services: `src/lib/services-data.ts` (EPC, System Design incl. site survey, Liasoning, AMC, MCS, with FAQs).
- Projects, certificates, owner, FAQ, AI knowledge: `src/lib/data.ts`.
- Photos and videos: drop files in `public/gallery/...` (see `public/gallery/README.md`).
- Hero slides and fallback photos: `src/lib/images.ts`, files in `public/img`.
- Logo: `src/components/Logo.tsx` is the exact brand vector (FRIZON wordmark, Gotham tagline). Do not edit by hand.

## SEO, AEO, GEO
- Unique title, description and canonical on every page; one H1 per page; sitemap.xml, robots.txt, manifest, social image (`public/og.jpg`).
- JSON-LD: LocalBusiness/ProfessionalService + WebSite (site wide), Service + FAQPage + BreadcrumbList (each service), FAQPage (home, /faq), HowTo (installation), AboutPage + Person (about), ContactPage.
- Answer-engine friendly copy: short direct answers in FAQs, definitions ("What is liasoning?"), consistent name, address, phone everywhere.
- Generative engines: `/llms.txt` and `/llms-full.txt`; AI crawlers are explicitly allowed in robots.txt.
- After launch: add the site to Google Search Console and Bing Webmaster Tools, create and verify the Google Business Profile with the same name/address/phone, and submit the sitemap.

## Security
- Headers: CSP, HSTS, X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy, COOP/CORP (see `next.config.mjs`). CSP keeps `'unsafe-inline'` for scripts only because Next.js needs it for its own bootstrap scripts.
- `/api/chat`: POST only, same-origin check, JSON only, 6 KB body cap, input sanitising, per-IP and global rate limits, no secrets in the browser, prompt-injection rules in the system prompt. For many serverless instances replace the in-memory limiter with Redis/Upstash.
- No user-supplied HTML is ever rendered; JSON-LD escapes `<`; links to other sites use `rel="noopener noreferrer"`.
- Dependencies are pinned; `npm audit --omit=dev` reports 0 vulnerabilities at the time of delivery. Re-run it before each release.
- `/.well-known/security.txt` is included. Never commit `.env*` (already in .gitignore).
- Hosting: use HTTPS only, keep the platform and Node updated, and turn on the host's DDoS/WAF protection (Cloudflare or Vercel).
