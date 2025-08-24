import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { trackEvent } from "@/lib/analytics";

export default function MobileCTA() {
  const handleMobileBookingClick = () => {
    trackEvent('click_mobile_book_afiia_2026', 'booking', 'mobile_persistent_cta');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-navy p-4 shadow-lg lg:hidden z-40" data-testid="mobile-cta-bar">
      <Link href="/booking">
        <Button
          className="w-full bg-gold hover:bg-gold/90 text-navy font-medium py-3 rounded-card transition-colors text-lg"
          onClick={handleMobileBookingClick}
          data-testid="button-mobile-book-afiia"
        >
          Book AFIIA 2026 Travel
        </Button>
      </Link>
    </div>
  );
}
