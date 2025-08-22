import { Users, Target, Globe, Award, Heart, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy to-afiia-blue text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading font-bold text-4xl lg:text-6xl mb-6" data-testid="heading-about">
              About 2Gether Travels
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white/90">
              Bringing professionals together, one journey at a time.
            </p>
            <div className="bg-white/20 backdrop-blur-sm px-8 py-4 rounded-full inline-block">
              <span className="font-medium">Founded 2019 • Cape Town, South Africa</span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-6" data-testid="heading-story">
                Our Story
              </h2>
              <div className="space-y-4 text-slate text-lg">
                <p>
                  2Gether Travels was founded with a simple yet powerful vision: to create seamless travel experiences 
                  that bring professional communities together. Born from the realization that business travel should 
                  be more than just logistics, we specialize in creating meaningful connections through expertly 
                  curated travel experiences.
                </p>
                <p>
                  Our focus on the African Institute of Internal Auditors (AFIIA) and similar professional organizations 
                  stems from our deep understanding of the unique needs of finance and audit professionals. We know that 
                  your time is valuable, your standards are high, and your network is everything.
                </p>
                <p>
                  What started as a boutique travel service in Cape Town has grown into a trusted partner for 
                  professional conferences across Africa, with AFIIA 2026 representing our flagship commitment 
                  to excellence in professional travel.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Professional team meeting" 
                className="rounded-card shadow-soft w-full"
                data-testid="img-story"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent rounded-card"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24 bg-mist">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              <Card className="card-base p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-teal rounded-card flex items-center justify-center mr-4">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="font-heading font-bold text-2xl text-navy">Our Mission</h2>
                </div>
                <p className="text-slate text-lg">
                  To deliver exceptional travel experiences that facilitate meaningful professional connections, 
                  support the growth of African finance and audit communities, and set the standard for 
                  business travel excellence across the continent.
                </p>
              </Card>

              <Card className="card-base p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gold rounded-card flex items-center justify-center mr-4">
                    <Globe className="h-6 w-6 text-navy" />
                  </div>
                  <h2 className="font-heading font-bold text-2xl text-navy">Our Vision</h2>
                </div>
                <p className="text-slate text-lg">
                  To become the leading professional travel partner for conferences and events across Africa, 
                  known for our deep understanding of professional communities and our commitment to creating 
                  transformative travel experiences.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-4" data-testid="heading-values">
              Our Values
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              The principles that guide every aspect of our service
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Professional Care",
                description: "We understand the high standards of professional travelers and exceed them with personalized attention to detail.",
                gradient: "from-navy to-teal"
              },
              {
                icon: Shield,
                title: "Trust & Reliability",
                description: "Our reputation is built on consistent delivery, transparent communication, and unwavering reliability.",
                gradient: "from-teal to-gold"
              },
              {
                icon: Users,
                title: "Community Focus",
                description: "We're more than a travel service—we're part of the professional community we serve, invested in your success.",
                gradient: "from-gold to-afiia-blue"
              },
              {
                icon: Award,
                title: "Excellence",
                description: "We pursue excellence in every interaction, every booking, and every experience we create.",
                gradient: "from-afiia-blue to-navy"
              },
              {
                icon: Globe,
                title: "African Pride",
                description: "Proudly showcasing the best of Africa while connecting professionals across the continent and beyond.",
                gradient: "from-navy to-afiia-green"
              },
              {
                icon: Target,
                title: "Innovation",
                description: "Continuously improving our services through technology, feedback, and industry best practices.",
                gradient: "from-afiia-green to-teal"
              }
            ].map((value, index) => (
              <Card key={index} className="card-base p-6 text-center group" data-testid={`value-${index}`}>
                <div className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-card mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-navy mb-4">{value.title}</h3>
                <p className="text-slate">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AFIIA 2026 Focus */}
      <section className="py-16 lg:py-24 bg-mist">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-6" data-testid="heading-afiia-focus">
              Our AFIIA 2026 Commitment
            </h2>
            <p className="text-slate text-lg mb-8">
              AFIIA 2026 represents more than just another conference—it's a pivotal moment for the African 
              internal audit profession. As the official travel partner, we're committed to making this 
              the most successful and memorable AFIIA conference yet.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="card-base p-6">
                <h3 className="font-heading font-semibold text-lg text-navy mb-4">Why Cape Town?</h3>
                <p className="text-slate">
                  Cape Town offers the perfect blend of business sophistication and natural beauty. With world-class 
                  venues, excellent infrastructure, and the warmth of South African hospitality, it provides an 
                  ideal setting for professional networking and knowledge sharing.
                </p>
              </Card>

              <Card className="card-base p-6">
                <h3 className="font-heading font-semibold text-lg text-navy mb-4">Our Special Preparation</h3>
                <p className="text-slate">
                  We've spent months preparing for AFIIA 2026, personally visiting every hotel, testing every 
                  transfer route, and curating experiences that will facilitate meaningful connections among 
                  Africa's top audit professionals.
                </p>
              </Card>
            </div>

            <Link href="/packages">
              <Button className="btn-primary text-lg px-8 py-4" data-testid="button-view-packages">
                Explore AFIIA 2026 Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="African business professionals networking" 
                className="rounded-card shadow-soft w-full"
                data-testid="img-future"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent rounded-card"></div>
            </div>

            <div>
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-6" data-testid="heading-future">
                Looking Ahead
              </h2>
              <div className="space-y-4 text-slate text-lg">
                <p>
                  Beyond AFIIA 2026, we envision 2Gether Travels as the go-to partner for professional 
                  conferences across Africa. We're already working on expanding our services to other 
                  major cities and developing partnerships with leading professional associations.
                </p>
                <p>
                  Our goal is to create a network of seamless professional travel experiences that 
                  strengthen business relationships, facilitate knowledge transfer, and contribute to 
                  the growth of African professional communities.
                </p>
                <p>
                  Whether it's the next AFIIA conference, a regional accounting summit, or a specialized 
                  audit workshop, we're committed to being there, ensuring that every journey brings 
                  professionals together in meaningful ways.
                </p>
              </div>

              <div className="mt-8">
                <Link href="/contact">
                  <Button className="btn-accent mr-4" data-testid="button-contact">
                    Get in Touch
                  </Button>
                </Link>
                <Link href="/partners">
                  <Button variant="outline" data-testid="button-partnerships">
                    Partnership Opportunities
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
