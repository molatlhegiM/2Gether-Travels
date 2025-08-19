import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Plane, MessageSquare } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { openWhatsApp } from "@/lib/booking";

const quickLinks = [
  { name: "Packages", href: "/packages" },
  { name: "Hotels", href: "/hotels" },
  { name: "Transfers", href: "/transfers" },
  { name: "Tours", href: "/tours" },
  { name: "Concierge", href: "/concierge" },
];

const supportLinks = [
  { name: "Contact Us", href: "/contact" },
  { name: "FAQ", href: "/#faq" },
  { name: "Travel Guide", href: "/resources" },
  { name: "Booking Help", href: "/resources#booking-help" },
  { name: "Corporate Bookings", href: "/resources#corporate" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Use", href: "/terms" },
  { name: "Accessibility", href: "/accessibility" },
];

const socialLinks = [
  { name: "LinkedIn", href: "#", icon: "fab fa-linkedin" },
  { name: "Twitter", href: "#", icon: "fab fa-twitter" },
  { name: "Instagram", href: "#", icon: "fab fa-instagram" },
];

export default function Footer() {
  const handleWhatsAppClick = () => {
    trackEvent('click_whatsapp_footer', 'support', 'footer_whatsapp');
    openWhatsApp("Hello! I need assistance with AFIIA 2026 travel booking.");
  };

  const handleSocialClick = (platform: string) => {
    trackEvent('click_social_link', 'social', `footer_${platform.toLowerCase()}`);
  };

  return (
    <footer className="bg-ink text-white" data-testid="footer-main">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <Link href="/" data-testid="link-footer-logo">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 gradient-accent rounded-lg flex items-center justify-center">
                  <Plane className="text-white text-lg" />
                </div>
                <span className="font-inter font-bold text-xl">2Gether Travels</span>
              </div>
            </Link>
            <p 
              className="text-slate mb-6"
              data-testid="text-footer-tagline"
            >
              Bringing professionals together, one journey at a time.
            </p>
            
            <Button
              className="bg-afiia-green hover:bg-afiia-green/90 text-white font-medium px-4 py-3 rounded-card transition-colors inline-flex items-center"
              onClick={handleWhatsAppClick}
              data-testid="button-footer-whatsapp"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              WhatsApp Us
            </Button>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-inter font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} data-testid={`link-footer-${link.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <span className="text-slate hover:text-white transition-colors">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="font-inter font-semibold text-lg mb-6">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} data-testid={`link-footer-support-${link.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <span className="text-slate hover:text-white transition-colors">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-inter font-semibold text-lg mb-6">Contact</h3>
            <div className="space-y-4 text-slate">
              <div 
                className="flex items-start space-x-3"
                data-testid="text-footer-email"
              >
                <i className="fas fa-envelope mt-1"></i>
                <span>afiia2026@2gethertravels.com</span>
              </div>
              <div 
                className="flex items-start space-x-3"
                data-testid="text-footer-phone"
              >
                <i className="fas fa-phone mt-1"></i>
                <span>+27 21 123 4567</span>
              </div>
              <div 
                className="flex items-start space-x-3"
                data-testid="text-footer-address"
              >
                <i className="fas fa-map-marker-alt mt-1"></i>
                <span>Cape Town, South Africa</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-slate hover:text-white transition-colors"
                  onClick={() => handleSocialClick(social.name)}
                  data-testid={`link-footer-social-${social.name.toLowerCase()}`}
                >
                  <i className={`${social.icon} text-xl`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-slate/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p 
            className="text-slate text-sm mb-4 md:mb-0"
            data-testid="text-footer-copyright"
          >
            © 2024 2Gether Travels. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            {legalLinks.map((link) => (
              <Link key={link.name} href={link.href} data-testid={`link-footer-legal-${link.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <span className="text-slate hover:text-white transition-colors">
                  {link.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
