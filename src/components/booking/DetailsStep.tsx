import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useBookingStore } from "@/lib/booking";
import { trackEvent } from "@/lib/analytics";

const countries = [
  "South Africa", "Nigeria", "Kenya", "Ghana", "Egypt", "Morocco", "Tunisia",
  "Algeria", "Angola", "Cameroon", "Ethiopia", "Tanzania", "Uganda", "Zambia",
  "Zimbabwe", "Botswana", "Namibia", "Mauritius", "Senegal", "Mali", "Other"
];

export default function DetailsStep() {
  const { travelerDetails, setTravelerDetails, nextStep, previousStep } = useBookingStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    name: travelerDetails?.name || "",
    email: travelerDetails?.email || "",
    phone: travelerDetails?.phone || "",
    country: travelerDetails?.country || "",
    company: travelerDetails?.company || "",
    specialRequests: travelerDetails?.specialRequests || "",
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.country) {
      newErrors.country = "Please select your country";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setTravelerDetails(formData);
    trackEvent('complete_traveler_details', 'booking', 'traveler_details_step');
    nextStep();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="bg-white rounded-card shadow-soft p-8" data-testid="details-step">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-inter font-bold text-2xl text-navy" data-testid="text-details-step-title">
          Your Details
        </h2>
        <Button
          variant="outline"
          onClick={previousStep}
          className="inline-flex items-center"
          data-testid="button-details-step-back"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name" className="text-navy font-medium">
              Full Name *
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={`mt-1 ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Enter your full name"
              data-testid="input-traveler-name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1" data-testid="error-traveler-name">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="email" className="text-navy font-medium">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
              placeholder="Enter your email address"
              data-testid="input-traveler-email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1" data-testid="error-traveler-email">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="phone" className="text-navy font-medium">
              Phone Number *
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className={`mt-1 ${errors.phone ? 'border-red-500' : ''}`}
              placeholder="Enter your phone number"
              data-testid="input-traveler-phone"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1" data-testid="error-traveler-phone">
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="country" className="text-navy font-medium">
              Country *
            </Label>
            <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
              <SelectTrigger className={`mt-1 ${errors.country ? 'border-red-500' : ''}`} data-testid="select-traveler-country">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country && (
              <p className="text-red-500 text-sm mt-1" data-testid="error-traveler-country">
                {errors.country}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="company" className="text-navy font-medium">
              Company/Organization
            </Label>
            <Input
              id="company"
              type="text"
              value={formData.company}
              onChange={(e) => handleInputChange("company", e.target.value)}
              className="mt-1"
              placeholder="Enter your company or organization (optional)"
              data-testid="input-traveler-company"
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="specialRequests" className="text-navy font-medium">
              Special Requests
            </Label>
            <Textarea
              id="specialRequests"
              value={formData.specialRequests}
              onChange={(e) => handleInputChange("specialRequests", e.target.value)}
              className="mt-1"
              placeholder="Any dietary requirements, accessibility needs, or special requests..."
              rows={3}
              data-testid="textarea-special-requests"
            />
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 border-t">
          <p className="text-slate text-sm">
            * Required fields. Your information is secure and will only be used for your booking.
          </p>
          <Button
            type="submit"
            className="btn-primary"
            data-testid="button-details-step-continue"
          >
            Continue to Payment
          </Button>
        </div>
      </form>
    </div>
  );
}
