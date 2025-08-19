// Static hotel data that can be used for client-side operations
// This data should match what's in the server storage

export interface HotelData {
  id: string;
  name: string;
  description: string;
  starRating: number;
  distanceToVenue: string;
  address: string;
  imageUrl: string;
  amenities: string[];
  rating: number;
  reviewCount: number;
  basePrice: number;
  currency: string;
}

export const HOTELS: HotelData[] = [
  {
    id: "cape-grace",
    name: "Cape Grace Hotel",
    description: "Luxury waterfront hotel with Table Mountain views",
    starRating: 5,
    distanceToVenue: "2-min walk",
    address: "West Quay Road, V&A Waterfront, Cape Town",
    imageUrl: "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
    amenities: ["Free WiFi", "Pool", "Restaurant", "Spa", "Valet Parking"],
    rating: 5.0,
    reviewCount: 124,
    basePrice: 280,
    currency: "USD",
  },
  {
    id: "table-bay",
    name: "Table Bay Hotel",
    description: "Modern business hotel with conference facilities",
    starRating: 4,
    distanceToVenue: "5-min shuttle",
    address: "Quay 6, V&A Waterfront, Cape Town",
    imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427",
    amenities: ["Free WiFi", "Gym", "Parking", "Business Center"],
    rating: 4.3,
    reviewCount: 89,
    basePrice: 195,
    currency: "USD",
  },
  {
    id: "victoria-junction",
    name: "Victoria Junction",
    description: "Boutique hotel in Green Point with contemporary design",
    starRating: 4,
    distanceToVenue: "3-min walk",
    address: "Corner of Somerset Road & Napier Street, Green Point",
    imageUrl: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
    amenities: ["Free WiFi", "Concierge", "Café", "Rooftop Terrace"],
    rating: 4.1,
    reviewCount: 156,
    basePrice: 140,
    currency: "USD",
  },
];

export const getHotelById = (id: string): HotelData | undefined => {
  return HOTELS.find(hotel => hotel.id === id);
};

export const getHotelsByStarRating = (rating: number): HotelData[] => {
  return HOTELS.filter(hotel => hotel.starRating === rating);
};

export const getHotelsByDistance = (walkingDistance: boolean = true): HotelData[] => {
  return HOTELS.filter(hotel => 
    walkingDistance ? hotel.distanceToVenue.includes("walk") : hotel.distanceToVenue.includes("shuttle")
  );
};

export const getHotelsByPriceRange = (minPrice: number, maxPrice: number): HotelData[] => {
  return HOTELS.filter(hotel => hotel.basePrice >= minPrice && hotel.basePrice <= maxPrice);
};
