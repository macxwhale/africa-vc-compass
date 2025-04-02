
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import Index from "./pages/Index";
import Directory from "./pages/Directory";
import VCProfile from "./pages/VCProfile";
import About from "./pages/About";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import DataProvider from "./components/providers/DataProvider";
import RegionsPage from "./pages/RegionsPage";
import IndustriesPage from "./pages/IndustriesPage";
import SupabaseSetup from "./pages/SupabaseSetup";
import Methodologies from "./pages/Methodologies";

// Create a stable QueryClient with caching configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => {
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
              <Route path="/regions" element={<RegionsPage />} />
              <Route path="/industries" element={<IndustriesPage />} />
              <Route path="/methodologies" element={<Methodologies />} />
              <Route path="/supabase-setup" element={<SupabaseSetup />} />
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
