import { Link } from "wouter";
import { Plane, MessageCircle, Linkedin, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello! I need assistance with AFIIA 2026 travel booking.");
    const phoneNumber = "+27211234567";
    window.open(`https://wa.me/${phoneNumber.replace('+', '')}?text=${message}`, '_blank');
  };

  const handleSocialClick = (platform: string) => {
    // Placeholder for social media links
    console.log(`Opening ${platform} profile`);
  };

  return (
    <footer className="bg-ink text-white">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-gold to-teal rounded-lg flex items-center justify-center">
                <Plane className="text-white text-lg" />
              </div>
              <span className="font-heading font-bold text-xl">2Gether Travels</span>
            </div>
            <p className="text-slate mb-6">Bringing professionals together, one journey at a time.</p>
            
            {/* WhatsApp Button */}
            <Button 
              className="bg-afiia-green hover:bg-afiia-green/90 text-white font-medium px-4 py-3 rounded-card transition-colors"
              onClick={handleWhatsAppClick}
              data-testid="button-whatsapp-footer"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp Us
            </Button>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/packages" className="text-slate hover:text-white transition-colors" data-testid="link-footer-packages">Packages</Link></li>
              <li><Link href="/hotels" className="text-slate hover:text-white transition-colors" data-testid="link-footer-hotels">Hotels</Link></li>
              <li><Link href="/transfers" className="text-slate hover:text-white transition-colors" data-testid="link-footer-transfers">Transfers</Link></li>
              <li><Link href="/tours" className="text-slate hover:text-white transition-colors" data-testid="link-footer-tours">Tours</Link></li>
              <li><Link href="/concierge" className="text-slate hover:text-white transition-colors" data-testid="link-footer-concierge">Concierge</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Support</h3>
            <ul className="space-y-3">
              <li><Link href="/contact" className="text-slate hover:text-white transition-colors" data-testid="link-footer-contact">Contact Us</Link></li>
              <li><Link href="/resources" className="text-slate hover:text-white transition-colors" data-testid="link-footer-faq">FAQ</Link></li>
              <li><Link href="/resources" className="text-slate hover:text-white transition-colors" data-testid="link-footer-guide">Travel Guide</Link></li>
              <li><Link href="/booking" className="text-slate hover:text-white transition-colors" data-testid="link-footer-booking-help">Booking Help</Link></li>
              <li><Link href="/contact" className="text-slate hover:text-white transition-colors" data-testid="link-footer-corporate">Corporate Bookings</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Contact</h3>
            <div className="space-y-4 text-slate">
              <div className="flex items-start space-x-3">
                <i className="fas fa-envelope mt-1"></i>
                <span data-testid="text-email">afiia2026@2gethertravels.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <i className="fas fa-phone mt-1"></i>
                <span data-testid="text-phone">+27 21 123 4567</span>
              </div>
              <div className="flex items-start space-x-3">
                <i className="fas fa-map-marker-alt mt-1"></i>
                <span data-testid="text-address">Cape Town, South Africa</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              <button 
                onClick={() => handleSocialClick('LinkedIn')} 
                className="text-slate hover:text-white transition-colors"
                data-testid="button-social-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </button>
              <button 
                onClick={() => handleSocialClick('Twitter')} 
                className="text-slate hover:text-white transition-colors"
                data-testid="button-social-twitter"
              >
                <Twitter className="h-5 w-5" />
              </button>
              <button 
                onClick={() => handleSocialClick('Instagram')} 
                className="text-slate hover:text-white transition-colors"
                data-testid="button-social-instagram"
              >
                <Instagram className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate text-sm mb-4 md:mb-0" data-testid="text-copyright">© 2024 2Gether Travels. All rights reserved.</p>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-slate hover:text-white transition-colors" data-testid="link-privacy">Privacy Policy</Link>
            <Link href="/terms" className="text-slate hover:text-white transition-colors" data-testid="link-terms">Terms of Use</Link>
            <Link href="/accessibility" className="text-slate hover:text-white transition-colors" data-testid="link-accessibility">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
