import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Crown } from "lucide-react";
import { usePackages } from "@/hooks/use-booking";
import { useBookingStore } from "@/lib/booking";
import { trackEvent } from "@/lib/analytics";

export default function PackageStep() {
  const { data: packages, isLoading } = usePackages();
  const { packageId, setPackage, nextStep } = useBookingStore();

  const handlePackageSelect = (pkgId: string, pkgName: string) => {
    setPackage(pkgId);
    trackEvent('select_package', 'booking', `package_${pkgName.toLowerCase()}`);
    nextStep();
  };

  const formatPrice = (price: number) => {
    return `$${(price / 100).toLocaleString()}`;
  };

  const getPackageIcon = (category: string) => {
    switch (category) {
      case 'executive':
        return <Star className="text-gold text-lg" />;
      case 'premium':
        return <Crown className="text-gold text-lg" />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-card shadow-soft p-8" data-testid="package-step-loading">
        <div className="h-8 bg-gray-200 rounded w-48 mb-8 animate-pulse"></div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-50 rounded-card p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-24 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-32 mb-6"></div>
              <div className="space-y-3 mb-8">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-card shadow-soft p-8" data-testid="package-step">
      <h2 className="font-inter font-bold text-2xl text-navy mb-8" data-testid="text-package-step-title">
        Choose Your Package
      </h2>
      
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {packages?.map((pkg) => (
          <div
            key={pkg.id}
            className={`border-2 rounded-card p-6 cursor-pointer transition-all hover:shadow-lg ${
              packageId === pkg.id
                ? 'border-gold bg-gold/5'
                : pkg.category === 'executive'
                ? 'border-gold/30'
                : 'border-gray-200 hover:border-teal/30'
            } ${pkg.category === 'executive' ? 'relative' : ''}`}
            onClick={() => handlePackageSelect(pkg.id, pkg.name)}
            data-testid={`card-package-${pkg.category}`}
          >
            {/* Recommended Badge for Executive */}
            {pkg.category === 'executive' && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gold text-navy px-4 py-1 text-sm font-medium">
                  Recommended
                </Badge>
              </div>
            )}
            
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-inter font-semibold text-xl text-navy">
                {pkg.name}
              </h3>
              <div className="flex items-center space-x-2">
                {getPackageIcon(pkg.category)}
                {pkg.isPopular && (
                  <Badge className="bg-teal text-white px-2 py-1 text-xs">
                    Popular
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="mb-6">
              <span className="text-2xl font-bold text-navy">{formatPrice(pkg.price)}</span>
              <span className="text-slate">/person</span>
            </div>
            
            <ul className="space-y-2 mb-6 text-sm">
              {pkg.inclusions.map((inclusion, index) => (
                <li key={index} className="flex items-start">
                  <Check className="text-teal mr-2 h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span className="text-slate">{inclusion}</span>
                </li>
              ))}
            </ul>
            
            <Button
              className={`w-full transition-colors ${
                packageId === pkg.id
                  ? 'bg-teal text-white'
                  : pkg.category === 'executive'
                  ? 'btn-secondary'
                  : 'btn-primary'
              }`}
              data-testid={`button-select-package-${pkg.category}`}
            >
              {packageId === pkg.id ? 'Selected' : 'Select Package'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
