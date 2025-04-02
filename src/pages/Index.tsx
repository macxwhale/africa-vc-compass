
import Hero from "@/components/Hero";
import StatsHighlight from "@/components/StatsHighlight";
import FeaturedVCs from "@/components/FeaturedVCs";
import IndustryHighlights from "@/components/IndustryHighlights";
import RegionMap from "@/components/RegionMap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <Hero />
      
      <main className="flex-grow">
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <StatsHighlight />
          </div>
        </section>
        
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <FeaturedVCs />
          </div>
        </section>
        
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <IndustryHighlights />
          </div>
        </section>
        
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <RegionMap />
          </div>
        </section>
        
        <section className="py-16 bg-africa-blue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Find the Right Investors?</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Explore our comprehensive directory of venture capital firms investing in African startups.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-africa-gold hover:bg-africa-gold-light text-black font-semibold">
                <Link to="/directory">
                  Explore the Directory
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/methodologies">
                  Research Methodologies
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
