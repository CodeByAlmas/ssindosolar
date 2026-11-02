export const SITE = {
  name: 'SS Indo Solar',
  tagline: 'Powering the Nation',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ssindosolar.com',
  owner: 'Saadullah Khan',
  founded: 2018,
  city: 'Kanpur',
  state: 'Uttar Pradesh',
  address: 'MIG 86, K.D.A. Colony, Jajmau, Kanpur, Uttar Pradesh 208010',
  phones: ['+91 79067 86485', '+91 94518 75234'],
  emails: ['ssindosolargroup@gmail.com', 'ssindosolar@waareepartners.com'],
  gst: '09ADSFS9952N1ZQ',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '917906786485',
  indiamart: 'https://www.indiamart.com/ssindosolar/',
  instagram: 'https://www.instagram.com/ssindoorsolar123/',
  description:
    'SS Indo Solar is a solar EPC company and wholesale distributor in Jajmau, Kanpur. Rooftop on-grid, off-grid, solar pumps and water heaters. 500+ systems commissioned. UPNEDA-empanelled PM Surya Ghar vendor.',
};

const IMG = 'https://5.imimg.com/data5';
export type Product = { name: string; note: string; price?: string; img: string };
export type Category = { slug: string; title: string; blurb: string; products: Product[] };

export const CATEGORIES: Category[] = [
  { slug: 'solar-panel', title: 'Solar Panels', blurb: 'Poly, mono and Mono PERC modules for homes, shops and factories.',
    products: [
      { name: '60 Cells Polycrystalline Solar PV', note: 'Residential rooftop', img: `${IMG}/SELLER/Default/2022/5/IP/TU/HM/47180290/60-cells-polycrystaline-solar-pv-125x125.jpg` },
      { name: '36 Cell Monocrystalline Module', note: 'Off-grid & small systems', img: `${IMG}/SELLER/Default/2022/5/PC/GA/ZC/47180290/36monocrystaline-solar-pv-module-125x125.jpg` },
      { name: 'Crystalline PERC Module 72 Cells', note: 'Commercial rooftops', img: `${IMG}/SELLER/Default/2022/5/ZX/GL/SP/47180290/72-cells-mono-perc-solar-pv-module-125x125.jpg` },
      { name: '144 Half-Cell Mono PERC Module', note: 'High efficiency', img: `${IMG}/SELLER/Default/2022/5/VH/VK/PH/47180290/144half-cell-mono-perc-solar-pv-module-125x125.jpg` },
      { name: 'Mono PERC Solar PV Module', note: 'All-round performer', img: `${IMG}/SELLER/Default/2022/5/QJ/WF/YG/47180290/mono-perc-solar-pv-module-125x125.jpg` },
    ] },
  { slug: 'solar-pv-module', title: 'PV Modules', blurb: 'Waaree AC modules and bifacial options.',
    products: [
      { name: '72 Solar PV Module', note: 'Large-format module', img: `${IMG}/SELLER/Default/2022/5/FI/GS/DP/47180290/72-solar-pv-module-125x125.jpg` },
      { name: 'Waaree WSM 335 AC Solar Panel', note: 'Built-in micro inverter', img: `${IMG}/SELLER/Default/2022/5/ZZ/VE/BL/47180290/wsm-ac-module-125x125.jpg` },
      { name: 'Mono PERC Bifacial Module', note: 'Generates from both sides', img: `${IMG}/SELLER/Default/2022/5/QO/PL/MF/47180290/mono-perc-b1-facial-solar-pv-module-125x125.jpg` },
    ] },
  { slug: 'solar-water-heater', title: 'Solar Water Heaters', blurb: 'Waaree ETC heaters that cut your electricity bill.',
    products: [
      { name: '100 LPD Waaree ETC Solar Water Heater', note: 'For 3-4 people', price: '₹13,500 / unit', img: `${IMG}/PM/KN/KU/SELLER-47180290/100lpd-waaree-etc-solar-water-heater-125x125.jpg` },
      { name: '200 LPD Waaree ETC Solar Water Heater', note: 'Large families / commercial', price: '₹22,500 / unit', img: `${IMG}/QE/NC/YJ/SELLER-47180290/150lpd-waaree-etc-solar-water-heater-125x125.jpg` },
    ] },
  { slug: 'solar-inverter', title: 'Solar Inverters', blurb: 'Single-phase and three-phase.',
    products: [
      { name: 'Air Single Phase Inverter', note: 'Home systems', img: `${IMG}/SELLER/Default/2022/5/EU/IS/DW/47180290/air-single-phase-inverter-125x125.jpg` },
      { name: 'W1 Single Phase Inverter', note: 'Home & shop', img: `${IMG}/SELLER/Default/2022/5/GW/SC/JV/47180290/w1-single-phase-inverter-125x125.jpg` },
      { name: 'W3-60 Three Phase Inverter', note: 'Commercial / industrial', img: `${IMG}/SELLER/Default/2022/5/MY/IQ/KZ/47180290/w3-60-three-phase-inverter-125x125.jpg` },
      { name: 'Mini Single Phase Inverter', note: 'Compact systems', img: `${IMG}/SELLER/Default/2022/5/QI/HW/VC/47180290/mini-single-phase-inverter-125x125.jpg` },
    ] },
  { slug: 'batteries', title: 'Batteries', blurb: 'Tubular, VRLA and Li-ion backup.',
    products: [
      { name: 'Solar Tubular Batteries', note: 'Long cycle life', img: `${IMG}/SELLER/Default/2022/5/UN/MT/TD/47180290/solar-tubular-batteries-125x125.jpg` },
      { name: 'VRLA Batteries', note: 'Maintenance-free', img: `${IMG}/SELLER/Default/2022/5/MQ/GD/XI/47180290/vrla-batteries-125x125.jpg` },
      { name: 'LG Li-ion Battery', note: 'Lithium backup', img: `${IMG}/SELLER/Default/2022/5/TR/CM/TA/47180290/li-ion-batteries-125x125.jpg` },
    ] },
  { slug: 'street-light-pump', title: 'Street Lights & Pumps', blurb: 'Outdoor lighting and water pumping.',
    products: [
      { name: 'All-in-One Solar Street Light', note: 'Roads, campuses, farms', img: `${IMG}/SELLER/Default/2022/5/ZT/AR/HR/47180290/all-in-one-solar-street-light-125x125.jpg` },
      { name: 'Electric Water Pump', note: 'Domestic & agri use', img: `${IMG}/SELLER/Default/2022/5/JH/TC/KY/47180290/electric-water-pump-125x125.jpg` },
    ] },
];

export type Project = { slug: string; title: string; capacity: string; kind: string; place: string };
export const PROJECTS: Project[] = [
  { slug: 'darul-uloom-deoband', title: 'Darul Uloom Deoband', capacity: '300 kW', kind: 'On-grid solar plant', place: 'Deoband' },
  { slug: 'vidyagyan-school-sitapur', title: 'Vidyagyan School', capacity: '300 kW', kind: 'Solar project', place: 'Sitapur' },
  { slug: 'aki-magarwara-unnao', title: 'AKI Magarwara', capacity: '50 kW', kind: 'On-grid solar plant', place: 'Magarwara, Unnao' },
  { slug: 'dts-madarsa-jajmau-kanpur', title: 'DTS Madarsa', capacity: '25 kW', kind: 'On-grid solar plant', place: 'Jajmau, Kanpur' },
  { slug: 'govt-high-school-mambakkam-chennai', title: 'Govt. High School Mambakkam', capacity: 'Off-grid', kind: 'Off-grid solar project', place: 'Chennai' },
  { slug: 'solar-water-pump-chaudagra-fatehpur', title: 'Solar Water Pump', capacity: '5 HP', kind: 'Irrigation pump', place: 'Chaudagra, Fatehpur' },
];

export const STEPS = [
  { slug: 'civil-foundation', title: 'Civil foundation' },
  { slug: 'structure-mounting', title: 'Structure mounting' },
  { slug: 'dc-ac-cabling', title: 'DC / AC cabling' },
  { slug: 'earthing', title: 'Earthing' },
  { slug: 'lightning-arrestor', title: 'Lightning arrestor (LA)' },
];

export const SERVICES = [
  { title: 'Grid-tied rooftop', text: 'Cut your electricity bill or export surplus power through net metering. Residential, commercial and industrial.' },
  { title: 'Off-grid systems', text: 'Uninterrupted power with battery backup, independent of the utility grid.' },
  { title: 'Solar thermal', text: 'Waaree water heaters delivering 60 to 90 degree hot water for homes, hospitals, hostels and industry.' },
  { title: 'Solar pumps', text: 'Irrigation pumps with PM-KUSUM subsidy or direct purchase. Also atta chakki and aara machines.' },
  { title: 'Commercial & Industrial', text: 'String inverters from 25 kW to 110 kW and large plants.' },
  { title: 'O&M', text: 'Module cleaning, monitoring and 24x7 service support.' },
];

export const CLIENTS = ['Residential', 'Industrial and institutions', 'Temples, mosques and gurudwaras', 'Hospitals, petrol pumps and malls', 'Farmers, atta chakki and aara machines', 'Government buildings, schools and gaushalas'];
export const BRANDS = ['Waaree', 'Vikram Solar', 'Canadian Solar', 'Jakson', 'Solis', 'Sofar Solar', 'Amrut Energy', 'Statcon Energiaa'];

export const FAQS = [
  { q: 'What does SS Indo Solar do?', a: 'SS Indo Solar is a Kanpur-based solar EPC company and wholesale distributor. We handle design, equipment, installation, commissioning, net-metering paperwork and O&M under one contract.' },
  { q: 'Is SS Indo Solar an approved PM Surya Ghar vendor?', a: 'Yes. On 10-06-2025, UPNEDA empanelled SS Indo Solar as a vendor for residential rooftop solar installation in Uttar Pradesh under PM Surya Ghar / Grid Connected Solar Rooftop Programme Phase-II.' },
  { q: 'Where is the office?', a: 'MIG 86, K.D.A. Colony, Jajmau, Kanpur, Uttar Pradesh 208010.' },
  { q: 'Which projects have you completed?', a: 'Darul Uloom Deoband 300 kW, Vidyagyan School Sitapur 300 kW, AKI Magarwara Unnao 50 kW, DTS Madarsa Jajmau 25 kW, Govt. High School Mambakkam Chennai (off-grid) and a 5 HP solar pump in Fatehpur.' },
  { q: 'Do you help with subsidy and finance?', a: 'We guide residential customers on PM Surya Ghar and farmers on PM-KUSUM. We also help with MSME, NBFC, SIDBI and bank finance, and advise on 80% accelerated depreciation for commercial rooftop systems.' },
  { q: 'What is the price of a solar water heater?', a: 'As per our IndiaMART listing, the 100 LPD Waaree ETC heater is Rs 13,500 and the 200 LPD is Rs 22,500 per unit. Message us on WhatsApp for the final price.' },
  { q: 'Which brands do you work with?', a: 'Waaree, Vikram Solar, Canadian Solar, Jakson, Solis, Sofar Solar, Amrut Energy and Statcon Energiaa.' },
];

export const KNOWLEDGE = `Business: ${SITE.name} (${SITE.tagline}), ${SITE.address}. Solar EPC company and wholesale distributor. Owner: ${SITE.owner}. GST ${SITE.gst}. Phones ${SITE.phones.join(', ')}. Emails ${SITE.emails.join(', ')}.
UPNEDA empanelled vendor for PM Surya Ghar residential rooftop solar in Uttar Pradesh (approved 10-06-2025). Brochure claims 500+ SPV systems commissioned, 24x7 support, operating in UP, Chennai, Delhi NCR.
Services: ${SERVICES.map(s => s.title + ': ' + s.text).join(' | ')}. Finance: MSME/NBFC/SIDBI/bank assistance, 80% accelerated depreciation for commercial rooftop, PM-KUSUM for farmers.
Projects: ${PROJECTS.map(p => p.title + ' ' + p.capacity + ' ' + p.kind + ' ' + p.place).join('; ')}.
Brands: ${BRANDS.join(', ')}.
Products: ${CATEGORIES.map(c => c.title + ' (' + c.products.map(p => p.name + (p.price ? ' ' + p.price : '')).join('; ') + ')').join(' | ')}.
Payment: Cash, Cheque, DD. Shipment by road.`;
