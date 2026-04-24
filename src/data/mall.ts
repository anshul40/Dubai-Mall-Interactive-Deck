export type Stat = { label: string; value: string; hint?: string };

export type Tenant = {
  id: string;
  name: string;
  category: string;
  logoLetter: string;
  tier: "flagship" | "luxury" | "premium";
};

export type Attraction = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
};

export type EventShowcase = {
  id: string;
  title: string;
  capacity: string;
  type: string;
  image: string;
};

/** Subject property — The Dubai Mall (publicly documented mega-mall, Downtown Dubai). */
export const mallMeta = {
  name: "The Dubai Mall",
  tagline: "Downtown Dubai’s retail, dining, and entertainment landmark — global traffic, flagship density, year-round programming.",
  storyPromise:
    "When the destination sells itself, the conversation moves to terms, availability, and measurable impact.",
  city: "Downtown Dubai, United Arab Emirates",
  operator: "Emaar Malls (confirm current operator & audited figures before external use)",
  yearFounded: 2008,
  /** Total internal floor area — widely cited in press; verify for legal decks. */
  glaM2: "502,000+",
  glaSqFt: "5.4M+",
  annualVisitors: "80M+",
  stores: "1,200+",
  levels: 4,
  parkingSpaces: 14000,
};

/** Letter-by-letter intro title on the loading gate. */
export const openingTitle = "THE DUBAI MALL";

/** Verified Commons paths — old direct URLs 404’d after renames/moves. */
export const heroPoster =
  "https://upload.wikimedia.org/wikipedia/commons/2/24/Dubai_Mall.jpg";

export const heroCopy = {
  eyebrow: "Leasing · sponsorship · events",
  headline: "Feel the scale of Downtown Dubai before anyone opens a deck.",
  subhead:
    "Screen-share or solo link — video-first proof, then economics: tenancy, partners, and production-ready venues.",
  evidenceCta: "See the proof",
};

export const heroOutcomeChips = ["Retail", "Partners", "Events"] as const;

export const loadingCopy = {
  kicker: "Interactive sales experience",
  line: "The Dubai Mall on screen — proof first, so you pitch economics, not adjectives.",
};

export const partnershipCopy = {
  kicker: "Sponsorship & partnerships",
  title: "Be in the frame — not on the perimeter.",
  lead: "Naming, district takeovers, digital screens, and venue overlays across Downtown Dubai — built for agencies that need reach, not just signage.",
  stats: [
    { label: "High-intent annual visits", value: "80M+" },
    { label: "Retail & F&B doors", value: "1,200+" },
    { label: "International visitor mix", value: "Global" },
  ],
};

/** Bookable / promotable surfaces — mix of on-mall anchors + Downtown Dubai ecosystem. */
export const venueModules = [
  {
    id: "aquarium",
    name: "Dubai Aquarium & Underwater Zoo",
    capacity: "10M L tank + tunnel",
    useCases: "Tunnel dinners · donor evenings · filmed reveals",
  },
  {
    id: "icerink",
    name: "Dubai Ice Rink",
    capacity: "Olympic-scale surface",
    useCases: "Shows · sports spectacles · sponsor ice takeovers",
  },
  {
    id: "fashion",
    name: "Fashion Avenue & atria",
    capacity: "Flagship vitrines",
    useCases: "Launches · fashion weeks · brand worlds",
  },
  {
    id: "opera",
    name: "Dubai Opera (Downtown Dubai)",
    capacity: "2,000-seat theatre",
    useCases: "Galas · touring productions · intimate sponsor suites",
  },
] as const;

export const impactCopy = {
  kicker: "Chapter one — scale",
  title: "A single address the world already plans around.",
  lead: "Footfall, flagship density, and entertainment gravity compound here — the kind of proof retail boards, sponsors, and promoters respect before the creative brief even opens.",
};

export const impactStats: Stat[] = [
  { label: "Annual visitors (public reporting)", value: "80M+", hint: "Figures vary by year — verify" },
  { label: "Total floor area", value: "5.4M sq ft", hint: "Widely cited total internal area" },
  { label: "Retail & dining doors", value: "1,200+", hint: "Includes F&B & experiences" },
  { label: "Parking spaces", value: "14,000+", hint: "On-campus mobility" },
];

export const whyStats: Stat[] = [
  { label: "Destination dwell", value: "Hours+", hint: "Mall + attractions behavior" },
  { label: "International mix", value: "Global", hint: "Tourism-led corridors" },
  { label: "Flagship density", value: "Ultra-lux", hint: "Fashion Avenue adjacency" },
  { label: "Programmable atria", value: "Multi", hint: "Launches & sponsor builds" },
];

export const demographics = [
  { segment: "Luxury & premium intent", pct: 36 },
  { segment: "Family & leisure", pct: 32 },
  { segment: "Gen-Z discovery", pct: 20 },
  { segment: "Corporate & MICE", pct: 12 },
];

/** Representative mix — confirm live tenancy for outbound sales. */
export const tenants: Tenant[] = [
  { id: "1", name: "Apple Dubai Mall", category: "Tech flagship", logoLetter: "A", tier: "flagship" },
  { id: "2", name: "Chanel", category: "Fashion", logoLetter: "C", tier: "luxury" },
  { id: "3", name: "Louis Vuitton", category: "Fashion", logoLetter: "L", tier: "luxury" },
  { id: "4", name: "Cartier", category: "Jewelry", logoLetter: "C", tier: "luxury" },
  { id: "5", name: "Galeries Lafayette", category: "Department store", logoLetter: "G", tier: "flagship" },
  { id: "6", name: "Zara", category: "Fashion", logoLetter: "Z", tier: "premium" },
  { id: "7", name: "Bloomingdale’s", category: "Department store", logoLetter: "B", tier: "flagship" },
  { id: "8", name: "Waitrose", category: "Grocery", logoLetter: "W", tier: "premium" },
];

export const luxuryDistrict = {
  title: "Fashion Avenue",
  body: "Ultra-lux vitrines and private client journeys — the density global houses expect from a top-tier address.",
  metrics: [
    { label: "Luxury flagship adjacency", value: "High" },
    { label: "VIP services", value: "Concierge-led" },
    { label: "Sightline control", value: "Districted" },
  ],
  image:
    "https://upload.wikimedia.org/wikipedia/commons/2/24/Dubai_Mall.jpg",
};

export const dining = {
  title: "Dining & nightlife",
  lead: "Chef-led dining, social rooms, and rooftop energy — F&B as a primary draw, not an afterthought.",
  spots: [
    {
      id: "d1",
      name: "Social kitchens",
      vibe: "Chef tables & spectacle",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
    },
    {
      id: "d2",
      name: "Waterfront dining",
      vibe: "Fountains + night skyline",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/8/8a/Dubai_Fountain.jpg",
    },
    {
      id: "d3",
      name: "Late-night lounges",
      vibe: "Return visits & shareability",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80",
    },
  ],
};

export const attractions: Attraction[] = [
  {
    id: "a1",
    title: "Dubai Aquarium & Underwater Zoo",
    subtitle: "Iconic tank + tunnel experiences with night programming",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/34/Dubai_Aquarium_and_Underwater_Zoo.jpg",
  },
  {
    id: "a2",
    title: "The Dubai Fountain",
    subtitle: "Water, light, and music at Burj Khalifa scale",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Dubai_Fountain.jpg",
  },
  {
    id: "a3",
    title: "Dubai Ice Rink",
    subtitle: "Olympic-scale surface for shows, sports, and overlays",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1800&q=80",
  },
  {
    id: "a4",
    title: "Cinemas & family entertainment",
    subtitle: "Rainy-day gravity + sponsor-friendly programming",
    image:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1800&q=80",
  },
];

export const eventsShowcase: EventShowcase[] = [
  {
    id: "e1",
    title: "NYE & calendar peaks",
    capacity: "District-scale crowds",
    type: "City moments",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "e2",
    title: "Auto & luxury reveals",
    capacity: "Atrium + broadcast paths",
    type: "Launch platform",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "e3",
    title: "Brand activations",
    capacity: "Modular build zones",
    type: "Sponsor worlds",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1600&q=80",
  },
];

export const eventMetrics = [
  { label: "Programmable atria", value: "Multi-zone" },
  { label: "Sponsor-ready digital mesh", value: "District-wide" },
  { label: "Agency-friendly hold desk", value: "Single routing" },
];

export const navSections = [
  { id: "impact", label: "Scale" },
  { id: "why", label: "Why Dubai" },
  { id: "retail", label: "Retail" },
  { id: "luxury", label: "Fashion" },
  { id: "dining", label: "Dining" },
  { id: "entertainment", label: "Draw" },
  { id: "partnerships", label: "Partners" },
  { id: "events", label: "Events" },
  { id: "next-steps", label: "Next steps" },
  { id: "platform", label: "Roadmap" },
] as const;

export type SectionId = (typeof navSections)[number]["id"];

export const futureModules = [
  "Sponsorship intelligence",
  "Leasing paths & availability",
  "Venue-specific microsites",
  "Audience analytics layer",
  "Partnership opportunity matrix",
] as const;

/** Hero + dining card — self-host H.264 for production Lighthouse. */
export const sampleVideos = {
  hero: "/nexora_starting.mp4",
  diningCard:
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
};
