import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PackagePicker from "@/components/PackagePicker";
import WhyTogether from "@/components/WhyTogether";
import Hotels from "@/components/Hotels";
import Transfers from "@/components/Transfers";
import Tours from "@/components/Tours";
import Concierge from "@/components/Concierge";
import Partnerships from "@/components/Partnerships";
import CapeTownSnapshot from "@/components/CapeTownSnapshot";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";

export default function Home() {
  return (
    <div className="min-h-screen" data-testid="page-home">
      <Header />
      <Hero />
      <PackagePicker />
      <WhyTogether />
      <Hotels />
      <Transfers />
      <Tours />
      <Concierge />
      <Partnerships />
      <CapeTownSnapshot />
      <Testimonials />
      <FAQ />
      <Newsletter />
      <Footer />
      <MobileCTA />
    </div>
  );
}
