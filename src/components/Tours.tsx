import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Camera, Ship, Wine, Utensils } from "lucide-react";
import { Link } from "wouter";
import { trackEvent } from "@/lib/analytics";
import { useTours } from "@/hooks/use-booking";

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

export default function Tours() {
  const { data: tours, isLoading } = useTours();

  const handleAddToItinerary = (tourName: string) => {
    trackEvent(
  'click_add_to_itinerary',
  'tours',
  `add_${tourName?.toLowerCase().replace(/\s+/g, '_') || ""}`
);


  const formatPrice = (price: number) => {
    return `$${(price / 100).toLocaleString()}`;
  };

  const getFeatureIcon = (feature: string) => {
    const IconComponent = featureIcons[feature as keyof typeof featureIcons];
    return IconComponent ? <IconComponent className="h-4 w-4 mr-1" /> : null;
  };

  if (isLoading) {
    return (
      <section className="py-16 lg:py-24 bg-mist" data-testid="section-tours-loading">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-card shadow-soft overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="flex justify-between mb-4">
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-32 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                    <div className="h-8 bg-gray-200 rounded w-24"></div>
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
    <section className="py-16 lg:py-24 bg-mist" data-testid="section-tours">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            className="font-inter font-bold text-3xl lg:text-4xl text-navy mb-4"
            data-testid="text-tours-title"
          >
            Signature Tours
          </h2>
          <p 
            className="text-slate text-lg max-w-2xl mx-auto"
            data-testid="text-tours-subtitle"
          >
            Build connections beyond the conference room.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours?.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-card shadow-soft overflow-hidden hover:shadow-lg transition-shadow"
              data-testid={`card-tour-${tour.id}`}
            >
              <img
                src={tour.images[0]}
                alt={`${tour.name} tour experience`}
                className="w-full h-48 object-cover"
                data-testid={`img-tour-${tour.id}`}
              />
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge 
                    className={`px-3 py-1 text-sm font-medium ${
                      categoryColors[tour.category as keyof typeof categoryColors]
                    }`}
                    data-testid={`badge-tour-category-${tour.id}`}
                  >
                    {tour.category.charAt(0).toUpperCase() + tour.category.slice(1)}
                  </Badge>
                  {tour.isNetworkingFriendly && (
                    <span 
                      className="text-teal text-sm font-medium flex items-center"
                      data-testid={`text-tour-networking-${tour.id}`}
                    >
                      <Users className="mr-1 h-4 w-4" />
                      Networking Ready
                    </span>
                  )}
                </div>
                
                <h3 
                  className="font-inter font-semibold text-lg text-navy mb-3"
                  data-testid={`text-tour-name-${tour.id}`}
                >
                  {tour.name}
                </h3>
                
                <p 
                  className="text-slate text-sm mb-4"
                  data-testid={`text-tour-description-${tour.id}`}
                >
                  {tour.description}
                </p>
                
                <div className="flex items-center text-slate text-sm mb-4 space-x-4 flex-wrap">
                  <span 
                    className="flex items-center whitespace-nowrap"
                    data-testid={`text-tour-duration-${tour.id}`}
                  >
                    <Clock className="mr-1 h-4 w-4" />
                    {tour.duration}
                  </span>
                  <span 
                    className="flex items-center whitespace-nowrap"
                    data-testid={`text-tour-capacity-${tour.id}`}
                  >
                    <Users className="mr-1 h-4 w-4" />
                    Max {tour.capacity} pax
                  </span>
                  {tour.features.slice(0, 1).map((feature, index) => (
                    <span 
                      key={index}
                      className="flex items-center whitespace-nowrap"
                      data-testid={`text-tour-feature-${tour.id}-${index}`}
                    >
                      {getFeatureIcon(feature)}
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div data-testid={`text-tour-price-${tour.id}`}>
                    <span className="text-xl font-bold text-navy">
                      {formatPrice(tour.price)}
                    </span>
                    <span className="text-slate">/person</span>
                  </div>
                  <Link href={`/booking?tour=${tour.id}`}>
                    <Button
                      className="bg-teal hover:bg-navy text-white font-medium px-4 py-2 rounded-card transition-colors"
                      onClick={() => handleAddToItinerary(tour.name)}
                      data-testid={`button-add-tour-${tour.id}`}
                    >
                      Add to Itinerary
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
