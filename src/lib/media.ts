import fs from 'node:fs';
import path from 'node:path';

export type Media = { src: string; type: 'image' | 'video'; name: string };
const IMG = /\.(jpe?g|png|webp|avif)$/i, VID = /\.(mp4|webm|mov)$/i;

/** Any image or video dropped into public/gallery/<dir> appears on the site automatically. */
export function listMedia(dir: string): Media[] {
  const abs = path.join(process.cwd(), 'public', 'gallery', dir);
  if (!abs.startsWith(path.join(process.cwd(), 'public', 'gallery'))) return [];
  try {
    return fs.readdirSync(abs).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .filter((f) => IMG.test(f) || VID.test(f))
      .map((f) => ({ src: `/gallery/${dir}/${encodeURIComponent(f)}`, type: VID.test(f) ? 'video' as const : 'image' as const, name: f }));
  } catch { return []; }
}
