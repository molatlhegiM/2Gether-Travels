import { useQuery } from "@tanstack/react-query";
import { Download, FileText, MapPin, Shield, Plane, CreditCard, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import type { FAQ } from "@shared/schema";

export default function Resources() {
  const { data: faqs } = useQuery<FAQ[]>({
    queryKey: ["/api/faqs"],
  });

  const handleDownload = (resource: string) => {
    // In a real implementation, this would trigger actual file downloads
    toast({
      title: "Download Started",
      description: `${resource} is being downloaded to your device.`,
    });
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello! I have a question about AFIIA 2026 travel arrangements.");
    window.open(`https://wa.me/27211234567?text=${message}`, '_blank');
  };

  const resources = [
    {
      title: "AFIIA 2026 Delegate Guide",
      description: "Complete guide covering travel, accommodation, and conference information",
      size: "2.3 MB",
      type: "PDF",
      category: "Essential",
    },
    {
      title: "Cape Town Travel Essentials",
      description: "Visa requirements, currency, weather, and local customs guide",
      size: "1.8 MB",
      type: "PDF", 
      category: "Travel Info",
    },
    {
      title: "Professional Packing Checklist",
      description: "What to pack for business travel and networking events in Cape Town",
      size: "450 KB",
      type: "PDF",
      category: "Travel Tips",
    },
    {
      title: "Hotel & Venue Maps",
      description: "Detailed maps showing hotel locations and routes to conference venue",
      size: "3.1 MB",
      type: "PDF",
      category: "Navigation",
    },
    {
      title: "Corporate Booking Guide",
      description: "Instructions for invoice processing, PO requirements, and expense reporting",
      size: "1.2 MB",
      type: "PDF",
      category: "Business",
    },
    {
      title: "Emergency Contacts Card",
      description: "Important phone numbers and addresses for emergencies in Cape Town",
      size: "200 KB",
      type: "PDF",
      category: "Safety",
    }
  ];

  const travelTips = [
    {
      icon: Plane,
      title: "Flight & Visa Information",
      tips: [
        "Book flights 6-8 weeks in advance for best rates",
        "Check visa requirements 60 days before travel", 
        "Arrive 1 day early to adjust for time zone differences",
        "Consider travel insurance for international trips"
      ]
    },
    {
      icon: Shield,
      title: "Safety & Health",
      tips: [
        "Cape Town is generally safe for business travelers",
        "Use hotel safes for valuables and documents",
        "Stay in groups when exploring the city in the evening",
        "Keep copies of important documents in separate luggage"
      ]
    },
    {
      icon: CreditCard,
      title: "Money & Payments",
      tips: [
        "South African Rand (ZAR) is the local currency",
        "US Dollars widely accepted at hotels and major venues",
        "Credit cards accepted at most professional establishments",
        "Notify your bank of international travel plans"
      ]
    },
    {
      icon: MapPin,
      title: "Local Etiquette",
      tips: [
        "Business dress code is formal during conference hours",
        "Smart casual appropriate for networking events",
        "Tipping 10-15% is standard at restaurants",
        "Handshakes are the standard business greeting"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy to-afiia-blue text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading font-bold text-4xl lg:text-6xl mb-6" data-testid="heading-resources">
              Travel Resources & Support
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white/90">
              Everything you need for a successful AFIIA 2026 experience in Cape Town.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Comprehensive guides & checklists
              </div>
              <div className="bg-gold text-navy px-4 py-2 rounded-full text-sm">
                Professional travel support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Downloadable Resources */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-4" data-testid="heading-downloads">
              Download Essential Guides
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              Comprehensive resources to help you prepare for your Cape Town conference experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <Card key={index} className="card-base" data-testid={`resource-${index}`}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal to-gold rounded-card flex items-center justify-center">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="outline">{resource.category}</Badge>
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-navy mb-2">{resource.title}</h3>
                  <p className="text-slate text-sm">{resource.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-slate">
                      {resource.type} • {resource.size}
                    </div>
                    <Button 
                      size="sm" 
                      className="btn-primary"
                      onClick={() => handleDownload(resource.title)}
                      data-testid={`button-download-${index}`}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Tips */}
      <section className="py-16 lg:py-24 bg-mist">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-4" data-testid="heading-travel-tips">
              Professional Travel Tips
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              Expert advice for business travelers visiting Cape Town
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {travelTips.map((category, index) => (
              <Card key={index} className="card-base p-6" data-testid={`tip-category-${index}`}>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-navy to-teal rounded-card flex items-center justify-center mr-4">
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-navy">{category.title}</h3>
                </div>
                <ul className="space-y-3">
                  {category.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start text-slate" data-testid={`tip-${index}-${tipIndex}`}>
                      <div className="w-2 h-2 bg-teal rounded-full mt-2 mr-3 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-4" data-testid="heading-faq">
              Frequently Asked Questions
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              Quick answers to common questions about AFIIA 2026 travel
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
        </div>
      </section>

      {/* Travel Insurance Information */}
      <section className="py-16 lg:py-24 bg-mist">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-4" data-testid="heading-insurance">
                Travel Insurance Information
              </h2>
              <p className="text-slate text-lg">
                Important information about travel insurance for your AFIIA 2026 trip
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="card-base p-6">
                <h3 className="font-heading font-semibold text-xl text-navy mb-4">Why You Need Travel Insurance</h3>
                <ul className="space-y-3 text-slate">
                  <li className="flex items-start">
                    <Shield className="h-4 w-4 text-teal mt-1 mr-3 flex-shrink-0" />
                    Medical emergencies and hospital coverage
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-4 w-4 text-teal mt-1 mr-3 flex-shrink-0" />
                    Trip cancellation and interruption protection
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-4 w-4 text-teal mt-1 mr-3 flex-shrink-0" />
                    Lost luggage and personal effects coverage
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-4 w-4 text-teal mt-1 mr-3 flex-shrink-0" />
                    Flight delay and missed connection assistance
                  </li>
                </ul>
              </Card>

              <Card className="card-base p-6">
                <h3 className="font-heading font-semibold text-xl text-navy mb-4">Recommended Coverage</h3>
                <ul className="space-y-3 text-slate">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-gold rounded-full mt-2 mr-3 flex-shrink-0" />
                    Medical coverage: Minimum $100,000
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-gold rounded-full mt-2 mr-3 flex-shrink-0" />
                    Trip cancellation: Full trip cost
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-gold rounded-full mt-2 mr-3 flex-shrink-0" />
                    Baggage protection: $2,500-5,000
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-gold rounded-full mt-2 mr-3 flex-shrink-0" />
                    Emergency evacuation coverage included
                  </li>
                </ul>
              </Card>
            </div>

            <div className="text-center mt-8">
              <p className="text-slate mb-4">
                We recommend purchasing travel insurance within 14 days of your initial trip payment for maximum coverage.
              </p>
              <Button 
                className="btn-primary"
                onClick={() => handleDownload("Travel Insurance Guide")}
                data-testid="button-insurance-guide"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Insurance Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-4" data-testid="heading-support">
              Need More Help?
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              Our travel experts are available to assist with any questions about your AFIIA 2026 journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-base p-6 text-center">
              <div className="w-16 h-16 bg-afiia-green rounded-card mx-auto mb-6 flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-navy mb-4">WhatsApp Support</h3>
              <p className="text-slate mb-6">Quick questions and real-time assistance</p>
              <Button 
                className="bg-afiia-green hover:bg-afiia-green/90 text-white w-full"
                onClick={handleWhatsAppClick}
                data-testid="button-whatsapp-support"
              >
                Chat on WhatsApp
              </Button>
            </Card>

            <Card className="card-base p-6 text-center">
              <div className="w-16 h-16 bg-navy rounded-card mx-auto mb-6 flex items-center justify-center">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-navy mb-4">Phone Consultation</h3>
              <p className="text-slate mb-6">Detailed travel planning assistance</p>
              <Button variant="outline" className="w-full" data-testid="button-phone-support">
                +27 21 123 4567
              </Button>
            </Card>

            <Card className="card-base p-6 text-center">
              <div className="w-16 h-16 bg-teal rounded-card mx-auto mb-6 flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-navy mb-4">Email Support</h3>
              <p className="text-slate mb-6">Detailed inquiries and documentation</p>
              <Button variant="outline" className="w-full" data-testid="button-email-support">
                afiia2026@2gethertravels.com
              </Button>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
