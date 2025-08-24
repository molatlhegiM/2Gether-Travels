import { useState } from "react";
import { Plane, Building, Car, MapPin, Star, Users, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

export default function Partners() {
  const [partnershipForm, setPartnershipForm] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    partnershipType: "",
    description: "",
    services: [] as string[],
    experience: "",
    complianceReady: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleServiceToggle = (service: string) => {
    setPartnershipForm(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real implementation, this would send to a partnerships endpoint
      toast({
        title: "Partnership Inquiry Sent",
        description: "We'll review your application and respond within 3 business days.",
      });

      setPartnershipForm({
        companyName: "",
        contactName: "",
        email: "",
        phone: "",
        partnershipType: "",
        description: "",
        services: [],
        experience: "",
        complianceReady: false,
      });
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const partnerTypes = [
    {
      icon: Building,
      title: "Hotels & Accommodations",
      description: "Premium properties within 30 minutes of major conference venues",
      benefits: ["Direct booking channel", "Group rate negotiations", "Quality assurance program"],
      requirements: ["4-5 star rating", "Business amenities", "Professional service standards"]
    },
    {
      icon: Plane,
      title: "Airlines",
      description: "Regional and international carriers serving African business routes",
      benefits: ["Preferred booking status", "Group discounts", "Schedule coordination"],
      requirements: ["African route network", "Business class service", "Reliable schedule"]
    },
    {
      icon: Car,
      title: "Ground Transportation",
      description: "Professional transfer and tour operators with proven track records",
      benefits: ["Preferred vendor status", "Volume pricing", "Co-marketing opportunities"],
      requirements: ["Licensed operations", "Professional drivers", "Fleet maintenance"]
    },
    {
      icon: MapPin,
      title: "Tour Operators",
      description: "Cultural and business tour specialists for professional groups",
      benefits: ["Exclusive tour packages", "Professional networking focus", "Marketing support"],
      requirements: ["Professional tour guides", "Business group experience", "Cultural expertise"]
    }
  ];

  const currentPartners = [
    { name: "South African Airways", type: "Airline", logo: "🇿🇦", status: "Platinum Partner" },
    { name: "Marriott Hotels", type: "Hotel", logo: "🏨", status: "Gold Partner" },
    { name: "Cape Town Tourism", type: "Tourism", logo: "🗻", status: "Official Partner" },
    { name: "Europcar", type: "Car Rental", logo: "🚗", status: "Silver Partner" },
    { name: "SAA Voyager", type: "Loyalty Program", logo: "✈️", status: "Preferred Partner" },
    { name: "Protea Hotels", type: "Hotel", logo: "🏢", status: "Gold Partner" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy to-afiia-blue text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading font-bold text-4xl lg:text-6xl mb-6" data-testid="heading-partners">
              Partnership Opportunities
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white/90">
              Join our network of trusted service providers for professional conferences across Africa.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Growing network of professionals
              </div>
              <div className="bg-gold text-navy px-4 py-2 rounded-full text-sm">
                Premium service standards
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-4" data-testid="heading-partnership-types">
              Partnership Categories
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              We work with premium service providers across multiple categories to deliver exceptional experiences
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {partnerTypes.map((type, index) => (
              <Card key={index} className="card-base" data-testid={`partner-type-${index}`}>
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal to-gold rounded-card flex items-center justify-center mr-4">
                      <type.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-heading font-semibold text-xl text-navy">{type.title}</h3>
                  </div>
                  <p className="text-slate">{type.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-heading font-semibold text-navy mb-2">Partnership Benefits</h4>
                      <ul className="text-slate text-sm space-y-1">
                        {type.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center">
                            <Star className="h-3 w-3 text-gold mr-2" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-navy mb-2">Requirements</h4>
                      <ul className="text-slate text-sm space-y-1">
                        {type.requirements.map((requirement, idx) => (
                          <li key={idx} className="flex items-center">
                            <div className="w-2 h-2 bg-teal rounded-full mr-2" />
                            {requirement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Current Partners */}
      <section className="py-16 lg:py-24 bg-mist">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-4" data-testid="heading-current-partners">
              Our Trusted Partners
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              Working with industry leaders to deliver exceptional professional travel experiences
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {currentPartners.map((partner, index) => (
              <Card key={index} className="card-base p-6 text-center" data-testid={`partner-${index}`}>
                <div className="text-4xl mb-4">{partner.logo}</div>
                <h3 className="font-heading font-semibold text-lg text-navy mb-2">{partner.name}</h3>
                <p className="text-slate text-sm mb-3">{partner.type}</p>
                <Badge 
                  className={`${
                    partner.status === 'Platinum Partner' ? 'bg-slate text-white' :
                    partner.status === 'Gold Partner' ? 'bg-gold text-navy' :
                    partner.status === 'Silver Partner' ? 'bg-slate/20 text-slate' :
                    'bg-teal text-white'
                  }`}
                >
                  {partner.status}
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Application Form */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-4" data-testid="heading-partnership-form">
                Apply for Partnership
              </h2>
              <p className="text-slate text-lg">
                Join our network of premium service providers and grow your business with professional travelers
              </p>
            </div>

            <Card className="card-base">
              <CardHeader>
                <h3 className="font-heading font-semibold text-xl text-navy">Partnership Application Form</h3>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFormSubmit} className="space-y-6" data-testid="form-partnership">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="company-name">Company Name</Label>
                      <Input
                        id="company-name"
                        value={partnershipForm.companyName}
                        onChange={(e) => setPartnershipForm(prev => ({ ...prev, companyName: e.target.value }))}
                        required
                        data-testid="input-company-name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="contact-name">Contact Person</Label>
                      <Input
                        id="contact-name"
                        value={partnershipForm.contactName}
                        onChange={(e) => setPartnershipForm(prev => ({ ...prev, contactName: e.target.value }))}
                        required
                        data-testid="input-contact-name"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={partnershipForm.email}
                        onChange={(e) => setPartnershipForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                        data-testid="input-email"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={partnershipForm.phone}
                        onChange={(e) => setPartnershipForm(prev => ({ ...prev, phone: e.target.value }))}
                        required
                        data-testid="input-phone"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="partnership-type">Partnership Category</Label>
                    <Select value={partnershipForm.partnershipType} onValueChange={(value) => setPartnershipForm(prev => ({ ...prev, partnershipType: value }))}>
                      <SelectTrigger data-testid="select-partnership-type">
                        <SelectValue placeholder="Select partnership category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hotel">Hotels & Accommodations</SelectItem>
                        <SelectItem value="airline">Airlines</SelectItem>
                        <SelectItem value="transport">Ground Transportation</SelectItem>
                        <SelectItem value="tours">Tour Operations</SelectItem>
                        <SelectItem value="venue">Conference Venues</SelectItem>
                        <SelectItem value="other">Other Services</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="experience">Years in Business</Label>
                    <Select value={partnershipForm.experience} onValueChange={(value) => setPartnershipForm(prev => ({ ...prev, experience: value }))}>
                      <SelectTrigger data-testid="select-experience">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2">1-2 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Services Offered (select all that apply)</Label>
                    <div className="grid md:grid-cols-2 gap-3 mt-2">
                      {["Group bookings", "Corporate rates", "24/7 support", "Flexible cancellation", "Invoice billing", "Quality assurance"].map((service) => (
                        <div key={service} className="flex items-center space-x-2">
                          <Checkbox
                              id={service}
                              checked={partnershipForm.services.includes(service)}
                              onCheckedChange={() => handleServiceToggle(service)}
                              data-testid={`checkbox-${service?.toLowerCase().replace(/\s+/g, '-') || ''}`}
                          />

                          <Label htmlFor={service} className="cursor-pointer">
                            {service}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Company & Services Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Tell us about your company, services, and why you'd like to partner with 2Gether Travels..."
                      value={partnershipForm.description}
                      onChange={(e) => setPartnershipForm(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                      required
                      data-testid="textarea-description"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="compliance"
                      checked={partnershipForm.complianceReady}
                      onCheckedChange={(checked) => setPartnershipForm(prev => ({ ...prev, complianceReady: !!checked }))}
                      data-testid="checkbox-compliance"
                    />
                    <Label htmlFor="compliance" className="cursor-pointer">
                      We can provide all necessary compliance documentation and vendor registration requirements
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    className="btn-primary w-full text-lg py-3"
                    disabled={isSubmitting}
                    data-testid="button-apply-partnership"
                  >
                    {isSubmitting ? "Submitting Application..." : "Submit Partnership Application"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-16 lg:py-24 bg-mist">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-4" data-testid="heading-partnership-benefits">
              Why Partner with 2Gether?
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              Benefits of joining our premium service provider network
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Professional Clientele",
                description: "Access to high-value corporate and professional travelers with consistent booking patterns"
              },
              {
                icon: Star,
                title: "Quality Standards",
                description: "Be part of a curated network known for exceptional service and professional excellence"
              },
              {
                icon: Building,
                title: "Business Growth",
                description: "Expand your corporate client base through our established professional networks"
              }
            ].map((benefit, index) => (
              <Card key={index} className="card-base p-6 text-center" data-testid={`benefit-${index}`}>
                <div className="w-16 h-16 bg-gradient-to-br from-navy to-teal rounded-card mx-auto mb-6 flex items-center justify-center">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-navy mb-4">{benefit.title}</h3>
                <p className="text-slate">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-6" data-testid="heading-partnership-contact">
              Partnership Inquiries
            </h2>
            <p className="text-slate text-lg mb-8">
              Have questions about partnership opportunities? Get in touch with our business development team.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary" data-testid="button-email-partnerships">
                <Mail className="h-4 w-4 mr-2" />
                partnerships@2gethertravels.com
              </Button>
              <Button variant="outline" data-testid="button-call-partnerships">
                +27 21 123 4567
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
