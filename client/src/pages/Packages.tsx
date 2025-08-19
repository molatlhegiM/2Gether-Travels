import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, Crown, Users, Shield, Plane, Calendar } from "lucide-react";
import { Link } from "wouter";
import { usePackages } from "@/hooks/use-booking";
import { trackEvent } from "@/lib/analytics";

const packageFeatures = {
  budget: [
    { icon: Users, title: "Group Networking", description: "Shared experiences with fellow delegates" },
    { icon: Shield, title: "Essential Support", description: "Basic concierge services during conference hours" },
    { icon: Plane, title: "Reliable Transport", description: "Comfortable shared shuttle services" },
    { icon: Calendar, title: "Conference Focus", description: "Everything needed for conference attendance" }
  ],
  executive: [
    { icon: Star, title: "Premium Comfort", description: "4-star accommodations and private transfers" },
    { icon: Users, title: "Enhanced Networking", description: "Access to exclusive networking events" },
    { icon: Shield, title: "Dedicated Support", description: "Premium concierge services throughout stay" },
    { icon: Calendar, title: "Flexible Schedule", description: "Multiple tour options and flexible timing" }
  ],
  premium: [
    { icon: Crown, title: "Luxury Experience", description: "5-star suites and VIP treatment throughout" },
    { icon: Star, title: "Exclusive Access", description: "Private events and premium venue access" },
    { icon: Shield, title: "24/7 Concierge", description: "Round-the-clock personalized assistance" },
    { icon: Users, title: "VIP Networking", description: "Exclusive networking opportunities with executives" }
  ]
};

export default function Packages() {
  const { data: packages, isLoading } = usePackages();

  const handlePackageSelect = (packageId: string, packageName: string) => {
    trackEvent('select_package', 'packages', `package_${packageName.toLowerCase()}`);
  };

  const formatPrice = (price: number) => {
    return `$${(price / 100).toLocaleString()}`;
  };

  const getPackageIcon = (category: string) => {
    switch (category) {
      case 'executive':
        return <Star className="text-gold text-2xl h-8 w-8" />;
      case 'premium':
        return <Crown className="text-gold text-2xl h-8 w-8" />;
      default:
        return <Users className="text-teal text-2xl h-8 w-8" />;
    }
  };

  const getPackageFeatures = (category: string) => {
    return packageFeatures[category as keyof typeof packageFeatures] || packageFeatures.budget;
  };

  return (
    <div className="min-h-screen" data-testid="page-packages">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-primary text-white py-20 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-gold text-navy px-4 py-2 mb-6 text-sm font-medium">
              AFIIA 2026 Packages
            </Badge>
            <h1 className="font-inter font-bold text-4xl lg:text-6xl mb-6" data-testid="text-packages-hero-title">
              Choose Your <span className="text-gold">Perfect Package</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white/90 max-w-3xl mx-auto" data-testid="text-packages-hero-subtitle">
              Carefully crafted packages designed for every professional's needs and budget. 
              From essential conference attendance to luxury VIP experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Package Comparison */}
      <section className="py-16 lg:py-24 bg-mist">
        <div className="container mx-auto px-4 lg:px-8">
          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-card shadow-soft p-8 animate-pulse">
                  <div className="h-8 bg-gray-200 rounded w-32 mb-6"></div>
                  <div className="h-12 bg-gray-200 rounded w-24 mb-6"></div>
                  <div className="space-y-3 mb-8">
                    {[...Array(6)].map((_, j) => (
                      <div key={j} className="h-4 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {packages?.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`bg-white rounded-card shadow-soft p-8 hover:shadow-lg transition-all ${
                    pkg.category === 'executive' ? 'border-2 border-gold relative scale-105' : ''
                  }`}
                  data-testid={`card-package-${pkg.category}`}
                >
                  {/* Recommended Badge for Executive */}
                  {pkg.category === 'executive' && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gold text-navy px-4 py-1 text-sm font-medium">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                      {getPackageIcon(pkg.category)}
                    </div>
                    <h2 className="font-inter font-bold text-2xl text-navy mb-2" data-testid={`text-package-name-${pkg.category}`}>
                      {pkg.name}
                    </h2>
                    <p className="text-slate text-sm mb-6">{pkg.description}</p>
                    <div className="mb-6" data-testid={`text-package-price-${pkg.category}`}>
                      <span className="text-4xl font-bold text-navy">{formatPrice(pkg.price)}</span>
                      <span className="text-slate">/person</span>
                    </div>
                  </div>

                  {/* Inclusions */}
                  <div className="space-y-3 mb-8">
                    <h3 className="font-inter font-semibold text-navy mb-4">What's Included</h3>
                    {pkg.inclusions.map((inclusion, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="text-teal mr-3 h-5 w-5 flex-shrink-0 mt-0.5" />
                        <span className="text-slate" data-testid={`text-package-inclusion-${pkg.category}-${index}`}>
                          {inclusion}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link href={`/booking?package=${pkg.id}`}>
                    <Button
                      className={`w-full py-3 text-lg transition-colors ${
                        pkg.category === 'executive'
                          ? 'btn-secondary'
                          : 'btn-primary'
                      }`}
                      onClick={() => handlePackageSelect(pkg.id, pkg.name)}
                      data-testid={`button-select-package-${pkg.category}`}
                    >
                      Select {pkg.name}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Package Features Detail */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-inter font-bold text-3xl lg:text-4xl text-navy mb-4" data-testid="text-package-features-title">
              Designed for Different Needs
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              Each package is carefully crafted to serve different professional requirements and travel preferences
            </p>
          </div>

          <div className="space-y-16">
            {packages?.map((pkg) => {
              const features = getPackageFeatures(pkg.category);
              return (
                <div key={pkg.id} className="max-w-6xl mx-auto" data-testid={`section-package-features-${pkg.category}`}>
                  <div className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                      {getPackageIcon(pkg.category)}
                    </div>
                    <h3 className="font-inter font-bold text-2xl text-navy mb-2">
                      {pkg.name} Package Features
                    </h3>
                    <p className="text-slate">
                      {pkg.category === 'budget' && "Essential conference experience with all the basics covered"}
                      {pkg.category === 'executive' && "Enhanced comfort and networking opportunities for busy professionals"}
                      {pkg.category === 'premium' && "Ultimate luxury experience with exclusive access and VIP treatment"}
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
                                pkg.category === 'premium' ? 'bg-gradient-to-br from-gold to-navy' :
                                pkg.category === 'executive' ? 'bg-gradient-to-br from-teal to-gold' :
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

      {/* Group Bookings */}
      <section className="py-16 lg:py-24 bg-mist">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-inter font-bold text-3xl lg:text-4xl text-navy mb-6" data-testid="text-group-booking-title">
              Group & Corporate Bookings
            </h2>
            <p className="text-slate text-lg mb-8">
              Planning for multiple delegates? We offer special rates and customized packages for 
              groups of 5 or more professionals from the same organization.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-navy">Volume Discounts</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate text-sm">
                    5-9 delegates: 10% off<br />
                    10+ delegates: 15% off<br />
                    20+ delegates: Custom pricing
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-navy">Flexible Payment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate text-sm">
                    Invoice payment terms<br />
                    Purchase order processing<br />
                    Split billing options
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-navy">Dedicated Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate text-sm">
                    Dedicated account manager<br />
                    Custom itinerary planning<br />
                    Group coordination services
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Link href="/contact">
              <Button className="btn-primary px-8 py-4 text-lg" data-testid="button-group-booking-inquiry">
                Request Group Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <MobileCTA />
    </div>
  );
}
