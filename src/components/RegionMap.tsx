
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useData } from "@/contexts/DataContext";

const RegionMap = () => {
  const { regionNames, vcFirms } = useData();

  // Count VCs per region and filter out Pan-African
  const regionsWithCounts = regionNames
    .filter(name => name !== "Pan-African")
    .map((name) => {
      const count = vcFirms.filter(vc => vc.regionsOfInterest.includes(name)).length;
      
      // Assign colors based on region names
      let color = "bg-africa-blue";
      if (name.includes("East")) color = "bg-emerald-500";
      if (name.includes("West")) color = "bg-amber-500";
      if (name.includes("North")) color = "bg-sky-500";
      if (name.includes("Southern")) color = "bg-orange-500";
      if (name.includes("Central")) color = "bg-lime-500";
      
      return {
        name,
        count,
        color
      };
    }).sort((a, b) => b.count - a.count);

  // Define region positions on the map
  const regionPositions = {
    "North Africa": { top: "20%", left: "50%" },
    "West Africa": { top: "40%", left: "30%" },
    "Central Africa": { top: "48%", left: "50%" },
    "East Africa": { top: "40%", left: "65%" },
    "Southern Africa": { top: "70%", left: "55%" }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-africa-blue">Regional Investment Activity</h2>
        <Link to="/regions" className="text-africa-blue hover:underline text-sm">
          Explore all regions →
        </Link>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2">
              <div className="aspect-[4/3] bg-[#E6F2F5] rounded-lg relative overflow-hidden" style={{ maxHeight: "280px" }}>
                {/* Africa map background with reduced size */}
                <img 
                  src="/lovable-uploads/a6192766-083c-4f20-b6f1-0ed37fa436de.png" 
                  alt="Map of Africa"
                  className="absolute inset-0 w-full h-full object-contain opacity-30"
                />
                
                {/* Region markers with VC counts */}
                {regionsWithCounts.map((region) => {
                  // Get positions from the predefined positions map
                  const position = regionPositions[region.name as keyof typeof regionPositions];
                  
                  return (
                    <Link 
                      key={region.name} 
                      to="/regions"
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110"
                      style={{ top: position.top, left: position.left }}
                    >
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full ${region.color} flex items-center justify-center text-white font-bold shadow-md text-sm`}>
                          {region.count}
                        </div>
                        <div className="bg-white/90 px-2 py-1 rounded-md shadow-sm mt-1 text-xs font-semibold text-gray-800">
                          {region.name}
                        </div>
                      </div>
                    </Link>
                  );
                })}
                
                {/* Title overlay */}
                <div className="absolute top-[2%] left-[50%] transform -translate-x-1/2 text-xl font-bold text-gray-800">
                  AFRICA
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">VC Distribution</h3>
              <div className="space-y-4">
                {regionsWithCounts.map((region) => (
                  <Link 
                    key={region.name} 
                    to={`/regions`}
                  >
                    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md transition-colors">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${region.color} mr-2`}></div>
                        <span>{region.name}</span>
                      </div>
                      <Badge variant="outline">
                        {region.count} VCs
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegionMap;
