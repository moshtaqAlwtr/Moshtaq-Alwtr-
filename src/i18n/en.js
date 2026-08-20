export default {
  meta: {
    title: 'Moshtaq Alwtr — Software Engineer | React · Laravel · Node.js',
    description:
      'Moshtaq Alwtr — Full Stack software engineer specialising in React, Laravel and Node.js. ERP systems, e-commerce, manufacturing systems and mobile apps.',
  },

  ui: {
    switchLang: 'العربية',
    langShort: 'ع',
    toLight: 'Light mode',
    toDark: 'Dark mode',
    menu: 'Menu',
    close: 'Close',
    copy: 'Copy',
    copied: 'Copied',
    backToTop: 'Back to top',
    scroll: 'Scroll down',
  },

  nav: {
    home: 'Home',
    about: 'About',
    skills: 'Skills',
    projects: 'Work',
    services: 'Services',
    process: 'Process',
    contact: 'Contact',
    cta: "Let's talk",
  },

  profile: {
    name: 'Moshtaq Alwtr',
    firstName: 'Moshtaq',
    lastName: 'Alwtr',
    role: 'Full Stack Software Engineer',
    status: 'Available for new projects',
    location: 'Riyadh, Saudi Arabia',
    roles: [
      'I build complete ERP systems',
      'I ship fast React interfaces',
      'I design APIs in Laravel & Node',
      'I craft mobile applications',
    ],
  },

  hero: {
    greeting: "Hi, I'm",
    tagline:
      'I build web systems and mobile apps that solve real operational problems — from ERP platforms and online stores to manufacturing systems and live tracking apps.',
    viewWork: 'View my work',
    contactMe: 'Get in touch',
    experienceBadge: 'years experience',
  },

  stats: {
    years: 'Years experience',
    projects: 'Projects delivered',
    systems: 'Complete systems',
    delivery: 'On-time delivery',
  },

  about: {
    eyebrow: 'About me',
    title: "Not just a developer — I'm your technical partner",
    desc: 'I understand your business first, then build the system that actually serves it.',
    bio: [
      'Full Stack developer with hands-on experience building complete business systems from scratch to launch. I work on interfaces with React, on the server with Laravel and Node.js, and design databases and APIs that serve web and mobile alike.',
      'My focus is not only on writing code, but on understanding how the client actually operates first — how the factory runs, how an invoice moves, how a supervisor tracks their group — and then translating that into a system that is clear, fast and built to scale.',
      'I stay involved after delivery, acting as a long-term technical partner rather than a one-off contractor.',
    ],
    info: {
      name: 'Name',
      role: 'Focus',
      location: 'Location',
      status: 'Status',
      roleValue: 'Full Stack',
    },
    whyMe: {
      quality: {
        title: 'High quality standards',
        desc: 'Every project is built to strict quality and security standards, protecting user data and delivering an experience people can rely on.',
      },
      clarity: {
        title: 'Clear delivery stages',
        desc: 'A detailed technical and financial proposal covering scope, phases, timelines and features — so you know exactly what you get and when.',
      },
      modern: {
        title: 'Modern technology',
        desc: 'I use current tools and apply the technical standards that support your growth and any marketing you run later.',
      },
      support: {
        title: 'Ongoing support',
        desc: "My role doesn't end at launch — I stay on as your technical partner for maintenance, updates and new features.",
      },
    },
  },

  skills: {
    eyebrow: 'Technical skills',
    title: 'The technologies I work with',
    desc: 'A toolkit chosen because it gets the job done — from the interface all the way down to the database and the server.',
    groups: {
      frontend: 'Frontend',
      backend: 'Backend & databases',
      mobile: 'Mobile',
      tooling: 'Tooling & ops',
    },
  },

  projects: {
    eyebrow: 'Selected work',
    title: 'Systems I built from scratch',
    desc: 'Every project here solved a real operational problem. Open any card to read the full story.',
    filters: {
      all: 'All',
      systems: 'Systems',
      apps: 'Apps',
      platforms: 'Platforms',
      stores: 'Stores',
    },
    labels: {
      featured: 'Featured',
      details: 'View case study',
      problem: 'The problem',
      solution: 'What I built',
      features: 'Key features',
      stack: 'Tech stack',
      caseStudy: 'Case study',
    },
    items: {
      fawtra: {
        title: 'ERP Fawtra',
        subtitle: 'Enterprise resource planning',
        summary:
          'A complete ERP that unifies invoicing, inventory, accounting and customers on one platform, with e-invoicing support and a live reporting dashboard.',
        problem:
          'Small and mid-sized companies were running on scattered Excel files and separate tools for sales and stock, which caused balance mismatches and made closing the books painful.',
        solution:
          'I built a single system with a React interface and an interactive dashboard on top of a Laravel API, so every sale or purchase immediately updates both inventory and the accounting entries — no double entry.',
        features: [
          'Invoicing plus customer and supplier management',
          'Multi-warehouse inventory with full item movement history',
          'Chart of accounts with automatic journal entries',
          'Live profit, sales and inventory reporting',
          'Multi-user permissions and roles',
          'E-invoicing support with QR codes',
        ],
      },
      wireFactory: {
        title: 'Wire factory manufacturing system',
        subtitle: 'Production management & costing',
        summary:
          'A manufacturing system that tracks production orders from raw material to finished goods, calculating scrap and the true cost of every batch.',
        problem:
          'The factory had no idea what a produced tonne actually cost, or how much scrap each line generated, because everything was recorded by hand in paper ledgers.',
        solution:
          'I designed a system that links each production order to the raw material issued, the shift and the machine, so scrap and real cost per batch are calculated automatically and surfaced on a management dashboard.',
        features: [
          'Staged production orders with live status tracking',
          'Raw material and work-in-progress management',
          'Scrap and waste ratio per production line',
          'Actual cost calculated per batch',
          'Shift, machine and maintenance tracking',
          'Daily and monthly production reports',
        ],
      },
      hajjTracking: {
        title: 'Hajj pilgrim tracking',
        subtitle: 'Mobile app for group operators',
        summary:
          'A mobile app that lets Hajj group supervisors follow pilgrim locations live, with instant alerts the moment anyone leaves the designated area.',
        problem:
          'Pilgrims getting separated in dense crowds is every operator’s biggest worry, and searching for a missing pilgrim burns hours while putting them at risk.',
        solution:
          'I built an app around GPS tracking with geofences drawn over camps and holy sites. The supervisor is alerted within seconds when someone crosses a boundary, backed by a live map showing the whole group at once.',
        features: [
          'Live map of every member of the group',
          'Geofences with breach alerts',
          'One-tap emergency button for pilgrims',
          'Pilgrims organised into groups and supervisors',
          'Instant notifications and a digital ID card',
          'Works in both Arabic and English',
        ],
      },
      couriers: {
        title: 'Courier subscriptions platform',
        subtitle: 'Mobile app + admin dashboard',
        summary:
          'A two-sided platform: a mobile app for couriers and an admin dashboard managing subscriptions, renewals, payments and financial reporting.',
        problem:
          'Managing subscriptions for hundreds of couriers by hand meant forgotten renewals, uncollected payments and no clear picture of monthly revenue.',
        solution:
          'I built both sides: an app where a courier sees their subscription status, renews it and pays online, and a dashboard where management tracks active and expired subscriptions and revenue — with auto-renewal and alerts before expiry.',
        features: [
          'Multiple subscription tiers with auto-renewal',
          'Online payment with per-transaction status tracking',
          'Dashboard with statistics and charts',
          'Alerts before a subscription expires',
          'Courier, document and account management',
          'Financial reports with Excel and PDF export',
        ],
      },
      aqdi: {
        title: 'Aqdi — contracts platform',
        subtitle: 'Digital contracts & dispute resolution',
        summary:
          'A platform where two parties draft and sign a digital contract, and if a dispute arises, accredited lawyers on the platform take the case and track it through to closure.',
        problem:
          'Contracts between individuals and small businesses are improvised or left verbal, so when a disagreement surfaces neither side has a clear document to stand on — and finding a lawyer and following the case starts from zero.',
        solution:
          'I built a two-sided platform. The user side generates the contract from templates matched to the agreement type and records consent from both parties with an electronic signature and a timestamped history of every amendment. The lawyer side is a dashboard where disputes are assigned and hearings, documents and case status are tracked through to closure.',
        features: [
          'Contract templates matched to the agreement type',
          'Electronic signature with documented consent from both parties',
          'Timestamped history of every amendment',
          'Raise a dispute and assign it to a specialist lawyer',
          'Lawyer dashboard for cases and hearings',
          'Alerts for payment due dates and contract expiry',
        ],
      },
      ecommerce: {
        title: 'E-commerce store',
        subtitle: 'Full online retail platform',
        summary:
          'A complete online store with a fast storefront and a merchant dashboard, covering payments, shipping, inventory and discount coupons.',
        problem:
          'A merchant needs a store they genuinely own — full control over products, pricing and offers — instead of renting a hosted platform with monthly fees and restrictions.',
        solution:
          'I built a fast React storefront backed by a Laravel API, plus a dashboard where the merchant runs everything: products, orders, inventory, promotions and reports.',
        features: [
          'Product catalogue with categories and variants',
          'Smooth cart and checkout flow',
          'Multiple online payment gateways',
          'Order management and shipping states',
          'Coupons, offers and discounts',
          'SEO-ready with fast page loads',
        ],
      },
    },
  },

  services: {
    eyebrow: 'Services',
    title: 'What I can build for you',
    desc: 'A full range of development services — from the first idea through launch and ongoing support.',
    items: {
      web: {
        title: 'Web apps & websites',
        desc: 'Professional web systems with fast interfaces and complete admin panels that genuinely serve your business.',
      },
      mobile: {
        title: 'Mobile applications',
        desc: 'Android apps that are easy to use and highly interactive, with a carefully considered user experience.',
      },
      erp: {
        title: 'Business & ERP systems',
        desc: 'Accounting, inventory and manufacturing systems shaped around how your company actually operates.',
      },
      store: {
        title: 'E-commerce stores',
        desc: 'A store you fully own, with payment and shipping gateways, inventory management and sales reporting.',
      },
      api: {
        title: 'API integration',
        desc: 'Connecting your systems to each other and to external services: payments, shipping, messaging and e-invoicing.',
      },
      seo: {
        title: 'SEO & performance',
        desc: 'Technical structure and load speed that get your site into search results and in front of your customers.',
      },
    },
  },

  process: {
    eyebrow: 'How I work',
    title: 'From idea to launch in 7 steps',
    desc: 'A clear path where you always know exactly where your project stands — no surprises.',
    steps: {
      discover: {
        title: 'Understand the requirements',
        desc: 'A session to learn your business and exactly what you need, asking the questions that surface unstated requirements.',
      },
      proposal: {
        title: 'Analysis & proposal',
        desc: 'I analyse the project and give you a clear technical and financial proposal covering scope, phases and timelines.',
      },
      design: {
        title: 'Interface design',
        desc: 'Designing the UI and user experience and getting your sign-off before a single line of code is written.',
      },
      data: {
        title: 'Database & API design',
        desc: 'Structuring the database and APIs so future growth never requires a rebuild.',
      },
      build: {
        title: 'Development',
        desc: 'Building in stages with working previews delivered along the way, so you follow progress as it happens.',
      },
      test: {
        title: 'Testing & review',
        desc: 'Thorough testing of performance, security and user experience across devices and browsers.',
      },
      launch: {
        title: 'Launch & support',
        desc: 'Deploying and going live, then ongoing technical support, updates and new features as you need them.',
      },
    },
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Got a project in mind?',
    desc: "Tell me what you need and I'll come back with a clear proposal covering phases, timeline and cost.",
    channels: {
      whatsapp: 'WhatsApp',
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
    },
    fastest: 'Fastest reply',
    panel: {
      title: 'Let’s turn your idea into',
      titleAccent: 'something that works',
      desc: 'Whether you need a business system, an online store or a mobile app — start with a single message and we’ll work through the details together. The first consultation is free.',
      whatsappCta: 'Start a WhatsApp chat',
      emailCta: 'Send an email',
      emailSubject: 'Project enquiry',
      note: 'I usually reply within a few hours — Saturday to Thursday.',
    },
  },

  footer: {
    quickLinks: 'Quick links',
    contactHeading: 'Get in touch',
    rights: 'All rights reserved.',
    builtWith: 'Built with',
  },
}
