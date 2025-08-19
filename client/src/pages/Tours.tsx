import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, Camera, Ship, Wine, Utensils, Filter, MapPin } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";
import { useTours } from "@/hooks/use-booking";
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

export default function Tours() {
  const { data: tours, isLoading } = useTours();
  const [filters, setFilters] = useState({
    category: "",
    duration: "",
    networking: ""
  });

  const handleAddToItinerary = (tourId: string, tourName: string) => {
    trackEvent('select_tour', 'tours', `tour_${tourName.toLowerCase().replace(/\s+/g, '_')}`);
  };

  const formatPrice = (price: number) => {
    return `$${(price / 100).toLocaleString()}`;
  };

  const getFeatureIcon = (feature: string) => {
    const IconComponent = featureIcons[feature as keyof typeof featureIcons];
    return IconComponent ? <IconComponent className="h-4 w-4 mr-1" /> : null;
  };

  const filteredTours = tours?.filter((tour) => {
    if (filters.category && tour.category !== filters.category) return false;
    if (filters.networking === "yes" && !tour.isNetworkingFriendly) return false;
    if (filters.networking === "no" && tour.isNetworkingFriendly) return false;
    if (filters.duration === "short" && !tour.duration.includes("5 hours") && !tour.duration.includes("4 hours")) return false;
    if (filters.duration === "full" && !tour.duration.includes("8 hours") && !tour.duration.includes("6 hours")) return false;
    return true;
  });

  return (
    <div className="min-h-screen" data-testid="page-tours">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-primary text-white py-20 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-gold text-navy px-4 py-2 mb-6 text-sm font-medium">
              AFIIA 2026 Tours & Experiences
            </Badge>
            <h1 className="font-inter font-bold text-4xl lg:text-6xl mb-6" data-testid="text-tours-hero-title">
              Build Connections <span className="text-gold">Beyond</span> the Conference
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white/90 max-w-3xl mx-auto" data-testid="text-tours-hero-subtitle">
              Carefully curated experiences that combine Cape Town's rich culture and stunning landscapes 
              with opportunities for meaningful professional networking.
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
            
            <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
              <SelectTrigger className="w-40" data-testid="filter-category">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                <SelectItem value="heritage">Heritage</SelectItem>
                <SelectItem value="wine">Wine</SelectItem>
                <SelectItem value="nature">Nature</SelectItem>
                <SelectItem value="family">Family</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.duration} onValueChange={(value) => setFilters(prev => ({ ...prev, duration: value }))}>
              <SelectTrigger className="w-40" data-testid="filter-duration">
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Duration</SelectItem>
                <SelectItem value="short">Half Day (4-5 hours)</SelectItem>
                <SelectItem value="full">Full Day (6-8 hours)</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.networking} onValueChange={(value) => setFilters(prev => ({ ...prev, networking: value }))}>
              <SelectTrigger className="w-48" data-testid="filter-networking">
                <SelectValue placeholder="Networking Friendly" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Tours</SelectItem>
                <SelectItem value="yes">Networking Friendly</SelectItem>
                <SelectItem value="no">Leisure Focus</SelectItem>
              </SelectContent>
            </Select>

            {(filters.category || filters.duration || filters.networking) && (
              <Button
                variant="outline"
                onClick={() => setFilters({ category: "", duration: "", networking: "" })}
                className="whitespace-nowrap"
                data-testid="button-clear-filters"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
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
          ) : filteredTours && filteredTours.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTours.map((tour) => (
                <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow" data-testid={`card-tour-${tour.id}`}>
                  <div className="relative">
                    <img
                      src={tour.images[0]}
                      alt={`${tour.name} tour experience`}
                      className="w-full h-48 object-cover"
                      data-testid={`img-tour-${tour.id}`}
                    />
                  </div>
                  
                  <CardContent className="p-6">
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
                    
                    <h3 className="font-inter font-semibold text-lg text-navy mb-3" data-testid={`text-tour-name-${tour.id}`}>
                      {tour.name}
                    </h3>
                    
                    <p className="text-slate text-sm mb-4 line-clamp-2" data-testid={`text-tour-description-${tour.id}`}>
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
                        <span className="text-slate text-sm">/person</span>
                      </div>
                      <Link href={`/booking?tour=${tour.id}`}>
                        <Button
                          className="bg-teal hover:bg-navy text-white font-medium px-4 py-2 rounded-card transition-colors"
                          onClick={() => handleAddToItinerary(tour.id, tour.name)}
                          data-testid={`button-add-tour-${tour.id}`}
                        >
                          Add to Itinerary
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
              <h3 className="font-inter font-semibold text-xl text-navy mb-2">No Tours Found</h3>
              <p className="text-slate mb-4">Try adjusting your filters to see more options.</p>
              <Button
                variant="outline"
                onClick={() => setFilters({ category: "", duration: "", networking: "" })}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Why Our Tours */}
      <section className="py-16 lg:py-24 bg-mist">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-inter font-bold text-3xl lg:text-4xl text-navy mb-4" data-testid="text-why-our-tours-title">
              Networking Through Experience
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              Our tours are specifically designed to facilitate meaningful connections between conference delegates 
              while showcasing the best of Cape Town's culture and natural beauty.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-navy to-teal rounded-card mx-auto mb-6 flex items-center justify-center">
                <Users className="text-white h-8 w-8" />
              </div>
              <h3 className="font-inter font-semibold text-lg text-navy mb-4">Small Groups</h3>
              <p className="text-slate">Limited capacity ensures intimate settings perfect for professional conversations and relationship building.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-teal to-gold rounded-card mx-auto mb-6 flex items-center justify-center">
                <Clock className="text-white h-8 w-8" />
              </div>
              <h3 className="font-inter font-semibold text-lg text-navy mb-4">Perfect Timing</h3>
              <p className="text-slate">Scheduled around conference activities to maximize your networking opportunities without missing key sessions.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-gold to-navy rounded-card mx-auto mb-6 flex items-center justify-center">
                <Camera className="text-white h-8 w-8" />
              </div>
              <h3 className="font-inter font-semibold text-lg text-navy mb-4">Memorable Moments</h3>
              <p className="text-slate">Create lasting memories and talking points that will strengthen your professional relationships long after the conference.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-afiia-blue to-teal rounded-card mx-auto mb-6 flex items-center justify-center">
                <MapPin className="text-white h-8 w-8" />
              </div>
              <h3 className="font-inter font-semibold text-lg text-navy mb-4">Local Insights</h3>
              <p className="text-slate">Expert guides provide cultural context and business insights, adding value to your professional development.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Categories */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-inter font-bold text-3xl lg:text-4xl text-navy mb-4" data-testid="text-tour-categories-title">
              Explore Cape Town's Best
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              From rich history to world-class wines, discover what makes Cape Town one of the world's most captivating cities
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-afiia-green rounded-card mx-auto mb-6 flex items-center justify-center">
                <Ship className="text-white h-10 w-10" />
              </div>
              <h3 className="font-inter font-bold text-xl text-navy mb-4">Heritage Tours</h3>
              <p className="text-slate mb-4">
                Explore South Africa's complex history through visits to Robben Island, District Six Museum, 
                and other significant sites that shaped the nation's journey to democracy.
              </p>
              <ul className="text-slate text-sm space-y-1">
                <li>• Robben Island & Cape Point</li>
                <li>• District Six Historical Tour</li>
                <li>• Apartheid Museum Experience</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gold rounded-card mx-auto mb-6 flex items-center justify-center">
                <Wine className="text-navy h-10 w-10" />
              </div>
              <h3 className="font-inter font-bold text-xl text-navy mb-4">Wine Experiences</h3>
              <p className="text-slate mb-4">
                Discover South Africa's world-renowned wine regions with tastings, vineyard tours, 
                and discussions on business ethics and governance in a relaxed setting.
              </p>
              <ul className="text-slate text-sm space-y-1">
                <li>• Stellenbosch Wine Estate Tours</li>
                <li>• Wine & Governance Discussions</li>
                <li>• Private Vineyard Tastings</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileCTA />
    </div>
  );
}
