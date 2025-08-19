import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Award, Globe, Heart, Target, Eye } from "lucide-react";
import { Link } from "wouter";

const values = [
  {
    icon: Users,
    title: "Professional Focus",
    description: "We understand the unique needs of auditors and finance professionals, crafting experiences that facilitate meaningful business connections."
  },
  {
    icon: Award,
    title: "Excellence",
    description: "From handpicked accommodations to carefully curated tours, we maintain the highest standards in every aspect of your travel experience."
  },
  {
    icon: Globe,
    title: "Cultural Connection",
    description: "We bridge cultures and create opportunities for African professionals to connect, learn, and grow together."
  },
  {
    icon: Heart,
    title: "Personal Care",
    description: "Every traveler receives personalized attention with 24/7 concierge support and comprehensive travel assistance."
  }
];

const team = [
  {
    name: "Sarah Mitchell",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    description: "Former KPMG partner with 15 years in African audit markets"
  },
  {
    name: "David Okafor", 
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    description: "Hospitality veteran with expertise in luxury corporate travel"
  },
  {
    name: "Amira Hassan",
    role: "Concierge Director", 
    image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    description: "Cape Town local with 10+ years in executive travel services"
  }
];

export default function About() {
  return (
    <div className="min-h-screen" data-testid="page-about">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-primary text-white py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-gold text-navy px-4 py-2 mb-6 text-sm font-medium">
              About 2Gether Travels
            </Badge>
            <h1 className="font-inter font-bold text-4xl lg:text-6xl mb-6" data-testid="text-about-hero-title">
              Bringing Professionals <span className="text-gold">Together</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white/90 max-w-3xl mx-auto" data-testid="text-about-hero-subtitle">
              We specialize in creating exceptional travel experiences for African finance professionals, 
              with a focus on meaningful connections and seamless conference attendance.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-6" data-testid="section-mission">
              <div className="flex items-center space-x-3 mb-4">
                <Target className="h-8 w-8 text-teal" />
                <h2 className="font-inter font-bold text-3xl text-navy">Our Mission</h2>
              </div>
              <p className="text-slate text-lg leading-relaxed">
                To transform professional conference travel by creating meaningful connections between 
                African finance professionals while providing exceptional, stress-free travel experiences 
                that allow delegates to focus on what matters most - learning, networking, and growing their careers.
              </p>
              <p className="text-slate text-lg leading-relaxed">
                We understand that attending international conferences like AFIIA 2026 is an investment 
                in professional development, and we're committed to maximizing that investment through 
                thoughtfully designed travel packages and unparalleled support.
              </p>
            </div>
            
            <div className="space-y-6" data-testid="section-vision">
              <div className="flex items-center space-x-3 mb-4">
                <Eye className="h-8 w-8 text-gold" />
                <h2 className="font-inter font-bold text-3xl text-navy">Our Vision</h2>
              </div>
              <p className="text-slate text-lg leading-relaxed">
                To become the leading travel partner for professional conferences across Africa, 
                fostering a connected community of finance and audit professionals who drive 
                economic growth and governance excellence across the continent.
              </p>
              <p className="text-slate text-lg leading-relaxed">
                We envision a future where every professional conference becomes an opportunity 
                not just for learning, but for building lasting relationships that transcend 
                borders and create lasting impact across African economies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-mist">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-inter font-bold text-3xl lg:text-4xl text-navy mb-4" data-testid="text-values-title">
              Our Values
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              The principles that guide everything we do, ensuring exceptional experiences for every traveler
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center group" data-testid={`card-value-${index}`}>
                  <div className="w-16 h-16 bg-gradient-to-br from-navy to-teal rounded-card mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IconComponent className="text-white h-8 w-8" />
                  </div>
                  <h3 className="font-inter font-semibold text-lg text-navy mb-4" data-testid={`text-value-title-${index}`}>
                    {value.title}
                  </h3>
                  <p className="text-slate" data-testid={`text-value-description-${index}`}>
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AFIIA 2026 Focus */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-inter font-bold text-3xl lg:text-4xl text-navy mb-6" data-testid="text-afiia-focus-title">
                AFIIA 2026 Focus
              </h2>
              <p className="text-slate text-lg mb-6">
                The African Federation of Institutes of Internal Auditors (AFIIA) Conference 2026 represents 
                a pivotal moment for the internal audit profession across Africa. As the premier gathering 
                of audit professionals on the continent, this conference will shape the future of governance, 
                risk management, and internal audit practices.
              </p>
              <p className="text-slate text-lg mb-6">
                Cape Town provides the perfect backdrop for this important event, offering world-class 
                conference facilities, diverse cultural experiences, and numerous opportunities for 
                professional networking in one of Africa's most vibrant business hubs.
              </p>
              <div className="bg-afiia-blue/10 rounded-card p-6 mb-6">
                <h4 className="font-inter font-semibold text-navy mb-3">Conference Highlights</h4>
                <ul className="space-y-2 text-slate">
                  <li>• 500+ expected delegates from 25+ African countries</li>
                  <li>• 3 days of intensive sessions and workshops</li>
                  <li>• Networking events at premium Cape Town venues</li>
                  <li>• Cultural tours showcasing South African heritage</li>
                </ul>
              </div>
              <Link href="/packages">
                <Button className="btn-primary" data-testid="button-view-afiia-packages">
                  View AFIIA 2026 Packages
                </Button>
              </Link>
            </div>
            
            <div>
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Professional conference setting in Cape Town"
                className="rounded-card shadow-soft w-full"
                data-testid="img-afiia-conference"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24 bg-mist">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-inter font-bold text-3xl lg:text-4xl text-navy mb-4" data-testid="text-team-title">
              Meet Our Team
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              Experienced professionals dedicated to making your conference experience exceptional
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-card shadow-soft p-8 text-center" data-testid={`card-team-${index}`}>
                <img
                  src={member.image}
                  alt={`${member.name} professional headshot`}
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
                  data-testid={`img-team-${index}`}
                />
                <h3 className="font-inter font-semibold text-xl text-navy mb-2" data-testid={`text-team-name-${index}`}>
                  {member.name}
                </h3>
                <p className="text-teal font-medium mb-4" data-testid={`text-team-role-${index}`}>
                  {member.role}
                </p>
                <p className="text-slate" data-testid={`text-team-description-${index}`}>
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="font-inter font-bold text-3xl lg:text-4xl text-navy mb-6" data-testid="text-future-vision-title">
              Beyond AFIIA 2026
            </h2>
            <p className="text-slate text-lg mb-8">
              While our immediate focus is creating an exceptional AFIIA 2026 experience, we're building 
              for the future. Our vision extends to supporting professional conferences across Africa, 
              creating a network of connected professionals who drive excellence in governance and 
              financial management across the continent.
            </p>
            <p className="text-slate text-lg mb-8">
              Every journey we plan, every connection we facilitate, and every experience we create 
              contributes to a stronger, more connected African professional community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="btn-primary" data-testid="button-contact-us">
                  Get in Touch
                </Button>
              </Link>
              <Link href="/partners">
                <Button variant="outline" data-testid="button-become-partner">
                  Become a Partner
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileCTA />
    </div>
  );
}
