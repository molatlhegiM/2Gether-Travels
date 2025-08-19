import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, ArrowLeft } from "lucide-react";
import { useTransferOptions } from "@/hooks/use-booking";
import { useBookingStore } from "@/lib/booking";
import { trackEvent } from "@/lib/analytics";

export default function TransferStep() {
  const { data: transferOptions, isLoading } = useTransferOptions();
  const { transferId, setTransfer, nextStep, previousStep } = useBookingStore();

  const handleTransferSelect = (transferIdParam: string, transferName: string) => {
    setTransfer(transferIdParam);
    trackEvent('select_transfer', 'booking', `transfer_${transferName.toLowerCase().replace(/\s+/g, '_')}`);
    nextStep();
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
      <div className="bg-white rounded-card shadow-soft p-8" data-testid="transfer-step-loading">
        <div className="flex items-center justify-between mb-8">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border rounded-card p-6 text-center animate-pulse">
              <div className="w-full h-32 bg-gray-200 rounded mb-6"></div>
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
    );
  }

  return (
    <div className="bg-white rounded-card shadow-soft p-8" data-testid="transfer-step">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-inter font-bold text-2xl text-navy" data-testid="text-transfer-step-title">
          Book Your Transfers
        </h2>
        <Button
          variant="outline"
          onClick={previousStep}
          className="inline-flex items-center"
          data-testid="button-transfer-step-back"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {transferOptions?.map((transfer) => (
          <div
            key={transfer.id}
            className={`border-2 rounded-card p-6 text-center cursor-pointer transition-all hover:shadow-lg ${
              transferId === transfer.id
                ? 'border-gold bg-gold/5'
                : transfer.isPopular
                ? 'border-gold/30'
                : 'border-gray-200 hover:border-teal/30'
            } ${transfer.isPopular ? 'relative' : ''}`}
            onClick={() => handleTransferSelect(transfer.id, transfer.name)}
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
              />
            ) : (
              <div className="w-full h-32 bg-gradient-to-r from-navy to-gold rounded-card mb-6 flex items-center justify-center">
                <Crown className="text-white text-3xl h-12 w-12" />
              </div>
            )}
            
            <h3 className="font-inter font-semibold text-xl text-navy mb-4">
              {transfer.name}
            </h3>
            
            <div className="mb-6">
              <span className="text-2xl font-bold text-navy">{formatPrice(transfer.price)}</span>
              <span className="text-slate">/{transfer.type === 'shared' ? 'person' : 'trip'}</span>
            </div>
            
            <ul className="text-slate text-left space-y-2 mb-8 text-sm">
              {transfer.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="text-teal mr-2 h-4 w-4 flex-shrink-0 mt-0.5" />
                  {feature}
                </li>
              ))}
            </ul>
            
            <Button
              className={`w-full transition-colors ${
                transferId === transfer.id
                  ? 'bg-teal text-white'
                  : transfer.isPopular
                  ? 'btn-secondary'
                  : 'btn-primary'
              }`}
            >
              {transferId === transfer.id ? 'Selected' : 'Select Transfer'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
