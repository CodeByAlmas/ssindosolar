'use client';
import { useState } from 'react';
import { CO2 } from '@/lib/data';

const PRESETS: [number, string][] = [[3, 'Home, 3 kW'], [10, 'Shop, 10 kW'], [50, 'Factory, 50 kW'], [300, 'Campus, 300 kW']];
const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 1 });

export default function Co2Estimator() {
  const [kw, setKw] = useState(10);
  const units = kw * CO2.unitsPerKw, tons = units * CO2.factor / 1000;
  return (
    <div className="co2 card">
      <div className="co2-top"><span className="eyebrow">Estimate your impact</span><b>{kw} kW</b></div>
      <input type="range" min={1} max={500} value={kw} onChange={(e) => setKw(+e.target.value)} aria-label="System size in kilowatts" style={{ '--p': `${(kw - 1) / 4.99}%` } as React.CSSProperties} />
      <div className="co2-presets">{PRESETS.map(([v, l]) => <button key={v} type="button" className={kw === v ? 'on' : ''} onClick={() => setKw(v)}>{l}</button>)}</div>
      <div className="co2-out">
        <div><b>{fmt(units)}</b><span>units of clean power a year</span></div>
        <div className="hl"><b>{fmt(tons)} <small>tonnes</small></b><span>CO2 avoided every year</span></div>
        <div><b>{fmt(tons * 25)} <small>tonnes</small></b><span>over a 25-year plant life</span></div>
      </div>
      <p className="co2-note">Estimate based on about {CO2.unitsPerKw.toLocaleString('en-IN')} units per kW per year and a grid emission factor of {CO2.factor} tCO2/MWh (CEA CO2 Baseline Database v20, FY 2023-24). Actual results depend on your site.</p>
    </div>
  );
}
