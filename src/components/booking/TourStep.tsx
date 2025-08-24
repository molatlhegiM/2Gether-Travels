import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Camera, Ship, Wine, Utensils, ArrowLeft, Plus, Minus } from "lucide-react";
import { useTours } from "@/hooks/use-booking";
import { useBookingStore } from "@/lib/booking";
import { trackEvent } from "@/lib/analytics";

const categoryColors = {
  heritage: "bg-afiia-green text-white",
  wine: "bg-gold text-navy",
  nature: "bg-teal text-white",
  family: "bg-navy text-white"
};

const featureIcons = {
  "Photography": Camera,
  "Ferry included": Ship,
  "Wine tasting": Wine,
  "Lunch included": Utensils,
  "Transport included": Users,
  "Professional guide": Users,
  "Historical guide": Users
};

export default function TourStep() {
  const { data: tours, isLoading } = useTours();
  const { tourIds, addTour, removeTour, nextStep, previousStep } = useBookingStore();

  const handleTourToggle = (tourId: string, tourName: string, isAdding: boolean) => {
  const safeTourName = tourName?.toLowerCase().replace(/\s+/g, '_') || '';
  
  if (isAdding) {
    addTour(tourId);
    trackEvent('add_tour', 'booking', `tour_${safeTourName}`);
  } else {
    removeTour(tourId);
    trackEvent('remove_tour', 'booking', `tour_${safeTourName}`);
  }
};


  const formatPrice = (price: number) => {
    return `$${(price / 100).toLocaleString()}`;
  };

  const getFeatureIcon = (feature: string) => {
    const IconComponent = featureIcons[feature as keyof typeof featureIcons];
    return IconComponent ? <IconComponent className="h-4 w-4 mr-1" /> : null;
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-card shadow-soft p-8" data-testid="tour-step-loading">
        <div className="flex items-center justify-between mb-8">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border rounded-card overflow-hidden animate-pulse">
              <div className="w-full h-40 bg-gray-200"></div>
              <div className="p-6">
                <div className="h-6 bg-gray-200 rounded w-32 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-card shadow-soft p-8" data-testid="tour-step">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-inter font-bold text-2xl text-navy mb-2" data-testid="text-tour-step-title">
            Add Tours to Your Itinerary
          </h2>
          <p className="text-slate">Select tours to enhance your networking opportunities (optional)</p>
        </div>
        <Button
          variant="outline"
          onClick={previousStep}
          className="inline-flex items-center"
          data-testid="button-tour-step-back"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {tours?.map((tour) => {
          const isSelected = tourIds.includes(tour.id);
          return (
            <div
              key={tour.id}
              className={`border-2 rounded-card overflow-hidden transition-all ${
                isSelected
                  ? 'border-teal bg-teal/5'
                  : 'border-gray-200 hover:border-teal/30'
              }`}
              data-testid={`card-tour-${tour.id}`}
            >
              <img
                src={tour.images[0]}
                alt={`${tour.name} tour experience`}
                className="w-full h-40 object-cover"
              />
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge 
                    className={`px-3 py-1 text-sm font-medium ${
                      categoryColors[tour.category as keyof typeof categoryColors]
                    }`}
                  >
                    {tour.category.charAt(0).toUpperCase() + tour.category.slice(1)}
                  </Badge>
                  {tour.isNetworkingFriendly && (
                    <span className="text-teal text-sm font-medium flex items-center">
                      <Users className="mr-1 h-4 w-4" />
                      Networking
                    </span>
                  )}
                </div>
                
                <h3 className="font-inter font-semibold text-lg text-navy mb-3">
                  {tour.name}
                </h3>
                
                <p className="text-slate text-sm mb-4 line-clamp-2">
                  {tour.description}
                </p>
                
                <div className="flex items-center text-slate text-sm mb-4 space-x-3 flex-wrap">
                  <span className="flex items-center whitespace-nowrap">
                    <Clock className="mr-1 h-4 w-4" />
                    {tour.duration}
                  </span>
                  <span className="flex items-center whitespace-nowrap">
                    <Users className="mr-1 h-4 w-4" />
                    Max {tour.capacity}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-navy">
                      {formatPrice(tour.price)}
                    </span>
                    <span className="text-slate text-sm">/person</span>
                  </div>
                  <Button
                    variant={isSelected ? "destructive" : "default"}
                    className={`inline-flex items-center transition-colors ${
                      isSelected 
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-teal hover:bg-navy text-white'
                    }`}
                    onClick={() => handleTourToggle(tour.id, tour.name, !isSelected)}
                  >
                    {isSelected ? (
                      <>
                        <Minus className="mr-2 h-4 w-4" />
                        Remove
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Tour
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Continue Button */}
      <div className="flex justify-between items-center pt-6 border-t">
        <p className="text-slate">
          {tourIds.length === 0 
            ? "No tours selected. You can continue without adding tours."
            : `${tourIds.length} tour${tourIds.length === 1 ? '' : 's'} selected.`
          }
        </p>
        <Button
          onClick={nextStep}
          className="btn-primary"
          data-testid="button-tour-step-continue"
        >
          Continue to Details
        </Button>
      </div>
    </div>
  );
}
