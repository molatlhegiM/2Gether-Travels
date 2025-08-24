import { Star, Wifi, Car, Coffee, Dumbbell, Utensils, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Hotel } from "@shared/schema";
import { useBookingStore } from "@/lib/booking-store";
import { useLocation } from "wouter";

interface HotelCardProps {
  hotel?: Hotel; // Made optional with safe default
  className?: string;
}

export default function HotelCard({ hotel, className = "" }: HotelCardProps) {
  const { setHotel, setCurrentStep } = useBookingStore();
  const [, setLocation] = useLocation();

  // Safe default if hotel is undefined
  if (!hotel) {
    return null;
  }

  const handleReserve = () => {
    setHotel(hotel.id);
    setCurrentStep(2);
    setLocation("/booking");
  };

  const formatPrice = () => {
    // In a real app, this would come from room types
    const basePrice = hotel.starRating * 50 + Math.floor(Math.random() * 100) + 140;
    return `$${basePrice}`;
  };

  const getAmenityIcon = (amenity: string) => {
    const icons: Record<string, any> = {
      "Free WiFi": Wifi,
      "Pool": Waves,
      "Restaurant": Utensils,
      "Gym": Dumbbell,
      "Parking": Car,
      "CafÃ©": Coffee,
      "Valet Parking": Car,
      "Business Center": Coffee,
      "Spa": Waves,
      "Concierge": Coffee,
      "Rooftop Terrace": Coffee,
    };
    
    const IconComponent = icons[amenity] || Coffee;
    return <IconComponent className="h-3 w-3" />;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-gold fill-current' : 'text-slate'}`}
      />
    ));
  };

  const getDistanceBadgeColor = (distance?: string) => {
    if (!distance) return "bg-slate";
    if (distance.includes("walk")) return "bg-teal text-white";
    if (distance.includes("shuttle")) return "bg-gold text-navy";
    return "bg-slate";
  };

  return (
    <Card className={`card-base overflow-hidden ${className}`} data-testid={`card-hotel-${hotel.id}`}>
      {hotel.imageUrl && (
        <img 
          src={hotel.imageUrl} 
          alt={hotel.name}
          className="w-full h-48 object-cover" 
          data-testid={`img-hotel-${hotel.id}`}
        />
      )}
      
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-lg text-navy" data-testid={`heading-${hotel.id}`}>
            {hotel.name}
          </h3>
          {hotel.distanceToVenue && (
            <Badge className={`px-2 py-1 rounded text-xs font-medium ${getDistanceBadgeColor(hotel.distanceToVenue)}`} data-testid={`badge-distance-${hotel.id}`}>
              {hotel.distanceToVenue}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center mb-4">
          <div className="flex mr-2">
            {renderStars(hotel.starRating)}
          </div>
          {hotel.rating && (
            <span className="text-slate text-sm" data-testid={`rating-${hotel.id}`}>
              {hotel.rating} ({hotel.reviewCount} reviews)
            </span>
          )}
        </div>
        
        <div className="flex flex-wrap items-center text-slate text-sm mb-4 gap-x-4 gap-y-2">
          {hotel.amenities?.slice(0, 3).map((amenity, index) => (
            <span key={index} className="flex items-center" data-testid={`amenity-${hotel.id}-${index}`}>
              {getAmenityIcon(amenity)}
              <span className="ml-1">{amenity}</span>
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-navy" data-testid={`price-${hotel.id}`}>
              {formatPrice()}
            </span>
            <span className="text-slate">/night</span>
          </div>
          <Button
            className="btn-primary px-4 py-2"
            onClick={handleReserve}
            data-testid={`button-reserve-${hotel.id}`}
          >
            Reserve
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}