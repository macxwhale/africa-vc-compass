
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import { MapPin } from "lucide-react";

const RegionMap = () => {
  const { regionNames, vcFirms } = useData();

  // Count VCs per region
  const regionsWithCounts = regionNames.map((name) => {
    const count = vcFirms.filter(vc => vc.regionsOfInterest.includes(name)).length;
    
    // Assign colors based on region names
    let color = "bg-africa-blue";
    if (name.includes("East")) color = "bg-africa-green";
    if (name.includes("West")) color = "bg-africa-gold";
    if (name.includes("North")) color = "bg-africa-blue-light";
    if (name.includes("Southern")) color = "bg-africa-green-light";
    if (name.includes("Central")) color = "bg-gray-500";
    if (name.includes("Pan")) color = "bg-purple-500";
    
    return {
      name,
      count,
      color
    };
  }).sort((a, b) => b.count - a.count);

  // Define region positions on the map
  const regionPositions = {
    "East Africa": { top: "45%", left: "60%" },
    "West Africa": { top: "45%", left: "20%" },
    "North Africa": { top: "20%", left: "40%" },
    "Southern Africa": { top: "70%", left: "50%" },
    "Central Africa": { top: "45%", left: "40%" },
    "Pan-African": { top: "35%", left: "40%" }
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
              <div className="aspect-[4/3] bg-gray-100 rounded-lg relative">
                {/* Africa map outline */}
                <svg 
                  viewBox="0 0 400 400" 
                  className="absolute inset-0 w-full h-full p-4"
                  style={{ filter: "drop-shadow(0px 2px 3px rgba(0,0,0,0.1))" }}
                >
                  {/* Simplified Africa outline */}
                  <path
                    d="M200,50 C240,60 270,80 280,110 C290,140 300,150 320,160 C340,170 350,200 340,230 
                       C330,260 330,280 310,300 C290,320 280,340 260,350 C240,360 220,370 200,360 
                       C180,350 160,350 140,330 C120,310 100,300 90,270 C80,240 70,210 80,180 
                       C90,150 100,120 120,100 C140,80 160,60 200,50"
                    fill="#F5F5F5"
                    stroke="#D1D5DB"
                    strokeWidth="2"
                  />
                </svg>
                
                {/* Region markers */}
                {regionsWithCounts.map((region) => {
                  const position = regionPositions[region.name as keyof typeof regionPositions];
                  if (!position) return null;
                  
                  return (
                    <Link 
                      key={region.name} 
                      to="/regions"
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110"
                      style={{ top: position.top, left: position.left }}
                    >
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full ${region.color} flex items-center justify-center text-white font-bold shadow-md`}>
                          {region.count}
                        </div>
                        <div className="bg-white px-2 py-1 rounded-md shadow-sm mt-1 text-xs font-medium">
                          {region.name}
                        </div>
                      </div>
                    </Link>
                  );
                })}
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
