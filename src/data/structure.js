/**
 * Language-independent structure.
 *
 * Anything that is not prose — ids, icon names, accent tones, ordering,
 * proficiency levels, tech names, contact endpoints — lives here so the two
 * translation files only ever carry text and cannot drift out of shape.
 */

export const contact = {
  email: 'moshtaqkaid6@gmail.com',
  phone: '+966535319612',
  whatsapp: '966535319612',
  github: 'https://github.com/moshtaqalwtr',
}

/**
 * CV files in public/cv. Sizes are shown in the download menu so nobody on
 * mobile data starts a 5.7MB download without knowing.
 */
export const resumes = [
  { lang: 'ar', file: 'cv/moshtaq-alwtr-cv-ar.pdf', sizeMB: '5.7', pages: 1 },
  { lang: 'en', file: 'cv/moshtaq-alwtr-cv-en.pdf', sizeMB: '0.4', pages: 2 },
]

/** Section ids, in render order. Drives the nav, the rail and the observer. */
export const sectionIds = [
  'home',
  'about',
  'skills',
  'projects',
  'services',
  'process',
  'contact',
]

export const statsMeta = [
  { id: 'years', value: 5, suffix: '+' },
  { id: 'projects', value: 30, suffix: '+' },
  { id: 'systems', value: 6, suffix: '' },
  { id: 'delivery', value: 100, suffix: '%' },
]

/** level: 1-5, rendered as a segmented meter rather than a percentage. */
export const skillGroupsMeta = [
  {
    id: 'frontend',
    icon: 'Layout',
    tone: 'brand-2',
    skills: [
      { name: 'React', level: 5 },
      { name: 'JavaScript ES6+', level: 5 },
      { name: 'TailwindCSS', level: 5 },
      { name: 'HTML5 / CSS3', level: 5 },
      { name: 'Redux / Context', level: 4 },
    ],
  },
  {
    id: 'backend',
    icon: 'Server',
    tone: 'brand',
    skills: [
      { name: 'Laravel / PHP', level: 5 },
      { name: 'Node.js / Express', level: 4 },
      { name: 'REST APIs', level: 5 },
      { name: 'MySQL / PostgreSQL', level: 5 },
      { name: 'MongoDB', level: 3 },
    ],
  },
  {
    id: 'mobile',
    icon: 'Smartphone',
    tone: 'brand-3',
    skills: [
      { name: 'Android / Kotlin', level: 4 },
      { name: 'React Native', level: 4 },
      { name: 'Firebase / Push', level: 4 },
      { name: 'Maps & GPS', level: 5 },
    ],
  },
  {
    id: 'tooling',
    icon: 'Wrench',
    tone: 'brand-2',
    skills: [
      { name: 'Git / GitHub', level: 5 },
      { name: 'Linux / VPS', level: 4 },
      { name: 'Payment gateways', level: 4 },
      { name: 'SEO / Performance', level: 4 },
    ],
  },
]

/**
 * visual: which abstract UI mock ProjectVisual renders for this project.
 * tone: hue used for the card accent, expressed as an HSL hue so it reads
 *       correctly against both a near-black and a near-white surface.
 */
export const projectsMeta = [
  {
    id: 'fawtra',
    icon: 'Receipt',
    category: 'systems',
    featured: true,
    visual: 'dashboard',
    hue: 22,
    stack: ['Laravel', 'React', 'MySQL', 'REST API', 'TailwindCSS'],
  },
  {
    id: 'wireFactory',
    icon: 'Factory',
    category: 'systems',
    featured: true,
    visual: 'factory',
    hue: 200,
    stack: ['Laravel', 'React', 'MySQL', 'Chart.js'],
  },
  {
    id: 'hajjTracking',
    icon: 'MapPin',
    category: 'apps',
    featured: true,
    visual: 'map',
    hue: 168,
    stack: ['Android', 'Firebase', 'Google Maps API', 'Node.js'],
  },
  {
    id: 'couriers',
    icon: 'Bike',
    category: 'platforms',
    featured: true,
    visual: 'subscriptions',
    hue: 42,
    stack: ['Laravel', 'React', 'React Native', 'MySQL'],
  },
  {
    id: 'aqdi',
    icon: 'FileSignature',
    category: 'platforms',
    featured: true,
    visual: 'contract',
    hue: 258,
    stack: ['Laravel', 'React', 'MySQL', 'REST API'],
  },
  {
    id: 'ecommerce',
    icon: 'ShoppingCart',
    category: 'stores',
    featured: false,
    visual: 'store',
    hue: 345,
    stack: ['Laravel', 'React', 'MySQL', 'SEO'],
  },
]

export const servicesMeta = [
  { id: 'web', icon: 'Globe' },
  { id: 'mobile', icon: 'Smartphone' },
  { id: 'erp', icon: 'Database' },
  { id: 'store', icon: 'ShoppingBag' },
  { id: 'api', icon: 'Plug' },
  { id: 'seo', icon: 'Search' },
]

export const whyMeMeta = [
  { id: 'quality', icon: 'ShieldCheck' },
  { id: 'clarity', icon: 'ListChecks' },
  { id: 'modern', icon: 'Rocket' },
  { id: 'support', icon: 'Headphones' },
]

export const processMeta = ['discover', 'proposal', 'design', 'data', 'build', 'test', 'launch']
