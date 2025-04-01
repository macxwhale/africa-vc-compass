
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useData } from "@/contexts/DataContext";

const RegionMap = () => {
  const { regionNames, vcFirms } = useData();

  // Count VCs per region
  const regionsWithCounts = regionNames.map((name) => {
    const count = vcFirms.filter(vc => vc.regionsOfInterest.includes(name)).length;
    
    // Assign colors based on region names
    let color = "bg-africa-blue";
    if (name.includes("East")) color = "bg-emerald-500";
    if (name.includes("West")) color = "bg-amber-500";
    if (name.includes("North")) color = "bg-sky-500";
    if (name.includes("Southern")) color = "bg-orange-500";
    if (name.includes("Central")) color = "bg-lime-500";
    if (name.includes("Pan")) color = "bg-purple-500";
    
    return {
      name,
      count,
      color
    };
  }).sort((a, b) => b.count - a.count);

  // Define region positions on the map
  const regionPositions = {
    "North Africa": { top: "20%", left: "35%" },
    "West Africa": { top: "40%", left: "22%" },
    "Central Africa": { top: "50%", left: "40%" },
    "East Africa": { top: "40%", left: "60%" },
    "Southern Africa": { top: "75%", left: "45%" },
    "Pan-African": { top: "50%", left: "50%" }
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
              <div className="aspect-[4/3] bg-[#E6F2F5] rounded-lg relative overflow-hidden">
                {/* Use the uploaded Africa map as background with countries */}
                <img 
                  src="/lovable-uploads/a6192766-083c-4f20-b6f1-0ed37fa436de.png" 
                  alt="Map of Africa"
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                
                {/* North Africa region highlight */}
                <div className="absolute top-[15%] left-[35%] w-[35%] h-[15%] hover:bg-sky-500 hover:opacity-20 transition-all duration-300" />
                
                {/* West Africa region highlight */}
                <div className="absolute top-[32%] left-[20%] w-[25%] h-[25%] hover:bg-amber-500 hover:opacity-20 transition-all duration-300" />
                
                {/* Central Africa region highlight */}
                <div className="absolute top-[45%] left-[35%] w-[25%] h-[25%] hover:bg-lime-500 hover:opacity-20 transition-all duration-300" />
                
                {/* East Africa region highlight */}
                <div className="absolute top-[35%] left-[50%] w-[25%] h-[30%] hover:bg-emerald-500 hover:opacity-20 transition-all duration-300" />
                
                {/* Southern Africa region highlight */}
                <div className="absolute top-[65%] left-[35%] w-[30%] h-[25%] hover:bg-orange-500 hover:opacity-20 transition-all duration-300" />
                
                {/* Ocean labels */}
                <div className="absolute top-[78%] left-[15%] text-blue-800 font-medium italic text-xs">Atlantic Ocean</div>
                <div className="absolute top-[50%] left-[75%] text-blue-800 font-medium italic text-xs">Indian Ocean</div>
                <div className="absolute top-[15%] left-[43%] text-blue-800 font-medium italic text-xs">Mediterranean Sea</div>
                
                {/* Title overlay */}
                <div className="absolute top-[2%] left-[50%] transform -translate-x-1/2 text-2xl font-bold text-gray-800">
                  AFRICA
                </div>
                
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
                        <div className={`w-12 h-12 rounded-full ${region.color} flex items-center justify-center text-white font-bold shadow-md`}>
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
