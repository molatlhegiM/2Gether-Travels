import { useQuery } from "@tanstack/react-query";
import { Check, Star, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PackageCard from "@/components/package-card";
import type { Package } from "@shared/schema";

export default function Packages() {
  const { data: packages, isLoading } = useQuery<Package[]>({
    queryKey: ["/api/packages"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-mist">
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-slate/20 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-slate/20 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy to-afiia-blue text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading font-bold text-4xl lg:text-6xl mb-6" data-testid="heading-packages">
              AFIIA 2026 Travel Packages
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white/90">
              Comprehensive packages designed for professional auditors and finance executives
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-white/20 backdrop-blur-sm px-4 py-2 text-white">
                All packages include conference venue access
              </Badge>
              <Badge className="bg-gold text-navy px-4 py-2">
                Early bird pricing until Dec 2025
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Package Comparison */}
      <section className="py-16 lg:py-24 bg-mist">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages?.map((pkg) => (
              <PackageCard key={pkg.id} package={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Comparison Table */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-4" data-testid="heading-comparison">
              Package Comparison
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              Detailed breakdown of what's included in each package
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-card shadow-soft">
              <thead>
                <tr className="border-b border-slate/20">
                  <th className="text-left p-6 font-heading font-semibold text-navy">Features</th>
                  <th className="text-center p-6 font-heading font-semibold text-navy">Budget</th>
                  <th className="text-center p-6 font-heading font-semibold text-navy bg-gold/10">
                    Executive
                    <Badge className="ml-2 bg-gold text-navy text-xs">Recommended</Badge>
                  </th>
                  <th className="text-center p-6 font-heading font-semibold text-navy">Premium</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Hotel Accommodation", budget: "3-star", executive: "4-star", premium: "5-star luxury suite" },
                  { feature: "Airport Transfers", budget: "Shared shuttle", executive: "Private sedan", premium: "VIP chauffeur" },
                  { feature: "Venue Shuttles", budget: "✓", executive: "✓", premium: "✓" },
                  { feature: "Concierge Access", budget: "Basic", executive: "Premium", premium: "24/7 dedicated" },
                  { feature: "Tour Credits", budget: "1", executive: "3", premium: "Unlimited" },
                  { feature: "Welcome Dinner", budget: "✗", executive: "✓", premium: "✓" },
                  { feature: "Wine Tasting", budget: "✗", executive: "✗", premium: "Private session" },
                  { feature: "Lounge Access", budget: "✗", executive: "✗", premium: "✓" },
                  { feature: "Travel Insurance", budget: "Basic", executive: "Comprehensive", premium: "Premium coverage" },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-slate/10 hover:bg-mist/50" data-testid={`comparison-row-${index}`}>
                    <td className="p-6 font-medium text-navy">{row.feature}</td>
                    <td className="p-6 text-center text-slate">{row.budget}</td>
                    <td className="p-6 text-center text-slate bg-gold/5">{row.executive}</td>
                    <td className="p-6 text-center text-slate">{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Group Bookings */}
      <section className="py-16 lg:py-24 bg-mist">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-6" data-testid="heading-group-bookings">
              Group & Corporate Bookings
            </h2>
            <p className="text-slate text-lg mb-8">
              Special rates and services for IIA delegations and corporate groups of 5 or more
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="card-base p-8">
                <h3 className="font-heading font-semibold text-xl text-navy mb-4">IIA Delegations</h3>
                <ul className="text-slate text-left space-y-3 mb-6">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-teal mr-3" />
                    15% discount on all packages
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-teal mr-3" />
                    Dedicated group coordinator
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-teal mr-3" />
                    Flexible payment terms (NET 30)
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-teal mr-3" />
                    Custom itinerary planning
                  </li>
                </ul>
              </Card>

              <Card className="card-base p-8">
                <h3 className="font-heading font-semibold text-xl text-navy mb-4">Corporate Groups</h3>
                <ul className="text-slate text-left space-y-3 mb-6">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-teal mr-3" />
                    Volume pricing available
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-teal mr-3" />
                    Invoice billing with PO numbers
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-teal mr-3" />
                    Procurement documentation
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-teal mr-3" />
                    Group activities coordination
                  </li>
                </ul>
              </Card>
            </div>

            <Button className="btn-primary text-lg px-8 py-4" data-testid="button-rfp">
              Request Group Proposal
            </Button>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-4" data-testid="heading-addons">
              Package Add-ons
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              Enhance your experience with optional services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Extra Nights",
                description: "Extend your stay before or after the conference",
                price: "$150/night",
                features: ["Same hotel accommodation", "Late checkout available", "City tour recommendations"]
              },
              {
                name: "Partner Pass",
                description: "Bring your spouse/partner to networking events",
                price: "$350",
                features: ["Welcome reception access", "Gala dinner included", "City tour options"]
              },
              {
                name: "Private Tours",
                description: "Exclusive tours with professional guide",
                price: "From $200",
                features: ["Customizable itinerary", "Personal guide", "Flexible timing"]
              }
            ].map((addon, index) => (
              <Card key={index} className="card-base p-6" data-testid={`addon-${index}`}>
                <h3 className="font-heading font-semibold text-lg text-navy mb-3">{addon.name}</h3>
                <p className="text-slate text-sm mb-4">{addon.description}</p>
                <div className="text-2xl font-bold text-navy mb-4">{addon.price}</div>
                <ul className="text-slate text-sm space-y-2">
                  {addon.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="h-3 w-3 text-teal mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
