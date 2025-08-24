import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";

import NotFound from "./pages/not-found";
import Home from "./pages/Home";
import Packages from "./pages/Packages";
import Hotels from "./pages/Hotels";
import Transfers from "./pages/Transfers";
import Tours from "./pages/Tours";
import Concierge from "./pages/Concierge";
import About from "./pages/About";
import Partners from "./pages/Partners";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
