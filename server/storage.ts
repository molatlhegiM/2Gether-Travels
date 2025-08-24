import {
  type Package, type InsertPackage,
  type Hotel, type InsertHotel,
  type RoomType, type InsertRoomType,
  type TransferOption, type InsertTransferOption,
  type Tour, type InsertTour,
  type Booking, type InsertBooking,
  type FAQ, type InsertFAQ,
  type Testimonial, type InsertTestimonial,
  type Partner, type InsertPartner,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Packages
  getPackages(): Promise<Package[]>;
  getPackage(id: string): Promise<Package | undefined>;
  createPackage(pkg: InsertPackage): Promise<Package>;

  // Hotels
  getHotels(): Promise<Hotel[]>;
  getHotel(id: string): Promise<Hotel | undefined>;
  createHotel(hotel: InsertHotel): Promise<Hotel>;

  // Room Types
  getRoomTypes(): Promise<RoomType[]>;
  getRoomTypesByHotel(hotelId: string): Promise<RoomType[]>;
  getRoomType(id: string): Promise<RoomType | undefined>;
  createRoomType(roomType: InsertRoomType): Promise<RoomType>;

  // Transfer Options
  getTransferOptions(): Promise<TransferOption[]>;
  getTransferOption(id: string): Promise<TransferOption | undefined>;
  createTransferOption(transfer: InsertTransferOption): Promise<TransferOption>;

  // Tours
  getTours(): Promise<Tour[]>;
  getToursByCategory(category: string): Promise<Tour[]>;
  getTour(id: string): Promise<Tour | undefined>;
  createTour(tour: InsertTour): Promise<Tour>;

  // Bookings
  getBookings(): Promise<Booking[]>;
  getBooking(id: string): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBooking(id: string, updates: Partial<Booking>): Promise<Booking | undefined>;

  // FAQ
  getFAQs(): Promise<FAQ[]>;
  createFAQ(faq: InsertFAQ): Promise<FAQ>;

  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;

  // Partners
  getPartners(): Promise<Partner[]>;
  createPartner(partner: InsertPartner): Promise<Partner>;
}

export class MemStorage implements IStorage {
  private packages = new Map<string, Package>();
  private hotels = new Map<string, Hotel>();
  private roomTypes = new Map<string, RoomType>();
  private transferOptions = new Map<string, TransferOption>();
  private tours = new Map<string, Tour>();
  private bookings = new Map<string, Booking>();
  private faqs = new Map<string, FAQ>();
  private testimonials = new Map<string, Testimonial>();
  private partners = new Map<string, Partner>();

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed Packages
    const packages: Package[] = [
      {
        id: "budget-pkg",
        name: "Budget",
        description: "Essential package for cost-conscious professionals",
        price: "1250.00",
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
        createdAt: new Date(),
      },
      {
        id: "executive-pkg",
        name: "Executive",
        description: "Premium package with enhanced services",
        price: "2100.00",
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
        createdAt: new Date(),
      },
      {
        id: "premium-pkg",
        name: "Premium",
        description: "Luxury package with VIP services",
        price: "3500.00",
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
        createdAt: new Date(),
      },
    ];

    // Seed Hotels
    const hotels: Hotel[] = [
      {
        id: "cape-grace",
        name: "Cape Grace Hotel",
        description: "Luxury waterfront hotel with Table Mountain views",
        starRating: 5,
        distanceToVenue: "2-min walk",
        address: "West Quay Road, V&A Waterfront, Cape Town",
        imageUrl: "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
        amenities: ["Free WiFi", "Pool", "Restaurant", "Spa", "Valet Parking"],
        rating: "5.0",
        reviewCount: 124,
        createdAt: new Date(),
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
        rating: "4.3",
        reviewCount: 89,
        createdAt: new Date(),
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
        rating: "4.1",
        reviewCount: 156,
        createdAt: new Date(),
      },
    ];

    // Seed Transfer Options
    const transfers: TransferOption[] = [
      {
        id: "shared-shuttle",
        type: "shared-shuttle",
        name: "Shared Shuttle",
        description: "Comfortable shared transfer with other delegates",
        capacity: 12,
        price: "45.00",
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
        createdAt: new Date(),
      },
      {
        id: "private-sedan",
        name: "Private Sedan",
        type: "private-sedan",
        description: "Private vehicle for up to 4 passengers",
        capacity: 4,
        price: "120.00",
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
        createdAt: new Date(),
      },
      {
        id: "vip-service",
        name: "VIP Service",
        type: "vip",
        description: "Luxury vehicle with premium service",
        capacity: 6,
        price: "250.00",
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
        createdAt: new Date(),
      },
    ];

    // Seed Tours
    const tours: Tour[] = [
      {
        id: "networking-safari",
        name: "Networking Safari",
        description: "Half-day wildlife experience with fellow professionals. Perfect for meaningful conversations.",
        category: "heritage",
        duration: "6 hours",
        capacity: 12,
        price: "185.00",
        currency: "USD",
        networkingSuitability: true,
        includes: ["Game drive", "Professional guide", "Refreshments", "Photography opportunities"],
        schedule: ["08:00 - Hotel pickup", "09:30 - Game reserve arrival", "14:30 - Lunch break", "16:00 - Return journey"],
        imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801",
        difficulty: "easy",
        createdAt: new Date(),
      },
      {
        id: "robben-island-cape-point",
        name: "Robben Island & Cape Point",
        description: "Explore South African history and breathtaking coastal views with industry peers.",
        category: "heritage",
        duration: "8 hours",
        capacity: 16,
        price: "145.00",
        currency: "USD",
        networkingSuitability: true,
        includes: ["Ferry to Robben Island", "Guided tour", "Cape Point visit", "Lunch at restaurant"],
        schedule: ["08:00 - Hotel pickup", "09:30 - Ferry departure", "13:00 - Lunch", "15:00 - Cape Point", "17:30 - Return"],
        imageUrl: "https://images.unsplash.com/photo-1577948000111-9c970dfe3743",
        difficulty: "moderate",
        createdAt: new Date(),
      },
      {
        id: "wine-governance",
        name: "Wine & Governance",
        description: "Stellenbosch wine estate with discussions on ethics and governance in business.",
        category: "wine",
        duration: "5 hours",
        capacity: 20,
        price: "95.00",
        currency: "USD",
        networkingSuitability: true,
        includes: ["Wine tasting", "Estate tour", "Business ethics discussion", "Lunch included"],
        schedule: ["10:00 - Hotel pickup", "11:00 - Estate arrival", "12:00 - Wine tasting", "13:30 - Lunch & discussion", "15:00 - Return"],
        imageUrl: "https://images.unsplash.com/photo-1510076857177-7470076d4098",
        difficulty: "easy",
        createdAt: new Date(),
      },
    ];

    // Seed FAQ
    const faqs: FAQ[] = [
      {
        id: "faq-1",
        question: "When should I book my AFIIA 2026 travel package?",
        answer: "We recommend booking 3-4 months before the conference (January-February 2026) to secure the best rates and availability. Early bird discounts are available until December 2025.",
        category: "booking",
        order: 1,
        active: true,
        createdAt: new Date(),
      },
      {
        id: "faq-2",
        question: "Can I modify my booking after confirmation?",
        answer: "Yes, modifications are allowed up to 30 days before travel. Changes may incur fees depending on the type of modification and supplier policies. Our concierge team assists with all changes.",
        category: "booking",
        order: 2,
        active: true,
        createdAt: new Date(),
      },
      {
        id: "faq-3",
        question: "Do you accept corporate invoices and PO numbers?",
        answer: "Absolutely. We work with corporate finance teams and can process payments via invoice with NET 30 terms. PO numbers are accepted and all necessary documentation is provided for expense reporting.",
        category: "payment",
        order: 3,
        active: true,
        createdAt: new Date(),
      },
    ];

    // Seed Testimonials
    const testimonials: Testimonial[] = [
      {
        id: "testimonial-1",
        quote: "2Gether Travels made the AFIIA conference seamless. The networking opportunities during the wine tour led to valuable professional connections that continue today.",
        author: "Sarah Mwangi",
        role: "Senior Auditor",
        company: "KPMG Kenya",
        imageUrl: "https://pixabay.com/get/gf036784e8c1b48f178f95268b02db1cb2ce01508a642d57badad30d0d9394d544e1024f022113b6511a1cdf2c63b49d56e5af44f6ba67145b5d7696a181f5478_1280.jpg",
        rating: 5,
        featured: true,
        createdAt: new Date(),
      },
      {
        id: "testimonial-2",
        quote: "The concierge service was exceptional. When my flight was delayed, they handled everything - hotel extension, transfer rescheduling, even dinner reservations.",
        author: "David Chen",
        role: "Finance Director",
        company: "Standard Bank",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        rating: 5,
        featured: true,
        createdAt: new Date(),
      },
      {
        id: "testimonial-3",
        quote: "Professional, reliable, and understanding of our corporate requirements. The invoice process was seamless and our procurement team was impressed.",
        author: "Amara Okafor",
        role: "Chief Auditor",
        company: "CBN Nigeria",
        imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
        rating: 5,
        featured: true,
        createdAt: new Date(),
      },
    ];

    packages.forEach(pkg => this.packages.set(pkg.id, pkg));
    hotels.forEach(hotel => this.hotels.set(hotel.id, hotel));
    transfers.forEach(transfer => this.transferOptions.set(transfer.id, transfer));
    tours.forEach(tour => this.tours.set(tour.id, tour));
    faqs.forEach(faq => this.faqs.set(faq.id, faq));
    testimonials.forEach(testimonial => this.testimonials.set(testimonial.id, testimonial));
  }

  // Package methods
  async getPackages(): Promise<Package[]> {
    return Array.from(this.packages.values());
  }

  async getPackage(id: string): Promise<Package | undefined> {
    return this.packages.get(id);
  }

  async createPackage(pkg: InsertPackage): Promise<Package> {
    const id = randomUUID();
    const newPackage: Package = { ...pkg, id, createdAt: new Date() };
    this.packages.set(id, newPackage);
    return newPackage;
  }

  // Hotel methods
  async getHotels(): Promise<Hotel[]> {
    return Array.from(this.hotels.values());
  }

  async getHotel(id: string): Promise<Hotel | undefined> {
    return this.hotels.get(id);
  }

  async createHotel(hotel: InsertHotel): Promise<Hotel> {
    const id = randomUUID();
    const newHotel: Hotel = { ...hotel, id, createdAt: new Date() };
    this.hotels.set(id, newHotel);
    return newHotel;
  }

  // Room Type methods
  async getRoomTypes(): Promise<RoomType[]> {
    return Array.from(this.roomTypes.values());
  }

  async getRoomTypesByHotel(hotelId: string): Promise<RoomType[]> {
    return Array.from(this.roomTypes.values()).filter(rt => rt.hotelId === hotelId);
  }

  async getRoomType(id: string): Promise<RoomType | undefined> {
    return this.roomTypes.get(id);
  }

  async createRoomType(roomType: InsertRoomType): Promise<RoomType> {
    const id = randomUUID();
    const newRoomType: RoomType = { ...roomType, id, createdAt: new Date() };
    this.roomTypes.set(id, newRoomType);
    return newRoomType;
  }

  // Transfer methods
  async getTransferOptions(): Promise<TransferOption[]> {
    return Array.from(this.transferOptions.values());
  }

  async getTransferOption(id: string): Promise<TransferOption | undefined> {
    return this.transferOptions.get(id);
  }

  async createTransferOption(transfer: InsertTransferOption): Promise<TransferOption> {
    const id = randomUUID();
    const newTransfer: TransferOption = { ...transfer, id, createdAt: new Date() };
    this.transferOptions.set(id, newTransfer);
    return newTransfer;
  }

  // Tour methods
  async getTours(): Promise<Tour[]> {
    return Array.from(this.tours.values());
  }

  async getToursByCategory(category: string): Promise<Tour[]> {
    return Array.from(this.tours.values()).filter(tour => tour.category === category);
  }

  async getTour(id: string): Promise<Tour | undefined> {
    return this.tours.get(id);
  }

  async createTour(tour: InsertTour): Promise<Tour> {
    const id = randomUUID();
    const newTour: Tour = { ...tour, id, createdAt: new Date() };
    this.tours.set(id, newTour);
    return newTour;
  }

  // Booking methods
  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const newBooking: Booking = { 
      ...booking, 
      id, 
      createdAt: new Date(),
      updatedAt: new Date() 
    };
    this.bookings.set(id, newBooking);
    return newBooking;
  }

  async updateBooking(id: string, updates: Partial<Booking>): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (!booking) return undefined;
    
    const updatedBooking = { 
      ...booking, 
      ...updates, 
      updatedAt: new Date() 
    };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }

  // FAQ methods
  async getFAQs(): Promise<FAQ[]> {
    return Array.from(this.faqs.values()).sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async createFAQ(faq: InsertFAQ): Promise<FAQ> {
    const id = randomUUID();
    const newFAQ: FAQ = { ...faq, id, createdAt: new Date() };
    this.faqs.set(id, newFAQ);
    return newFAQ;
  }

  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const newTestimonial: Testimonial = { ...testimonial, id, createdAt: new Date() };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }

  // Partner methods
  async getPartners(): Promise<Partner[]> {
    return Array.from(this.partners.values());
  }

  async createPartner(partner: InsertPartner): Promise<Partner> {
    const id = randomUUID();
    const newPartner: Partner = { ...partner, id, createdAt: new Date() };
    this.partners.set(id, newPartner);
    return newPartner;
  }
}

export const storage = new MemStorage();
