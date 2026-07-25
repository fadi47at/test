// =========================================================
// Design Gallery — 20 websites, 3 creative variations each
// Each variation has full content + CSS theme overrides.
// =========================================================

// Common feature/icon sets, reused across designs
const COMMON_FEATURES = {
  fashion: [
    { icon: '✦', title: 'Hand-crafted', desc: 'Every piece is made by a single artisan from start to finish.' },
    { icon: '❋', title: 'Made in Paris', desc: 'Designed and produced in our atelier in the 1st arrondissement.' },
    { icon: '◈', title: 'Limited drops', desc: 'Small runs, no restocks. When it\'s gone, it\'s gone.' },
  ],
  travel: [
    { icon: '✺', title: 'Hand-picked routes', desc: 'Every itinerary designed by someone who has actually walked the path.' },
    { icon: '◉', title: 'Local guides', desc: 'Real locals, not actors. The people who make a place what it is.' },
    { icon: '➤', title: 'Small groups', desc: 'Max 8 people. No megabuses, no megaresorts, no megajetlags.' },
  ],
  architecture: [
    { icon: '◧', title: 'Built to last', desc: 'Materials and details chosen for the next century, not the next season.' },
    { icon: '◐', title: 'Light first', desc: 'We design around the path of the sun, not the path of the trend.' },
    { icon: '◇', title: 'Honest materials', desc: 'Concrete looks like concrete. Wood looks like wood. Nothing is faked.' },
  ],
  restaurant: [
    { icon: '✻', title: 'Seasonal menu', desc: 'We change the menu when the season does. No exceptions.' },
    { icon: '❦', title: 'Single kitchen', desc: 'Every dish from one pass, one chef, one fire.' },
    { icon: '✦', title: 'Reservations only', desc: 'No walk-ins. We promise you won\'t wait for a table.' },
  ],
  sustainability: [
    { icon: '❀', title: 'Carbon negative', desc: 'We don\'t just reduce — we remove more than we emit.' },
    { icon: '✿', title: 'Regenerative sourcing', desc: 'Every supplier is asked: does this make the land better?' },
    { icon: '✤', title: 'Plastic-free shipping', desc: 'Compostable mailers, recycled paper tape, mushroom packaging.' },
  ],
  music: [
    { icon: '♫', title: 'Lossless audio', desc: 'Studio-grade quality, not the compressed version everyone else ships.' },
    { icon: '◐', title: 'Curated daily', desc: 'Real humans, not algorithms. The same person who picks your mix.' },
    { icon: '♪', title: 'Offline first', desc: 'Download everything. Listen on a plane, on a train, on a desert island.' },
  ],
  crypto: [
    { icon: '◆', title: 'Self-custody', desc: 'You own your keys. Always. We never have access to your funds.' },
    { icon: '⌬', title: 'Audited contracts', desc: 'Every contract audited by three independent firms. Public reports.' },
    { icon: '◈', title: 'No gas surprises', desc: 'Predictable fees, batched transactions, no hidden costs.' },
  ],
  healthcare: [
    { icon: '✚', title: 'Licensed clinicians', desc: 'Real doctors, real therapists, not chatbots pretending to be either.' },
    { icon: '◉', title: 'Same-day visits', desc: 'Talk to someone today, not in three weeks. Every day of the week.' },
    { icon: '✦', title: 'Your data, your rules', desc: 'HIPAA-grade security, end-to-end encryption, export any time.' },
  ],
  aerospace: [
    { icon: '▲', title: 'Flight-proven', desc: 'Hardware that has actually been to space, not just in renderings.' },
    { icon: '✦', title: 'Mission-grade QA', desc: 'Every unit tested to NASA outgassing specs. We are the specs.' },
    { icon: '⌖', title: 'Real-time telemetry', desc: 'Stream every reading, every moment, every orbit.' },
  ],
  photography: [
    { icon: '◐', title: 'Original RAW files', desc: 'You get the full archive, not the curated highlights.' },
    { icon: '✦', title: 'Print-ready', desc: 'Delivered at 300dpi, color-managed, ready for the gallery wall.' },
    { icon: '◇', title: 'Unlimited revisions', desc: 'We shoot until you love every frame, not until the timer runs out.' },
  ],
  coffee: [
    { icon: '◉', title: 'Single-origin', desc: 'Every bag traceable to a single farm, a single harvest, a single roast.' },
    { icon: '☕', title: 'Roasted to order', desc: 'Shipped within 48 hours of leaving the drum. Always fresh.' },
    { icon: '✺', title: 'Direct trade', desc: 'We pay the farmer 3x the Fair Trade minimum. Always.' },
  ],
  events: [
    { icon: '✦', title: 'Single planner', desc: 'One person from first call to last dance. No hand-offs.' },
    { icon: '❀', title: 'Vendor-agnostic', desc: 'We don\'t take commissions. We recommend what\'s right for you.' },
    { icon: '◐', title: 'Day-of coordination', desc: 'We run the day. You live it. We handle every glitch in real time.' },
  ],
  art: [
    { icon: '◼', title: 'Direct from studio', desc: 'No middlemen, no markups, no reproductions. Original work only.' },
    { icon: '✦', title: 'Curated quarterly', desc: 'We show four artists a year, not forty. Each one gets a real show.' },
    { icon: '◇', title: 'Certificate of authenticity', desc: 'Signed, numbered, archived. Your piece is provably the one.' },
  ],
  fitness: [
    { icon: '◆', title: 'Real coaches', desc: 'Every program written by a coach with a national certification.' },
    { icon: '◐', title: 'Periodized training', desc: 'No random workouts. Cycles, deloads, progressive overload.' },
    { icon: '✦', title: 'Form-first', desc: 'We\'d rather you lift less with perfect form than more with bad form.' },
  ],
  publishing: [
    { icon: '❦', title: 'Author-friendly terms', desc: 'We pay advances. We pay royalties. We don\'t bury rights in fine print.' },
    { icon: '✦', title: 'Independent voice', desc: 'No corporate parent, no marketing department, no algorithmic shelf.' },
    { icon: '◐', title: 'Real distribution', desc: 'In independent bookstores across 12 countries. Not just on Amazon.' },
  ],
  agency: [
    { icon: '✺', title: 'Senior-only team', desc: 'No juniors learning on your dime. The people who pitch do the work.' },
    { icon: '◈', title: 'Fixed-price projects', desc: 'No hourly billing, no scope creep, no surprise invoices.' },
    { icon: '✦', title: 'We say no', desc: 'If a brief is bad for the brand, we say so. Even before signing.' },
  ],
  realestate: [
    { icon: '⌂', title: 'Off-market first', desc: 'We share listings with our clients 48 hours before they hit the public MLS.' },
    { icon: '◐', title: 'Local-only agents', desc: 'Each agent works one neighborhood, knows every block, every comp.' },
    { icon: '✦', title: 'No dual agency', desc: 'We never represent both sides. Your interests, full stop.' },
  ],
  education: [
    { icon: '✦', title: 'Self-paced', desc: 'Start today, finish when you finish. No cohorts, no deadlines.' },
    { icon: '◐', title: 'Project-based', desc: 'You graduate with a portfolio, not just a certificate.' },
    { icon: '✺', title: 'Real instructors', desc: 'People who do the thing for a living, not content marketers.' },
  ],
  ai: [
    { icon: '✦', title: 'Unlimited context', desc: 'We don\'t forget what you said three hours ago.' },
    { icon: '◐', title: 'Real code execution', desc: 'It runs your code, not just writes about your code.' },
    { icon: '✺', title: 'Agent-native', desc: 'Spins up sub-agents, runs them in parallel, ships the result.' },
  ],
};

// Quote and footer lines per category
const QUOTES = {
  fashion: { q: '"Fashion is not something that exists in dresses only. Fashion is in the sky, in the street."', a: '— Coco Chanel' },
  travel:  { q: '"Once a year, go somewhere you\'ve never been before."', a: '— Dalai Lama' },
  architecture: { q: '"Architecture is the will of an age conceived in spatial terms."', a: '— Mies van der Rohe' },
  restaurant: { q: '"Cooking is not about convenience. It\'s about love."', a: '— Daniel Boulud' },
  sustainability: { q: '"The Earth is what we all have in common."', a: '— Wendell Berry' },
  music: { q: '"Music expresses that which cannot be put into words and that which cannot remain silent."', a: '— Victor Hugo' },
  crypto: { q: '"Bitcoin is a remarkable cryptographic achievement and the ability to create something that is not duplicable in the digital world has enormous value."', a: '— Eric Schmidt' },
  healthcare: { q: '"The good physician treats the disease; the great physician treats the patient who has the disease."', a: '— William Osler' },
  aerospace: { q: '"That\'s one small step for man, one giant leap for mankind."', a: '— Neil Armstrong' },
  photography: { q: '"Photography is the story I fail to put into words."', a: '— Destin Sparks' },
  coffee: { q: '"I have measured out my life with coffee spoons."', a: '— T.S. Eliot' },
  events: { q: '"A wedding is a funeral for your single self."', a: '— Anon' },
  art: { q: '"Art is not what you see, but what you make others see."', a: '— Edgar Degas' },
  fitness: { q: '"The clock is ticking. Are you becoming the person you want to be?"', a: '— Greg Plitt' },
  publishing: { q: '"A book must be the axe for the frozen sea within us."', a: '— Franz Kafka' },
  agency: { q: '"A brand is the set of expectations, memories, stories, and relationships that, taken together, account for a consumer\'s decision to choose one product over another."', a: '— Seth Godin' },
  realestate: { q: '"The best investment on Earth is earth."', a: '— Louis Glickman' },
  education: { q: '"Education is the kindling of a flame, not the filling of a vessel."', a: '— Socrates' },
  ai: { q: '"AI is the new electricity. Just as electricity transformed industry after industry, AI will now do the same."', a: '— Andrew Ng' },
};

// Category-level theme defaults (so variations only need to override what changes)
const CATEGORY_DEFAULTS = {
  fashion:        { '--ff-display': "'Playfair Display', serif", '--ff-serif': "'Cormorant Garamond', serif", '--ff-sans': "'Inter', sans-serif", '--ff-mono': "'JetBrains Mono', monospace" },
  travel:         { '--ff-display': "'Inter', sans-serif", '--ff-serif': "'EB Garamond', serif", '--ff-sans': "'Inter', sans-serif", '--ff-mono': "'JetBrains Mono', monospace" },
  architecture:   { '--ff-display': "'Inter', sans-serif", '--ff-serif': "'EB Garamond', serif", '--ff-sans': "'Inter', sans-serif", '--ff-mono': "'JetBrains Mono', monospace" },
  restaurant:     { '--ff-display': "'Playfair Display', serif", '--ff-serif': "'EB Garamond', serif", '--ff-sans': "'Inter', sans-serif", '--ff-mono': "'JetBrains Mono', monospace" },
  sustainability: { '--ff-display': "'Inter', sans-serif", '--ff-serif': "'EB Garamond', serif", '--ff-sans': "'Inter', sans-serif", '--ff-mono': "'JetBrains Mono', monospace" },
  music:          { '--ff-display': "'Space Grotesk', sans-serif", '--ff-serif': "'EB Garamond', serif", '--ff-sans': "'Space Grotesk', sans-serif", '--ff-mono': "'JetBrains Mono', monospace" },
  crypto:         { '--ff-display': "'Space Grotesk', sans-serif", '--ff-serif': "'EB Garamond', serif", '--ff-sans': "'Inter', sans-serif", '--ff-mono': "'JetBrains Mono', monospace" },
  healthcare:     { '--ff-display': "'Inter', sans-serif", '--ff-serif': "'EB Garamond', serif", '--ff-sans': "'Inter', sans-serif", '--ff-mono': "'JetBrains Mono', monospace" },
  aerospace:      { '--ff-display': "'Space Grotesk', sans-serif", '--ff-serif': "'EB Garamond', serif", '--ff-sans': "'Inter', sans-serif", '--ff-mono': "'JetBrains Mono', monospace" },
  photography:    { '--ff-display': "'Cormorant Garamond', serif", '--ff-serif': "'EB Garamond', serif", '--ff-sans': "'Inter', sans-serif", '--ff-mono': "'JetBrains Mono', monospace" },
  coffee:         { '--ff-display': "'Playfair Display', serif", '--ff-serif': "'EB Garamond', serif", '--ff-sans': "'Inter', sans-serif", '--ff-mono': "'JetBrains Mono', monospace" },
  events:         { '--ff-display': "'Cormorant Garamond', serif", '--ff-serif': "'EB Garamond', serif", '--ff-sans': "'Inter', sans-serif", '--ff-mono': "'JetBrains Mono', monospace" },
  art:            { '--ff-display': "'Space Grotesk', sans-serif", '--ff-serif': "'EB Garamond', serif", '--ff-sans': "'Inter', sans-serif", '--ff-mono': "'JetBrains Mono', monospace" },
  fitness:        { '--ff-display': "'Bebas Neue', sans-serif", '--ff-serif': "'Inter', sans-serif", '--ff-sans': "'Inter', sans-serif", '--ff-mono': "'JetBrains Mono', monospace" },
  publishing:     { '--ff-display': "'Playfair Display', serif", '--ff-serif': "'EB Garamond', serif", '--ff-sans': "'Inter', sans-serif", '--ff-mono': "'JetBrains Mono', monospace" },
  agency:         { '--ff-display': "'Space Grotesk', sans-serif", '--ff-serif': "'EB Garamond', serif", '--ff-sans': "'Inter', sans-serif", '--ff-mono': "'JetBrains Mono', monospace" },
  realestate:     { '--ff-display': "'Playfair Display', serif", '--ff-serif': "'EB Garamond', serif", '--ff-sans': "'Inter', sans-serif", '--ff-mono': "'JetBrains Mono', monospace" },
  education:      { '--ff-display': "'Space Grotesk', sans-serif", '--ff-serif': "'EB Garamond', serif", '--ff-sans': "'Inter', sans-serif", '--ff-mono': "'JetBrains Mono', monospace" },
  ai:             { '--ff-display': "'Questrial', sans-serif", '--ff-serif': "'EB Garamond', serif", '--ff-sans': "'Inter', sans-serif", '--ff-mono': "'JetBrains Mono', monospace" },
};

const CATEGORY_KEYS = {
  fashion: 'fashion', travel: 'travel', Architecture: 'architecture', Restaurant: 'restaurant',
  Sustainability: 'sustainability', Music: 'music', Crypto: 'crypto', Healthcare: 'healthcare',
  Aerospace: 'aerospace', Photography: 'photography', Events: 'events', Art: 'art',
  Fitness: 'fitness', Publishing: 'publishing', Agency: 'agency',
  'Real Estate': 'realestate', Education: 'education', 'AI / Tech': 'ai',
};

// Helper to build a theme from overrides
function makeTheme(category, overrides = {}) {
  return { ...CATEGORY_DEFAULTS[category], ...overrides };
}

// =========================================================
// THE 20 DESIGNS
// =========================================================
const DESIGNS = [
  {
    id: 1, name: 'Lumière', category: 'Fashion', tag: 'Luxury fashion brand',
    thumb: 'thumbs/01_lumiere.png',
    desc: 'A high-end fashion house where the brand whispers rather than shouts.',
    url: 'lumiere.paris',
    content: { eyebrow: 'Haute Couture · Paris', cta: 'Discover the collection', quoteKey: 'fashion' },
    features: COMMON_FEATURES.fashion,
    variations: [
      { title: 'Pure White Minimalism', desc: 'A pristine white canvas with a single ultra-thin serif wordmark. No images on the hero — pure typographic confidence.', palette: ['#FFFFFF','#0A0A0A','#8A8A8A'], type: 'Playfair Display · thin', mood: 'Editorial · Gallery · Expensive',
        theme: makeTheme('fashion', { '--bg': '#FFFFFF', '--bg-soft': '#FAFAFA', '--ink': '#0A0A0A', '--ink-soft': '#5A5A5A', '--border': '#E0E0E0', '--border-soft': '#F5F5F5', '--chip-bg': '#F0F0F0', '--accent': '#0A0A0A', '--accent-2': '#0A0A0A' }) },
      { title: 'Noir Editorial', desc: 'Deep black with a single golden accent line. The logo hovers like a signature on a couture invitation.', palette: ['#000000','#1A1A1A','#C9A961'], type: 'Playfair Display italic · tracked', mood: 'Mysterious · Intimate · Couture',
        theme: makeTheme('fashion', { '--bg': '#000000', '--bg-soft': '#0A0A0A', '--ink': '#F5E6D3', '--ink-soft': '#A89F8A', '--border': '#2A2A2A', '--border-soft': '#1A1A1A', '--chip-bg': '#1A1A1A', '--accent': '#C9A961', '--accent-2': '#C9A961' }) },
      { title: 'Bone & Stone', desc: 'Warm bone-white with subtle paper texture, a single rust-orange logo. Tactile, like opening a fashion lookbook.', palette: ['#F5F0E8','#26251E','#C66B3D'], type: 'Playfair Display · regular', mood: 'Craft · Tactile · Slow-fashion',
        theme: makeTheme('fashion', { '--bg': '#F5F0E8', '--bg-soft': '#EAE3D5', '--ink': '#26251E', '--ink-soft': '#6B6450', '--border': '#D5CCB5', '--border-soft': '#E5DCC9', '--chip-bg': '#EAE3D5', '--accent': '#C66B3D', '--accent-2': '#C66B3D' }) },
    ],
  },
  {
    id: 2, name: 'Nomad', category: 'Travel', tag: 'Adventure travel agency',
    thumb: 'thumbs/02_nomad.png',
    desc: 'For restless souls chasing the next horizon. Warm and grounded.',
    url: 'nomad.travel',
    content: { eyebrow: 'Travel · Since 2018', cta: 'Start your journey', quoteKey: 'travel' },
    features: COMMON_FEATURES.travel,
    variations: [
      { title: 'Desert Sun', desc: 'Sand-beige with burnt orange typography and a single desert silhouette. The kind of warmth that feels like sun on skin.', palette: ['#E8D9B5','#C66B3D','#3D2817'], type: 'Inter bold · uppercase', mood: 'Warm · Earthy · Inviting',
        theme: makeTheme('travel', { '--bg': '#E8D9B5', '--bg-soft': '#DDCDAA', '--ink': '#3D2817', '--ink-soft': '#6B5235', '--border': '#C5B189', '--border-soft': '#D5C39C', '--chip-bg': '#D5C39C', '--accent': '#C66B3D', '--accent-2': '#3D2817' }) },
      { title: 'Map & Compass', desc: 'Aged-paper cream with a thin technical line drawing. Logo set in a vintage condensed serif.', palette: ['#F0E8D0','#3D2817','#8B4513'], type: 'Playfair Display · condensed', mood: 'Vintage · Exploratory · Detailed',
        theme: makeTheme('travel', { '--bg': '#F0E8D0', '--bg-soft': '#E5DDB8', '--ink': '#3D2817', '--ink-soft': '#6B4F2A', '--border': '#C5B189', '--border-soft': '#DDD3B0', '--chip-bg': '#E5DDB8', '--accent': '#8B4513', '--accent-2': '#3D2817' }) },
      { title: 'Bivouac Black', desc: 'Dark navy night sky with a single gold star. The logo glows softly. For those who travel by starlight.', palette: ['#0A0E1A','#D4A574','#F5F0E8'], type: 'Playfair Display · italic', mood: 'Night · Adventurous · Cinematic',
        theme: makeTheme('travel', { '--bg': '#0A0E1A', '--bg-soft': '#0F1424', '--ink': '#F5F0E8', '--ink-soft': '#A89F8A', '--border': '#1F2538', '--border-soft': '#15192A', '--chip-bg': '#15192A', '--accent': '#D4A574', '--accent-2': '#D4A574' }) },
    ],
  },
  {
    id: 3, name: 'Atelier', category: 'Architecture', tag: 'Architecture & interiors',
    thumb: 'thumbs/03_atelier.png',
    desc: 'An architecture firm where the page is the building: precise, intentional, breathing.',
    url: 'atelier.studio',
    content: { eyebrow: 'Architecture & Interiors', cta: 'View our work', quoteKey: 'architecture' },
    features: COMMON_FEATURES.architecture,
    variations: [
      { title: 'Pure White Space', desc: 'A near-empty white room. Logo set with massive letter-spacing — every pixel considered, nothing decorative.', palette: ['#FFFFFF','#0A0A0A','#E0E0E0'], type: 'Inter · 0.5em tracking', mood: 'Minimal · Spatial · Silent',
        theme: makeTheme('architecture', { '--bg': '#FFFFFF', '--bg-soft': '#FAFAFA', '--ink': '#0A0A0A', '--ink-soft': '#5A5A5A', '--border': '#E0E0E0', '--border-soft': '#F5F5F5', '--chip-bg': '#F0F0F0', '--accent': '#0A0A0A', '--accent-2': '#0A0A0A' }) },
      { title: 'Concrete Gray', desc: 'Warm concrete gray with sharp black typography. A single horizontal line that suggests a horizon. Brutalist without being cold.', palette: ['#C8C2B8','#1A1A1A','#F5F0E8'], type: 'Inter · medium', mood: 'Brutalist · Honest · Material',
        theme: makeTheme('architecture', { '--bg': '#C8C2B8', '--bg-soft': '#B5AFA5', '--ink': '#1A1A1A', '--ink-soft': '#4A4742', '--border': '#9C9689', '--border-soft': '#B5AFA5', '--chip-bg': '#B5AFA5', '--accent': '#1A1A1A', '--accent-2': '#1A1A1A' }) },
      { title: 'Studio Monochrome', desc: 'Off-white with a single accent of red — like a mark on a blueprint. Logo in technical sans-serif, almost stencil-like.', palette: ['#F8F5F0','#0A0A0A','#D62828'], type: 'Inter · bold', mood: 'Studio · Technical · Precise',
        theme: makeTheme('architecture', { '--bg': '#F8F5F0', '--bg-soft': '#EEEAE0', '--ink': '#0A0A0A', '--ink-soft': '#4A4742', '--border': '#D5CFC0', '--border-soft': '#E5DFD0', '--chip-bg': '#EEEAE0', '--accent': '#D62828', '--accent-2': '#D62828' }) },
    ],
  },
  {
    id: 4, name: 'Crescent', category: 'Restaurant', tag: 'Fine dining · Mediterranean',
    thumb: 'thumbs/04_crescent.png',
    desc: 'An intimate dining room translated to screen. Dark, warm, candlelit.',
    url: 'crescent.kitchen',
    content: { eyebrow: 'Mediterranean · Est. 2024', cta: 'Reserve a table', quoteKey: 'restaurant' },
    features: COMMON_FEATURES.restaurant,
    variations: [
      { title: 'Burgundy Velvet', desc: 'Deep wine background with gold italic serif. Subtle warm glow halos the wordmark. Like a private dining room.', palette: ['#1A0A0F','#C9A961','#F5E6D3'], type: 'Playfair Display italic · display', mood: 'Intimate · Luxurious · Candlelit',
        theme: makeTheme('restaurant', { '--bg': '#1A0A0F', '--bg-soft': '#0F0508', '--ink': '#F5E6D3', '--ink-soft': '#B5A89A', '--border': '#3D1F26', '--border-soft': '#26131A', '--chip-bg': '#26131A', '--accent': '#C9A961', '--accent-2': '#C9A961' }) },
      { title: 'Olive Grove', desc: 'Soft sage-olive background with terracotta accents. The logo in a humanist serif. Sun-drenched, like a coastal taverna.', palette: ['#7A8B5C','#C66B3D','#F5F0E8'], type: 'Playfair Display · regular', mood: 'Mediterranean · Sun-warmed · Rustic-luxe',
        theme: makeTheme('restaurant', { '--bg': '#7A8B5C', '--bg-soft': '#6B7B4F', '--ink': '#F5F0E8', '--ink-soft': '#D5D0BC', '--border': '#5C6B45', '--border-soft': '#6B7B4F', '--chip-bg': '#6B7B4F', '--accent': '#C66B3D', '--accent-2': '#C66B3D' }) },
      { title: 'Ink & Gold', desc: 'Near-black with brushed gold and a single moon crescent icon. Logo in a slim display serif. Modern, almost moody.', palette: ['#0A0A0A','#D4A574','#FFFFFF'], type: 'Playfair Display · thin', mood: 'Modern · Moody · Refined',
        theme: makeTheme('restaurant', { '--bg': '#0A0A0A', '--bg-soft': '#000000', '--ink': '#FFFFFF', '--ink-soft': '#A8A8A8', '--border': '#2A2A2A', '--border-soft': '#1A1A1A', '--chip-bg': '#1A1A1A', '--accent': '#D4A574', '--accent-2': '#D4A574' }) },
    ],
  },
  {
    id: 5, name: 'Verdant', category: 'Sustainability', tag: 'Eco-friendly living brand',
    thumb: 'thumbs/05_verdant.png',
    desc: 'Sustainable, regenerative, friendly. Like a hand-drawn hug from nature.',
    url: 'verdant.eco',
    content: { eyebrow: 'Regenerative living · since 2018', cta: 'Shop the collection', quoteKey: 'sustainability' },
    features: COMMON_FEATURES.sustainability,
    variations: [
      { title: 'Soft Sage', desc: 'Sage-green canvas with deep forest typography. Hand-drawn leaf doodles in the corners. Friendly, not preachy.', palette: ['#A8B89A','#2D4A2B','#F5F0E8'], type: 'Inter · rounded', mood: 'Organic · Friendly · Approachable',
        theme: makeTheme('sustainability', { '--bg': '#A8B89A', '--bg-soft': '#94A685', '--ink': '#2D4A2B', '--ink-soft': '#4A6347', '--border': '#7A8B5C', '--border-soft': '#94A685', '--chip-bg': '#94A685', '--accent': '#2D4A2B', '--accent-2': '#C66B3D' }) },
      { title: 'Earth & Clay', desc: 'Warm terracotta background with cream and forest accents. Chunky rounded typography. Bold, warm, tactile.', palette: ['#C66B3D','#F5E6D3','#2D4A2B'], type: 'Space Grotesk · bold', mood: 'Tactile · Warm · Confident',
        theme: makeTheme('sustainability', { '--bg': '#C66B3D', '--bg-soft': '#B45A2D', '--ink': '#F5E6D3', '--ink-soft': '#E5D5BC', '--border': '#9A5230', '--border-soft': '#B45A2D', '--chip-bg': '#B45A2D', '--accent': '#2D4A2B', '--accent-2': '#2D4A2B' }) },
      { title: 'Mossy Modern', desc: 'Deep moss-green with cream type. The wordmark in a modern geometric sans. Quiet confidence, like an old forest.', palette: ['#3D5A3D','#F5F0E8','#8B6B3D'], type: 'Space Grotesk · medium', mood: 'Modern · Quiet · Established',
        theme: makeTheme('sustainability', { '--bg': '#3D5A3D', '--bg-soft': '#324A32', '--ink': '#F5F0E8', '--ink-soft': '#C5C0A8', '--border': '#2A3F2A', '--border-soft': '#324A32', '--chip-bg': '#324A32', '--accent': '#8B6B3D', '--accent-2': '#8B6B3D' }) },
    ],
  },
  {
    id: 6, name: 'Nebula', category: 'Music', tag: 'Music streaming service',
    thumb: 'thumbs/06_nebula.png',
    desc: 'A cosmic jukebox. Immersive, dark, with a faint glow that says "press play".',
    url: 'nebula.fm',
    content: { eyebrow: 'Music from another dimension', cta: 'Start listening free', quoteKey: 'music' },
    features: COMMON_FEATURES.music,
    variations: [
      { title: 'Deep Space', desc: 'Pure black with cyan neon glow. A starfield fades in subtly. The wordmark is the only bright thing on the page.', palette: ['#000000','#00E5FF','#FFFFFF'], type: 'Space Grotesk · bold', mood: 'Immersive · Cosmic · Synthwave',
        theme: makeTheme('music', { '--bg': '#000000', '--bg-soft': '#050505', '--ink': '#FFFFFF', '--ink-soft': '#A8A8A8', '--border': '#1A1A1A', '--border-soft': '#0A0A0A', '--chip-bg': '#0A0A0A', '--accent': '#00E5FF', '--accent-2': '#00E5FF' }) },
      { title: 'Plasma Purple', desc: 'Deep indigo with a magenta-to-violet gradient glow. Logo in a curved sci-fi display. Lush, almost liquid.', palette: ['#0A0420','#7B2CBF','#FF006E'], type: 'Space Grotesk · bold', mood: 'Lush · Hypnotic · Club',
        theme: makeTheme('music', { '--bg': '#0A0420', '--bg-soft': '#05021A', '--ink': '#F5F0FF', '--ink-soft': '#B5A8D5', '--border': '#1F0A4A', '--border-soft': '#150535', '--chip-bg': '#150535', '--accent': '#7B2CBF', '--accent-2': '#FF006E' }) },
      { title: 'Vapor Pink', desc: 'Vaporwave pink-and-cyan grid horizon. The logo floats above. 80s nostalgia meets modern streaming.', palette: ['#FF6EC7','#7DF9FF','#1A0033'], type: 'Space Grotesk · display', mood: 'Retro · Playful · Nostalgic',
        theme: makeTheme('music', { '--bg': '#1A0033', '--bg-soft': '#0F0020', '--ink': '#FF6EC7', '--ink-soft': '#C5A8D5', '--border': '#3D1A66', '--border-soft': '#2A0F4A', '--chip-bg': '#0F0020', '--accent': '#7DF9FF', '--accent-2': '#FF6EC7' }) },
    ],
  },
  {
    id: 7, name: 'Odyssey', category: 'Travel', tag: 'Adventure expeditions',
    thumb: 'thumbs/07_odyssey.png',
    desc: 'The page is the summit. Big, bold, and breathtaking.',
    url: 'odyssey.expeditions',
    content: { eyebrow: 'Adventure expeditions worldwide', cta: 'Find your expedition', quoteKey: 'travel' },
    features: COMMON_FEATURES.travel,
    variations: [
      { title: 'Summit White', desc: 'Crisp white logo on a vivid blue sky with snowy peaks below. Pure alpine energy.', palette: ['#4A90E2','#FFFFFF','#1A2B4A'], type: 'Inter · condensed bold', mood: 'Epic · Alpine · Achievement',
        theme: makeTheme('travel', { '--bg': '#4A90E2', '--bg-soft': '#3A7BC8', '--ink': '#FFFFFF', '--ink-soft': '#D5E5F5', '--border': '#2A6AA8', '--border-soft': '#3A7BC8', '--chip-bg': '#1A2B4A', '--accent': '#1A2B4A', '--accent-2': '#FFFFFF' }) },
      { title: 'Forest Trail', desc: 'Deep forest green with cream type. A winding path leads the eye. Outdoor gear brand energy.', palette: ['#1A3D2E','#F5E6D3','#8B6B3D'], type: 'Inter · bold', mood: 'Rugged · Trail · Trustworthy',
        theme: makeTheme('travel', { '--bg': '#1A3D2E', '--bg-soft': '#142E22', '--ink': '#F5E6D3', '--ink-soft': '#C5B89F', '--border': '#0F2A1F', '--border-soft': '#142E22', '--chip-bg': '#142E22', '--accent': '#8B6B3D', '--accent-2': '#C66B3D' }) },
      { title: 'Dawn Patrol', desc: 'Sunrise gradient — peach to lavender — with a single silhouette of a climber. The wordmark in clean modern sans.', palette: ['#FFB088','#9B7EDE','#1A1A2E'], type: 'Inter · wide tracking', mood: 'Cinematic · Dawn · Aspirational',
        theme: makeTheme('travel', { '--bg': '#FFB088', '--bg-soft': '#F5A075', '--ink': '#1A1A2E', '--ink-soft': '#3D3D5A', '--border': '#E59675', '--border-soft': '#F0A075', '--chip-bg': '#F0A075', '--accent': '#9B7EDE', '--accent-2': '#1A1A2E' }) },
    ],
  },
  {
    id: 8, name: 'Vertex', category: 'Crypto', tag: 'DeFi & Web3 platform',
    thumb: 'thumbs/08_vertex.png',
    desc: 'Decentralized finance that doesn\'t look like a hacker terminal. Modern, sleek, almost friendly.',
    url: 'vertex.fi',
    content: { eyebrow: 'Decentralized finance, simplified', cta: 'Connect wallet', quoteKey: 'crypto' },
    features: COMMON_FEATURES.crypto,
    variations: [
      { title: 'Neon Grid', desc: 'Black with electric purple-pink gradient. Subtle grid fades in. Logo in a geometric, almost architectural font.', palette: ['#000000','#7B2CBF','#FF006E'], type: 'Space Grotesk · bold', mood: 'Tech · Web3 · Electric',
        theme: makeTheme('crypto', { '--bg': '#000000', '--bg-soft': '#050505', '--ink': '#FFFFFF', '--ink-soft': '#A8A8C5', '--border': '#1A1A2A', '--border-soft': '#0A0A1A', '--chip-bg': '#0A0A1A', '--accent': '#7B2CBF', '--accent-2': '#FF006E' }) },
      { title: 'Glassmorphism', desc: 'Soft gradient background (blue to teal) with frosted glass cards. The logo floats above. Modern and approachable.', palette: ['#0EA5E9','#14B8A6','#FFFFFF'], type: 'Inter · medium', mood: 'Modern · Glassy · Approachable',
        theme: makeTheme('crypto', { '--bg': '#0EA5E9', '--bg-soft': '#0E8AC8', '--ink': '#FFFFFF', '--ink-soft': '#D5EFF5', '--border': '#0E7AA8', '--border-soft': '#0E8AC8', '--chip-bg': '#14B8A6', '--accent': '#14B8A6', '--accent-2': '#FFFFFF' }) },
      { title: 'Monochrome Tech', desc: 'Pure black and white with one electric green accent. The wordmark in a thin tech mono. Hacker-luxe.', palette: ['#000000','#FFFFFF','#00FF88'], type: 'JetBrains Mono · thin', mood: 'Terminal · Hacker · Minimal',
        theme: makeTheme('crypto', { '--bg': '#000000', '--bg-soft': '#050505', '--ink': '#FFFFFF', '--ink-soft': '#A8A8A8', '--border': '#1A1A1A', '--border-soft': '#0A0A0A', '--chip-bg': '#0A0A0A', '--accent': '#00FF88', '--accent-2': '#00FF88' }) },
    ],
  },
  {
    id: 9, name: 'Helix', category: 'Healthcare', tag: 'Telemedicine platform',
    thumb: 'thumbs/09_helix.png',
    desc: 'Healthcare that listens. Calm, trustworthy, and quietly modern.',
    url: 'helix.care',
    content: { eyebrow: 'Care that listens', cta: 'Book a visit today', quoteKey: 'healthcare' },
    features: COMMON_FEATURES.healthcare,
    variations: [
      { title: 'Mint Calm', desc: 'Soft mint-to-white gradient. A subtle DNA helix line in the background. The logo in a friendly rounded sans.', palette: ['#A8DADC','#1A4D5C','#F5FFFE'], type: 'Inter · light', mood: 'Calm · Trustworthy · Fresh',
        theme: makeTheme('healthcare', { '--bg': '#A8DADC', '--bg-soft': '#94CDCF', '--ink': '#1A4D5C', '--ink-soft': '#3D6B7A', '--border': '#7AC2C5', '--border-soft': '#94CDCF', '--chip-bg': '#94CDCF', '--accent': '#1A4D5C', '--accent-2': '#1A4D5C' }) },
      { title: 'Clinical White', desc: 'Pure white with a single teal accent. The logo in a modern humanist sans. Clean, almost Scandinavian-medical.', palette: ['#FFFFFF','#0EA5E9','#1A1A1A'], type: 'Inter · regular', mood: 'Clean · Clinical · Trustworthy',
        theme: makeTheme('healthcare', { '--bg': '#FFFFFF', '--bg-soft': '#FAFAFA', '--ink': '#1A1A1A', '--ink-soft': '#5A5A5A', '--border': '#E0E0E0', '--border-soft': '#F0F0F0', '--chip-bg': '#F0F0F0', '--accent': '#0EA5E9', '--accent-2': '#0EA5E9' }) },
      { title: 'Warm Care', desc: 'Soft cream with deep teal type and a coral accent. The wordmark in a soft serif. Less hospital, more living room.', palette: ['#F5E6D3','#0A4D5C','#FF6B6B'], type: 'EB Garamond · regular', mood: 'Warm · Personal · Human',
        theme: makeTheme('healthcare', { '--bg': '#F5E6D3', '--bg-soft': '#EADBB8', '--ink': '#0A4D5C', '--ink-soft': '#3D6B7A', '--border': '#D5C5A0', '--border-soft': '#E5D5B5', '--chip-bg': '#EADBB8', '--accent': '#FF6B6B', '--accent-2': '#FF6B6B' }) },
    ],
  },
  {
    id: 10, name: 'Polaris', category: 'Aerospace', tag: 'Engineering & space',
    thumb: 'thumbs/10_polaris.png',
    desc: 'Mission control, but make it a website. Premium, technical, almost reverent.',
    url: 'polaris.aero',
    content: { eyebrow: 'Engineering the impossible', cta: 'Explore missions', quoteKey: 'aerospace' },
    features: COMMON_FEATURES.aerospace,
    variations: [
      { title: 'Starfield Navy', desc: 'Deep navy with metallic silver wordmark. A constellation pattern fades behind. Mission-ready energy.', palette: ['#0A1929','#C0C0C0','#FFFFFF'], type: 'Space Grotesk · medium', mood: 'Mission · Premium · Vast',
        theme: makeTheme('aerospace', { '--bg': '#0A1929', '--bg-soft': '#050F1F', '--ink': '#FFFFFF', '--ink-soft': '#A8B5C5', '--border': '#1F2D3F', '--border-soft': '#15233A', '--chip-bg': '#15233A', '--accent': '#C0C0C0', '--accent-2': '#FF6B35' }) },
      { title: 'Carbon Black', desc: 'Pure carbon black with a single neon orange accent. The logo in a technical, almost military-grade font.', palette: ['#0A0A0A','#FF6B35','#F5F0E8'], type: 'Space Grotesk · wide', mood: 'Tactical · Sharp · Engineering',
        theme: makeTheme('aerospace', { '--bg': '#0A0A0A', '--bg-soft': '#050505', '--ink': '#F5F0E8', '--ink-soft': '#A8A89F', '--border': '#1F1F1F', '--border-soft': '#151515', '--chip-bg': '#151515', '--accent': '#FF6B35', '--accent-2': '#FF6B35' }) },
      { title: 'Launch White', desc: 'White with navy and a thin rocket-trail line. The wordmark in clean modern sans. Optimistic, future-facing.', palette: ['#FFFFFF','#1A2B5C','#FF6B35'], type: 'Inter · bold', mood: 'Optimistic · Future · Lift-off',
        theme: makeTheme('aerospace', { '--bg': '#FFFFFF', '--bg-soft': '#FAFAFA', '--ink': '#1A2B5C', '--ink-soft': '#4A5A7A', '--border': '#D5DAE5', '--border-soft': '#E5EAF0', '--chip-bg': '#F0F0F0', '--accent': '#FF6B35', '--accent-2': '#FF6B35' }) },
    ],
  },
  {
    id: 11, name: 'Mira', category: 'Photography', tag: 'Photography portfolio',
    thumb: 'thumbs/11_mira.png',
    desc: 'The photos do the talking. The brand barely whispers.',
    url: 'mira.photo',
    content: { eyebrow: 'Photography · Selected works', cta: 'View portfolio', quoteKey: 'photography' },
    features: COMMON_FEATURES.photography,
    variations: [
      { title: 'Almost Invisible', desc: 'Pure black with a tiny "mira" in the corner. The hero is 100% photo. The wordmark could be missed on purpose.', palette: ['#000000','#F5F0E8','#3A3A3A'], type: 'Inter · tiny', mood: 'Editorial · Photo-first · Quiet',
        theme: makeTheme('photography', { '--bg': '#000000', '--bg-soft': '#050505', '--ink': '#F5F0E8', '--ink-soft': '#A8A8A0', '--border': '#1A1A1A', '--border-soft': '#0A0A0A', '--chip-bg': '#0A0A0A', '--accent': '#F5F0E8', '--accent-2': '#F5F0E8' }) },
      { title: 'Darkroom', desc: 'Soft red safelight glow. The wordmark in classic Trajan-style serif. Almost like opening a fine-art photo book.', palette: ['#0A0506','#C73E1D','#F5E6D3'], type: 'Cormorant Garamond · display', mood: 'Analog · Book · Cinematic',
        theme: makeTheme('photography', { '--bg': '#0A0506', '--bg-soft': '#050202', '--ink': '#F5E6D3', '--ink-soft': '#B5A89A', '--border': '#2A1518', '--border-soft': '#1A0A0F', '--chip-bg': '#1A0A0F', '--accent': '#C73E1D', '--accent-2': '#C73E1D' }) },
      { title: 'Silver Gelatin', desc: 'Cool gray with a single warm photo accent. The wordmark in a slim modern serif. Gallery wall energy.', palette: ['#E0E0E0','#1A1A1A','#D4A574'], type: 'Cormorant Garamond · slim', mood: 'Gallery · Cool · Refined',
        theme: makeTheme('photography', { '--bg': '#E0E0E0', '--bg-soft': '#C8C8C8', '--ink': '#1A1A1A', '--ink-soft': '#4A4A4A', '--border': '#B0B0B0', '--border-soft': '#C8C8C8', '--chip-bg': '#C8C8C8', '--accent': '#D4A574', '--accent-2': '#D4A574' }) },
    ],
  },
  {
    id: 12, name: 'Brew & Co', category: 'Restaurant', tag: 'Specialty coffee roaster',
    thumb: 'thumbs/12_brewco.png',
    desc: 'Slow-roasted, hand-poured, deeply crafted. Like a good cup.',
    url: 'brewco.cafe',
    content: { eyebrow: 'Roasted in Brooklyn · Est. 2014', cta: 'Shop coffee', quoteKey: 'coffee' },
    features: COMMON_FEATURES.coffee,
    variations: [
      { title: 'Kraft Paper', desc: 'Warm brown paper texture with vintage Cooper-style serif. A small bean icon. Coffee-shop-magazine feel.', palette: ['#8B6B3D','#3D2817','#F5E6D3'], type: 'Playfair Display · vintage', mood: 'Vintage · Craft · Warm',
        theme: makeTheme('coffee', { '--bg': '#8B6B3D', '--bg-soft': '#7A5C30', '--ink': '#3D2817', '--ink-soft': '#5C4023', '--border': '#6B5023', '--border-soft': '#7A5C30', '--chip-bg': '#7A5C30', '--accent': '#C66B3D', '--accent-2': '#3D2817' }) },
      { title: 'Espresso Black', desc: 'Deep coffee-black with cream type. The wordmark in chunky vintage sans. Like a pre-war Italian sign.', palette: ['#0A0506','#F5E6D3','#C66B3D'], type: 'Space Grotesk · chunky', mood: 'Bold · Italian · Pre-war',
        theme: makeTheme('coffee', { '--bg': '#0A0506', '--bg-soft': '#050202', '--ink': '#F5E6D3', '--ink-soft': '#B5A89A', '--border': '#2A1F1A', '--border-soft': '#1A0F0F', '--chip-bg': '#1A0F0F', '--accent': '#C66B3D', '--accent-2': '#C66B3D' }) },
      { title: 'Pour-Over Cream', desc: 'Soft cream with a single brown ring stain as the brand mark. Hand-drawn drip icon. Quiet, slow, deliberate.', palette: ['#F5E6D3','#6B4423','#3D2817'], type: 'Caveat · hand', mood: 'Quiet · Slow · Delicate',
        theme: makeTheme('coffee', { '--bg': '#F5E6D3', '--bg-soft': '#EADBB8', '--ink': '#6B4423', '--ink-soft': '#8B5F3A', '--border': '#D5C5A0', '--border-soft': '#E5D5B5', '--chip-bg': '#EADBB8', '--accent': '#6B4423', '--accent-2': '#3D2817' }) },
    ],
  },
  {
    id: 13, name: 'Ember', category: 'Events', tag: 'Luxury wedding planner',
    thumb: 'thumbs/13_ember.png',
    desc: 'Romance with a backbone. Soft on the eye, serious about the craft.',
    url: 'ember.wedding',
    content: { eyebrow: 'Weddings · Events · Stories', cta: 'Plan with us', quoteKey: 'events' },
    features: COMMON_FEATURES.events,
    variations: [
      { title: 'Blush & Burgundy', desc: 'Soft blush pink with a burgundy calligraphic wordmark. Subtle floral pattern. Romance, but make it luxurious.', palette: ['#F4D5D0','#6B1F2A','#FFFFFF'], type: 'Caveat · calligraphic', mood: 'Romantic · Soft · Luxurious',
        theme: makeTheme('events', { '--bg': '#F4D5D0', '--bg-soft': '#EAC0BA', '--ink': '#6B1F2A', '--ink-soft': '#8B3F4A', '--border': '#D5A8A0', '--border-soft': '#E5B8B0', '--chip-bg': '#EAC0BA', '--accent': '#6B1F2A', '--accent-2': '#6B1F2A' }) },
      { title: 'Ivory & Gold', desc: 'Pure ivory with thin gold accents. The wordmark in a refined italic serif. Almost a wedding invitation.', palette: ['#FAF7F0','#C9A961','#1A1A1A'], type: 'Cormorant Garamond · italic', mood: 'Elegant · Refined · Traditional',
        theme: makeTheme('events', { '--bg': '#FAF7F0', '--bg-soft': '#F0EBDF', '--ink': '#1A1A1A', '--ink-soft': '#5A5A5A', '--border': '#D5CFB5', '--border-soft': '#E5DFC5', '--chip-bg': '#F0EBDF', '--accent': '#C9A961', '--accent-2': '#C9A961' }) },
      { title: 'Modern Romance', desc: 'Off-white with terracotta and a single green leaf accent. Logo in a modern humanist sans. Less bridal-magazine, more editorial.', palette: ['#F5F0E8','#C66B3D','#3D5A3D'], type: 'Inter · humanist', mood: 'Editorial · Modern · Warm',
        theme: makeTheme('events', { '--bg': '#F5F0E8', '--bg-soft': '#EAE3D5', '--ink': '#26251E', '--ink-soft': '#6B6450', '--border': '#D5CCB5', '--border-soft': '#E5DCC9', '--chip-bg': '#EAE3D5', '--accent': '#C66B3D', '--accent-2': '#3D5A3D' }) },
    ],
  },
  {
    id: 14, name: 'Mosaic', category: 'Art', tag: 'Contemporary art gallery',
    thumb: 'thumbs/14_mosaic.png',
    desc: 'A gallery that doesn\'t take itself too seriously. Bold, playful, art-forward.',
    url: 'mosaic.gallery',
    content: { eyebrow: 'Gallery · Berlin · Since 2017', cta: 'Visit the gallery', quoteKey: 'art' },
    features: COMMON_FEATURES.art,
    variations: [
      { title: 'Primary Pop', desc: 'White with one letter replaced by a colored shape. Mondrian-meets-museum.', palette: ['#FFFFFF','#FF0000','#FFD700'], type: 'Space Grotesk · massive', mood: 'Pop · Playful · Bold',
        theme: makeTheme('art', { '--bg': '#FFFFFF', '--bg-soft': '#FAFAFA', '--ink': '#000000', '--ink-soft': '#4A4A4A', '--border': '#E0E0E0', '--border-soft': '#F0F0F0', '--chip-bg': '#F0F0F0', '--accent': '#FF0000', '--accent-2': '#FFD700' }) },
      { title: 'Wall Text', desc: 'Soft gallery gray with a single thin line and the name set in elegant Didone. Like a wall label in a museum.', palette: ['#F0EDE6','#0A0A0A','#8A8A8A'], type: 'Playfair Display · thin', mood: 'Gallery · Quiet · Curated',
        theme: makeTheme('art', { '--bg': '#F0EDE6', '--bg-soft': '#E0DDD5', '--ink': '#0A0A0A', '--ink-soft': '#4A4A4A', '--border': '#C5C0B5', '--border-soft': '#D5D0C5', '--chip-bg': '#E0DDD5', '--accent': '#0A0A0A', '--accent-2': '#0A0A0A' }) },
      { title: 'Curator Bold', desc: 'Deep black with a fluorescent orange wordmark. The logo is the loudest thing in the room — like an opening-night flyer.', palette: ['#000000','#FF6B00','#FFFFFF'], type: 'Archivo Black · display', mood: 'Loud · Urban · Curatorial',
        theme: makeTheme('art', { '--bg': '#000000', '--bg-soft': '#050505', '--ink': '#FFFFFF', '--ink-soft': '#A8A8A8', '--border': '#1F1F1F', '--border-soft': '#0F0F0F', '--chip-bg': '#0F0F0F', '--accent': '#FF6B00', '--accent-2': '#FF6B00' }) },
    ],
  },
  {
    id: 15, name: 'Apex', category: 'Fitness', tag: 'Premium fitness brand',
    thumb: 'thumbs/15_apex.png',
    desc: 'Train different. The page itself feels like a pre-workout shot.',
    url: 'apex.training',
    content: { eyebrow: 'Train different', cta: 'Start training', quoteKey: 'fitness' },
    features: COMMON_FEATURES.fitness,
    variations: [
      { title: 'Charcoal & Yellow', desc: 'Dark charcoal with electric yellow accents. A diagonal slash through the page. Aggressive but precise.', palette: ['#1A1A1A','#FFD60A','#FFFFFF'], type: 'Bebas Neue · condensed', mood: 'Aggressive · Sharp · Athletic',
        theme: makeTheme('fitness', { '--bg': '#1A1A1A', '--bg-soft': '#0F0F0F', '--ink': '#FFFFFF', '--ink-soft': '#A8A8A8', '--border': '#2F2F2F', '--border-soft': '#1F1F1F', '--chip-bg': '#1F1F1F', '--accent': '#FFD60A', '--accent-2': '#FFD60A' }) },
      { title: 'Concrete Gym', desc: 'Raw concrete gray with bold black type and a single red line. Industrial, like the floor of a real gym.', palette: ['#9CA3AF','#0A0A0A','#DC2626'], type: 'Bebas Neue · industrial', mood: 'Industrial · Honest · Raw',
        theme: makeTheme('fitness', { '--bg': '#9CA3AF', '--bg-soft': '#8A909A', '--ink': '#0A0A0A', '--ink-soft': '#3D3D3D', '--border': '#6B7280', '--border-soft': '#8A909A', '--chip-bg': '#8A909A', '--accent': '#DC2626', '--accent-2': '#DC2626' }) },
      { title: 'Neon Pulse', desc: 'Pure black with a single neon-green pulse line. Logo in technical mono. Almost like a heart-rate monitor at peak.', palette: ['#000000','#00FF88','#FFFFFF'], type: 'DM Mono · bold', mood: 'Tech · Pulse · Performance',
        theme: makeTheme('fitness', { '--bg': '#000000', '--bg-soft': '#050505', '--ink': '#FFFFFF', '--ink-soft': '#A8A8A8', '--border': '#1F1F1F', '--border-soft': '#0F0F0F', '--chip-bg': '#0F0F0F', '--accent': '#00FF88', '--accent-2': '#00FF88' }) },
    ],
  },
  {
    id: 16, name: 'Chapter', category: 'Publishing', tag: 'Independent book publisher',
    thumb: 'thumbs/16_chapter.png',
    desc: 'A publisher\'s page should feel like opening the first page of a good book.',
    url: 'chapter.press',
    content: { eyebrow: 'Independent publishing house · Est. 2009', cta: 'Browse our catalog', quoteKey: 'publishing' },
    features: COMMON_FEATURES.publishing,
    variations: [
      { title: 'Cream Paper', desc: 'Off-white paper texture with dark ink serif. A small book line drawing. Classic, literary, considered.', palette: ['#F5F0E8','#1A1A1A','#8B6B3D'], type: 'Playfair Display · regular', mood: 'Classic · Literary · Slow',
        theme: makeTheme('publishing', { '--bg': '#F5F0E8', '--bg-soft': '#EAE3D5', '--ink': '#1A1A1A', '--ink-soft': '#5A5A5A', '--border': '#D5CCB5', '--border-soft': '#E5DCC9', '--chip-bg': '#EAE3D5', '--accent': '#8B6B3D', '--accent-2': '#8B6B3D' }) },
      { title: 'Library Stamp', desc: 'Soft sage with deep burgundy and a faded library-card pattern. Logo in a vintage slab-serif. Like a 1920s bookshop.', palette: ['#A8B89A','#6B1F2A','#3D2817'], type: 'Playfair Display · slab', mood: 'Vintage · Library · Established',
        theme: makeTheme('publishing', { '--bg': '#A8B89A', '--bg-soft': '#94A685', '--ink': '#3D2817', '--ink-soft': '#5C4023', '--border': '#7A8B5C', '--border-soft': '#94A685', '--chip-bg': '#94A685', '--accent': '#6B1F2A', '--accent-2': '#6B1F2A' }) },
      { title: 'Indie Modern', desc: 'White with one bright color pop. Logo in a modern grotesque. Less literary, more indie press with edge.', palette: ['#FFFFFF','#0A0A0A','#FF6B6B'], type: 'Space Grotesk · bold', mood: 'Indie · Modern · Edgy',
        theme: makeTheme('publishing', { '--bg': '#FFFFFF', '--bg-soft': '#FAFAFA', '--ink': '#0A0A0A', '--ink-soft': '#4A4A4A', '--border': '#E0E0E0', '--border-soft': '#F0F0F0', '--chip-bg': '#F0F0F0', '--accent': '#FF6B6B', '--accent-2': '#FF6B6B' }) },
    ],
  },
  {
    id: 17, name: 'Spark', category: 'Agency', tag: 'Creative branding agency',
    thumb: 'thumbs/17_spark.png',
    desc: 'We make brands come alive. The page should prove it.',
    url: 'spark.studio',
    content: { eyebrow: 'We make brands come alive', cta: 'Start a project', quoteKey: 'agency' },
    features: COMMON_FEATURES.agency,
    variations: [
      { title: 'Pastel Pop', desc: 'Soft lavender-to-peach-to-mint gradient. Logo in deep purple rounded sans. Three colored circles dance around.', palette: ['#E0BBE4','#FFB088','#A8DADC'], type: 'Space Grotesk · rounded', mood: 'Playful · Modern · Friendly',
        theme: makeTheme('agency', { '--bg': '#E0BBE4', '--bg-soft': '#CFA5D5', '--ink': '#1A1A1A', '--ink-soft': '#4A4A4A', '--border': '#C0A0C5', '--border-soft': '#D0B0D5', '--chip-bg': '#D0B0D5', '--accent': '#FFB088', '--accent-2': '#A8DADC' }) },
      { title: 'Brutalist Studio', desc: 'Bright yellow background with stark black type. Asymmetric, almost chaotic, but with intent. Confidence.', palette: ['#FFD60A','#0A0A0A','#FFFFFF'], type: 'Archivo Black · display', mood: 'Brutalist · Bold · Confident',
        theme: makeTheme('agency', { '--bg': '#FFD60A', '--bg-soft': '#F5C800', '--ink': '#0A0A0A', '--ink-soft': '#3D3D3D', '--border': '#E5C200', '--border-soft': '#F0D500', '--chip-bg': '#F0D500', '--accent': '#0A0A0A', '--accent-2': '#0A0A0A' }) },
      { title: 'Soft Brutalism', desc: 'Off-white with big black type and a single neon pink accent. Logo in chunky sans. Bold but friendly.', palette: ['#F5F0E8','#0A0A0A','#FF006E'], type: 'Space Grotesk · chunky', mood: 'Soft-brutal · Modern · Lively',
        theme: makeTheme('agency', { '--bg': '#F5F0E8', '--bg-soft': '#EAE3D5', '--ink': '#0A0A0A', '--ink-soft': '#4A4A4A', '--border': '#D5CCB5', '--border-soft': '#E5DCC9', '--chip-bg': '#EAE3D5', '--accent': '#FF006E', '--accent-2': '#FF006E' }) },
    ],
  },
  {
    id: 18, name: 'Tide', category: 'Real Estate', tag: 'Coastal luxury properties',
    thumb: 'thumbs/18_tide.png',
    desc: 'A real-estate page that doesn\'t feel like Zillow. Aspirational, calm, premium.',
    url: 'tide.properties',
    content: { eyebrow: 'Coastal properties, considered', cta: 'View listings', quoteKey: 'realestate' },
    features: COMMON_FEATURES.realestate,
    variations: [
      { title: 'Ocean Blue', desc: 'Soft ocean blue with a wave line. Logo in elegant italic serif. Premium coastal, like a magazine cover.', palette: ['#A8DADC','#1A4D5C','#F5F0E8'], type: 'Playfair Display · italic', mood: 'Calm · Premium · Coastal',
        theme: makeTheme('realestate', { '--bg': '#A8DADC', '--bg-soft': '#94CDCF', '--ink': '#1A4D5C', '--ink-soft': '#3D6B7A', '--border': '#7AC2C5', '--border-soft': '#94CDCF', '--chip-bg': '#94CDCF', '--accent': '#1A4D5C', '--accent-2': '#C9A961' }) },
      { title: 'Sand & Stone', desc: 'Warm sand background with deep navy type. Logo in modern serif. Like a beach house in a magazine spread.', palette: ['#E8D9B5','#1A2B4A','#C66B3D'], type: 'Playfair Display · regular', mood: 'Warm · Architectural · Considered',
        theme: makeTheme('realestate', { '--bg': '#E8D9B5', '--bg-soft': '#DDCDAA', '--ink': '#1A2B4A', '--ink-soft': '#3D4D6A', '--border': '#C5B189', '--border-soft': '#D5C39C', '--chip-bg': '#D5C39C', '--accent': '#C66B3D', '--accent-2': '#1A2B4A' }) },
      { title: 'Marina White', desc: 'Pure white with navy and a thin gold accent. Logo in refined Didone. The Hamptons, translated to screen.', palette: ['#FFFFFF','#1A2B4A','#C9A961'], type: 'Playfair Display · didone', mood: 'Hamptons · Refined · Aspirational',
        theme: makeTheme('realestate', { '--bg': '#FFFFFF', '--bg-soft': '#FAFAFA', '--ink': '#1A2B4A', '--ink-soft': '#3D4D6A', '--border': '#D5DAE5', '--border-soft': '#E5EAF0', '--chip-bg': '#F0F0F0', '--accent': '#C9A961', '--accent-2': '#1A2B4A' }) },
    ],
  },
  {
    id: 19, name: 'Quanta', category: 'Education', tag: 'Online learning platform',
    thumb: 'thumbs/19_quanta.png',
    desc: 'Learning anything, at your own pace. Friendly, accessible, never intimidating.',
    url: 'quanta.school',
    content: { eyebrow: 'Learn anything · At your own pace', cta: 'Start learning free', quoteKey: 'education' },
    features: COMMON_FEATURES.education,
    variations: [
      { title: 'Sunny Yellow', desc: 'Bright pale yellow with chunky friendly sans. A small star replaces the dot of i. Approachable and fun.', palette: ['#FFF4B8','#1A1A1A','#FF6B6B'], type: 'Space Grotesk · chunky', mood: 'Friendly · Bright · Approachable',
        theme: makeTheme('education', { '--bg': '#FFF4B8', '--bg-soft': '#F5EA9F', '--ink': '#1A1A1A', '--ink-soft': '#4A4A4A', '--border': '#E5D58F', '--border-soft': '#F0E0A0', '--chip-bg': '#F0E0A0', '--accent': '#FF6B6B', '--accent-2': '#FF6B6B' }) },
      { title: 'Notebook Lines', desc: 'Soft cream paper with horizontal notebook lines fading in. Logo in hand-drawn sans. Like the front of a fresh notebook.', palette: ['#F5F0E8','#1A1A1A','#9CA3AF'], type: 'Caveat · hand', mood: 'Tactile · School · Friendly',
        theme: makeTheme('education', { '--bg': '#F5F0E8', '--bg-soft': '#EAE3D5', '--ink': '#1A1A1A', '--ink-soft': '#5A5A5A', '--border': '#D5CCB5', '--border-soft': '#E5DCC9', '--chip-bg': '#EAE3D5', '--accent': '#9CA3AF', '--accent-2': '#9CA3AF' }) },
      { title: 'Chalkboard', desc: 'Soft dark green with cream chalk-style type. A small chalk line. Like a creative classroom, not a corporate LMS.', palette: ['#2D4A2B','#F5E6D3','#FFD60A'], type: 'Caveat · chalk', mood: 'Chalkboard · Creative · Cozy',
        theme: makeTheme('education', { '--bg': '#2D4A2B', '--bg-soft': '#1F3520', '--ink': '#F5E6D3', '--ink-soft': '#B5B5A0', '--border': '#1A2F1A', '--border-soft': '#243F22', '--chip-bg': '#243F22', '--accent': '#FFD60A', '--accent-2': '#FFD60A' }) },
    ],
  },
  {
    id: 20, name: 'VAD', category: 'AI / Tech', tag: 'AI coding assistant',
    thumb: 'thumbs/20_vad.png',
    desc: 'A next-generation AI coding assistant. Calm, sophisticated, with a hidden depth.',
    url: 'vad.dev',
    content: { eyebrow: 'AI Coding Assistant', cta: 'Try VAD free', quoteKey: 'ai' },
    features: COMMON_FEATURES.ai,
    variations: [
      { title: 'Cream & Ink', desc: 'Warm cream with thin serif headlines. An ink-reveal effect hides a landscape painting behind the mask. Quiet but discoverable.', palette: ['#FCFAF8','#26251E','#B89968'], type: 'Questrial + EB Garamond italic', mood: 'Sophisticated · Calm · Discoverable',
        theme: makeTheme('ai', { '--bg': '#FCFAF8', '--bg-soft': '#F5F4EF', '--ink': '#26251E', '--ink-soft': '#504F49', '--border': '#D9D3CB', '--border-soft': '#F3F0EF', '--chip-bg': '#F3F0EF', '--accent': '#B89968', '--accent-2': '#7C5CFF' }) },
      { title: 'Dark Observatory', desc: 'Deep dark with thin star-like UI. The wordmark glows. A constellation pattern connects as you scroll. Tech with soul.', palette: ['#0A0A0F','#E0E0E0','#7C5CFF'], type: 'Questrial · thin', mood: 'Dark · Cosmic · Tech',
        theme: makeTheme('ai', { '--bg': '#0A0A0F', '--bg-soft': '#050508', '--ink': '#E0E0E0', '--ink-soft': '#8A8A8A', '--border': '#1F1F2A', '--border-soft': '#15151F', '--chip-bg': '#15151F', '--accent': '#7C5CFF', '--accent-2': '#7C5CFF' }) },
      { title: 'Paper Terminal', desc: 'Cream with a thin black terminal cursor that types the tagline live. The wordmark sits above like a chapter title.', palette: ['#F5F0E8','#1A1A1A','#16A34A'], type: 'Questrial + JetBrains Mono', mood: 'Paper · Editorial · Precise',
        theme: makeTheme('ai', { '--bg': '#F5F0E8', '--bg-soft': '#EAE3D5', '--ink': '#1A1A1A', '--ink-soft': '#4A4A4A', '--border': '#D5CCB5', '--border-soft': '#E5DCC9', '--chip-bg': '#EAE3D5', '--accent': '#16A34A', '--accent-2': '#16A34A' }) },
    ],
  },
];

// Helper: get a design by id
function getDesign(id) {
  return DESIGNS.find((d) => d.id === parseInt(id, 10));
}

// =========================================================
// Showcase data — 3 image items per design
// =========================================================
const SHOWCASE = {
  1: [
    { img: 'showcase/lumiere_01.png', tag: 'Couture', title: 'Spring/Summer 2026', desc: 'Hand-stitched silk with gold thread embroidery. Three weeks per piece.' },
    { img: 'showcase/lumiere_02.png', tag: 'Atelier', title: 'The Wool Overcoat', desc: 'Cut and tailored in Paris. Lined with cupro, the way it should be.' },
    { img: 'showcase/lumiere_03.png', tag: 'Accessories', title: 'The Heritage Bag', desc: 'A single piece, vegetable-tanned, designed to age beautifully.' },
  ],
  2: [
    { img: 'showcase/nomad_01.png', tag: 'Desert', title: 'Sahara Slow Walk', desc: '14 days, 4 guides, no WiFi. Just sand, stars, and silence.' },
    { img: 'showcase/nomad_02.png', tag: 'Mountains', title: 'Himalayan Edges', desc: 'High-altitude trekking with a Sherpa who knows the snow personally.' },
    { img: 'showcase/nomad_03.png', tag: 'Coastal', title: 'Aegean Quiet', desc: 'Greek island hopping on a wooden sailboat. Maximum 6 people.' },
  ],
  3: [
    { img: 'showcase/atelier_01.png', tag: 'Residential', title: 'The Concrete House', desc: 'A family home in the Loire. Concrete, oak, light — that\'s it.' },
    { img: 'showcase/atelier_02.png', tag: 'Interior', title: 'The Reading Room', desc: 'Floor-to-ceiling windows, a single chair, a 4,000-book library.' },
    { img: 'showcase/atelier_03.png', tag: 'Public', title: 'The Museum Stair', desc: 'Cast in place. The kind of detail that lasts 200 years.' },
  ],
  4: [
    { img: 'showcase/crescent_01.png', tag: 'Tasting', title: 'The Eight-Course', desc: 'Changing monthly. Whatever the season is doing, that\'s what we cook.' },
    { img: 'showcase/crescent_02.png', tag: 'Wine', title: 'The Cellar', desc: 'Small producers only. Names you can\'t pronounce, prices you can.' },
    { img: 'showcase/crescent_03.png', tag: 'Chef', title: 'In the Kitchen', desc: 'Watch the pass from the chef\'s table. Four seats, by request.' },
  ],
  5: [
    { img: 'showcase/verdant_01.png', tag: 'Home', title: 'The Refill Set', desc: 'Glass bottles, compostable refills, forever. No more plastic.' },
    { img: 'showcase/verdant_02.png', tag: 'Forest', title: 'One-Tree Planted', desc: 'Every order plants a tree. Real ones, in real soil, tracked publicly.' },
    { img: 'showcase/verdant_03.png', tag: 'Soil', title: 'Regenerative Sourcing', desc: 'We only buy from farms that leave the land better than they found it.' },
  ],
  6: [
    { img: 'showcase/nebula_01.png', tag: 'Live', title: 'Front-Row Sessions', desc: 'Exclusive live recordings from 12 cities, streamed in lossless.' },
    { img: 'showcase/nebula_02.png', tag: 'Vinyl', title: 'The Vault', desc: 'Pre-1980 jazz, soul, and rare grooves. Ripped from the original masters.' },
    { img: 'showcase/nebula_03.png', tag: 'Studio', title: 'Today\'s Sessions', desc: 'New artists, every Friday. No algorithms. A real person picks them.' },
  ],
  7: [
    { img: 'showcase/odyssey_01.png', tag: 'Summit', title: 'K2 Approach', desc: '28 days, 6 climbers, 1 sherpa team. The world\'s hardest non-technical summit.' },
    { img: 'showcase/odyssey_02.png', tag: 'River', title: 'Grand Canyon Raft', desc: 'Eighteen days, whitewater class IV, sleeping under the stars.' },
    { img: 'showcase/odyssey_03.png', tag: 'Trail', title: 'The Roof of the World', desc: 'High-altitude trekking in Patagonia. Washed by weather, made by effort.' },
  ],
  8: [
    { img: 'showcase/vertex_01.png', tag: 'Yield', title: 'Auto-Compound Vaults', desc: 'Set-and-forget yield strategies across 12 chains. Audited, transparent.' },
    { img: 'showcase/vertex_02.png', tag: 'Trade', title: 'Pro Trading Desk', desc: 'Sub-second execution, deep liquidity, no hidden fees. For serious traders.' },
    { img: 'showcase/vertex_03.png', tag: 'Stable', title: 'The Dollar Vault', desc: 'Earn 8% on USDC, fully collateralized, redeemable any time. No games.' },
  ],
  9: [
    { img: 'showcase/helix_01.png', tag: 'Care', title: 'Talk to a Doctor', desc: 'Same-day video visits, 7 days a week. Average wait: 8 minutes.' },
    { img: 'showcase/helix_02.png', tag: 'Labs', title: 'At-Home Testing', desc: 'Real lab work, real results. No waiting rooms, no awkward waiting room magazines.' },
    { img: 'showcase/helix_03.png', tag: 'Mind', title: 'Therapy On Your Terms', desc: 'Licensed therapists, your schedule, your couch. Insurance accepted.' },
  ],
  10: [
    { img: 'showcase/polaris_01.png', tag: 'Launch', title: 'The Atlas Program', desc: 'Custom launch services for small-sat operators. 14 successful missions.' },
    { img: 'showcase/polaris_02.png', tag: 'Crew', title: 'Astronaut Training', desc: 'Sub-orbital training for civilian researchers. Real preparation, real flights.' },
    { img: 'showcase/polaris_03.png', tag: 'Orbit', title: 'Earth Observation', desc: 'Sub-meter resolution imagery, delivered within 90 minutes of capture.' },
  ],
  11: [
    { img: 'showcase/mira_01.png', tag: 'Portrait', title: 'Faces of Lisbon', desc: '60 portraits, one neighborhood, one summer. Now showing at MAAT.' },
    { img: 'showcase/mira_02.png', tag: 'Street', title: 'Night Walk', desc: 'A solo project shot over three winters, in twelve cities, after midnight.' },
    { img: 'showcase/mira_03.png', tag: 'Light', title: 'Long Exposure', desc: 'A series on motion, time, and the human figure. Limited-edition prints.' },
  ],
  12: [
    { img: 'showcase/brewco_01.png', tag: 'Pour', title: 'The Daily Ritual', desc: 'Our flagship light roast. Floral, citrus, the cup you reach for every morning.' },
    { img: 'showcase/brewco_02.png', tag: 'Cafe', title: 'The Brooklyn Bar', desc: 'Eight seats, one bar, no laptops after 11am. The way cafes used to be.' },
    { img: 'showcase/brewco_03.png', tag: 'Roast', title: 'The Drum', desc: 'Small-batch roasts, shipped within 48 hours. Always fresh, always traceable.' },
  ],
  13: [
    { img: 'showcase/ember_01.png', tag: 'Wedding', title: 'Tuscan Vineyard', desc: 'Three days, one estate, fifty guests. We handle every detail, you live every moment.' },
    { img: 'showcase/ember_02.png', tag: 'Reception', title: 'The Blush Table', desc: 'A signature tablescape. Florals, candlelight, the kind of room people don\'t want to leave.' },
    { img: 'showcase/ember_03.png', tag: 'Moment', title: 'Getting Ready', desc: 'The morning-of. Hair, makeup, the quiet before. We make it feel held, not hectic.' },
  ],
  14: [
    { img: 'showcase/mosaic_01.png', tag: 'Solo Show', title: 'After the Algorithm', desc: 'A 12-piece series questioning how machines see beauty. Now showing.' },
    { img: 'showcase/mosaic_02.png', tag: 'Installation', title: 'Primary Forms', desc: 'A room-scale installation in red, yellow, blue. Walk through it, around it, under it.' },
    { img: 'showcase/mosaic_03.png', tag: 'Opening', title: 'First Fridays', desc: 'A monthly open evening. Free, with wine, with the artists actually in the room.' },
  ],
  15: [
    { img: 'showcase/apex_01.png', tag: 'Strength', title: 'The Iron Program', desc: '12 weeks, periodized, with a coach who reviews every session.' },
    { img: 'showcase/apex_02.png', tag: 'Run', title: 'Sub-3 Marathon', desc: 'A 16-week build to a Boston-qualifying marathon. Real paces, real recovery.' },
    { img: 'showcase/apex_03.png', tag: 'CrossFit', title: 'The Box', desc: 'WOD-based training, real coaches, no ego. 60-minute classes, 12 people max.' },
  ],
  16: [
    { img: 'showcase/chapter_01.png', tag: 'Fiction', title: 'The Hardback List', desc: 'Twelve titles a year, every one edited by a human who read it twice.' },
    { img: 'showcase/chapter_02.png', tag: 'Memoir', title: 'First-Person', desc: 'True stories, told by the people who lived them. No ghostwriters, ever.' },
    { img: 'showcase/chapter_03.png', tag: 'Stockist', title: 'Find a Bookshop', desc: '240 independent bookstores across 12 countries carry our titles.' },
  ],
  17: [
    { img: 'showcase/spark_01.png', tag: 'Brand', title: 'Identity Systems', desc: 'Logos, type, color, voice. The whole thing, designed as one.' },
    { img: 'showcase/spark_02.png', tag: 'Digital', title: 'Web & Product', desc: 'Sites and apps that look like the brand sounds. Functional, not decorative.' },
    { img: 'showcase/spark_03.png', tag: 'Strategy', title: 'Positioning & Voice', desc: 'Who you are, who you\'re for, and how to say it. Before any pixels move.' },
  ],
  18: [
    { img: 'showcase/tide_01.png', tag: 'Estate', title: 'Cove House', desc: 'A six-bedroom contemporary on its own private cove. Off-market, by request.' },
    { img: 'showcase/tide_02.png', tag: 'Villa', title: 'The Olive Estate', desc: 'Restored 18th-century villa, 4 hectares, working olive grove. Move-in ready.' },
    { img: 'showcase/tide_03.png', tag: 'Modern', title: 'Cliffside Modern', desc: 'Architect-built 2024, floor-to-ceiling glass, infinity pool over the bay.' },
  ],
  19: [
    { img: 'showcase/quanta_01.png', tag: 'Code', title: 'Build With Code', desc: '12-week bootcamp, real projects, real mentors. Job-ready or your money back.' },
    { img: 'showcase/quanta_02.png', tag: 'Design', title: 'UX & Product Design', desc: 'From research to hi-fi. Build a portfolio, not just a certificate.' },
    { img: 'showcase/quanta_03.png', tag: 'Data', title: 'Data Science', desc: 'Python, SQL, ML. A working knowledge you\'ll actually use on Monday morning.' },
  ],
  20: [
    { img: 'showcase/vad_01.png', tag: 'Model', title: 'Unlimited Context', desc: 'It doesn\'t forget. Your codebase, your conversation, your project — all in one head.' },
    { img: 'showcase/vad_02.png', tag: 'Coding', title: 'Real Execution', desc: 'It runs your code, finds the bug, fixes the bug, and ships the fix. Not just suggestions.' },
    { img: 'showcase/vad_03.png', tag: 'Agents', title: 'Multi-Agent', desc: 'Spawns sub-agents, runs them in parallel, coordinates the result. The whole team in one prompt.' },
  ],
};

// =========================================================
// Testimonial data — one quote per design
// =========================================================
const TESTIMONIALS = {
  1:  { quote: '"I wore the silk dress three times last month. Each time someone stopped me to ask where it was from."', author: 'Inès Laurent', role: 'Editor, Vogue Paris' },
  2:  { quote: '"The Sahara trip reset something in me. I went back to the office the next week and quit my job."', author: 'Markus Henriksen', role: 'Three-time Nomad traveler' },
  3:  { quote: '"They designed our home the way a poet writes a sentence. Nothing extra. Nothing missing."', author: 'Sofia & James Beaumont', role: 'Clients, Loire Valley' },
  4:  { quote: '"Eight courses, none of them showy, every one of them perfect. The wine list alone is worth the trip."', author: 'Hiroto Tanaka', role: 'Food critic, Tokyo' },
  5:  { quote: '"Their refill set paid for itself in four months. The candle lasts longer than the brand we used before."', author: 'Naomi Klein', role: 'Customer since 2022' },
  6:  { quote: '"I found three artists here that became my whole year. The curation is the best on the internet."', author: 'Devon Park', role: 'Listener since 2019' },
  7:  { quote: '"Summited K2 with their team. I will never go to altitude with anyone else."', author: 'Pavel Reznik', role: 'Alpinist, 8 expeditions' },
  8:  { quote: '"It\'s the first DeFi product my accountant understands. That\'s the highest praise I have."', author: 'Lena Okonkwo', role: 'CFO, Series B startup' },
  9:  { quote: '"My doctor was on screen in seven minutes. I cried a little from relief. Healthcare is supposed to feel like this."', author: 'Anonymous', role: 'Helix member since 2023' },
  10: { quote: '"They launched our satellite on time, on budget, and answered every email within an hour. Unheard of."', author: 'Dr. Yuki Tanaka', role: 'CTO, TerraSense Labs' },
  11: { quote: '"She made me feel like the only face in the room. I have never been photographed like that before."', author: 'Aida Sow', role: 'Subject, Lisbon series' },
  12: { quote: '"The best cup of coffee I have had outside of Tokyo. And I have had a lot of cups outside of Tokyo."', author: 'Kenji Watanabe', role: 'Regular, every Saturday' },
  13: { quote: '"Our wedding felt like us. Not a Pinterest board. Us. Ember made that possible."', author: 'Lila & Anya Park', role: 'Married September 2025' },
  14: { quote: '"The opening night was the best night I have had in a gallery in a decade. I cried at the second piece."', author: 'Mateo Reyes', role: 'Visitor, First Friday' },
  15: { quote: '"I added 40kg to my deadlift in 14 weeks. Form first, every session. No ego, no shortcuts."', author: 'Tariq Hassan', role: 'Member since 2024' },
  16: { quote: '"They edited my novel like it was their own. The first press I have ever been proud of."', author: 'Mira Ostrowski', role: 'Author, The Salt House' },
  17: { quote: '"Spark is the first agency that told us what not to do. We have been with them for six years."', author: 'Theo Bennett', role: 'Founder, Olive & Co' },
  18: { quote: '"They sent us listings two days before they hit the market. That alone paid for the relationship."', author: 'James & Hannah Cole', role: 'Bought through Tide, 2025' },
  19: { quote: '"I went from knowing nothing to shipping a real app in five months. Now I teach the next cohort."', author: 'Priya Iyer', role: 'Graduate, now mentor' },
  20: { quote: '"It shipped a feature in eight minutes that I had been avoiding for two weeks. I owe it a beer."', author: 'Sam Chen', role: 'Senior engineer, fintech' },
};

// Hero background images (use the gallery thumb, or null for designs that look better without)
const HERO_BG = {
  1: 'thumbs/01_lumiere.png',
  2: 'thumbs/02_nomad.png',
  3: null,  // Atelier: pure minimal
  4: 'thumbs/04_crescent.png',
  5: 'thumbs/05_verdant.png',
  6: 'thumbs/06_nebula.png',
  7: 'thumbs/07_odyssey.png',
  8: 'thumbs/08_vertex.png',
  9: 'thumbs/09_helix.png',
  10: 'thumbs/10_polaris.png',
  11: 'thumbs/11_mira.png',
  12: 'thumbs/12_brewco.png',
  13: 'thumbs/13_ember.png',
  14: 'thumbs/14_mosaic.png',
  15: 'thumbs/15_apex.png',
  16: 'thumbs/16_chapter.png',
  17: 'thumbs/17_spark.png',
  18: 'thumbs/18_tide.png',
  19: 'thumbs/19_quanta.png',
  20: 'thumbs/20_vad.png',
};

// Helper: get a variation
function getVariation(id, varIdx) {
  const d = getDesign(id);
  if (!d) return null;
  return d.variations[varIdx] || d.variations[0];
}
