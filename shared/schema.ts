import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Packages
export const packages = pgTable("packages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).notNull().default("USD"),
  inclusions: json("inclusions").$type<string[]>().notNull().default([]),
  popular: boolean("popular").default(false),
  recommended: boolean("recommended").default(false),
  maxPax: integer("max_pax").default(1),
  createdAt: timestamp("created_at").defaultNow(),
});

// Hotels
export const hotels = pgTable("hotels", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 200 }).notNull(),
  description: text("description"),
  starRating: integer("star_rating").notNull(),
  distanceToVenue: varchar("distance_to_venue", { length: 50 }),
  address: text("address"),
  imageUrl: text("image_url"),
  amenities: json("amenities").$type<string[]>().notNull().default([]),
  rating: decimal("rating", { precision: 3, scale: 1 }),
  reviewCount: integer("review_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Room Types
export const roomTypes = pgTable("room_types", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  hotelId: varchar("hotel_id").references(() => hotels.id).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  occupancy: integer("occupancy").notNull().default(1),
  pricePerNight: decimal("price_per_night", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).notNull().default("USD"),
  mealPlan: varchar("meal_plan", { length: 50 }),
  available: boolean("available").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Transfer Options
export const transferOptions = pgTable("transfer_options", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: varchar("type", { length: 50 }).notNull(), // shared-shuttle, private-sedan, vip
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  capacity: integer("capacity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).notNull().default("USD"),
  priceType: varchar("price_type", { length: 20 }).notNull().default("per_person"), // per_person, per_trip
  meetAndGreet: boolean("meet_and_greet").default(false),
  features: json("features").$type<string[]>().notNull().default([]),
  imageUrl: text("image_url"),
  popular: boolean("popular").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Tours
export const tours = pgTable("tours", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 200 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 50 }).notNull(), // heritage, nature, wine, family
  duration: varchar("duration", { length: 50 }).notNull(),
  capacity: integer("capacity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).notNull().default("USD"),
  networkingSuitability: boolean("networking_suitability").default(false),
  includes: json("includes").$type<string[]>().notNull().default([]),
  schedule: json("schedule").$type<string[]>().notNull().default([]),
  imageUrl: text("image_url"),
  difficulty: varchar("difficulty", { length: 20 }).default("easy"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Bookings
export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  packageId: varchar("package_id").references(() => packages.id),
  hotelId: varchar("hotel_id").references(() => hotels.id),
  roomTypeId: varchar("room_type_id").references(() => roomTypes.id),
  transferId: varchar("transfer_id").references(() => transferOptions.id),
  tourIds: json("tour_ids").$type<string[]>().notNull().default([]),
  travelerDetails: json("traveler_details").$type<{
    name: string;
    email: string;
    phone: string;
    country: string;
    specialRequests?: string;
  }>().notNull(),
  paymentDetails: json("payment_details").$type<{
    method: string;
    status: string;
    amount: number;
    currency: string;
    transactionId?: string;
  }>().notNull(),
  invoiceDetails: json("invoice_details").$type<{
    company?: string;
    vatNumber?: string;
    poNumber?: string;
    billingAddress?: string;
  }>(),
  bookingStatus: varchar("booking_status", { length: 20 }).notNull().default("pending"),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).notNull().default("USD"),
  checkInDate: timestamp("check_in_date"),
  checkOutDate: timestamp("check_out_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// FAQ
export const faqs = pgTable("faqs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: varchar("category", { length: 50 }),
  order: integer("order").default(0),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Testimonials
export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  quote: text("quote").notNull(),
  author: varchar("author", { length: 100 }).notNull(),
  role: varchar("role", { length: 100 }),
  company: varchar("company", { length: 100 }),
  imageUrl: text("image_url"),
  rating: integer("rating").default(5),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Partners
export const partners = pgTable("partners", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 100 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(), // hotel, airline, tour-operator, venue
  logoUrl: text("logo_url"),
  description: text("description"),
  website: varchar("website", { length: 200 }),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert Schemas
export const insertPackageSchema = createInsertSchema(packages).omit({
  id: true,
  createdAt: true,
});

export const insertHotelSchema = createInsertSchema(hotels).omit({
  id: true,
  createdAt: true,
});

export const insertRoomTypeSchema = createInsertSchema(roomTypes).omit({
  id: true,
  createdAt: true,
});

export const insertTransferOptionSchema = createInsertSchema(transferOptions).omit({
  id: true,
  createdAt: true,
});

export const insertTourSchema = createInsertSchema(tours).omit({
  id: true,
  createdAt: true,
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertFAQSchema = createInsertSchema(faqs).omit({
  id: true,
  createdAt: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
});

export const insertPartnerSchema = createInsertSchema(partners).omit({
  id: true,
  createdAt: true,
});

// Types
export type Package = typeof packages.$inferSelect;
export type InsertPackage = z.infer<typeof insertPackageSchema>;

export type Hotel = typeof hotels.$inferSelect;
export type InsertHotel = z.infer<typeof insertHotelSchema>;

export type RoomType = typeof roomTypes.$inferSelect;
export type InsertRoomType = z.infer<typeof insertRoomTypeSchema>;

export type TransferOption = typeof transferOptions.$inferSelect;
export type InsertTransferOption = z.infer<typeof insertTransferOptionSchema>;

export type Tour = typeof tours.$inferSelect;
export type InsertTour = z.infer<typeof insertTourSchema>;

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;

export type FAQ = typeof faqs.$inferSelect;
export type InsertFAQ = z.infer<typeof insertFAQSchema>;

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;

export type Partner = typeof partners.$inferSelect;
export type InsertPartner = z.infer<typeof insertPartnerSchema>;
