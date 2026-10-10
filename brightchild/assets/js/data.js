/* ============================================================
   BrightChild — sample data layer
   ------------------------------------------------------------
   All children, stories, statistics and testimonials on this
   site are FICTIONAL SAMPLE CONTENT for a design prototype.
   Nothing here represents a real beneficiary, verified
   campaign figure, or real organisation endorsement.
   Replace this file with real, safeguarded data later.
   ============================================================ */

/* Currency: sample display rates only — structure is ready for
   a real dynamic exchange-rate feed later (see currency.js). */
const SAMPLE_RATES = {
  NGN: { symbol: '₦', usdPerUnit: 1 / 1330, gbpPerUnit: 1 / 1780 },
  USD: { symbol: '$', usdPerUnit: 1, gbpPerUnit: 0.758 },
  GBP: { symbol: '£', usdPerUnit: 1.319, gbpPerUnit: 1 },
};
const SAMPLE_MIN_DONATION = { NGN: 5000, USD: 5, GBP: 5 };

/* ---------------------------------------------- Featured children */
const CHILDREN = [
  {
    id: 'amina',
    firstName: 'Amina',
    age: 8,
    location: 'Kano, Nigeria',
    category: 'Medical Care',
    categoryKey: 'medical',
    accent: 'coral',
    seed: 'BC-Amina',
    campaignTitle: 'Help Amina Continue Her Treatment',
    story: 'Amina needs support toward ongoing medical treatment and essential care.',
    about: 'Amina is a cheerful eight-year-old who loves drawing birds and reading picture books with her older cousins. Her family is focused on keeping up with her ongoing treatment and everyday care, and they are doing everything they can to keep her smiling through it all.',
    currentNeed: 'Continued medical treatment, regular check-ups, medication, and transport support for clinic visits over the coming months.',
    howHelps: [
      'Clinic visits and treatment sessions',
      'Essential medication and supplies',
      'Transport support for regular appointments',
      'Nutritious meals to aid her recovery',
    ],
    target: 2000000,
    raised: 850000,
    updates: [
      { date: 'September 2026', text: 'Medical treatment successfully funded for this stage. Thank you to everyone who gave.' },
      { date: 'August 2026', text: 'Amina attended her scheduled clinic review. Her care team shared encouraging progress.' },
      { date: 'July 2026', text: 'Campaign opened with support for treatment, medication, and transport to appointments.' },
    ],
  },
  {
    id: 'daniel',
    firstName: 'Daniel',
    age: 10,
    location: 'Lagos, Nigeria',
    category: 'Education',
    categoryKey: 'education',
    accent: 'blue',
    seed: 'BC-Daniel',
    campaignTitle: 'Keep Daniel in School',
    story: 'Daniel dreams of staying in school and building a better future through education.',
    about: 'Daniel is a curious ten-year-old who loves mathematics and dreams of becoming an engineer. He walks to school with his neighbourhood friends and never misses a chance to show his exercise books to visitors.',
    currentNeed: 'School fees, a full set of learning materials, a school uniform, and exam support for the academic year.',
    howHelps: [
      'School fees for the academic year',
      'Books, stationery and learning materials',
      'Uniform and school shoes',
      'Exam registration support',
    ],
    target: 750000,
    raised: 420000,
    updates: [
      { date: 'September 2026', text: 'New term placement confirmed with your support. Daniel starts the term fully prepared.' },
      { date: 'August 2026', text: 'Learning materials purchased: textbooks, exercise books and a school bag.' },
      { date: 'June 2026', text: 'Campaign opened to cover school fees and essential learning materials.' },
    ],
  },
  {
    id: 'grace',
    firstName: 'Grace',
    age: 6,
    location: 'Benue, Nigeria',
    category: 'Food & Nutrition',
    categoryKey: 'food',
    accent: 'green',
    seed: 'BC-Grace',
    campaignTitle: 'Nutritious Support for Grace',
    story: 'Grace needs consistent nutritional support and access to essential food supplies.',
    about: 'Grace is a bright six-year-old who loves singing and playing skipping games with her friends. Her family is working hard, and steady nutritional support will help her grow, learn, and stay full of energy.',
    currentNeed: 'Consistent nutritious meals, fortified supplements, and essential food supplies for her household over the next several months.',
    howHelps: [
      'Nutritious meals and staple food supplies',
      'Fortified supplements for healthy growth',
      'Cooking essentials for her household',
      'Regular nutrition check-ins',
    ],
    target: 500000,
    raised: 275000,
    updates: [
      { date: 'September 2026', text: 'Monthly food supplies delivered. Grace and her family send their warm thanks.' },
      { date: 'August 2026', text: 'Nutrition support plan agreed with her household for consistent monthly deliveries.' },
      { date: 'July 2026', text: 'Campaign opened to provide steady nutritional support for Grace.' },
    ],
  },
  {
    id: 'samuel',
    firstName: 'Samuel',
    age: 12,
    location: 'Abuja, Nigeria',
    category: 'Shelter & Basic Needs',
    categoryKey: 'shelter',
    accent: 'yellow',
    seed: 'BC-Samuel',
    campaignTitle: 'A Safe Space for Samuel',
    story: 'Samuel needs a safe environment and essential support while his family rebuilds.',
    about: 'Samuel is a thoughtful twelve-year-old who loves football and fixing things with his hands. His family is rebuilding after a difficult period, and steady support is helping keep his world stable, safe, and full of hope.',
    currentNeed: 'Safe housing contributions, clothing, hygiene supplies, and household essentials while his family gets back on their feet.',
    howHelps: [
      'Contributions toward safe, stable housing',
      'Clothing and footwear',
      'Hygiene and household essentials',
      'School continuity support during rebuilding',
    ],
    target: 1200000,
    raised: 680000,
    updates: [
      { date: 'September 2026', text: 'Housing contribution paid for this quarter. Samuel’s family is settling in well.' },
      { date: 'August 2026', text: 'Clothing, footwear and hygiene essentials provided for Samuel and his siblings.' },
      { date: 'June 2026', text: 'Campaign opened to support Samuel’s family while they rebuild.' },
    ],
  },
];

/* ------------------------------------------------------- Causes */
const CAUSES = [
  { key: 'medical',  icon: '🏥', title: 'Medical Care',
    text: 'Help children access treatment, medication, medical procedures, and essential healthcare.',
    color: 'coral' },
  { key: 'education', icon: '📚', title: 'Education',
    text: 'Support school fees, learning materials, uniforms, technology, and educational opportunities.',
    color: 'blue' },
  { key: 'food',      icon: '🍚', title: 'Food & Nutrition',
    text: 'Help provide nutritious meals and essential food support.',
    color: 'green' },
  { key: 'shelter',   icon: '🏠', title: 'Shelter',
    text: 'Help children access safe housing and essential living conditions.',
    color: 'yellow' },
  { key: 'basics',    icon: '👕', title: 'Basic Needs',
    text: 'Provide clothing, hygiene supplies, mobility aids, and other essentials.',
    color: 'pink' },
  { key: 'emergency', icon: '🆘', title: 'Emergency Support',
    text: 'Respond to urgent situations affecting children\'s safety and wellbeing.',
    color: 'orange' },
];

/* ------------------------------------------ Sample statistics */
const STATS = [
  { value: 10000, suffix: '+', label: 'Children Supported' },
  { value: 35,    suffix: '+', label: 'Communities Reached' },
  { value: 20,    suffix: '+', label: 'Countries' },
  { value: 100,   prefix: '₦', suffix: 'M+', label: 'Support Delivered' },
];

/* ---------------------- Sample donor testimonials (fictional) */
const TESTIMONIALS = [
  { name: 'Chidinma O.', role: 'Monthly donor · Lagos',
    quote: 'Getting an update that a child completed a stage of treatment made my month. Knowing exactly where my giving goes keeps me giving.', accent: 'coral' },
  { name: 'David M.', role: 'First-time donor · London',
    quote: 'The campaign pages are so clear — I could see the target, the progress, and the story behind every child. It made giving feel personal.', accent: 'blue' },
  { name: 'Fatima A.', role: 'Monthly donor · Abuja',
    quote: 'I support a general fund every month. Seeing the impact stories each quarter reminds me that small, steady kindness adds up.', accent: 'green' },
];

/* ------------------------------------- Impact story highlights */
const IMPACT_STORIES = [
  { title: 'Education', seed: 'BC-Impact-Edu', accent: 'blue',
    text: 'Learning materials and school-fee support helped children stay in classrooms this term — with attendance rising across the campaigns you funded.' },
  { title: 'Healthcare', seed: 'BC-Impact-Health', accent: 'coral',
    text: 'Treatment-stage funding meant children like Amina (sample profile) could continue care without interruption. Steady support, steady progress.' },
  { title: 'Essential Needs', seed: 'BC-Impact-Needs', accent: 'green',
    text: 'Food supplies, clothing and hygiene essentials reached households rebuilding after hardship — small dignities that make a big difference.' },
];

const NAV_LINKS = [
  { label: 'Home',         href: 'index.html' },
  { label: 'Children',     href: 'index.html#children' },
  { label: 'Causes',       href: 'index.html#causes' },
  { label: 'Our Impact',   href: 'index.html#impact' },
  { label: 'About Us',     href: 'index.html#about' },
  { label: 'How It Works', href: 'index.html#how-it-works' },
];
