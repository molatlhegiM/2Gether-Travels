# AFIIA 2026 Travel Booking Platform

## Overview

This is a comprehensive travel booking platform specifically designed for the AFIIA 2026 conference in Cape Town. The application facilitates complete travel package bookings including accommodations, transfers, tours, and concierge services for professional auditors and finance professionals attending the conference.

The platform features a multi-step booking wizard, real-time package customization, WhatsApp integration for customer support, and comprehensive travel management capabilities tailored to the unique needs of conference delegates.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: Zustand with persistence for booking state and user selections
- **UI Components**: Shadcn/ui with Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with custom design tokens for consistent branding
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js as the web framework
- **Language**: TypeScript throughout for type consistency
- **Database ORM**: Drizzle ORM for type-safe database operations
- **API Design**: RESTful API following conventional HTTP methods and status codes
- **Session Management**: In-memory storage with planned database persistence
- **File Structure**: Shared schema definitions between client and server

### Data Storage Solutions
- **Database**: PostgreSQL configured via Drizzle with Neon Database serverless connection
- **Schema**: Comprehensive relational schema covering packages, hotels, room types, transfers, tours, bookings, FAQs, testimonials, and partners
- **Migrations**: Drizzle Kit for schema migrations and database management
- **Development Storage**: In-memory mock storage with interface for easy database integration

### Authentication and Authorization
- **Current Implementation**: No authentication system (booking-centric application)
- **Session Management**: Client-side booking state persistence with Zustand
- **Future Considerations**: Corporate authentication for business bookings and admin access

### Key Design Patterns
- **Component Architecture**: Modular component design with clear separation of concerns
- **Data Flow**: Unidirectional data flow with React Query for server state management
- **Type Safety**: End-to-end TypeScript with shared schema types
- **Responsive Design**: Mobile-first approach with progressive enhancement
- **Analytics Integration**: Event tracking throughout user journey for optimization

## External Dependencies

### Core Dependencies
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm**: Type-safe database operations and query building
- **@neondatabase/serverless**: PostgreSQL serverless database connection
- **wouter**: Lightweight React router for client-side navigation
- **zustand**: State management for booking flow and user preferences

### UI and Styling
- **@radix-ui/react-***: Accessible UI primitives for complex components
- **tailwindcss**: Utility-first CSS framework with custom design system
- **class-variance-authority**: Component variant management
- **lucide-react**: Consistent icon system throughout the application

### Development and Build Tools
- **vite**: Fast build tool with hot module replacement
- **@vitejs/plugin-react**: React integration for Vite
- **typescript**: Type checking and enhanced developer experience
- **esbuild**: Fast JavaScript bundler for production builds

### Planned Integrations
- **Payment Processing**: Stripe or similar for secure payment handling
- **WhatsApp Business API**: Customer support and booking assistance
- **Google Analytics**: User behavior tracking and conversion optimization
- **Email Services**: Booking confirmations and travel updates
- **Travel Insurance APIs**: Integration with travel protection services