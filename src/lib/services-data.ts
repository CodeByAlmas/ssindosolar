export interface Svc { slug: string; short: string; title: string; eyebrow: string; img: string; lead: string; blurb: string; includes: string[]; steps: [string, string][]; extra?: { title: string; items: [string, string][] }; note?: string }

export const SVCS: Svc[] = [
  { slug: 'epc', short: 'EPC', title: 'EPC: from first meeting to a running plant', eyebrow: 'Engineering, Procurement and Construction', img: '/img/installers.webp',
    blurb: 'From client meeting, designing, installation to commissioning.',
    lead: 'One team, one contract. We take your project from the first client meeting to a plant that is generating and connected to the grid.',
    includes: ['Client meeting and requirement analysis', 'Feasibility analysis', 'Design and engineering', 'Procurement and supply of Tier-I equipment', 'Project management and logistics', 'Site installation', 'Testing and commissioning', 'Customer support, training and maintenance contracts'],
    steps: [['Client meeting', 'We listen to your load, budget and goals, and review your electricity bill.'], ['Designing', 'A layout and bill of material sized to your roof and your consumption.'], ['Installation', 'Civil work, structure, modules, cabling and earthing by our own crew.'], ['Commissioning', 'Testing, grid connection and handover with monitoring set up.']] },
  { slug: 'system-design', short: 'System Design', title: 'System design: layout, blueprint and site survey', eyebrow: 'Layout / Blueprint and Site Survey', img: '/img/roof-frame.webp',
    blurb: 'Layout, blueprint and site survey.',
    lead: 'A good plant starts on paper. We survey your site and prepare the layout and blueprint before a single module is ordered.',
    includes: ['Study of your electricity bill and net-metering policy', 'Site survey and roof viability check', 'Shading and weather data analysis', 'Structural design for maximum generation', 'Equipment selection', '2D/3D layout and blueprint'],
    steps: [['Site survey', 'We measure the roof or land, check shading, access and the electrical room.'], ['Layout', 'Module placement, string design and cable routes in a 2D/3D model.'], ['Blueprint', 'Structural and electrical drawings that the crew builds from.'], ['Review', 'You approve the design and the bill of material before work starts.']] },
  { slug: 'liasoning', short: 'Liasoning', title: 'Liasoning: net metering and grid approvals', eyebrow: 'Net metering, net feeding, net billing, gross metering', img: '/img/net-meter.webp',
    blurb: 'Net metering, net feeding, net billing and gross metering.',
    lead: 'Connecting to the grid means paperwork with the Discom and the state nodal agency. We handle every application and approval for you.',
    includes: ['Project registration at the State Nodal Agency', 'Application at the Discom zonal office', 'Approval from the circle officer', 'Electrical inspection approvals, where required', 'Net billing / feeding application', 'Bi-directional meter application'],
    steps: [['Register', 'Your project is registered with the state nodal agency.'], ['Apply', 'The Discom application is filed with the right documents.'], ['Approve', 'We follow up on approvals and inspections.'], ['Connect', 'The bi-directional meter is installed and your plant goes live.']],
    extra: { title: 'Which metering model applies to you?', items: [['Net metering', 'Units you export are set off against units you import. You pay only for the net difference.'], ['Net billing / net feeding', 'Exported units are credited at a defined rate and billed separately from your consumption.'], ['Gross metering', 'All the solar generation goes to the grid and is paid for, while your consumption is billed separately.']] },
    note: 'The model available to you depends on your state policy and your Discom. We confirm the current rules before we apply.' },
  { slug: 'amc', short: 'AMC', title: 'AMC: annual maintenance contract', eyebrow: 'Annual Maintenance Contract', img: '/img/worker.webp',
    blurb: 'Annual maintenance, with plant insurance support.',
    lead: 'A solar plant runs for 25 years. An AMC keeps it generating at its best for all of them, and keeps the investment protected.',
    includes: ['Monitoring of plant performance and energy generation', 'Routine maintenance of the plant and equipment', 'Emergency breakdown maintenance', 'Coordination with manufacturers for warranty support', 'Insurance of the plant: help in arranging cover for plant and equipment', 'Performance reports'],
    steps: [['Monitor', 'We watch generation and performance ratio through remote monitoring.'], ['Inspect', 'Scheduled visits to check modules, cables, earthing and the inverter.'], ['Repair', 'Fast response to breakdowns, with warranty claims handled for you.'], ['Report', 'You get a clear report of what the plant generated and what we did.']] },
  { slug: 'mcs', short: 'MCS', title: 'MCS: module cleaning system', eyebrow: 'Module Cleaning System', img: '/img/long-array.webp',
    blurb: 'Mechanized module cleaning.',
    lead: 'Dust and bird droppings quietly cut your generation. Regular, mechanized cleaning keeps every module working at full strength.',
    includes: ['Mechanized module cleaning', 'Water harvesting arrangement', 'Cleaning schedules that fit your site', 'Safe access for rooftop and ground-mounted plants', 'Part of your AMC, or as a stand-alone service'],
    steps: [['Assess', 'We check soiling levels, water availability and access.'], ['Plan', 'A cleaning schedule and method that suits the plant size.'], ['Clean', 'Mechanized cleaning without scratching the glass.'], ['Compare', 'We track generation before and after to show the difference.']] },
];

export interface SvcExtra { faq: [string, string][]; survey?: { check: [string, string[]][]; how: string[]; docs: string[] } }
export const SVC_EXTRA: Record<string, SvcExtra> = {
  epc: { faq: [
    ['What does EPC mean in solar?', 'EPC stands for Engineering, Procurement and Construction. One company designs the plant, buys the equipment and builds it, so you deal with one team, one contract and one bill.'],
    ['What is covered in a turnkey EPC contract?', 'The client meeting and design, supply of Tier-I equipment, installation, testing, commissioning and the paperwork to connect the plant to the grid. Maintenance can be added through an AMC.'],
    ['How long does a rooftop installation take?', 'It depends on the size of the system and on grid approvals. After the site survey and design we give you a clear schedule before work starts.'],
  ] },
  'system-design': { faq: [
    ['What is a solar site survey?', 'A visit in which we measure the roof or land, check shading and structure, and study the electrical room, so the design is right before any equipment is ordered.'],
    ['What documents do I need to share for a rooftop system?', 'Your existing electrical scheme, a layout or plot plan, electricity bills of the last 6 months, connected load details, structural approval for roof strength, the room layout for the inverter and LT panel, an earth resistivity test report and the building elevation drawing.'],
    ['What do you check during the survey?', 'On the roof: roof type, slab thickness, obstacles, pillars and cable routes. In the electrical room: power factor, breakers, bus bar, transformer and DG details. We also record photos and a slow video of the site.'],
  ],
  survey: {
    check: [
      ['On the roof', ['Type of roof (RCC or tiled) and age of the building', 'Number of floors and thickness of the RCC slab', 'Whether chemical anchoring is allowed for concrete pedestals', 'Protruding objects above the parapet: lift room, water tank, telecom tower', 'Pillars and beams, and whether pillars may be cut', 'A cable shaft from the terrace to the control room, or the best AC cable route', 'Distance from the terrace to the control room or ground', 'Corrosive or chemical surroundings, and electricity and water on site']],
      ['In the electrical room', ['Power factor at the client side', 'Existing cable entry in the LT room: trenching or cable tray', 'Vacant breaker: current and voltage rating, make and model', 'Bus bar type, aluminium or copper', 'Transformer: kVA rating, secondary voltage, %Z and vector group', 'DG sets, their rating and whether DG synchronization is wanted', 'Reverse power relay (RPR) for plants below 100 kW']],
    ],
    how: ['A Google Earth print-out of the site, taken before the visit', 'A rough sketch of the building with dimensions, parapet height and obstacles, and true south marked with a compass', 'AC cable route, inverter and ACCB location, lightning arrestor and earth pit locations marked on the print-out', 'Photos from the south, west, north and east', 'A slow video turning clockwise, starting and ending at south', 'Heights of nearby buildings and the distance between them, in a rough sketch'],
    docs: ['Existing electrical scheme', 'Layout or plot plan', 'Electricity bills of the last 6 months', 'Connected load details', 'Structural consultant approval for roof strength', 'Room layout for the inverter and LT panel', 'Electrical (earth) resistivity test report', 'Building elevation drawing'],
  } },
  liasoning: { faq: [
    ['What is liasoning in solar?', 'Liasoning means handling the registrations, applications and approvals needed to connect your plant to the grid, with the state nodal agency and the Discom.'],
    ['What is the difference between net metering, net billing and gross metering?', 'Net metering sets exported units off against imported units. Net billing credits exported units at a defined rate, billed separately from consumption. Gross metering sends all generation to the grid and bills your consumption separately.'],
    ['Which metering model will I get?', 'It depends on your state policy and your Discom. We confirm the current rules before we apply.'],
  ] },
  amc: { faq: [
    ['What is a solar AMC?', 'An Annual Maintenance Contract keeps your plant monitored and maintained, a year at a time: performance monitoring, routine and breakdown maintenance, and warranty coordination.'],
    ['Does an AMC include plant insurance?', 'We help you arrange insurance cover for the plant and equipment as part of the AMC.'],
    ['Why do I need an AMC?', 'Faults, loose connections and dirty modules lower generation silently. Regular checks catch them early and protect your savings.'],
  ] },
  mcs: { faq: [
    ['What is a module cleaning system (MCS)?', 'A mechanized method of cleaning solar modules that removes dust and bird droppings without scratching the glass.'],
    ['How often should solar modules be cleaned?', 'It depends on dust levels and rainfall at your site. We set a schedule after assessing the plant.'],
    ['Does cleaning really improve generation?', 'Dirty modules produce less power, so cleaning restores output. We track generation before and after to show you the difference.'],
  ] },
};
