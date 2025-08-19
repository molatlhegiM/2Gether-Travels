import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard, FileText, Shield, Building } from "lucide-react";
import { useBookingStore } from "@/lib/booking";
import { useCreateBooking } from "@/hooks/use-booking";
import { trackEvent } from "@/lib/analytics";
import { useToast } from "@/hooks/use-toast";

export default function PaymentStep() {
  const { 
    packageId, 
    hotelId, 
    transferId, 
    tourIds, 
    travelerDetails, 
    totalAmount,
    paymentMethod, 
    setPaymentMethod, 
    invoiceDetails, 
    setInvoiceDetails, 
    nextStep, 
    previousStep 
  } = useBookingStore();
  
  const { mutate: createBooking, isPending } = useCreateBooking();
  const { toast } = useToast();
  
  const [invoiceData, setInvoiceData] = useState({
    company: invoiceDetails?.company || "",
    vatNumber: invoiceDetails?.vatNumber || "",
    poNumber: invoiceDetails?.poNumber || "",
    billingAddress: invoiceDetails?.billingAddress || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateInvoiceForm = () => {
    if (paymentMethod !== 'invoice') return true;
    
    const newErrors: Record<string, string> = {};

    if (!invoiceData.company.trim()) {
      newErrors.company = "Company name is required for invoice payments";
    }

    if (!invoiceData.billingAddress.trim()) {
      newErrors.billingAddress = "Billing address is required for invoice payments";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateInvoiceForm()) {
      return;
    }

    if (paymentMethod === 'invoice') {
      setInvoiceDetails(invoiceData);
    }

    // Create booking
    const bookingData = {
      packageId: packageId || "",
      hotelId: hotelId || "",
      transferId: transferId || "",
      tourIds: tourIds,
      travelerDetails: travelerDetails!,
      paymentMethod: paymentMethod!,
      totalAmount: totalAmount,
      invoiceDetails: paymentMethod === 'invoice' ? invoiceData : undefined,
    };

    trackEvent('initiate_payment', 'booking', `payment_${paymentMethod}`);

    createBooking(bookingData, {
      onSuccess: (booking) => {
        toast({
          title: "Booking Created!",
          description: `Your booking reference is ${booking.bookingReference}`,
        });
        trackEvent('booking_success', 'booking', `booking_${booking.id}`);
        nextStep();
      },
      onError: (error) => {
        toast({
          title: "Booking Failed",
          description: "Please try again or contact support for assistance.",
          variant: "destructive",
        });
        console.error('Booking error:', error);
      },
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setInvoiceData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const formatAmount = (amount: number) => {
    return `$${(amount / 100).toLocaleString()}`;
  };

  return (
    <div className="bg-white rounded-card shadow-soft p-8" data-testid="payment-step">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-inter font-bold text-2xl text-navy" data-testid="text-payment-step-title">
          Payment & Confirmation
        </h2>
        <Button
          variant="outline"
          onClick={previousStep}
          className="inline-flex items-center"
          data-testid="button-payment-step-back"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Payment Method Selection */}
        <div>
          <Label className="text-navy font-medium text-lg mb-4 block">
            Choose Payment Method
          </Label>
          <RadioGroup 
            value={paymentMethod} 
            onValueChange={(value: 'card' | 'invoice') => setPaymentMethod(value)}
            className="space-y-4"
          >
            <div className="flex items-start space-x-3">
              <RadioGroupItem value="card" id="card" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="card" className="cursor-pointer">
                  <Card className="hover:bg-mist transition-colors">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="h-5 w-5 text-teal" />
                        <CardTitle className="text-lg">Credit Card</CardTitle>
                      </div>
                      <CardDescription>
                        Secure payment processing with instant confirmation
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Label>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <RadioGroupItem value="invoice" id="invoice" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="invoice" className="cursor-pointer">
                  <Card className="hover:bg-mist transition-colors">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-gold" />
                        <CardTitle className="text-lg">Corporate Invoice</CardTitle>
                      </div>
                      <CardDescription>
                        NET 30 payment terms. Perfect for corporate bookings and expense processing.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* Invoice Details Form */}
        {paymentMethod === 'invoice' && (
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Building className="h-5 w-5 text-navy" />
                <CardTitle>Invoice Details</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company" className="text-navy font-medium">
                    Company Name *
                  </Label>
                  <Input
                    id="company"
                    type="text"
                    value={invoiceData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    className={`mt-1 ${errors.company ? 'border-red-500' : ''}`}
                    placeholder="Enter company name"
                    data-testid="input-invoice-company"
                  />
                  {errors.company && (
                    <p className="text-red-500 text-sm mt-1" data-testid="error-invoice-company">
                      {errors.company}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="vatNumber" className="text-navy font-medium">
                    VAT/Tax Number
                  </Label>
                  <Input
                    id="vatNumber"
                    type="text"
                    value={invoiceData.vatNumber}
                    onChange={(e) => handleInputChange("vatNumber", e.target.value)}
                    className="mt-1"
                    placeholder="Enter VAT or tax number (optional)"
                    data-testid="input-invoice-vat"
                  />
                </div>

                <div>
                  <Label htmlFor="poNumber" className="text-navy font-medium">
                    Purchase Order Number
                  </Label>
                  <Input
                    id="poNumber"
                    type="text"
                    value={invoiceData.poNumber}
                    onChange={(e) => handleInputChange("poNumber", e.target.value)}
                    className="mt-1"
                    placeholder="Enter PO number (optional)"
                    data-testid="input-invoice-po"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="billingAddress" className="text-navy font-medium">
                    Billing Address *
                  </Label>
                  <Textarea
                    id="billingAddress"
                    value={invoiceData.billingAddress}
                    onChange={(e) => handleInputChange("billingAddress", e.target.value)}
                    className={`mt-1 ${errors.billingAddress ? 'border-red-500' : ''}`}
                    placeholder="Enter complete billing address"
                    rows={3}
                    data-testid="textarea-invoice-address"
                  />
                  {errors.billingAddress && (
                    <p className="text-red-500 text-sm mt-1" data-testid="error-invoice-address">
                      {errors.billingAddress}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Security Note */}
        <Card className="bg-mist border-teal/20">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-teal mt-1" />
              <div>
                <h4 className="font-medium text-navy mb-2">Secure & Protected</h4>
                <p className="text-slate text-sm">
                  Your personal and payment information is protected with industry-standard encryption. 
                  We never store credit card details on our servers.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Amount */}
        <div className="bg-navy text-white rounded-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-inter font-semibold text-lg">Total Amount</h3>
              <p className="text-white/80 text-sm">
                {paymentMethod === 'invoice' ? 'Invoice will be sent within 24 hours' : 'Pay securely with your credit card'}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gold" data-testid="text-payment-total">
                {formatAmount(totalAmount)}
              </div>
              <div className="text-white/80 text-sm">USD</div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <Button
            type="submit"
            className="btn-primary px-12 py-4 text-lg"
            disabled={isPending || !paymentMethod}
            data-testid="button-confirm-booking"
          >
            {isPending 
              ? "Creating Booking..." 
              : paymentMethod === 'invoice' 
                ? "Confirm Booking" 
                : "Proceed to Payment"
            }
          </Button>
        </div>
      </form>
    </div>
  );
}
