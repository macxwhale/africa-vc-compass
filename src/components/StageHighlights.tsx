
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { stages } from "@/data";
import { Link } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import { useState } from "react";
import VCCard from "./VCCard";

const StageHighlights = () => {
  const { vcFirms } = useData();
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  
  // Take stages for the highlights section
  const highlightedStages = stages;
  
  // Count VCs per stage for accurate display
  const getVCCount = (stage: string) => {
    return vcFirms.filter(vc => vc.stagePreference.includes(stage)).length;
  };
  
  // Get VCs for the selected stage
  const stageVCs = selectedStage 
    ? vcFirms.filter(vc => vc.stagePreference.includes(selectedStage)).slice(0, 6)
    : [];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-africa-blue">Investment Stages</h2>
        <Link to="/stages" className="text-africa-blue hover:underline text-sm">
          View all stages →
        </Link>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {highlightedStages.map((stage) => (
          <div key={stage} onClick={() => setSelectedStage(selectedStage === stage ? null : stage)}>
            <Card className={`card-hover h-full cursor-pointer ${selectedStage === stage ? 'ring-2 ring-africa-blue' : ''}`}>
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-africa-blue/10 flex items-center justify-center mb-3">
                  <span className="text-africa-blue font-bold">{stage.slice(0, 2)}</span>
                </div>
                <h3 className="font-semibold">{stage}</h3>
                <Badge className="mt-2 bg-africa-blue/10 text-africa-blue hover:bg-africa-blue/20">
                  {getVCCount(stage)} VCs
                </Badge>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      
      {/* Display VCs for selected stage */}
      {selectedStage && stageVCs.length > 0 && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Top VC Firms investing in {selectedStage}</h3>
            <Link to={`/stages`} className="text-africa-blue hover:underline text-sm">
              View all from this stage →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stageVCs.map((vc) => (
              <VCCard key={vc.id} vc={vc} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StageHighlights;
