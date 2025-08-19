import { Check, Star, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Package } from "@shared/schema";
import { useBookingStore } from "@/lib/booking-store";
import { useLocation } from "wouter";

interface PackageCardProps {
  package: Package;
  className?: string;
}

export default function PackageCard({ package: pkg, className = "" }: PackageCardProps) {
  const { setPackage, setCurrentStep } = useBookingStore();
  const [, setLocation] = useLocation();

  const handleSelectPackage = () => {
    setPackage(pkg.id);
    setCurrentStep(1);
    setLocation("/booking");
  };

  const formatPrice = (price: string) => {
    return `$${parseFloat(price).toLocaleString()}`;
  };

  const getIcon = () => {
    if (pkg.name === "Premium") return <Crown className="h-5 w-5" />;
    if (pkg.recommended) return <Star className="h-5 w-5 text-gold" />;
    return null;
  };

  return (
    <Card 
      className={`
        card-base hover:scale-105 transition-all duration-300 
        ${pkg.recommended ? 'border-2 border-gold relative' : ''}
        ${className}
      `}
      data-testid={`card-package-${pkg.id}`}
    >
      {pkg.recommended && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-gold text-navy px-4 py-1 rounded-full text-sm font-medium">
            Recommended
          </Badge>
        </div>
      )}
      
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-xl text-navy" data-testid={`heading-${pkg.name.toLowerCase()}`}>
            {pkg.name}
          </h3>
          {pkg.popular && !pkg.recommended && (
            <Badge className="bg-teal text-white">Most Popular</Badge>
          )}
          {getIcon()}
        </div>
        
        <div className="mb-4">
          <span className="text-3xl font-bold text-navy" data-testid={`price-${pkg.id}`}>
            {formatPrice(pkg.price)}
          </span>
          <span className="text-slate">/person</span>
        </div>
      </CardHeader>

      <CardContent>
        <ul className="space-y-3 mb-8 text-slate">
          {pkg.inclusions.map((inclusion, index) => (
            <li key={index} className="flex items-center" data-testid={`inclusion-${pkg.id}-${index}`}>
              <Check className="h-4 w-4 text-teal mr-3 flex-shrink-0" />
              <span>{inclusion}</span>
            </li>
          ))}
        </ul>
        
        <Button
          className={`
            w-full py-3 rounded-card transition-colors font-medium
            ${pkg.recommended ? 'btn-accent' : 'btn-primary'}
          `}
          onClick={handleSelectPackage}
          data-testid={`button-select-${pkg.id}`}
        >
          Select Package
        </Button>
      </CardContent>
    </Card>
  );
}
