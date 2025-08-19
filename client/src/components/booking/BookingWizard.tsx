import { useEffect } from "react";
import { useSearchParams } from "wouter";
import { Progress } from "@/components/ui/progress";
import { useBookingStore } from "@/lib/booking";
import PackageStep from "./PackageStep";
import HotelStep from "./HotelStep";
import TransferStep from "./TransferStep";
import TourStep from "./TourStep";
import DetailsStep from "./DetailsStep";
import PaymentStep from "./PaymentStep";
import ConfirmationStep from "./ConfirmationStep";
import ItinerarySummary from "./ItinerarySummary";

const steps = [
  { id: 1, title: "Choose Package", component: PackageStep },
  { id: 2, title: "Select Hotel", component: HotelStep },
  { id: 3, title: "Book Transfers", component: TransferStep },
  { id: 4, title: "Add Tours", component: TourStep },
  { id: 5, title: "Your Details", component: DetailsStep },
  { id: 6, title: "Payment", component: PaymentStep },
  { id: 7, title: "Confirmation", component: ConfirmationStep },
];

export default function BookingWizard() {
  const { currentStep, setPackage, setHotel, setTransfer, addTour } = useBookingStore();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Auto-select items from URL parameters
    const packageParam = searchParams.get('package');
    const hotelParam = searchParams.get('hotel');
    const transferParam = searchParams.get('transfer');
    const tourParam = searchParams.get('tour');

    if (packageParam) setPackage(packageParam);
    if (hotelParam) setHotel(hotelParam);
    if (transferParam) setTransfer(transferParam);
    if (tourParam) addTour(tourParam);
  }, [searchParams, setPackage, setHotel, setTransfer, addTour]);

  const currentStepData = steps.find(step => step.id === currentStep);
  const CurrentStepComponent = currentStepData?.component || PackageStep;

  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-mist" data-testid="booking-wizard">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Progress Header */}
        <div className="bg-white rounded-card shadow-soft p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-inter font-bold text-2xl text-navy" data-testid="text-booking-title">
              AFIIA 2026 Travel Booking
            </h1>
            <span className="text-slate" data-testid="text-booking-step">
              Step {currentStep} of {steps.length}
            </span>
          </div>
          
          <div className="mb-4">
            <Progress value={progressPercentage} className="h-2" data-testid="progress-booking-wizard" />
          </div>
          
          <div className="flex items-center justify-between text-sm">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`text-center ${
                  step.id === currentStep
                    ? 'text-navy font-semibold'
                    : step.id < currentStep
                    ? 'text-teal'
                    : 'text-slate'
                }`}
                data-testid={`text-step-${step.id}`}
              >
                <div className="hidden sm:block">{step.title}</div>
                <div className="sm:hidden">{step.id}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Step Content */}
          <div className="lg:col-span-2">
            <CurrentStepComponent />
          </div>
          
          {/* Itinerary Summary - Desktop */}
          <div className="hidden lg:block">
            <ItinerarySummary />
          </div>
        </div>

        {/* Itinerary Summary - Mobile (Sticky) */}
        <div className="lg:hidden">
          <ItinerarySummary />
        </div>
      </div>
    </div>
  );
}
