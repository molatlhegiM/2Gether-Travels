import { Button } from "@/components/ui/button";
import { Plane, Building, Car, Wine, Shield, Hotel } from "lucide-react";
import { Link } from "wouter";
import { trackEvent } from "@/lib/analytics";

const partners = [
  { name: "SAA", icon: Plane, category: "Airline" },
  { name: "Marriott", icon: Hotel, category: "Hotel" },
  { name: "AFIIA", icon: Building, category: "Association" },
  { name: "Uber", icon: Car, category: "Transport" },
  { name: "Tours SA", icon: Wine, category: "Tours" },
  { name: "Travel Guard", icon: Shield, category: "Insurance" }
];

export default function Partnerships() {
  const handleBecomePartner = () => {
    trackEvent('click_become_partner', 'partnerships', 'become_partner');
  };

  return (
    <section className="py-16 lg:py-24 bg-mist" data-testid="section-partnerships">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 
            className="font-inter font-bold text-3xl lg:text-4xl text-navy mb-4"
            data-testid="text-partnerships-title"
          >
            Trusted Partnerships
          </h2>
          <p 
            className="text-slate text-lg max-w-2xl mx-auto"
            data-testid="text-partnerships-subtitle"
          >
            Working with IIA/AFIIA and industry-leading service providers
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-60 hover:opacity-100 transition-opacity mb-12">
          {partners.map((partner, index) => {
            const IconComponent = partner.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-card shadow-soft p-6 text-center group hover:shadow-lg transition-shadow"
                data-testid={`card-partner-${index}`}
              >
                <div className="text-3xl mb-2 group-hover:text-navy transition-colors">
                  <IconComponent className="text-slate group-hover:text-navy transition-colors h-8 w-8 mx-auto" />
                </div>
                <span 
                  className="text-xs text-slate font-medium"
                  data-testid={`text-partner-name-${index}`}
                >
                  {partner.name}
                </span>
              </div>
            );
          })}
        </div>
        
        <div className="text-center">
          <Link href="/partners">
            <Button
              className="btn-primary"
              onClick={handleBecomePartner}
              data-testid="button-become-partner"
            >
              Become a Partner
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
