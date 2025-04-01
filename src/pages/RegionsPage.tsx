
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
    "East Africa": { top: "45%", left: "60%" },
    "West Africa": { top: "45%", left: "20%" },
    "North Africa": { top: "20%", left: "40%" },
    "Southern Africa": { top: "70%", left: "50%" },
    "Central Africa": { top: "45%", left: "40%" },
    "Pan-African": { top: "35%", left: "40%" }
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
