
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/contexts/DataContext";
import { Link } from "react-router-dom";
import VCCard from "@/components/VCCard";

// Define country groupings by region
export const regionCountriesMap = {
  "East Africa": [
    "Kenya", "Uganda", "Tanzania", "Rwanda", "Burundi", "Ethiopia", 
    "Eritrea", "Somalia", "South Sudan", "Djibouti", "Madagascar", 
    "Mauritius", "Seychelles", "Comoros", "Malawi", "Mozambique"
  ],
  "West Africa": [
    "Nigeria", "Ghana", "Senegal", "Côte d'Ivoire", "Mali", "Burkina Faso", 
    "Niger", "Togo", "Benin", "Sierra Leone", "Liberia", "Gambia", 
    "Guinea", "Guinea-Bissau", "Cape Verde", "Mauritania"
  ],
  "Central Africa": [
    "Cameroon", "Central African Republic", "Chad", "Equatorial Guinea", 
    "Gabon", "Republic of the Congo", "Democratic Republic of the Congo", 
    "Angola", "São Tomé and Príncipe"
  ],
  "North Africa": [
    "Algeria", "Egypt", "Libya", "Morocco", "Tunisia", "Sudan", "Western Sahara"
  ],
  "Southern Africa": [
    "South Africa", "Namibia", "Botswana", "Lesotho", "Eswatini",
    "Zimbabwe", "Zambia"
  ]
};

const RegionsPage = () => {
  const { vcFirms, regionNames } = useData();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  // Filter out Pan-African from the region names
  const filteredRegionNames = regionNames.filter(region => region !== "Pan-African");

  // Count VCs per region
  const regionCounts = filteredRegionNames.reduce((acc, region) => {
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
    return "bg-africa-blue";
  };

  // Define region positions on the map
  const regionPositions = {
    "North Africa": { top: "20%", left: "50%" },
    "West Africa": { top: "40%", left: "25%" },
    "Central Africa": { top: "48%", left: "50%" },
    "East Africa": { top: "40%", left: "70%" },
    "Southern Africa": { top: "70%", left: "55%" }
  };

  // Get countries string for a region - for tooltip or additional display
  const getRegionCountries = (region: string) => {
    return regionCountriesMap[region as keyof typeof regionCountriesMap]?.join(", ") || "";
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
                    <div className="aspect-[4/3] bg-[#E6F2F5] rounded-lg relative overflow-hidden" style={{ maxHeight: "350px" }}>
                      {/* Africa map background with reduced size */}
                      <img 
                        src="/lovable-uploads/a6192766-083c-4f20-b6f1-0ed37fa436de.png" 
                        alt="Map of Africa"
                        className="absolute inset-0 w-full h-full object-contain opacity-30"
                      />
                      
                      {/* North Africa region highlight */}
                      <div 
                        className={`absolute top-[15%] left-[40%] w-[30%] h-[15%] 
                          ${selectedRegion === "North Africa" ? 'bg-sky-500 opacity-40' : 'bg-transparent hover:bg-sky-500 hover:opacity-20'} 
                          cursor-pointer transition-all duration-300`}
                        onClick={() => setSelectedRegion(selectedRegion === "North Africa" ? null : "North Africa")}
                        title={getRegionCountries("North Africa")}
                      />
                      
                      {/* West Africa region highlight */}
                      <div 
                        className={`absolute top-[32%] left-[20%] w-[20%] h-[25%] 
                          ${selectedRegion === "West Africa" ? 'bg-amber-500 opacity-40' : 'bg-transparent hover:bg-amber-500 hover:opacity-20'} 
                          cursor-pointer transition-all duration-300`}
                        onClick={() => setSelectedRegion(selectedRegion === "West Africa" ? null : "West Africa")}
                        title={getRegionCountries("West Africa")}
                      />
                      
                      {/* Central Africa region highlight */}
                      <div 
                        className={`absolute top-[45%] left-[40%] w-[20%] h-[20%] 
                          ${selectedRegion === "Central Africa" ? 'bg-lime-500 opacity-40' : 'bg-transparent hover:bg-lime-500 hover:opacity-20'} 
                          cursor-pointer transition-all duration-300`}
                        onClick={() => setSelectedRegion(selectedRegion === "Central Africa" ? null : "Central Africa")}
                        title={getRegionCountries("Central Africa")}
                      />
                      
                      {/* East Africa region highlight */}
                      <div 
                        className={`absolute top-[35%] left-[60%] w-[20%] h-[25%] 
                          ${selectedRegion === "East Africa" ? 'bg-emerald-500 opacity-40' : 'bg-transparent hover:bg-emerald-500 hover:opacity-20'} 
                          cursor-pointer transition-all duration-300`}
                        onClick={() => setSelectedRegion(selectedRegion === "East Africa" ? null : "East Africa")}
                        title={getRegionCountries("East Africa")}
                      />
                      
                      {/* Southern Africa region highlight */}
                      <div 
                        className={`absolute top-[65%] left-[45%] w-[25%] h-[20%] 
                          ${selectedRegion === "Southern Africa" ? 'bg-orange-500 opacity-40' : 'bg-transparent hover:bg-orange-500 hover:opacity-20'} 
                          cursor-pointer transition-all duration-300`}
                        onClick={() => setSelectedRegion(selectedRegion === "Southern Africa" ? null : "Southern Africa")}
                        title={getRegionCountries("Southern Africa")}
                      />
                      
                      {/* VC Count markers */}
                      {filteredRegionNames.map((region) => {
                        const position = regionPositions[region as keyof typeof regionPositions];
                        const isSelected = region === selectedRegion;
                        const color = getRegionColor(region);
                        
                        return (
                          <div 
                            key={region} 
                            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${isSelected ? 'scale-125 z-10' : 'hover:scale-110'}`}
                            style={{ top: position.top, left: position.left }}
                            onClick={() => setSelectedRegion(region === selectedRegion ? null : region)}
                            title={getRegionCountries(region)}
                          >
                            <div className="flex flex-col items-center cursor-pointer">
                              <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center text-white font-bold shadow-lg text-sm ${isSelected ? 'ring-2 ring-white' : ''}`}>
                                {regionCounts[region]}
                              </div>
                              <div className="bg-white/90 px-2 py-1 rounded shadow-sm mt-1 text-xs font-semibold">
                                {region}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      
                      {/* Title overlay */}
                      <div className="absolute top-[2%] left-[50%] transform -translate-x-1/2 text-2xl font-bold text-gray-800">
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
                      {filteredRegionNames.map((region) => (
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
                          
                          {selectedRegion === region && (
                            <div className="mt-2 text-xs text-white/80 line-clamp-2 hover:line-clamp-none">
                              {getRegionCountries(region)}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {selectedRegion && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-africa-blue mb-4 flex items-center gap-2">
                  VCs in {selectedRegion} <Badge className="ml-2">{regionalVCs.length}</Badge>
                </h2>
                
                <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Countries in this region:</h3>
                  <p className="text-sm">{getRegionCountries(selectedRegion)}</p>
                </div>
                
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
