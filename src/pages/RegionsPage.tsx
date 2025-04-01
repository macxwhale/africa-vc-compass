
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/contexts/DataContext";
import { Link } from "react-router-dom";
import VCCard from "@/components/VCCard";
import { MapPin } from "lucide-react";

const RegionsPage = () => {
  const { vcFirms, regionNames } = useData();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  // Count VCs per region
  const regionCounts = regionNames.reduce((acc, region) => {
    const count = vcFirms.filter(vc => vc.regionsOfInterest.includes(region)).length;
    return { ...acc, [region]: count };
  }, {} as Record<string, number>);
  
  // Get VCs for selected region
  const regionalVCs = selectedRegion 
    ? vcFirms.filter(vc => vc.regionsOfInterest.includes(selectedRegion))
    : [];

  // Define region positions on the map
  const regionPositions = {
    "East Africa": { top: "40%", left: "67%" },
    "West Africa": { top: "45%", left: "22%" },
    "North Africa": { top: "25%", left: "40%" },
    "Southern Africa": { top: "75%", left: "55%" },
    "Central Africa": { top: "50%", left: "45%" },
    "Pan-African": { top: "35%", left: "45%" }
  };

  // Assign colors based on region names
  const getRegionColor = (name: string) => {
    if (name.includes("East")) return "bg-africa-green";
    if (name.includes("West")) return "bg-africa-gold";
    if (name.includes("North")) return "bg-africa-blue-light";
    if (name.includes("Southern")) return "bg-africa-green-light";
    if (name.includes("Central")) return "bg-gray-500";
    if (name.includes("Pan")) return "bg-purple-500";
    return "bg-africa-blue";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gray-50 py-8 md:py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-africa-blue mb-2">African Regions</h1>
            <p className="text-gray-600 mb-6">Explore VC investment activity across different regions of Africa</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-2">
                <Card>
                  <CardContent className="p-6">
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
                          fill={selectedRegion === "North Africa" ? "rgba(118, 169, 250, 0.4)" : "rgba(118, 169, 250, 0.15)"}
                          stroke="rgba(118, 169, 250, 0.5)"
                          strokeWidth={selectedRegion === "North Africa" ? "2" : "1"}
                          opacity={selectedRegion === "North Africa" ? "1" : "0.8"}
                          onClick={() => setSelectedRegion(selectedRegion === "North Africa" ? null : "North Africa")}
                          className="cursor-pointer hover:opacity-100 transition-opacity"
                        />
                        
                        {/* West Africa region */}
                        <path
                          d="M85,277 L82,265 L80,250 L75,235 L70,220 L65,205 L70,190 L75,175 L80,160 
                             L90,145 L100,132 L120,150 L140,160 L160,165 L180,170 L190,190 L195,210 
                             L190,230 L180,240 L165,250 L150,260 L135,265 L120,270 L105,275 L95,280 L85,277"
                          fill={selectedRegion === "West Africa" ? "rgba(252, 211, 77, 0.4)" : "rgba(252, 211, 77, 0.15)"}
                          stroke="rgba(252, 211, 77, 0.5)"
                          strokeWidth={selectedRegion === "West Africa" ? "2" : "1"}
                          opacity={selectedRegion === "West Africa" ? "1" : "0.8"}
                          onClick={() => setSelectedRegion(selectedRegion === "West Africa" ? null : "West Africa")}
                          className="cursor-pointer hover:opacity-100 transition-opacity"
                        />
                        
                        {/* Central Africa region */}
                        <path
                          d="M180,240 L165,250 L150,260 L135,265 L120,270 L105,275 L95,280 L85,277 
                             L90,290 L95,305 L98,320 L100,335 L105,350 L115,360 L125,370 L135,380 
                             L145,390 L155,398 L170,380 L180,370 L190,360 L200,350 L220,320 L230,295 
                             L235,275 L225,260 L210,245 L195,235 L180,240"
                          fill={selectedRegion === "Central Africa" ? "rgba(156, 163, 175, 0.4)" : "rgba(156, 163, 175, 0.15)"}
                          stroke="rgba(156, 163, 175, 0.5)"
                          strokeWidth={selectedRegion === "Central Africa" ? "2" : "1"}
                          opacity={selectedRegion === "Central Africa" ? "1" : "0.8"}
                          onClick={() => setSelectedRegion(selectedRegion === "Central Africa" ? null : "Central Africa")}
                          className="cursor-pointer hover:opacity-100 transition-opacity"
                        />
                        
                        {/* East Africa region */}
                        <path
                          d="M200,175 L220,175 L240,172 L260,170 L275,165 L290,160 L305,145 L318,132 
                             L325,146 L335,156 L345,156 L355,160 L367,170 L375,183 L378,195 L380,208 
                             L375,225 L365,245 L350,260 L335,270 L315,280 L300,290 L280,300 L270,310 
                             L260,320 L250,330 L240,340 L235,275 L225,260 L210,245 L195,235 L180,240 
                             L190,230 L195,210 L190,190 L200,175"
                          fill={selectedRegion === "East Africa" ? "rgba(52, 211, 153, 0.4)" : "rgba(52, 211, 153, 0.15)"}
                          stroke="rgba(52, 211, 153, 0.5)"
                          strokeWidth={selectedRegion === "East Africa" ? "2" : "1"}
                          opacity={selectedRegion === "East Africa" ? "1" : "0.8"}
                          onClick={() => setSelectedRegion(selectedRegion === "East Africa" ? null : "East Africa")}
                          className="cursor-pointer hover:opacity-100 transition-opacity"
                        />
                        
                        {/* Southern Africa region */}
                        <path
                          d="M170,380 L180,370 L190,360 L200,350 L220,320 L230,295 L235,275 L240,340 
                             L250,330 L260,320 L270,310 L280,300 L300,290 L315,280 L335,270 L350,260 
                             L345,280 L340,300 L335,320 L325,340 L315,360 L305,380 L295,395 L285,405 
                             L275,415 L265,425 L255,430 L245,435 L235,440 L220,442 L205,438 L190,435 
                             L175,425 L165,415 L155,398 L170,380"
                          fill={selectedRegion === "Southern Africa" ? "rgba(110, 231, 183, 0.4)" : "rgba(110, 231, 183, 0.15)"}
                          stroke="rgba(110, 231, 183, 0.5)"
                          strokeWidth={selectedRegion === "Southern Africa" ? "2" : "1"}
                          opacity={selectedRegion === "Southern Africa" ? "1" : "0.8"}
                          onClick={() => setSelectedRegion(selectedRegion === "Southern Africa" ? null : "Southern Africa")}
                          className="cursor-pointer hover:opacity-100 transition-opacity"
                        />
                        
                        {/* Island of Madagascar */}
                        <path
                          d="M370,345 L380,335 L390,340 L395,350 L393,365 L385,375 L375,380 L365,370 L370,355 L370,345"
                          fill="#F5F5F5"
                          stroke="#D1D5DB"
                          strokeWidth="1"
                        />

                        {/* Label for Pan-African - since it doesn't have a specific region */}
                        {selectedRegion === "Pan-African" && (
                          <circle
                            cx="225"
                            cy="225"
                            r="70"
                            fill="rgba(168, 85, 247, 0.15)"
                            stroke="rgba(168, 85, 247, 0.5)"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                            opacity="0.9"
                          />
                        )}
                      </svg>
                      
                      {/* Region markers */}
                      {regionNames.map((region) => {
                        const position = regionPositions[region as keyof typeof regionPositions];
                        if (!position) return null;
                        
                        const isSelected = region === selectedRegion;
                        const color = getRegionColor(region);
                        
                        return (
                          <div 
                            key={region} 
                            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${isSelected ? 'scale-110 z-10' : 'hover:scale-105'}`}
                            style={{ top: position.top, left: position.left }}
                            onClick={() => setSelectedRegion(region === selectedRegion ? null : region)}
                          >
                            <div className="flex flex-col items-center cursor-pointer">
                              <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center text-white font-bold shadow-md ${isSelected ? 'ring-2 ring-white ring-offset-2' : ''}`}>
                                {regionCounts[region]}
                              </div>
                              <div className={`px-2 py-1 rounded-md shadow-sm mt-1 text-xs font-medium ${isSelected ? 'bg-africa-blue text-white' : 'bg-white'}`}>
                                {region}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="h-full">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-medium mb-4">VC Distribution by Region</h3>
                    
                    <div className="space-y-3">
                      {regionNames.map((region) => (
                        <div 
                          key={region} 
                          className={`p-3 rounded-md cursor-pointer transition-colors ${selectedRegion === region ? 'bg-africa-blue text-white' : 'hover:bg-gray-50'}`}
                          onClick={() => setSelectedRegion(region === selectedRegion ? null : region)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className={`w-3 h-3 rounded-full ${getRegionColor(region)} mr-2`}></div>
                              <span className="font-medium">{region}</span>
                            </div>
                            <Badge variant={selectedRegion === region ? "secondary" : "outline"}>
                              {regionCounts[region]} VCs
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {selectedRegion && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-africa-blue mb-4">
                  VCs in {selectedRegion} <Badge className="ml-2">{regionalVCs.length}</Badge>
                </h2>
                
                {regionalVCs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regionalVCs.slice(0, 6).map((vc) => (
                      <VCCard key={vc.id} vc={vc} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No VC firms found for this region</p>
                  </div>
                )}
                
                {regionalVCs.length > 6 && (
                  <div className="mt-6 text-center">
                    <Link 
                      to={`/directory?region=${encodeURIComponent(selectedRegion)}`}
                      className="text-africa-blue hover:underline"
                    >
                      View all {regionalVCs.length} VC firms in {selectedRegion}
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RegionsPage;
