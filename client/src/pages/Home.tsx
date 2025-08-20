import { useQuery } from "@tanstack/react-query";
import { Calendar, MapPin, Users, Handshake, Shield, Heart, 
         Clock, MessageCircle, Download, Star } from "lucide-react";
import Hero from "@/components/hero";
import PackageCard from "@/components/package-card";
import HotelCard from "@/components/hotel-card";
import TourCard from "@/components/tour-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import type { Package, Hotel, Tour, FAQ, Testimonial } from "@shared/schema";
import { Link } from "wouter";
import { useState } from "react";

export default function Home() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const { data: packages } = useQuery<Package[]>({
    queryKey: ["/api/packages"],
  });

  const { data: hotels } = useQuery<Hotel[]>({
    queryKey: ["/api/hotels"],
  });

  const { data: tours } = useQuery<Tour[]>({
    queryKey: ["/api/tours"],
  });

  const { data: faqs } = useQuery<FAQ[]>({
    queryKey: ["/api/faqs"],
  });

  const { data: testimonials } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    setIsSubscribing(true);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      if (!response.ok) throw new Error("Subscription failed");

      toast({
        title: "Subscribed!",
        description: "You'll receive updates about AFIIA 2026 and exclusive offers.",
      });
      
      setNewsletterEmail("");
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello! I need assistance with AFIIA 2026 travel booking.");
    window.open(`https://wa.me/27211234567?text=${message}`, '_blank');
  };

  const handleDownloadGuide = () => {
    // In a real implementation, this would download a PDF
    toast({
      title: "Guide Downloaded",
      description: "The AFIIA 2026 Delegate Guide has been downloaded.",
    });
  };

  return (
    <div className="min-h-screen">
      <Hero />

      {/* Quick Package Picker */}
      <section className="py-16 lg:py-24 bg-mist">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-4" data-testid="heading-packages">
              Choose Your Package
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              Tailored packages for every professional's needs and budget
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages?.map((pkg) => (
              <PackageCard key={pkg.id} package={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Why 2Gether */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-4" data-testid="heading-why-2gether">
              Why 2Gether?
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              Professional travel solutions designed specifically for auditors and finance professionals
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Tailored for Auditors",
                description: "Purpose-built packages understanding the unique needs of professional auditors",
                gradient: "from-navy to-teal"
              },
              {
                icon: Handshake,
                title: "Networking-Friendly",
                description: "Curated experiences designed to facilitate meaningful professional connections",
                gradient: "from-teal to-gold"
              },
              {
                icon: Shield,
                title: "Trusted Partnerships",
                description: "Established relationships with premium hotels, venues, and service providers",
                gradient: "from-gold to-navy"
              },
              {
                icon: Heart,
                title: "Peace of Mind",
                description: "24/7 support and comprehensive travel insurance for worry-free conferences",
                gradient: "from-afiia-blue to-teal"
              }
            ].map((item, index) => (
              <div key={index} className="text-center group" data-testid={`feature-${index}`}>
                <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-card mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <item.icon className="text-white text-2xl" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-navy mb-4">{item.title}</h3>
                <p className="text-slate">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hotels Near Venue */}
      <section className="py-16 lg:py-24 bg-mist">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-4" data-testid="heading-hotels">
                Hotels Near the Venue
              </h2>
              <p className="text-slate text-lg">Handpicked accommodations within walking distance of the conference center</p>
            </div>
            <Link href="/hotels">
              <Button className="btn-primary mt-6 lg:mt-0" data-testid="button-view-all-hotels">
                View All Hotels
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels?.slice(0, 3).map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      </section>

      {/* Signature Tours */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-4" data-testid="heading-tours">
              Signature Tours
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              Build connections beyond the conference room.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours?.slice(0, 3).map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      {/* On-Site Concierge */}
      <section className="py-16 lg:py-24 bg-mist">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-6" data-testid="heading-concierge">
                On-Site Concierge
              </h2>
              <p className="text-slate text-lg mb-8">Visit the 2Gether Desk at the venue for real-time assistance.</p>
              
              <div className="space-y-6 mb-8">
                {[
                  {
                    icon: Clock,
                    title: "Available During Conference Hours",
                    description: "8:00 AM - 6:00 PM daily, located in the main lobby",
                    bgColor: "bg-teal"
                  },
                  {
                    icon: MessageCircle,
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
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4" data-testid={`concierge-feature-${index}`}>
                    <div className={`w-12 h-12 ${item.bgColor} rounded-card flex items-center justify-center flex-shrink-0`}>
                      <item.icon className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-navy mb-2">{item.title}</h3>
                      <p className="text-slate">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button 
                className="bg-afiia-green hover:bg-afiia-green/90 text-white font-medium px-8 py-4 rounded-cta transition-colors"
                onClick={handleWhatsAppClick}
                data-testid="button-message-concierge"
              >
                <MessageCircle className="mr-3 h-5 w-5" />
                Message Concierge
              </Button>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Conference venue concierge desk" 
                className="rounded-card shadow-soft w-full"
                data-testid="img-concierge"
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

      {/* Cape Town Snapshot */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1580060839134-75a5edca2e99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Cape Town cityscape with Table Mountain" 
                className="rounded-card shadow-soft w-full"
                data-testid="img-cape-town"
              />
            </div>
            
            <div>
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-6" data-testid="heading-cape-town">
                Cape Town Snapshot
              </h2>
              <p className="text-slate text-lg mb-8">Everything you need to know for a successful conference experience</p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {[
                  {
                    icon: Shield,
                    title: "Safety",
                    description: "Cape Town is generally safe for conference delegates. Our partners provide secure transfers and vetted accommodations."
                  },
                  {
                    icon: "💰",
                    title: "Currency",
                    description: "South African Rand (ZAR). USD widely accepted. Credit cards accepted at major venues and hotels."
                  },
                  {
                    icon: "🌡️",
                    title: "Weather",
                    description: "May is autumn with mild temperatures (15-22°C). Pack layers for conference rooms and outdoor activities."
                  },
                  {
                    icon: "👔",
                    title: "Dress Code",
                    description: "Business formal for conference sessions. Smart casual for networking events and tours."
                  }
                ].map((item, index) => (
                  <Card key={index} className="bg-mist p-6" data-testid={`snapshot-${index}`}>
                    <div className="flex items-center mb-3">
                      {typeof item.icon === 'string' ? (
                        <span className="text-xl mr-3">{item.icon}</span>
                      ) : (
                        <item.icon className="h-5 w-5 text-teal mr-3" />
                      )}
                      <h3 className="font-heading font-semibold text-navy">{item.title}</h3>
                    </div>
                    <p className="text-slate text-sm">{item.description}</p>
                  </Card>
                ))}
              </div>
              
              <Button 
                className="btn-accent px-8 py-4 rounded-cta transition-colors"
                onClick={handleDownloadGuide}
                data-testid="button-download-guide"
              >
                <Download className="mr-3 h-5 w-5" />
                Download Delegate Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24 bg-mist">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-4" data-testid="heading-testimonials">
              What Delegates Say
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              Trusted by auditors and finance professionals across Africa
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials?.map((testimonial) => (
              <Card key={testimonial.id} className="card-base p-8" data-testid={`testimonial-${testimonial.id}`}>
                <div className="flex items-center mb-6">
                  {testimonial.imageUrl && (
                    <img 
                      src={testimonial.imageUrl} 
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full object-cover mr-4" 
                      data-testid={`img-testimonial-${testimonial.id}`}
                    />
                  )}
                  <div>
                    <h4 className="font-heading font-semibold text-navy" data-testid={`author-${testimonial.id}`}>
                      {testimonial.author}
                    </h4>
                    <p className="text-slate text-sm">
                      {testimonial.role}{testimonial.company && `, ${testimonial.company}`}
                    </p>
                  </div>
                </div>
                <p className="text-slate italic mb-4" data-testid={`quote-${testimonial.id}`}>
                  "{testimonial.quote}"
                </p>
                <div className="flex text-gold">
                  {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-slate text-lg mb-4">
              Trusted by <span className="font-bold text-navy">500+</span> delegates from <span className="font-bold text-navy">25+</span> African countries
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-4" data-testid="heading-faq">
              Frequently Asked Questions
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              Quick answers to common queries about AFIIA 2026 travel
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible>
              {faqs?.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} data-testid={`faq-item-${faq.id}`}>
                  <AccordionTrigger className="text-left font-heading font-semibold text-navy">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-slate mb-6">Need more information?</p>
            <Button 
              className="bg-afiia-green hover:bg-afiia-green/90 text-white font-medium px-8 py-4 rounded-cta transition-colors"
              onClick={handleWhatsAppClick}
              data-testid="button-chat-whatsapp"
            >
              <MessageCircle className="mr-3 h-5 w-5" />
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-navy to-afiia-blue text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl mb-6" data-testid="heading-newsletter">
              Stay Updated
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Get the latest updates about AFIIA 2026 and exclusive travel offers
            </p>
            
            <form 
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              data-testid="form-newsletter"
            >
              <Input
                type="email"
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-card text-navy placeholder-slate border-0"
                required
                data-testid="input-newsletter-email"
              />
              <Button 
                type="submit" 
                className="btn-accent px-6 py-3 whitespace-nowrap"
                disabled={isSubscribing}
                data-testid="button-newsletter-subscribe"
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
            
            <p className="text-sm text-white/70 mt-4">
              No spam, unsubscribe anytime. Privacy policy applies.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
