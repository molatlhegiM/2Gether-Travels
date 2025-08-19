import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-gold fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section className="py-16 lg:py-24 bg-mist" data-testid="section-testimonials">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            className="font-inter font-bold text-3xl lg:text-4xl text-navy mb-4"
            data-testid="text-testimonials-title"
          >
            What Delegates Say
          </h2>
          <p 
            className="text-slate text-lg max-w-2xl mx-auto"
            data-testid="text-testimonials-subtitle"
          >
            Trusted by auditors and finance professionals across Africa
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white rounded-card shadow-soft p-8"
              data-testid={`card-testimonial-${testimonial.id}`}
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={`${testimonial.author} professional headshot`}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                  data-testid={`img-testimonial-${testimonial.id}`}
                />
                <div>
                  <h4 
                    className="font-inter font-semibold text-navy"
                    data-testid={`text-testimonial-author-${testimonial.id}`}
                  >
                    {testimonial.author}
                  </h4>
                  <p 
                    className="text-slate text-sm"
                    data-testid={`text-testimonial-role-${testimonial.id}`}
                  >
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
              <p 
                className="text-slate italic mb-4"
                data-testid={`text-testimonial-quote-${testimonial.id}`}
              >
                "{testimonial.quote}"
              </p>
              <div className="flex">
                {renderStars(testimonial.rating)}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p 
            className="text-slate text-lg mb-4"
            data-testid="text-testimonials-stats"
          >
            Trusted by <span className="font-bold text-navy">500+</span> delegates from <span className="font-bold text-navy">25+</span> African countries
          </p>
        </div>
      </div>
    </section>
  );
}
