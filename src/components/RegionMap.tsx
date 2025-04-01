
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useData } from "@/contexts/DataContext";

const RegionMap = () => {
  const { regionNames } = useData();

  // Create a display of regions with mock counts
  const regionsWithCounts = regionNames.map((name, index) => {
    const colors = [
      "bg-africa-blue",
      "bg-africa-green",
      "bg-africa-gold",
      "bg-africa-blue-light",
      "bg-africa-green-light"
    ];
    
    // Generate a random count between 5 and 30
    const count = Math.floor(Math.random() * 25) + 5;
    
    return {
      name,
      count,
      color: colors[index % colors.length]
    };
  });

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
                {/* Placeholder for an actual map visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-gray-500">Interactive Map</p>
                    <p className="text-sm text-gray-400">(Visual representation of VC activity across Africa)</p>
                  </div>
                </div>
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
