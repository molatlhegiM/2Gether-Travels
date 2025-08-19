import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function Hero() {
  const handleBookNowClick = () => {
    trackEvent('click_book_now', 'booking', 'hero_primary_cta');
  };

  const handleViewPackagesClick = () => {
    trackEvent('click_view_packages', 'packages', 'hero_secondary_cta');
  };

  return (
    <section 
      className="relative gradient-primary text-white"
      data-testid="section-hero"
    >
      {/* Cape Town Table Mountain skyline at sunset */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20" 
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1580060839134-75a5edca2e99?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=900')`
        }}
      />
      
      <div className="relative container mx-auto px-4 lg:px-8 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Event Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge 
              variant="secondary" 
              className="bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white border-0"
              data-testid="badge-conference-date"
            >
              <Calendar className="mr-2 h-4 w-4" />
              25–29 May 2026
            </Badge>
            <Badge 
              variant="secondary" 
              className="bg-gold/90 px-4 py-2 text-sm font-medium text-navy border-0"
              data-testid="badge-conference-location"
            >
              <MapPin className="mr-2 h-4 w-4" />
              Cape Town
            </Badge>
          </div>
          
          {/* Main Heading */}
          <h1 
            className="font-inter font-bold text-4xl lg:text-6xl xl:text-7xl mb-6 leading-tight"
            data-testid="text-hero-title"
          >
            AFIIA 2026 Travel,<br />
            <span className="text-gold">Sorted.</span>
          </h1>
          
          {/* Subheading */}
          <p 
            className="text-xl lg:text-2xl mb-12 text-white/90 max-w-2xl mx-auto"
            data-testid="text-hero-subtitle"
          >
            Bringing professionals together, one journey at a time.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button 
                className="btn-secondary text-lg px-8 py-4"
                onClick={handleBookNowClick}
                data-testid="button-book-now-hero"
              >
                Book Now
              </Button>
            </Link>
            <Link href="/packages">
              <Button 
                className="btn-outline text-lg px-8 py-4"
                onClick={handleViewPackagesClick}
                data-testid="button-view-packages-hero"
              >
                View Packages
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
