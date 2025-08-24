import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Wifi, Waves, Car, Utensils, Dumbbell, Coffee, Bell } from "lucide-react";
import { Link } from "wouter";
import { trackEvent } from "@/lib/analytics";
import { useHotels } from "@/hooks/use-booking";

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

  const handleReserveClick = (hotelName: string) => {
    trackEvent(
  'click_reserve_room',
  'hotels',
  `reserve_${hotelName?.toLowerCase().replace(/\s+/g, '_') || ""}`
);


  const handleViewAllClick = () => {
    trackEvent('click_view_all_hotels', 'hotels', 'view_all_hotels');
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

  if (isLoading) {
    return (
      <section className="py-16 lg:py-24 bg-mist" data-testid="section-hotels-loading">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
            <div>
              <div className="h-8 bg-gray-200 rounded w-64 mb-4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-96 animate-pulse"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded w-32 mt-6 lg:mt-0 animate-pulse"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
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
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-mist" data-testid="section-hotels">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
          <div>
            <h2 
              className="font-inter font-bold text-3xl lg:text-4xl text-navy mb-4"
              data-testid="text-hotels-title"
            >
              Hotels Near the Venue
            </h2>
            <p 
              className="text-slate text-lg"
              data-testid="text-hotels-subtitle"
            >
              Handpicked accommodations within walking distance of the conference center
            </p>
          </div>
          <Link href="/hotels">
            <Button
              className="btn-primary mt-6 lg:mt-0"
              onClick={handleViewAllClick}
              data-testid="button-view-all-hotels"
            >
              View All Hotels
            </Button>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels?.slice(0, 3).map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-card shadow-soft overflow-hidden hover:shadow-lg transition-shadow"
              data-testid={`card-hotel-${hotel.id}`}
            >
              <img
                src={hotel.images[0]}
                alt={`${hotel.name} interior`}
                className="w-full h-48 object-cover"
                data-testid={`img-hotel-${hotel.id}`}
              />
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 
                    className="font-inter font-semibold text-lg text-navy"
                    data-testid={`text-hotel-name-${hotel.id}`}
                  >
                    {hotel.name}
                  </h3>
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
                
                <div className="flex items-center mb-4">
                  <div className="flex mr-2">
                    {renderStars(hotel.stars)}
                  </div>
                  <span 
                    className="text-slate text-sm"
                    data-testid={`text-hotel-rating-${hotel.id}`}
                  >
                    {formatRating(hotel.rating)} ({hotel.reviewCount} reviews)
                  </span>
                </div>
                
                <div className="flex items-center text-slate text-sm mb-4 space-x-4 flex-wrap">
                  {hotel.amenities.slice(0, 3).map((amenity, index) => (
                    <span 
                      key={index} 
                      className="flex items-center whitespace-nowrap"
                      data-testid={`text-hotel-amenity-${hotel.id}-${index}`}
                    >
                      {getAmenityIcon(amenity)}
                      {amenity}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div data-testid={`text-hotel-price-${hotel.id}`}>
                    <span className="text-2xl font-bold text-navy">
                      {formatPrice(hotel.pricePerNight)}
                    </span>
                    <span className="text-slate">/night</span>
                  </div>
                  <Link href={`/booking?hotel=${hotel.id}`}>
                    <Button
                      className={`transition-colors ${
                        hotel.distanceToVenue.includes('walk')
                          ? 'btn-secondary'
                          : 'btn-primary'
                      }`}
                      onClick={() => handleReserveClick(hotel.name)}
                      data-testid={`button-reserve-hotel-${hotel.id}`}
                    >
                      Reserve
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
