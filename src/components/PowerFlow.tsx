'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const STEPS = [
  ['Sunlight meets the modules', 'Photons knock electrons loose in each solar cell and DC power is born.'],
  ['DC power runs down the cable', 'UV-rated DC cables carry the power to the inverter, through proper conduits.'],
  ['The inverter makes it AC', 'It converts DC to grid-quality AC and watches the plant 24x7.'],
  ['Your home uses it first', 'The ACDB feeds your lights, fans and machines before anything else.'],
  ['The surplus goes to the grid', 'The bi-directional meter counts every exported unit. That is net metering.'],
];

export const PowerScene = ({ id = 'pf' }: { id?: string }) => {
  const Wire = ({ i, d, c, n }: { i: number; d: string; c: string; n: string }) => <path id={`${id}${n}`} data-w={i} pathLength={1} d={d} fill="none" stroke={c} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" filter={`url(#${id}-glow)`} />;
  const Pulse = ({ i, n, c, dur = '2.2s' }: { i: number; n: string; c: string; dur?: string }) => (
    <g data-p={i} filter={`url(#${id}-glow)`}>{[0, 0.75, 1.5].map((b) => <circle key={b} r="6.5" fill={c}><animateMotion dur={dur} begin={`${b}s`} repeatCount="indefinite"><mpath href={`#${id}${n}`} /></animateMotion></circle>)}</g>);
  const Label = ({ x, y, w, t }: { x: number; y: number; w: number; t: string }) => <g className="lbl"><rect x={x - w / 2} y={y - 17} width={w} height="34" rx="17" fill="rgba(255,255,255,.14)" stroke="rgba(255,255,255,.28)" /><text x={x} y={y + 6} textAnchor="middle" fontSize="17" fontWeight="600" fill="#fff">{t}</text></g>;
  return (
    <svg className="pf-svg" viewBox="0 0 1200 640" role="img" aria-label="Diagram: sun, rooftop solar modules, inverter, distribution board, home loads, net meter, utility pole and grid pylon">
      <defs>
        <filter id={`${id}-glow`} x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3.5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <radialGradient id={`${id}-sun`} cx=".4" cy=".4" r=".7"><stop offset="0" stopColor="#fffbe0" /><stop offset=".55" stopColor="#ffd34a" /><stop offset="1" stopColor="#ff9b2e" /></radialGradient>
        <radialGradient id={`${id}-halo`}><stop offset="0" stopColor="#ffd34a" stopOpacity=".55" /><stop offset="1" stopColor="#ffd34a" stopOpacity="0" /></radialGradient>
        <linearGradient id={`${id}-pnl`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4b8bff" /><stop offset=".6" stopColor="#1b4fc4" /><stop offset="1" stopColor="#0f2f7c" /></linearGradient>
        <linearGradient id={`${id}-beam`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffd34a" stopOpacity=".5" /><stop offset="1" stopColor="#ffd34a" stopOpacity="0" /></linearGradient>
        <linearGradient id={`${id}-ground`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0f4a52" /><stop offset="1" stopColor="#082b30" /></linearGradient>
        <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#f4f8ff" /><stop offset=".5" stopColor="#d3e0f7" /><stop offset="1" stopColor="#aebfe0" /></linearGradient>
        <pattern id={`${id}-cells`} width="16" height="14" patternUnits="userSpaceOnUse"><path d="M16 0H0V14" fill="none" stroke="rgba(200,225,255,.42)" strokeWidth="1" /></pattern>
        <radialGradient id={`${id}-lamp`}><stop offset="0" stopColor="#ffe9a0" stopOpacity=".9" /><stop offset="1" stopColor="#ffe9a0" stopOpacity="0" /></radialGradient>
      </defs>

      <g opacity=".5" stroke="rgba(255,255,255,.08)">{Array.from({ length: 13 }, (_, k) => <line key={k} x1={k * 100} y1="540" x2={600 + (k - 6) * 330} y2="640" />)}{[560, 585, 615].map((y) => <line key={y} x1="0" y1={y} x2="1200" y2={y} />)}</g>
      <rect y="540" width="1200" height="100" fill={`url(#${id}-ground)`} opacity=".55" />
      <line x1="0" y1="540" x2="1200" y2="540" stroke="rgba(255,255,255,.28)" />

      {/* sun */}
      <g data-n="0"><circle cx="130" cy="120" r="120" fill={`url(#${id}-halo)`} className="pf-halo" />
        <g className="pf-rays" stroke="#ffd34a" strokeWidth="4" strokeLinecap="round">{Array.from({ length: 16 }, (_, k) => { const a = k * Math.PI / 8; const r0 = 52, r1 = k % 2 ? 66 : 80; return <line key={k} x1={130 + Math.cos(a) * r0} y1={120 + Math.sin(a) * r0} x2={130 + Math.cos(a) * r1} y2={120 + Math.sin(a) * r1} />; })}</g>
        <circle cx="130" cy="120" r="40" fill={`url(#${id}-sun)`} /></g>
      <polygon data-n="0" points="150,128 300,176 420,250 392,300 262,208" fill={`url(#${id}-beam)`} />

      {/* grid: utility pole, transformer, pylon, skyline */}
      <g data-n="5">
        <g fill="#0a2d33" stroke="rgba(255,255,255,.18)">{[[1130, 470, 24, 70], [1156, 430, 22, 110], [1180, 480, 20, 60]].map(([x, y, w, h], k) => <rect key={k} x={x} y={y} width={w} height={h} />)}</g>
        {[[1136, 485], [1142, 505], [1162, 445], [1162, 470], [1185, 495]].map(([x, y], k) => <rect key={k} x={x} y={y} width="6" height="8" fill="#ffd34a" opacity=".9" />)}
        <path d="M1060 540 L1090 270 L1120 540 M1068 470 H1112 M1074 420 H1106 M1080 372 H1100 M1062 270 H1118 M1070 318 H1110" stroke="#cfe3e6" strokeWidth="3" fill="none" /><path d="M1068 470 L1106 420 M1112 470 L1074 420 M1074 420 L1100 372 M1106 420 L1080 372" stroke="#cfe3e6" strokeWidth="2" fill="none" />
        {[1064, 1090, 1116].map((x) => <g key={x}><line x1={x} y1="270" x2={x} y2="284" stroke="#fff" strokeWidth="3" /><rect x={x - 3} y="284" width="6" height="14" rx="3" fill="#bcd8dc" /></g>)}
        <path d="M1064 298 Q1020 330 972 308 M1090 298 Q1030 346 972 326" stroke="#9fc6cb" strokeWidth="2.5" fill="none" /><path d="M1116 298 Q1160 326 1200 304" stroke="#9fc6cb" strokeWidth="2.5" fill="none" />
        <rect x="921" y="296" width="18" height="244" rx="4" fill="#c9a679" /><rect x="880" y="318" width="100" height="8" rx="3" fill="#8f6e46" />
        {[888, 930, 972].map((x) => <rect key={x} x={x - 3} y="300" width="6" height="18" rx="3" fill="#e7f5f7" />)}
        <rect x="944" y="352" width="34" height="50" rx="7" fill="#4e6d74" stroke="#9db8bd" /><circle cx="961" cy="368" r="5" fill="#ffd34a" /><path d="M939 372 H944 M939 390 H944" stroke="#9db8bd" strokeWidth="3" />
      </g>

      {/* house cutaway */}
      <g>
        <path d="M268 336 L530 196 L792 336 Z" fill="#17525a" stroke="#9fd3d8" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M300 336 L530 214 L760 336" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="2" /><path d="M530 214 V336 M410 275 V336 M650 275 V336" stroke="rgba(255,255,255,.1)" strokeWidth="2" />
        <rect x="300" y="336" width="460" height="204" fill="#0f3e45" stroke="#9fd3d8" strokeWidth="2.5" /><rect x="300" y="516" width="460" height="24" fill="#0a2e33" />
        <path d="M560 336 V516" stroke="rgba(255,255,255,.18)" strokeWidth="2" strokeDasharray="6 6" />
      </g>

      {/* modules on the roof slope */}
      <g data-n="0" transform="translate(285 326.9) rotate(-28.1)">
        {[0, 1].flatMap((j) => [0, 1, 2, 3].map((i) => <g key={`${i}${j}`}><rect x={i * 68} y={-46 - j * 50} width="64" height="44" rx="3" fill={`url(#${id}-pnl)`} stroke="#d6e6ff" strokeWidth="2" /><rect x={i * 68} y={-46 - j * 50} width="64" height="44" rx="3" fill={`url(#${id}-cells)`} /><path d={`M${i * 68 + 8} ${-4 - j * 50} L${i * 68 + 34} ${-46 - j * 50} H${i * 68 + 50} L${i * 68 + 24} ${-4 - j * 50}Z`} fill="rgba(255,255,255,.14)" /></g>))}
        <path d="M6 0 V16 M200 0 V16 M120 0 V16" stroke="#9fc6cb" strokeWidth="3" />
      </g>

      {/* inverter */}
      <g data-n="1"><rect x="578" y="378" width="74" height="104" rx="12" fill={`url(#${id}-metal)`} stroke="#fff" strokeWidth="1.5" /><rect x="588" y="390" width="54" height="30" rx="5" fill="#0b2a5c" /><path d="M594 408 l9-11 8 8 9-12 8 9 7-5" stroke="#7fe3ff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="596" cy="436" r="4" fill="#34d399" className="pf-led" /><circle cx="610" cy="436" r="4" fill="#ffd34a" /><rect x="624" y="432" width="18" height="8" rx="3" fill="#8ea3cc" />{[0, 1, 2, 3, 4].map((k) => <rect key={k} x="590" y={448 + k * 6} width="50" height="2.5" rx="1" fill="#a9b9d8" />)}</g>
      {/* ACDB */}
      <g data-n="2"><rect x="700" y="388" width="52" height="92" rx="8" fill="#d4e6e9" stroke="#fff" strokeWidth="1.5" />{[0, 1, 2].map((k) => <g key={k}><rect x="710" y={398 + k * 24} width="32" height="16" rx="3" fill="#0e4a52" /><rect x={k % 2 ? 722 : 712} y={401 + k * 24} width="10" height="10" rx="2" fill="#ffd34a" /></g>)}</g>
      {/* home loads */}
      <g data-n="3">
        <circle cx="430" cy="362" r="70" fill={`url(#${id}-lamp)`} className="pf-halo" /><path d="M430 336 V352" stroke="#9fd3d8" strokeWidth="2" /><path d="M412 366 L418 352 H442 L448 366Z" fill="#ffd34a" />
        <rect x="346" y="418" width="104" height="62" rx="6" fill="#0b2a5c" stroke="#9fd3d8" strokeWidth="2.5" /><rect x="352" y="424" width="92" height="50" rx="3" fill="#2b82ff" /><path d="M352 462 l24-18 18 12 26-22 24 24v18h-92Z" fill="rgba(255,255,255,.25)" /><rect x="378" y="480" width="40" height="8" rx="2" fill="#9fd3d8" /><rect x="360" y="488" width="76" height="26" rx="3" fill="#145159" />
        <path d="M494 516 V430" stroke="#9fd3d8" strokeWidth="4" strokeLinecap="round" /><path d="M478 432 L484 410 H504 L510 432Z" fill="#ffd34a" /><circle cx="494" cy="420" r="42" fill={`url(#${id}-lamp)`} className="pf-halo" />
      </g>
      {/* net meter */}
      <g data-n="4"><rect x="792" y="390" width="72" height="100" rx="10" fill={`url(#${id}-metal)`} stroke="#fff" strokeWidth="1.5" /><rect x="802" y="402" width="52" height="24" rx="4" fill="#0b2a2e" /><text data-meter x="828" y="420" textAnchor="middle" fontSize="14" fontFamily="ui-monospace,monospace" fontWeight="700" fill="#7fe3ff">00000</text>
        <circle cx="828" cy="456" r="20" fill="#0b3a40" stroke="#fff" strokeWidth="1.5" /><path d="M828 456 L840 446" stroke="#ffd34a" strokeWidth="3" strokeLinecap="round" /><circle cx="828" cy="456" r="3" fill="#ffd34a" /><path d="M812 478 h32" stroke="#8ea3cc" strokeWidth="3" /></g>

      {/* wires (drawn on scroll) */}
      <Wire i={0} n="0" d="M168 130 Q280 160 372 232" c="#ffd34a" />
      <Wire i={1} n="1" d="M470 232 L548 262 V430 H578" c="#ffd34a" />
      <Wire i={2} n="2" d="M652 432 H700" c="#7fe3ff" />
      <Wire i={3} n="3" d="M726 480 V507 H398 V484" c="#7fe3ff" />
      <Wire i={4} n="4" d="M752 432 H792" c="#7fe3ff" />
      <Wire i={4} n="5" d="M864 440 H930 V322" c="#ffb347" />
      <Wire i={4} n="6" d="M930 322 Q1010 372 1090 300 Q1150 346 1200 304" c="#ffb347" />
      <Pulse i={1} n="1" c="#ffd34a" /><Pulse i={2} n="2" c="#7fe3ff" dur="1.2s" /><Pulse i={3} n="3" c="#7fe3ff" dur="3.2s" /><Pulse i={4} n="4" c="#7fe3ff" dur="1.2s" /><Pulse i={4} n="5" c="#ffb347" dur="1.8s" /><Pulse i={4} n="6" c="#ffb347" dur="3s" />

      <Label x={168} y={300} w={176} t="Solar modules (DC)" /><Label x={615} y={352} w={92} t="Inverter" /><Label x={726} y={366} w={76} t="ACDB" /><Label x={402} y={392} w={118} t="Home loads" /><Label x={828} y={372} w={104} t="Net meter" /><Label x={990} y={232} w={128} t="Utility grid" />
    </svg>
  );
};

export default function PowerFlow() {
  const sec = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = sec.current!;
    const q = <T extends Element>(s: string) => Array.from(el.querySelectorAll<T>(s));
    const mm = gsap.matchMedia();
    const build = () => {
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } });
      gsap.set(q('[data-w]'), { strokeDasharray: 1, strokeDashoffset: 1 }); gsap.set(q('[data-n]'), { opacity: 0.22 }); gsap.set(q('[data-p]'), { opacity: 0 });
      const rows = q('.pf-s'), meter = q<SVGTextElement>('[data-meter]')[0], o = { v: 0 };
      for (let i = 0; i < 5; i++) {
        tl.call(() => rows.forEach((r, k) => r.classList.toggle('on', k === i)), undefined, i);
        tl.to(q(`[data-w="${i}"]`), { strokeDashoffset: 0, duration: 0.8 }, i).to(q(`[data-n="${i}"]`), { opacity: 1, duration: 0.4 }, i + 0.35).set(q(`[data-p="${i}"]`), { opacity: 1 }, i + 0.7);
      }
      tl.to(q('[data-n="5"]'), { opacity: 1, duration: 0.5 }, 4.4).to(o, { v: 482, duration: 0.9, onUpdate: () => { if (meter) meter.textContent = String(Math.round(o.v)).padStart(5, '0'); } }, 4.3).to(q('.pf-bar i'), { scaleX: 1, duration: 5 }, 0);
      return tl;
    };
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => { const tl = build(); ScrollTrigger.create({ trigger: el, start: 'top top', end: '+=2600', pin: true, scrub: 0.7, animation: tl }); });
    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => { const tl = build(); ScrollTrigger.create({ trigger: el, start: 'top 70%', once: true, onEnter: () => { tl.timeScale(0.9).play(); } }); });
    mm.add('(prefers-reduced-motion: reduce)', () => { build().progress(1); });
    return () => mm.revert();
  }, []);
  return (
    <section className="pf" ref={sec} aria-label="How solar power reaches your home">
      <div className="pf-in">
        <div className="pf-copy">
          <p className="eyebrow">How the power flows</p>
          <h2 className="h2">From sunlight to your socket, and back to the grid.</h2>
          <ol className="pf-list">{STEPS.map(([t, d], i) => <li key={t} className={`pf-s${i === 0 ? ' on' : ''}`}><span>{i + 1}</span><div><b>{t}</b><p>{d}</p></div></li>)}</ol>
          <div className="pf-bar"><i /></div>
        </div>
        <PowerScene />
      </div>
    </section>
  );
}
