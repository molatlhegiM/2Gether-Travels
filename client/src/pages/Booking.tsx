import { useBookingStore } from "@/lib/booking-store";
import BookingWizard from "@/components/booking-wizard";
import BookingSummary from "@/components/booking-summary";

export default function Booking() {
  return (
    <div className="min-h-screen bg-mist">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy to-afiia-blue text-white py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading font-bold text-4xl lg:text-5xl mb-6" data-testid="heading-booking">
              Book Your AFIIA 2026 Experience
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white/90">
              Complete your travel arrangements in just a few simple steps.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                Secure booking process
              </div>
              <div className="bg-gold text-navy px-4 py-2 rounded-full text-sm">
                Save progress automatically
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Main Booking Flow */}
          <div className="flex-1">
            <BookingWizard />
          </div>

          {/* Booking Summary Sidebar */}
          <div className="hidden lg:block w-96 flex-shrink-0">
            <div className="sticky top-24">
              <BookingSummary />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Summary */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate/20 p-4 z-40">
        <BookingSummary compact />
      </div>
    </div>
  );
}
