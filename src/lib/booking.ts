import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BookingState {
  packageId?: string;
  hotelId?: string;
  transferId?: string;
  tourIds: string[];
  travelerDetails?: {
    name: string;
    email: string;
    phone: string;
    country: string;
    company?: string;
    specialRequests?: string;
  };
  paymentMethod?: 'card' | 'invoice';
  invoiceDetails?: {
    company?: string;
    vatNumber?: string;
    poNumber?: string;
    billingAddress?: string;
  };
  currentStep: number;
  totalAmount: number;
}

export interface BookingActions {
  setPackage: (packageId: string) => void;
  setHotel: (hotelId: string) => void;
  setTransfer: (transferId: string) => void;
  addTour: (tourId: string) => void;
  removeTour: (tourId: string) => void;
  setTravelerDetails: (details: BookingState['travelerDetails']) => void;
  setPaymentMethod: (method: 'card' | 'invoice') => void;
  setInvoiceDetails: (details: BookingState['invoiceDetails']) => void;
  setCurrentStep: (step: number) => void;
  setTotalAmount: (amount: number) => void;
  resetBooking: () => void;
  nextStep: () => void;
  previousStep: () => void;
}

const initialState: BookingState = {
  tourIds: [],
  currentStep: 1,
  totalAmount: 0,
};

export const useBookingStore = create<BookingState & BookingActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      setPackage: (packageId) => set({ packageId }),
      setHotel: (hotelId) => set({ hotelId }),
      setTransfer: (transferId) => set({ transferId }),
      
      addTour: (tourId) => {
        const { tourIds } = get();
        if (!tourIds.includes(tourId)) {
          set({ tourIds: [...tourIds, tourId] });
        }
      },
      
      removeTour: (tourId) => {
        const { tourIds } = get();
        set({ tourIds: tourIds.filter(id => id !== tourId) });
      },
      
      setTravelerDetails: (details) => set({ travelerDetails: details }),
      setPaymentMethod: (method) => set({ paymentMethod: method }),
      setInvoiceDetails: (details) => set({ invoiceDetails: details }),
      setCurrentStep: (step) => set({ currentStep: step }),
      setTotalAmount: (amount) => set({ totalAmount: amount }),
      
      resetBooking: () => set(initialState),
      
      nextStep: () => {
        const { currentStep } = get();
        if (currentStep < 7) {
          set({ currentStep: currentStep + 1 });
        }
      },
      
      previousStep: () => {
        const { currentStep } = get();
        if (currentStep > 1) {
          set({ currentStep: currentStep - 1 });
        }
      },
    }),
    {
      name: 'booking-storage',
    }
  )
);

export const openWhatsApp = (message?: string) => {
  const defaultMessage = "Hello! I need assistance with AFIIA 2026 travel booking.";
  const whatsappNumber = "+27211234567"; // Should be from environment or API
  const encodedMessage = encodeURIComponent(message || defaultMessage);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};
