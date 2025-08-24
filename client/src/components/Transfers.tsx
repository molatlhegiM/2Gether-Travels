import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown } from "lucide-react";
import { Link } from "wouter";
import { trackEvent } from "@/lib/analytics";
import { useTransferOptions } from "@/hooks/use-booking";

export default function Transfers() {
  const { data: transferOptions, isLoading } = useTransferOptions();

  const handleScheduleTransfer = (transferType: string) => {
    trackEvent('click_schedule_transfer', 'transfers', `schedule_${transferType.toLowerCase().replace(/\s+/g, '_')}`);
  };

  const formatPrice = (price: number) => {
    return `$${(price / 100).toLocaleString()}`;
  };

  const getTransferImage = (type: string) => {
    switch (type) {
      case 'shared':
        return 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300';
      case 'private':
        return 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300';
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <section className="py-16 lg:py-24" data-testid="section-transfers-loading">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-card shadow-soft p-8 text-center animate-pulse">
                <div className="w-full h-32 bg-gray-200 rounded-card mb-6"></div>
                <div className="h-6 bg-gray-200 rounded w-24 mx-auto mb-4"></div>
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
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24" data-testid="section-transfers">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            className="font-inter font-bold text-3xl lg:text-4xl text-navy mb-4"
            data-testid="text-transfers-title"
          >
            Conference Transfers
          </h2>
          <p 
            className="text-slate text-lg max-w-2xl mx-auto"
            data-testid="text-transfers-subtitle"
          >
            From touchdown to takeoff, we've got you covered.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {transferOptions?.map((transfer) => (
            <div
              key={transfer.id}
              className={`bg-white rounded-card shadow-soft p-8 text-center hover:shadow-lg transition-shadow ${
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
              
              {/* Transfer Image or Icon */}
              {getTransferImage(transfer.type) ? (
                <img
                  src={getTransferImage(transfer.type)}
                  alt={`${transfer.name} vehicle`}
                  className="w-full h-32 object-cover rounded-card mb-6"
                  data-testid={`img-transfer-${transfer.type}`}
                />
              ) : (
                <div className="w-full h-32 bg-gradient-to-r from-navy to-gold rounded-card mb-6 flex items-center justify-center">
                  <Crown className="text-white text-3xl h-12 w-12" />
                </div>
              )}
              
              <h3 
                className="font-inter font-semibold text-xl text-navy mb-4"
                data-testid={`text-transfer-name-${transfer.type}`}
              >
                {transfer.name}
              </h3>
              
              <div className="mb-6" data-testid={`text-transfer-price-${transfer.type}`}>
                <span className="text-3xl font-bold text-navy">{formatPrice(transfer.price)}</span>
                <span className="text-slate">/{transfer.type === 'shared' ? 'person' : 'trip'}</span>
              </div>
              
              <ul className="text-slate text-left space-y-2 mb-8">
                {transfer.features.map((feature, index) => (
                  <li 
                    key={index} 
                    className="flex items-start"
                    data-testid={`text-transfer-feature-${transfer.type}-${index}`}
                  >
                    <Check className="text-teal mr-2 h-4 w-4 flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Link href={`/booking?transfer=${transfer.id}`}>
                <Button
                  className={`w-full py-3 rounded-card transition-colors ${
                    transfer.isPopular ? 'btn-secondary' : 'btn-primary'
                  }`}
                  onClick={() => handleScheduleTransfer(transfer.name)}
                  data-testid={`button-schedule-transfer-${transfer.type}`}
                >
                  Schedule Transfer
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
