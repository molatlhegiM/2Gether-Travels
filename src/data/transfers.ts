// Static transfer data that can be used for client-side operations
// This data should match what's in the server storage

export interface TransferData {
  id: string;
  type: "shared-shuttle" | "private-sedan" | "vip";
  name: string;
  description: string;
  capacity: number;
  price: number;
  currency: string;
  priceType: "per_person" | "per_trip";
  meetAndGreet: boolean;
  features: string[];
  imageUrl?: string;
  popular: boolean;
}

export const TRANSFERS: TransferData[] = [
  {
    id: "shared-shuttle",
    type: "shared-shuttle",
    name: "Shared Shuttle",
    description: "Comfortable shared transfer with other delegates",
    capacity: 12,
    price: 45,
    currency: "USD",
    priceType: "per_person",
    meetAndGreet: false,
    features: [
      "Airport pickup & drop-off",
      "Daily venue shuttles",
      "Professional drivers",
      "Shared with other delegates"
    ],
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957",
    popular: false,
  },
  {
    id: "private-sedan",
    name: "Private Sedan",
    type: "private-sedan",
    description: "Private vehicle for up to 4 passengers",
    capacity: 4,
    price: 120,
    currency: "USD",
    priceType: "per_trip",
    meetAndGreet: true,
    features: [
      "Private vehicle for up to 4 pax",
      "Meet & greet service",
      "Flexible timing",
      "Professional chauffeur"
    ],
    imageUrl: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d",
    popular: true,
  },
  {
    id: "vip-service",
    name: "VIP Service",
    type: "vip",
    description: "Luxury vehicle with premium service",
    capacity: 6,
    price: 250,
    currency: "USD",
    priceType: "per_trip",
    meetAndGreet: true,
    features: [
      "Luxury vehicle for up to 6 pax",
      "Airport lounge access",
      "Dedicated concierge",
      "24/7 availability"
    ],
    popular: false,
  },
];

export const TRANSFER_TYPES = {
  "shared-shuttle": {
    label: "Shared Shuttle",
    icon: "👥",
    description: "Cost-effective option with other travelers"
  },
  "private-sedan": {
    label: "Private Sedan", 
    icon: "🚗",
    description: "Private comfort for small groups"
  },
  "vip": {
    label: "VIP Service",
    icon: "👑", 
    description: "Premium luxury experience"
  }
};

export const getTransferById = (id: string): TransferData | undefined => {
  return TRANSFERS.find(transfer => transfer.id === id);
};

export const getTransfersByType = (type: TransferData["type"]): TransferData[] => {
  return TRANSFERS.filter(transfer => transfer.type === type);
};

export const getPopularTransfers = (): TransferData[] => {
  return TRANSFERS.filter(transfer => transfer.popular);
};

export const getTransfersByCapacity = (minCapacity: number): TransferData[] => {
  return TRANSFERS.filter(transfer => transfer.capacity >= minCapacity);
};

export const getTransfersByPriceRange = (minPrice: number, maxPrice: number): TransferData[] => {
  return TRANSFERS.filter(transfer => transfer.price >= minPrice && transfer.price <= maxPrice);
};

export const formatTransferPrice = (transfer: TransferData): string => {
  const amount = `$${transfer.price.toLocaleString()}`;
  return `${amount}/${transfer.priceType === 'per_person' ? 'person' : 'trip'}`;
};
