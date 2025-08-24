import { useState } from "react";
import { Calendar, MapPin, Users, Handshake, Shield, Heart, 
         Clock, MessageCircle, Download, Star } from "lucide-react";
import Hero from "@/components/hero";
import PackageCard from "@/components/package-card";
import HotelCard from "@/components/hotel-card";
import TourCard from "@/components/tour-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Link } from "wouter";

// --- Mock Data with Dynamic Images ---
const packages = [
  { id: "1", title: "Standard Package", description: "Affordable package for professionals.", price: "$500" },
  { id: "2", title: "Premium Package", description: "Includes VIP access and perks.", price: "$1200" },
  { id: "3", title: "Executive Package", description: "Exclusive benefits for executives.", price: "$2500" },
];

const hotels = [
  { id: "1", name: "Grand Hotel", location: "City Center", imageUrl: "https://source.unsplash.com/400x300/?hotel,city" },
  { id: "2", name: "Ocean View Hotel", location: "Waterfront", imageUrl: "https://source.unsplash.com/400x300/?hotel,beach" },
  { id: "3", name: "Mountain Lodge", location: "Hillside", imageUrl: "https://source.unsplash.com/400x300/?hotel,mountain" },
];

const tours = [
  { id: "1", name: "City Walking Tour", description: "Explore the city highlights.", imageUrl: "https://source.unsplash.com/400x300/?city,walking" },
  { id: "2", name: "Wine Tasting Tour", description: "Visit the finest vineyards.", imageUrl: "https://source.unsplash.com/400x300/?wine,vineyard" },
  { id: "3", name: "Adventure Tour", description: "Thrilling outdoor activities.", imageUrl: "https://source.unsplash.com/400x300/?adventure,outdoors" },
];

const faqs = [
  { id: "1", question: "How do I register?", answer: "Use the registration form on the website." },
  { id: "2", question: "Are meals included?", answer: "Yes, all packages include meals." },
  { id: "3", question: "Can I cancel?", answer: "Cancellations are allowed up to 7 days before the event." },
];

const testimonials = [
  { id: "1", author: "Jane Doe", role: "Auditor", company: "Finance Corp", quote: "Amazing experience!", rating: 5, imageUrl: "https://source.unsplash.com/100x100/?woman,portrait" },
  { id: "2", author: "John Smith", role: "Accountant", company: "Global Accounting", quote: "Highly recommended.", rating: 4, imageUrl: "https://source.unsplash.com/100x100/?man,portrait" },
  { id: "3", author: "Mary Johnson", role: "Finance Manager", company: "BizCorp", quote: "Fantastic service and guidance.", rating: 5, imageUrl: "https://source.unsplash.com/100x100/?person,portrait" },
];

// --- Home Component ---
export default function Home() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    setIsSubscribing(true);
    try {
      toast({
        title: "Subscribed!",
        description: "You'll receive updates about AFIIA 2026 and exclusive offers.",
      });
      setNewsletterEmail("");
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello! I need assistance with AFIIA 2026 travel booking.");
    window.open(`https://wa.me/27211234567?text=${message}`, '_blank');
  };

  const handleDownloadGuide = () => {
    toast({
      title: "Guide Downloaded",
      description: "The AFIIA 2026 Delegate Guide has been downloaded.",
    });
  };

  return (
    <div className="min-h-screen">
      <Hero />

      {/* Packages */}
      <section className="py-16 lg:py-24 bg-mist">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-4">Choose Your Package</h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              Tailored packages for every professional's needs and budget
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map(pkg => <PackageCard key={pkg.id} package={pkg} />)}
          </div>
        </div>
      </section>

      {/* Why 2Gether */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-4">Why 2Gether?</h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              Professional travel solutions designed specifically for auditors and finance professionals
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, title: "Tailored for Auditors", description: "Purpose-built packages understanding the unique needs of professional auditors", gradient: "from-navy to-teal" },
              { icon: Handshake, title: "Networking-Friendly", description: "Curated experiences designed to facilitate meaningful professional connections", gradient: "from-teal to-gold" },
              { icon: Shield, title: "Trusted Partnerships", description: "Established relationships with premium hotels, venues, and service providers", gradient: "from-gold to-navy" },
              { icon: Heart, title: "Peace of Mind", description: "24/7 support and comprehensive travel insurance for worry-free conferences", gradient: "from-afiia-blue to-teal" }
            ].map((item, index) => (
              <div key={index} className="text-center group">
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

      {/* Hotels */}
      <section className="py-16 lg:py-24 bg-mist">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-4">Hotels Near the Venue</h2>
              <p className="text-slate text-lg">Handpicked accommodations within walking distance of the conference center</p>
            </div>
            <Link href="/hotels">
              <Button className="btn-primary mt-6 lg:mt-0">View All Hotels</Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map(hotel => <HotelCard key={hotel.id} hotel={hotel} />)}
          </div>
        </div>
      </section>

      {/* Tours */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-4">Signature Tours</h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">Build connections beyond the conference room.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map(tour => <TourCard key={tour.id} tour={tour} />)}
          </div>
        </div>
      </section>

      {/* Concierge */}
      <section className="py-16 lg:py-24 bg-mist">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-6">On-Site Concierge</h2>
              <p className="text-slate text-lg mb-8">Visit the 2Gether Desk at the venue for real-time assistance.</p>
              <div className="space-y-6 mb-8">
                {[
                  { icon: Clock, title: "Available During Conference Hours", description: "8:00 AM - 6:00 PM daily, located in the main lobby", bgColor: "bg-teal" },
                  { icon: MessageCircle, title: "24/7 WhatsApp Support", description: "Instant assistance for urgent travel changes and local guidance", bgColor: "bg-gold" },
                  { icon: MapPin, title: "Local Expertise", description: "Restaurant recommendations, emergency assistance, and itinerary adjustments", bgColor: "bg-navy" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
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
              >
                <MessageCircle className="mr-3 h-5 w-5" />
                Message Concierge
              </Button>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                   alt="Conference venue concierge desk" 
                   className="rounded-card shadow-soft w-full" />
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

      {/* Testimonials */}
      <section className="py-16 lg:py-24 bg-mist">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-4">What Delegates Say</h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">Trusted by auditors and finance professionals across Africa</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <Card key={testimonial.id} className="p-8">
                <div className="flex items-center mb-6">
                  <img src={`${testimonial.imageUrl}&${testimonial.id}`} alt={testimonial.author} className="w-12 h-12 rounded-full object-cover mr-4" />
                  <div>
                    <h4 className="font-heading font-semibold text-navy">{testimonial.author}</h4>
                    <p className="text-slate text-sm">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
                <p className="text-slate italic mb-4">"{testimonial.quote}"</p>
                <div className="flex text-gold">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-4">Frequently Asked Questions</h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">Quick answers to common queries about AFIIA 2026 travel</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible>
              {faqs.map(faq => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left font-heading font-semibold text-navy">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-slate">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-navy to-afiia-blue text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl mb-6">Stay Updated</h2>
            <p className="text-xl mb-8 text-white/90">Get the latest updates about AFIIA 2026 and exclusive travel offers</p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-card text-navy placeholder-slate border-0"
                required
              />
              <Button type="submit" className="btn-accent px-6 py-3 whitespace-nowrap" disabled={isSubscribing}>
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
            <p className="text-sm text-white/70 mt-4">No spam, unsubscribe anytime. Privacy policy applies.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
