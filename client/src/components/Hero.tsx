import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-navy via-afiia-blue to-teal text-white">
      {/* Cape Town Table Mountain background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1580060839134-75a5edca2e99?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1000')"
        }}
      ></div>
      
      <div className="relative container mx-auto px-4 lg:px-8 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Event Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium inline-flex items-center" data-testid="pill-date">
              <Calendar className="mr-2 h-4 w-4" />
              25–29 May 2026
            </span>
            <span className="bg-gold/90 px-4 py-2 rounded-full text-sm font-medium text-navy inline-flex items-center" data-testid="pill-location">
              <MapPin className="mr-2 h-4 w-4" />
              Cape Town
            </span>
          </div>
          
          {/* Main Heading */}
          <h1 className="font-heading font-bold text-4xl lg:text-6xl xl:text-7xl mb-6 leading-tight" data-testid="heading-main">
            AFIIA 2026 Travel,<br />
            <span className="text-gold">Sorted.</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl lg:text-2xl mb-12 text-white/90 max-w-2xl mx-auto" data-testid="text-subheading">
            Bringing professionals together, one journey at a time.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" data-testid="button-book-now">
              <Button className="btn-accent text-lg px-8 py-4">
                Book Now
              </Button>
            </Link>
            <Link href="/packages" data-testid="button-view-packages">
              <Button className="btn-secondary text-lg px-8 py-4">
                View Packages
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
