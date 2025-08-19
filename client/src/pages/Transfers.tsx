import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Crown, Users, Clock, Shield, MapPin, Plane } from "lucide-react";
import { Link } from "wouter";
import { useTransferOptions } from "@/hooks/use-booking";
import { trackEvent } from "@/lib/analytics";

const transferFeatures = {
  shared: [
    { icon: Users, title: "Meet Fellow Delegates", description: "Travel with other conference attendees" },
    { icon: Clock, title: "Scheduled Service", description: "Regular departure times to/from venue" },
    { icon: Shield, title: "Professional Drivers", description: "Licensed, experienced chauffeurs" },
    { icon: MapPin, title: "Multiple Stops", description: "Convenient pickup points around the city" }
  ],
  private: [
    { icon: Crown, title: "Privacy & Comfort", description: "Your own vehicle for up to 4 passengers" },
    { icon: Clock, title: "Flexible Timing", description: "Travel on your schedule, not ours" },
    { icon: Shield, title: "Meet & Greet", description: "Personal welcome at airport arrivals" },
    { icon: Users, title: "Professional Service", description: "Dedicated chauffeur throughout your stay" }
  ],
  vip: [
    { icon: Crown, title: "Ultimate Luxury", description: "Premium vehicles with luxury amenities" },
    { icon: Plane, title: "Airport Lounge", description: "Complimentary access to VIP lounges" },
    { icon: Shield, title: "24/7 Availability", description: "Round-the-clock service whenever needed" },
    { icon: Users, title: "Concierge Service", description: "Dedicated travel coordinator" }
  ]
};

export default function Transfers() {
  const { data: transferOptions, isLoading } = useTransferOptions();

  const handleScheduleTransfer = (transferId: string, transferName: string) => {
    trackEvent('select_transfer', 'transfers', `transfer_${transferName.toLowerCase().replace(/\s+/g, '_')}`);
  };

  const formatPrice = (price: number) => {
    return `$${(price / 100).toLocaleString()}`;
  };

  const getTransferImage = (type: string) => {
    switch (type) {
      case 'shared':
        return 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400';
      case 'private':
        return 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400';
      default:
        return null;
    }
  };

  const getTransferFeatures = (type: string) => {
    return transferFeatures[type as keyof typeof transferFeatures] || transferFeatures.shared;
  };

  return (
    <div className="min-h-screen" data-testid="page-transfers">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-primary text-white py-20 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-gold text-navy px-4 py-2 mb-6 text-sm font-medium">
              Airport & Conference Transfers
            </Badge>
            <h1 className="font-inter font-bold text-4xl lg:text-6xl mb-6" data-testid="text-transfers-hero-title">
              From Touchdown to <span className="text-gold">Takeoff</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white/90 max-w-3xl mx-auto" data-testid="text-transfers-hero-subtitle">
              Reliable, comfortable transportation solutions covering every aspect of your AFIIA 2026 journey. 
              From airport arrival to conference venue and everywhere in between.
            </p>
          </div>
        </div>
      </section>

      {/* Transfer Options */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-card shadow-soft p-8 text-center animate-pulse">
                  <div className="w-full h-40 bg-gray-200 rounded-card mb-6"></div>
                  <div className="h-6 bg-gray-200 rounded w-32 mx-auto mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-20 mx-auto mb-6"></div>
                  <div className="space-y-2 mb-8">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="h-4 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {transferOptions?.map((transfer) => (
                <Card
                  key={transfer.id}
                  className={`text-center hover:shadow-lg transition-all ${
                    transfer.isPopular ? 'border-2 border-gold relative' : ''
                  }`}
                  data-testid={`card-transfer-${transfer.type}`}
                >
                  {/* Popular Badge */}
                  {transfer.isPopular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gold text-navy px-4 py-1 text-sm font-medium">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardContent className="p-8">
                    {/* Transfer Image or Icon */}
                    {getTransferImage(transfer.type) ? (
                      <img
                        src={getTransferImage(transfer.type)}
                        alt={`${transfer.name} vehicle`}
                        className="w-full h-40 object-cover rounded-card mb-6"
                        data-testid={`img-transfer-${transfer.type}`}
                      />
                    ) : (
                      <div className="w-full h-40 bg-gradient-to-r from-navy to-gold rounded-card mb-6 flex items-center justify-center">
                        <Crown className="text-white text-4xl h-16 w-16" />
                      </div>
                    )}
                    
                    <h2 className="font-inter font-bold text-2xl text-navy mb-2" data-testid={`text-transfer-name-${transfer.type}`}>
                      {transfer.name}
                    </h2>
                    
                    <p className="text-slate text-sm mb-6">{transfer.description}</p>
                    
                    <div className="mb-6" data-testid={`text-transfer-price-${transfer.type}`}>
                      <span className="text-3xl font-bold text-navy">{formatPrice(transfer.price)}</span>
                      <span className="text-slate">/{transfer.type === 'shared' ? 'person' : 'trip'}</span>
                    </div>
                    
                    <div className="text-left space-y-2 mb-8">
                      {transfer.features.map((feature, index) => (
                        <div key={index} className="flex items-start" data-testid={`text-transfer-feature-${transfer.type}-${index}`}>
                          <Check className="text-teal mr-2 h-4 w-4 flex-shrink-0 mt-0.5" />
                          <span className="text-slate text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Link href={`/booking?transfer=${transfer.id}`}>
                      <Button
                        className={`w-full py-3 text-lg transition-colors ${
                          transfer.isPopular ? 'btn-secondary' : 'btn-primary'
                        }`}
                        onClick={() => handleScheduleTransfer(transfer.id, transfer.name)}
                        data-testid={`button-schedule-transfer-${transfer.type}`}
                      >
                        Schedule Transfer
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Transfer Features Detail */}
      <section className="py-16 lg:py-24 bg-mist">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-inter font-bold text-3xl lg:text-4xl text-navy mb-4" data-testid="text-transfer-features-title">
              Why Choose Our Transfers?
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              Each transfer option is designed to meet different needs and preferences while maintaining 
              our commitment to safety, reliability, and professional service.
            </p>
          </div>

          <div className="space-y-16">
            {transferOptions?.map((transfer) => {
              const features = getTransferFeatures(transfer.type);
              return (
                <div key={transfer.id} className="max-w-6xl mx-auto" data-testid={`section-transfer-features-${transfer.type}`}>
                  <div className="text-center mb-12">
                    <h3 className="font-inter font-bold text-2xl text-navy mb-4">
                      {transfer.name} Benefits
                    </h3>
                    <p className="text-slate max-w-2xl mx-auto">
                      {transfer.type === 'shared' && "Cost-effective solution perfect for budget-conscious delegates who enjoy meeting fellow professionals"}
                      {transfer.type === 'private' && "Ideal balance of comfort, privacy, and flexibility for busy executives and small groups"}
                      {transfer.type === 'vip' && "Ultimate luxury experience with exclusive amenities and personalized service throughout your journey"}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => {
                      const IconComponent = feature.icon;
                      return (
                        <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <div className="flex justify-center mb-4">
                              <div className={`w-12 h-12 rounded-card flex items-center justify-center ${
                                transfer.type === 'vip' ? 'bg-gradient-to-br from-gold to-navy' :
                                transfer.type === 'private' ? 'bg-gradient-to-br from-teal to-gold' :
                                'bg-gradient-to-br from-navy to-teal'
                              }`}>
                                <IconComponent className="text-white h-6 w-6" />
                              </div>
                            </div>
                            <CardTitle className="text-lg text-navy">{feature.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-slate text-sm">{feature.description}</p>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Coverage Areas */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-inter font-bold text-3xl lg:text-4xl text-navy mb-6" data-testid="text-coverage-areas-title">
              Complete Cape Town Coverage
            </h2>
            <p className="text-slate text-lg mb-12">
              Our transfer services cover all major areas and attractions in Cape Town, ensuring you can make 
              the most of your conference trip with convenient transportation to any destination.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-navy to-teal rounded-card mx-auto mb-4 flex items-center justify-center">
                  <Plane className="text-white h-8 w-8" />
                </div>
                <h4 className="font-inter font-semibold text-navy mb-2">Airport Transfers</h4>
                <p className="text-slate text-sm">Cape Town International Airport to any hotel or venue</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-teal to-gold rounded-card mx-auto mb-4 flex items-center justify-center">
                  <MapPin className="text-white h-8 w-8" />
                </div>
                <h4 className="font-inter font-semibold text-navy mb-2">Conference Venue</h4>
                <p className="text-slate text-sm">Daily shuttles to and from the AFIIA 2026 venue</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gold to-navy rounded-card mx-auto mb-4 flex items-center justify-center">
                  <Users className="text-white h-8 w-8" />
                </div>
                <h4 className="font-inter font-semibold text-navy mb-2">Networking Events</h4>
                <p className="text-slate text-sm">Transportation to official conference social events</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-afiia-blue to-teal rounded-card mx-auto mb-4 flex items-center justify-center">
                  <Crown className="text-white h-8 w-8" />
                </div>
                <h4 className="font-inter font-semibold text-navy mb-2">City Tours</h4>
                <p className="text-slate text-sm">Access to Cape Town's major attractions and landmarks</p>
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
