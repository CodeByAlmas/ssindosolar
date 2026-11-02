'use client';
import { useState } from 'react';
import CBtn from './CBtn';
import { wa } from './Chrome';

export default function QuoteForm({ dark }: { dark?: boolean }) {
  const [name, setName] = useState(''), [city, setCity] = useState(''), [bill, setBill] = useState('₹2,500 to ₹4,000');
  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const t = `Hello, I am ${name.trim().slice(0, 60) || 'a visitor'}${city.trim() ? ' from ' + city.trim().slice(0, 40) : ''}. My monthly electricity bill is ${bill}. Please suggest a solar system and share a quote.`;
    window.open(wa(t), '_blank', 'noopener,noreferrer');
  };
  return (
    <form className={dark ? 'qf dark' : 'qf'} onSubmit={send}>
      <label htmlFor={dark ? 'q-n2' : 'q-n'}>Your name</label>
      <input id={dark ? 'q-n2' : 'q-n'} value={name} onChange={(e) => setName(e.target.value)} maxLength={60} autoComplete="name" placeholder="Full name" />
      <label htmlFor={dark ? 'q-c2' : 'q-c'}>City or PIN code</label>
      <input id={dark ? 'q-c2' : 'q-c'} value={city} onChange={(e) => setCity(e.target.value)} maxLength={40} placeholder="Kanpur" />
      <label htmlFor={dark ? 'q-b2' : 'q-b'}>Monthly electricity bill</label>
      <select id={dark ? 'q-b2' : 'q-b'} value={bill} onChange={(e) => setBill(e.target.value)}>
        {['Under ₹1,500', '₹1,500 to ₹2,500', '₹2,500 to ₹4,000', '₹4,000 to ₹8,000', 'Above ₹8,000'].map((o) => <option key={o}>{o}</option>)}
      </select>
      <CBtn type="submit" v={dark ? '' : 'sun'}>Send on WhatsApp</CBtn>
    </form>
  );
}
