import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Wifi, Waves, Car, Utensils, Dumbbell, Coffee, Bell, MapPin, Filter } from "lucide-react";
import { Link } from "wouter";
import { useHotels } from "@/hooks/use-booking";
import { trackEvent } from "@/lib/analytics";

const amenityIcons = {
  "Free WiFi": Wifi,
  "Pool": Waves,
  "Parking": Car,
  "Restaurant": Utensils,
  "Gym": Dumbbell,
  "Café": Coffee,
  "Concierge": Bell,
  "Spa": Star,
  "Business Center": Bell,
  "Meeting Rooms": Bell
};

export default function Hotels() {
  const { data: hotels, isLoading } = useHotels();
  const [filters, setFilters] = useState({
    stars: "",
    maxPrice: "",
    amenity: "",
    distance: ""
  });

  const handleReserveClick = (hotelId: string, hotelName: string) => {
    trackEvent('select_hotel', 'hotels', `hotel_${hotelName.toLowerCase().replace(/\s+/g, '_')}`);
  };

  const formatPrice = (price: number) => {
    return `$${(price / 100).toLocaleString()}`;
  };

  const formatRating = (rating: number) => {
    return (rating / 10).toFixed(1);
  };

  const renderStars = (stars: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < stars ? 'text-gold fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getAmenityIcon = (amenity: string) => {
    const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons];
    return IconComponent ? <IconComponent className="h-4 w-4 mr-1" /> : null;
  };

  const filteredHotels = hotels?.filter((hotel) => {
    if (filters.stars && hotel.stars !== parseInt(filters.stars)) return false;
    if (filters.maxPrice && hotel.pricePerNight > parseInt(filters.maxPrice) * 100) return false;
    if (filters.amenity && !hotel.amenities.includes(filters.amenity)) return false;
    if (filters.distance === "walking" && !hotel.distanceToVenue.includes("walk")) return false;
    if (filters.distance === "shuttle" && !hotel.distanceToVenue.includes("shuttle")) return false;
    return true;
  });

  return (
    <div className="min-h-screen" data-testid="page-hotels">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-primary text-white py-20 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-gold text-navy px-4 py-2 mb-6 text-sm font-medium">
              AFIIA 2026 Hotels
            </Badge>
            <h1 className="font-inter font-bold text-4xl lg:text-6xl mb-6" data-testid="text-hotels-hero-title">
              Stay Near the <span className="text-gold">Conference</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white/90 max-w-3xl mx-auto" data-testid="text-hotels-hero-subtitle">
              Carefully selected accommodations within walking distance or quick shuttle ride 
              from the AFIIA 2026 conference venue in Cape Town.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-mist border-b">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center space-x-4 overflow-x-auto">
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <Filter className="h-5 w-5 text-navy" />
              <span className="font-medium text-navy">Filters:</span>
            </div>
            
            <Select value={filters.stars} onValueChange={(value) => setFilters(prev => ({ ...prev, stars: value }))}>
              <SelectTrigger className="w-32" data-testid="filter-stars">
                <SelectValue placeholder="Stars" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.maxPrice} onValueChange={(value) => setFilters(prev => ({ ...prev, maxPrice: value }))}>
              <SelectTrigger className="w-40" data-testid="filter-price">
                <SelectValue placeholder="Max Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Price</SelectItem>
                <SelectItem value="150">Under $150</SelectItem>
                <SelectItem value="200">Under $200</SelectItem>
                <SelectItem value="300">Under $300</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.distance} onValueChange={(value) => setFilters(prev => ({ ...prev, distance: value }))}>
              <SelectTrigger className="w-40" data-testid="filter-distance">
                <SelectValue placeholder="Distance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Distance</SelectItem>
                <SelectItem value="walking">Walking Distance</SelectItem>
                <SelectItem value="shuttle">Shuttle Service</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.amenity} onValueChange={(value) => setFilters(prev => ({ ...prev, amenity: value }))}>
              <SelectTrigger className="w-40" data-testid="filter-amenity">
                <SelectValue placeholder="Amenities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Amenities</SelectItem>
                <SelectItem value="Free WiFi">Free WiFi</SelectItem>
                <SelectItem value="Pool">Pool</SelectItem>
                <SelectItem value="Gym">Gym</SelectItem>
                <SelectItem value="Restaurant">Restaurant</SelectItem>
                <SelectItem value="Spa">Spa</SelectItem>
              </SelectContent>
            </Select>

            {(filters.stars || filters.maxPrice || filters.amenity || filters.distance) && (
              <Button
                variant="outline"
                onClick={() => setFilters({ stars: "", maxPrice: "", amenity: "", distance: "" })}
                className="whitespace-nowrap"
                data-testid="button-clear-filters"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Hotels Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-card shadow-soft overflow-hidden animate-pulse">
                  <div className="w-full h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                      <div className="h-8 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredHotels && filteredHotels.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredHotels.map((hotel) => (
                <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow" data-testid={`card-hotel-${hotel.id}`}>
                  <div className="relative">
                    <img
                      src={hotel.images[0]}
                      alt={`${hotel.name} interior`}
                      className="w-full h-48 object-cover"
                      data-testid={`img-hotel-${hotel.id}`}
                    />
                    <div className="absolute top-4 right-4">
                      <Badge 
                        className={`px-2 py-1 text-xs font-medium ${
                          hotel.distanceToVenue.includes('walk') 
                            ? 'bg-teal text-white' 
                            : 'bg-gold text-navy'
                        }`}
                        data-testid={`badge-hotel-distance-${hotel.id}`}
                      >
                        {hotel.distanceToVenue}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="font-inter font-semibold text-lg text-navy mb-2" data-testid={`text-hotel-name-${hotel.id}`}>
                        {hotel.name}
                      </h3>
                      <p className="text-slate text-sm mb-3">{hotel.description}</p>
                    </div>
                    
                    <div className="flex items-center mb-4">
                      <div className="flex mr-2">
                        {renderStars(hotel.stars)}
                      </div>
                      <span className="text-slate text-sm" data-testid={`text-hotel-rating-${hotel.id}`}>
                        {formatRating(hotel.rating)} ({hotel.reviewCount} reviews)
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {hotel.amenities.slice(0, 4).map((amenity, index) => (
                        <div 
                          key={index}
                          className="flex items-center bg-mist px-2 py-1 rounded text-xs text-slate"
                          data-testid={`text-hotel-amenity-${hotel.id}-${index}`}
                        >
                          {getAmenityIcon(amenity)}
                          {amenity}
                        </div>
                      ))}
                      {hotel.amenities.length > 4 && (
                        <div className="bg-mist px-2 py-1 rounded text-xs text-slate">
                          +{hotel.amenities.length - 4} more
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div data-testid={`text-hotel-price-${hotel.id}`}>
                        <span className="text-2xl font-bold text-navy">
                          {formatPrice(hotel.pricePerNight)}
                        </span>
                        <span className="text-slate text-sm">/night</span>
                      </div>
                      <Link href={`/booking?hotel=${hotel.id}`}>
                        <Button
                          className="btn-primary"
                          onClick={() => handleReserveClick(hotel.id, hotel.name)}
                          data-testid={`button-reserve-hotel-${hotel.id}`}
                        >
                          Reserve Room
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <MapPin className="h-16 w-16 text-slate mx-auto mb-4" />
              <h3 className="font-inter font-semibold text-xl text-navy mb-2">No Hotels Found</h3>
              <p className="text-slate mb-4">Try adjusting your filters to see more options.</p>
              <Button
                variant="outline"
                onClick={() => setFilters({ stars: "", maxPrice: "", amenity: "", distance: "" })}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose These Hotels */}
      <section className="py-16 lg:py-24 bg-mist">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-inter font-bold text-3xl lg:text-4xl text-navy mb-6" data-testid="text-why-these-hotels-title">
              Why These Hotels?
            </h2>
            <p className="text-slate text-lg mb-12">
              Every accommodation has been personally vetted by our team to ensure they meet 
              the high standards expected by professional conference delegates.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-navy to-teal rounded-card mx-auto mb-6 flex items-center justify-center">
                  <MapPin className="text-white h-8 w-8" />
                </div>
                <h3 className="font-inter font-semibold text-lg text-navy mb-4">Prime Location</h3>
                <p className="text-slate">
                  All hotels are within easy reach of the conference venue, minimizing travel time and maximizing networking opportunities.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-teal to-gold rounded-card mx-auto mb-6 flex items-center justify-center">
                  <Wifi className="text-white h-8 w-8" />
                </div>
                <h3 className="font-inter font-semibold text-lg text-navy mb-4">Business Ready</h3>
                <p className="text-slate">
                  All properties feature reliable WiFi, business centers, and quiet spaces perfect for preparation and follow-up work.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gold to-navy rounded-card mx-auto mb-6 flex items-center justify-center">
                  <Star className="text-white h-8 w-8" />
                </div>
                <h3 className="font-inter font-semibold text-lg text-navy mb-4">Quality Assured</h3>
                <p className="text-slate">
                  Each hotel maintains high service standards with proven track records hosting international business travelers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileCTA />
    </div>
  );
}
