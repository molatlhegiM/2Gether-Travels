import { Check, Crown, Users, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { TransferOption } from "@shared/schema";
import { useBookingStore } from "@/lib/booking-store";
import { useLocation } from "wouter";

interface TransferCardProps {
  transfer: TransferOption;
  className?: string;
}

export default function TransferCard({ transfer, className = "" }: TransferCardProps) {
  const { setTransfer, setCurrentStep } = useBookingStore();
  const [, setLocation] = useLocation();

  const handleScheduleTransfer = () => {
    setTransfer(transfer.id);
    setCurrentStep(3);
    setLocation("/booking");
  };

  const formatPrice = (price: string, priceType: string) => {
    const amount = `$${parseFloat(price).toLocaleString()}`;
    return `${amount}/${priceType === 'per_person' ? 'person' : 'trip'}`;
  };

  const getIcon = () => {
    if (transfer.type === "vip") return <Crown className="h-8 w-8 text-gold" />;
    if (transfer.type === "private-sedan") return <Car className="h-8 w-8 text-navy" />;
    return <Users className="h-8 w-8 text-teal" />;
  };

  const getCardStyle = () => {
    if (transfer.popular) return "border-2 border-gold relative";
    return "";
  };

  const getButtonStyle = () => {
    if (transfer.popular) return "btn-accent";
    return "btn-primary";
  };

  return (
    <Card className={`card-base text-center ${getCardStyle()} ${className}`} data-testid={`card-transfer-${transfer.id}`}>
      {transfer.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-gold text-navy px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </Badge>
        </div>
      )}
      
      {transfer.imageUrl ? (
        <img 
          src={transfer.imageUrl} 
          alt={transfer.name}
          className="w-full h-32 object-cover rounded-card mb-6" 
          data-testid={`img-transfer-${transfer.id}`}
        />
      ) : (
        <div className="w-full h-32 bg-gradient-to-r from-navy to-gold rounded-card mb-6 flex items-center justify-center">
          {getIcon()}
        </div>
      )}

      <CardHeader>
        <h3 className="font-heading font-semibold text-xl text-navy mb-4" data-testid={`heading-${transfer.id}`}>
          {transfer.name}
        </h3>
        <div className="mb-6">
          <span className="text-3xl font-bold text-navy" data-testid={`price-${transfer.id}`}>
            {formatPrice(transfer.price, transfer.priceType)}
          </span>
        </div>
      </CardHeader>

      <CardContent>
        <ul className="text-slate text-left space-y-2 mb-8">
          {transfer.features.map((feature, index) => (
            <li key={index} className="flex items-start" data-testid={`feature-${transfer.id}-${index}`}>
              <Check className="h-4 w-4 text-teal mr-2 mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button
          className={`w-full py-3 rounded-card transition-colors font-medium ${getButtonStyle()}`}
          onClick={handleScheduleTransfer}
          data-testid={`button-schedule-${transfer.id}`}
        >
          Schedule Transfer
        </Button>
      </CardContent>
    </Card>
  );
}
