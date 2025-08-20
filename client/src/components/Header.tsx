import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
//import Logo from "/logo.png"; // ✅ assuming logo is in /public/logo.png

export default function Header() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Packages", href: "/packages" },
    { name: "Transfers", href: "/transfers" },
    { name: "Resources", href: "/resources" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) =>
    location === href || (href !== "/" && location.startsWith(href));

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-gradient-to-r from-white/70 to-blue-50/60 shadow-sm">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <img
              src="/logo.png"
              alt="2Gether Travels Logo"
              className="w-10 h-10 object-contain rounded-md shadow-md"
            />
            <span className="font-heading font-bold text-xl text-navy">
              2Gether Travels
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-navy border-b-2 border-navy pb-1"
                    : "text-slate hover:text-navy"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link href="/booking">
              <Button className="btn-primary shadow-lg">
                Book AFIIA 2026 Travel
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="lg:hidden flex flex-col space-y-4 mt-4 pb-4 border-t pt-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-lg font-medium ${
                  isActive(item.href)
                    ? "text-navy"
                    : "text-slate hover:text-navy"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link href="/booking" onClick={() => setMenuOpen(false)}>
              <Button className="btn-primary w-full">
                Book AFIIA 2026 Travel
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
