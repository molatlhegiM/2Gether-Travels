import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNewsletterSubscription } from "@/hooks/use-booking";
import { trackEvent } from "@/lib/analytics";
import { useToast } from "@/hooks/use-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { mutate: subscribe, isPending } = useNewsletterSubscription();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    trackEvent('submit_newsletter_signup', 'newsletter', 'newsletter_subscription');
    
    subscribe(email, {
      onSuccess: () => {
        toast({
          title: "Subscribed!",
          description: "Thank you for subscribing to our newsletter.",
        });
        setEmail("");
      },
      onError: () => {
        toast({
          title: "Subscription failed",
          description: "Please try again or contact support.",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <section className="py-16 lg:py-24 gradient-primary text-white" data-testid="section-newsletter">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            className="font-inter font-bold text-3xl lg:text-4xl mb-6"
            data-testid="text-newsletter-title"
          >
            Stay Updated
          </h2>
          <p 
            className="text-xl mb-8 text-white/90"
            data-testid="text-newsletter-subtitle"
          >
            Get the latest updates about AFIIA 2026 and exclusive travel offers
          </p>
          
          <form 
            onSubmit={handleSubmit} 
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            data-testid="form-newsletter-signup"
          >
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-card text-navy placeholder-slate border-0 focus:outline-none focus:ring-2 focus:ring-gold"
              required
              disabled={isPending}
              data-testid="input-newsletter-email"
            />
            <Button
                type="submit"
                className="bg-gold text-navy font-medium px-6 py-3 rounded-card transition-colors whitespace-nowrap hover:opacity-90"
                disabled={isPending}
                data-testid="button-newsletter-subscribe"
         >
               {isPending ? "Subscribing..." : "Subscribe"}
                    </Button>
          </form>
          
          <p 
            className="text-sm text-white/70 mt-4"
            data-testid="text-newsletter-disclaimer"
          >
            No spam, unsubscribe anytime. Privacy policy applies.
          </p>
        </div>
      </div>
    </section>
  );
}
