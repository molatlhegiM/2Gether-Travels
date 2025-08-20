import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Filter, Calendar, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import TourCard from "@/components/tour-card";
import type { Tour } from "@shared/schema";

export default function Tours() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  const { data: tours, isLoading } = useQuery<Tour[]>({
    queryKey: ["/api/tours"],
  });

  const filteredTours = tours?.filter(tour => {
    if (selectedCategory && tour.category !== selectedCategory) return false;
    if (selectedDifficulty && tour.difficulty !== selectedDifficulty) return false;
    return true;
  }) || [];

  const categories = [
    { value: "heritage", label: "Heritage", description: "Historical sites and cultural experiences" },
    { value: "nature", label: "Nature", description: "Wildlife and outdoor adventures" },
    { value: "wine", label: "Wine", description: "Vineyard tours and tastings" },
    { value: "family", label: "Family", description: "Activities suitable for all ages" },
  ];

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading font-semibold text-lg text-navy mb-4">Category</h3>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger data-testid="select-category">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All categories</SelectItem>
            <SelectItem value="heritage">Heritage</SelectItem>
            <SelectItem value="nature">Nature</SelectItem>
            <SelectItem value="wine">Wine</SelectItem>
            <SelectItem value="family">Family</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="font-heading font-semibold text-lg text-navy mb-4">Difficulty</h3>
        <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
          <SelectTrigger data-testid="select-difficulty">
            <SelectValue placeholder="Any difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any difficulty</SelectItem>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="moderate">Moderate</SelectItem>
            <SelectItem value="challenging">Challenging</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button 
        variant="outline" 
        onClick={() => {
          setSelectedCategory("");
          setSelectedDifficulty("");
        }}
        className="w-full"
        data-testid="button-clear-filters"
      >
        Clear Filters
      </Button>
    </div>
  );

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
    <div className="min-h-screen bg-mist">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy to-afiia-blue text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading font-bold text-4xl lg:text-6xl mb-6" data-testid="heading-tours">
              Signature Tours & Experiences
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white/90">
              Build connections beyond the conference room.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Networking opportunities
              </div>
              <div className="bg-gold text-navy px-4 py-2 rounded-full text-sm">
                Professional guides
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-4">
              Tour Categories
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              Curated experiences designed for meaningful professional connections
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {categories.map((category) => (
              <Card 
                key={category.value}
                className={`card-base p-6 cursor-pointer transition-all ${
                  selectedCategory === category.value ? 'ring-2 ring-teal border-teal' : ''
                }`}
                onClick={() => setSelectedCategory(category.value === selectedCategory ? "" : category.value)}
                data-testid={`category-${category.value}`}
              >
                <h3 className="font-heading font-semibold text-lg text-navy mb-2">{category.label}</h3>
                <p className="text-slate text-sm">{category.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 pb-8">
        <div className="flex gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <Card className="card-base p-6 sticky top-24">
              <div className="flex items-center mb-6">
                <Filter className="h-5 w-5 text-teal mr-2" />
                <h2 className="font-heading font-semibold text-lg text-navy">Filters</h2>
              </div>
              <FilterContent />
            </Card>
          </div>

          {/* Mobile Filter Sheet */}
          <div className="lg:hidden fixed top-24 right-4 z-10">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="btn-primary" data-testid="button-mobile-filters">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="mt-8">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Tours List */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="font-heading font-semibold text-2xl text-navy mb-2">
                  Available Tours ({filteredTours.length})
                </h2>
                <p className="text-slate">
                  All tours designed for professional networking
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>

            {filteredTours.length === 0 && (
              <Card className="card-base p-12 text-center">
                <h3 className="font-heading font-semibold text-xl text-navy mb-4">No tours match your criteria</h3>
                <p className="text-slate mb-6">Try adjusting your filters to see more options</p>
                <Button 
                  onClick={() => {
                    setSelectedCategory("");
                    setSelectedDifficulty("");
                  }}
                  className="btn-primary"
                  data-testid="button-clear-filters-empty"
                >
                  Clear Filters
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Tour Benefits */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy mb-4">
              Why Choose Our Tours?
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              Professional experiences crafted for meaningful connections
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Networking Focused",
                description: "Small groups and structured interactions facilitate meaningful professional connections"
              },
              {
                icon: MapPin,
                title: "Local Expertise",
                description: "Professional guides with deep knowledge of Cape Town's history and culture"
              },
              {
                icon: Calendar,
                title: "Flexible Scheduling",
                description: "Pre and post-conference options to fit your travel itinerary"
              }
            ].map((benefit, index) => (
              <Card key={index} className="card-base p-8 text-center" data-testid={`benefit-${index}`}>
                <div className="w-16 h-16 bg-gradient-to-br from-teal to-gold rounded-card mx-auto mb-6 flex items-center justify-center">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-navy mb-4">{benefit.title}</h3>
                <p className="text-slate">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
