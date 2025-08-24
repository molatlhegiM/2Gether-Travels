import { useState } from "react";
import { ChevronDown, ChevronUp, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { faqData } from "@/data/faq";
import { trackEvent } from "@/lib/analytics";
import { openWhatsApp } from "@/lib/booking";

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set([faqData[0].id]));

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
    trackEvent('click_faq_toggle', 'faq', `toggle_${id}`);
  };

  const handleChatWhatsApp = () => {
    trackEvent('click_chat_whatsapp', 'support', 'faq_whatsapp_chat');
    openWhatsApp("Hello! I have a question about AFIIA 2026 travel that wasn't covered in the FAQ.");
  };

  return (
    <section className="py-16 lg:py-24" data-testid="section-faq">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            className="font-inter font-bold text-3xl lg:text-4xl text-navy mb-4"
            data-testid="text-faq-title"
          >
            Frequently Asked Questions
          </h2>
          <p 
            className="text-slate text-lg max-w-2xl mx-auto"
            data-testid="text-faq-subtitle"
          >
            Quick answers to common queries about AFIIA 2026 travel
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-4">
          {faqData.map((faq) => {
            const isOpen = openItems.has(faq.id);
            return (
              <div 
                key={faq.id} 
                className="bg-white rounded-card shadow-soft"
                data-testid={`card-faq-${faq.id}`}
              >
                <button
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-mist transition-colors"
                  onClick={() => toggleItem(faq.id)}
                  data-testid={`button-faq-toggle-${faq.id}`}
                >
                  <span 
                    className="font-inter font-semibold text-navy pr-4"
                    data-testid={`text-faq-question-${faq.id}`}
                  >
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="text-slate h-5 w-5 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="text-slate h-5 w-5 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div 
                    className="px-6 pb-6 text-slate"
                    data-testid={`text-faq-answer-${faq.id}`}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-slate mb-6">Need more information?</p>
          <Button
            className="bg-afiia-green hover:bg-afiia-green/90 text-white font-medium px-8 py-4 rounded-cta transition-colors inline-flex items-center"
            onClick={handleChatWhatsApp}
            data-testid="button-chat-whatsapp-faq"
          >
            <MessageSquare className="mr-3 h-5 w-5" />
            Chat on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
