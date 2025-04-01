
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Directory from "./pages/Directory";
import VCProfile from "./pages/VCProfile";
import About from "./pages/About";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import { useState } from "react";
import { DataProvider } from "./contexts/DataContext";

const App = () => {
  // Create a new QueryClient instance inside the component to ensure proper React hooks usage
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <DataProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/directory" element={<Directory />} />
              <Route path="/vc/:id" element={<VCProfile />} />
              <Route path="/about" element={<About />} />
              <Route path="/admin" element={<Admin />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </DataProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
