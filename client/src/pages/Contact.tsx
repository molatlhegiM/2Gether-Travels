import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Clock, 
  Globe,
  Building,
  Users,
  Headphones,
  Send
} from "lucide-react";
import { useContactSubmission } from "@/hooks/use-booking";
import { trackEvent } from "@/lib/analytics";
import { useToast } from "@/hooks/use-toast";
import { openWhatsApp } from "@/lib/booking";

const contactMethods = [
  {
    icon: MessageSquare,
    title: "WhatsApp",
    description: "Fastest response for urgent matters",
    detail: "Available 24/7 with response under 5 minutes",
    action: "WhatsApp Us",
    color: "bg-afiia-green",
    primary: true
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Direct voice support for complex issues",
    detail: "+27 21 123 4567",
    action: "Call Now",
    color: "bg-navy",
    primary: false
  },
  {
    icon: Mail,
    title: "Email",
    description: "For detailed inquiries and documentation",
    detail: "Response within 2 hours during business hours",
    action: "Send Email",
    color: "bg-teal",
    primary: false
  }
];

const offices = [
  {
    city: "Cape Town",
    country: "South Africa",
    address: "123 Waterfront Drive, V&A Waterfront, Cape Town 8001",
    phone: "+27 21 123 4567",
    email: "capetown@2gethertravels.com",
    hours: "Mon-Fri: 8:00 AM - 6:00 PM SAST",
    isPrimary: true
  },
  {
    city: "Lagos",
    country: "Nigeria", 
    address: "45 Victoria Island, Lagos 101241",
    phone: "+234 1 234 5678",
    email: "lagos@2gethertravels.com",
    hours: "Mon-Fri: 9:00 AM - 5:00 PM WAT",
    isPrimary: false
  },
  {
    city: "Nairobi",
    country: "Kenya",
    address: "78 Westlands Road, Nairobi 00100",
    phone: "+254 20 123 4567", 
    email: "nairobi@2gethertravels.com",
    hours: "Mon-Fri: 9:00 AM - 5:00 PM EAT",
    isPrimary: false
  }
];

const topics = [
  "General Inquiry",
  "Booking Support",
  "Package Information",
  "Group Bookings",
  "Corporate Partnerships",
  "Media Inquiries",
  "Technical Support",
  "Feedback & Suggestions"
];

const countries = [
  "South Africa", "Nigeria", "Kenya", "Ghana", "Egypt", "Morocco", "Tunisia",
  "Algeria", "Angola", "Cameroon", "Ethiopia", "Tanzania", "Uganda", "Zambia",
  "Zimbabwe", "Botswana", "Namibia", "Mauritius", "Senegal", "Mali", "Other"
];

export default function Contact() {
  const { mutate: submitContact, isPending } = useContactSubmission();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    topic: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.country) {
      newErrors.country = "Please select your country";
    }

    if (!formData.topic) {
      newErrors.topic = "Please select an inquiry topic";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    trackEvent('submit_contact_form', 'contact', `topic_${formData.topic.toLowerCase().replace(/\s+/g, '_')}`);

    submitContact(formData, {
      onSuccess: () => {
        toast({
          title: "Message sent successfully!",
          description: "Thank you for contacting us. We'll respond within 24 hours.",
        });
        setFormData({
          name: "",
          email: "",
          country: "",
          topic: "",
          message: ""
        });
      },
      onError: () => {
        toast({
          title: "Failed to send message",
          description: "Please try again or contact us directly via WhatsApp.",
          variant: "destructive",
        });
      },
    });
  };

  const handleWhatsApp = () => {
    trackEvent('click_whatsapp_contact', 'contact', 'contact_whatsapp');
    openWhatsApp("Hello! I'd like to get in touch regarding AFIIA 2026 travel services.");
  };

  const handlePhoneCall = () => {
    trackEvent('click_phone_contact', 'contact', 'contact_phone');
    window.location.href = 'tel:+27211234567';
  };

  const handleEmailContact = () => {
    trackEvent('click_email_contact', 'contact', 'contact_email');
    window.location.href = 'mailto:info@2gethertravels.com?subject=AFIIA 2026 Inquiry';
  };

  return (
    <div className="min-h-screen" data-testid="page-contact">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-primary text-white py-20 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-gold text-navy px-4 py-2 mb-6 text-sm font-medium">
              Get in Touch
            </Badge>
            <h1 className="font-inter font-bold text-4xl lg:text-6xl mb-6" data-testid="text-contact-hero-title">
              We're Here to <span className="text-gold">Help</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white/90 max-w-3xl mx-auto" data-testid="text-contact-hero-subtitle">
              Have questions about AFIIA 2026 travel? Need help with your booking? 
              Our team is ready to assist you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 lg:py-24 bg-mist">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-inter font-bold text-3xl lg:text-4xl text-navy mb-4" data-testid="text-contact-methods-title">
              Choose How to Reach Us
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              Select the contact method that works best for you
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <Card key={index} className={`text-center hover:shadow-lg transition-shadow ${method.primary ? 'border-2 border-gold' : ''}`} data-testid={`card-contact-method-${index}`}>
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 ${method.color} rounded-card mx-auto mb-6 flex items-center justify-center`}>
                      <IconComponent className="text-white h-8 w-8" />
                    </div>
                    <h3 className="font-inter font-semibold text-lg text-navy mb-4" data-testid={`text-contact-method-title-${index}`}>
                      {method.title}
                    </h3>
                    <p className="text-slate mb-4">{method.description}</p>
                    <p className="text-slate text-sm mb-6">{method.detail}</p>
                    <Button
                      className={`w-full ${method.primary ? 'btn-secondary' : 'btn-primary'}`}
                      onClick={() => {
                        if (method.title === 'WhatsApp') handleWhatsApp();
                        else if (method.title === 'Phone Support') handlePhoneCall();
                        else handleEmailContact();
                      }}
                      data-testid={`button-contact-method-${index}`}
                    >
                      {method.action}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Office Info */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <h2 className="font-inter font-bold text-3xl text-navy mb-6" data-testid="text-contact-form-title">
                Send Us a Message
              </h2>
              <p className="text-slate text-lg mb-8">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
              
              <Card className="shadow-soft">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6" data-testid="form-contact">
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
                          placeholder="Your full name"
                          data-testid="input-contact-name"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1" data-testid="error-contact-name">
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
                          placeholder="your@email.com"
                          data-testid="input-contact-email"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1" data-testid="error-contact-email">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="country" className="text-navy font-medium">
                          Country *
                        </Label>
                        <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                          <SelectTrigger className={`mt-1 ${errors.country ? 'border-red-500' : ''}`} data-testid="select-contact-country">
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
                          <p className="text-red-500 text-sm mt-1" data-testid="error-contact-country">
                            {errors.country}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="topic" className="text-navy font-medium">
                          Inquiry Topic *
                        </Label>
                        <Select value={formData.topic} onValueChange={(value) => handleInputChange("topic", value)}>
                          <SelectTrigger className={`mt-1 ${errors.topic ? 'border-red-500' : ''}`} data-testid="select-contact-topic">
                            <SelectValue placeholder="Select inquiry topic" />
                          </SelectTrigger>
                          <SelectContent>
                            {topics.map((topic) => (
                              <SelectItem key={topic} value={topic}>
                                {topic}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.topic && (
                          <p className="text-red-500 text-sm mt-1" data-testid="error-contact-topic">
                            {errors.topic}
                          </p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="message" className="text-navy font-medium">
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          className={`mt-1 ${errors.message ? 'border-red-500' : ''}`}
                          placeholder="Please provide details about your inquiry..."
                          rows={5}
                          data-testid="textarea-contact-message"
                        />
                        {errors.message && (
                          <p className="text-red-500 text-sm mt-1" data-testid="error-contact-message">
                            {errors.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="btn-primary w-full py-3 text-lg"
                      disabled={isPending}
                      data-testid="button-submit-contact"
                    >
                      {isPending ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Office Information */}
            <div>
              <h2 className="font-inter font-bold text-3xl text-navy mb-6" data-testid="text-office-info-title">
                Our Offices
              </h2>
              <p className="text-slate text-lg mb-8">
                Visit us at one of our locations across Africa, or reach out to our local teams.
              </p>
              
              <div className="space-y-6">
                {offices.map((office, index) => (
                  <Card key={index} className={`hover:shadow-lg transition-shadow ${office.isPrimary ? 'border-2 border-gold' : ''}`} data-testid={`card-office-${index}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl text-navy">
                          {office.city}, {office.country}
                        </CardTitle>
                        {office.isPrimary && (
                          <Badge className="bg-gold text-navy">Primary Office</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-5 w-5 text-teal mt-1 flex-shrink-0" />
                        <span className="text-slate" data-testid={`text-office-address-${index}`}>
                          {office.address}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-teal flex-shrink-0" />
                        <span className="text-slate" data-testid={`text-office-phone-${index}`}>
                          {office.phone}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-teal flex-shrink-0" />
                        <span className="text-slate" data-testid={`text-office-email-${index}`}>
                          {office.email}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-teal flex-shrink-0" />
                        <span className="text-slate" data-testid={`text-office-hours-${index}`}>
                          {office.hours}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Support */}
      <section className="py-16 lg:py-24 bg-navy text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-gold rounded-card mx-auto mb-8 flex items-center justify-center">
              <Headphones className="text-navy h-10 w-10" />
            </div>
            <h2 className="font-inter font-bold text-3xl lg:text-4xl mb-6" data-testid="text-emergency-support-title">
              24/7 Emergency Support
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              For urgent travel matters outside business hours, our emergency WhatsApp line is 
              monitored around the clock with response times under 10 minutes.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="text-left">
                <h4 className="font-inter font-semibold text-lg mb-4 text-gold">Travel Emergencies</h4>
                <ul className="space-y-2 text-white/80">
                  <li>• Flight cancellations and rebooking</li>
                  <li>• Lost travel documents</li>
                  <li>• Emergency accommodation</li>
                  <li>• Medical assistance coordination</li>
                </ul>
              </div>
              
              <div className="text-left">
                <h4 className="font-inter font-semibold text-lg mb-4 text-gold">Conference Support</h4>
                <ul className="space-y-2 text-white/80">
                  <li>• Last-minute venue transfers</li>
                  <li>• Urgent booking modifications</li>
                  <li>• Emergency contact assistance</li>
                  <li>• Local guidance and directions</li>
                </ul>
              </div>
            </div>
            
            <Button
              className="bg-afiia-green hover:bg-afiia-green/90 text-white font-medium px-8 py-4 rounded-cta"
              onClick={handleWhatsApp}
              data-testid="button-emergency-whatsapp"
            >
              <MessageSquare className="mr-3 h-5 w-5" />
              Emergency WhatsApp
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <MobileCTA />
    </div>
  );
}
