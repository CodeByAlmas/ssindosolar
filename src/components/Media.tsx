import Image from 'next/image';
import type { CSSProperties } from 'react';

export default function Media({ src, alt = '', ratio = '4/3', cls = '', sizes = '(max-width:900px) 100vw, 50vw', style }: { src: string; alt?: string; ratio?: string; cls?: string; sizes?: string; style?: CSSProperties }) {
  return <div className={`media ${cls}`.trim()} data-img style={{ aspectRatio: ratio, ...style }}><Image src={src} alt={alt} fill sizes={sizes} /></div>;
}
