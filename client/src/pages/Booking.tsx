import { useEffect } from "react";
import Header from "@/components/Header";
import BookingWizard from "@/components/booking/BookingWizard";
import { useBookingStore } from "@/lib/booking";
import { trackEvent } from "@/lib/analytics";

export default function Booking() {
  const { resetBooking } = useBookingStore();

  useEffect(() => {
    // Track booking page view
    trackEvent('view_booking_page', 'booking', 'booking_page_view');
    
    // Reset booking state when entering booking flow
    // This ensures a clean start for new bookings
    const shouldReset = sessionStorage.getItem('new_booking_session');
    if (shouldReset) {
      resetBooking();
      sessionStorage.removeItem('new_booking_session');
    }
  }, [resetBooking]);

  return (
    <div className="min-h-screen bg-mist" data-testid="page-booking">
      <Header />
      <BookingWizard />
    </div>
  );
}
