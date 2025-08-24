import { Clock, Users, Camera, Badge as BadgeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Tour } from "@shared/schema";
import { useBookingStore } from "@/lib/booking-store";

interface TourCardProps {
  tour?: Tour; // Made optional with safe default
  className?: string;
}

export default function TourCard({ tour, className = "" }: TourCardProps) {
  const { addTour, removeTour, selection } = useBookingStore();
  
  // Safe default if tour is undefined
  if (!tour) {
    return null;
  }
  
  const isSelected = selection.tourIds.includes(tour.id);

  const handleToggleTour = () => {
    if (isSelected) {
      removeTour(tour.id);
    } else {
      addTour(tour.id);
    }
  };

  const formatPrice = (price: string) => {
    return `$${parseFloat(price).toLocaleString()}`;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      heritage: "bg-afiia-green text-white",
      nature: "bg-teal text-white",
      wine: "bg-gold text-navy",
      family: "bg-navy text-white",
    };
    return colors[category] || "bg-slate text-white";
  };

  const getDifficultyColor = (difficulty?: string) => {
    const colors: Record<string, string> = {
      easy: "text-afiia-green",
      moderate: "text-gold",
      challenging: "text-red-500",
    };
    return colors[difficulty || "easy"] || "text-slate";
  };

  return (
    <Card className={`card-base overflow-hidden ${className}`} data-testid={`card-tour-${tour.id}`}>
      {tour.imageUrl && (
        <img 
          src={tour.imageUrl} 
          alt={tour.name}
          className="w-full h-48 object-cover" 
          data-testid={`img-tour-${tour.id}`}
        />
      )}
      
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Badge className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(tour.category)}`} data-testid={`badge-category-${tour.id}`}>
            {tour.category?.charAt(0).toUpperCase() + tour.category?.slice(1)}
          </Badge>
          {tour.networkingSuitability && (
            <span className="text-teal text-sm font-medium flex items-center" data-testid={`badge-networking-${tour.id}`}>
              <Users className="h-4 w-4 mr-1" />
              Networking Ready
            </span>
          )}
        </div>
        
        <h3 className="font-heading font-semibold text-lg text-navy mb-3" data-testid={`heading-${tour.id}`}>
          {tour.name}
        </h3>
        
        <p className="text-slate text-sm mb-4" data-testid={`description-${tour.id}`}>
          {tour.description}
        </p>
        
        <div className="flex items-center text-slate text-sm mb-4 space-x-4">
          <span className="flex items-center" data-testid={`duration-${tour.id}`}>
            <Clock className="h-4 w-4 mr-1" />
            {tour.duration}
          </span>
          <span className="flex items-center" data-testid={`capacity-${tour.id}`}>
            <Users className="h-4 w-4 mr-1" />
            Max {tour.capacity} pax
          </span>
          <span className="flex items-center" data-testid={`difficulty-${tour.id}`}>
            <BadgeIcon className={`h-4 w-4 mr-1 ${getDifficultyColor(tour.difficulty)}`} />
            {tour.difficulty}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-navy" data-testid={`price-${tour.id}`}>
              {formatPrice(tour.price)}
            </span>
            <span className="text-slate">/person</span>
          </div>
          <Button
            className={`px-4 py-2 rounded-card transition-colors font-medium ${
              isSelected 
                ? 'bg-afiia-green hover:bg-afiia-green/90 text-white' 
                : 'bg-teal hover:bg-navy text-white'
            }`}
            onClick={handleToggleTour}
            data-testid={`button-toggle-${tour.id}`}
          >
            {isSelected ? 'Added' : 'Add to Itinerary'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}