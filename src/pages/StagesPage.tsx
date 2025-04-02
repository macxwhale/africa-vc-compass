
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/contexts/DataContext";
import { Link } from "react-router-dom";
import VCCard from "@/components/VCCard";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const StagesPage = () => {
  const { vcFirms, stageNames } = useData();
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  // Count VCs per stage
  const stageCounts = stageNames.reduce((acc, stage) => {
    const count = vcFirms.filter(vc => vc.stagePreference.includes(stage)).length;
    return { ...acc, [stage]: count };
  }, {} as Record<string, number>);
  
  // Sort stages by count
  const sortedStages = stageNames
    .filter(stage => stageCounts[stage] > 0)
    .sort((a, b) => stageCounts[b] - stageCounts[a]);
  
  // Create chart data
  const chartData = sortedStages.map((stage, index) => ({
    name: stage,
    value: stageCounts[stage],
    color: getStageColor(index)
  }));
  
  // Get VCs for selected stage
  const stageVCs = selectedStage 
    ? vcFirms.filter(vc => vc.stagePreference.includes(selectedStage))
    : [];

  // Colors for stage chart
  function getStageColor(index: number) {
    const colors = [
      "#1A365D", // africa-blue
      "#276749", // africa-green
      "#D69E2E", // africa-gold
      "#2C5282", // africa-blue-light
      "#38A169", // africa-green-light
      "#F6E05E", // africa-gold-light
      "#4A5568", // africa-earth
      "#667EEA",
    ];
    return colors[index % colors.length];
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gray-50 py-8 md:py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-africa-blue mb-2">Investment Stages</h1>
            <p className="text-gray-600 mb-6">Explore venture capital firms by their preferred investment stages in Africa</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-4">Investment Stage Distribution</h3>
                    
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
                    <h3 className="text-lg font-medium mb-4">Browse by Investment Stage</h3>
                    
                    <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
                      {stageNames.map((stage) => (
                        <div 
                          key={stage} 
                          className={`p-3 rounded-md cursor-pointer transition-colors ${selectedStage === stage ? 'bg-africa-blue text-white' : 'hover:bg-gray-50'}`}
                          onClick={() => setSelectedStage(stage === selectedStage ? null : stage)}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{stage}</span>
                            <Badge variant={selectedStage === stage ? "secondary" : "outline"}>
                              {stageCounts[stage] || 0} VCs
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {selectedStage && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-africa-blue mb-4">
                  VCs investing in {selectedStage} <Badge className="ml-2">{stageVCs.length}</Badge>
                </h2>
                
                {stageVCs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stageVCs.slice(0, 6).map((vc) => (
                      <VCCard key={vc.id} vc={vc} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No VC firms found for this investment stage</p>
                  </div>
                )}
                
                {stageVCs.length > 6 && (
                  <div className="mt-6 text-center">
                    <Link 
                      to={`/directory?stage=${encodeURIComponent(selectedStage)}`}
                      className="text-africa-blue hover:underline"
                    >
                      View all {stageVCs.length} VC firms investing in {selectedStage}
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

export default StagesPage;
