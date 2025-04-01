
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { industries } from "@/data/vcData";
import { Link } from "react-router-dom";

const IndustryHighlights = () => {
  // Take first 8 industries for the highlights section
  const highlightedIndustries = industries.slice(0, 8);
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-africa-blue mb-6">Popular Investment Sectors</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {highlightedIndustries.map((industry) => (
          <Link to={`/industries/${industry.toLowerCase()}`} key={industry}>
            <Card className="card-hover h-full">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-africa-blue/10 flex items-center justify-center mb-3">
                  <span className="text-africa-blue font-bold">{industry.slice(0, 2)}</span>
                </div>
                <h3 className="font-semibold">{industry}</h3>
                <Badge className="mt-2 bg-africa-blue/10 text-africa-blue hover:bg-africa-blue/20">
                  {Math.floor(Math.random() * 20) + 5} VCs
                </Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default IndustryHighlights;
