export type Listing = {
  id: string;
  name: string;
  type: string;
  location: string;
  city: string;
  state: string;
  area: string;
  dimensions: string;
  price: number;
  impressions: string;
  traffic: string;
  availability: "Available" | "Booked" | "Available Soon";
  lighting: string;
  facing: string;
  image: string;
  images: string[];
  description: string;
  features: string[];
  lat: number;
  lng: number;
};

export const LISTINGS: Listing[] = [
  {
    id: "RD-001",
    name: "Premium Billboard — Lekki",
    type: "Billboard",
    location: "Lekki Phase 1, Lagos",
    city: "Lagos",
    state: "Lagos",
    area: "Lekki",
    dimensions: "48ft × 14ft",
    price: 350000,
    impressions: "45,000/day",
    traffic: "Very High",
    availability: "Available",
    lighting: "Illuminated",
    facing: "North-bound",
    image:
      "https://images.unsplash.com/photo-1745725427532-4c52cdc6d4ae?w=800&h=500&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1745725427532-4c52cdc6d4ae?w=1200&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1784101832763-d1ff32764751?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1785522564396-4c4d97bf689d?w=800&h=500&fit=crop&auto=format",
    ],
    description:
      "High-impact roadside billboard positioned on the Lekki-Epe Expressway, one of Lagos's busiest corridors. Full illumination ensures 24-hour visibility. Ideal for brands targeting affluent professionals and commuters.",
    features: [
      "24/7 illumination",
      "Unobstructed sightline",
      "High foot & vehicle traffic",
      "Premium print finish",
    ],
    lat: 6.4698,
    lng: 3.5852,
  },
  {
    id: "RD-002",
    name: "Digital Screen — Victoria Island",
    type: "Digital Billboard",
    location: "Adeola Odeku, Victoria Island",
    city: "Lagos",
    state: "Lagos",
    area: "Victoria Island",
    dimensions: "20ft × 10ft",
    price: 280000,
    impressions: "38,000/day",
    traffic: "High",
    availability: "Available",
    lighting: "LED",
    facing: "Dual-sided",
    image:
      "https://images.unsplash.com/photo-1785522564396-4c4d97bf689d?w=800&h=500&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1785522564396-4c4d97bf689d?w=1200&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1508849789987-4e5333c12b78?w=800&h=500&fit=crop&auto=format",
    ],
    description:
      "Full-motion LED digital screen at the heart of Victoria Island's commercial district. Rotate multiple creatives throughout the day. Minimum booking 2 weeks.",
    features: [
      "Full HD LED display",
      "Multi-brand rotation",
      "Daypart targeting",
      "Remote content update",
    ],
    lat: 6.4281,
    lng: 3.4219,
  },
  {
    id: "RD-003",
    name: "Highway Unipole — Abuja Airport Road",
    type: "Billboard",
    location: "Nnamdi Azikiwe Airport Road, Abuja",
    city: "Abuja",
    state: "FCT",
    area: "Airport Road",
    dimensions: "60ft × 20ft",
    price: 420000,
    impressions: "52,000/day",
    traffic: "Very High",
    availability: "Available",
    lighting: "Solar Illuminated",
    facing: "South-bound",
    image:
      "https://images.unsplash.com/photo-1616418625172-c607e16733ca?w=800&h=500&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1616418625172-c607e16733ca?w=1200&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1580239808566-2f1c56a693ac?w=800&h=500&fit=crop&auto=format",
    ],
    description:
      "Commanding unipole structure on the main airport approach road. Captures every traveller, diplomat, and business visitor entering and exiting Abuja. An unmissable first impression.",
    features: [
      "Airport-facing traffic",
      "Solar-powered lighting",
      "Premium vinyl print",
      "Steel unipole structure",
    ],
    lat: 9.0065,
    lng: 7.4619,
  },
  {
    id: "RD-004",
    name: "Bus Shelter — Ikeja CBD",
    type: "Bus Shelter",
    location: "Obafemi Awolowo Way, Ikeja",
    city: "Lagos",
    state: "Lagos",
    area: "Ikeja",
    dimensions: "6ft × 4ft",
    price: 85000,
    impressions: "12,000/day",
    traffic: "High",
    availability: "Available",
    lighting: "Backlit",
    facing: "East-bound",
    image:
      "https://images.unsplash.com/photo-1548182880-8b7b2af2caa2?w=800&h=500&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1548182880-8b7b2af2caa2?w=1200&h=700&fit=crop&auto=format",
    ],
    description:
      "Eye-level backlit bus shelter panel in Ikeja CBD. Pedestrian and commuter facing, ideal for consumer brands, financial services, and retail campaigns.",
    features: [
      "Street-level visibility",
      "Backlit illumination",
      "High pedestrian traffic",
      "Government-compliant structure",
    ],
    lat: 6.5958,
    lng: 3.3397,
  },
  {
    id: "RD-005",
    name: "Wall Mural — Surulere",
    type: "Wall",
    location: "Adeniran Ogunsanya, Surulere",
    city: "Lagos",
    state: "Lagos",
    area: "Surulere",
    dimensions: "80ft × 30ft",
    price: 195000,
    impressions: "28,000/day",
    traffic: "Medium",
    availability: "Available Soon",
    lighting: "Unlit",
    facing: "West-facing",
    image:
      "https://images.unsplash.com/photo-1587161584760-f51779fb276a?w=800&h=500&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1587161584760-f51779fb276a?w=1200&h=700&fit=crop&auto=format",
    ],
    description:
      "Expansive painted wall space along a major Surulere arterial road. Massive canvas ideal for brand murals, creative campaigns, and cultural storytelling. Perfect for FMCG and telecoms brands.",
    features: [
      "Massive canvas size",
      "High brand recall",
      "Urban youth audience",
      "Creative freedom",
    ],
    lat: 6.5041,
    lng: 3.3617,
  },
  {
    id: "RD-006",
    name: "Indoor Screen — The Palms Mall",
    type: "Indoor Advertising",
    location: "Lekki Phase 1, Lagos",
    city: "Lagos",
    state: "Lagos",
    area: "Lekki",
    dimensions: "10ft × 6ft",
    price: 120000,
    impressions: "8,500/day",
    traffic: "Medium",
    availability: "Available",
    lighting: "LED",
    facing: "Atrium-facing",
    image:
      "https://images.unsplash.com/photo-1508849789987-4e5333c12b78?w=800&h=500&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1508849789987-4e5333c12b78?w=1200&h=700&fit=crop&auto=format",
    ],
    description:
      "Premium digital screen in the main atrium of The Palms Shopping Mall. Reaches high-spending shoppers in a premium retail environment. Ideal for luxury, fashion, and lifestyle brands.",
    features: [
      "Air-conditioned environment",
      "Affluent shopper audience",
      "Multi-brand rotation",
      "Premium placement",
    ],
    lat: 6.4347,
    lng: 3.4707,
  },
];

export const CATEGORIES = [
  {
    name: "Billboards",
    count: 124,
    image:
      "https://images.unsplash.com/photo-1745725427532-4c52cdc6d4ae?w=600&h=400&fit=crop&auto=format",
    icon: "🗼",
  },
  {
    name: "Digital Billboards",
    count: 48,
    image:
      "https://images.unsplash.com/photo-1785522564396-4c4d97bf689d?w=600&h=400&fit=crop&auto=format",
    icon: "📺",
  },
  {
    name: "Transit Advertising",
    count: 73,
    image:
      "https://images.unsplash.com/photo-1616418625172-c607e16733ca?w=600&h=400&fit=crop&auto=format",
    icon: "🚌",
  },
  {
    name: "Street Advertising",
    count: 56,
    image:
      "https://images.unsplash.com/photo-1548182880-8b7b2af2caa2?w=600&h=400&fit=crop&auto=format",
    icon: "🏙️",
  },
  {
    name: "Wall Advertising",
    count: 38,
    image:
      "https://images.unsplash.com/photo-1587161584760-f51779fb276a?w=600&h=400&fit=crop&auto=format",
    icon: "🧱",
  },
  {
    name: "Indoor Advertising",
    count: 29,
    image:
      "https://images.unsplash.com/photo-1508849789987-4e5333c12b78?w=600&h=400&fit=crop&auto=format",
    icon: "🏬",
  },
];

export const LOCATIONS = [
  {
    name: "Lagos",
    count: 218,
    image:
      "https://images.unsplash.com/photo-1580239808566-2f1c56a693ac?w=600&h=400&fit=crop&auto=format",
    state: "Lagos State",
  },
  {
    name: "Abuja",
    count: 94,
    image:
      "https://images.unsplash.com/photo-1616418625172-c607e16733ca?w=600&h=400&fit=crop&auto=format",
    state: "FCT",
  },
  {
    name: "Port Harcourt",
    count: 67,
    image:
      "https://images.unsplash.com/photo-1566728347635-dc5e9520b2a6?w=600&h=400&fit=crop&auto=format",
    state: "Rivers State",
  },
  {
    name: "Kano",
    count: 43,
    image:
      "https://images.unsplash.com/photo-1654762550505-7c58277e0fac?w=600&h=400&fit=crop&auto=format",
    state: "Kano State",
  },
  {
    name: "Ibadan",
    count: 38,
    image:
      "https://images.unsplash.com/photo-1559897752-11f80cef5173?w=600&h=400&fit=crop&auto=format",
    state: "Oyo State",
  },
  {
    name: "Enugu",
    count: 29,
    image:
      "https://images.unsplash.com/photo-1616101811331-e081942f2c7e?w=600&h=400&fit=crop&auto=format",
    state: "Enugu State",
  },
];

export function formatPrice(p: number) {
  return `₦${p.toLocaleString("en-NG")}`;
}
