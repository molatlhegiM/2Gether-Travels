import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Headphones, MapPin, MessageSquare } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { openWhatsApp } from "@/lib/booking";

const services = [
  {
    icon: Clock,
    title: "Available During Conference Hours",
    description: "8:00 AM - 6:00 PM daily, located in the main lobby",
    bgColor: "bg-teal"
  },
  {
    icon: Headphones,
    title: "24/7 WhatsApp Support",
    description: "Instant assistance for urgent travel changes and local guidance",
    bgColor: "bg-gold"
  },
  {
    icon: MapPin,
    title: "Local Expertise",
    description: "Restaurant recommendations, emergency assistance, and itinerary adjustments",
    bgColor: "bg-navy"
  }
];

export default function Concierge() {
  const handleMessageConcierge = () => {
    trackEvent('click_message_concierge', 'concierge', 'whatsapp_concierge');
    openWhatsApp("Hello! I need assistance with my AFIIA 2026 booking and would like to speak with the concierge team.");
  };

  return (
    <section className="py-16 lg:py-24" data-testid="section-concierge">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 
              className="font-inter font-bold text-3xl lg:text-4xl text-navy mb-6"
              data-testid="text-concierge-title"
            >
              On-Site Concierge
            </h2>
            <p 
              className="text-slate text-lg mb-8"
              data-testid="text-concierge-subtitle"
            >
              Visit the 2Gether Desk at the venue for real-time assistance.
            </p>
            
            <div className="space-y-6 mb-8">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div 
                    key={index} 
                    className="flex items-start space-x-4"
                    data-testid={`card-concierge-service-${index}`}
                  >
                    <div className={`w-12 h-12 ${service.bgColor} rounded-card flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className="text-white h-6 w-6" />
                    </div>
                    <div>
                      <h3 
                        className="font-inter font-semibold text-lg text-navy mb-2"
                        data-testid={`text-concierge-service-title-${index}`}
                      >
                        {service.title}
                      </h3>
                      <p 
                        className="text-slate"
                        data-testid={`text-concierge-service-description-${index}`}
                      >
                        {service.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <Button
              className="bg-afiia-green hover:bg-afiia-green/90 text-white font-medium px-8 py-4 rounded-cta transition-colors inline-flex items-center"
              onClick={handleMessageConcierge}
              data-testid="button-message-concierge"
            >
              <MessageSquare className="mr-3 h-5 w-5" />
              Message Concierge
            </Button>
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
                <Badge 
                  variant="secondary"
                  className="font-medium text-navy bg-transparent border-0 p-0"
                  data-testid="badge-concierge-location"
                >
                  2Gether Desk • Level 1 Lobby
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
