import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Crown } from "lucide-react";
import { Link } from "wouter";
import { trackEvent } from "@/lib/analytics";
import { usePackages } from "@/hooks/use-booking";

export default function PackagePicker() {
  const { data: packages, isLoading } = usePackages();

  const handlePackageSelect = (packageName: string) => {
    trackEvent('click_select_package', 'packages', `select_${packageName.toLowerCase()}_package`);
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
      <section className="py-16 lg:py-24 bg-mist" data-testid="section-package-picker-loading">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-card shadow-soft p-8 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-24 mb-6"></div>
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
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-mist" data-testid="section-package-picker">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 
            className="font-inter font-bold text-3xl lg:text-4xl text-navy mb-4"
            data-testid="text-package-picker-title"
          >
            Choose Your Package
          </h2>
          <p 
            className="text-slate text-lg max-w-2xl mx-auto"
            data-testid="text-package-picker-subtitle"
          >
            Tailored packages for every professional's needs and budget
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages?.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-white rounded-card shadow-soft p-8 hover:shadow-lg transition-shadow ${
                pkg.category === 'executive' ? 'border-2 border-gold relative' : ''
              }`}
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
              
              <div className="flex items-center justify-between mb-6">
                <h3 
                  className="font-inter font-semibold text-xl text-navy"
                  data-testid={`text-package-name-${pkg.category}`}
                >
                  {pkg.name}
                </h3>
                <div className="flex items-center space-x-2">
                  {getPackageIcon(pkg.category)}
                  {pkg.isPopular && (
                    <Badge className="bg-teal text-white px-3 py-1 text-sm font-medium">
                      Most Popular
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="mb-6" data-testid={`text-package-price-${pkg.category}`}>
                <span className="text-3xl font-bold text-navy">{formatPrice(pkg.price)}</span>
                <span className="text-slate">/person</span>
              </div>
              
              <ul className="space-y-3 mb-8 text-slate">
                {pkg.inclusions.map((inclusion, index) => (
                  <li 
                    key={index} 
                    className="flex items-center"
                    data-testid={`text-package-inclusion-${pkg.category}-${index}`}
                  >
                    <Check className="text-teal mr-3 h-4 w-4 flex-shrink-0" />
                    {inclusion}
                  </li>
                ))}
              </ul>
              
              <Link href={`/booking?package=${pkg.id}`}>
                <Button
                  className={`w-full py-3 rounded-card transition-colors ${
                    pkg.category === 'executive'
                      ? 'btn-secondary'
                      : 'btn-primary'
                  }`}
                  onClick={() => handlePackageSelect(pkg.name)}
                  data-testid={`button-select-package-${pkg.category}`}
                >
                  Select Package
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
