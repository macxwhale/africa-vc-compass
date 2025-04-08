
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import { regionCountriesMap } from "@/pages/RegionsPage";
import { useState } from "react";
import VCCard from "./VCCard";
import { MapPin } from "lucide-react";

const RegionMap = () => {
  const { regionNames, vcFirms, getVCsByRegion } = useData();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  // Generate colors for regions
  const getRegionColor = (name: string): string => {
    if (name.includes("East")) return "bg-emerald-500";
    if (name.includes("West")) return "bg-amber-500";
    if (name.includes("North")) return "bg-sky-500";
    if (name.includes("Southern")) return "bg-orange-500";
    if (name.includes("Central")) return "bg-lime-500";
    return "bg-africa-blue"; // Default color
  };

  // Count VCs per region and filter out Pan-African
  const regionsWithCounts = regionNames
    .filter(name => name !== "Pan-African")
    .map((name) => {
      const count = vcFirms.filter(vc => vc.regionsOfInterest.includes(name)).length;
      
      return {
        name,
        count,
        color: getRegionColor(name)
      };
    }).sort((a, b) => b.count - a.count);

  // Get VCs for the selected region
  const regionalVCs = selectedRegion ? getVCsByRegion(selectedRegion, 6) : [];

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
              <div className="relative w-full h-[350px] bg-[#E6F2F5] rounded-lg overflow-hidden">
                {/* Africa map background */}
                <img 
                  src="/lovable-uploads/a6192766-083c-4f20-b6f1-0ed37fa436de.png" 
                  alt="Map of Africa"
                  className="absolute inset-0 w-full h-full object-contain opacity-30"
                />
                
                {/* North Africa */}
                <div className="absolute top-[20%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110">
                  <div 
                    className={`cursor-pointer ${selectedRegion === "North Africa" ? "scale-110" : ""}`}
                    onClick={() => setSelectedRegion(selectedRegion === "North Africa" ? null : "North Africa")}
                  >
                    <MapPin size={32} className={`${getRegionColor("North Africa")} text-white p-1 rounded-full`} />
                    <div className="bg-white/90 px-2 py-1 rounded-md shadow-sm mt-1 text-xs font-semibold text-gray-800 text-center">
                      <div>North Africa</div>
                      <Badge variant="outline" className="mt-1">{regionsWithCounts.find(r => r.name === "North Africa")?.count || 0} VCs</Badge>
                    </div>
                  </div>
                </div>
                
                {/* West Africa */}
                <div className="absolute top-[40%] left-[30%] transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110">
                  <div 
                    className={`cursor-pointer ${selectedRegion === "West Africa" ? "scale-110" : ""}`}
                    onClick={() => setSelectedRegion(selectedRegion === "West Africa" ? null : "West Africa")}
                  >
                    <MapPin size={32} className={`${getRegionColor("West Africa")} text-white p-1 rounded-full`} />
                    <div className="bg-white/90 px-2 py-1 rounded-md shadow-sm mt-1 text-xs font-semibold text-gray-800 text-center">
                      <div>West Africa</div>
                      <Badge variant="outline" className="mt-1">{regionsWithCounts.find(r => r.name === "West Africa")?.count || 0} VCs</Badge>
                    </div>
                  </div>
                </div>
                
                {/* East Africa */}
                <div className="absolute top-[40%] left-[65%] transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110">
                  <div 
                    className={`cursor-pointer ${selectedRegion === "East Africa" ? "scale-110" : ""}`}
                    onClick={() => setSelectedRegion(selectedRegion === "East Africa" ? null : "East Africa")}
                  >
                    <MapPin size={32} className={`${getRegionColor("East Africa")} text-white p-1 rounded-full`} />
                    <div className="bg-white/90 px-2 py-1 rounded-md shadow-sm mt-1 text-xs font-semibold text-gray-800 text-center">
                      <div>East Africa</div>
                      <Badge variant="outline" className="mt-1">{regionsWithCounts.find(r => r.name === "East Africa")?.count || 0} VCs</Badge>
                    </div>
                  </div>
                </div>
                
                {/* Central Africa */}
                <div className="absolute top-[48%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110">
                  <div 
                    className={`cursor-pointer ${selectedRegion === "Central Africa" ? "scale-110" : ""}`}
                    onClick={() => setSelectedRegion(selectedRegion === "Central Africa" ? null : "Central Africa")}
                  >
                    <MapPin size={32} className={`${getRegionColor("Central Africa")} text-white p-1 rounded-full`} />
                    <div className="bg-white/90 px-2 py-1 rounded-md shadow-sm mt-1 text-xs font-semibold text-gray-800 text-center">
                      <div>Central Africa</div>
                      <Badge variant="outline" className="mt-1">{regionsWithCounts.find(r => r.name === "Central Africa")?.count || 0} VCs</Badge>
                    </div>
                  </div>
                </div>
                
                {/* Southern Africa */}
                <div className="absolute top-[70%] left-[55%] transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110">
                  <div 
                    className={`cursor-pointer ${selectedRegion === "Southern Africa" ? "scale-110" : ""}`}
                    onClick={() => setSelectedRegion(selectedRegion === "Southern Africa" ? null : "Southern Africa")}
                  >
                    <MapPin size={32} className={`${getRegionColor("Southern Africa")} text-white p-1 rounded-full`} />
                    <div className="bg-white/90 px-2 py-1 rounded-md shadow-sm mt-1 text-xs font-semibold text-gray-800 text-center">
                      <div>Southern Africa</div>
                      <Badge variant="outline" className="mt-1">{regionsWithCounts.find(r => r.name === "Southern Africa")?.count || 0} VCs</Badge>
                    </div>
                  </div>
                </div>
                
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
                  <div 
                    key={region.name}
                    className={`flex items-center justify-between p-3 ${selectedRegion === region.name ? 'bg-gray-100' : 'hover:bg-gray-50'} rounded-md transition-colors cursor-pointer`}
                    onClick={() => setSelectedRegion(selectedRegion === region.name ? null : region.name)}
                    title={regionCountriesMap[region.name as keyof typeof regionCountriesMap]?.join(", ") || region.name}
                  >
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${region.color} mr-2`}></div>
                      <span>{region.name}</span>
                    </div>
                    <Badge variant="outline">
                      {region.count} VCs
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Display VCs for selected region */}
          {selectedRegion && regionalVCs.length > 0 && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Top VC Firms in {selectedRegion}</h3>
                <Link to={`/regions`} className="text-africa-blue hover:underline text-sm">
                  View all from this region →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {regionalVCs.map((vc) => (
                  <VCCard key={vc.id} vc={vc} />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RegionMap;
