import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BookingSelection {
  packageId?: string;
  hotelId?: string;
  roomTypeId?: string;
  transferId?: string;
  tourIds: string[];
  checkInDate?: Date;
  checkOutDate?: Date;
}

interface TravelerDetails {
  name: string;
  email: string;
  phone: string;
  country: string;
  specialRequests?: string;
}

interface InvoiceDetails {
  company?: string;
  vatNumber?: string;
  poNumber?: string;
  billingAddress?: string;
}

interface BookingState {
  selection: BookingSelection;
  travelerDetails?: TravelerDetails;
  invoiceDetails?: InvoiceDetails;
  currentStep: number;
  totalAmount: number;
  
  // Actions
  setPackage: (packageId: string) => void;
  setHotel: (hotelId: string, roomTypeId?: string) => void;
  setTransfer: (transferId: string) => void;
  addTour: (tourId: string) => void;
  removeTour: (tourId: string) => void;
  setDates: (checkIn: Date, checkOut: Date) => void;
  setTravelerDetails: (details: TravelerDetails) => void;
  setInvoiceDetails: (details: InvoiceDetails) => void;
  setCurrentStep: (step: number) => void;
  setTotalAmount: (amount: number) => void;
  clearBooking: () => void;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      selection: {
        tourIds: [],
      },
      currentStep: 1,
      totalAmount: 0,
      
      setPackage: (packageId) =>
        set((state) => ({
          selection: { ...state.selection, packageId }
        })),
        
      setHotel: (hotelId, roomTypeId) =>
        set((state) => ({
          selection: { ...state.selection, hotelId, roomTypeId }
        })),
        
      setTransfer: (transferId) =>
        set((state) => ({
          selection: { ...state.selection, transferId }
        })),
        
      addTour: (tourId) =>
        set((state) => ({
          selection: {
            ...state.selection,
            tourIds: [...state.selection.tourIds, tourId]
          }
        })),
        
      removeTour: (tourId) =>
        set((state) => ({
          selection: {
            ...state.selection,
            tourIds: state.selection.tourIds.filter(id => id !== tourId)
          }
        })),
        
      setDates: (checkIn, checkOut) =>
        set((state) => ({
          selection: {
            ...state.selection,
            checkInDate: checkIn,
            checkOutDate: checkOut
          }
        })),
        
      setTravelerDetails: (details) =>
        set({ travelerDetails: details }),
        
      setInvoiceDetails: (details) =>
        set({ invoiceDetails: details }),
        
      setCurrentStep: (step) =>
        set({ currentStep: step }),
        
      setTotalAmount: (amount) =>
        set({ totalAmount: amount }),
        
      clearBooking: () =>
        set({
          selection: { tourIds: [] },
          travelerDetails: undefined,
          invoiceDetails: undefined,
          currentStep: 1,
          totalAmount: 0,
        }),
    }),
    {
      name: 'booking-store',
    }
  )
);
