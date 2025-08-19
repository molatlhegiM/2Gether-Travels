import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Calendar, Users, Clock } from "lucide-react";
import { useBookingStore } from "@/lib/booking";
import { usePackage, useHotel, useTransferOption, useTours } from "@/hooks/use-booking";
import { useEffect } from "react";

export default function ItinerarySummary() {
  const { 
    packageId, 
    hotelId, 
    transferId, 
    tourIds, 
    currentStep,
    totalAmount,
    setTotalAmount 
  } = useBookingStore();

  const { data: selectedPackage } = usePackage(packageId || "");
  const { data: selectedHotel } = useHotel(hotelId || "");
  const { data: selectedTransfer } = useTransferOption(transferId || "");
  const { data: allTours } = useTours();
  
  const selectedTours = allTours?.filter(tour => tourIds.includes(tour.id)) || [];

  // Calculate total amount
  useEffect(() => {
    let total = 0;
    
    if (selectedPackage) total += selectedPackage.price;
    if (selectedHotel) total += selectedHotel.pricePerNight * 4; // 4 nights
    if (selectedTransfer) total += selectedTransfer.price;
    if (selectedTours.length > 0) {
      total += selectedTours.reduce((sum, tour) => sum + tour.price, 0);
    }
    
    setTotalAmount(total);
  }, [selectedPackage, selectedHotel, selectedTransfer, selectedTours, setTotalAmount]);

  const formatPrice = (price: number) => {
    return `$${(price / 100).toLocaleString()}`;
  };

  const isEmpty = !packageId && !hotelId && !transferId && tourIds.length === 0;

  return (
    <div className="lg:sticky lg:top-8" data-testid="itinerary-summary">
      <Card className="shadow-soft">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-teal" />
            <span>Your Itinerary</span>
          </CardTitle>
          <div className="flex items-center space-x-4 text-sm text-slate">
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>Cape Town</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>May 25-29, 2026</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {isEmpty ? (
            <div className="text-center py-8 text-slate">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p>Your selected items will appear here as you build your itinerary.</p>
            </div>
          ) : (
            <>
              {/* Selected Package */}
              {selectedPackage && (
                <div className="space-y-2" data-testid="summary-package">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-navy">Package</h4>
                    <Badge variant="secondary" className="text-xs">
                      {formatPrice(selectedPackage.price)}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate">{selectedPackage.name}</p>
                  <Separator />
                </div>
              )}

              {/* Selected Hotel */}
              {selectedHotel && (
                <div className="space-y-2" data-testid="summary-hotel">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-navy">Hotel</h4>
                    <Badge variant="secondary" className="text-xs">
                      {formatPrice(selectedHotel.pricePerNight * 4)}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate">{selectedHotel.name}</p>
                  <p className="text-xs text-slate">4 nights • {selectedHotel.distanceToVenue}</p>
                  <Separator />
                </div>
              )}

              {/* Selected Transfer */}
              {selectedTransfer && (
                <div className="space-y-2" data-testid="summary-transfer">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-navy">Transfers</h4>
                    <Badge variant="secondary" className="text-xs">
                      {formatPrice(selectedTransfer.price)}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate">{selectedTransfer.name}</p>
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3 text-slate" />
                    <span className="text-xs text-slate">Up to {selectedTransfer.capacity} passengers</span>
                  </div>
                  <Separator />
                </div>
              )}

              {/* Selected Tours */}
              {selectedTours.length > 0 && (
                <div className="space-y-2" data-testid="summary-tours">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-navy">Tours</h4>
                    <Badge variant="secondary" className="text-xs">
                      {formatPrice(selectedTours.reduce((sum, tour) => sum + tour.price, 0))}
                    </Badge>
                  </div>
                  {selectedTours.map((tour) => (
                    <div key={tour.id} className="pl-2 border-l-2 border-teal/20">
                      <p className="text-sm text-slate">{tour.name}</p>
                      <div className="flex items-center space-x-3 text-xs text-slate">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{tour.duration}</span>
                        </div>
                        <span>{formatPrice(tour.price)}</span>
                      </div>
                    </div>
                  ))}
                  <Separator />
                </div>
              )}

              {/* Total */}
              <div className="bg-navy text-white rounded-card p-4 mt-6">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total</span>
                  <span className="text-xl font-bold text-gold" data-testid="text-itinerary-total">
                    {formatPrice(totalAmount)}
                  </span>
                </div>
                <p className="text-xs text-white/70 mt-1">
                  Final amount will be calculated at checkout
                </p>
              </div>
            </>
          )}

          {/* Progress Indicator */}
          {currentStep < 7 && (
            <div className="text-center pt-4 border-t">
              <p className="text-xs text-slate">
                Step {currentStep} of 7
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-teal h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep - 1) / 6) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
