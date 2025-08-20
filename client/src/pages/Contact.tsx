import { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

export default function Contact() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    country: "",
    topic: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });

      if (!response.ok) throw new Error("Submission failed");

      toast({
        title: "Message Sent Successfully",
        description: "We'll respond to your inquiry within 24 hours during business days.",
      });

      setContactForm({
        name: "",
        email: "",
        country: "",
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

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello! I have an inquiry about AFIIA 2026 travel services.");
    window.open(`https://wa.me/27211234567?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy to-afiia-blue text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading font-bold text-4xl lg:text-6xl mb-6" data-testid="heading-contact">
              Get in Touch
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white/90">
              Our travel experts are here to help plan your perfect AFIIA 2026 experience.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Response within 24 hours
              </div>
              <div className="bg-gold text-navy px-4 py-2 rounded-full text-sm">
                Professional travel experts
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="font-heading font-bold text-3xl text-navy mb-6" data-testid="heading-contact-form">
              Send Us a Message
            </h2>
            <p className="text-slate text-lg mb-8">
              Fill out the form below and our team will get back to you with detailed information about your AFIIA 2026 travel requirements.
            </p>

            <Card className="card-base">
              <CardHeader>
                <h3 className="font-heading font-semibold text-xl text-navy">Contact Information</h3>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFormSubmit} className="space-y-6" data-testid="form-contact">
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
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        placeholder="e.g., South Africa"
                        value={contactForm.country}
                        onChange={(e) => setContactForm(prev => ({ ...prev, country: e.target.value }))}
                        required
                        data-testid="input-country"
                      />
                    </div>

                    <div>
                      <Label htmlFor="topic">Inquiry Topic</Label>
                      <Select value={contactForm.topic} onValueChange={(value) => setContactForm(prev => ({ ...prev, topic: value }))}>
                        <SelectTrigger data-testid="select-topic">
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="packages">Travel Packages</SelectItem>
                          <SelectItem value="hotels">Hotel Accommodation</SelectItem>
                          <SelectItem value="transfers">Airport Transfers</SelectItem>
                          <SelectItem value="tours">Tours & Activities</SelectItem>
                          <SelectItem value="group">Group Bookings</SelectItem>
                          <SelectItem value="corporate">Corporate Services</SelectItem>
                          <SelectItem value="general">General Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Please describe your travel requirements, dates, number of travelers, or any specific questions you have about AFIIA 2026..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      rows={6}
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
                    <Send className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Sending Message..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information & Map */}
          <div className="space-y-8">
            <div>
              <h2 className="font-heading font-bold text-3xl text-navy mb-6" data-testid="heading-contact-info">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <Card className="card-base p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-navy rounded-card flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-navy mb-2">Email</h3>
                      <p className="text-slate mb-2" data-testid="text-email">afiia2026@2gethertravels.com</p>
                      <p className="text-slate text-sm">For detailed inquiries and documentation</p>
                    </div>
                  </div>
                </Card>

                <Card className="card-base p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-teal rounded-card flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-navy mb-2">Phone</h3>
                      <p className="text-slate mb-2" data-testid="text-phone">+27 21 123 4567</p>
                      <p className="text-slate text-sm">Mon-Fri: 8:00 AM - 6:00 PM (SAST)</p>
                    </div>
                  </div>
                </Card>

                <Card className="card-base p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-afiia-green rounded-card flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-lg text-navy mb-2">WhatsApp</h3>
                      <p className="text-slate text-sm mb-4">Quick questions and instant assistance</p>
                      <Button 
                        className="bg-afiia-green hover:bg-afiia-green/90 text-white"
                        onClick={handleWhatsAppClick}
                        data-testid="button-whatsapp"
                      >
                        Chat on WhatsApp
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="card-base p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gold rounded-card flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-navy" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-navy mb-2">Office Location</h3>
                      <p className="text-slate mb-2" data-testid="text-address">Cape Town, South Africa</p>
                      <p className="text-slate text-sm">Serving professional travelers across Africa</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Map Embed */}
            <div>
              <h3 className="font-heading font-semibold text-xl text-navy mb-4">Find Us</h3>
              <div className="w-full h-64 bg-mist rounded-card flex items-center justify-center" data-testid="map-placeholder">
                <div className="text-center">
                  <MapPin className="h-8 w-8 text-slate mx-auto mb-2" />
                  <p className="text-slate">Cape Town, South Africa</p>
                  <p className="text-slate text-sm">Conference venue location</p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <Card className="card-base p-6">
              <h3 className="font-heading font-semibold text-xl text-navy mb-4">Business Hours</h3>
              <div className="space-y-2 text-slate">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>9:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
                <hr className="border-slate/20 my-3" />
                <div className="flex justify-between font-medium text-navy">
                  <span>WhatsApp Support</span>
                  <span>24/7</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-mist">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-4">
              Quick Answers
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              Common questions about contacting us and our services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="card-base p-6">
              <h3 className="font-heading font-semibold text-lg text-navy mb-3">How quickly do you respond?</h3>
              <p className="text-slate text-sm">We respond to all inquiries within 24 hours during business days, and often much faster via WhatsApp.</p>
            </Card>

            <Card className="card-base p-6">
              <h3 className="font-heading font-semibold text-lg text-navy mb-3">Can you help with group bookings?</h3>
              <p className="text-slate text-sm">Yes! We specialize in group bookings for professional conferences and offer dedicated support for corporate travelers.</p>
            </Card>

            <Card className="card-base p-6">
              <h3 className="font-heading font-semibold text-lg text-navy mb-3">Do you handle corporate invoicing?</h3>
              <p className="text-slate text-sm">Absolutely. We work with corporate finance teams and accept PO numbers with NET 30 payment terms.</p>
            </Card>

            <Card className="card-base p-6">
              <h3 className="font-heading font-semibold text-lg text-navy mb-3">What about last-minute changes?</h3>
              <p className="text-slate text-sm">Our concierge team handles travel changes and emergencies. WhatsApp us for urgent assistance anytime.</p>
            </Card>

            <Card className="card-base p-6">
              <h3 className="font-heading font-semibold text-lg text-navy mb-3">Are your services Africa-wide?</h3>
              <p className="text-slate text-sm">We serve professional travelers from across Africa, with expertise in cross-border travel requirements.</p>
            </Card>

            <Card className="card-base p-6">
              <h3 className="font-heading font-semibold text-lg text-navy mb-3">What's included in your packages?</h3>
              <p className="text-slate text-sm">Our packages include accommodation, transfers, tours, and concierge services tailored for professional conferences.</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
