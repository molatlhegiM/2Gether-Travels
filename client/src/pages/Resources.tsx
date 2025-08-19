import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Download, 
  FileText, 
  MapPin, 
  Calendar, 
  Plane, 
  Building,
  CreditCard,
  Phone,
  Shield,
  Globe,
  Clock,
  Users
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const resources = [
  {
    category: "Conference Information",
    icon: Building,
    items: [
      {
        title: "AFIIA 2026 Delegate Guide",
        description: "Complete conference program, venues, and networking schedule",
        type: "PDF Download",
        icon: FileText,
        action: "download"
      },
      {
        title: "Conference Venue Map",
        description: "Detailed floor plans and room locations for all sessions",
        type: "PDF Download", 
        icon: MapPin,
        action: "download"
      },
      {
        title: "Networking Events Schedule",
        description: "All official and unofficial networking opportunities",
        type: "PDF Download",
        icon: Calendar,
        action: "download"
      }
    ]
  },
  {
    category: "Travel Documentation",
    icon: Plane,
    items: [
      {
        title: "South Africa Visa Requirements",
        description: "Entry requirements and visa application process for your country",
        type: "Interactive Guide",
        icon: Globe,
        action: "view"
      },
      {
        title: "Cape Town Travel Guide",
        description: "Essential information about the city, culture, and attractions",
        type: "PDF Download",
        icon: MapPin,
        action: "download"
      },
      {
        title: "Packing Checklist",
        description: "What to pack for May weather and professional meetings",
        type: "PDF Download",
        icon: FileText,
        action: "download"
      }
    ]
  },
  {
    category: "Booking Support",
    icon: CreditCard,
    items: [
      {
        title: "Booking Help Center",
        description: "Step-by-step guide to completing your travel booking",
        type: "Online Guide",
        icon: Users,
        action: "view"
      },
      {
        title: "Corporate Booking Guide",
        description: "Instructions for procurement teams and invoice processing",
        type: "PDF Download", 
        icon: Building,
        action: "download"
      },
      {
        title: "Payment Options Guide",
        description: "All available payment methods and corporate billing options",
        type: "Online Guide",
        icon: CreditCard,
        action: "view"
      }
    ]
  }
];

const quickLinks = [
  {
    title: "Emergency Contacts",
    description: "24/7 support numbers and emergency assistance",
    icon: Phone,
    color: "bg-red-500"
  },
  {
    title: "Travel Insurance",
    description: "Coverage options and claim procedures",
    icon: Shield,
    color: "bg-teal"
  },
  {
    title: "Airport Information",
    description: "Cape Town International Airport guide and transfers",
    icon: Plane,
    color: "bg-navy"
  },
  {
    title: "Time Zone & Weather",
    description: "Local time, weather forecasts, and what to expect",
    icon: Clock,
    color: "bg-gold"
  }
];

const faqSections = [
  {
    title: "Booking & Payments",
    items: [
      {
        question: "Can I modify my booking after confirmation?",
        answer: "Yes, modifications are allowed up to 30 days before travel. Changes may incur fees depending on the type of modification and supplier policies. Our concierge team assists with all changes."
      },
      {
        question: "Do you accept corporate invoices?",
        answer: "Absolutely. We work with corporate finance teams and can process payments via invoice with NET 30 terms. PO numbers are accepted and all necessary documentation is provided."
      },
      {
        question: "What happens if my flight is cancelled?",
        answer: "Our concierge team will immediately assist with rebooking and accommodation adjustments. We work with your airline and our partners to minimize disruption to your conference attendance."
      }
    ]
  },
  {
    title: "Travel & Visa",
    items: [
      {
        question: "Do I need a visa to enter South Africa?",
        answer: "Visa requirements depend on your nationality. Citizens of many countries can enter visa-free for short stays. Check our visa guide or consult the South African embassy in your country."
      },
      {
        question: "What documents do I need for travel?",
        answer: "You'll need a valid passport with at least 6 months validity and 2 blank pages. Some nationalities require visas. We recommend carrying copies of all documents and keeping originals secure."
      },
      {
        question: "Is Cape Town safe for international visitors?",
        answer: "Cape Town is generally safe for tourists who take standard precautions. Our partners provide secure transfers and vetted accommodations. Our concierge team provides local safety guidance."
      }
    ]
  },
  {
    title: "Conference Support",
    items: [
      {
        question: "How do I get to the conference venue each day?",
        answer: "All our packages include daily transfers to the conference venue. Shared shuttles run on schedule, while private transfers offer flexible timing based on your preferences."
      },
      {
        question: "Can you help with networking introductions?",
        answer: "Our networking tours are specifically designed to facilitate professional connections. Our guides help with introductions and our concierge can arrange business meetings."
      },
      {
        question: "What if I need to extend my stay?",
        answer: "We can help arrange extended accommodation and modify your return transfers. Contact our concierge team as early as possible for the best rates and availability."
      }
    ]
  }
];

export default function Resources() {
  const handleDownload = (resourceTitle: string) => {
    trackEvent('download_resource', 'resources', `download_${resourceTitle.toLowerCase().replace(/\s+/g, '_')}`);
    // TODO: Implement actual download functionality
    console.log(`Download: ${resourceTitle}`);
  };

  const handleViewGuide = (guideTitle: string) => {
    trackEvent('view_guide', 'resources', `view_${guideTitle.toLowerCase().replace(/\s+/g, '_')}`);
    // TODO: Implement guide viewing functionality
    console.log(`View: ${guideTitle}`);
  };

  return (
    <div className="min-h-screen" data-testid="page-resources">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-primary text-white py-20 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-gold text-navy px-4 py-2 mb-6 text-sm font-medium">
              Travel Resources & Support
            </Badge>
            <h1 className="font-inter font-bold text-4xl lg:text-6xl mb-6" data-testid="text-resources-hero-title">
              Everything You Need for <span className="text-gold">AFIIA 2026</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white/90 max-w-3xl mx-auto" data-testid="text-resources-hero-subtitle">
              Comprehensive guides, documents, and support resources to ensure your 
              Cape Town conference experience is seamless from start to finish.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 lg:py-24 bg-mist">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-inter font-bold text-3xl lg:text-4xl text-navy mb-4" data-testid="text-quick-links-title">
              Quick Access
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              Essential information at your fingertips
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {quickLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow cursor-pointer" data-testid={`card-quick-link-${index}`}>
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 ${link.color} rounded-card mx-auto mb-4 flex items-center justify-center`}>
                      <IconComponent className="text-white h-6 w-6" />
                    </div>
                    <h3 className="font-inter font-semibold text-navy mb-2" data-testid={`text-quick-link-title-${index}`}>
                      {link.title}
                    </h3>
                    <p className="text-slate text-sm">{link.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-inter font-bold text-3xl lg:text-4xl text-navy mb-4" data-testid="text-resources-title">
              Travel Resources
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              Download guides, access interactive tools, and get all the information you need 
              for a successful conference experience.
            </p>
          </div>
          
          <div className="space-y-12 max-w-6xl mx-auto">
            {resources.map((category, categoryIndex) => {
              const CategoryIcon = category.icon;
              return (
                <div key={categoryIndex} data-testid={`section-resource-category-${categoryIndex}`}>
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-10 h-10 bg-gradient-to-br from-navy to-teal rounded-card flex items-center justify-center">
                      <CategoryIcon className="text-white h-6 w-6" />
                    </div>
                    <h3 className="font-inter font-bold text-2xl text-navy">{category.category}</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.items.map((item, itemIndex) => {
                      const ItemIcon = item.icon;
                      return (
                        <Card key={itemIndex} className="hover:shadow-lg transition-shadow" data-testid={`card-resource-${categoryIndex}-${itemIndex}`}>
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-mist rounded-card flex items-center justify-center">
                                  <ItemIcon className="text-navy h-5 w-5" />
                                </div>
                                <div>
                                  <CardTitle className="text-lg text-navy" data-testid={`text-resource-title-${categoryIndex}-${itemIndex}`}>
                                    {item.title}
                                  </CardTitle>
                                  <Badge variant="secondary" className="text-xs mt-1">
                                    {item.type}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-slate text-sm mb-4">{item.description}</p>
                            <Button
                              className={`w-full ${item.action === 'download' ? 'btn-primary' : 'btn-secondary'}`}
                              onClick={() => item.action === 'download' ? handleDownload(item.title) : handleViewGuide(item.title)}
                              data-testid={`button-resource-${categoryIndex}-${itemIndex}`}
                            >
                              {item.action === 'download' ? (
                                <>
                                  <Download className="mr-2 h-4 w-4" />
                                  Download
                                </>
                              ) : (
                                <>
                                  <FileText className="mr-2 h-4 w-4" />
                                  View Guide
                                </>
                              )}
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-mist">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-inter font-bold text-3xl lg:text-4xl text-navy mb-4" data-testid="text-faq-title">
              Frequently Asked Questions
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              Find answers to common questions about booking, travel, and conference attendance
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {faqSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-8" data-testid={`section-faq-${sectionIndex}`}>
                <h3 className="font-inter font-semibold text-xl text-navy mb-4">{section.title}</h3>
                <Accordion type="single" collapsible className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <AccordionItem key={itemIndex} value={`${sectionIndex}-${itemIndex}`} className="bg-white rounded-card shadow-soft px-6">
                      <AccordionTrigger className="text-left font-medium text-navy hover:no-underline" data-testid={`button-faq-${sectionIndex}-${itemIndex}`}>
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-slate" data-testid={`text-faq-answer-${sectionIndex}-${itemIndex}`}>
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-navy text-white rounded-card p-12">
              <h3 className="font-inter font-bold text-3xl mb-6">Still Need Help?</h3>
              <p className="text-white/90 text-lg mb-8">
                Our support team is available 24/7 to assist with any questions about your 
                AFIIA 2026 travel plans.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="bg-afiia-green hover:bg-afiia-green/90 text-white font-medium px-8 py-4 rounded-cta inline-flex items-center"
                  onClick={() => trackEvent('click_whatsapp_support', 'support', 'resources_whatsapp')}
                  data-testid="button-whatsapp-support"
                >
                  <Phone className="mr-3 h-5 w-5" />
                  WhatsApp Support
                </Button>
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 font-medium px-8 py-4 rounded-cta"
                  onClick={() => trackEvent('click_email_support', 'support', 'resources_email')}
                  data-testid="button-email-support"
                >
                  Email Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileCTA />
    </div>
  );
}
