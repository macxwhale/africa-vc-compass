
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
    "East Africa": { top: "40%", left: "67%" },
    "West Africa": { top: "45%", left: "22%" },
    "North Africa": { top: "25%", left: "40%" },
    "Southern Africa": { top: "75%", left: "55%" },
    "Central Africa": { top: "50%", left: "45%" },
    "Pan-African": { top: "35%", left: "45%" }
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
                  viewBox="0 0 450 500" 
                  className="absolute inset-0 w-full h-full p-4"
                  style={{ filter: "drop-shadow(0px 2px 3px rgba(0,0,0,0.1))" }}
                >
                  {/* Detailed Africa outline */}
                  <path
                    d="M207,44 L220,44 L235,48 L245,55 L255,63 L260,75 L266,86 L275,92 L286,95 
                       L296,100 L304,110 L311,120 L318,132 L325,146 L335,156 L345,156 L355,160 
                       L367,170 L375,183 L378,195 L380,208 L385,218 L395,220 L405,223 L415,230 
                       L418,240 L417,252 L415,265 L410,280 L405,292 L402,305 L400,318 L395,332 
                       L387,345 L378,355 L368,365 L360,378 L355,390 L345,400 L335,410 L325,415 
                       L315,420 L305,425 L295,430 L285,440 L274,445 L260,448 L245,447 L230,445 
                       L215,440 L195,435 L185,425 L175,415 L165,405 L155,398 L145,390 L135,380 
                       L125,370 L115,360 L105,350 L100,335 L98,320 L95,305 L90,290 L85,277 L82,265 
                       L80,250 L75,235 L70,220 L65,205 L70,190 L75,175 L80,160 L90,145 L100,132 
                       L110,120 L120,110 L130,95 L140,85 L150,75 L160,65 L170,58 L180,53 L190,48 L207,44"
                    fill="#F5F5F5"
                    stroke="#D1D5DB"
                    strokeWidth="2"
                  />
                  
                  {/* North Africa region */}
                  <path
                    d="M100,132 L110,120 L120,110 L130,95 L140,85 L150,75 L160,65 L170,58 L180,53 L190,48 L207,44 
                       L220,44 L235,48 L245,55 L255,63 L260,75 L266,86 L275,92 L286,95 L296,100 L304,110 
                       L311,120 L318,132 L305,145 L290,160 L275,165 L260,170 L240,172 L220,175 
                       L200,175 L180,170 L160,165 L140,160 L120,150 L100,132"
                    fill="rgba(118, 169, 250, 0.15)"
                    stroke="rgba(118, 169, 250, 0.5)"
                    strokeWidth="1"
                    opacity="0.8"
                  />
                  
                  {/* West Africa region */}
                  <path
                    d="M85,277 L82,265 L80,250 L75,235 L70,220 L65,205 L70,190 L75,175 L80,160 
                       L90,145 L100,132 L120,150 L140,160 L160,165 L180,170 L190,190 L195,210 
                       L190,230 L180,240 L165,250 L150,260 L135,265 L120,270 L105,275 L95,280 L85,277"
                    fill="rgba(252, 211, 77, 0.15)"
                    stroke="rgba(252, 211, 77, 0.5)"
                    strokeWidth="1"
                    opacity="0.8"
                  />
                  
                  {/* Central Africa region */}
                  <path
                    d="M180,240 L165,250 L150,260 L135,265 L120,270 L105,275 L95,280 L85,277 
                       L90,290 L95,305 L98,320 L100,335 L105,350 L115,360 L125,370 L135,380 
                       L145,390 L155,398 L170,380 L180,370 L190,360 L200,350 L220,320 L230,295 
                       L235,275 L225,260 L210,245 L195,235 L180,240"
                    fill="rgba(156, 163, 175, 0.15)"
                    stroke="rgba(156, 163, 175, 0.5)"
                    strokeWidth="1"
                    opacity="0.8"
                  />
                  
                  {/* East Africa region */}
                  <path
                    d="M200,175 L220,175 L240,172 L260,170 L275,165 L290,160 L305,145 L318,132 
                       L325,146 L335,156 L345,156 L355,160 L367,170 L375,183 L378,195 L380,208 
                       L375,225 L365,245 L350,260 L335,270 L315,280 L300,290 L280,300 L270,310 
                       L260,320 L250,330 L240,340 L235,275 L225,260 L210,245 L195,235 L180,240 
                       L190,230 L195,210 L190,190 L200,175"
                    fill="rgba(52, 211, 153, 0.15)"
                    stroke="rgba(52, 211, 153, 0.5)"
                    strokeWidth="1"
                    opacity="0.8"
                  />
                  
                  {/* Southern Africa region */}
                  <path
                    d="M170,380 L180,370 L190,360 L200,350 L220,320 L230,295 L235,275 L240,340 
                       L250,330 L260,320 L270,310 L280,300 L300,290 L315,280 L335,270 L350,260 
                       L345,280 L340,300 L335,320 L325,340 L315,360 L305,380 L295,395 L285,405 
                       L275,415 L265,425 L255,430 L245,435 L235,440 L220,442 L205,438 L190,435 
                       L175,425 L165,415 L155,398 L170,380"
                    fill="rgba(110, 231, 183, 0.15)"
                    stroke="rgba(110, 231, 183, 0.5)"
                    strokeWidth="1"
                    opacity="0.8"
                  />
                  
                  {/* Island of Madagascar */}
                  <path
                    d="M370,345 L380,335 L390,340 L395,350 L393,365 L385,375 L375,380 L365,370 L370,355 L370,345"
                    fill="#F5F5F5"
                    stroke="#D1D5DB"
                    strokeWidth="1"
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
