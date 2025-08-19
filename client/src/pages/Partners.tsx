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
  Plane, 
  Building, 
  Car, 
  Wine, 
  Shield, 
  Hotel, 
  Award, 
  Users, 
  Globe,
  FileText,
  CheckCircle 
} from "lucide-react";
import { useContactSubmission } from "@/hooks/use-booking";
import { trackEvent } from "@/lib/analytics";
import { useToast } from "@/hooks/use-toast";

const partners = [
  { name: "South African Airways", icon: Plane, category: "Airlines", tier: "Platinum" },
  { name: "Ethiopian Airlines", icon: Plane, category: "Airlines", tier: "Gold" },
  { name: "Emirates", icon: Plane, category: "Airlines", tier: "Gold" },
  { name: "Marriott Hotels", icon: Hotel, category: "Hospitality", tier: "Platinum" },
  { name: "Radisson Blu", icon: Hotel, category: "Hospitality", tier: "Gold" },
  { name: "The Table Bay", icon: Hotel, category: "Hospitality", tier: "Gold" },
  { name: "AFIIA", icon: Building, category: "Associations", tier: "Strategic" },
  { name: "IIA Global", icon: Building, category: "Associations", tier: "Strategic" },
  { name: "Cape Town Tours", icon: Car, category: "Transport", tier: "Silver" },
  { name: "Stellenbosch Wine Tours", icon: Wine, category: "Experiences", tier: "Silver" },
  { name: "Travel Guard Insurance", icon: Shield, category: "Insurance", tier: "Gold" }
];

const partnershipTiers = [
  {
    name: "Strategic Partners",
    icon: Award,
    description: "Exclusive partnerships with industry associations and key stakeholders",
    benefits: [
      "Co-marketing opportunities",
      "Exclusive delegate access",
      "Joint event hosting",
      "Strategic planning involvement"
    ],
    color: "from-gold to-navy"
  },
  {
    name: "Platinum Partners", 
    icon: Hotel,
    description: "Premium service providers offering exceptional quality and reliability",
    benefits: [
      "Priority booking status",
      "Preferred rate agreements",
      "Quality assurance programs",
      "Dedicated account management"
    ],
    color: "from-navy to-teal"
  },
  {
    name: "Gold Partners",
    icon: Shield,
    description: "Trusted suppliers meeting our high standards for professional travel",
    benefits: [
      "Regular booking volume",
      "Standard rate agreements",
      "Quality monitoring",
      "Marketing collaboration"
    ],
    color: "from-teal to-gold"
  },
  {
    name: "Silver Partners",
    icon: Users,
    description: "Emerging partners and specialized service providers",
    benefits: [
      "Opportunity for growth",
      "Performance-based advancement",
      "Training and development",
      "Network access"
    ],
    color: "from-afiia-blue to-teal"
  }
];

export default function Partners() {
  const { mutate: submitContact, isPending } = useContactSubmission();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    partnershipType: "",
    message: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submissionData = {
      name: formData.name,
      email: formData.email,
      country: formData.country,
      topic: `Partnership Inquiry - ${formData.partnershipType}`,
      message: `Company: ${formData.company}\nPartnership Type: ${formData.partnershipType}\n\nMessage:\n${formData.message}`
    };

    trackEvent('submit_partnership_inquiry', 'partners', `partnership_${formData.partnershipType}`);

    submitContact(submissionData, {
      onSuccess: () => {
        toast({
          title: "Partnership inquiry submitted!",
          description: "Thank you for your interest. We'll be in touch within 24 hours.",
        });
        setFormData({
          name: "",
          email: "",
          company: "",
          country: "",
          partnershipType: "",
          message: ""
        });
      },
      onError: () => {
        toast({
          title: "Submission failed",
          description: "Please try again or contact us directly.",
          variant: "destructive",
        });
      },
    });
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'Strategic': return <Award className="h-5 w-5 text-gold" />;
      case 'Platinum': return <CheckCircle className="h-5 w-5 text-navy" />;
      case 'Gold': return <CheckCircle className="h-5 w-5 text-gold" />;
      case 'Silver': return <CheckCircle className="h-5 w-5 text-slate" />;
      default: return <CheckCircle className="h-5 w-5 text-teal" />;
    }
  };

  return (
    <div className="min-h-screen" data-testid="page-partners">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-primary text-white py-20 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-gold text-navy px-4 py-2 mb-6 text-sm font-medium">
              Partnership Network
            </Badge>
            <h1 className="font-inter font-bold text-4xl lg:text-6xl mb-6" data-testid="text-partners-hero-title">
              Building Excellence <span className="text-gold">Together</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white/90 max-w-3xl mx-auto" data-testid="text-partners-hero-subtitle">
              We collaborate with the best service providers across Africa and globally to deliver 
              exceptional conference travel experiences for our delegates.
            </p>
          </div>
        </div>
      </section>

      {/* Current Partners */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-inter font-bold text-3xl lg:text-4xl text-navy mb-4" data-testid="text-current-partners-title">
              Our Trusted Partner Network
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              Working with industry-leading organizations to ensure every aspect of your 
              travel experience meets the highest professional standards.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {partners.map((partner, index) => {
              const IconComponent = partner.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow group" data-testid={`card-partner-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 bg-mist rounded-card flex items-center justify-center group-hover:bg-navy group-hover:text-white transition-colors">
                        <IconComponent className="h-6 w-6" />
                      </div>
                    </div>
                    <h3 className="font-inter font-semibold text-sm text-navy mb-2" data-testid={`text-partner-name-${index}`}>
                      {partner.name}
                    </h3>
                    <p className="text-xs text-slate mb-2">{partner.category}</p>
                    <div className="flex items-center justify-center space-x-1">
                      {getTierIcon(partner.tier)}
                      <span className="text-xs text-slate font-medium">{partner.tier}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partnership Tiers */}
      <section className="py-16 lg:py-24 bg-mist">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-inter font-bold text-3xl lg:text-4xl text-navy mb-4" data-testid="text-partnership-tiers-title">
              Partnership Tiers & Benefits
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              We offer different partnership levels designed to create mutually beneficial 
              relationships that enhance the delegate experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {partnershipTiers.map((tier, index) => {
              const IconComponent = tier.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow" data-testid={`card-tier-${index}`}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${tier.color} rounded-card flex items-center justify-center`}>
                        <IconComponent className="text-white h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl text-navy">{tier.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate mb-6">{tier.description}</p>
                    <ul className="space-y-3">
                      {tier.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start" data-testid={`text-tier-benefit-${index}-${benefitIndex}`}>
                          <div className="w-1.5 h-1.5 bg-teal rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-slate">{benefit}</span>
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

      {/* Partnership Requirements */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-inter font-bold text-3xl lg:text-4xl text-navy mb-4" data-testid="text-partnership-requirements-title">
                Partnership Requirements
              </h2>
              <p className="text-slate text-lg">
                We maintain strict quality standards to ensure our delegates receive exceptional service
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-inter font-semibold text-xl text-navy mb-6">Service Standards</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="text-teal h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-slate">Proven track record serving business travelers</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-teal h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-slate">Professional staff and quality service delivery</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-teal h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-slate">Flexible booking and cancellation policies</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-teal h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-slate">24/7 support and emergency assistance</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-inter font-semibold text-xl text-navy mb-6">Business Requirements</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <FileText className="text-navy h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-slate">Valid business licenses and insurance coverage</span>
                  </li>
                  <li className="flex items-start">
                    <FileText className="text-navy h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-slate">Financial stability and payment terms flexibility</span>
                  </li>
                  <li className="flex items-start">
                    <FileText className="text-navy h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-slate">Commitment to sustainable business practices</span>
                  </li>
                  <li className="flex items-start">
                    <FileText className="text-navy h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-slate">Alignment with our values and service philosophy</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Inquiry Form */}
      <section className="py-16 lg:py-24 bg-mist">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-inter font-bold text-3xl lg:text-4xl text-navy mb-4" data-testid="text-partnership-form-title">
                Become a Partner
              </h2>
              <p className="text-slate text-lg">
                Interested in partnering with 2Gether Travels? We'd love to hear from you.
              </p>
            </div>
            
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-center text-navy">Partnership Inquiry</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6" data-testid="form-partnership-inquiry">
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
                        required
                        className="mt-1"
                        placeholder="Your full name"
                        data-testid="input-partner-name"
                      />
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
                        required
                        className="mt-1"
                        placeholder="your@company.com"
                        data-testid="input-partner-email"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="company" className="text-navy font-medium">
                        Company Name *
                      </Label>
                      <Input
                        id="company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        required
                        className="mt-1"
                        placeholder="Your company name"
                        data-testid="input-partner-company"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="country" className="text-navy font-medium">
                        Country *
                      </Label>
                      <Input
                        id="country"
                        type="text"
                        value={formData.country}
                        onChange={(e) => handleInputChange("country", e.target.value)}
                        required
                        className="mt-1"
                        placeholder="Your country"
                        data-testid="input-partner-country"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <Label htmlFor="partnershipType" className="text-navy font-medium">
                        Partnership Type *
                      </Label>
                      <Select value={formData.partnershipType} onValueChange={(value) => handleInputChange("partnershipType", value)}>
                        <SelectTrigger className="mt-1" data-testid="select-partnership-type">
                          <SelectValue placeholder="Select partnership type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hotel">Hotel / Accommodation</SelectItem>
                          <SelectItem value="airline">Airline</SelectItem>
                          <SelectItem value="transport">Transportation</SelectItem>
                          <SelectItem value="tours">Tours & Experiences</SelectItem>
                          <SelectItem value="insurance">Insurance</SelectItem>
                          <SelectItem value="technology">Technology Services</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="md:col-span-2">
                      <Label htmlFor="message" className="text-navy font-medium">
                        Tell us about your services *
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        required
                        className="mt-1"
                        placeholder="Describe your services, experience with business travelers, and why you'd like to partner with us..."
                        rows={5}
                        data-testid="textarea-partnership-message"
                      />
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <Button
                      type="submit"
                      className="btn-primary px-8 py-3 text-lg"
                      disabled={isPending}
                      data-testid="button-submit-partnership"
                    >
                      {isPending ? "Submitting..." : "Submit Partnership Inquiry"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Procurement Note */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-navy text-white rounded-card p-8">
              <div className="w-16 h-16 bg-gold rounded-card mx-auto mb-6 flex items-center justify-center">
                <Globe className="text-navy h-8 w-8" />
              </div>
              <h3 className="font-inter font-bold text-2xl mb-4">Procurement & Vendor Documentation</h3>
              <p className="text-white/90 mb-6">
                We understand corporate procurement requirements and maintain comprehensive vendor 
                documentation including insurance certificates, tax clearances, and compliance records.
              </p>
              <p className="text-white/80 text-sm">
                All partners undergo regular compliance audits and maintain updated vendor documentation 
                to support corporate booking requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileCTA />
    </div>
  );
}
