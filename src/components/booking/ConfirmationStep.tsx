import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Download, MessageSquare, Mail, Calendar, MapPin, Phone } from "lucide-react";
import { useBookingStore } from "@/lib/booking";
import { usePackage, useHotel, useTransferOption, useTours } from "@/hooks/use-booking";
import { trackEvent } from "@/lib/analytics";
import { openWhatsApp } from "@/lib/booking";

export default function ConfirmationStep() {
  const { 
    packageId, 
    hotelId, 
    transferId, 
    tourIds, 
    travelerDetails, 
    paymentMethod, 
    totalAmount,
    resetBooking 
  } = useBookingStore();

  const { data: selectedPackage } = usePackage(packageId || "");
  const { data: selectedHotel } = useHotel(hotelId || "");
  const { data: selectedTransfer } = useTransferOption(transferId || "");
  const { data: allTours } = useTours();
  
  const [bookingReference] = useState(`AF2026-${Math.random().toString(36).substr(2, 8).toUpperCase()}`);
  const selectedTours = allTours?.filter(tour => tourIds.includes(tour.id)) || [];

  useEffect(() => {
    trackEvent('booking_confirmation_view', 'booking', 'confirmation_step');
  }, []);

  const handleDownloadItinerary = () => {
    trackEvent('download_itinerary', 'booking', 'confirmation_download');
    // TODO: Implement PDF generation
    console.log('Download itinerary PDF');
  };

  const handleWhatsAppSupport = () => {
    trackEvent('contact_whatsapp_confirmation', 'support', 'confirmation_whatsapp');
    openWhatsApp(`Hello! I've just completed my AFIIA 2026 booking (Reference: ${bookingReference}). I'd like to speak with the concierge team.`);
  };

  const handleNewBooking = () => {
    resetBooking();
    trackEvent('start_new_booking', 'booking', 'new_booking_from_confirmation');
    window.location.href = '/';
  };

  const formatAmount = (amount: number) => {
    return `$${(amount / 100).toLocaleString()}`;
  };

  return (
    <div className="bg-white rounded-card shadow-soft p-8 max-w-4xl mx-auto" data-testid="confirmation-step">
      {/* Success Header */}
      <div className="text-center mb-8">
        <CheckCircle className="h-16 w-16 text-afiia-green mx-auto mb-4" />
        <h1 className="font-inter font-bold text-3xl text-navy mb-2" data-testid="text-confirmation-title">
          Booking Confirmed!
        </h1>
        <p className="text-slate text-lg mb-4">
          Thank you for choosing 2Gether Travels for your AFIIA 2026 experience.
        </p>
        <div className="bg-mist rounded-card p-4 inline-block">
          <p className="text-sm text-slate mb-1">Your booking reference</p>
          <p className="font-inter font-bold text-xl text-navy" data-testid="text-booking-reference">
            {bookingReference}
          </p>
        </div>
      </div>

      {/* Booking Summary */}
      <div className="space-y-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-teal" />
              <span>Conference Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate mb-1">Event</p>
                <p className="font-medium text-navy">AFIIA 2026 Annual Conference</p>
              </div>
              <div>
                <p className="text-sm text-slate mb-1">Dates</p>
                <p className="font-medium text-navy">25-29 May 2026</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-slate mb-1">Location</p>
                <p className="font-medium text-navy flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  Cape Town, South Africa
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Travel Package</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedPackage && (
              <div className="flex items-center justify-between p-4 bg-mist rounded-card">
                <div>
                  <h4 className="font-medium text-navy">{selectedPackage.name} Package</h4>
                  <p className="text-sm text-slate">{selectedPackage.description}</p>
                </div>
                <Badge variant="secondary">{formatAmount(selectedPackage.price)}</Badge>
              </div>
            )}

            {selectedHotel && (
              <div className="flex items-center justify-between p-4 bg-mist rounded-card">
                <div>
                  <h4 className="font-medium text-navy">{selectedHotel.name}</h4>
                  <p className="text-sm text-slate">{selectedHotel.distanceToVenue} from venue</p>
                </div>
                <Badge variant="secondary">{formatAmount(selectedHotel.pricePerNight)}/night</Badge>
              </div>
            )}

            {selectedTransfer && (
              <div className="flex items-center justify-between p-4 bg-mist rounded-card">
                <div>
                  <h4 className="font-medium text-navy">{selectedTransfer.name}</h4>
                  <p className="text-sm text-slate">{selectedTransfer.description}</p>
                </div>
                <Badge variant="secondary">{formatAmount(selectedTransfer.price)}</Badge>
              </div>
            )}

            {selectedTours.length > 0 && (
              <div>
                <h4 className="font-medium text-navy mb-3">Selected Tours</h4>
                {selectedTours.map((tour) => (
                  <div key={tour.id} className="flex items-center justify-between p-4 bg-mist rounded-card mb-2">
                    <div>
                      <h5 className="font-medium text-navy">{tour.name}</h5>
                      <p className="text-sm text-slate">{tour.duration}</p>
                    </div>
                    <Badge variant="secondary">{formatAmount(tour.price)}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Traveler Details */}
        <Card>
          <CardHeader>
            <CardTitle>Traveler Information</CardTitle>
          </CardHeader>
          <CardContent>
            {travelerDetails && (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate mb-1">Full Name</p>
                  <p className="font-medium text-navy" data-testid="text-confirmation-name">
                    {travelerDetails.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate mb-1">Email</p>
                  <p className="font-medium text-navy" data-testid="text-confirmation-email">
                    {travelerDetails.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate mb-1">Phone</p>
                  <p className="font-medium text-navy" data-testid="text-confirmation-phone">
                    {travelerDetails.phone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate mb-1">Country</p>
                  <p className="font-medium text-navy">{travelerDetails.country}</p>
                </div>
                {travelerDetails.company && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-slate mb-1">Company</p>
                    <p className="font-medium text-navy">{travelerDetails.company}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-navy text-white rounded-card">
              <div>
                <h4 className="font-medium">Total Amount</h4>
                <p className="text-sm text-white/80">
                  {paymentMethod === 'invoice' 
                    ? 'Invoice will be sent within 24 hours' 
                    : 'Payment processed successfully'
                  }
                </p>
              </div>
              <div className="text-2xl font-bold text-gold" data-testid="text-confirmation-total">
                {formatAmount(totalAmount)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>What Happens Next?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Mail className="h-5 w-5 text-teal mt-1" />
              <div>
                <h4 className="font-medium text-navy">Email Confirmation</h4>
                <p className="text-sm text-slate">
                  You'll receive a detailed confirmation email with your complete itinerary within 15 minutes.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Phone className="h-5 w-5 text-teal mt-1" />
              <div>
                <h4 className="font-medium text-navy">Concierge Contact</h4>
                <p className="text-sm text-slate">
                  Our team will contact you 7 days before travel to confirm all arrangements and provide final details.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <MessageSquare className="h-5 w-5 text-teal mt-1" />
              <div>
                <h4 className="font-medium text-navy">24/7 Support</h4>
                <p className="text-sm text-slate">
                  Our WhatsApp concierge service is available anytime for questions or changes to your booking.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={handleDownloadItinerary}
          variant="outline"
          className="inline-flex items-center"
          data-testid="button-download-itinerary"
        >
          <Download className="mr-2 h-4 w-4" />
          Download Itinerary
        </Button>
        <Button
          onClick={handleWhatsAppSupport}
          className="bg-afiia-green hover:bg-afiia-green/90 text-white inline-flex items-center"
          data-testid="button-whatsapp-support"
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Chat with Concierge
        </Button>
        <Button
          onClick={handleNewBooking}
          variant="outline"
          data-testid="button-new-booking"
        >
          Book Another Trip
        </Button>
      </div>
    </div>
  );
}
