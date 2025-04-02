
import { useEffect, useState } from "react";
import { vcFirms } from "@/data/vcData";
import VCCard from "./VCCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const FeaturedVCs = () => {
  const [featured, setFeatured] = useState(vcFirms.slice(0, 3));
  
  // You could implement logic to randomly select featured VCs
  useEffect(() => {
    // For now we'll just use the first 3 VCs as featured
    setFeatured(vcFirms.slice(0, 3));
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-africa-blue">Featured Investors</h2>
        <Button variant="ghost" asChild className="text-africa-blue flex items-center">
          <Link to="/directory">
            View all <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featured.map((vc) => (
          <VCCard key={vc.id} vc={vc} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedVCs;
