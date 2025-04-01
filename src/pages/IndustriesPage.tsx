import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/contexts/DataContext";
import { Link } from "react-router-dom";
import VCCard from "@/components/VCCard";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const IndustriesPage = () => {
  const { vcFirms, industryNames } = useData();
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  // Count VCs per industry
  const industryCounts = industryNames.reduce((acc, industry) => {
    const count = vcFirms.filter(vc => vc.industries.includes(industry)).length;
    return { ...acc, [industry]: count };
  }, {} as Record<string, number>);
  
  // Sort industries by count
  const sortedIndustries = industryNames
    .filter(industry => industryCounts[industry] > 0)
    .sort((a, b) => industryCounts[b] - industryCounts[a]);
  
  // Prepare data for pie chart - use only top 7 industries
  const topIndustries = sortedIndustries.slice(0, 7);
  
  // Calculate count for "Others" category (all industries beyond the top 7)
  const othersCount = sortedIndustries.slice(7).reduce((sum, industry) => sum + industryCounts[industry], 0);
  
  // Create chart data with top 7 industries and "Others" if applicable
  let chartData = topIndustries.map((industry, index) => ({
    name: industry,
    value: industryCounts[industry],
    color: getIndustryColor(index)
  }));
  
  // Add "Others" category if there are more than 7 industries
  if (othersCount > 0) {
    chartData.push({
      name: "Others",
      value: othersCount,
      color: getIndustryColor(7)
    });
  }
  
  // Get VCs for selected industry
  const industryVCs = selectedIndustry 
    ? vcFirms.filter(vc => vc.industries.includes(selectedIndustry))
    : [];

  // Colors for industry chart
  function getIndustryColor(index: number) {
    const colors = [
      "#1A365D", // africa-blue
      "#276749", // africa-green
      "#D69E2E", // africa-gold
      "#2C5282", // africa-blue-light
      "#38A169", // africa-green-light
      "#F6E05E", // africa-gold-light
      "#4A5568", // africa-earth
      "#667EEA",
      "#F687B3",
      "#4FD1C5",
      "#B794F4",
      "#7F9CF5"
    ];
    return colors[index % colors.length];
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gray-50 py-8 md:py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-africa-blue mb-2">Investment Sectors</h1>
            <p className="text-gray-600 mb-6">Discover venture capital investment across various industries in Africa</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-4">Industry Investment Distribution</h3>
                    
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={130}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                          >
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value: number, name: string) => [
                              `${value} VCs`, name
                            ]}
                          />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="h-full">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-medium mb-4">Browse by Industry</h3>
                    
                    <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
                      {industryNames.map((industry) => (
                        <div 
                          key={industry} 
                          className={`p-3 rounded-md cursor-pointer transition-colors ${selectedIndustry === industry ? 'bg-africa-blue text-white' : 'hover:bg-gray-50'}`}
                          onClick={() => setSelectedIndustry(industry === selectedIndustry ? null : industry)}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{industry}</span>
                            <Badge variant={selectedIndustry === industry ? "secondary" : "outline"}>
                              {industryCounts[industry] || 0} VCs
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {selectedIndustry && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-africa-blue mb-4">
                  VCs in {selectedIndustry} <Badge className="ml-2">{industryVCs.length}</Badge>
                </h2>
                
                {industryVCs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {industryVCs.slice(0, 6).map((vc) => (
                      <VCCard key={vc.id} vc={vc} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No VC firms found for this industry</p>
                  </div>
                )}
                
                {industryVCs.length > 6 && (
                  <div className="mt-6 text-center">
                    <Link 
                      to={`/directory?industry=${encodeURIComponent(selectedIndustry)}`}
                      className="text-africa-blue hover:underline"
                    >
                      View all {industryVCs.length} VC firms in {selectedIndustry}
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

export default IndustriesPage;
