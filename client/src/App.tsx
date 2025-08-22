import { Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Packages from "@/pages/Packages";
import Hotels from "@/pages/Hotels";
import Transfers from "@/pages/Transfers";
import Tours from "@/pages/Tours";
import Concierge from "@/pages/Concierge";
import About from "@/pages/About";
import Partners from "@/pages/Partners";
import Resources from "@/pages/Resources";
import Contact from "@/pages/Contact";
import Booking from "@/pages/Booking";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Routes */}
        <Route path="/">
          <Home />
        </Route>
        <Route path="/packages">
          <Packages />
        </Route>
        <Route path="/hotels">
          <Hotels />
        </Route>
        <Route path="/transfers">
          <Transfers />
        </Route>
        <Route path="/tours">
          <Tours />
        </Route>
        <Route path="/concierge">
          <Concierge />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/partners">
          <Partners />
        </Route>
        <Route path="/resources">
          <Resources />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/booking">
          <Booking />
        </Route>

        {/* Catch-all route (NotFound) */}
        <Route>
          <NotFound />
        </Route>
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
