import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Plane } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Packages", href: "/packages" },
  { name: "Hotels", href: "/hotels" },
  { name: "Transfers", href: "/transfers" },
  { name: "Tours", href: "/tours" },
  { name: "Concierge", href: "/concierge" },
  { name: "Partners", href: "/partners" },
  { name: "Resources", href: "/resources" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleBookingClick = () => {
    trackEvent('click_book_afiia_2026', 'booking', 'header_cta');
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-soft" data-testid="header-main">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" data-testid="link-home-logo">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-accent rounded-lg flex items-center justify-center">
                <Plane className="text-white text-lg" />
              </div>
              <span className="font-inter font-bold text-xl text-navy">2Gether Travels</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                data-testid={`link-nav-${item.name.toLowerCase()}`}
              >
                <span
                  className={`font-medium transition-colors ${
                    location === item.href
                      ? "text-navy"
                      : "text-slate hover:text-navy"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
          
          {/* Primary CTA */}
          <div className="hidden lg:block">
            <Link href="/booking" data-testid="link-book-afiia-desktop">
              <Button 
                className="btn-primary"
                onClick={handleBookingClick}
                data-testid="button-book-afiia-desktop"
              >
                Book AFIIA 2026 Travel
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="lg:hidden text-navy"
                data-testid="button-mobile-menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`link-mobile-nav-${item.name.toLowerCase()}`}
                  >
                    <span
                      className={`block px-3 py-2 text-base font-medium transition-colors ${
                        location === item.href
                          ? "text-navy bg-mist rounded"
                          : "text-slate hover:text-navy"
                      }`}
                    >
                      {item.name}
                    </span>
                  </Link>
                ))}
                <div className="pt-4 border-t">
                  <Link href="/booking" onClick={() => setMobileMenuOpen(false)}>
                    <Button 
                      className="btn-primary w-full"
                      onClick={handleBookingClick}
                      data-testid="button-book-afiia-mobile"
                    >
                      Book AFIIA 2026 Travel
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
