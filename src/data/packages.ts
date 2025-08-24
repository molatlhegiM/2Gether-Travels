// Static package data that can be used for client-side operations
// This data should match what's in the server storage

export interface PackageData {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  inclusions: string[];
  popular: boolean;
  recommended: boolean;
  maxPax: number;
}

export const PACKAGES: PackageData[] = [
  {
    id: "budget-pkg",
    name: "Budget",
    description: "Essential package for cost-conscious professionals",
    price: 1250,
    currency: "USD",
    inclusions: [
      "3-star hotel accommodation",
      "Shared shuttle transfers",
      "Basic concierge access",
      "1 networking tour credit"
    ],
    popular: true,
    recommended: false,
    maxPax: 1,
  },
  {
    id: "executive-pkg",
    name: "Executive",
    description: "Premium package with enhanced services",
    price: 2100,
    currency: "USD",
    inclusions: [
      "4-star hotel accommodation",
      "Private sedan transfers",
      "Premium concierge access",
      "3 networking tour credits",
      "Welcome dinner included"
    ],
    popular: false,
    recommended: true,
    maxPax: 1,
  },
  {
    id: "premium-pkg",
    name: "Premium",
    description: "Luxury package with VIP services",
    price: 3500,
    currency: "USD",
    inclusions: [
      "5-star luxury hotel suite",
      "VIP chauffeur service",
      "24/7 concierge service",
      "Unlimited tour credits",
      "Private wine tasting",
      "Airport lounge access"
    ],
    popular: false,
    recommended: false,
    maxPax: 1,
  },
];

export const getPackageById = (id: string): PackageData | undefined => {
  return PACKAGES.find(pkg => pkg.id === id);
};

export const getPopularPackages = (): PackageData[] => {
  return PACKAGES.filter(pkg => pkg.popular);
};

export const getRecommendedPackage = (): PackageData | undefined => {
  return PACKAGES.find(pkg => pkg.recommended);
};
