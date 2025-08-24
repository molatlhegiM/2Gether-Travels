import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import type { Package, Hotel, TransferOption, Tour, Booking } from '@shared/schema';

export function usePackages() {
  return useQuery<Package[]>({
    queryKey: ['/api/packages'],
  });
}

export function usePackage(id: string) {
  return useQuery<Package>({
    queryKey: ['/api/packages', id],
    enabled: !!id,
  });
}

export function useHotels() {
  return useQuery<Hotel[]>({
    queryKey: ['/api/hotels'],
  });
}

export function useHotel(id: string) {
  return useQuery<Hotel>({
    queryKey: ['/api/hotels', id],
    enabled: !!id,
  });
}

export function useTransferOptions() {
  return useQuery<TransferOption[]>({
    queryKey: ['/api/transfers'],
  });
}

export function useTransferOption(id: string) {
  return useQuery<TransferOption>({
    queryKey: ['/api/transfers', id],
    enabled: !!id,
  });
}

export function useTours() {
  return useQuery<Tour[]>({
    queryKey: ['/api/tours'],
  });
}

export function useTour(id: string) {
  return useQuery<Tour>({
    queryKey: ['/api/tours', id],
    enabled: !!id,
  });
}

export function useBooking(id: string) {
  return useQuery<Booking>({
    queryKey: ['/api/bookings', id],
    enabled: !!id,
  });
}

export function useBookingByReference(reference: string) {
  return useQuery<Booking>({
    queryKey: ['/api/bookings/reference', reference],
    enabled: !!reference,
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (bookingData: any) => {
      const response = await apiRequest('POST', '/api/bookings', bookingData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
    },
  });
}

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await apiRequest('PATCH', `/api/bookings/${id}/status`, { status });
      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['/api/bookings', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
    },
  });
}

export function useNewsletterSubscription() {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest('POST', '/api/newsletter', { email });
      return response.json();
    },
  });
}

export function useContactSubmission() {
  return useMutation({
    mutationFn: async (formData: {
      name: string;
      email: string;
      country: string;
      topic: string;
      message: string;
    }) => {
      const response = await apiRequest('POST', '/api/contact', formData);
      return response.json();
    },
  });
}
