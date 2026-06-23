const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=85`;

export const BRAND = {
  name: "AASTHA LED",
  tagline: "WHERE LIGHT BECOMES FORM",
  badge: "Decorative & Architectural Lighting",
  heroLine: "LIGHT.\nREIMAGINED.",
  heroDesc: "Premium luminaires engineered for architects, designers, and developers who demand specification-grade performance.",
} as const;

export const NAV = [
  { href: "/#hero", label: "AASTHA LED" },
  { href: "/products", label: "PRODUCTS" },
  { href: "/#spaces", label: "SPACES" },
  { href: "/#demo-center", label: "DEMO CENTER" },
  { href: "/#about", label: "ABOUT" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#connect", label: "CONNECT" },
] as const;

export const HEADER_NAV = [
  { href: "/products", label: "Products" },
  { href: "/#about", label: "About" },
] as const;

export const CONTACT = {
  email: "hello@aasthaled.com",
  phone: "+91 22 4000 0000",
  location: "Mumbai, India",
  hours: "Mon – Fri · 9am – 6pm IST",
  lead: "Tell us about your project — our team responds within 24 hours.",
} as const;

export const LIGHT_SPECTRUM = [
  {
    kelvin: "2700K",
    name: "Warm White",
    phrase: ["Intimate", "Restful", "Human"],
    detail: "Hospitality · Bedrooms · Dining",
    core: "#fff4e0",
    mid: "#e8b84a",
    glow: "rgba(232, 184, 74, 0.55)",
    glowSoft: "rgba(232, 184, 74, 0.14)",
    beam: "rgba(232, 184, 74, 0.22)",
  },
  {
    kelvin: "4000K",
    name: "Neutral White",
    phrase: ["Balanced", "Honest", "True"],
    detail: "Retail · Galleries · Living spaces",
    core: "#ffffff",
    mid: "#f5f2eb",
    glow: "rgba(245, 242, 235, 0.42)",
    glowSoft: "rgba(245, 242, 235, 0.1)",
    beam: "rgba(245, 242, 235, 0.18)",
  },
  {
    kelvin: "6500K",
    name: "Cool White",
    phrase: ["Crisp", "Focused", "Architectural"],
    detail: "Offices · Clinics · Task lighting",
    core: "#e8fdff",
    mid: "#52b5c0",
    glow: "rgba(82, 181, 192, 0.55)",
    glowSoft: "rgba(82, 181, 192, 0.14)",
    beam: "rgba(82, 181, 192, 0.22)",
  },
] as const;

export const PRODUCTS = [
  {
    id: "aura-dome",
    name: "Aura Dome",
    type: "Feature Luminaire",
    image: u("1513506003901-1e6a229e2d15", 900),
    specs: ["98+ CRI", "2700K", "Dimmable", "IP44"],
    description: "Dual-layer glass dome with warm diffusion for hospitality and gallery spaces.",
    position: [-2.2, 0.3, 0] as [number, number, number],
  },
  {
    id: "duo-beam",
    name: "Duo Beam",
    type: "Wall Sconce",
    image: u("1513828583688-c52646db42da", 900),
    specs: ["Adjustable", "3000K", "0.1% Flicker", "50,000 hr"],
    description: "Asymmetric wall grazer casting precise architectural light paths.",
    position: [0, -0.2, -1.5] as [number, number, number],
  },
  {
    id: "arc-swing",
    name: "Arc Swing",
    type: "Adjustable Wall",
    image: u("1524484485831-a92ffc0de03f", 900),
    specs: ["360° Swivel", "Brass Finish", "Triac Dim"],
    description: "Swing-arm luminaire with frosted cylinder and brass articulation.",
    position: [2.4, 0.1, 0.5] as [number, number, number],
  },
  {
    id: "cone-line",
    name: "Cone Line",
    type: "Wall Wash",
    image: u("1565814329452-e1efa11c5b89", 900),
    specs: ["UGR < 16", "DALI Ready", "IP54"],
    description: "Conical shade with smoked inner glass for dramatic downward pools.",
    position: [0.5, 0.6, 1.2] as [number, number, number],
  },
] as const;

export type Product = (typeof PRODUCTS)[number];

export const ILLUMINATED_SPACES = [
  { id: "residence", label: "Private Residence", location: "Mumbai, India", dark: u("1486406146926-c627a92ad1ab"), lit: u("1600607687939-ce8a6c25118c") },
  { id: "hotel", label: "Boutique Hotel Lobby", location: "Delhi, India", dark: u("1497366216548-37526070297c"), lit: u("1542314831-068cd1dbfeeb") },
  { id: "restaurant", label: "Fine Dining", location: "Bangalore, India", dark: u("1445205170230-053b83016050"), lit: u("1600210492486-724fe3c689dd") },
] as const;

/** @deprecated use ILLUMINATED_SPACES */
export const ATMOSPHERES = ILLUMINATED_SPACES;

export const DEMO_CENTER_IMAGE = "/images/demo-booth.png";

export const DEMO_CENTER_ROOMS = [
  { id: "outdoor", label: "Outdoor Display", x: 16, y: 84, products: ["Cone Line", "Aura Dome"] },
  { id: "kitchen", label: "Kitchen", x: 36, y: 56, products: ["Duo Beam"] },
  { id: "living", label: "Living Room", x: 50, y: 64, products: ["Aura Dome", "Cone Line"] },
  { id: "lobby", label: "Lobby", x: 66, y: 52, products: ["Aura Dome", "Duo Beam"] },
  { id: "reception", label: "Reception", x: 76, y: 42, products: ["Arc Swing"] },
] as const;

/** @deprecated use DEMO_CENTER_* */
export const HOUSE_EXPERIENCE_IMAGE = DEMO_CENTER_IMAGE;
export const HOUSE_ROOMS = DEMO_CENTER_ROOMS;

export const ABOUT = {
  story:
    "Aastha LED is a leading manufacturer of decorative and architectural lighting. From optical design to final assembly, every luminaire is engineered in-house for architects, designers, and developers who demand specification-grade performance.",
  image: u("1513506003901-1e6a229e2d15", 1000),
} as const;

export const ABOUT_GALLERY = [
  { src: u("1513506003901-1e6a229e2d15", 900), alt: "Luminaire detail", caption: "Optical engineering" },
  { src: u("1565814329452-e1efa11c5b89", 900), alt: "Manufacturing", caption: "In-house assembly" },
  { src: u("1524484485831-a92ffc0de03f", 900), alt: "Material finish", caption: "Brass & glass craft" },
  { src: u("1513828583688-c52646db42da", 900), alt: "Installed project", caption: "Specification-grade output" },
] as const;

export const FAQ_GALLERY = [
  u("1513506003901-1e6a229e2d15", 600),
  u("1565814329452-e1efa11c5b89", 600),
  u("1524484485831-a92ffc0de03f", 600),
  u("1600607687939-ce8a6c25118c", 600),
] as const;

export const STATS = [
  { value: "15+", label: "Years of R&D" },
  { value: "98+", label: "CRI Standard" },
  { value: "500+", label: "Projects" },
  { value: "50K", label: "Hour Lifespan" },
] as const;

export const FAQ_ITEMS = [
  {
    q: "What makes Aastha LED different?",
    a: "We engineer complete lighting systems — optics, drivers, thermal management, and housings — under one roof. Every product is tested for CRI, flicker, and lifespan before dispatch.",
  },
  {
    q: "Do you work with architects and designers?",
    a: "Yes. We collaborate on bespoke beam angles, custom finishes, DALI integration, and project-specific photometric layouts.",
  },
  {
    q: "What are typical lead times?",
    a: "Standard products ship in 2–4 weeks. Custom-engineered solutions typically require 6–10 weeks.",
  },
  {
    q: "What warranty do you provide?",
    a: "All products carry a minimum 5-year warranty, with extended coverage for commercial and hospitality installations.",
  },
  {
    q: "Can I specify products for a full project?",
    a: "Our team provides specification support, catalogue downloads, and project consultation — reach out via the contact form.",
  },
] as const;

export const FOOTER_COLUMNS = [
  {
    id: "explore",
    title: "EXPLORE",
    links: [
      { id: "products", label: "Products", href: "/products" },
      { id: "spaces", label: "Illuminated Spaces", href: "/#spaces" },
      { id: "demo-center", label: "Demo Center", href: "/#demo-center" },
    ],
  },
  {
    id: "company",
    title: "COMPANY",
    links: [
      { id: "about", label: "About", href: "/#about" },
      { id: "faq", label: "FAQ", href: "/#faq" },
      { id: "connect", label: "Connect", href: "/#connect" },
    ],
  },
  {
    id: "support",
    title: "SUPPORT",
    links: [
      { id: "catalogue", label: "Request Catalogue", href: "/#connect" },
      { id: "consultation", label: "Project Consultation", href: "/#connect" },
      { id: "specification", label: "Specification Support", href: "/#connect" },
    ],
  },
] as const;

export const FOOTER_SOCIAL = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "YouTube", href: "https://youtube.com" },
] as const;
