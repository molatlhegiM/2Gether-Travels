import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Headphones, MapPin, MessageSquare, Users, Shield, Phone, Mail, Globe } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { openWhatsApp } from "@/lib/booking";

const services = [
  {
    icon: Clock,
    title: "Conference Hours Support",
    description: "8:00 AM - 6:00 PM daily at the venue",
    details: "Located in the main lobby with dedicated 2Gether Travels desk staffed by experienced concierge professionals.",
    bgColor: "bg-teal"
  },
  {
    icon: Headphones,
    title: "24/7 WhatsApp Assistance", 
    description: "Round-the-clock support for urgent matters",
    details: "Instant messaging support for flight changes, emergency assistance, and urgent travel modifications.",
    bgColor: "bg-gold"
  },
  {
    icon: MapPin,
    title: "Local Expertise & Recommendations",
    description: "Cape Town insider knowledge at your fingertips",
    details: "Restaurant recommendations, cultural sites, shopping areas, and business networking venues throughout the city.",
    bgColor: "bg-navy"
  }
];

const conciergeServices = [
  {
    category: "Travel Support",
    icon: Globe,
    services: [
      "Flight change assistance and rebooking",
      "Hotel room modifications and upgrades", 
      "Transfer schedule adjustments",
      "Airport assistance and meet & greet",
      "Travel insurance claims support"
    ]
  },
  {
    category: "Conference Support",
    icon: Users,
    services: [
      "Session schedule management",
      "Networking event coordination",
      "Business card printing and materials",
      "Meeting room bookings at hotels",
      "Conference material delivery"
    ]
  },
  {
    category: "Local Assistance",
    icon: MapPin,
    services: [
      "Restaurant reservations and recommendations",
      "Cultural and entertainment bookings",
      "Shopping and souvenir guidance",
      "Local transportation arrangements",
      "Emergency medical assistance coordination"
    ]
  },
  {
    category: "Business Services",
    icon: Shield,
    services: [
      "Document printing and faxing",
      "Courier and delivery services",
      "Local business meeting coordination",
      "Currency exchange assistance",
      "Mobile phone and SIM card support"
    ]
  }
];

export default function Concierge() {
  const handleMessageConcierge = () => {
    trackEvent('click_message_concierge', 'concierge', 'concierge_whatsapp');
    openWhatsApp("Hello! I need assistance with my AFIIA 2026 booking and would like to speak with the concierge team.");
  };

  const handleCallConcierge = () => {
    trackEvent('click_call_concierge', 'concierge', 'concierge_phone');
    window.location.href = 'tel:+27211234567';
  };

  const handleEmailConcierge = () => {
    trackEvent('click_email_concierge', 'concierge', 'concierge_email');
    window.location.href = 'mailto:concierge@2gethertravels.com?subject=AFIIA 2026 Concierge Request';
  };

  return (
    <div className="min-h-screen" data-testid="page-concierge">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-primary text-white py-20 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-gold text-navy px-4 py-2 mb-6 text-sm font-medium">
              On-Site Concierge Services
            </Badge>
            <h1 className="font-inter font-bold text-4xl lg:text-6xl mb-6" data-testid="text-concierge-hero-title">
              Your <span className="text-gold">Personal Assistant</span> in Cape Town
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white/90 max-w-3xl mx-auto" data-testid="text-concierge-hero-subtitle">
              Visit the 2Gether Desk at the venue for real-time assistance, or reach us 24/7 
              via WhatsApp for any travel needs during your AFIIA 2026 experience.
            </p>
          </div>
        </div>
      </section>

      {/* Concierge Overview */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-inter font-bold text-3xl lg:text-4xl text-navy mb-6" data-testid="text-concierge-overview-title">
                Dedicated Support Throughout Your Stay
              </h2>
              
              <div className="space-y-6 mb-8">
                {services.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4" data-testid={`card-concierge-service-${index}`}>
                      <div className={`w-12 h-12 ${service.bgColor} rounded-card flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className="text-white h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-inter font-semibold text-lg text-navy mb-2" data-testid={`text-concierge-service-title-${index}`}>
                          {service.title}
                        </h3>
                        <p className="text-teal font-medium mb-2">{service.description}</p>
                        <p className="text-slate text-sm">{service.details}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="bg-afiia-green hover:bg-afiia-green/90 text-white font-medium px-6 py-3 rounded-cta transition-colors inline-flex items-center"
                  onClick={handleMessageConcierge}
                  data-testid="button-message-concierge"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  WhatsApp Concierge
                </Button>
                <Button
                  variant="outline"
                  className="inline-flex items-center"
                  onClick={handleCallConcierge}
                  data-testid="button-call-concierge"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Us
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Conference venue concierge desk"
                className="rounded-card shadow-soft w-full"
                data-testid="img-concierge-venue"
              />
              
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-card px-4 py-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-afiia-green rounded-full animate-pulse"></div>
                  <Badge variant="secondary" className="font-medium text-navy bg-transparent border-0 p-0" data-testid="badge-concierge-location">
                    2Gether Desk • Level 1 Lobby
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 lg:py-24 bg-mist">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-inter font-bold text-3xl lg:text-4xl text-navy mb-4" data-testid="text-concierge-services-title">
              Complete Concierge Services
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              From travel modifications to local recommendations, our concierge team handles all aspects 
              of your Cape Town experience so you can focus on the conference.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {conciergeServices.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow" data-testid={`card-service-category-${index}`}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-navy to-teal rounded-card flex items-center justify-center">
                        <IconComponent className="text-white h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl text-navy">{category.category}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {category.services.map((service, serviceIndex) => (
                        <li key={serviceIndex} className="flex items-start" data-testid={`text-service-${index}-${serviceIndex}`}>
                          <div className="w-1.5 h-1.5 bg-teal rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-slate">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-inter font-bold text-3xl lg:text-4xl text-navy mb-4" data-testid="text-contact-methods-title">
              Multiple Ways to Reach Us
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              Choose the communication method that works best for you. Our concierge team is 
              always ready to assist with any request, big or small.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow" data-testid="card-contact-whatsapp">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-afiia-green rounded-card mx-auto mb-6 flex items-center justify-center">
                  <MessageSquare className="text-white h-8 w-8" />
                </div>
                <h3 className="font-inter font-semibold text-lg text-navy mb-4">WhatsApp</h3>
                <p className="text-slate text-sm mb-6">
                  Fastest response for urgent matters. Available 24/7 with typical response time under 5 minutes.
                </p>
                <Button 
                  className="bg-afiia-green hover:bg-afiia-green/90 text-white w-full"
                  onClick={handleMessageConcierge}
                >
                  Open WhatsApp
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow" data-testid="card-contact-phone">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-navy rounded-card mx-auto mb-6 flex items-center justify-center">
                  <Phone className="text-white h-8 w-8" />
                </div>
                <h3 className="font-inter font-semibold text-lg text-navy mb-4">Phone Call</h3>
                <p className="text-slate text-sm mb-6">
                  Direct voice support for complex issues. Conference hours: 8AM-6PM, emergency line available 24/7.
                </p>
                <Button 
                  className="btn-primary w-full"
                  onClick={handleCallConcierge}
                >
                  +27 21 123 4567
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow" data-testid="card-contact-email">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-teal rounded-card mx-auto mb-6 flex items-center justify-center">
                  <Mail className="text-white h-8 w-8" />
                </div>
                <h3 className="font-inter font-semibold text-lg text-navy mb-4">Email</h3>
                <p className="text-slate text-sm mb-6">
                  For detailed requests and documentation. Response within 2 hours during business hours.
                </p>
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={handleEmailConcierge}
                >
                  Send Email
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Support */}
      <section className="py-16 lg:py-24 bg-navy text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-gold rounded-card mx-auto mb-8 flex items-center justify-center">
              <Shield className="text-navy h-10 w-10" />
            </div>
            <h2 className="font-inter font-bold text-3xl lg:text-4xl mb-6" data-testid="text-emergency-support-title">
              Emergency Support & Peace of Mind
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Travel emergencies can happen. That's why our concierge team is equipped to handle 
              urgent situations and provide immediate assistance when you need it most.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="text-left">
                <h4 className="font-inter font-semibold text-lg mb-4 text-gold">Medical Emergencies</h4>
                <ul className="space-y-2 text-white/80">
                  <li>• Immediate hospital and clinic coordination</li>
                  <li>• Insurance claim assistance and documentation</li>
                  <li>• Prescription medication location services</li>
                  <li>• Family notification and communication support</li>
                </ul>
              </div>
              
              <div className="text-left">
                <h4 className="font-inter font-semibold text-lg mb-4 text-gold">Travel Emergencies</h4>
                <ul className="space-y-2 text-white/80">
                  <li>• Flight cancellation rebooking and alternatives</li>
                  <li>• Emergency accommodation arrangements</li>
                  <li>• Lost passport and document replacement</li>
                  <li>• Emergency financial assistance coordination</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-card p-6">
              <p className="text-white/90 mb-4">
                <strong>Emergency Hotline:</strong> For immediate assistance outside business hours, 
                our emergency WhatsApp line is monitored 24/7 with response times under 10 minutes.
              </p>
              <Button 
                className="bg-gold hover:bg-gold/90 text-navy font-medium px-8 py-3 rounded-cta"
                onClick={handleMessageConcierge}
                data-testid="button-emergency-whatsapp"
              >
                Emergency WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileCTA />
    </div>
  );
}
