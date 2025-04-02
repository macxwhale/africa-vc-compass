
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { industries } from "@/data/vcData";
import { Link } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import { useState, useMemo } from "react";
import VCCard from "./VCCard";

const IndustryHighlights = () => {
  const { vcFirms, getVCsByIndustry } = useData();
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  
  // Memoize highlighted industries to prevent re-renders
  const highlightedIndustries = useMemo(() => industries.slice(0, 7), []);
  
  // Memoize industry VCs for the selected industry
  const industryVCs = useMemo(() => {
    return selectedIndustry ? getVCsByIndustry(selectedIndustry, 6) : [];
  }, [selectedIndustry, getVCsByIndustry]);

  // Memoize VC counts to avoid recalculation on every render
  const getVCCount = useMemo(() => {
    const counts: Record<string, number> = {};
    highlightedIndustries.forEach(industry => {
      counts[industry] = vcFirms.filter(vc => vc.industries.includes(industry)).length;
    });
    return (industry: string) => counts[industry] || 0;
  }, [vcFirms, highlightedIndustries]);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-africa-blue">Popular Investment Sectors</h2>
        <Link to="/industries" className="text-africa-blue hover:underline text-sm">
          View all sectors →
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {highlightedIndustries.map((industry) => (
          <div key={industry} onClick={() => setSelectedIndustry(selectedIndustry === industry ? null : industry)}>
            <Card className={`card-hover h-full cursor-pointer ${selectedIndustry === industry ? 'ring-2 ring-africa-blue' : ''}`}>
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-africa-blue/10 flex items-center justify-center mb-3">
                  <span className="text-africa-blue font-bold">{industry.slice(0, 2)}</span>
                </div>
                <h3 className="font-semibold">{industry}</h3>
                <Badge className="mt-2 bg-africa-blue/10 text-africa-blue hover:bg-africa-blue/20">
                  {getVCCount(industry)} VCs
                </Badge>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      
      {/* Display VCs for selected industry */}
      {selectedIndustry && industryVCs.length > 0 && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Top VC Firms in {selectedIndustry}</h3>
            <Link to={`/industries`} className="text-africa-blue hover:underline text-sm">
              View all from this sector →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {industryVCs.map((vc) => (
              <VCCard key={vc.id} vc={vc} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IndustryHighlights;
