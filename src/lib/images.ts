export const IMG = {
  sunset: '/img/hero-sunset.webp', house: '/img/house-roof.webp', field: '/img/field-blue.webp', installers: '/img/installers.webp', heaters: '/img/heaters.webp',
  carport: '/img/carport.webp', pergola: '/img/pergola.webp', carportWide: '/img/carport-wide.webp', worker: '/img/worker.webp', school: '/img/school-roof.webp',
  longArray: '/img/long-array.webp', fieldRoof: '/img/field-roof.webp', roofInstall: '/img/roof-install.webp', roofMosque: '/img/roof-mosque.webp', roofTilt: '/img/roof-tilt.webp',
  roofSheet: '/img/roof-sheet.webp', carportStructure: '/img/carport-structure.webp', inverterWiring: '/img/inverter-wiring.webp', inverterWall: '/img/inverter-wall.webp',
  netMeter: '/img/net-meter.webp', roofFrame: '/img/roof-frame.webp', handsFix: '/img/hands-fix.webp', pump: '/img/pump-field.webp', diagram: '/img/diagram-house.webp',
};
export const HERO = [
  { img: IMG.sunset, title: 'Solar for every roof', sub: 'Residential, commercial and industrial', href: '/services' },
  { img: IMG.house, title: 'Homes that run on sunlight', sub: 'PM Surya Ghar approved vendor', href: '/services' },
  { img: IMG.installers, title: 'Installed by our own crew', sub: 'Survey to commissioning', href: '/installation' },
  { img: IMG.field, title: 'From 5 kW to 300 kW', sub: 'See our projects', href: '/projects' },
  { img: IMG.heaters, title: 'Waaree solar water heaters', sub: 'Hot water without the bill', href: '/products' },
];
export const PROJECT_FALLBACK: Record<string, string> = {
  'darul-uloom-deoband': IMG.longArray, 'vidyagyan-school-sitapur': IMG.school, 'aki-magarwara-unnao': IMG.fieldRoof,
  'dts-madarsa-jajmau-kanpur': IMG.roofMosque, 'govt-high-school-mambakkam-chennai': IMG.roofTilt, 'solar-water-pump-chaudagra-fatehpur': IMG.pump,
};
export const STEP_FALLBACK: Record<string, string | undefined> = { 'civil-foundation': IMG.carportStructure, 'structure-mounting': IMG.roofFrame, 'dc-ac-cabling': IMG.inverterWiring };
