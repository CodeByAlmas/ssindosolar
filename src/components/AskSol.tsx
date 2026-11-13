'use client';
import { useEffect, useRef, useState } from 'react';
import { wa } from './Chrome';

type Msg = { role: 'user' | 'assistant'; content: string };
const HI: Msg = { role: 'assistant', content: "Hi! I'm Sol, SS Indo Solar's AI assistant. Ask me about rooftop solar, panels, inverters, batteries, water heaters or our projects." };

export default function AskSol() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([HI]);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, open]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const q = text.trim().slice(0, 500);
    if (!q || busy) return;
    const next: Msg[] = [...msgs, { role: 'user', content: q }];
    setMsgs(next); setText(''); setBusy(true);
    try {
      const r = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: next.slice(-6) }) });
      const d = await r.json();
      setMsgs([...next, { role: 'assistant', content: d.reply || 'Something went wrong. Please contact us on WhatsApp.' }]);
    } catch { setMsgs([...next, { role: 'assistant', content: 'Network error. Please try again.' }]); }
    setBusy(false);
  }

  return (
    <>
      <button className="ask-btn" onClick={() => setOpen(!open)} aria-expanded={open}>{open ? 'Close' : 'Ask Sol'}</button>
      {open && (
        <section className="ask" aria-label="Ask Sol, AI assistant">
          <header><b>Sol</b> <span>AI assistant</span></header>
          <div className="ask-log" aria-live="polite">
            {msgs.map((m, i) => <p key={i} className={m.role}>{m.content}</p>)}
            {busy && <p className="assistant">...</p>}
            <div ref={end} />
          </div>
          <form onSubmit={send}>
            <input value={text} onChange={(e) => setText(e.target.value)} maxLength={500} placeholder="Type your question" aria-label="Your question" />
            <button disabled={busy}>Send</button>
          </form>
          <a href={wa('Hello, I would like to speak to someone about a quote.')} target="_blank" rel="noopener noreferrer">Talk to a person on WhatsApp</a>
        </section>
      )}
    </>
  );
}
