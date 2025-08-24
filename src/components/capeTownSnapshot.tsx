import { Button } from "@/components/ui/button";
import { Shield, DollarSign, Thermometer, UserCheck, Download } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const infoCards = [
  {
    icon: Shield,
    title: "Safety",
    description: "Cape Town is generally safe for conference delegates. Our partners provide secure transfers and vetted accommodations.",
    color: "text-teal"
  },
  {
    icon: DollarSign,
    title: "Currency",
    description: "South African Rand (ZAR). USD widely accepted. Credit cards accepted at major venues and hotels.",
    color: "text-teal"
  },
  {
    icon: Thermometer,
    title: "Weather",
    description: "May is autumn with mild temperatures (15-22°C). Pack layers for conference rooms and outdoor activities.",
    color: "text-teal"
  },
  {
    icon: UserCheck,
    title: "Dress Code",
    description: "Business formal for conference sessions. Smart casual for networking events and tours.",
    color: "text-teal"
  }
];

export default function CapeTownSnapshot() {
  const handleDownloadGuide = () => {
    trackEvent('click_download_delegate_guide', 'resources', 'download_delegate_guide');
    // TODO: Implement actual PDF download
    console.log('Download delegate guide');
  };

  return (
    <section className="py-16 lg:py-24" data-testid="section-cape-town-snapshot">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1580060839134-75a5edca2e99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Cape Town cityscape with Table Mountain"
              className="rounded-card shadow-soft w-full"
              data-testid="img-cape-town-cityscape"
            />
          </div>
          
          <div>
            <h2 
              className="font-inter font-bold text-3xl lg:text-4xl text-navy mb-6"
              data-testid="text-cape-town-title"
            >
              Cape Town Snapshot
            </h2>
            <p 
              className="text-slate text-lg mb-8"
              data-testid="text-cape-town-subtitle"
            >
              Everything you need to know for a successful conference experience
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {infoCards.map((card, index) => {
                const IconComponent = card.icon;
                return (
                  <div 
                    key={index} 
                    className="bg-mist rounded-card p-6"
                    data-testid={`card-cape-town-info-${index}`}
                  >
                    <div className="flex items-center mb-3">
                      <IconComponent className={`${card.color} mr-3 h-5 w-5`} />
                      <h3 
                        className="font-inter font-semibold text-navy"
                        data-testid={`text-cape-town-info-title-${index}`}
                      >
                        {card.title}
                      </h3>
                    </div>
                    <p 
                      className="text-slate text-sm"
                      data-testid={`text-cape-town-info-description-${index}`}
                    >
                      {card.description}
                    </p>
                  </div>
                );
              })}
            </div>
            
            <Button
              className="btn-secondary px-8 py-4 rounded-cta transition-colors inline-flex items-center"
              onClick={handleDownloadGuide}
              data-testid="button-download-delegate-guide"
            >
              <Download className="mr-3 h-5 w-5" />
              Download Delegate Guide
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
