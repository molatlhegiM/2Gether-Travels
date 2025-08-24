import { useState } from "react";
import { Clock, MessageCircle, MapPin, Phone, Mail, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

export default function Concierge() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    urgency: "",
    topic: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello! I need assistance with AFIIA 2026 travel arrangements.");
    window.open(`https://wa.me/27211234567?text=${message}`, '_blank');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contactForm,
          country: "Not specified",
        }),
      });

      if (!response.ok) throw new Error("Submission failed");

      toast({
        title: "Message Sent",
        description: "Our concierge team will respond within 2 hours during business hours.",
      });

      setContactForm({
        name: "",
        email: "",
        phone: "",
        urgency: "",
        topic: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again or contact us directly via WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy to-afiia-blue text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading font-bold text-4xl lg:text-6xl mb-6" data-testid="heading-concierge">
              24/7 Concierge Service
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white/90">
              Visit the 2Gether Desk at the venue for real-time assistance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Available during conference hours
              </div>
              <div className="bg-afiia-green text-white px-4 py-2 rounded-full text-sm">
                24/7 WhatsApp support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-6" data-testid="heading-services">
                What We Handle
              </h2>
              <p className="text-slate text-lg mb-8">
                Our professional concierge team is here to ensure your conference experience is seamless.
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    icon: Clock,
                    title: "Travel Changes",
                    description: "Flight modifications, hotel extensions, transfer rescheduling",
                    bgColor: "bg-teal"
                  },
                  {
                    icon: MapPin,
                    title: "Local Guidance",
                    description: "Restaurant recommendations, directions, cultural insights",
                    bgColor: "bg-gold"
                  },
                  {
                    icon: Headphones,
                    title: "Emergency Support",
                    description: "Medical assistance, lost documents, urgent communications",
                    bgColor: "bg-navy"
                  }
                ].map((service, index) => (
                  <div key={index} className="flex items-start space-x-4" data-testid={`service-${index}`}>
                    <div className={`w-12 h-12 ${service.bgColor} rounded-card flex items-center justify-center flex-shrink-0`}>
                      <service.icon className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-navy mb-2">{service.title}</h3>
                      <p className="text-slate">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Conference venue concierge desk" 
                className="rounded-card shadow-soft w-full"
                data-testid="img-concierge-desk"
              />
              
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-card px-4 py-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-afiia-green rounded-full animate-pulse"></div>
                  <span className="font-medium text-navy">2Gether Desk • Level 1 Lobby</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 lg:py-24 bg-mist">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-4" data-testid="heading-contact-options">
              How to Reach Us
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              Multiple ways to get assistance when you need it
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="card-base p-8 text-center">
              <div className="w-16 h-16 bg-afiia-green rounded-card mx-auto mb-6 flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-navy mb-4">WhatsApp</h3>
              <p className="text-slate mb-6">Instant messaging for quick questions and urgent assistance</p>
              <Button 
                className="bg-afiia-green hover:bg-afiia-green/90 text-white w-full"
                onClick={handleWhatsAppClick}
                data-testid="button-whatsapp"
              >
                Message on WhatsApp
              </Button>
            </Card>

            <Card className="card-base p-8 text-center">
              <div className="w-16 h-16 bg-navy rounded-card mx-auto mb-6 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-navy mb-4">On-Site Desk</h3>
              <p className="text-slate mb-6">Visit our desk at the conference venue for immediate assistance</p>
              <div className="space-y-2 text-sm">
                <p><strong>Location:</strong> Level 1 Lobby</p>
                <p><strong>Hours:</strong> 8:00 AM - 6:00 PM</p>
                <p><strong>Days:</strong> Conference dates</p>
              </div>
            </Card>

            <Card className="card-base p-8 text-center">
              <div className="w-16 h-16 bg-teal rounded-card mx-auto mb-6 flex items-center justify-center">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-navy mb-4">Phone & Email</h3>
              <p className="text-slate mb-6">Traditional contact methods for detailed inquiries</p>
              <div className="space-y-2 text-sm">
                <p><Phone className="inline h-3 w-3 mr-1" /> +27 21 123 4567</p>
                <p><Mail className="inline h-3 w-3 mr-1" /> afiia2026@2gethertravels.com</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-4" data-testid="heading-contact-form">
                Send Us a Message
              </h2>
              <p className="text-slate text-lg">
                For non-urgent matters, use this form and we'll respond within 2 hours during business hours
              </p>
            </div>

            <Card className="card-base">
              <CardHeader>
                <h3 className="font-heading font-semibold text-xl text-navy">Concierge Request Form</h3>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFormSubmit} className="space-y-6" data-testid="form-concierge">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                        required
                        data-testid="input-name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                        data-testid="input-email"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                        data-testid="input-phone"
                      />
                    </div>

                    <div>
                      <Label htmlFor="urgency">Urgency Level</Label>
                      <Select value={contactForm.urgency} onValueChange={(value) => setContactForm(prev => ({ ...prev, urgency: value }))}>
                        <SelectTrigger data-testid="select-urgency">
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low - General inquiry</SelectItem>
                          <SelectItem value="medium">Medium - Need response today</SelectItem>
                          <SelectItem value="high">High - Urgent assistance needed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="topic">Topic</Label>
                    <Select value={contactForm.topic} onValueChange={(value) => setContactForm(prev => ({ ...prev, topic: value }))}>
                      <SelectTrigger data-testid="select-topic">
                        <SelectValue placeholder="Select topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="booking-change">Booking Changes</SelectItem>
                        <SelectItem value="travel-issue">Travel Issues</SelectItem>
                        <SelectItem value="local-assistance">Local Assistance</SelectItem>
                        <SelectItem value="emergency">Emergency Support</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Please describe how we can assist you..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      rows={4}
                      required
                      data-testid="textarea-message"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="btn-primary w-full text-lg py-3"
                    disabled={isSubmitting}
                    data-testid="button-send-message"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Information */}
      <section className="py-16 lg:py-24 bg-mist">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-4" data-testid="heading-emergency">
                Emergency Information
              </h2>
              <p className="text-slate text-lg">
                Important contacts and information for urgent situations
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="card-base p-6">
                <h3 className="font-heading font-semibold text-lg text-navy mb-4">Medical Emergency</h3>
                <ul className="space-y-2 text-slate">
                  <li><strong>Emergency Services:</strong> 112 or 10177</li>
                  <li><strong>Private Medical:</strong> ER24 (084 124)</li>
                  <li><strong>Nearest Hospital:</strong> Christiaan Barnard Memorial Hospital</li>
                  <li><strong>Address:</strong> 181 Longmarket Street, Cape Town</li>
                </ul>
              </Card>

              <Card className="card-base p-6">
                <h3 className="font-heading font-semibold text-lg text-navy mb-4">Travel Emergencies</h3>
                <ul className="space-y-2 text-slate">
                  <li><strong>Lost Passport:</strong> Contact your embassy</li>
                  <li><strong>Airport Issues:</strong> +27 21 937 1200</li>
                  <li><strong>2Gether 24/7:</strong> +27 82 123 4567 (WhatsApp)</li>
                  <li><strong>Travel Insurance Claims:</strong> Contact your provider</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
