import { SITE } from '@/lib/data';

export const wa = (t: string) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(t)}`;

export function WhatsAppFab() {
  return (
    <a className="fab" href={wa('Hello, I would like information about SS Indo Solar.')} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-2.9-.4-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.300-2.900c-.2-.4.2-.4.7-1.300.1-.2 0-.3 0-.5l-.8-1.800c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.200s.9 2.500 1.100 2.700c.1.200 1.900 2.900 4.600 4 1.700.7 2.400.8 3.200.7.5-.1 1.500-.6 1.700-1.200.2-.6.2-1.100.2-1.200-.1-.1-.2-.2-.5-.3Z" /></svg>
    </a>
  );
}
