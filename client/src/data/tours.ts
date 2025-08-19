// Static tour data that can be used for client-side operations
// This data should match what's in the server storage

export interface TourData {
  id: string;
  name: string;
  description: string;
  category: "heritage" | "nature" | "wine" | "family";
  duration: string;
  capacity: number;
  price: number;
  currency: string;
  networkingSuitability: boolean;
  includes: string[];
  schedule: string[];
  imageUrl: string;
  difficulty: "easy" | "moderate" | "challenging";
}

export const TOURS: TourData[] = [
  {
    id: "networking-safari",
    name: "Networking Safari",
    description: "Half-day wildlife experience with fellow professionals. Perfect for meaningful conversations.",
    category: "heritage",
    duration: "6 hours",
    capacity: 12,
    price: 185,
    currency: "USD",
    networkingSuitability: true,
    includes: ["Game drive", "Professional guide", "Refreshments", "Photography opportunities"],
    schedule: ["08:00 - Hotel pickup", "09:30 - Game reserve arrival", "14:30 - Lunch break", "16:00 - Return journey"],
    imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801",
    difficulty: "easy",
  },
  {
    id: "robben-island-cape-point",
    name: "Robben Island & Cape Point",
    description: "Explore South African history and breathtaking coastal views with industry peers.",
    category: "heritage",
    duration: "8 hours",
    capacity: 16,
    price: 145,
    currency: "USD",
    networkingSuitability: true,
    includes: ["Ferry to Robben Island", "Guided tour", "Cape Point visit", "Lunch at restaurant"],
    schedule: ["08:00 - Hotel pickup", "09:30 - Ferry departure", "13:00 - Lunch", "15:00 - Cape Point", "17:30 - Return"],
    imageUrl: "https://images.unsplash.com/photo-1577948000111-9c970dfe3743",
    difficulty: "moderate",
  },
  {
    id: "wine-governance",
    name: "Wine & Governance",
    description: "Stellenbosch wine estate with discussions on ethics and governance in business.",
    category: "wine",
    duration: "5 hours",
    capacity: 20,
    price: 95,
    currency: "USD",
    networkingSuitability: true,
    includes: ["Wine tasting", "Estate tour", "Business ethics discussion", "Lunch included"],
    schedule: ["10:00 - Hotel pickup", "11:00 - Estate arrival", "12:00 - Wine tasting", "13:30 - Lunch & discussion", "15:00 - Return"],
    imageUrl: "https://images.unsplash.com/photo-1510076857177-7470076d4098",
    difficulty: "easy",
  },
];

export const TOUR_CATEGORIES = {
  heritage: {
    label: "Heritage",
    description: "Historical sites and cultural experiences",
    color: "bg-afiia-green text-white"
  },
  nature: {
    label: "Nature", 
    description: "Wildlife and outdoor adventures",
    color: "bg-teal text-white"
  },
  wine: {
    label: "Wine",
    description: "Vineyard tours and tastings", 
    color: "bg-gold text-navy"
  },
  family: {
    label: "Family",
    description: "Activities suitable for all ages",
    color: "bg-navy text-white"
  }
};

export const getTourById = (id: string): TourData | undefined => {
  return TOURS.find(tour => tour.id === id);
};

export const getToursByCategory = (category: TourData["category"]): TourData[] => {
  return TOURS.filter(tour => tour.category === category);
};

export const getNetworkingTours = (): TourData[] => {
  return TOURS.filter(tour => tour.networkingSuitability);
};

export const getToursByDifficulty = (difficulty: TourData["difficulty"]): TourData[] => {
  return TOURS.filter(tour => tour.difficulty === difficulty);
};

export const getToursByPriceRange = (minPrice: number, maxPrice: number): TourData[] => {
  return TOURS.filter(tour => tour.price >= minPrice && tour.price <= maxPrice);
};
