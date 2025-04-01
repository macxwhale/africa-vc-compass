
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const RegionMap = () => {
  const regions = [
    { name: "East Africa", count: 18, color: "bg-africa-blue" },
    { name: "West Africa", count: 25, color: "bg-africa-green" },
    { name: "North Africa", count: 12, color: "bg-africa-gold" },
    { name: "Southern Africa", count: 15, color: "bg-africa-blue-light" },
    { name: "Central Africa", count: 5, color: "bg-africa-green-light" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-africa-blue mb-6">Regional Investment Activity</h2>
      
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
                {regions.map((region) => (
                  <Link key={region.name} to={`/regions/${region.name.toLowerCase().replace(/\s+/g, '-')}`}>
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
