import type { ReactNode } from 'react';
import TLink from './TLink';
import { Arrow } from './Icons';

export default function CBtn({ href, children, v = '', external, type }: { href?: string; children: ReactNode; v?: string; external?: boolean; type?: 'submit' }) {
  const inner = <><span>{children}</span><i><Arrow /></i></>;
  const cls = `cbtn ${v}`.trim();
  if (type) return <button type="submit" className={cls}>{inner}</button>;
  if (external) return <a className={cls} href={href} target="_blank" rel="noopener noreferrer">{inner}</a>;
  return <TLink href={href || '/'} className={cls}>{inner}</TLink>;
}
