import { Users, Handshake, Shield, Heart } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Tailored for Auditors",
    description: "Purpose-built packages understanding the unique needs of professional auditors",
    gradient: "from-navy to-teal"
  },
  {
    icon: Handshake,
    title: "Networking-Friendly",
    description: "Curated experiences designed to facilitate meaningful professional connections",
    gradient: "from-teal to-gold"
  },
  {
    icon: Shield,
    title: "Trusted Partnerships",
    description: "Established relationships with premium hotels, venues, and service providers",
    gradient: "from-gold to-navy"
  },
  {
    icon: Heart,
    title: "Peace of Mind",
    description: "24/7 support and comprehensive travel insurance for worry-free conferences",
    gradient: "from-afiia-blue to-teal"
  }
];

export default function WhyTogether() {
  return (
    <section className="py-16 lg:py-24" data-testid="section-why-together">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            className="font-inter font-bold text-3xl lg:text-4xl text-navy mb-4"
            data-testid="text-why-together-title"
          >
            Why 2Gether?
          </h2>
          <p 
            className="text-slate text-lg max-w-2xl mx-auto"
            data-testid="text-why-together-subtitle"
          >
            Professional travel solutions designed specifically for auditors and finance professionals
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index} 
                className="text-center group"
                data-testid={`card-why-feature-${index}`}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-card mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <IconComponent className="text-white text-2xl h-8 w-8" />
                </div>
                <h3 
                  className="font-inter font-semibold text-lg text-navy mb-4"
                  data-testid={`text-why-feature-title-${index}`}
                >
                  {feature.title}
                </h3>
                <p 
                  className="text-slate"
                  data-testid={`text-why-feature-description-${index}`}
                >
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
