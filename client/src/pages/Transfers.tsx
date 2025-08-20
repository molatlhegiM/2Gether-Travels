import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Plane, Clock, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import TransferCard from "@/components/transfer-card";
import { toast } from "@/hooks/use-toast";
import type { TransferOption } from "@shared/schema";

export default function Transfers() {
  const [bookingForm, setBookingForm] = useState({
    transferType: "",
    arrivalDate: "",
    arrivalTime: "",
    flightNumber: "",
    departureDate: "",
    departureTime: "",
    departureFlightNumber: "",
    passengers: "1",
    luggage: "standard",
    meetAndGreet: false,
    specialRequests: "",
  });

  const { data: transfers, isLoading } = useQuery<TransferOption[]>({
    queryKey: ["/api/transfers"],
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would create a transfer booking
    toast({
      title: "Transfer Scheduled",
      description: "Your transfer request has been submitted. We'll confirm details within 24 hours.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-mist">
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-slate/20 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-slate/20 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy to-afiia-blue text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading font-bold text-4xl lg:text-6xl mb-6" data-testid="heading-transfers">
              Airport & Conference Transfers
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white/90">
              From touchdown to takeoff, we've got you covered.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm flex items-center">
                <Plane className="h-4 w-4 mr-2" />
                All flight times accommodated
              </div>
              <div className="bg-gold text-navy px-4 py-2 rounded-full text-sm">
                Professional drivers
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transfer Options */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-4">
              Choose Your Transfer Service
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              Reliable transportation options for every budget and preference
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {transfers?.map((transfer) => (
              <TransferCard key={transfer.id} transfer={transfer} />
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 lg:py-24 bg-mist">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-4" data-testid="heading-booking-form">
                Schedule Your Transfer
              </h2>
              <p className="text-slate text-lg">
                Complete your flight details for seamless pickup and drop-off
              </p>
            </div>

            <Card className="card-base">
              <CardHeader>
                <h3 className="font-heading font-semibold text-xl text-navy">Transfer Booking Form</h3>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFormSubmit} className="space-y-6" data-testid="form-transfer-booking">
                  {/* Transfer Type */}
                  <div>
                    <Label htmlFor="transfer-type">Transfer Type</Label>
                    <Select value={bookingForm.transferType} onValueChange={(value) => setBookingForm(prev => ({ ...prev, transferType: value }))}>
                      <SelectTrigger data-testid="select-transfer-type">
                        <SelectValue placeholder="Select transfer type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="shared-shuttle">Shared Shuttle ($45/person)</SelectItem>
                        <SelectItem value="private-sedan">Private Sedan ($120/trip)</SelectItem>
                        <SelectItem value="vip-service">VIP Service ($250/trip)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Arrival Details */}
                    <div className="space-y-4">
                      <h4 className="font-heading font-semibold text-lg text-navy">Arrival Details</h4>
                      
                      <div>
                        <Label htmlFor="arrival-date">Arrival Date</Label>
                        <Input
                          id="arrival-date"
                          type="date"
                          value={bookingForm.arrivalDate}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, arrivalDate: e.target.value }))}
                          data-testid="input-arrival-date"
                        />
                      </div>

                      <div>
                        <Label htmlFor="arrival-time">Arrival Time</Label>
                        <Input
                          id="arrival-time"
                          type="time"
                          value={bookingForm.arrivalTime}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, arrivalTime: e.target.value }))}
                          data-testid="input-arrival-time"
                        />
                      </div>

                      <div>
                        <Label htmlFor="flight-number">Flight Number</Label>
                        <Input
                          id="flight-number"
                          placeholder="e.g., SA123"
                          value={bookingForm.flightNumber}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, flightNumber: e.target.value }))}
                          data-testid="input-flight-number"
                        />
                      </div>
                    </div>

                    {/* Departure Details */}
                    <div className="space-y-4">
                      <h4 className="font-heading font-semibold text-lg text-navy">Departure Details</h4>
                      
                      <div>
                        <Label htmlFor="departure-date">Departure Date</Label>
                        <Input
                          id="departure-date"
                          type="date"
                          value={bookingForm.departureDate}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, departureDate: e.target.value }))}
                          data-testid="input-departure-date"
                        />
                      </div>

                      <div>
                        <Label htmlFor="departure-time">Departure Time</Label>
                        <Input
                          id="departure-time"
                          type="time"
                          value={bookingForm.departureTime}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, departureTime: e.target.value }))}
                          data-testid="input-departure-time"
                        />
                      </div>

                      <div>
                        <Label htmlFor="departure-flight">Departure Flight Number</Label>
                        <Input
                          id="departure-flight"
                          placeholder="e.g., SA456"
                          value={bookingForm.departureFlightNumber}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, departureFlightNumber: e.target.value }))}
                          data-testid="input-departure-flight-number"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="passengers">Number of Passengers</Label>
                      <Select value={bookingForm.passengers} onValueChange={(value) => setBookingForm(prev => ({ ...prev, passengers: value }))}>
                        <SelectTrigger data-testid="select-passengers">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6].map(num => (
                            <SelectItem key={num} value={num.toString()}>{num} passenger{num > 1 ? 's' : ''}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="luggage">Luggage Requirements</Label>
                      <Select value={bookingForm.luggage} onValueChange={(value) => setBookingForm(prev => ({ ...prev, luggage: value }))}>
                        <SelectTrigger data-testid="select-luggage">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light (carry-on only)</SelectItem>
                          <SelectItem value="standard">Standard (1-2 bags per person)</SelectItem>
                          <SelectItem value="heavy">Heavy (3+ bags per person)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="meet-greet"
                      checked={bookingForm.meetAndGreet}
                      onCheckedChange={(checked) => setBookingForm(prev => ({ ...prev, meetAndGreet: !!checked }))}
                      data-testid="checkbox-meet-greet"
                    />
                    <Label htmlFor="meet-greet">Add Meet & Greet Service (+$25)</Label>
                  </div>

                  <div>
                    <Label htmlFor="special-requests">Special Requests</Label>
                    <Textarea
                      id="special-requests"
                      placeholder="Any special requirements or requests..."
                      value={bookingForm.specialRequests}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, specialRequests: e.target.value }))}
                      data-testid="textarea-special-requests"
                    />
                  </div>

                  <Button type="submit" className="btn-primary w-full text-lg py-3" data-testid="button-schedule-transfer">
                    Schedule Transfer
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Transfer Benefits */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-4">
              Why Choose Our Transfer Service?
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              Professional transportation designed for conference delegates
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Fully Insured",
                description: "All vehicles and drivers are fully licensed and insured for your safety"
              },
              {
                icon: Clock,
                title: "Flight Tracking",
                description: "We monitor your flight status and adjust pickup times accordingly"
              },
              {
                icon: Users,
                title: "Professional Drivers",
                description: "Experienced, uniformed drivers familiar with Cape Town routes"
              },
              {
                icon: Plane,
                title: "24/7 Support",
                description: "Round-the-clock assistance for any transfer-related needs"
              }
            ].map((benefit, index) => (
              <Card key={index} className="card-base p-6 text-center" data-testid={`benefit-${index}`}>
                <div className="w-16 h-16 bg-gradient-to-br from-navy to-teal rounded-card mx-auto mb-6 flex items-center justify-center">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-navy mb-3">{benefit.title}</h3>
                <p className="text-slate text-sm">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
