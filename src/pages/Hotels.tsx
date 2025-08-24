import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Filter, Star, MapPin, Wifi, Car, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import HotelCard from "@/components/hotel-card";
import type { Hotel } from "@shared/schema";

export default function Hotels() {
  const [filters, setFilters] = useState({
    starRating: "",
    priceRange: "",
    distance: "",
    amenities: [] as string[],
  });

  const { data: hotels, isLoading } = useQuery<Hotel[]>({
    queryKey: ["/api/hotels"],
  });

  const filteredHotels = hotels?.filter(hotel => {
    if (filters.starRating && hotel.starRating.toString() !== filters.starRating) return false;
    return true;
  }) || [];

  const handleAmenityToggle = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const clearFilters = () => {
    setFilters({
      starRating: "",
      priceRange: "",
      distance: "",
      amenities: [],
    });
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading font-semibold text-lg text-navy mb-4">Star Rating</h3>
        <Select value={filters.starRating} onValueChange={(value) => setFilters(prev => ({ ...prev, starRating: value }))}>
          <SelectTrigger data-testid="select-star-rating">
            <SelectValue placeholder="Any rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any rating</SelectItem>
            <SelectItem value="5">5 Stars</SelectItem>
            <SelectItem value="4">4 Stars</SelectItem>
            <SelectItem value="3">3 Stars</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="font-heading font-semibold text-lg text-navy mb-4">Distance to Venue</h3>
        <Select value={filters.distance} onValueChange={(value) => setFilters(prev => ({ ...prev, distance: value }))}>
          <SelectTrigger data-testid="select-distance">
            <SelectValue placeholder="Any distance" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any distance</SelectItem>
            <SelectItem value="walk">Walking distance</SelectItem>
            <SelectItem value="shuttle">Shuttle service</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="font-heading font-semibold text-lg text-navy mb-4">Price Range</h3>
        <Select value={filters.priceRange} onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}>
          <SelectTrigger data-testid="select-price-range">
            <SelectValue placeholder="Any price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any price</SelectItem>
            <SelectItem value="budget">Under $200/night</SelectItem>
            <SelectItem value="mid">$200-300/night</SelectItem>
            <SelectItem value="luxury">Over $300/night</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="font-heading font-semibold text-lg text-navy mb-4">Amenities</h3>
        <div className="space-y-3">
          {["Free WiFi", "Pool", "Restaurant", "Gym", "Spa", "Parking"].map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                 id={amenity}
                 checked={filters.amenities.includes(amenity)}
                 onCheckedChange={() => handleAmenityToggle(amenity)}
                 data-testid={`checkbox-${amenity?.toLowerCase().replace(/\s+/g, '-') || ''}`}
                />

              <label htmlFor={amenity} className="text-slate cursor-pointer">
                {amenity}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Button 
        variant="outline" 
        onClick={clearFilters} 
        className="w-full"
        data-testid="button-clear-filters"
      >
        Clear All Filters
      </Button>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-mist">
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-slate/20 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-slate/20 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mist">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy to-afiia-blue text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading font-bold text-4xl lg:text-6xl mb-6" data-testid="heading-hotels">
              Hotels Near AFIIA 2026 Venue
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white/90">
              Carefully selected accommodations within easy reach of the conference center
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                All within 15 minutes of venue
              </div>
              <div className="bg-gold text-navy px-4 py-2 rounded-full text-sm">
                Professional-grade amenities
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <Card className="card-base p-6 sticky top-24">
              <div className="flex items-center mb-6">
                <Filter className="h-5 w-5 text-teal mr-2" />
                <h2 className="font-heading font-semibold text-lg text-navy">Filters</h2>
              </div>
              <FilterContent />
            </Card>
          </div>

          {/* Mobile Filter Sheet */}
          <div className="lg:hidden fixed top-24 right-4 z-10">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="btn-primary" data-testid="button-mobile-filters">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="mt-8">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Hotel List */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="font-heading font-semibold text-2xl text-navy mb-2">
                  Available Hotels ({filteredHotels.length})
                </h2>
                <p className="text-slate">
                  All properties verified for professional travelers
                </p>
              </div>
              
              <Select defaultValue="recommended">
                <SelectTrigger className="w-48" data-testid="select-sort">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="distance">Distance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Guest Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {filteredHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>

            {filteredHotels.length === 0 && (
              <Card className="card-base p-12 text-center">
                <h3 className="font-heading font-semibold text-xl text-navy mb-4">No hotels match your criteria</h3>
                <p className="text-slate mb-6">Try adjusting your filters to see more options</p>
                <Button onClick={clearFilters} className="btn-primary" data-testid="button-clear-filters-empty">
                  Clear Filters
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Hotel Benefits */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-4">
              Why Book Hotels Through 2Gether?
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              Professional benefits designed for conference delegates
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: "Prime Locations",
                description: "All hotels within 15 minutes of the conference venue with reliable transport links"
              },
              {
                icon: Star,
                title: "Verified Quality",
                description: "Every property personally inspected and approved for professional travelers"
              },
              {
                icon: Coffee,
                title: "Business Amenities",
                description: "WiFi, business centers, and meeting spaces available at all properties"
              }
            ].map((benefit, index) => (
              <Card key={index} className="card-base p-8 text-center" data-testid={`benefit-${index}`}>
                <div className="w-16 h-16 bg-gradient-to-br from-teal to-gold rounded-card mx-auto mb-6 flex items-center justify-center">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-navy mb-4">{benefit.title}</h3>
                <p className="text-slate">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
