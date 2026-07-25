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
// Design Presets — per-design layout, decoration, and rich content
// =========================================================
const DESIGN_PRESETS = {
  1: {
    layout: 'editorial',
    decoration: 'lines',
    marquee: ['Spring/Summer 2026', 'Haute Couture', 'Ready-to-Wear', 'Made in France', 'Hand-embroidered', 'Silk & Wool', 'Atelier Cambon', 'Sample Room'],
    stats: [
      { value: '38', label: 'Years on rue Cambon' },
      { value: '2400', label: 'Pieces per season' },
      { value: '94', suffix: '%', label: 'Made in France' },
      { value: '12', suffix: 'K', label: 'Atelier members' },
    ],
    process: [
      { icon: '✦', title: 'Sketch', desc: 'A single drawing, twenty tries. The silhouette before the stitch.' },
      { icon: '✂', title: 'Cut', desc: 'Hand-cut from the bolt. One piece, one pair of scissors, one seamstress.' },
      { icon: '◆', title: 'Stitch', desc: 'Two hundred hours per piece. The body learns the fabric.' },
      { icon: '◈', title: 'Finish', desc: 'Final fitting, hand-pressed, boxed in cotton. Ready for the runway.' },
    ],
    bigQuote: { text: 'A dress is not made in a single day. It is made in a hundred. That is the secret nobody tells.', attr: '— Marie-Louise, Atelier Director' },
  },
  2: {
    layout: 'full-bleed',
    decoration: 'sun',
    marquee: ['Sahara · 14 days', 'Himalaya · 21 days', 'Aegean · 7 days', 'Patagonia · 18 days', 'Iceland · 10 days', 'Mongolia · 12 days', 'Bhutan · 16 days', 'Greenland · 9 days'],
    stats: [
      { value: '92', label: 'Trips per year' },
      { value: '6', label: 'Continents' },
      { value: '8', label: 'Max group size' },
      { value: '100', suffix: '%', label: 'Locally led' },
    ],
    process: [
      { icon: '✺', title: 'Plan', desc: 'A real human reads your application, then designs a route around you.' },
      { icon: '◉', title: 'Connect', desc: 'We pair you with a local guide who has actually walked the path.' },
      { icon: '➤', title: 'Go', desc: 'You walk, you eat, you sleep, you repeat. No megabuses, no megajetlags.' },
      { icon: '✦', title: 'Return', desc: 'You come back different. We\'ve seen it happen more than 4,000 times.' },
    ],
    bigQuote: { text: 'Travel is not about the places you go. It is about the people you become on the way there.', attr: '— Salma, founder' },
  },
  3: {
    layout: 'split',
    decoration: 'grid',
    marquee: ['Residential', 'Cultural', 'Commercial', 'Public', 'Adaptive Reuse', 'Interiors', 'Master Plans', 'Pavilions'],
    stats: [
      { value: '142', label: 'Projects delivered' },
      { value: '28', label: 'Years in practice' },
      { value: '11', label: 'Countries' },
      { value: '7', label: 'Awards, 2024' },
    ],
    process: [
      { icon: '◧', title: 'Site', desc: 'We spend two weeks on the site before we draw a single line.' },
      { icon: '◐', title: 'Brief', desc: 'What you need. What you do not need. What you did not know you needed.' },
      { icon: '◇', title: 'Draw', desc: 'Hand sketches first. Then models. Then drawings. Then more models.' },
      { icon: '◧', title: 'Build', desc: 'We stay on site. The building is the test.' },
    ],
    bigQuote: { text: 'Architecture is the will of an age conceived in spatial terms. It is not a style.', attr: '— Mies van der Rohe' },
  },
  4: {
    layout: 'centered',
    decoration: 'candle',
    marquee: ['Eight-Course Tasting', 'Wine Pairing', 'Chef\'s Table', 'Seasonal Menu', 'Mediterranean', 'Private Dining', 'Cellar Selection', 'Sommelier Hour'],
    stats: [
      { value: '12', label: 'Seats at the pass' },
      { value: '8', label: 'Courses, changing monthly' },
      { value: '320', label: 'Bottles in the cellar' },
      { value: '4.9', suffix: '/5', label: 'Critic rating' },
    ],
    process: [
      { icon: '✻', title: 'Source', desc: 'The market at 5am. The fisherman we know by name. The farm down the road.' },
      { icon: '❦', title: 'Compose', desc: 'Eight courses from a single fire. Whatever the season is doing.' },
      { icon: '✦', title: 'Plate', desc: 'The chef plates each course. Every guest watches from the pass.' },
      { icon: '◐', title: 'Pour', desc: 'The sommelier pairs. A different glass for every course. No exceptions.' },
    ],
    bigQuote: { text: 'We do not have a signature dish. We have a signature season. It changes four times a year.', attr: '— Chef Yara' },
  },
  5: {
    layout: 'organic',
    decoration: 'leaf',
    marquee: ['Carbon Negative', 'Plant-Based', 'Refillable', 'Compostable', 'Local Sourcing', 'Zero Waste', 'Regenerative', 'B-Corp'],
    stats: [
      { value: '184', suffix: 'K', label: 'Trees planted' },
      { value: '100', suffix: '%', label: 'Carbon negative' },
      { value: '0', label: 'Single-use plastic' },
      { value: '23', label: 'Local farms' },
    ],
    process: [
      { icon: '❀', title: 'Source', desc: 'Every supplier answers: does this leave the land better than we found it?' },
      { icon: '✿', title: 'Make', desc: 'In small batches, by hand, with materials that compost in 90 days.' },
      { icon: '✤', title: 'Ship', desc: 'Compostable mailers, recycled paper tape, mushroom packaging. Nothing wasted.' },
      { icon: '✦', title: 'Refill', desc: 'When you run out, you send the bottle back. We refill and ship again.' },
    ],
    bigQuote: { text: 'We do not sell products. We sell a relationship with the land. That is the only honest way.', attr: '— Amara, founder' },
  },
  6: {
    layout: 'full-bleed',
    decoration: 'stars',
    marquee: ['Lossless Audio', 'Vinyl Vault', 'Front-Row', 'Indie Sessions', 'World Music', 'Jazz Club', 'Late Night', 'Hi-Fi'],
    stats: [
      { value: '24', suffix: 'K', label: 'Albums' },
      { value: '8', suffix: 'M', label: 'Tracks' },
      { value: '92', label: 'Genres' },
      { value: '4', label: 'Real humans curating' },
    ],
    process: [
      { icon: '♫', title: 'Find', desc: 'A real person listens. Not an algorithm. The same curator for years.' },
      { icon: '◐', title: 'Master', desc: 'Lossless from the original studio masters. 24-bit, 96kHz. No compression.' },
      { icon: '♪', title: 'Stream', desc: 'Across every device. Offline, online, in your car, on a plane.' },
      { icon: '♬', title: 'Share', desc: 'A Friday mixtape from a real human. The way music used to be shared.' },
    ],
    bigQuote: { text: 'Music is the only art form that lives in the body. We treat it accordingly.', attr: '— Devon, Head of Curation' },
  },
  7: {
    layout: 'full-bleed',
    decoration: 'mountain',
    marquee: ['K2 · 28 days', 'Patagonia · 18 days', 'Grand Canyon · 21 days', 'Greenland · 14 days', 'Bhutan · 12 days', 'Mongolia · 16 days', 'Iceland · 10 days', 'Atlas · 9 days'],
    stats: [
      { value: '142', label: 'Successful summits' },
      { value: '6', label: 'Continents' },
      { value: '0', label: 'Client fatalities' },
      { value: '12', label: 'Years guiding' },
    ],
    process: [
      { icon: '▲', title: 'Train', desc: 'Six months of preparation. We design a plan for your body, not the brochure.' },
      { icon: '◐', title: 'Acclimatize', desc: 'Ten days at altitude before we even start. The mountain punishes shortcuts.' },
      { icon: '✦', title: 'Climb', desc: 'One step at a time. The summit is a side-effect of the journey.' },
      { icon: '◈', title: 'Return', desc: 'You come back. Most of our clients come back. That is how you know it worked.' },
    ],
    bigQuote: { text: 'The summit is the easy part. The hard part is everything you become on the way up.', attr: '— Pavel, lead guide' },
  },
  8: {
    layout: 'split',
    decoration: 'grid',
    marquee: ['Auto-Compound', 'Pro Trading', 'Stable Vault', 'Cross-Chain', 'Audited', 'Self-Custody', 'No Lock-ups', 'On-chain'],
    stats: [
      { value: '$2.4', suffix: 'B', label: 'TVL' },
      { value: '180', suffix: 'K', label: 'Active wallets' },
      { value: '12', label: 'Chains' },
      { value: '0', label: 'Security incidents' },
    ],
    process: [
      { icon: '◆', title: 'Connect', desc: 'Your wallet. Your keys. We never see them. Self-custody is non-negotiable.' },
      { icon: '◐', title: 'Choose', desc: 'A strategy that fits your time horizon. Conservative, balanced, or aggressive.' },
      { icon: '✦', title: 'Earn', desc: 'Set-and-forget. We rebalance automatically. You check in when you want to.' },
      { icon: '◈', title: 'Withdraw', desc: 'Any time, any amount, no fees. The money is always yours.' },
    ],
    bigQuote: { text: 'We do not want your money. We want your trust. The money follows.', attr: '— Lena, founder' },
  },
  9: {
    layout: 'centered',
    decoration: 'pulse',
    marquee: ['Same-Day Visits', 'At-Home Labs', 'Therapy', 'Pediatrics', 'Mental Health', 'Dermatology', 'Nutrition', '24/7 Care'],
    stats: [
      { value: '8', suffix: 'min', label: 'Average wait' },
      { value: '320', label: 'Licensed clinicians' },
      { value: '24', suffix: '/7', label: 'Available' },
      { value: '92', suffix: '%', label: 'Resolved in one visit' },
    ],
    process: [
      { icon: '✚', title: 'Book', desc: 'Online or in-app. Pick a clinician, pick a time, done. No phone tree.' },
      { icon: '◉', title: 'Visit', desc: 'Video or in-person. Same clinician every time if you want.' },
      { icon: '✦', title: 'Treat', desc: 'Prescriptions, labs, referrals, follow-up. All in one place.' },
      { icon: '◈', title: 'Follow up', desc: 'Your clinician checks in. Not a chatbot. A real person who knows you.' },
    ],
    bigQuote: { text: 'Healthcare is not a transaction. It is a relationship. We built the platform around that.', attr: '— Dr. Yuki, Chief Medical Officer' },
  },
  10: {
    layout: 'full-bleed',
    decoration: 'stars',
    marquee: ['Atlas Program', 'Astronaut Training', 'Earth Observation', 'Sub-Orbital', 'Mission Control', 'Telemetry', 'Launch Services', 'Constellation Ops'],
    stats: [
      { value: '14', label: 'Successful launches' },
      { value: '320', label: 'Million km flown' },
      { value: '42', label: 'Active satellites' },
      { value: '0', label: 'Mission failures' },
    ],
    process: [
      { icon: '▲', title: 'Design', desc: 'Every mission starts on a napkin. We turn it into hardware.' },
      { icon: '◐', title: 'Build', desc: 'Mission-grade components. Tested to NASA outgassing specs.' },
      { icon: '✦', title: 'Launch', desc: 'On time, on budget. The launch is the easy part.' },
      { icon: '◈', title: 'Operate', desc: '24/7 mission control. Real-time telemetry. Decades of operations.' },
    ],
    bigQuote: { text: 'Space is hard. The reason we do it is because it is hard.', attr: '— Anonymous, mission control' },
  },
  11: {
    layout: 'full-bleed',
    decoration: 'grain',
    marquee: ['Portrait', 'Street', 'Long Exposure', 'Documentary', 'Editorial', 'Film', 'Night', 'Black & White'],
    stats: [
      { value: '12', label: 'Solo shows' },
      { value: '38', label: 'Countries shot' },
      { value: '2', label: 'Books published' },
      { value: '∞', label: 'Rolls of film' },
    ],
    process: [
      { icon: '◐', title: 'See', desc: 'I walk for an hour before I shoot. The body has to know the place first.' },
      { icon: '✦', title: 'Frame', desc: 'A single frame, the one that cannot be repeated. That is the only one worth taking.' },
      { icon: '◈', title: 'Wait', desc: 'For the light. For the moment. For the person to be themselves.' },
      { icon: '◇', title: 'Print', desc: 'Hand-printed in the darkroom. The final act. The one that matters.' },
    ],
    bigQuote: { text: 'I do not photograph things. I photograph the way I see them. The two are not the same.', attr: '— Mira' },
  },
  12: {
    layout: 'editorial',
    decoration: 'steam',
    marquee: ['Single Origin', 'Pour-Over', 'Espresso', 'Cold Brew', 'Roasted to Order', 'Direct Trade', 'Hand-Picked', 'Cup of Excellence'],
    stats: [
      { value: '24', label: 'Single origins' },
      { value: '3', suffix: 'x', label: 'Fair Trade minimum' },
      { value: '48', suffix: 'h', label: 'From drum to door' },
      { value: '100', suffix: '%', label: 'Direct trade' },
    ],
    process: [
      { icon: '◉', title: 'Source', desc: 'We visit the farm. We pay the farmer. We pay them three times the minimum.' },
      { icon: '☕', title: 'Roast', desc: 'Small batches. The drum holds 12 kilos. We roast on Tuesdays.' },
      { icon: '✦', title: 'Cup', desc: 'Every batch cupped by Q-graders. The defective 3% goes home with us.' },
      { icon: '◐', title: 'Ship', desc: 'Within 48 hours of leaving the drum. Always fresh. Always traceable.' },
    ],
    bigQuote: { text: 'Coffee is not a beverage. It is a relationship between a person, a plant, and a place.', attr: '— Kenji, head roaster' },
  },
  13: {
    layout: 'editorial',
    decoration: 'petal',
    marquee: ['Tuscan Vineyard', 'Parisian Château', 'Santorini Cliffside', 'Moroccan Riad', 'Marrakech', 'Cotswolds Barn', 'Lake Como', 'Bordeaux'],
    stats: [
      { value: '142', label: 'Weddings planned' },
      { value: '0', label: 'Bridezilla moments' },
      { value: '14', label: 'Countries' },
      { value: '100', suffix: '%', label: 'Vendor-agnostic' },
    ],
    process: [
      { icon: '✦', title: 'Meet', desc: 'Coffee, not champagne. A long conversation about what you actually want.' },
      { icon: '◐', title: 'Design', desc: 'A single planner from first call to last dance. No hand-offs, no surprises.' },
      { icon: '✦', title: 'Plan', desc: 'Vendor-agnostic means we recommend what is right. We do not take commissions.' },
      { icon: '◈', title: 'Run', desc: 'Day-of. We run the day. You live it. We handle every glitch in real time.' },
    ],
    bigQuote: { text: 'The wedding is not the day. The wedding is the marriage. We plan for the marriage.', attr: '— Anya, founder' },
  },
  14: {
    layout: 'editorial',
    decoration: 'shape',
    marquee: ['Solo Shows', 'Group Shows', 'Installations', 'Performance', 'Sculpture', 'Photography', 'New Media', 'Curatorial'],
    stats: [
      { value: '12', label: 'Exhibitions per year' },
      { value: '4', label: 'Solo shows per artist' },
      { value: '280', suffix: 'K', label: 'Visitors annually' },
      { value: '0', label: 'Reproductions sold' },
    ],
    process: [
      { icon: '◐', title: 'Curate', desc: 'We show four artists a year. Not forty. Each one gets a real show.' },
      { icon: '✦', title: 'Install', desc: 'Lighting, walls, sound. The gallery is built around the work, not the other way around.' },
      { icon: '◈', title: 'Open', desc: 'First Fridays. Free, with wine, with the artists actually in the room.' },
      { icon: '◇', title: 'Sell', desc: 'If the work sells, the artist gets 70%. Direct from studio. No middlemen.' },
    ],
    bigQuote: { text: 'A gallery is not a shop. It is a place where art happens, and the shop is a side-effect.', attr: '— Mateo, director' },
  },
  15: {
    layout: 'split',
    decoration: 'noise',
    marquee: ['Strength', 'Powerlifting', 'CrossFit', 'Olympic Lifting', 'Marathon', 'Calisthenics', 'Mobility', 'Conditioning'],
    stats: [
      { value: '12', suffix: 'K', label: 'Members' },
      { value: '8', label: 'Coaches' },
      { value: '0', label: 'Mirrors on the floor' },
      { value: '24', suffix: '/7', label: 'Open gym' },
    ],
    process: [
      { icon: '◆', title: 'Assess', desc: 'Every new member does an InBody scan, a movement screen, and a goals interview.' },
      { icon: '◐', title: 'Program', desc: 'Periodized. Cycles, deloads, progressive overload. No random workouts.' },
      { icon: '✦', title: 'Coach', desc: 'Real coaches. Certified. Watching. We\'d rather you lift less with perfect form.' },
      { icon: '◈', title: 'Progress', desc: 'Re-assess every 8 weeks. The data tells the truth. We use it.' },
    ],
    bigQuote: { text: 'Form first, every session. The PR is a side-effect of the discipline, not the goal.', attr: '— Tariq, head coach' },
  },
  16: {
    layout: 'centered',
    decoration: 'paper',
    marquee: ['Fiction', 'Memoir', 'Essays', 'Poetry', 'Translation', 'Reissue', 'Limited Edition', 'Audiobook'],
    stats: [
      { value: '142', label: 'Titles in print' },
      { value: '12', label: 'Per year' },
      { value: '240', label: 'Independent stockists' },
      { value: '0', label: 'Ghostwriters' },
    ],
    process: [
      { icon: '❦', title: 'Receive', desc: 'Manuscripts arrive by post. We read every one. No algorithmic slush pile.' },
      { icon: '✦', title: 'Edit', desc: 'Two editors. Six months. We do not cut what makes the work the work.' },
      { icon: '◐', title: 'Print', desc: 'Letterpress for limited editions. Offset for the long run. Always on acid-free paper.' },
      { icon: '◈', title: 'Distribute', desc: 'Independent bookstores in 12 countries. Not Amazon. Not algorithmic.' },
    ],
    bigQuote: { text: 'A book must be the axe for the frozen sea within us. That is the only test that matters.', attr: '— Franz Kafka' },
  },
  17: {
    layout: 'centered',
    decoration: 'shape',
    marquee: ['Brand Identity', 'Web & Product', 'Strategy', 'Naming', 'Editorial', 'Packaging', 'Campaign', 'Art Direction'],
    stats: [
      { value: '142', label: 'Brands shipped' },
      { value: '14', label: 'Years in business' },
      { value: '8', label: 'Senior team' },
      { value: '0', label: 'Hourly billing' },
    ],
    process: [
      { icon: '✦', title: 'Listen', desc: 'Two weeks of conversations. With you, with your customers, with the people who hate you.' },
      { icon: '◐', title: 'Position', desc: 'A document. One page. Who you are, who you are for, and how to say it.' },
      { icon: '◈', title: 'Design', desc: 'Logo, type, color, voice. The whole thing, designed as one.' },
      { icon: '◇', title: 'Ship', desc: 'Fixed price. No scope creep. No surprise invoices. We say no when we mean no.' },
    ],
    bigQuote: { text: 'We do not make things pretty. We make things that work, and that work is beautiful.', attr: '— Theo, founder' },
  },
  18: {
    layout: 'editorial',
    decoration: 'wave',
    marquee: ['Cove House', 'Olive Estate', 'Cliffside Modern', 'Mediterranean Villa', 'Aegean', 'Cotswolds', 'Provence', 'Bordeaux'],
    stats: [
      { value: '$2.4', suffix: 'B', label: 'Sold in 2025' },
      { value: '142', label: 'Homes closed' },
      { value: '14', label: 'Coastal markets' },
      { value: '0', label: 'Dual agency' },
    ],
    process: [
      { icon: '◐', title: 'Search', desc: 'Off-market first. Our clients see listings 48 hours before MLS.' },
      { icon: '✦', title: 'Tour', desc: 'One agent per neighborhood. They know every block, every comp, every seller.' },
      { icon: '◈', title: 'Offer', desc: 'We never represent both sides. Your interests, full stop.' },
      { icon: '◇', title: 'Close', desc: 'From handshake to keys, in 30 days. We move at the speed of your life.' },
    ],
    bigQuote: { text: 'We do not sell houses. We introduce people to the place they will spend the next chapter.', attr: '— James, partner' },
  },
  19: {
    layout: 'centered',
    decoration: 'sun',
    marquee: ['Code', 'UX Design', 'Data Science', 'Photography', 'Music Production', 'Marketing', 'Writing', 'Business'],
    stats: [
      { value: '240', label: 'Courses' },
      { value: '50', suffix: 'K', label: 'Learners' },
      { value: '92', label: 'Countries' },
      { value: '4.9', suffix: '/5', label: 'Avg rating' },
    ],
    process: [
      { icon: '✦', title: 'Pick', desc: 'Browse 240 courses. Try the first lesson free, no signup required.' },
      { icon: '◐', title: 'Learn', desc: 'Watch lessons when you want. Take notes. Try the exercises. Ask the instructor.' },
      { icon: '✺', title: 'Build', desc: 'Every course ends with a real project you can put in your portfolio.' },
      { icon: '◈', title: 'Ship', desc: 'Get feedback from the community. Show your work. Land the job.' },
    ],
    bigQuote: { text: 'We do not teach theory. We teach the thing you can do on Monday morning.', attr: '— Dr. Yuki, lead instructor' },
  },
  20: {
    layout: 'editorial',
    decoration: 'pulse',
    marquee: ['Unlimited Context', 'Real Execution', 'Multi-Agent', 'Codebase Memory', 'Tool Calling', 'Sub-agents', 'Ship Faster', 'MCP'],
    stats: [
      { value: '∞', label: 'Context window' },
      { value: '8', suffix: 'M', label: 'Tokens processed' },
      { value: '50', suffix: 'K', label: 'Developers' },
      { value: '<2', suffix: 's', label: 'Time to first fix' },
    ],
    process: [
      { icon: '◧', title: 'Connect', desc: 'Drop us into your repo. We read the codebase, the docs, the open issues.' },
      { icon: '◐', title: 'Ask', desc: 'Plain English. No prompts to memorize. We figure out what you actually meant.' },
      { icon: '◆', title: 'Run', desc: 'We run the code. Find the bug. Fix the bug. Run the tests. Open the PR.' },
      { icon: '✦', title: 'Ship', desc: 'You review. We iterate. The PR lands. The customer never knows we were there.' },
    ],
    bigQuote: { text: 'The best AI is the one you forget you are using. That is the only metric we care about.', attr: '— Sam, founding engineer' },
    gallery: [
      { img: 'showcase/vad_01.png', cap: 'Context, kept' },
      { img: 'showcase/vad_02.png', cap: 'Real execution' },
      { img: 'showcase/vad_03.png', cap: 'Multi-agent' },
      { img: 'thumbs/20_vad.png', cap: 'In the wild' },
      { img: 'showcase/vad_01.png', cap: 'Long sessions' },
      { img: 'showcase/vad_02.png', cap: 'Live PRs' },
    ],
    galleryEyebrow: 'In the wild',
    galleryTitle: 'How it actually feels to use VAD',
    galleryLede: 'Six frames from a working day. No mockups, no demos — real sessions, real code, real PRs.',
    details: [
      { icon: '◧', title: 'Whole-repo context', desc: 'Reads your entire codebase on connect. No "lost in the middle".' },
      { icon: '◆', title: 'Real execution', desc: 'Runs the code, runs the tests, runs the lint. The full loop, not just suggestions.' },
      { icon: '◐', title: 'Multi-agent', desc: 'Spawns sub-agents in parallel. One prompt, six workers, one PR.' },
      { icon: '✦', title: 'Codebase memory', desc: 'Remembers decisions, naming, and patterns across sessions.' },
      { icon: '⌬', title: 'Tool calling', desc: 'Native MCP, function calls, terminal. Every tool, on demand.' },
      { icon: '✺', title: 'Ship in <2s', desc: 'Median time from prompt to first passing test. Less than two seconds.' },
    ],
    team: [
      { initials: 'SM', name: 'Sam Chen', role: 'Founding engineer', bio: 'Built three developer tools before this one. The third one was acquired.', avatarBg: 'linear-gradient(135deg, #7C5CFF, #B89968)' },
      { initials: 'AY', name: 'Aya Yamada', role: 'Research lead', bio: 'PhD on code synthesis. Believes the best AI is the one you forget you are using.', avatarBg: 'linear-gradient(135deg, #B89968, #C66B3D)' },
      { initials: 'DK', name: 'Daniel Kerr', role: 'Systems', bio: 'Built the inference layer. The reason responses come back in under two seconds.', avatarBg: 'linear-gradient(135deg, #26251E, #504F49)' },
      { initials: 'LM', name: 'Lina Moreau', role: 'Design + DX', bio: 'The voice of every prompt. Made the whole thing feel like a person, not a tool.', avatarBg: 'linear-gradient(135deg, #7DF9FF, #7C5CFF)' },
    ],
    press: [
      { name: 'WIRED', style: 'mono' },
      { name: 'The Verge', style: 'bold' },
      { name: 'Hacker News', style: 'mono' },
      { name: 'TechCrunch', style: 'serif' },
      { name: 'GitHub', style: 'display' },
    ],
    faq: [
      { q: 'Is my code private?', a: 'Yes. We never train on your code. We never store your code after the session ends. Self-hosting is available on the Studio plan.' },
      { q: 'How big is the context window really?', a: 'Effectively unlimited. We chunk and re-rank in real time. A 4-million-token codebase feels like 4 million tokens.' },
      { q: 'Does it run code or just suggest?', a: 'It runs code. It executes tests. It opens PRs. Suggestion-only is opt-in, not the default.' },
      { q: 'Can I use it in my editor?', a: 'Yes — VS Code, JetBrains, Neovim, and a CLI. The same model, the same context, the same result.' },
    ],
  },
};

// =========================================================
// PER-DESIGN GALLERY, DETAILS, TEAM, PRESS, FAQ
// These add rich per-design content beyond the core sections.
// =========================================================

// Helper: build a 6-tile gallery from existing assets
function buildGallery(id, thumbName) {
  return [
    { img: `showcase/${thumbName}_01.png`, cap: 'Hero moment' },
    { img: `showcase/${thumbName}_02.png`, cap: 'In the studio' },
    { img: `showcase/${thumbName}_03.png`, cap: 'On the ground' },
    { img: `thumbs/${thumbName}.png`, cap: 'In the wild' },
    { img: `showcase/${thumbName}_01.png`, cap: 'Detail' },
    { img: `showcase/${thumbName}_02.png`, cap: 'The full piece' },
  ];
}

// Extend existing presets with gallery/details/team/press/faq
const EXTRA_CONTENT = {
  1: {
    gallery: buildGallery(1, 'lumiere'),
    galleryEyebrow: 'In the atelier',
    galleryTitle: 'A closer look at the collection',
    galleryLede: 'Six frames from the Paris studio. The dress, the fabric, the hands.',
    details: [
      { icon: '✦', title: 'Hand-embroidered', desc: 'Gold thread on silk, by a single artisan, over three weeks.' },
      { icon: '✂', title: 'Cut on the bolt', desc: 'Every panel hand-cut. No die-cutting, no shortcuts.' },
      { icon: '◈', title: 'French seams', desc: 'Every seam enclosed. The inside of a Lumière piece is as finished as the outside.' },
      { icon: '❋', title: 'Cupro lining', desc: 'Body-temperature silk-cotton blend. Wears like a second skin.' },
      { icon: '◐', title: 'Mother-of-pearl', desc: 'Hand-cut buttons from the Pacific. No two are the same.' },
      { icon: '◆', title: 'Numbered', desc: 'Each piece is signed and numbered. We can tell you who made yours.' },
    ],
    team: [
      { initials: 'ML', name: 'Marie-Louise', role: 'Atelier director', bio: 'Forty years on rue Cambon. Trained under the previous director.', avatarBg: 'linear-gradient(135deg, #C9A961, #6B6450)' },
      { initials: 'IS', name: 'Inès Saint-Cyr', role: 'Head of couture', bio: 'Came from womenswear at Givenchy. Joined Lumière in 2019.', avatarBg: 'linear-gradient(135deg, #0A0A0A, #5A5A5A)' },
      { initials: 'JP', name: 'Jean-Pierre', role: 'Sample room', bio: 'Cutters\u2019 cutter. Has made every toile since 1998.', avatarBg: 'linear-gradient(135deg, #C66B3D, #8A4A2A)' },
      { initials: 'CO', name: 'Camille Okafor', role: 'Embroidery', bio: 'Trained at Lesage. Does the gold thread herself.', avatarBg: 'linear-gradient(135deg, #6B1F2A, #C9A961)' },
    ],
    press: [
      { name: 'VOGUE', style: 'display' },
      { name: 'The New Yorker', style: 'serif' },
      { name: 'Harper\u2019s Bazaar', style: 'serif' },
      { name: 'WWD', style: 'mono' },
      { name: 'Le Figaro', style: 'bold' },
    ],
    faq: [
      { q: 'Do you do ready-to-wear?', a: 'Yes. Two collections a year. Made in the same atelier, by the same hands, in smaller quantities.' },
      { q: 'Where is the atelier?', a: 'On rue Cambon, in the 1st arrondissement. Open by appointment for clients and friends of the house.' },
      { q: 'How long does a couture piece take?', a: 'Three to six months from first sketch to final fitting. The most complex pieces take a year.' },
      { q: 'Do you ship internationally?', a: 'Yes. We hand-carry every piece to its first fitting, anywhere in the world.' },
    ],
  },
  2: {
    gallery: buildGallery(2, 'nomad'),
    galleryEyebrow: 'On the road',
    galleryTitle: 'Six frames from the path',
    galleryLede: 'From the Sahara to the Himalayas, in pictures, not promises.',
    details: [
      { icon: '✺', title: 'Hand-picked routes', desc: 'Every itinerary walked by a guide before you walk it.' },
      { icon: '◉', title: 'Local guides', desc: 'Not actors. The people who make the place what it is.' },
      { icon: '➤', title: 'Max 8 people', desc: 'No megabuses, no megaresorts, no megajetlags.' },
      { icon: '✦', title: '4,000+ alumni', desc: 'Most of our clients come back. That is how you know it works.' },
      { icon: '◐', title: 'Carbon-offset', desc: 'Every trip, every flight, every transfer. Real offsets, audited annually.' },
      { icon: '❋', title: 'Single supplement waived', desc: 'We match you with a roommate. No single penalty, ever.' },
    ],
    team: [
      { initials: 'SK', name: 'Salma Khouri', role: 'Founder', bio: 'Quit consulting at 32 to walk the Sahara. Never really came back.', avatarBg: 'linear-gradient(135deg, #C66B3D, #3D2817)' },
      { initials: 'TN', name: 'Tenzing Norbu', role: 'Himalayan lead', bio: 'Born in Namche. Has summited Everest four times. Guides for us since 2018.', avatarBg: 'linear-gradient(135deg, #4A6B7A, #0A0E1A)' },
      { initials: 'MR', name: 'Mouna Rahimi', role: 'Sahara lead', bio: 'Speaks four languages, sleeps under the stars, has never lost a guest.', avatarBg: 'linear-gradient(135deg, #D4A574, #8B4513)' },
      { initials: 'PL', name: 'Pavel Lysenko', role: 'Patagonia', bio: 'Mountain guide, geologist, dad. Knows every glacier by name.', avatarBg: 'linear-gradient(135deg, #1F2538, #0A0E1A)' },
    ],
    press: [
      { name: 'Condé Nast Traveler', style: 'serif' },
      { name: 'AFAR', style: 'display' },
      { name: 'National Geographic', style: 'bold' },
      { name: 'Outside', style: 'bold' },
      { name: 'Travel + Leisure', style: 'serif' },
    ],
    faq: [
      { q: 'What fitness level do I need?', a: 'Most of our trips are \u201Cyou can walk a city block\u201D fit. We grade every trip 1\u20135 so you know what you are signing up for.' },
      { q: 'Do you do solo trips?', a: 'Yes \u2014 and we waive the single supplement by matching you with another solo traveler of the same gender.' },
      { q: 'What\u2019s the cancellation policy?', a: 'Full refund 90 days out. 50% refund 60 days out. After that, your spot is transferable to another trip, no fee.' },
      { q: 'Is travel insurance included?', a: 'No \u2014 we partner with World Nomads for a 15% discount. You can opt in at booking.' },
    ],
  },
  3: {
    gallery: buildGallery(3, 'atelier'),
    galleryEyebrow: 'In the studio',
    galleryTitle: 'Six projects, in detail',
    galleryLede: 'From the Loire to Lisbon, in concrete, oak, and light.',
    details: [
      { icon: '◧', title: 'Built to last', desc: 'Materials and details chosen for the next century.' },
      { icon: '◐', title: 'Light first', desc: 'We design around the path of the sun.' },
      { icon: '◇', title: 'Honest materials', desc: 'Concrete looks like concrete. Wood looks like wood.' },
      { icon: '✦', title: 'Site-led', desc: 'We spend two weeks on the site before we draw a line.' },
      { icon: '◆', title: 'Hand-drawn plans', desc: 'Every plan is hand-drawn first. Then modelled. Then built.' },
      { icon: '◈', title: '200-year details', desc: 'Joinery that does not need replacing in your lifetime.' },
    ],
    team: [
      { initials: 'EV', name: 'Étienne Vasseur', role: 'Founding partner', bio: 'Trained under Jean Nouvel. Twenty-eight years in practice.', avatarBg: 'linear-gradient(135deg, #1A1A1A, #5A5A5A)' },
      { initials: 'SO', name: 'Sofia Okonkwo', role: 'Design partner', bio: 'Leads interiors. Believes a room is finished when nothing is left to add.', avatarBg: 'linear-gradient(135deg, #D62828, #1A1A1A)' },
      { initials: 'HA', name: 'Hugo Almeida', role: 'Project architect', bio: 'Site-led, model-obsessed. The person who draws every detail.', avatarBg: 'linear-gradient(135deg, #C8C2B8, #4A4742)' },
    ],
    press: [
      { name: 'Architectural Digest', style: 'serif' },
      { name: 'Wallpaper*', style: 'bold' },
      { name: 'Domus', style: 'display' },
      { name: 'Dezeen', style: 'mono' },
      { name: 'El Croquis', style: 'serif' },
    ],
    faq: [
      { q: 'How long does a project take?', a: 'Schematic design: 8 weeks. Design development: 12 weeks. Construction documents: 12 weeks. We do not rush the drawing.' },
      { q: 'Do you do renovations?', a: 'Yes \u2014 about 40% of our work is renovation or adaptive reuse. The other 60% is new build.' },
      { q: 'What is your fee structure?', a: 'Fixed percentage of construction cost, agreed up-front. We never bill hourly. No scope creep.' },
      { q: 'Do you work outside France?', a: 'Yes. We have delivered projects in 11 countries. We are happiest on a tricky site.' },
    ],
  },
  4: {
    gallery: buildGallery(4, 'crescent'),
    galleryEyebrow: 'In the kitchen',
    galleryTitle: 'Six courses, in pictures',
    galleryLede: 'A month on the plate, from the morning market to the pass.',
    details: [
      { icon: '✻', title: 'Seasonal menu', desc: 'The menu changes when the season does. No exceptions.' },
      { icon: '❦', title: 'Single kitchen', desc: 'Every dish from one pass, one chef, one fire.' },
      { icon: '✦', title: 'Reservations only', desc: 'No walk-ins. We promise you will not wait for a table.' },
      { icon: '◐', title: 'Sommelier-paired', desc: 'A different glass for every course. No exceptions.' },
      { icon: '◆', title: '12 seats at the pass', desc: 'You watch the chef plate. The kitchen is the dining room.' },
      { icon: '◈', title: 'Vegetarian option', desc: 'Eight courses, no compromise. The chef designs around you.' },
    ],
    team: [
      { initials: 'YA', name: 'Yara Aboud', role: 'Chef-owner', bio: 'Trained under Daniel Boulud. Cooks every plate, every night.', avatarBg: 'linear-gradient(135deg, #C9A961, #6B1F2A)' },
      { initials: 'LA', name: 'Lucia Almeida', role: 'Pastry', bio: 'The desserts are the reason half our reservations rebook.', avatarBg: 'linear-gradient(135deg, #7A8B5C, #F5F0E8)' },
      { initials: 'OS', name: 'Omar Sharif', role: 'Sommelier', bio: '300 bottles in the cellar. Knows every producer by first name.', avatarBg: 'linear-gradient(135deg, #6B1F2A, #1A0A0F)' },
      { initials: 'NE', name: 'Nour El-Sayed', role: 'Front of house', bio: 'Trained at Noma. Makes the room feel like a private dining room.', avatarBg: 'linear-gradient(135deg, #C66B3D, #7A8B5C)' },
    ],
    press: [
      { name: 'EATER', style: 'bold' },
      { name: 'Bon Appétit', style: 'serif' },
      { name: 'The World\u2019s 50 Best', style: 'display' },
      { name: 'Food & Wine', style: 'serif' },
      { name: 'Michelin Guide', style: 'bold' },
    ],
    faq: [
      { q: 'How far in advance should I book?', a: 'Two to four weeks for weeknights, six to eight for weekends. Same-day cancellations open up \u2014 join the waitlist.' },
      { q: 'Do you do private dining?', a: 'Yes \u2014 the chef\u2019s table seats four, by request, with a custom menu designed around you.' },
      { q: 'Are kids welcome?', a: 'Yes for lunch. We ask that dinner be 12+ \u2014 the eight-course tasting is a long evening for younger guests.' },
      { q: 'What is the dress code?', a: 'Whatever makes you feel good. We have had tuxedos and t-shirts. Both were perfect.' },
    ],
  },
  5: {
    gallery: buildGallery(5, 'verdant'),
    galleryEyebrow: 'In the field',
    galleryTitle: 'Six farms, in practice',
    galleryLede: 'Where the products come from, and the people who grow them.',
    details: [
      { icon: '❀', title: 'Carbon negative', desc: 'We remove more than we emit. Public ledger, audited annually.' },
      { icon: '✿', title: 'Regenerative sourcing', desc: 'Every supplier answers: does this leave the land better?' },
      { icon: '✤', title: 'Plastic-free shipping', desc: 'Compostable mailers, mushroom packaging, paper tape.' },
      { icon: '✦', title: 'Refill, not landfill', desc: 'Send the bottle back, we refill and ship. Forever.' },
      { icon: '◐', title: 'B-Corp certified', desc: 'Top 5% of B-Corps globally. Re-certified every three years.' },
      { icon: '◆', title: '1% for the planet', desc: 'One percent of every order goes to land regeneration.' },
    ],
    team: [
      { initials: 'AM', name: 'Amara Mensah', role: 'Founder', bio: 'Soil scientist turned entrepreneur. The reason every supplier gets audited.', avatarBg: 'linear-gradient(135deg, #2D4A2B, #7A8B5C)' },
      { initials: 'PB', name: 'Priya Banerjee', role: 'Head of product', bio: 'Turns sustainability into a refill bottle you actually want to keep.', avatarBg: 'linear-gradient(135deg, #C66B3D, #F5E6D3)' },
      { initials: 'JK', name: 'Jonas Kessler', role: 'Supply chain', bio: 'Knows every farm by name. The reason our coffee is actually fair-trade.', avatarBg: 'linear-gradient(135deg, #8B6B3D, #3D5A3D)' },
    ],
    press: [
      { name: 'The Guardian', style: 'serif' },
      { name: 'Fast Company', style: 'bold' },
      { name: 'WIRED', style: 'mono' },
      { name: 'Atlas Obscura', style: 'serif' },
      { name: 'YES! Magazine', style: 'bold' },
    ],
    faq: [
      { q: 'How does the refill program work?', a: 'Order the bottle once. When you run out, mail it back in the prepaid envelope. We wash, refill, and ship. Forever.' },
      { q: 'Are your products vegan?', a: 'About 90% are. The 10% that aren\u2019t (a beeswax candle, a wool dryer ball) are clearly marked.' },
      { q: 'Where do you ship?', a: 'EU, UK, US, and Canada. We are working on Australia and Japan \u2014 subscribe to the newsletter for the launch.' },
      { q: 'Do you do wholesale?', a: 'Yes \u2014 refill stations, zero-waste shops, and design hotels. Email wholesale@verdant.eco.' },
    ],
  },
  6: {
    gallery: buildGallery(6, 'nebula'),
    galleryEyebrow: 'On rotation',
    galleryTitle: 'Six albums we cannot stop playing',
    galleryLede: 'From the front-row sessions to the vinyl vault. A month on the turntable.',
    details: [
      { icon: '♫', title: 'Lossless audio', desc: '24-bit, 96kHz. Studio-grade, not the compressed version.' },
      { icon: '◐', title: 'Curated daily', desc: 'A real person picks. Not an algorithm. The same curator for years.' },
      { icon: '♪', title: 'Offline first', desc: 'Download everything. Listen on a plane, on a train, in a basement.' },
      { icon: '♬', title: 'Vinyl vault', desc: 'Pre-1980 jazz, soul, rare grooves. Ripped from the original masters.' },
      { icon: '✦', title: 'Front-row sessions', desc: 'Exclusive live recordings from 12 cities, streamed in lossless.' },
      { icon: '✺', title: 'Friday mixtape', desc: 'A real human\u2019s pick, every Friday. The way music used to be shared.' },
    ],
    team: [
      { initials: 'DP', name: 'Devon Park', role: 'Head of curation', bio: 'DJ since 2003. Has a record collection that fills a basement.', avatarBg: 'linear-gradient(135deg, #7B2CBF, #00E5FF)' },
      { initials: 'MJ', name: 'Maya Jenkins', role: 'Jazz lead', bio: 'Lived in New Orleans for ten years. Knows every pre-1980 groove.', avatarBg: 'linear-gradient(135deg, #FF006E, #7B2CBF)' },
      { initials: 'TR', name: 'Tomás Reyes', role: 'Live sessions', bio: 'Records the front-row sessions. Has taped 240 of them.', avatarBg: 'linear-gradient(135deg, #00E5FF, #000000)' },
    ],
    press: [
      { name: 'Pitchfork', style: 'bold' },
      { name: 'The FADER', style: 'display' },
      { name: 'Resident Advisor', style: 'mono' },
      { name: 'NME', style: 'bold' },
      { name: 'The Wire', style: 'serif' },
    ],
    faq: [
      { q: 'What bitrate do you stream at?', a: 'Lossless \u2014 24-bit, 96kHz, FLAC. About 4x the data of Spotify Premium. Worth it on real speakers.' },
      { q: 'Can I download for offline?', a: 'Yes \u2014 everything in your library, on up to 5 devices. The downloads are lossless too.' },
      { q: 'How is your curation different?', a: 'Four real humans. No A/B testing, no "because you listened to X". The same person who picks your mix picks for everyone.' },
      { q: 'Do you have a free tier?', a: 'Yes \u2014 but the free tier is lossy. The lossless tier is $9.99/mo, with a 30-day free trial.' },
    ],
  },
  7: {
    gallery: buildGallery(7, 'odyssey'),
    galleryEyebrow: 'At altitude',
    galleryTitle: 'Six summits, six stories',
    galleryLede: 'From K2 to the Roof of the World, in the words of the people who came back.',
    details: [
      { icon: '▲', title: '142 summits', desc: 'Successful summits since 2012. Zero fatalities.' },
      { icon: '◐', title: '6 continents', desc: 'We operate on every continent except Antarctica (and we\u2019re working on it).' },
      { icon: '✦', title: '6-month prep', desc: 'We design a training plan for your body, not the brochure.' },
      { icon: '◈', title: 'Sherpa-led', desc: 'Local guides who know the mountain personally. Not imported contractors.' },
      { icon: '✺', title: '12 years guiding', desc: 'No client has ever needed rescue. That is the only metric we track.' },
      { icon: '➤', title: 'No ego trips', desc: 'If the mountain is not in, we tell you. We have turned around at base camp.' },
    ],
    team: [
      { initials: 'PR', name: 'Pavel Reznik', role: 'Lead guide', bio: 'Eight K2 summits. The reason the team has a 100% safety record.', avatarBg: 'linear-gradient(135deg, #4A90E2, #1A2B4A)' },
      { initials: 'TN', name: 'Tenzing Norbu', role: 'Sherpa lead', bio: 'Born in Namche. Has summited Everest 11 times.', avatarBg: 'linear-gradient(135deg, #8B6B3D, #1A3D2E)' },
      { initials: 'CC', name: 'Camila Cruz', role: 'Patagonia lead', bio: 'Mountaineer, geologist, mom. Speaks four languages.', avatarBg: 'linear-gradient(135deg, #FFB088, #9B7EDE)' },
    ],
    press: [
      { name: 'National Geographic', style: 'bold' },
      { name: 'Outside', style: 'bold' },
      { name: 'Climbing Magazine', style: 'serif' },
      { name: 'Adventure Journal', style: 'display' },
      { name: 'The New York Times', style: 'serif' },
    ],
    faq: [
      { q: 'What fitness level do I need?', a: 'You should be able to run 10k, do 20 pull-ups, and hike 8 hours with a 15kg pack. We design the rest.' },
      { q: 'How dangerous is it really?', a: 'K2 has a fatality rate of ~1 in 25. With a Sherpa team and proper acclimatization, our clients have a 100% return rate.' },
      { q: 'What if I have to turn back?', a: 'You turn back. No refund, no judgment. The mountain will be there next year.' },
      { q: 'Can I do it solo?', a: 'No. We do not run solo expeditions. The Sherpa team is non-negotiable.' },
    ],
  },
  8: {
    gallery: buildGallery(8, 'vertex'),
    galleryEyebrow: 'On-chain',
    galleryTitle: 'Six vaults, six chains',
    galleryLede: 'Where the money lives, and how it works while you sleep.',
    details: [
      { icon: '◆', title: 'Self-custody', desc: 'You own your keys. We never have access to your funds.' },
      { icon: '⌬', title: 'Audited contracts', desc: 'Every contract audited by three independent firms. Public reports.' },
      { icon: '◈', title: 'No gas surprises', desc: 'Predictable fees, batched transactions, no hidden costs.' },
      { icon: '✦', title: 'Cross-chain', desc: '12 chains, one balance. Move without bridging, every time.' },
      { icon: '◐', title: 'Pro trading', desc: 'Sub-second execution, deep liquidity, no hidden fees.' },
      { icon: '✺', title: 'No lock-ups', desc: 'Withdraw any time, any amount. The money is always yours.' },
    ],
    team: [
      { initials: 'LO', name: 'Lena Okonkwo', role: 'Founder & CEO', bio: 'Quant turned founder. Quit Jane Street to build this.', avatarBg: 'linear-gradient(135deg, #7B2CBF, #FF006E)' },
      { initials: 'AV', name: 'Alex Volkov', role: 'CTO', bio: 'Smart contracts since 2017. Wrote three of the EIPs.', avatarBg: 'linear-gradient(135deg, #00FF88, #00E5FF)' },
      { initials: 'NJ', name: 'Naomi Johnson', role: 'Risk', bio: 'Former Circle. The reason we have zero security incidents.', avatarBg: 'linear-gradient(135deg, #14B8A6, #0EA5E9)' },
    ],
    press: [
      { name: 'CoinDesk', style: 'bold' },
      { name: 'The Block', style: 'serif' },
      { name: 'Decrypt', style: 'mono' },
      { name: 'Bankless', style: 'display' },
      { name: 'Bloomberg', style: 'bold' },
    ],
    faq: [
      { q: 'What is self-custody, really?', a: 'You hold the private keys. We never see them, never store them. If we get hacked, your funds are safe.' },
      { q: 'How do you make money?', a: 'A 0.05% fee on yield, only on what you actually earn. No deposit fees, no withdrawal fees.' },
      { q: 'What chains do you support?', a: 'Ethereum, Base, Arbitrum, Optimism, Polygon, Avalanche, Solana, Sui, Aptos, NEAR, Stellar, and TON.' },
      { q: 'Has the protocol been audited?', a: 'Three times \u2014 by Trail of Bits, OpenZeppelin, and Spearbit. Reports are public.' },
    ],
  },
  9: {
    gallery: buildGallery(9, 'helix'),
    galleryEyebrow: 'In the clinic',
    galleryTitle: 'Six visits, in the room',
    galleryLede: 'What healthcare actually looks like, when nobody is rushed.',
    details: [
      { icon: '✚', title: 'Licensed clinicians', desc: 'Real doctors, real therapists. Not chatbots pretending to be either.' },
      { icon: '◉', title: 'Same-day visits', desc: 'Talk to someone today, not in three weeks. Every day of the week.' },
      { icon: '✦', title: 'Your data, your rules', desc: 'HIPAA-grade security, end-to-end encryption, export any time.' },
      { icon: '◐', title: 'Same clinician', desc: 'See the same person every time. We do not rotate you through strangers.' },
      { icon: '◆', title: 'At-home labs', desc: 'Real lab work, real results. No waiting rooms, no awkward magazines.' },
      { icon: '✺', title: '24/7 care', desc: 'Real human on call. Not a phone tree, not a chatbot.' },
    ],
    team: [
      { initials: 'YT', name: 'Dr. Yuki Tanaka', role: 'Chief Medical Officer', bio: 'Internal medicine, 18 years. Believes healthcare is a relationship.', avatarBg: 'linear-gradient(135deg, #1A4D5C, #A8DADC)' },
      { initials: 'RM', name: 'Dr. Ravi Mehta', role: 'Mental health lead', bio: 'Therapist since 2008. Trauma-trained, evidence-based.', avatarBg: 'linear-gradient(135deg, #FF6B6B, #F5E6D3)' },
      { initials: 'EK', name: 'Dr. Elena Kowalski', role: 'Pediatrics', bio: 'Mother of three, pediatrician of twenty. Books in 3 weeks.' },
      { initials: 'JG', name: 'Dr. James Garcia', role: 'Dermatology', bio: 'Stanford-trained. The person you go to for the thing you have been ignoring.', avatarBg: 'linear-gradient(135deg, #0EA5E9, #FFFFFF)' },
    ],
    press: [
      { name: 'STAT', style: 'bold' },
      { name: 'WIRED', style: 'mono' },
      { name: 'The Atlantic', style: 'serif' },
      { name: 'Kaiser Health News', style: 'serif' },
      { name: 'DocWire', style: 'display' },
    ],
    faq: [
      { q: 'Is Helix insurance?', a: 'No \u2014 Helix is care. We work with most major insurance plans. You pay your copay, we do the rest.' },
      { q: 'What conditions do you treat?', a: '90% of primary care: colds, mental health, skin, pediatrics, women\u2019s health, chronic conditions, prescriptions.' },
      { q: 'How fast can I see someone?', a: 'Average wait is 8 minutes. Same-day visits, 7 days a week.' },
      { q: 'Can I keep my regular doctor?', a: 'Yes \u2014 Helix is in addition to your existing care. We send notes to your PCP after every visit.' },
    ],
  },
  10: {
    gallery: buildGallery(10, 'polaris'),
    galleryEyebrow: 'On orbit',
    galleryTitle: 'Six missions, in flight',
    galleryLede: 'From the launch pad to low-earth orbit, in real-time.',
    details: [
      { icon: '▲', title: 'Flight-proven', desc: 'Hardware that has actually been to space, not just in renderings.' },
      { icon: '✦', title: 'Mission-grade QA', desc: 'Every unit tested to NASA outgassing specs. We are the specs.' },
      { icon: '⌖', title: 'Real-time telemetry', desc: 'Stream every reading, every moment, every orbit.' },
      { icon: '◐', title: '24/7 mission control', desc: 'Real engineers, on shift, watching your satellite like a hawk.' },
      { icon: '◆', title: 'On-time launches', desc: '14 successful missions, on time, on budget. The launch is the easy part.' },
      { icon: '◈', title: 'Sub-meter imagery', desc: 'Earth observation delivered within 90 minutes of capture.' },
    ],
    team: [
      { initials: 'MA', name: 'Dr. Maya Anand', role: 'Chief engineer', bio: 'NASA JPL for 12 years. The reason we have zero mission failures.', avatarBg: 'linear-gradient(135deg, #0A1929, #C0C0C0)' },
      { initials: 'RV', name: 'Ravi Venkatesh', role: 'Mission control', bio: 'Watched 240 satellite passes from the console. Knows every orbit by heart.', avatarBg: 'linear-gradient(135deg, #FF6B35, #0A0A0A)' },
      { initials: 'HL', name: 'Hana Lindqvist', role: 'Astronaut training', bio: 'Former ESA. Designs the sub-orbital curriculum.', avatarBg: 'linear-gradient(135deg, #1A2B5C, #FF6B35)' },
    ],
    press: [
      { name: 'SpaceNews', style: 'display' },
      { name: 'Aviation Week', style: 'serif' },
      { name: 'Ars Technica', style: 'bold' },
      { name: 'MIT Tech Review', style: 'serif' },
      { name: 'The Economist', style: 'bold' },
    ],
    faq: [
      { q: 'How much does a launch cost?', a: 'Small-sat rideshare starts at $1.2M for a 12U cubesat. Dedicated launches start at $24M. Email us for a custom quote.' },
      { q: 'What if my satellite fails?', a: 'We have a 100% mission success rate across 14 launches. If something goes wrong, mission control will tell you in under 60 seconds.' },
      { q: 'How fast is the imagery?', a: 'Sub-meter resolution, delivered within 90 minutes of capture, anywhere on Earth.' },
      { q: 'Can civilians train for sub-orbital?', a: 'Yes \u2014 the program is open to researchers, journalists, and educators. Six months of training, then you fly.' },
    ],
  },
  11: {
    gallery: buildGallery(11, 'mira'),
    galleryEyebrow: 'In the darkroom',
    galleryTitle: 'Six frames, one photographer',
    galleryLede: 'From Lisbon to the night walks, in the prints themselves.',
    details: [
      { icon: '◐', title: 'Original RAW files', desc: 'You get the full archive, not the curated highlights.' },
      { icon: '✦', title: 'Print-ready', desc: '300dpi, color-managed, ready for the gallery wall.' },
      { icon: '◇', title: 'Unlimited revisions', desc: 'We shoot until you love every frame. No timer.' },
      { icon: '◆', title: 'Hand-printed', desc: 'Darkroom prints, signed and numbered. The only ones worth framing.' },
      { icon: '✺', title: 'Film available', desc: 'Medium format, large format, or digital. Your call.' },
      { icon: '◈', title: 'Worldwide', desc: 'Based in Lisbon, available worldwide. Travel is on us.' },
    ],
    team: [
      { initials: 'MR', name: 'Mira Rauch', role: 'Photographer', bio: 'Twelve solo shows, two books, thirty-eight countries. The work is the work.', avatarBg: 'linear-gradient(135deg, #C73E1D, #0A0506)' },
      { initials: 'TM', name: 'Tomás Moutinho', role: 'Studio manager', bio: 'Runs the darkroom, prints every final. The reason the prints are flawless.', avatarBg: 'linear-gradient(135deg, #1A1A1A, #D4A574)' },
    ],
    press: [
      { name: 'Aperture', style: 'serif' },
      { name: 'British Journal of Photography', style: 'serif' },
      { name: 'FOAM Magazine', style: 'bold' },
      { name: 'Magnum Photos', style: 'display' },
      { name: 'The New York Times', style: 'serif' },
    ],
    faq: [
      { q: 'How long is a session?', a: 'Two to four hours for portraits. For documentary, we sometimes shoot for days. There is no timer.' },
      { q: 'Do you shoot film or digital?', a: 'Both. Film for the projects, digital for the assignments. We let the work decide.' },
      { q: 'How are prints delivered?', desc: 'Hand-printed, signed, numbered, framed if you want. Shipped in archival boxes within four weeks.' },
      { q: 'Do you license the images?', a: 'Yes \u2014 editorial, commercial, and gallery licensing. The work always stays with us first.' },
    ],
  },
  12: {
    gallery: buildGallery(12, 'brewco'),
    galleryEyebrow: 'On the bar',
    galleryTitle: 'Six cups, in the cup',
    galleryLede: 'From the farm to the espresso bar, in the cup itself.',
    details: [
      { icon: '◉', title: 'Single-origin', desc: 'Every bag traceable to a single farm, a single harvest, a single roast.' },
      { icon: '☕', title: 'Roasted to order', desc: 'Shipped within 48 hours of leaving the drum. Always fresh.' },
      { icon: '✺', title: 'Direct trade', desc: 'We pay the farmer 3x the Fair Trade minimum. Always.' },
      { icon: '✦', title: 'Q-graded', desc: 'Every batch cupped by certified Q-graders. The defective 3% goes home with us.' },
      { icon: '◐', title: 'Brew guides', desc: 'Every bag ships with the recipe. We make it easy to make it right.' },
      { icon: '◆', title: 'Refillable bags', desc: 'Send the bag back, we refill and ship. Less waste, more coffee.' },
    ],
    team: [
      { initials: 'KW', name: 'Kenji Watanabe', role: 'Head roaster', bio: 'Q-grader, 18 years. Drinks the defective 3% himself.', avatarBg: 'linear-gradient(135deg, #6B4423, #F5E6D3)' },
      { initials: 'MO', name: 'Maya Okafor', role: 'Sourcing', bio: 'Visits the farms. Pays the farmers. The reason we can call it direct trade.', avatarBg: 'linear-gradient(135deg, #C66B3D, #8B6B3D)' },
      { initials: 'BS', name: 'Ben Shapiro', role: 'Brooklyn bar', bio: 'Eight seats, one bar, no laptops after 11am. The way cafes used to be.', avatarBg: 'linear-gradient(135deg, #0A0506, #C66B3D)' },
    ],
    press: [
      { name: 'Sprudge', style: 'display' },
      { name: 'Perfect Daily Grind', style: 'serif' },
      { name: 'Eater', style: 'bold' },
      { name: 'Barista Magazine', style: 'serif' },
      { name: 'The New Yorker', style: 'serif' },
    ],
    faq: [
      { q: 'How fresh is the coffee?', a: 'Shipped within 48 hours of leaving the drum. You will see the roast date on every bag.' },
      { q: 'Do you sell decaf?', a: 'Yes \u2014 the Swiss Water process, single-origin. Tastes like coffee, not like chemistry.' },
      { q: 'What\u2019s your most popular bag?', a: 'The Daily Ritual \u2014 our flagship light roast. Floral, citrus, the cup you reach for every morning.' },
      { q: 'Do you do wholesale?', a: 'Yes \u2014 60+ cafes in NYC, SF, Tokyo, London, and Seoul. Email wholesale@brewco.cafe.' },
    ],
  },
  13: {
    gallery: buildGallery(13, 'ember'),
    galleryEyebrow: 'On the day',
    galleryTitle: 'Six weddings, in the details',
    galleryLede: 'From the Tuscan vineyard to the Parisian château, in the small moments.',
    details: [
      { icon: '✦', title: 'Single planner', desc: 'One person from first call to last dance. No hand-offs.' },
      { icon: '❀', title: 'Vendor-agnostic', desc: 'We do not take commissions. We recommend what is right for you.' },
      { icon: '◐', title: 'Day-of coordination', desc: 'We run the day. You live it. We handle every glitch in real time.' },
      { icon: '◈', title: '14 countries', desc: 'Tuscany, Paris, Santorini, Marrakech, the Cotswolds. We have done them all.' },
      { icon: '◆', title: 'No bridezilla moments', desc: 'Our couples rebook their anniversary dinners. That is the metric.' },
      { icon: '✺', title: 'Real flowers only', desc: 'No silk, no faux, no foam. The week-of, by a real florist.' },
    ],
    team: [
      { initials: 'AY', name: 'Anya Yusupova', role: 'Founder & lead planner', bio: '142 weddings, zero bridezilla moments. The reason people rebook.', avatarBg: 'linear-gradient(135deg, #6B1F2A, #F4D5D0)' },
      { initials: 'LM', name: 'Lucia Marini', role: 'Tuscany lead', bio: 'Lives in Florence. Knows every vineyard, every caterer, every corner.', avatarBg: 'linear-gradient(135deg, #C9A961, #FAF7F0)' },
      { initials: 'CJ', name: 'Camille Joubert', role: 'Paris lead', bio: 'Trained at Hôtel de Crillon. The reason the Parisian weddings are magic.', avatarBg: 'linear-gradient(135deg, #C66B3D, #3D5A3D)' },
    ],
    press: [
      { name: 'Vogue Weddings', style: 'display' },
      { name: 'Brides', style: 'serif' },
      { name: 'The Knot', style: 'bold' },
      { name: 'Over the Moon', style: 'serif' },
      { name: 'Once Wed', style: 'serif' },
    ],
    faq: [
      { q: 'How far in advance do you book?', a: 'Peak season (May\u2013October) books 9\u201312 months out. Shoulder seasons have more flexibility.' },
      { q: 'What does the day-of package include?', a: 'A lead planner, an assistant, vendor coordination, timeline management, and \u2014 most importantly \u2014 the ability to fix anything in real time.' },
      { q: 'Do you plan elopements?', a: 'Yes \u2014 from a two-person Santorini sunset to a 30-person Tuscan villa. The planning is the same; the day is just smaller.' },
      { q: 'What is your fee?', a: 'Starts at $14,000 for full planning. Day-of coordination starts at $6,800. Custom quotes for destination weddings.' },
    ],
  },
  14: {
    gallery: buildGallery(14, 'mosaic'),
    galleryEyebrow: 'On the wall',
    galleryTitle: 'Six shows, in the room',
    galleryLede: 'From the solo show to the first Friday opening, in the work itself.',
    details: [
      { icon: '◐', title: '4 artists a year', desc: 'Not forty. Each one gets a real show.' },
      { icon: '✦', title: 'Direct from studio', desc: 'No middlemen, no markups, no reproductions. Original work only.' },
      { icon: '◈', title: '70% to the artist', desc: 'When the work sells, the artist gets 70%. The gallery keeps 30%.' },
      { icon: '◆', title: 'Certificate of authenticity', desc: 'Signed, numbered, archived. Your piece is provably the one.' },
      { icon: '❀', title: 'Free First Fridays', desc: 'Open evening, the first Friday of every month. Wine, the artists, the room.' },
      { icon: '✺', title: '280K visitors a year', desc: 'The largest independent gallery in Berlin. The most visited per square meter.' },
    ],
    team: [
      { initials: 'MR', name: 'Mateo Reyes', role: 'Director', bio: 'Curator since 2009. The reason the rooms are built around the work.', avatarBg: 'linear-gradient(135deg, #FF6B00, #000000)' },
      { initials: 'AK', name: 'Anna Kowalski', role: 'Senior curator', bio: 'Leads the photography program. Has a great eye for first shows.', avatarBg: 'linear-gradient(135deg, #0A0A0A, #FFD700)' },
      { initials: 'JT', name: 'Jin Tanaka', role: 'Installation', bio: 'Builds the rooms. The reason the light is right.', avatarBg: 'linear-gradient(135deg, #FF0000, #FFFFFF)' },
    ],
    press: [
      { name: 'ARTnews', style: 'bold' },
      { name: 'Frieze', style: 'serif' },
      { name: 'Artforum', style: 'serif' },
      { name: 'Hyperallergic', style: 'mono' },
      { name: 'Contemporary Art Daily', style: 'display' },
    ],
    faq: [
      { q: 'How do I buy a piece?', a: 'Email the work title to sales@mosaic.gallery. We will send the certificate, the invoice, and arrange shipping.' },
      { q: 'Do you take consignments?', a: 'No \u2014 the work is direct from the artist\u2019s studio. The certificate includes the provenance.' },
      { q: 'Are First Fridays really free?', a: 'Yes. Open evening, the first Friday of every month, 6\u201310pm. Wine, the artists, the room.' },
      { q: 'Do you ship internationally?', a: 'Yes \u2014 we have shipped to 38 countries. Crating, customs, insurance, all included.' },
    ],
  },
  15: {
    gallery: buildGallery(15, 'apex'),
    galleryEyebrow: 'On the floor',
    galleryTitle: 'Six lifts, in the gym',
    galleryLede: 'From the iron program to the marathon build, in real numbers.',
    details: [
      { icon: '◆', title: 'Real coaches', desc: 'Every program written by a coach with a national certification.' },
      { icon: '◐', title: 'Periodized training', desc: 'No random workouts. Cycles, deloads, progressive overload.' },
      { icon: '✦', title: 'Form first', desc: 'We would rather you lift less with perfect form than more with bad form.' },
      { icon: '✺', title: 'InBody scan', desc: 'Every new member does a scan, a movement screen, and a goals interview.' },
      { icon: '◈', title: 'Re-assess every 8 weeks', desc: 'The data tells the truth. We use it.' },
      { icon: '✤', title: 'Open gym 24/7', desc: 'Train at 4am or 10pm. The keys are yours.' },
    ],
    team: [
      { initials: 'TH', name: 'Tariq Hassan', role: 'Head coach', bio: 'CSCS, 12 years. Added 40kg to his deadlift in his first year here.', avatarBg: 'linear-gradient(135deg, #FFD60A, #1A1A1A)' },
      { initials: 'JN', name: 'Jules Nakamura', role: 'Olympic lifting', bio: 'Former national team. The reason our lifters do not plateau.', avatarBg: 'linear-gradient(135deg, #DC2626, #1A1A1A)' },
      { initials: 'MA', name: 'Marcus Allen', role: 'Conditioning', bio: 'CrossFit L2, ex-football. Designs the WODs.', avatarBg: 'linear-gradient(135deg, #00FF88, #000000)' },
    ],
    press: [
      { name: 'Men\u2019s Health', style: 'bold' },
      { name: 'Runner\u2019s World', style: 'serif' },
      { name: 'BarBend', style: 'display' },
      { name: 'Breaking Muscle', style: 'serif' },
      { name: 'T-Nation', style: 'mono' },
    ],
    faq: [
      { q: 'Do I need to be in shape to start?', a: 'No. The first session is a movement screen, an InBody scan, and a goals interview. We build the program around you.' },
      { q: 'How much does it cost?', a: '$189/mo for the open gym + classes. Personal training is $89/session, or $649/mo for 8 sessions.' },
      { q: 'Is there a contract?', a: 'No \u2014 month-to-month. Cancel any time, no fee.' },
      { q: 'Do you have a women\u2019s only program?', a: 'Yes \u2014 the women\u2019s strength program runs Tuesday and Thursday at 6pm, with a female coach.' },
    ],
  },
  16: {
    gallery: buildGallery(16, 'chapter'),
    galleryEyebrow: 'On the press',
    galleryTitle: 'Six titles, in the books',
    galleryLede: 'From the hardback list to the indie bookshop, in the books themselves.',
    details: [
      { icon: '❦', title: 'Author-friendly terms', desc: 'We pay advances. We pay royalties. We do not bury rights.' },
      { icon: '✦', title: 'Independent voice', desc: 'No corporate parent, no marketing department, no algorithmic shelf.' },
      { icon: '◐', title: 'Real distribution', desc: '240 independent bookstores across 12 countries. Not just on Amazon.' },
      { icon: '◆', title: '12 titles a year', desc: 'Fiction, memoir, essays, poetry, translation. Every one edited by a human.' },
      { icon: '✺', title: 'Letterpress limited editions', desc: 'For the books that earn it. Hand-set, signed, numbered.' },
      { icon: '◈', title: 'Audiobook with every title', desc: 'Narrated by the author, when we can. Always human.' },
    ],
    team: [
      { initials: 'EM', name: 'Elena Marquez', role: 'Editor-in-chief', bio: '20 years in independent publishing. The reason our slush pile is read by humans.', avatarBg: 'linear-gradient(135deg, #6B1F2A, #A8B89A)' },
      { initials: 'DR', name: 'Dimitri Roussel', role: 'Senior editor', bio: 'Fiction, translation. The reason our novels feel like novels.', avatarBg: 'linear-gradient(135deg, #8B6B3D, #1A1A1A)' },
      { initials: 'AO', name: 'Adaeze Okafor', role: 'Poetry', bio: 'Poet, critic, editor. Reads every manuscript twice.', avatarBg: 'linear-gradient(135deg, #FF6B6B, #FFFFFF)' },
    ],
    press: [
      { name: 'The Paris Review', style: 'serif' },
      { name: 'Granta', style: 'bold' },
      { name: 'The Believer', style: 'serif' },
      { name: 'n+1', style: 'display' },
      { name: 'Lit Hub', style: 'mono' },
    ],
    faq: [
      { q: 'Do you accept unsolicited manuscripts?', a: 'Yes \u2014 we read every one. Send a query letter and 30 pages to submissions@chapter.press. Response within 12 weeks.' },
      { q: 'What is your advance structure?', a: '$8,000\u2013$25,000 for debut fiction, more for established authors. Royalty rates start at 15% hardcover, 22% paperback.' },
      { q: 'Do you publish translations?', a: 'Yes \u2014 about 30% of the list is translation. We work with the translator as a full partner, not a service provider.' },
      { q: 'How do I find a Chapter book near me?', a: 'Use the stockist map at chapter.press/find. 240 independent bookstores in 12 countries.' },
    ],
  },
  17: {
    gallery: buildGallery(17, 'spark'),
    galleryEyebrow: 'On the wall',
    galleryTitle: 'Six brands, in the wild',
    galleryLede: 'From the logo to the launch, in the work itself.',
    details: [
      { icon: '✦', title: 'Senior-only team', desc: 'No juniors learning on your dime. The people who pitch do the work.' },
      { icon: '◈', title: 'Fixed-price projects', desc: 'No hourly billing, no scope creep, no surprise invoices.' },
      { icon: '✺', title: 'We say no', desc: 'If a brief is bad for the brand, we say so. Even before signing.' },
      { icon: '◐', title: 'Brand + product', desc: 'Logo, type, color, voice, web, app. The whole thing, designed as one.' },
      { icon: '◆', title: 'Strategy first', desc: 'Two weeks of listening before any pixels move.' },
      { icon: '✤', title: 'Launch support', desc: 'We stay for 90 days after launch. The launch is the start, not the end.' },
    ],
    team: [
      { initials: 'TB', name: 'Theo Bennett', role: 'Founder & creative director', bio: 'Sixteen years in the room. Believes the brief is half the work.', avatarBg: 'linear-gradient(135deg, #FF006E, #F5F0E8)' },
      { initials: 'EC', name: 'Emma Chen', role: 'Strategy lead', bio: 'Reads the customer research, writes the positioning. The reason our brands work.', avatarBg: 'linear-gradient(135deg, #E0BBE4, #FFB088)' },
      { initials: 'RB', name: 'Rafael Borges', role: 'Design lead', bio: 'Type-obsessed. The reason our brands feel like brands.', avatarBg: 'linear-gradient(135deg, #FFD60A, #0A0A0A)' },
    ],
    press: [
      { name: 'It\u2019s Nice That', style: 'serif' },
      { name: 'AIGA Eye on Design', style: 'serif' },
      { name: 'Brand New', style: 'mono' },
      { name: 'Communication Arts', style: 'display' },
      { name: 'The Dieline', style: 'bold' },
    ],
    faq: [
      { q: 'How much does a brand project cost?', a: 'Starts at $80,000 for identity, $150,000 for identity + web. Custom quotes for product or campaign work.' },
      { q: 'How long does a project take?', a: 'Identity: 12 weeks. Identity + web: 18 weeks. We do not rush the strategy phase.' },
      { q: 'Do you do naming?', a: 'Yes \u2014 the naming sprint is $24,000, delivered in three weeks. Comes with trademark search and linguistic check.' },
      { q: 'Do you work with startups?', a: 'Yes \u2014 about 30% of the work is pre-Series A. The brief is the same; the budget is different.' },
    ],
  },
  18: {
    gallery: buildGallery(18, 'tide'),
    galleryEyebrow: 'On the coast',
    galleryTitle: 'Six homes, in the light',
    galleryLede: 'From the cove to the olive estate, in the houses themselves.',
    details: [
      { icon: '◐', title: 'Off-market first', desc: 'We share listings with our clients 48 hours before they hit MLS.' },
      { icon: '✦', title: 'Local-only agents', desc: 'Each agent works one neighborhood. Knows every block, every comp.' },
      { icon: '◈', title: 'No dual agency', desc: 'We never represent both sides. Your interests, full stop.' },
      { icon: '◆', title: '14 coastal markets', desc: 'From the Hamptons to the Aegean. Local in each one.' },
      { icon: '✺', title: '$2.4B closed in 2025', desc: 'Across 142 homes. Average days on market: 18.' },
      { icon: '❋', title: 'Buyer + seller rep', desc: 'Different agents for each side, even on a flip. No conflict, ever.' },
    ],
    team: [
      { initials: 'JC', name: 'James Cole', role: 'Founding partner', bio: 'Twenty-two years in coastal luxury. The reason we have off-market firsts.', avatarBg: 'linear-gradient(135deg, #1A2B4A, #C9A961)' },
      { initials: 'HR', name: 'Hana Reyes', role: 'Hamptons', bio: 'Born and raised in East Hampton. Knows every buyer on the coast.', avatarBg: 'linear-gradient(135deg, #A8DADC, #1A4D5C)' },
      { initials: 'PV', name: 'Pavel Volkov', role: 'Aegean', bio: 'Lives on Mykonos. Speaks four languages. Closes the impossible deals.', avatarBg: 'linear-gradient(135deg, #E8D9B5, #1A2B4A)' },
    ],
    press: [
      { name: 'Architectural Digest', style: 'serif' },
      { name: 'Robb Report', style: 'bold' },
      { name: 'The Wall Street Journal', style: 'serif' },
      { name: 'Coastal Living', style: 'serif' },
      { name: 'Mansion Global', style: 'display' },
    ],
    faq: [
      { q: 'Do I need to be pre-approved?', a: 'Not to start, but to make an offer. We have lender partners if you need a referral.' },
      { q: 'How does off-market first work?', a: 'We email our buyers 48 hours before any new listing hits MLS. The first look is the best look.' },
      { q: 'Do you work internationally?', a: 'Yes \u2014 we have closed in 14 countries. The local partner model means you have one of us and one of them.' },
      { q: 'What is your fee?', a: '2.5% buyer-side, 2.5% seller-side. We do not charge transaction fees on top.' },
    ],
  },
  19: {
    gallery: buildGallery(19, 'quanta'),
    galleryEyebrow: 'In the cohort',
    galleryTitle: 'Six courses, in practice',
    galleryLede: 'From the code bootcamp to the UX program, in the projects.',
    details: [
      { icon: '✦', title: 'Self-paced', desc: 'Start today, finish when you finish. No cohorts, no deadlines.' },
      { icon: '◐', title: 'Project-based', desc: 'You graduate with a portfolio, not just a certificate.' },
      { icon: '✺', title: 'Real instructors', desc: 'People who do the thing for a living, not content marketers.' },
      { icon: '◆', title: '240 courses', desc: 'Code, design, data, photography, music, business. New courses every month.' },
      { icon: '◈', title: 'Job-ready guarantee', desc: 'If you do not land a job in 6 months after graduating the bootcamp, you get your money back.' },
      { icon: '❋', title: 'Free first lesson', desc: 'Try before you buy. No signup, no card, just the lesson.' },
    ],
    team: [
      { initials: 'DR', name: 'Dr. Yuki Ramachandran', role: 'Lead instructor', bio: 'PhD in CS, ex-Google. Teaches the code program.', avatarBg: 'linear-gradient(135deg, #FF6B6B, #FFF4B8)' },
      { initials: 'PI', name: 'Priya Iyer', role: 'UX lead', bio: 'Dropped out, taught herself, now teaches. The reason the UX program works.', avatarBg: 'linear-gradient(135deg, #2D4A2B, #F5E6D3)' },
      { initials: 'JN', name: 'Jules Nakamura', role: 'Data science', bio: 'Former data scientist at Spotify. The reason the data program is practical.', avatarBg: 'linear-gradient(135deg, #FFD60A, #1A1A1A)' },
    ],
    press: [
      { name: 'Course Report', style: 'serif' },
      { name: 'Switchup', style: 'bold' },
      { name: 'Class Central', style: 'display' },
      { name: 'EdSurge', style: 'mono' },
      { name: 'The Verge', style: 'bold' },
    ],
    faq: [
      { q: 'Do I need a CS degree?', a: 'No. About 60% of our code graduates had never written a line before. The first lesson is designed to be the first lesson.' },
      { q: 'How long is the bootcamp?', a: '12 weeks for code, 14 weeks for UX, 16 weeks for data. Self-paced, so you can take longer.' },
      { q: 'Is the job guarantee real?', a: 'Yes \u2014 if you do not land a job in 6 months after graduating the bootcamp, you get your money back. The terms are public.' },
      { q: 'Can I expense this through my employer?', a: 'Most of our learners do. We provide a receipt that satisfies most L&D departments.' },
    ],
  },
};

// =========================================================
// PER-DESIGN FEATURES (custom to each brand, not the category default)
// =========================================================
const FEATURES_PER_DESIGN = {
  1: [ // Lumière — haute couture
    { icon: '✦', title: 'Hand-embroidered on rue Cambon', desc: 'One artisan, one piece, three weeks per garment. By appointment only.' },
    { icon: '✂', title: 'French seams, always', desc: 'The inside is as finished as the outside. Every piece passes the seam inspection.' },
    { icon: '◈', title: 'Mother-of-pearl buttons', desc: 'Hand-cut from the Pacific. No two buttons are the same. Engraved with the season.' },
    { icon: '❋', title: 'Cupro lining', desc: 'Body-temperature silk-cotton blend. Wears like a second skin from day one.' },
    { icon: '◆', title: 'Numbered, signed, archived', desc: 'Each piece is signed by its seamstress. We can tell you who made yours.' },
    { icon: '◐', title: 'Fédération certified', desc: 'Member of the Chambre Syndicale de la Haute Couture since 1962.' },
  ],
  2: [ // Nomad — adventure travel
    { icon: '✺', title: 'Hand-picked routes', desc: 'Every itinerary walked by a guide before you walk it. We do not sell what we have not done.' },
    { icon: '◉', title: 'Local guides only', desc: 'Not actors. The people who make the place what it is. Sherpas, Bedouins, gauchos.' },
    { icon: '➤', title: 'Max 8 travelers', desc: 'No megabuses, no megaresorts, no megajetlags. Small groups, real presence.' },
    { icon: '✦', title: '4,000+ alumni', desc: 'Most of our clients come back. That is the only metric we track. Nothing else.' },
    { icon: '◐', title: 'Carbon-neutral, audited', desc: 'Every trip, every flight, every transfer. Public ledger, third-party verified.' },
    { icon: '❋', title: 'Single supplement waived', desc: 'We match you with a same-gender roommate. Never a single penalty, ever.' },
  ],
  3: [ // Atelier — architecture
    { icon: '◧', title: 'Built for the next century', desc: 'Materials and details chosen for 200 years, not 20 seasons. We measure twice.' },
    { icon: '◐', title: 'Light first', desc: 'We design around the path of the sun. The form follows the light, never the trend.' },
    { icon: '◇', title: 'Honest materials', desc: 'Concrete looks like concrete. Wood looks like wood. Nothing is faked, nothing is hidden.' },
    { icon: '✦', title: 'Site-led', desc: 'Two weeks on the site before we draw a single line. The building starts there.' },
    { icon: '◆', title: 'Hand-drawn plans first', desc: 'Every plan is hand-drawn first. Then modelled. Then built. The drawing is the thinking.' },
    { icon: '◈', title: '200-year details', desc: 'Joinery that does not need replacing in your lifetime. Built to outlive us all.' },
  ],
  4: [ // Crescent — fine dining
    { icon: '✻', title: 'Seasonal menu, always', desc: 'The menu changes when the season does. No exceptions, no off-season frozen product.' },
    { icon: '❦', title: 'Single kitchen, single fire', desc: 'Every dish from one pass, one chef, one fire. You watch the chef plate each course.' },
    { icon: '✦', title: '12 seats at the pass', desc: 'We seat 12. The kitchen is the dining room. You watch us cook.' },
    { icon: '◐', title: 'Sommelier-paired', desc: 'A different glass for every course. No exceptions. The wine list is the cellar.' },
    { icon: '◆', title: '320 bottles in the cellar', desc: 'Small producers only. Names you cannot pronounce, prices you can. The list is the room.' },
    { icon: '◈', title: 'Vegetarian, no compromise', desc: 'Eight courses, no compromise. The chef designs the menu around you, not the other way.' },
  ],
  5: [ // Verdant — sustainability
    { icon: '❀', title: 'Carbon negative', desc: 'We remove more than we emit. Public ledger, third-party audited every year.' },
    { icon: '✿', title: 'Regenerative sourcing', desc: 'Every supplier answers: does this make the land better than we found it? If no, we pass.' },
    { icon: '✤', title: 'Plastic-free shipping', desc: 'Compostable mailers, recycled paper tape, mushroom packaging. Nothing wasted.' },
    { icon: '✦', title: 'Refill, not landfill', desc: 'Send the bottle back, we refill and ship. Forever. The bottle outlives its contents.' },
    { icon: '◐', title: 'B-Corp top 5%', desc: 'Top 5% of B-Corps globally. Re-certified every three years. No greenwashing.' },
    { icon: '◆', title: '1% for the planet', desc: 'One percent of every order goes to land regeneration. 184,000 trees and counting.' },
  ],
  6: [ // Nebula — music streaming
    { icon: '♫', title: 'Lossless, 24-bit/96kHz', desc: 'Studio-grade, not the compressed version. 4x the data of Spotify. Worth it on real speakers.' },
    { icon: '◐', title: 'Four real humans curate', desc: 'Not an algorithm. The same person who picks your mix picks for everyone, for years.' },
    { icon: '♪', title: 'Vinyl vault included', desc: 'Pre-1980 jazz, soul, rare grooves. Ripped from the original masters, in lossless.' },
    { icon: '♬', title: 'Front-row sessions', desc: 'Exclusive live recordings from 12 cities, streamed in lossless. You are in the front row.' },
    { icon: '✦', title: 'Friday mixtape', desc: 'A real human\u2019s pick, every Friday. The way music used to be shared. No algorithm.' },
    { icon: '✺', title: 'Offline first', desc: 'Download everything. Listen on a plane, on a train, in a basement. No WiFi needed.' },
  ],
  7: [ // Odyssey — adventure expeditions
    { icon: '▲', title: '142 summits, 0 fatalities', desc: 'Successful summits since 2012. The only safety record that actually matters in this business.' },
    { icon: '◐', title: 'Sherpa-led, not imported', desc: 'Local guides who know the mountain personally. Not imported contractors on a tourist visa.' },
    { icon: '✦', title: '10-day acclimatization', desc: 'We spend ten days at altitude before we even start. The mountain punishes shortcuts.' },
    { icon: '◈', title: '6-month training plan', desc: 'Designed for your body, not the brochure. The training is half the trip.' },
    { icon: '✺', title: '12 years guiding', desc: 'No client has ever needed rescue. That is the only metric we track.' },
    { icon: '➤', title: 'No ego trips', desc: 'If the mountain is not in, we tell you. We have turned around at base camp. Twice.' },
  ],
  8: [ // Vertex — DeFi
    { icon: '◆', title: 'Self-custody, always', desc: 'You hold the private keys. We never see them, never store them. If we get hacked, you are safe.' },
    { icon: '⌬', title: 'Audited by three firms', desc: 'Trail of Bits, OpenZeppelin, Spearbit. Public reports. We publish the issues we find ourselves.' },
    { icon: '◈', title: 'No gas surprises', desc: 'Predictable fees, batched transactions. We tell you the cost before you sign.' },
    { icon: '✦', title: '12 chains, one balance', desc: 'Cross-chain without bridges, every time. Move between Ethereum, Solana, Sui, NEAR in seconds.' },
    { icon: '◐', title: '0.05% fee, only on yield', desc: 'No deposit fees, no withdrawal fees. We make money when you do. Aligned incentives.' },
    { icon: '✺', title: 'No lock-ups', desc: 'Withdraw any time, any amount. The money is always yours, always accessible.' },
  ],
  9: [ // Helix — telemedicine
    { icon: '✚', title: 'Same-day, 7 days a week', desc: 'Talk to someone today, not in three weeks. Every day, including holidays. No exceptions.' },
    { icon: '◉', title: '8-min average wait', desc: 'From app open to face on screen, the median is under eight minutes. The longest last month was 14.' },
    { icon: '✦', title: 'Same clinician, every time', desc: 'You see the same person every visit. We do not rotate you through strangers. Continuity of care.' },
    { icon: '◐', title: 'HIPAA-grade security', desc: 'End-to-end encryption, audit logs, export any time. Your data is yours. We do not sell it.' },
    { icon: '◆', title: 'At-home labs', desc: 'Real lab work, real results. No waiting rooms, no awkward magazines, no insurance phone tree.' },
    { icon: '✺', title: '24/7, real human on call', desc: 'Not a phone tree, not a chatbot. A clinician who knows you. Always reachable.' },
  ],
  10: [ // Polaris — aerospace
    { icon: '▲', title: '14 launches, 0 failures', desc: 'Successful missions since 2014. On time, on budget, every time. The launch is the easy part.' },
    { icon: '◐', title: 'NASA outgassing spec', desc: 'Every unit tested to NASA outgassing specs. We are the spec, not just compliant with it.' },
    { icon: '✦', title: '24/7 mission control', desc: 'Real engineers, on shift, watching your satellite. We tell you in 60 seconds if something is wrong.' },
    { icon: '⌖', title: 'Sub-meter, 90 min', desc: 'Sub-meter resolution imagery, delivered within 90 minutes of capture. Anywhere on Earth.' },
    { icon: '◈', title: '14 successful missions', desc: 'Atlas Program, civilian research, sub-orbital training. We have done the impossible, on time.' },
    { icon: '◆', title: '32 active satellites', desc: 'Currently in orbit, talking to ground, delivering data. The constellation is the company.' },
  ],
  11: [ // Mira — photography
    { icon: '◐', title: 'Original RAW files', desc: 'You get the full archive, not the curated highlights. Every frame, every take, yours.' },
    { icon: '✦', title: 'Hand-printed, signed', desc: 'Darkroom prints on archival paper. Signed, numbered, ready for the gallery wall.' },
    { icon: '◇', title: '300dpi, color-managed', desc: 'Print-ready files, 300dpi, color-managed. No surprises between screen and print.' },
    { icon: '◆', title: 'Unlimited revisions', desc: 'We shoot until you love every frame. No timer. No hourly billing. The work is the work.' },
    { icon: '✺', title: 'Film available', desc: 'Medium format, large format, or digital. You call it, we bring it. Or we shoot both.' },
    { icon: '◈', title: 'Worldwide, on us', desc: 'Based in Lisbon, available anywhere. Travel costs are on us. The work is the only invoice.' },
  ],
  12: [ // Brew & Co — coffee
    { icon: '◉', title: 'Single-origin, traceable', desc: 'Every bag traceable to a single farm, a single harvest, a single roast. Public ledger.' },
    { icon: '☕', title: 'Roasted to order', desc: 'Shipped within 48 hours of leaving the drum. The roast date is on every bag. Always fresh.' },
    { icon: '✺', title: '3x Fair Trade minimum', desc: 'We pay the farmer three times the Fair Trade minimum. Always. Direct trade, no middlemen.' },
    { icon: '✦', title: 'Q-graded every batch', desc: 'Certified Q-graders cup every batch. The defective 3% goes home with us, not you.' },
    { icon: '◐', title: 'Brew guides included', desc: 'Every bag ships with the recipe. We make it easy to make it right on the first try.' },
    { icon: '◆', title: 'Refillable bags', desc: 'Send the bag back, we refill and ship. Less waste, more coffee, same price.' },
  ],
  13: [ // Ember — wedding planner
    { icon: '✦', title: 'Single planner, start to finish', desc: 'One person from first call to last dance. No hand-offs, no surprises. Continuity is the gift.' },
    { icon: '❀', title: 'Vendor-agnostic, always', desc: 'We do not take commissions. We recommend what is right for you, not what pays us most.' },
    { icon: '◐', title: 'Day-of, we run it', desc: 'You live the day. We handle every glitch in real time. You will not see a single problem.' },
    { icon: '◈', title: '14 countries', desc: 'Tuscany, Paris, Santorini, Marrakech, the Cotswolds. We have done them all. We can do yours.' },
    { icon: '◆', title: 'Real flowers only', desc: 'No silk, no faux, no foam. The week-of, by a real florist. The scent of the day is part of the memory.' },
    { icon: '✺', title: '142 couples served', desc: 'And 100% would rebook. That is the only metric that matters for a wedding planner.' },
  ],
  14: [ // Mosaic — art gallery
    { icon: '◐', title: '4 artists a year, no more', desc: 'Not forty. Each one gets a real show. The curation is the constraint.' },
    { icon: '✦', title: 'Direct from studio', desc: 'No middlemen, no markups, no reproductions. Original work, sourced from the artist\u2019s studio.' },
    { icon: '◈', title: '70% to the artist', desc: 'When the work sells, the artist gets 70%. We keep 30%. The split is the contract.' },
    { icon: '◆', title: 'Certificate, archived', desc: 'Signed, numbered, archived. Your piece is provably the one, with the paper to prove it.' },
    { icon: '❀', title: 'Free First Fridays', desc: 'First Friday of every month, 6-10pm, free. Wine, the artists, the room. The art is the door.' },
    { icon: '✺', title: '280K visitors a year', desc: 'The largest independent gallery in Berlin. The most visited per square meter, per curator.' },
  ],
  15: [ // Apex — fitness
    { icon: '◆', title: 'Real coaches, certified', desc: 'Every program written by a coach with a national certification. Not influencers. Coaches.' },
    { icon: '◐', title: 'Periodized training', desc: 'No random workouts. Cycles, deloads, progressive overload. The science is the method.' },
    { icon: '✦', title: 'Form first', desc: 'We\u2019d rather you lift less with perfect form than more with bad form. Always.' },
    { icon: '✺', title: 'InBody + movement screen', desc: 'Every new member does a scan, a movement screen, and a goals interview. We start with data.' },
    { icon: '◈', title: 'Re-assess every 8 weeks', desc: 'The data tells the truth. We use it. If the program is not working, we change it. Always.' },
    { icon: '✤', title: 'Open gym 24/7', desc: 'Train at 4am or 10pm. The keys are yours. The only locked door is the front, after hours.' },
  ],
  16: [ // Chapter — publishing
    { icon: '❦', title: 'Author-friendly terms', desc: 'We pay advances. We pay royalties. We do not bury rights in fine print. The contract is the promise.' },
    { icon: '✦', title: 'Independent voice', desc: 'No corporate parent, no marketing department, no algorithmic shelf. The list is the line.' },
    { icon: '◐', title: '240 independent stockists', desc: 'In 12 countries, on real shelves, in real bookstores. Not just on Amazon. Never only on Amazon.' },
    { icon: '◆', title: '12 titles a year', desc: 'Fiction, memoir, essays, poetry, translation. Every one edited by a human, read twice.' },
    { icon: '✺', title: 'Letterpress limited editions', desc: 'For the books that earn it. Hand-set, signed, numbered. The object is the gift.' },
    { icon: '◈', title: 'Audiobook with every title', desc: 'Narrated by the author when we can. Always human, never synthetic. The voice is the work.' },
  ],
  17: [ // Spark — agency
    { icon: '✦', title: 'Senior-only team', desc: 'No juniors learning on your dime. The people who pitch do the work. The team is the brand.' },
    { icon: '◈', title: 'Fixed-price projects', desc: 'No hourly billing, no scope creep, no surprise invoices. The number is the number.' },
    { icon: '✺', title: 'We say no', desc: 'If a brief is bad for the brand, we say so. Even before signing. The courage is the craft.' },
    { icon: '◐', title: 'Brand + product', desc: 'Logo, type, color, voice, web, app. The whole thing, designed as one. The system is the strategy.' },
    { icon: '◆', title: 'Strategy first', desc: 'Two weeks of listening before any pixels move. The brief is half the work.' },
    { icon: '✤', title: '90-day launch support', desc: 'We stay for 90 days after launch. The launch is the start, not the end.' },
  ],
  18: [ // Tide — real estate
    { icon: '◐', title: 'Off-market first', desc: 'We share listings with our clients 48 hours before they hit MLS. The first look is the best look.' },
    { icon: '✦', title: 'Local-only agents', desc: 'Each agent works one neighborhood. Knows every block, every comp, every seller.' },
    { icon: '◈', title: 'No dual agency', desc: 'We never represent both sides. Your interests, full stop. The conflict is the choice.' },
    { icon: '◆', title: '14 coastal markets', desc: 'From the Hamptons to the Aegean. One of us, one of them. The local partner is the model.' },
    { icon: '✺', title: '$2.4B closed in 2025', desc: 'Across 142 homes. Average days on market: 18. The number is the track record.' },
    { icon: '❋', title: 'Buyer + seller separated', desc: 'Different agents for each side, even on a flip. No conflict, ever. The structure is the safety.' },
  ],
  19: [ // Quanta — education
    { icon: '✦', title: 'Self-paced, no cohorts', desc: 'Start today, finish when you finish. No deadlines, no waiting for the next group. The pace is yours.' },
    { icon: '◐', title: 'Project-based learning', desc: 'You graduate with a portfolio, not just a certificate. The portfolio is the proof.' },
    { icon: '✺', title: 'Real instructors', desc: 'People who do the thing for a living, not content marketers. The work is the curriculum.' },
    { icon: '◆', title: '240 courses', desc: 'Code, design, data, photography, music, business. New courses every month. The library grows.' },
    { icon: '◈', title: 'Job-ready guarantee', desc: 'If you do not land a job in 6 months after graduating the bootcamp, you get your money back.' },
    { icon: '✤', title: 'Free first lesson', desc: 'Try before you buy. No signup, no card, just the lesson. The first lesson is the audition.' },
  ],
  20: [ // VAD — AI coding
    { icon: '◧', title: 'Whole-repo context', desc: 'Reads your entire codebase on connect. No "lost in the middle". The context is the model.' },
    { icon: '◆', title: 'Real execution', desc: 'Runs the code, runs the tests, runs the lint. The full loop, not just suggestions.' },
    { icon: '◐', title: 'Multi-agent', desc: 'Spawns sub-agents in parallel. One prompt, six workers, one PR. The team is the tool.' },
    { icon: '✦', title: 'Codebase memory', desc: 'Remembers decisions, naming, and patterns across sessions. The model learns the codebase.' },
    { icon: '⌬', title: 'Tool calling, native', desc: 'Native MCP, function calls, terminal. Every tool, on demand, with permission. The integration is the surface.' },
    { icon: '✺', title: 'Sub-2s to first fix', desc: 'Median time from prompt to first passing test. Less than two seconds. The speed is the standard.' },
  ],
};

// =========================================================
// PER-DESIGN PRICING (custom to each industry)
// =========================================================
const PRICING_PER_DESIGN = {
  1: [ // Lumière — fashion
    { name: 'Atelier visit', price: 'Free', suffix: '', featured: false, features: ['By appointment', '30-min private tour', 'See current collection', 'No obligation'] },
    { name: 'Made-to-measure', price: '€18,000', suffix: 'from', featured: true, features: ['3 fittings included', 'Hand-embroidered details', 'Mother-of-pearl buttons', 'Numbered, signed'] },
    { name: 'Couture commission', price: 'Custom', suffix: '', featured: false, features: ['Bespoke piece', '6-month lead time', 'Direct with designer', 'Lifetime alteration'] },
  ],
  2: [ // Nomad — travel
    { name: 'Day trip', price: '€280', suffix: '', featured: false, features: ['Local guide', 'Small group, max 8', 'Lunch included', 'Single-day commitment'] },
    { name: '7-day expedition', price: '€3,800', suffix: '', featured: true, features: ['Hand-picked route', 'All meals + lodging', 'Carbon-neutral', 'Single supplement waived'] },
    { name: 'Private charter', price: '€24,000+', suffix: '', featured: false, features: ['Your dates, your route', 'Bespoke itinerary', 'Dedicated guide', 'Family or friends only'] },
  ],
  3: [ // Atelier — architecture
    { name: 'Site visit', price: '€3,800', suffix: '', featured: false, features: ['2-week on-site analysis', 'Light + materials report', 'Hand-drawn sketches', 'No commitment'] },
    { name: 'Schematic design', price: '€18,000', suffix: '', featured: true, features: ['8-week engagement', 'Site-led process', 'Hand-drawn plans', '2 design iterations'] },
    { name: 'Full project', price: '€140,000+', suffix: '', featured: false, features: ['Schematic + DD + CD', 'Construction oversight', 'Materials specification', '200-year details'] },
  ],
  4: [ // Crescent — restaurant
    { name: 'Lunch tasting', price: '€85', suffix: '/person', featured: false, features: ['5-course tasting', 'Wine pairing optional', '12 seats at the pass', 'Tuesday to Saturday'] },
    { name: 'Dinner tasting', price: '€185', suffix: '/person', featured: true, features: ['8-course tasting', 'Sommelier pairing', 'Reservations only', 'Tuesday to Saturday'] },
    { name: 'Chef\u2019s table', price: '€320', suffix: '/person', featured: false, features: ['4 seats, by request', 'Custom menu around you', 'Picking with the chef', 'Tuesday to Saturday'] },
  ],
  5: [ // Verdant — sustainability
    { name: 'Starter set', price: '€24', suffix: '', featured: false, features: ['3 refills + bottles', 'Compostable mailer', 'Free shipping first order', 'Cancel anytime'] },
    { name: 'Annual refill', price: '€48', suffix: '/mo', featured: true, features: ['Monthly refill delivery', 'Bottles that last forever', '1% to land regen', 'Carbon negative'] },
    { name: 'Wholesale', price: 'Custom', suffix: '', featured: false, features: ['Refill stations', 'Hotel + retail', 'Co-branded options', 'B-Corp certified'] },
  ],
  6: [ // Nebula — music
    { name: 'Free', price: '$0', suffix: '/mo', featured: false, features: ['Lossy streaming', 'Curated daily mixes', 'Mobile + web', 'Ad-supported'] },
    { name: 'Lossless', price: '$9.99', suffix: '/mo', featured: true, features: ['24-bit, 96kHz FLAC', 'Vinyl vault included', 'Front-row sessions', 'Offline downloads'] },
    { name: 'Family', price: '$14.99', suffix: '/mo', featured: false, features: ['Up to 6 accounts', 'Lossless for everyone', 'Kids mode', 'One bill'] },
  ],
  7: [ // Odyssey — expedition
    { name: 'Day climb', price: '€480', suffix: '', featured: false, features: ['Local mountain', 'Sherpa guide', 'Lunch at base', 'Single-day commitment'] },
    { name: '14-day expedition', price: '€6,800', suffix: '', featured: true, features: ['10-day acclimatization', 'Sherpa-led, max 6', 'All meals + lodging', '6-month training plan'] },
    { name: 'Private summit', price: '€28,000+', suffix: '', featured: false, features: ['Your team, your dates', 'Bespoke route', 'Dedicated guide team', 'Return guarantee'] },
  ],
  8: [ // Vertex — DeFi
    { name: 'Free', price: '$0', suffix: '', featured: false, features: ['Self-custody wallet', 'Basic yield', '0.05% on earnings', 'No deposit fees'] },
    { name: 'Pro', price: '$29', suffix: '/mo', featured: true, features: ['Pro trading tools', 'Sub-second execution', 'Cross-chain routing', 'Priority support'] },
    { name: 'Enterprise', price: 'Custom', suffix: '', featured: false, features: ['Treasury management', 'Dedicated relationship', 'Custom contracts', 'White-glove onboarding'] },
  ],
  9: [ // Helix — healthcare
    { name: 'Single visit', price: '$0', suffix: 'copay', featured: false, features: ['Same-day visit', '8-min average wait', 'Same clinician', 'Insurance accepted'] },
    { name: 'Family', price: '$49', suffix: '/mo', featured: true, features: ['Up to 6 members', 'Unlimited visits', 'At-home labs included', 'Mental health + pediatrics'] },
    { name: 'Concierge', price: '$249', suffix: '/mo', featured: false, features: ['24/7 dedicated clinician', 'At-home visits', 'Specialist referrals', 'Same-day prescriptions'] },
  ],
  10: [ // Polaris — aerospace
    { name: 'Rideshare', price: '$1.2M', suffix: '', featured: false, features: ['12U cubesat', 'Sun-synchronous orbit', '14-day lead time', 'Shared launch'] },
    { name: 'Dedicated launch', price: '$24M+', suffix: '', featured: true, features: ['Your payload, your orbit', 'Custom integration', 'Mission control for 5y', 'On-time guarantee'] },
    { name: 'Constellation', price: '$48M+', suffix: '', featured: false, features: ['Multi-satellite program', 'Dedicated launch window', '5-year operations', 'White-glove engineering'] },
  ],
  11: [ // Mira — photography
    { name: 'Day session', price: '€1,800', suffix: '', featured: false, features: ['4-hour shoot', '40 edited frames', 'Online gallery', 'Print-ready files'] },
    { name: 'Editorial', price: '€4,800', suffix: '', featured: true, features: ['2-day shoot', '100 edited frames', 'Behind-the-scenes', 'Hand-printed edition'] },
    { name: 'Annual retainer', price: '€18,000', suffix: '/yr', featured: false, features: ['4 editorial shoots', 'Priority booking', 'Travel included', 'Brand campaign'] },
  ],
  12: [ // Brew & Co — coffee
    { name: 'Single bag', price: '$18', suffix: '', featured: false, features: ['250g, single origin', 'Roasted to order', 'Brew guide included', 'Free shipping over $40'] },
    { name: 'Subscription', price: '$58', suffix: '/mo', featured: true, features: ['4 bags, rotating origins', 'Roasted to order', 'Brew guides + recipes', 'Cancel anytime'] },
    { name: 'Wholesale', price: 'Custom', suffix: '', featured: false, features: ['Cafes + restaurants', '60+ partners', 'Custom blends', 'Q-graded QC'] },
  ],
  13: [ // Ember — wedding
    { name: 'Day-of coordination', price: '$6,800', suffix: '', featured: false, features: ['2 planners on day-of', 'Vendor coordination', 'Timeline management', 'Last 6 weeks of planning'] },
    { name: 'Full planning', price: '$14,000', suffix: '', featured: true, features: ['Single planner start to finish', 'All vendors coordinated', 'Day-of coordination', 'Real flowers only'] },
    { name: 'Destination', price: '$24,000+', suffix: '', featured: false, features: ['Tuscany, Paris, Santorini', 'Local partner network', 'Travel + lodging help', 'Single planner, full planning'] },
  ],
  14: [ // Mosaic — art gallery
    { name: 'Gallery visit', price: 'Free', suffix: '', featured: false, features: ['Tuesday to Sunday', 'Walk-in welcome', 'No appointment needed', 'Free First Fridays'] },
    { name: 'Collecting consultation', price: '€480', suffix: '', featured: true, features: ['2-hour private session', 'With the curator', 'Studio visits available', 'Direct from artist'] },
    { name: 'Acquisition', price: 'Custom', suffix: '', featured: false, features: ['Direct from studio', 'Certificate of authenticity', 'Crating + shipping worldwide', '70% to artist'] },
  ],
  15: [ // Apex — fitness
    { name: 'Open gym', price: '$189', suffix: '/mo', featured: false, features: ['24/7 access', 'All classes included', 'InBody scan quarterly', 'No contract'] },
    { name: 'Open + training', price: '$649', suffix: '/mo', featured: true, features: ['Open gym access', '8 PT sessions', 'Re-assess every 8 weeks', 'Custom programming'] },
    { name: 'Private', price: '$1,800', suffix: '/mo', featured: false, features: ['Dedicated coach', 'Unlimited sessions', 'At-home option', 'Nutrition + recovery'] },
  ],
  16: [ // Chapter — publishing
    { name: 'Submission', price: 'Free', suffix: '', featured: false, features: ['Query + 30 pages', 'Read by a human', 'Response in 12 weeks', 'No agent required'] },
    { name: 'Advance', price: '$8,000', suffix: 'from', featured: true, features: ['For debut fiction', 'Royalty rates 15-22%', 'Author-friendly terms', '2-book option'] },
    { name: 'Translation', price: 'Custom', suffix: '', featured: false, features: ['Translator as full partner', '30% of our list', 'Rights handled in-house', 'World rights available'] },
  ],
  17: [ // Spark — agency
    { name: 'Identity sprint', price: '$24,000', suffix: '', featured: false, features: ['2-week engagement', 'Logo + type + color', 'One direction', 'Brand book'] },
    { name: 'Brand + product', price: '$80,000+', suffix: '', featured: true, features: ['Identity + web + product', '12-18 week engagement', 'Senior team only', 'Fixed price'] },
    { name: 'Retainer', price: 'Custom', suffix: '', featured: false, features: ['Monthly engagement', 'Always-on team', 'Campaign + product', 'Long-term partnership'] },
  ],
  18: [ // Tide — real estate
    { name: 'Buyer consult', price: 'Free', suffix: '', featured: false, features: ['60-min session', 'Off-market preview', 'No commitment', 'Local expert'] },
    { name: 'Buyer representation', price: '2.5%', suffix: '', featured: true, features: ['Off-market first', 'Local-only agents', 'No dual agency', 'Closing in 30 days'] },
    { name: 'Seller representation', price: '2.5%', suffix: '', featured: false, features: ['Off-market first', 'Cinematic marketing', 'No dual agency', '$2.4B closed 2025'] },
  ],
  19: [ // Quanta — education
    { name: 'Free lesson', price: '$0', suffix: '', featured: false, features: ['Try any course', 'No signup required', 'First lesson free', 'No card'] },
    { name: 'Self-paced course', price: '$89', suffix: '', featured: true, features: ['Lifetime access', 'Real project', 'Instructor feedback', 'Community access'] },
    { name: 'Bootcamp', price: '$2,400', suffix: '', featured: false, features: ['12-week code, 14-week UX', 'Job-ready guarantee', 'Real mentor', 'Money back if no job in 6mo'] },
  ],
  20: [ // VAD — AI coding
    { name: 'Free', price: '$0', suffix: '', featured: false, features: ['Open source', 'Local execution', 'Community support', 'Self-hosted'] },
    { name: 'Studio', price: '$49', suffix: '/mo', featured: true, features: ['Unlimited context', 'Real execution', 'Multi-agent', 'Priority support'] },
    { name: 'Enterprise', price: 'Custom', suffix: '', featured: false, features: ['Self-hosted', 'Codebase memory', 'Dedicated engineer', 'SLA + support'] },
  ],
};

// Merge EXTRA_CONTENT into DESIGN_PRESETS
Object.keys(EXTRA_CONTENT).forEach((id) => {
  const designId = parseInt(id, 10);
  if (DESIGN_PRESETS[designId]) {
    Object.assign(DESIGN_PRESETS[designId], EXTRA_CONTENT[id]);
  }
  // Also apply to DESIGNS array (features, pricing)
  if (EXTRA_CONTENT[id].features || EXTRA_CONTENT[id].pricing) {
    const design = DESIGNS.find((d) => d.id === designId);
    if (design) {
      if (EXTRA_CONTENT[id].features) design.features = EXTRA_CONTENT[id].features;
      if (EXTRA_CONTENT[id].pricing) design.pricing = EXTRA_CONTENT[id].pricing;
    }
  }
});

// Apply per-design features and pricing
Object.keys(FEATURES_PER_DESIGN).forEach((id) => {
  const designId = parseInt(id, 10);
  const design = DESIGNS.find((d) => d.id === designId);
  if (design) design.features = FEATURES_PER_DESIGN[id];
});
Object.keys(PRICING_PER_DESIGN).forEach((id) => {
  const designId = parseInt(id, 10);
  const design = DESIGNS.find((d) => d.id === designId);
  if (design) design.pricing = PRICING_PER_DESIGN[id];
});


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

// Hero background images — using showcase[0] instead of thumbs
// (thumbs contained browser-chrome previews, causing "browser on browser")
// Per layout: full-bleed uses as overlay; centered/editorial use as soft bg.
const HERO_BG = {
  1: 'showcase/lumiere_01.png',     // dress on model
  2: 'showcase/nomad_02.png',       // himalayan trek
  3: null,                          // Atelier: pure minimal, let typography breathe
  4: 'showcase/crescent_01.png',     // tasting course
  5: 'showcase/verdant_01.png',      // refill set
  6: 'showcase/nebula_01.png',       // front-row session
  7: 'showcase/odyssey_01.png',      // k2 approach
  8: 'showcase/vertex_01.png',       // crypto vault
  9: 'showcase/helix_01.png',        // doctor visit
  10: 'showcase/polaris_01.png',     // launch
  11: 'showcase/mira_01.png',        // portrait
  12: 'showcase/brewco_01.png',      // pour ritual
  13: 'showcase/ember_01.png',       // tuscan wedding
  14: 'showcase/mosaic_01.png',      // solo show
  15: 'showcase/apex_01.png',        // strength
  16: 'showcase/chapter_01.png',     // hardback list
  17: 'showcase/spark_01.png',       // identity
  18: 'showcase/tide_01.png',        // cove house
  19: 'showcase/quanta_01.png',      // code
  20: 'showcase/vad_01.png',         // unlimited context
};

// Helper: get a variation
function getVariation(id, varIdx) {
  const d = getDesign(id);
  if (!d) return null;
  return d.variations[varIdx] || d.variations[0];
}
