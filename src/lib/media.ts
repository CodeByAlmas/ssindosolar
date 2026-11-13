import fs from 'node:fs';
import path from 'node:path';

export type Media = { src: string; type: 'image' | 'video'; name: string; title: string };
const IMG = /\.(jpe?g|png|webp|avif)$/i, VID = /\.(mp4|webm|mov)$/i, SUB = new Set(['photos', 'images', 'videos']);
const pretty = (f: string) => f.replace(/\.[^.]+$/, '').replace(/^[\d\s._-]+/, '').replace(/[-_]+/g, ' ').trim();

/** Everything dropped into public/gallery/<dir> (or its photos/ and videos/ sub-folders) shows up on the site automatically. */
export function listMedia(dir: string): Media[] {
  const root = path.join(process.cwd(), 'public', 'gallery');
  const base = path.join(root, dir);
  if (!base.startsWith(root)) return [];
  const out: Media[] = [];
  const read = (abs: string, rel: string) => {
    try {
      for (const e of fs.readdirSync(abs, { withFileTypes: true })) {
        if (e.isDirectory() && SUB.has(e.name) && !rel.includes('/')) { read(path.join(abs, e.name), `${rel}/${e.name}`); continue; }
        if (!e.isFile() || !(IMG.test(e.name) || VID.test(e.name))) continue;
        out.push({ src: `/gallery/${dir}/${rel ? rel + '/' : ''}${encodeURIComponent(e.name)}`, type: VID.test(e.name) ? 'video' : 'image', name: e.name, title: pretty(e.name) });
      }
    } catch { /* folder missing */ }
  };
  read(base, '');
  return out.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
}
export const splitMedia = (m: Media[]) => ({ images: m.filter((x) => x.type === 'image'), videos: m.filter((x) => x.type === 'video') });
