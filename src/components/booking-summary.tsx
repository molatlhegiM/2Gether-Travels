import { useQuery } from "@tanstack/react-query";
import { Calendar, MapPin, Plane, Route, Users } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useBookingStore } from "@/lib/booking-store";
import type { Package, Hotel, TransferOption, Tour } from "@shared/schema";

interface BookingSummaryProps {
  compact?: boolean;
}

export default function BookingSummary({ compact = false }: BookingSummaryProps) {
  const { selection, totalAmount, travelerDetails } = useBookingStore();

  const { data: packages } = useQuery<Package[]>({ queryKey: ["/api/packages"] });
  const { data: hotels } = useQuery<Hotel[]>({ queryKey: ["/api/hotels"] });
  const { data: transfers } = useQuery<TransferOption[]>({ queryKey: ["/api/transfers"] });
  const { data: tours } = useQuery<Tour[]>({ queryKey: ["/api/tours"] });

  const selectedPackage = packages?.find(p => p.id === selection.packageId);
  const selectedHotel = hotels?.find(h => h.id === selection.hotelId);
  const selectedTransfer = transfers?.find(t => t.id === selection.transferId);
  const selectedTours = tours?.filter(t => selection.tourIds.includes(t.id)) || [];

  const hasSelections = selectedPackage || selectedHotel || selectedTransfer || selectedTours.length > 0;

  if (compact && !hasSelections) {
    return (
      <div className="text-center py-4">
        <p className="text-slate text-sm">No selections yet</p>
      </div>
    );
  }

  return (
    <Card className="card-base" data-testid="booking-summary">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-semibold text-lg text-navy">
            {compact ? "Booking Total" : "Your Itinerary"}
          </h3>
          <Badge className="bg-gold text-navy">AFIIA 2026</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {!compact && (
          <>
            {/* Event Details */}
            <div className="bg-mist rounded-card p-4">
              <div className="flex items-center text-navy mb-2">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="font-medium text-sm">Conference Dates</span>
              </div>
              <p className="text-slate text-sm">25-29 May 2026</p>
              
              <div className="flex items-center text-navy mb-2 mt-3">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="font-medium text-sm">Location</span>
              </div>
              <p className="text-slate text-sm">Cape Town, South Africa</p>
            </div>

            <Separator />
          </>
        )}

        {/* Selected Items */}
        <div className="space-y-3">
          {selectedPackage && (
            <div className="flex items-start justify-between" data-testid="summary-package">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-navy rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="font-medium text-navy text-sm">{selectedPackage.name} Package</p>
                  {!compact && selectedPackage.inclusions.length > 0 && (
                    <p className="text-slate text-xs mt-1">
                      {selectedPackage.inclusions.slice(0, 2).join(", ")}
                      {selectedPackage.inclusions.length > 2 && "..."}
                    </p>
                  )}
                </div>
              </div>
              <span className="text-navy font-medium text-sm">
                ${parseFloat(selectedPackage.price).toLocaleString()}
              </span>
            </div>
          )}

          {selectedHotel && (
            <div className="flex items-start justify-between" data-testid="summary-hotel">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-teal rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="font-medium text-navy text-sm">{selectedHotel.name}</p>
                  {!compact && selectedHotel.distanceToVenue && (
                    <p className="text-slate text-xs mt-1">{selectedHotel.distanceToVenue}</p>
                  )}
                </div>
              </div>
              <Badge variant="outline" className="text-xs">Included</Badge>
            </div>
          )}

          {selectedTransfer && (
            <div className="flex items-start justify-between" data-testid="summary-transfer">
              <div className="flex items-start space-x-2">
                <Plane className="h-3 w-3 text-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-navy text-sm">{selectedTransfer.name}</p>
                  {!compact && (
                    <p className="text-slate text-xs mt-1">Airport & venue transfers</p>
                  )}
                </div>
              </div>
              <span className="text-navy font-medium text-sm">
                ${parseFloat(selectedTransfer.price).toLocaleString()}
              </span>
            </div>
          )}

          {selectedTours.map((tour) => (
            <div key={tour.id} className="flex items-start justify-between" data-testid={`summary-tour-${tour.id}`}>
              <div className="flex items-start space-x-2">
                <Route className="h-3 w-3 text-afiia-green mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-navy text-sm">{tour.name}</p>
                  {!compact && (
                    <p className="text-slate text-xs mt-1">{tour.duration}</p>
                  )}
                </div>
              </div>
              <span className="text-navy font-medium text-sm">
                ${parseFloat(tour.price).toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        {hasSelections && (
          <>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="font-heading font-semibold text-navy">
                {compact ? "Total" : "Total Amount"}
              </span>
              <span className="font-heading font-bold text-xl text-navy" data-testid="total-amount">
                ${totalAmount.toLocaleString()}
              </span>
            </div>
          </>
        )}

        {!compact && travelerDetails && (
          <>
            <Separator />
            <div className="bg-mist rounded-card p-4">
              <div className="flex items-center text-navy mb-2">
                <Users className="h-4 w-4 mr-2" />
                <span className="font-medium text-sm">Traveler</span>
              </div>
              <p className="text-slate text-sm">{travelerDetails.name}</p>
              <p className="text-slate text-xs">{travelerDetails.email}</p>
            </div>
          </>
        )}

        {!hasSelections && !compact && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-mist rounded-full mx-auto mb-4 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-slate" />
            </div>
            <p className="text-slate text-sm">No selections yet</p>
            <p className="text-slate text-xs mt-1">Start by choosing a package</p>
          </div>
        )}

        {hasSelections && !compact && (
          <div className="pt-4">
            <Button className="w-full btn-accent" data-testid="button-continue-booking">
              Continue to Next Step
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
