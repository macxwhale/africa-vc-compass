
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/contexts/DataContext";
import { Link } from "react-router-dom";
import VCCard from "@/components/VCCard";

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

  // Assign colors based on region names
  const getRegionColor = (name: string) => {
    if (name.includes("East")) return "bg-emerald-500";
    if (name.includes("West")) return "bg-amber-500";
    if (name.includes("North")) return "bg-sky-500";
    if (name.includes("Southern")) return "bg-orange-500";
    if (name.includes("Central")) return "bg-lime-500";
    if (name.includes("Pan")) return "bg-purple-500";
    return "bg-africa-blue";
  };

  // Define region areas on the map
  const getRegionArea = (region: string) => {
    if (region === "North Africa") {
      return "Morocco,Algeria,Tunisia,Libya,Egypt";
    } else if (region === "West Africa") {
      return "Mauritania,Mali,Niger,Senegal,Guinea,Burkina Faso,Nigeria,Ghana,Côte d'Ivoire,Liberia,Sierra Leone";
    } else if (region === "East Africa") {
      return "Sudan,South Sudan,Ethiopia,Somalia,Kenya,Uganda,Tanzania,Rwanda,Burundi";
    } else if (region === "Central Africa") {
      return "Chad,Central African Republic,Cameroon,Democratic Republic of the Congo,Congo,Gabon,Equatorial Guinea";
    } else if (region === "Southern Africa") {
      return "Angola,Zambia,Zimbabwe,Namibia,Botswana,South Africa,Mozambique,Malawi";
    }
    return "";
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
                    <div className="aspect-[4/3] bg-[#E6F2F5] rounded-lg relative overflow-hidden">
                      {/* Use the uploaded Africa map as background with countries */}
                      <img 
                        src="/lovable-uploads/a6192766-083c-4f20-b6f1-0ed37fa436de.png" 
                        alt="Map of Africa"
                        className="absolute inset-0 w-full h-full object-cover opacity-30"
                      />
                      
                      {/* North Africa region highlight */}
                      <div 
                        className={`absolute top-[15%] left-[35%] w-[35%] h-[15%] 
                          ${selectedRegion === "North Africa" ? 'bg-sky-500 opacity-40' : 'bg-transparent hover:bg-sky-500 hover:opacity-20'} 
                          cursor-pointer transition-all duration-300`}
                        onClick={() => setSelectedRegion(selectedRegion === "North Africa" ? null : "North Africa")}
                      />
                      
                      {/* West Africa region highlight */}
                      <div 
                        className={`absolute top-[32%] left-[20%] w-[25%] h-[25%] 
                          ${selectedRegion === "West Africa" ? 'bg-amber-500 opacity-40' : 'bg-transparent hover:bg-amber-500 hover:opacity-20'} 
                          cursor-pointer transition-all duration-300`}
                        onClick={() => setSelectedRegion(selectedRegion === "West Africa" ? null : "West Africa")}
                      />
                      
                      {/* Central Africa region highlight */}
                      <div 
                        className={`absolute top-[45%] left-[35%] w-[25%] h-[25%] 
                          ${selectedRegion === "Central Africa" ? 'bg-lime-500 opacity-40' : 'bg-transparent hover:bg-lime-500 hover:opacity-20'} 
                          cursor-pointer transition-all duration-300`}
                        onClick={() => setSelectedRegion(selectedRegion === "Central Africa" ? null : "Central Africa")}
                      />
                      
                      {/* East Africa region highlight */}
                      <div 
                        className={`absolute top-[35%] left-[50%] w-[25%] h-[30%] 
                          ${selectedRegion === "East Africa" ? 'bg-emerald-500 opacity-40' : 'bg-transparent hover:bg-emerald-500 hover:opacity-20'} 
                          cursor-pointer transition-all duration-300`}
                        onClick={() => setSelectedRegion(selectedRegion === "East Africa" ? null : "East Africa")}
                      />
                      
                      {/* Southern Africa region highlight */}
                      <div 
                        className={`absolute top-[65%] left-[35%] w-[30%] h-[25%] 
                          ${selectedRegion === "Southern Africa" ? 'bg-orange-500 opacity-40' : 'bg-transparent hover:bg-orange-500 hover:opacity-20'} 
                          cursor-pointer transition-all duration-300`}
                        onClick={() => setSelectedRegion(selectedRegion === "Southern Africa" ? null : "Southern Africa")}
                      />
                      
                      {/* Pan-African indicator */}
                      {selectedRegion === "Pan-African" && (
                        <div className="absolute inset-0 bg-purple-500 opacity-20 border-4 border-purple-500 border-dashed rounded-lg" />
                      )}
                      
                      {/* Region labels */}
                      <div className="absolute top-[12%] left-[35%] text-black font-bold text-sm">North Africa</div>
                      <div className="absolute top-[30%] left-[15%] text-black font-bold text-sm">West Africa</div>
                      <div className="absolute top-[45%] left-[40%] text-black font-bold text-sm">Central Africa</div>
                      <div className="absolute top-[35%] left-[55%] text-black font-bold text-sm">East Africa</div>
                      <div className="absolute top-[70%] left-[42%] text-black font-bold text-sm">Southern Africa</div>
                      
                      {/* Ocean labels */}
                      <div className="absolute top-[78%] left-[15%] text-blue-800 font-medium italic text-sm">Atlantic Ocean</div>
                      <div className="absolute top-[50%] left-[75%] text-blue-800 font-medium italic text-sm">Indian Ocean</div>
                      <div className="absolute top-[15%] left-[43%] text-blue-800 font-medium italic text-sm">Mediterranean Sea</div>
                      
                      {/* VC Count markers */}
                      {regionNames.map((region) => {
                        // Position markers on the map
                        let position = { top: "50%", left: "50%" };
                        
                        if (region === "North Africa") position = { top: "20%", left: "35%" };
                        if (region === "West Africa") position = { top: "40%", left: "22%" };
                        if (region === "Central Africa") position = { top: "50%", left: "40%" };
                        if (region === "East Africa") position = { top: "40%", left: "60%" };
                        if (region === "Southern Africa") position = { top: "75%", left: "45%" };
                        if (region === "Pan-African") position = { top: "50%", left: "50%" };
                        
                        const isSelected = region === selectedRegion;
                        const color = getRegionColor(region);
                        
                        return (
                          <div 
                            key={region} 
                            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${isSelected ? 'scale-125 z-10' : 'hover:scale-110'}`}
                            style={{ top: position.top, left: position.left }}
                            onClick={() => setSelectedRegion(region === selectedRegion ? null : region)}
                          >
                            <div className="flex flex-col items-center cursor-pointer">
                              <div className={`w-14 h-14 rounded-full ${color} flex items-center justify-center text-white font-bold shadow-lg ${isSelected ? 'ring-4 ring-white' : ''}`}>
                                {regionCounts[region]}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      
                      {/* Title overlay */}
                      <div className="absolute top-[2%] left-[50%] transform -translate-x-1/2 text-3xl font-bold text-gray-800">
                        AFRICA
                      </div>
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
