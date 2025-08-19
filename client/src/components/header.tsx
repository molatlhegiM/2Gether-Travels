import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Plane, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const isActive = (href: string) => {
    return location === href || (href !== "/" && location.startsWith(href));
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-soft">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3" data-testid="link-home">
            <div className="w-10 h-10 bg-gradient-to-br from-gold to-teal rounded-lg flex items-center justify-center">
              <Plane className="text-white text-lg" />
            </div>
            <span className="font-heading font-bold text-xl text-navy">2Gether Travels</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-navy"
                    : "text-slate hover:text-navy"
                }`}
                data-testid={`link-${item.name.toLowerCase()}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Primary CTA */}
          <div className="hidden lg:block">
            <Link href="/booking" data-testid="button-book-afiia">
              <Button className="btn-primary">
                Book AFIIA 2026 Travel
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-navy" data-testid="button-mobile-menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-lg font-medium transition-colors ${
                      isActive(item.href)
                        ? "text-navy"
                        : "text-slate hover:text-navy"
                    }`}
                    onClick={() => setMobileOpen(false)}
                    data-testid={`link-mobile-${item.name.toLowerCase()}`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 border-t">
                  <Link href="/booking" onClick={() => setMobileOpen(false)} data-testid="button-mobile-book-afiia">
                    <Button className="btn-primary w-full">
                      Book AFIIA 2026 Travel
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-navy p-4 shadow-lg lg:hidden z-40">
        <Link href="/booking" data-testid="button-mobile-sticky-book">
          <Button className="btn-accent w-full text-lg py-3">
            Book AFIIA 2026 Travel
          </Button>
        </Link>
      </div>
    </header>
  );
}
