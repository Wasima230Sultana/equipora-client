/**
 * Dummy content for the Equipora homepage.
 * Kept in one place so the section components stay presentational.
 */

export type Equipment = {
  id: string
  name: string
  category: string
  location: string
  pricePerDay: number
  rating: number
  reviews: number
  image: string
  badge?: string
}

export type Category = {
  id: string
  name: string
  count: number
  image: string
}

export type Person = {
  name: string
  role: string
  location: string
  avatar: string
  detail: string
}

export type Testimonial = {
  quote: string
  name: string
  role: string
  avatar: string
}

/** Build a sized Unsplash URL from a photo id. */
export function photo(id: string, width: number, height?: number) {
  const size = height ? `&w=${width}&h=${height}` : `&w=${width}`
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80${size}`
}

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Browse equipment", href: "/browse-equipment" },
  // { label: "Categories", href: "#categories" },
  // { label: "How it works", href: "#how-it-works" },
  // { label: "Why Equipora", href: "#why-equipora" },
]

export const heroImage = photo("1495036019936-220b29b930ea", 2000, 1100)
export const storyImage = photo("1541888946425-d81bb19240f5", 1100, 1200)

export const heroStats = [
  { value: "2,500+", label: "Equipment available" },
  { value: "40+", label: "Cities served" },
  { value: "12k+", label: "Projects completed" },
]

export const locations = [
  "Dubai, UAE",
  "Abu Dhabi, UAE",
  "Sharjah, UAE",
  "Ajman, UAE",
  "Ras Al Khaimah, UAE",
]

export const categories: Category[] = [
  {
    id: "excavators",
    name: "Excavators",
    count: 320,
    image: photo("1580901368855-059c4792ff22", 700, 520),
  },
  {
    id: "bulldozers",
    name: "Bulldozers",
    count: 186,
    image: photo("1603814744174-115311ad645e", 700, 520),
  },
  {
    id: "cranes",
    name: "Cranes",
    count: 94,
    image: photo("1566766804405-eed274ee46bf", 700, 520),
  },
  {
    id: "dump-trucks",
    name: "Dump Trucks",
    count: 240,
    image: photo("1618906460527-05607b30f84b", 700, 520),
  },
  {
    id: "forklifts",
    name: "Forklifts",
    count: 312,
    image: photo("1532635026-d12867005472", 700, 520),
  },
  {
    id: "concrete-mixers",
    name: "Concrete Mixers",
    count: 128,
    image: photo("1588415796310-b9a124beabb0", 700, 520),
  },
]

/** Exactly six approved listings for the featured section. */
export const featuredEquipment: Equipment[] = [
  {
    id: "cat-320",
    name: "CAT 320 Hydraulic Excavator",
    category: "Excavators",
    location: "Dubai, UAE",
    pricePerDay: 420,
    rating: 4.9,
    reviews: 128,
    image: photo("1580901368855-059c4792ff22", 900, 700),
    badge: "Verified",
  },
  {
    id: "komatsu-d39",
    name: "Komatsu D39PX Bulldozer",
    category: "Bulldozers",
    location: "Abu Dhabi, UAE",
    pricePerDay: 510,
    rating: 4.8,
    reviews: 96,
    image: photo("1603814744174-115311ad645e", 900, 700),
    badge: "Verified",
  },
  {
    id: "liebherr-ltm",
    name: "Liebherr LTM 1090 Crane",
    category: "Cranes",
    location: "Sharjah, UAE",
    pricePerDay: 890,
    rating: 4.9,
    reviews: 74,
    image: photo("1566766804405-eed274ee46bf", 900, 700),
    badge: "Verified",
  },
  {
    id: "volvo-a40g",
    name: "Volvo A40G Dump Truck",
    category: "Dump Trucks",
    location: "Dubai, UAE",
    pricePerDay: 360,
    rating: 4.7,
    reviews: 112,
    image: photo("1618906460527-05607b30f84b", 900, 700),
    badge: "Verified",
  },
  {
    id: "toyota-8fg",
    name: "Toyota 8FG Forklift",
    category: "Forklifts",
    location: "Ajman, UAE",
    pricePerDay: 180,
    rating: 4.8,
    reviews: 203,
    image: photo("1532635026-d12867005472", 900, 700),
    badge: "Verified",
  },
  {
    id: "case-821f",
    name: "CASE 821F Wheel Loader",
    category: "Loaders",
    location: "Ras Al Khaimah, UAE",
    pricePerDay: 440,
    rating: 4.9,
    reviews: 87,
    image: photo("1629807473015-41699c4471b5", 900, 700),
    badge: "Verified",
  },
]

export const recentEquipment: Equipment[] = [
  {
    id: "hitachi-zx350",
    name: "Hitachi ZX350 Excavator",
    category: "Excavators",
    location: "Dubai, UAE",
    pricePerDay: 460,
    rating: 4.8,
    reviews: 42,
    image: photo("1495036019936-220b29b930ea", 900, 700),
    badge: "New",
  },
  {
    id: "zoomlion-mixer",
    name: "Zoomlion Concrete Mixer",
    category: "Concrete Mixers",
    location: "Sharjah, UAE",
    pricePerDay: 290,
    rating: 4.6,
    reviews: 31,
    image: photo("1588415796310-b9a124beabb0", 900, 700),
    badge: "New",
  },
  {
    id: "cat-336",
    name: "Caterpillar 336 Excavator",
    category: "Excavators",
    location: "Abu Dhabi, UAE",
    pricePerDay: 520,
    rating: 4.9,
    reviews: 58,
    image: photo("1534097575056-ddba81f714c8", 900, 700),
    badge: "New",
  },
  {
    id: "komatsu-pc210",
    name: "Komatsu PC210 Excavator",
    category: "Excavators",
    location: "Fujairah, UAE",
    pricePerDay: 395,
    rating: 4.7,
    reviews: 26,
    image: photo("1583024011792-b165975b52f5", 900, 700),
    badge: "New",
  },
]

export const steps = [
  {
    title: "Search & compare",
    description:
      "Browse verified equipment, compare prices and find the right machine for your site.",
  },
  {
    title: "Book with confidence",
    description:
      "Reserve in minutes with transparent pricing, secure payment and no hidden fees.",
  },
  {
    title: "Equipment delivered",
    description:
      "We coordinate pickup or delivery so your machine arrives exactly when you need it.",
  },
  {
    title: "Build & return",
    description:
      "Get to work, then return the equipment on your schedule with support along the way.",
  },
]

export const benefits = [
  {
    title: "Verified equipment",
    description: "Every listing is inspected and approved before it goes live.",
    icon: "shield",
  },
  {
    title: "Secure payments",
    description: "Protected transactions and clear terms on every rental.",
    icon: "lock",
  },
  {
    title: "Flexible rentals",
    description:
      "Daily, weekly or monthly terms that fit your project timeline.",
    icon: "calendar",
  },
  {
    title: "Dedicated support",
    description: "Our team is available around the clock when you need a hand.",
    icon: "headphones",
  },
] as const

export const owners: Person[] = [
  {
    name: "Ahmed Al Mansouri",
    role: "Equipment Owner",
    location: "Dubai, UAE",
    avatar: photo("1560250097-0b93528c311a", 160, 160),
    detail: "24 machines listed",
  },
  {
    name: "Sarah Collins",
    role: "Fleet Manager",
    location: "Abu Dhabi, UAE",
    avatar: photo("1573496359142-b8d87734a5a2", 160, 160),
    detail: "18 machines listed",
  },
  {
    name: "James Miller",
    role: "Equipment Owner",
    location: "Sharjah, UAE",
    avatar: photo("1500648767791-00dcc994a43e", 160, 160),
    detail: "31 machines listed",
  },
  {
    name: "Fatima Hassan",
    role: "Operations Lead",
    location: "Ajman, UAE",
    avatar: photo("1580489944761-15a19d654956", 160, 160),
    detail: "12 machines listed",
  },
]

export const testimonials: Testimonial[] = [
  {
    quote:
      "We needed an excavator on site the next morning. Equipora had it delivered before the crew arrived — the whole process was effortless.",
    name: "Daniel Ross",
    role: "Site Engineer, Dubai",
    avatar: photo("1500648767791-00dcc994a43e", 120, 120),
  },
  {
    quote:
      "Transparent pricing and genuinely well-maintained machines. It has completely changed how we plan our projects.",
    name: "Priya Nair",
    role: "Project Manager, Abu Dhabi",
    avatar: photo("1573496359142-b8d87734a5a2", 120, 120),
  },
  {
    quote:
      "As an owner, I can keep my fleet working without the hassle. Bookings, payments and communication are all in one place.",
    name: "Marcus Bell",
    role: "Equipment Owner, Sharjah",
    avatar: photo("1560250097-0b93528c311a", 120, 120),
  },
  {
    quote:
      "The support team answered every question within minutes. That kind of reliability is rare in this industry.",
    name: "Aisha Karim",
    role: "Procurement Lead, Ajman",
    avatar: photo("1580489944761-15a19d654956", 120, 120),
  },
]

export const footerGroups = [
  {
    title: "Company",
    links: [
      { label: "About us", href: "#why-equipora" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Careers", href: "#" },
      { label: "News & insights", href: "#" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Browse equipment", href: "#equipment" },
      { label: "Categories", href: "#categories" },
      { label: "Recently added", href: "#recent" },
      { label: "Trusted owners", href: "#owners" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help center", href: "#" },
      { label: "Contact us", href: "#" },
      { label: "Terms of service", href: "#" },
      { label: "Privacy policy", href: "#" },
    ],
  },
]
