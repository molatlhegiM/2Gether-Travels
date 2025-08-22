import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Wifi, Waves, Car, Utensils, Dumbbell, Coffee, Bell, ArrowLeft } from "lucide-react";
import { useHotels } from "@/hooks/use-booking";
import { useBookingStore } from "@/lib/booking";
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

export default function HotelStep() {
  const { data: hotels, isLoading } = useHotels();
  const { hotelId, setHotel, nextStep, previousStep } = useBookingStore();

  const handleHotelSelect = (hotelIdParam: string, hotelName: string) => {
    setHotel(hotelIdParam);
    trackEvent('select_hotel', 'booking', `hotel_${hotelName.toLowerCase().replace(/\s+/g, '_')}`);
    nextStep();
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
      <div className="bg-white rounded-card shadow-soft p-8" data-testid="hotel-step-loading">
        <div className="flex items-center justify-between mb-8">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border rounded-card p-6 animate-pulse">
              <div className="h-40 bg-gray-200 rounded mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-card shadow-soft p-8" data-testid="hotel-step">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-inter font-bold text-2xl text-navy" data-testid="text-hotel-step-title">
          Select Your Hotel
        </h2>
        <Button
          variant="outline"
          onClick={previousStep}
          className="inline-flex items-center"
          data-testid="button-hotel-step-back"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {hotels?.map((hotel) => (
          <div
            key={hotel.id}
            className={`border-2 rounded-card overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
              hotelId === hotel.id
                ? 'border-gold bg-gold/5'
                : 'border-gray-200 hover:border-teal/30'
            }`}
            onClick={() => handleHotelSelect(hotel.id, hotel.name)}
            data-testid={`card-hotel-${hotel.id}`}
          >
            <img
              src={hotel.images[0]}
              alt={`${hotel.name} interior`}
              className="w-full h-40 object-cover"
            />
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-inter font-semibold text-lg text-navy">
                  {hotel.name}
                </h3>
                <Badge 
                  className={`px-2 py-1 text-xs font-medium ${
                    hotel.distanceToVenue.includes('walk') 
                      ? 'bg-teal text-white' 
                      : 'bg-gold text-navy'
                  }`}
                >
                  {hotel.distanceToVenue}
                </Badge>
              </div>
              
              <div className="flex items-center mb-3">
                <div className="flex mr-2">
                  {renderStars(hotel.stars)}
                </div>
                <span className="text-slate text-sm">
                  {formatRating(hotel.rating)} ({hotel.reviewCount} reviews)
                </span>
              </div>
              
              <div className="flex items-center text-slate text-xs mb-4 space-x-3 flex-wrap">
                {hotel.amenities.slice(0, 3).map((amenity, index) => (
                  <span key={index} className="flex items-center whitespace-nowrap">
                    {getAmenityIcon(amenity)}
                    {amenity}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xl font-bold text-navy">
                    {formatPrice(hotel.pricePerNight)}
                  </span>
                  <span className="text-slate text-sm">/night</span>
                </div>
                <Button
                  className={`transition-colors ${
                    hotelId === hotel.id
                      ? 'bg-teal text-white'
                      : 'btn-secondary'
                  }`}
                >
                  {hotelId === hotel.id ? 'Selected' : 'Select'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
