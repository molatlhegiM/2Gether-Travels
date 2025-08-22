import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Packages from "@/pages/packages";
import Hotels from "@/pages/hotels";
import Transfers from "@/pages/transfers";
import Tours from "@/pages/tours";
import Concierge from "@/pages/concierge";
import About from "@/pages/about";
import Partners from "@/pages/partners";
import Resources from "@/pages/resources";
import Contact from "@/pages/contact";
import Booking from "@/pages/booking";
import Header from "@/components/header";
import Footer from "@/components/footer";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/packages" component={Packages} />
          <Route path="/hotels" component={Hotels} />
          <Route path="/transfers" component={Transfers} />
          <Route path="/tours" component={Tours} />
          <Route path="/concierge" component={Concierge} />
          <Route path="/about" component={About} />
          <Route path="/partners" component={Partners} />
          <Route path="/resources" component={Resources} />
          <Route path="/contact" component={Contact} />
          <Route path="/booking" component={Booking} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
