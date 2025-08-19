import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Check, CreditCard, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useBookingStore } from "@/lib/booking-store";
import { toast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import PackageCard from "@/components/package-card";
import HotelCard from "@/components/hotel-card";
import TransferCard from "@/components/transfer-card";
import TourCard from "@/components/tour-card";
import type { Package, Hotel, TransferOption, Tour, Booking } from "@shared/schema";

const STEPS = [
  { id: 1, title: "Package", description: "Choose your travel package" },
  { id: 2, title: "Hotel", description: "Select accommodation" },
  { id: 3, title: "Transfers", description: "Airport & venue transfers" },
  { id: 4, title: "Tours", description: "Optional tours & activities" },
  { id: 5, title: "Details", description: "Traveler information" },
  { id: 6, title: "Payment", description: "Complete booking" },
];

export default function BookingWizard() {
  const { 
    selection, 
    currentStep, 
    travelerDetails,
    invoiceDetails,
    totalAmount,
    setCurrentStep, 
    setTravelerDetails,
    setInvoiceDetails,
    setTotalAmount,
    clearBooking 
  } = useBookingStore();
  
  const [, setLocation] = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const queryClient = useQueryClient();

  const { data: packages } = useQuery<Package[]>({ queryKey: ["/api/packages"] });
  const { data: hotels } = useQuery<Hotel[]>({ queryKey: ["/api/hotels"] });
  const { data: transfers } = useQuery<TransferOption[]>({ queryKey: ["/api/transfers"] });
  const { data: tours } = useQuery<Tour[]>({ queryKey: ["/api/tours"] });

  const selectedPackage = packages?.find(p => p.id === selection.packageId);
  const selectedHotel = hotels?.find(h => h.id === selection.hotelId);
  const selectedTransfer = transfers?.find(t => t.id === selection.transferId);
  const selectedTours = tours?.filter(t => selection.tourIds.includes(t.id)) || [];

  // Calculate total amount
  useEffect(() => {
    let total = 0;
    if (selectedPackage) total += parseFloat(selectedPackage.price);
    if (selectedTransfer) total += parseFloat(selectedTransfer.price);
    selectedTours.forEach(tour => total += parseFloat(tour.price));
    setTotalAmount(total);
  }, [selectedPackage, selectedTransfer, selectedTours, setTotalAmount]);

  const bookingMutation = useMutation({
    mutationFn: async (bookingData: any) => {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      if (!response.ok) throw new Error("Booking failed");
      return response.json();
    },
    onSuccess: (booking: Booking) => {
      toast({
        title: "Booking Confirmed!",
        description: `Your booking reference is ${booking.id}. Confirmation email sent.`,
      });
      clearBooking();
      setLocation(`/booking/confirmation/${booking.id}`);
    },
    onError: () => {
      toast({
        title: "Booking Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    },
  });

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinishBooking = async () => {
    if (!travelerDetails || !selectedPackage) return;

    setIsProcessing(true);
    
    const bookingData = {
      packageId: selection.packageId,
      hotelId: selection.hotelId,
      transferId: selection.transferId,
      tourIds: selection.tourIds,
      travelerDetails,
      paymentDetails: {
        method: paymentMethod,
        status: paymentMethod === "invoice" ? "pending" : "completed",
        amount: totalAmount,
        currency: "USD",
      },
      invoiceDetails: paymentMethod === "invoice" ? invoiceDetails : undefined,
      bookingStatus: "confirmed",
      totalAmount: totalAmount.toString(),
      currency: "USD",
      checkInDate: selection.checkInDate,
      checkOutDate: selection.checkOutDate,
    };

    await bookingMutation.mutateAsync(bookingData);
    setIsProcessing(false);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return !!selection.packageId;
      case 2: return !!selection.hotelId;
      case 3: return !!selection.transferId;
      case 4: return true; // Tours are optional
      case 5: return !!travelerDetails?.name && !!travelerDetails?.email;
      case 6: return paymentMethod === "invoice" ? !!invoiceDetails?.company : true;
      default: return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2 className="font-heading font-bold text-2xl text-navy mb-6" data-testid="heading-step-package">
              Choose Your Travel Package
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {packages?.map((pkg) => (
                <PackageCard key={pkg.id} package={pkg} />
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h2 className="font-heading font-bold text-2xl text-navy mb-6" data-testid="heading-step-hotel">
              Select Your Hotel
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {hotels?.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h2 className="font-heading font-bold text-2xl text-navy mb-6" data-testid="heading-step-transfers">
              Choose Transfer Service
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {transfers?.map((transfer) => (
                <TransferCard key={transfer.id} transfer={transfer} />
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <h2 className="font-heading font-bold text-2xl text-navy mb-6" data-testid="heading-step-tours">
              Optional Tours & Activities
            </h2>
            <p className="text-slate mb-8">Select tours to enhance your conference experience (optional)</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tours?.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div>
            <h2 className="font-heading font-bold text-2xl text-navy mb-6" data-testid="heading-step-details">
              Traveler Information
            </h2>
            <Card className="card-base">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="traveler-name">Full Name</Label>
                    <Input
                      id="traveler-name"
                      value={travelerDetails?.name || ""}
                      onChange={(e) => setTravelerDetails({ 
                        ...travelerDetails,
                        name: e.target.value,
                        email: travelerDetails?.email || "",
                        phone: travelerDetails?.phone || "",
                        country: travelerDetails?.country || "",
                      })}
                      required
                      data-testid="input-traveler-name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="traveler-email">Email Address</Label>
                    <Input
                      id="traveler-email"
                      type="email"
                      value={travelerDetails?.email || ""}
                      onChange={(e) => setTravelerDetails({ 
                        ...travelerDetails,
                        name: travelerDetails?.name || "",
                        email: e.target.value,
                        phone: travelerDetails?.phone || "",
                        country: travelerDetails?.country || "",
                      })}
                      required
                      data-testid="input-traveler-email"
                    />
                  </div>

                  <div>
                    <Label htmlFor="traveler-phone">Phone Number</Label>
                    <Input
                      id="traveler-phone"
                      type="tel"
                      value={travelerDetails?.phone || ""}
                      onChange={(e) => setTravelerDetails({ 
                        ...travelerDetails,
                        name: travelerDetails?.name || "",
                        email: travelerDetails?.email || "",
                        phone: e.target.value,
                        country: travelerDetails?.country || "",
                      })}
                      data-testid="input-traveler-phone"
                    />
                  </div>

                  <div>
                    <Label htmlFor="traveler-country">Country</Label>
                    <Input
                      id="traveler-country"
                      value={travelerDetails?.country || ""}
                      onChange={(e) => setTravelerDetails({ 
                        ...travelerDetails,
                        name: travelerDetails?.name || "",
                        email: travelerDetails?.email || "",
                        phone: travelerDetails?.phone || "",
                        country: e.target.value,
                      })}
                      required
                      data-testid="input-traveler-country"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="special-requests">Special Requests (Optional)</Label>
                    <Textarea
                      id="special-requests"
                      placeholder="Any dietary requirements, accessibility needs, or special requests..."
                      value={travelerDetails?.specialRequests || ""}
                      onChange={(e) => setTravelerDetails({ 
                        ...travelerDetails,
                        name: travelerDetails?.name || "",
                        email: travelerDetails?.email || "",
                        phone: travelerDetails?.phone || "",
                        country: travelerDetails?.country || "",
                        specialRequests: e.target.value,
                      })}
                      data-testid="textarea-special-requests"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 6:
        return (
          <div>
            <h2 className="font-heading font-bold text-2xl text-navy mb-6" data-testid="heading-step-payment">
              Payment & Confirmation
            </h2>
            
            <div className="space-y-8">
              {/* Payment Method Selection */}
              <Card className="card-base">
                <CardHeader>
                  <h3 className="font-heading font-semibold text-lg text-navy">Payment Method</h3>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" data-testid="radio-card" />
                      <Label htmlFor="card" className="cursor-pointer flex items-center">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Credit Card (Secure Payment)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="invoice" id="invoice" data-testid="radio-invoice" />
                      <Label htmlFor="invoice" className="cursor-pointer flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        Corporate Invoice (NET 30)
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Invoice Details */}
              {paymentMethod === "invoice" && (
                <Card className="card-base">
                  <CardHeader>
                    <h3 className="font-heading font-semibold text-lg text-navy">Invoice Details</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="company">Company Name</Label>
                        <Input
                          id="company"
                          value={invoiceDetails?.company || ""}
                          onChange={(e) => setInvoiceDetails({ 
                            ...invoiceDetails,
                            company: e.target.value 
                          })}
                          required
                          data-testid="input-company"
                        />
                      </div>

                      <div>
                        <Label htmlFor="vat-number">VAT/Tax Number</Label>
                        <Input
                          id="vat-number"
                          value={invoiceDetails?.vatNumber || ""}
                          onChange={(e) => setInvoiceDetails({ 
                            ...invoiceDetails,
                            vatNumber: e.target.value 
                          })}
                          data-testid="input-vat-number"
                        />
                      </div>

                      <div>
                        <Label htmlFor="po-number">PO Number (Optional)</Label>
                        <Input
                          id="po-number"
                          value={invoiceDetails?.poNumber || ""}
                          onChange={(e) => setInvoiceDetails({ 
                            ...invoiceDetails,
                            poNumber: e.target.value 
                          })}
                          data-testid="input-po-number"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="billing-address">Billing Address</Label>
                        <Textarea
                          id="billing-address"
                          value={invoiceDetails?.billingAddress || ""}
                          onChange={(e) => setInvoiceDetails({ 
                            ...invoiceDetails,
                            billingAddress: e.target.value 
                          })}
                          data-testid="textarea-billing-address"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Booking Summary */}
              <Card className="card-base">
                <CardHeader>
                  <h3 className="font-heading font-semibold text-lg text-navy">Booking Summary</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedPackage && (
                      <div className="flex justify-between">
                        <span>{selectedPackage.name} Package</span>
                        <span>${parseFloat(selectedPackage.price).toLocaleString()}</span>
                      </div>
                    )}
                    
                    {selectedTransfer && (
                      <div className="flex justify-between">
                        <span>{selectedTransfer.name} Transfer</span>
                        <span>${parseFloat(selectedTransfer.price).toLocaleString()}</span>
                      </div>
                    )}
                    
                    {selectedTours.map((tour) => (
                      <div key={tour.id} className="flex justify-between">
                        <span>{tour.name}</span>
                        <span>${parseFloat(tour.price).toLocaleString()}</span>
                      </div>
                    ))}
                    
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return <div>Step not found</div>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Progress Steps */}
      <Card className="card-base">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                  ${step.id === currentStep ? 'bg-navy text-white' : 
                    step.id < currentStep ? 'bg-teal text-white' : 'bg-mist text-slate'}
                `}>
                  {step.id < currentStep ? <Check className="h-4 w-4" /> : step.id}
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-navy">{step.title}</div>
                  <div className="text-xs text-slate">{step.description}</div>
                </div>
                {index < STEPS.length - 1 && (
                  <ChevronRight className="h-4 w-4 text-slate mx-4" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <div className="min-h-[400px]">
        {renderStepContent()}
      </div>

      {/* Navigation */}
      <Card className="card-base">
        <CardContent className="p-6">
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrev}
              disabled={currentStep === 1}
              data-testid="button-prev-step"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {currentStep < STEPS.length ? (
              <Button 
                onClick={handleNext}
                disabled={!canProceed()}
                className="btn-primary"
                data-testid="button-next-step"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={handleFinishBooking}
                disabled={!canProceed() || isProcessing}
                className="btn-accent"
                data-testid="button-confirm-booking"
              >
                {isProcessing ? "Processing..." : "Confirm Booking"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
