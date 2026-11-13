'use client';
import Link from 'next/link';
import { useNav } from './Transition';

type P = { href: string; children: React.ReactNode; className?: string; onClick?: () => void; 'aria-label'?: string; 'aria-current'?: 'page' };
export default function TLink({ href, children, onClick, ...rest }: P) {
  const go = useNav();
  return (
    <Link href={href} {...rest} onClick={(e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault(); onClick?.(); go(href);
    }}>{children}</Link>
  );
}
export const Roll = ({ t }: { t: string }) => <span className="roll"><span>{t}</span><span aria-hidden="true">{t}</span></span>;
