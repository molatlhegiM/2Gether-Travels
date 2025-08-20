import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertBookingSchema,
  insertPackageSchema, 
  insertHotelSchema,
  insertTourSchema,
  insertTransferOptionSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // GET endpoints
  app.get("/api/packages", async (req, res) => {
    try {
      const packages = await storage.getPackages();
      res.json(packages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch packages" });
    }
  });

app.get("/api/packages/:id", async (req, res) => {
  try {
    const pkg = await storage.getPackage(req.params.id);
    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.json(pkg);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch package" });
  }
});

  app.get("/api/hotels", async (req, res) => {
    try {
      const hotels = await storage.getHotels();
      res.json(hotels);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch hotels" });
    }
  });

  app.get("/api/hotels/:id", async (req, res) => {
    try {
      const hotel = await storage.getHotel(req.params.id);
      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }
      res.json(hotel);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch hotel" });
    }
  });

  app.get("/api/transfers", async (req, res) => {
    try {
      const transfers = await storage.getTransferOptions();
      res.json(transfers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch transfer options" });
    }
  });

  app.get("/api/tours", async (req, res) => {
    try {
      const { category } = req.query;
      const tours = category 
        ? await storage.getToursByCategory(category as string)
        : await storage.getTours();
      res.json(tours);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tours" });
    }
  });

  app.get("/api/faqs", async (req, res) => {
    try {
      const faqs = await storage.getFAQs();
      res.json(faqs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch FAQs" });
    }
  });

  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  app.get("/api/bookings/:id", async (req, res) => {
    try {
      const booking = await storage.getBooking(req.params.id);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch booking" });
    }
  });

  // POST endpoints
  app.post("/api/bookings", async (req, res) => {
    try {
      const validationResult = insertBookingSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid booking data", 
          errors: validationResult.error.errors 
        });
      }

      const booking = await storage.createBooking(validationResult.data);
      res.status(201).json(booking);
    } catch (error) {
      console.error("Booking creation error:", error);
      res.status(500).json({ message: "Failed to create booking" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const contactSchema = z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Valid email is required"),
        country: z.string().min(1, "Country is required"),
        topic: z.string().min(1, "Topic is required"),
        message: z.string().min(10, "Message must be at least 10 characters"),
      });

      const validationResult = contactSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid contact form data", 
          errors: validationResult.error.errors 
        });
      }

      // In a real implementation, this would send an email
      console.log("Contact form submission:", validationResult.data);
      
      res.json({ message: "Contact form submitted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to process contact form" });
    }
  });

  app.post("/api/newsletter", async (req, res) => {
    try {
      const newsletterSchema = z.object({
        email: z.string().email("Valid email is required"),
      });

      const validationResult = newsletterSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid email address", 
          errors: validationResult.error.errors 
        });
      }

      // In a real implementation, this would add to mailing list
      console.log("Newsletter subscription:", validationResult.data);
      
      res.json({ message: "Successfully subscribed to newsletter" });
    } catch (error) {
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });

  // WhatsApp integration endpoint
  app.get("/api/whatsapp-url", (req, res) => {
    const { message = "Hello! I need assistance with AFIIA 2026 travel booking." } = req.query;
    const phoneNumber = process.env.WHATSAPP_BUSINESS_NUMBER || "+27211234567";
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message as string)}`;
    
    res.json({ url: whatsappUrl });
  });

  const httpServer = createServer(app);
  return httpServer;
}
