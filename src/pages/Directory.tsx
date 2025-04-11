
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FilterBar, { FilterState } from "@/components/FilterBar";
import VCCard from "@/components/VCCard";
import { type VCFirm } from "@/data/vcData";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const Directory = () => {
  const { vcFirms, regionNames, industryNames, stageNames } = useData();
  const [filteredFirms, setFilteredFirms] = useState<VCFirm[]>(vcFirms);
  const [showAll, setShowAll] = useState(false);
  
  // Update filtered firms when vcFirms changes in context
  useEffect(() => {
    setFilteredFirms(vcFirms);
  }, [vcFirms]);
  
  const handleFilterChange = (filters: FilterState) => {
    let results = [...vcFirms];
    
    // Filter by search text
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      results = results.filter((vc) => 
        vc.name.toLowerCase().includes(searchTerm) || 
        vc.description.toLowerCase().includes(searchTerm)
      );
    }
    
    // Filter by industry
    if (filters.industry && filters.industry !== "all_industries") {
      results = results.filter((vc) => 
        vc.industries.includes(filters.industry)
      );
    }
    
    // Filter by stage
    if (filters.stage && filters.stage !== "all_stages") {
      results = results.filter((vc) => 
        vc.stagePreference.includes(filters.stage)
      );
    }
    
    // Filter by region
    if (filters.region && filters.region !== "all_regions") {
      results = results.filter((vc) => 
        vc.regionsOfInterest.includes(filters.region)
      );
    }
    
    setFilteredFirms(results);
    // Reset showAll when filters change
    setShowAll(false);
  };

  // Calculate the firms to display based on showAll state
  const displayedFirms = showAll ? filteredFirms : filteredFirms.slice(0, 5);
  const hasMoreFirms = filteredFirms.length > 5;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gray-50 py-8 md:py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-africa-blue mb-2">VC Directory</h1>
            <p className="text-gray-600 mb-6">Discover venture capital firms actively investing in African startups</p>
            
            <FilterBar onFilterChange={handleFilterChange} />
            
            <div className="mt-8">
              {filteredFirms.length > 0 ? (
                <>
                  <p className="text-gray-500 mb-4">
                    Showing {displayedFirms.length} of {filteredFirms.length} results
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedFirms.map((vc) => (
                      <VCCard key={vc.id} vc={vc} />
                    ))}
                  </div>
                  
                  {hasMoreFirms && (
                    <div className="mt-8 flex justify-center">
                      <Button
                        variant="outline"
                        onClick={() => setShowAll(!showAll)}
                        className="flex items-center gap-2"
                      >
                        {showAll ? (
                          <>
                            Show Less <ChevronUp className="h-4 w-4" />
                          </>
                        ) : (
                          <>
                            Show More <ChevronDown className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No matching VC firms found</h3>
                  <p className="text-gray-500">Try adjusting your search criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Directory;
