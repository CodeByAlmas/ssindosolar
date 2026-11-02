'use client';

import React, { useState } from 'react';
import CBtn from '@/components/CBtn';
import { wa } from '@/components/Chrome';

export interface CityPin {
  id: string;
  city: string;
  state: string;
  badge: string;
  title: string;
  address: string;
  highlight: string;
  capacity: string;
  x: number; // Exact coordinate on 600x680 India Map
  y: number;
  labelDx: number; // Smart callout offset X so labels NEVER overlap
  labelDy: number; // Smart callout offset Y
  anchor: 'start' | 'end' | 'middle';
  isHQ?: boolean;
}

export const INDIA_LOCATIONS: CityPin[] = [
  {
    id: 'kanpur',
    city: 'Kanpur',
    state: 'Uttar Pradesh',
    badge: 'Head Office & Warehouse',
    title: 'Corporate HQ & Central EPC Hub',
    address: 'M.I.G. - 86, K.D.A. Colony, Jajmau, Kanpur, U.P. - 208010',
    highlight:
      'UPNEDA Empanelled Vendor (CNB2506102720). Central warehouse, 24x7 O&M command center & DTS Madarsa 25 kW site.',
    capacity: 'HQ • 500+ Sites',
    x: 268,
    y: 256,
    labelDx: -68,
    labelDy: 14,
    anchor: 'end',
    isHQ: true,
  },
  {
    id: 'aligarh',
    city: 'Aligarh',
    state: 'Uttar Pradesh',
    badge: 'R&D & Incubation',
    title: 'CARET — AMU Aligarh Incubation',
    address: 'Centre of Advanced Research in Electrified Transportation (CARET), AMU, Aligarh',
    highlight:
      'Incubated under Department of Heavy Industry (DHI), Government of India for advanced solar engineering.',
    capacity: 'Govt. of India DHI',
    x: 232,
    y: 226,
    labelDx: -56,
    labelDy: -8,
    anchor: 'end',
  },
  {
    id: 'sitapur',
    city: 'Sitapur',
    state: 'Uttar Pradesh',
    badge: 'Institutional Flagship',
    title: 'Vidyagyan School Solar Plant',
    address: 'Sitapur, Uttar Pradesh',
    highlight:
      'Full turnkey design, Tier-I module supply, structure mounting, and high-efficiency grid synchronization.',
    capacity: '300 kW Plant',
    x: 278,
    y: 232,
    labelDx: 58,
    labelDy: -16,
    anchor: 'start',
  },
  {
    id: 'deoband',
    city: 'Deoband',
    state: 'Uttar Pradesh',
    badge: 'Institutional Campus',
    title: 'Darul Uloom Deoband',
    address: 'Deoband, Saharanpur District, Uttar Pradesh',
    highlight:
      'Heavy-duty institutional solar PV power station engineered for continuous campus load and net-metering.',
    capacity: '300 kW Plant',
    x: 224,
    y: 186,
    labelDx: 52,
    labelDy: -18,
    anchor: 'start',
  },
  {
    id: 'unnao',
    city: 'Unnao',
    state: 'Uttar Pradesh',
    badge: 'Industrial C&I',
    title: 'AKI Magarwara Industrial Unit',
    address: 'Magarwara Industrial Area, Unnao, Uttar Pradesh',
    highlight:
      'Commercial & industrial string inverter setup with 80% accelerated depreciation benefit & high-yield generation.',
    capacity: '50 kW C&I',
    x: 274,
    y: 250,
    labelDx: 66,
    labelDy: 4,
    anchor: 'start',
  },
  {
    id: 'fatehpur',
    city: 'Fatehpur',
    state: 'Uttar Pradesh',
    badge: 'PM-KUSUM Agriculture',
    title: 'Solar Irrigation Water Pump',
    address: 'Chaudagra, Fatehpur, Uttar Pradesh',
    highlight:
      'High-discharge agricultural solar water pump deployed for rural irrigation under PM-KUSUM scheme.',
    capacity: '5 HP Pump',
    x: 282,
    y: 268,
    labelDx: 62,
    labelDy: 24,
    anchor: 'start',
  },
  {
    id: 'delhi-ncr',
    city: 'Delhi NCR',
    state: 'National Capital Region',
    badge: 'Key Operating Region',
    title: 'Delhi NCR Commercial & Rooftop Hub',
    address: 'Delhi NCR Operating Zone',
    highlight:
      'Active turnkey EPC execution for residential rooftops, institutional campuses, and commercial establishments.',
    capacity: 'North India Hub',
    x: 212,
    y: 210,
    labelDx: -58,
    labelDy: -22,
    anchor: 'end',
  },
  {
    id: 'chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    badge: 'Pan-India Execution',
    title: 'Govt. High School Mambakkam',
    address: 'Mambakkam, Chennai, Tamil Nadu',
    highlight:
      'Stand-alone Off-Grid SPV system with battery backup engineered for uninterrupted institutional power.',
    capacity: 'Off-Grid SPV',
    x: 266,
    y: 522,
    labelDx: 48,
    labelDy: 0,
    anchor: 'start',
  },
];

// Detailed Cartographic Path of India (Mainland + J&K/Ladakh + Kutch/Kathiawar + Seven Sisters)
const INDIA_MAINLAND_PATH =
  'M 184,34 L 210,30 L 236,42 L 266,40 L 284,54 L 278,76 L 260,92 L 266,114 L 252,134 L 262,154 L 284,174 L 316,192 L 348,198 L 368,194 L 372,174 L 382,172 L 386,188 L 408,186 L 434,168 L 468,154 L 496,144 L 522,156 L 534,174 L 516,194 L 504,218 L 498,248 L 484,264 L 474,244 L 464,256 L 454,238 L 432,226 L 414,228 L 406,246 L 414,274 L 396,296 L 372,306 L 352,332 L 332,356 L 304,382 L 296,412 L 282,448 L 274,492 L 268,534 L 254,568 L 236,608 L 218,616 L 204,592 L 192,554 L 178,506 L 164,458 L 154,412 L 146,368 L 138,334 L 118,338 L 92,344 L 70,330 L 62,308 L 84,296 L 98,298 L 88,284 L 54,278 L 42,260 L 58,242 L 88,238 L 104,224 L 94,198 L 106,174 L 134,158 L 158,136 L 172,114 L 164,90 L 154,68 L 166,48 Z';

// Highlighted State Contour: Uttar Pradesh
const UP_STATE_PATH =
  'M 218,178 L 252,176 L 288,196 L 326,218 L 334,248 L 316,278 L 284,284 L 252,276 L 226,254 L 212,224 L 214,196 Z';

// Highlighted State Contour: Tamil Nadu
const TN_STATE_PATH =
  'M 228,504 L 270,502 L 268,536 L 254,570 L 236,608 L 218,616 L 210,582 L 218,540 Z';

// Internal State Divider Lines (Matching Reference 3D White Map)
const STATE_BORDERS_PATH =
  'M 164,90 Q 210,108 260,92 M 172,114 Q 212,136 252,134 M 158,136 Q 192,168 218,178 M 106,174 Q 168,204 212,224 M 104,224 Q 165,256 226,254 M 138,334 Q 210,318 284,284 M 316,278 Q 356,282 396,296 M 348,198 Q 344,240 334,248 M 382,188 Q 388,242 406,246 M 154,412 Q 224,396 296,412 M 164,458 Q 222,462 274,492 M 178,506 Q 208,522 228,504';

export default function IndiaMap() {
  const [activeId, setActiveId] = useState<string>('kanpur');
  const [zoomUP, setZoomUP] = useState<boolean>(false);

  const activeCity = INDIA_LOCATIONS.find((c) => c.id === activeId) || INDIA_LOCATIONS[0];
  const hq = INDIA_LOCATIONS[0];

  return (
    <section className="sec" id="presence" aria-labelledby="map-heading">
      <div className="wrap">
        {/* Section Heading */}
        <div
          className="sec-h"
          style={{
            maxWidth: '1160px',
            width: '100%',
            margin: '0 auto clamp(28px, 4vw, 52px)',
            padding: '0 8px',
          }}
        >
          <p className="eyebrow">Pan-India Footprint</p>
          <h2
            id="map-heading"
            className="h2"
            data-split
            style={{
              fontSize: 'clamp(20px, 2.5vw, 42px)',
              lineHeight: 1.15,
              letterSpacing: '-0.035em',
              whiteSpace: 'nowrap',
              textAlign: 'center',
              margin: '0 auto',
              width: '100%',
              maxWidth: '100%',
            }}
          >
            Engineered in Kanpur, powering roofs across India.
          </h2>
        </div>

        {/* Main Split Grid */}
        <div className="map-split" data-reveal>
          {/* LEFT PANEL: Dynamic Active City Information */}
          <div className="card map-info">
            <div>
              <div className="map-top-tags">
                <span className="tag sun">{activeCity.badge}</span>
                <span className="map-cap">{activeCity.capacity}</span>
              </div>

              <div key={activeCity.id} className="map-fade">
                <p className="map-state">
                  {activeCity.city}, {activeCity.state}
                </p>
                <h3 className="map-title">{activeCity.title}</h3>

                <div className="map-box">
                  <div className="map-row">
                    <span className="map-lbl">Location / Address</span>
                    <strong>{activeCity.address}</strong>
                  </div>
                  <div className="map-row" style={{ marginTop: 14 }}>
                    <span className="map-lbl">Operations & Impact</span>
                    <p>{activeCity.highlight}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive City Pills + Action Buttons */}
            <div className="map-selector">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span className="map-lbl" style={{ margin: 0 }}>
                  Select active hub ({INDIA_LOCATIONS.length} cities):
                </span>
                <button
                  type="button"
                  onClick={() => setZoomUP((z) => !z)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--teal)',
                    fontWeight: 700,
                    fontSize: '12px',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  {zoomUP ? 'View Full India Map' : 'Zoom into U.P. Cluster +'}
                </button>
              </div>

              <div className="map-pills" role="tablist" aria-label="Operating cities">
                {INDIA_LOCATIONS.map((loc) => {
                  const isOn = loc.id === activeId;
                  return (
                    <button
                      key={loc.id}
                      type="button"
                      role="tab"
                      aria-selected={isOn}
                      onClick={() => {
                        setActiveId(loc.id);
                        if (loc.id === 'chennai' && zoomUP) setZoomUP(false);
                      }}
                      className={`map-pill ${isOn ? 'on' : ''}`}
                    >
                      <i className={loc.isHQ ? 'hq-dot' : 'city-dot'} />
                      {loc.city}
                    </button>
                  );
                })}
              </div>

              <div className="map-actions">
                <CBtn
                  external
                  href={wa(
                    `Hello SS Indo Solar, I want to enquire about solar installation in ${activeCity.city}.`
                  )}
                >
                  Book survey in {activeCity.city}
                </CBtn>
                <CBtn href="/projects" v="ghost" sm>
                  View projects
                </CBtn>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: 3D White/Alabaster Architectural Relief Map */}
          <div
            className="map-stage"
            style={{
              background:
                'radial-gradient(circle at 50% 42%, #e4eaec 0%, #cfd8dc 62%, #b8c4c9 100%)',
              color: '#0f1a1c',
              border: '1px solid #d5dfe2',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), 0 24px 60px rgba(15, 26, 28, 0.08)',
            }}
          >
            {/* Top Floating Glass Telemetry Bar */}
            <div
              className="map-hud"
              style={{
                background: 'rgba(15, 26, 28, 0.88)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderRadius: '18px',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: '0 12px 30px rgba(15,26,28,0.18)',
              }}
            >
              <div>
                <small style={{ color: 'rgba(255,255,255,0.65)' }}>HQ Command</small>
                <b style={{ color: '#ffc928' }}>Kanpur, U.P.</b>
              </div>
              <div className="map-hud-sep" style={{ background: 'rgba(255,255,255,0.18)' }} />
              <div>
                <small style={{ color: 'rgba(255,255,255,0.65)' }}>Selected Node</small>
                <b style={{ color: '#fff' }}>
                  {activeCity.city} ({activeCity.capacity})
                </b>
              </div>
              <button
                type="button"
                onClick={() => setZoomUP((z) => !z)}
                style={{
                  marginLeft: 'auto',
                  background: zoomUP ? '#ffc928' : 'rgba(255,255,255,0.14)',
                  color: zoomUP ? '#0f1a1c' : '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '7px 12px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
              >
                {zoomUP ? 'Full Map' : 'Zoom U.P.'}
              </button>
            </div>

            {/* 3D Relief SVG Canvas */}
            <div className="map-svg-wrap">
              <svg
                viewBox={zoomUP ? '140 135 245 185' : '0 0 600 660'}
                className="map-svg"
                role="img"
                aria-label="3D Architectural Map of India showing SS Indo Solar locations"
                style={{
                  transition: 'viewBox 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  maxHeight: '490px',
                  width: '100%',
                }}
              >
                <defs>
                  {/* Realistic Soft Floor Cast Shadow (Matches Reference 3D Map) */}
                  <filter id="floorShadow" x="-20%" y="-20%" width="150%" height="150%">
                    <feDropShadow dx="-14" dy="22" stdDeviation="14" floodColor="#334155" floodOpacity="0.48" />
                    <feDropShadow dx="-4" dy="8" stdDeviation="4" floodColor="#0f172a" floodOpacity="0.28" />
                  </filter>

                  {/* Top White 3D Surface Lighting */}
                  <linearGradient id="white3DSurface" x1="15%" y1="5%" x2="85%" y2="95%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="55%" stopColor="#f8fafc" />
                    <stop offset="100%" stopColor="#e2e8f0" />
                  </linearGradient>

                  {/* Highlighted State Surface (Soft Solar Gold / Teal Tint) */}
                  <linearGradient id="activeStateSurface" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fffbeb" />
                    <stop offset="100%" stopColor="#fef3c7" />
                  </linearGradient>

                  {/* 3D Pin Gradients */}
                  <linearGradient id="hqPinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffd54f" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>

                  <linearGradient id="tealPinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#166974" />
                    <stop offset="100%" stopColor="#0e4a52" />
                  </linearGradient>

                  <filter id="pinShadow3D" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="4" stdDeviation="2.5" floodColor="#0f1a1c" floodOpacity="0.45" />
                  </filter>
                </defs>

                {/* Subtle Studio Grid Rings */}
                <circle
                  cx="268"
                  cy="256"
                  r="110"
                  fill="none"
                  stroke="rgba(15, 26, 28, 0.06)"
                  strokeDasharray="4 4"
                />
                <circle
                  cx="268"
                  cy="256"
                  r="210"
                  fill="none"
                  stroke="rgba(15, 26, 28, 0.05)"
                  strokeDasharray="4 4"
                />

                {/* 1. DEEP FLOOR SHADOW PLATE */}
                <g filter="url(#floorShadow)">
                  <path d={INDIA_MAINLAND_PATH} fill="#94a3b8" transform="translate(-4, 10)" />
                </g>

                {/* 2. 3D EXTRUDED SIDE WALLS (Layered stack for realistic 3D block thickness) */}
                {[9, 8, 7, 6, 5, 4, 3, 2, 1].map((depth) => (
                  <path
                    key={`depth-${depth}`}
                    d={INDIA_MAINLAND_PATH}
                    fill={depth > 6 ? '#64748b' : depth > 3 ? '#94a3b8' : '#cbd5e1'}
                    stroke={depth === 9 ? '#475569' : 'none'}
                    strokeWidth="0.6"
                    transform={`translate(${-depth * 0.65}, ${depth * 1.35})`}
                    strokeLinejoin="round"
                  />
                ))}

                {/* 3. TOP CRISP WHITE 3D SURFACE OF INDIA */}
                <path
                  d={INDIA_MAINLAND_PATH}
                  fill="url(#white3DSurface)"
                  stroke="#ffffff"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />

                {/* 4. HIGHLIGHTED OPERATING STATES (Uttar Pradesh & Tamil Nadu) */}
                <path
                  d={UP_STATE_PATH}
                  fill="url(#activeStateSurface)"
                  stroke="#f59e0b"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
                <path
                  d={TN_STATE_PATH}
                  fill="url(#activeStateSurface)"
                  stroke="#f59e0b"
                  strokeWidth="1.1"
                  strokeLinejoin="round"
                />

                {/* 5. REALISTIC INTERNAL STATE BOUNDARY LINES */}
                <path
                  d={STATE_BORDERS_PATH}
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* 6. 3D ISLAND GROUPS (Lakshadweep & Andaman & Nicobar as in Reference) */}
                <g fill="#ffffff" stroke="#94a3b8" strokeWidth="0.8">
                  {/* Lakshadweep */}
                  <circle cx="132" cy="542" r="2.5" />
                  <circle cx="138" cy="556" r="2" />
                  <circle cx="134" cy="570" r="2.2" />
                  {/* Andaman & Nicobar */}
                  <path d="M 468,488 L 472,506 L 469,524 L 464,510 Z" />
                  <circle cx="472" cy="542" r="2.5" />
                  <circle cx="478" cy="564" r="2.5" />
                  <circle cx="482" cy="580" r="2" />
                </g>

                {/* 7. CURVED TRANSMISSION ARCS FROM KANPUR HQ TO ALL HUBS */}
                {INDIA_LOCATIONS.map((loc) => {
                  if (loc.isHQ) return null;
                  const isSelected = loc.id === activeId;
                  const midX = (hq.x + loc.x) / 2 - (loc.y - hq.y) * 0.16;
                  const midY = (hq.y + loc.y) / 2 - 14;
                  return (
                    <path
                      key={`arc-${loc.id}`}
                      d={`M ${hq.x} ${hq.y} Q ${midX} ${midY} ${loc.x} ${loc.y}`}
                      fill="none"
                      stroke={isSelected ? '#0e4a52' : 'rgba(14, 74, 82, 0.25)'}
                      strokeWidth={isSelected ? (zoomUP ? '1.4' : '2.2') : zoomUP ? '0.8' : '1.2'}
                      strokeDasharray={isSelected ? 'none' : '3 3'}
                    />
                  );
                })}

                {/* 8. 3D TEARDROP PINS + SMART CALLOUT BADGES (ZERO OVERLAP) */}
                {INDIA_LOCATIONS.map((loc) => {
                  const isSelected = loc.id === activeId;
                  const scale = zoomUP ? 0.58 : 1;
                  const lx = loc.labelDx * (zoomUP ? 0.62 : 1);
                  const ly = loc.labelDy * (zoomUP ? 0.62 : 1);

                  return (
                    <g
                      key={loc.id}
                      transform={`translate(${loc.x}, ${loc.y})`}
                      onClick={() => setActiveId(loc.id)}
                      style={{ cursor: 'pointer' }}
                      role="button"
                      tabIndex={0}
                      aria-label={`${loc.city} - ${loc.title}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActiveId(loc.id);
                        }
                      }}
                    >
                      {/* Invisible Touch Target */}
                      <circle r={16 * scale} fill="transparent" />

                      {/* Leader Callout Line from Pin Base to Pill Label */}
                      <polyline
                        points={`0,0 ${lx * 0.55},${ly} ${lx},${ly}`}
                        fill="none"
                        stroke={isSelected ? '#0f1a1c' : 'rgba(15, 26, 28, 0.4)'}
                        strokeWidth={isSelected ? 1.4 * scale : 0.9 * scale}
                      />

                      {/* Ground Pulse Ring */}
                      {(isSelected || loc.isHQ) && (
                        <ellipse
                          cx="0"
                          cy="0"
                          rx={(isSelected ? 13 : 9) * scale}
                          ry={(isSelected ? 7 : 5) * scale}
                          fill="none"
                          stroke={loc.isHQ || isSelected ? '#f59e0b' : '#0e4a52'}
                          strokeWidth={1.6 * scale}
                          className="map-pulse"
                        />
                      )}

                      {/* Ground Shadow Ellipse under Pin */}
                      <ellipse
                        cx="0"
                        cy={1.5 * scale}
                        rx={4.2 * scale}
                        ry={2.2 * scale}
                        fill="rgba(15, 26, 28, 0.35)"
                      />

                      {/* 3D Standing Teardrop Pin */}
                      <g
                        transform={`scale(${
                          (isSelected ? 1.22 : loc.isHQ ? 1.1 : 0.9) * scale
                        })`}
                        filter="url(#pinShadow3D)"
                      >
                        <path
                          d="M 0,0 C -5,-7 -9,-12 -9,-17 A 9,9 0 1,1 9,-17 C 9,-12 5,-7 0,0 Z"
                          fill={loc.isHQ || isSelected ? 'url(#hqPinGrad)' : 'url(#tealPinGrad)'}
                          stroke="#ffffff"
                          strokeWidth="1.5"
                        />
                        {/* Inner Pin Hole / Core */}
                        <circle
                          cx="0"
                          cy="-17"
                          r="3.6"
                          fill={loc.isHQ || isSelected ? '#0f1a1c' : '#ffc928'}
                        />
                      </g>

                      {/* Clean Callout Pill Label (No Text Clashing) */}
                      <g transform={`translate(${lx}, ${ly}) scale(${scale})`}>
                        <rect
                          x={
                            loc.anchor === 'end'
                              ? -(loc.city.length * 7.2 + (loc.isHQ ? 38 : 16))
                              : 0
                          }
                          y="-11"
                          width={loc.city.length * 7.2 + (loc.isHQ ? 38 : 16)}
                          height="22"
                          rx="11"
                          fill={isSelected ? '#0f1a1c' : 'rgba(255, 255, 255, 0.94)'}
                          stroke={isSelected ? '#ffc928' : 'rgba(15, 26, 28, 0.16)'}
                          strokeWidth={isSelected ? '1.5' : '1'}
                          style={{
                            filter: 'drop-shadow(0 4px 10px rgba(15,26,28,0.12))',
                          }}
                        />
                        <text
                          x={loc.anchor === 'end' ? -8 : 8}
                          y="4"
                          textAnchor={loc.anchor}
                          fill={isSelected ? '#ffc928' : '#0f1a1c'}
                          fontSize="11"
                          fontWeight="700"
                          style={{ fontFamily: 'var(--fh)' }}
                        >
                          {loc.city}
                          {loc.isHQ ? ' • HQ' : ''}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Bottom Map Legend */}
            <div
              className="map-legend"
              style={{
                borderTop: '1px solid rgba(15, 26, 28, 0.12)',
                color: '#2a3639',
                fontWeight: 500,
              }}
            >
              <span>
                <i className="lg-hq" style={{ border: '1.5px solid #0f1a1c' }} /> Kanpur Head Office
              </span>
              <span>
                <i className="lg-node" /> Active EPC Project Hub
              </span>
              <span className="map-hint" style={{ color: '#0e4a52', fontWeight: 700 }}>
                Tap any 3D pin or city pill
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}