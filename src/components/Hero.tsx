
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero-gradient text-white py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern bg-repeat opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Discover Africa's Venture Capital Landscape
          </h1>
          <p className="mt-6 text-lg md:text-xl opacity-90">
            Connect with investors who are actively funding African innovation. Explore VC firms by industry focus, ticket size, and region.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-africa-gold hover:bg-africa-gold-light text-black font-semibold">
              <Link to="/directory">
                Explore the Directory
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
