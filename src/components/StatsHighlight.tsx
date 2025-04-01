
import { Card, CardContent } from "@/components/ui/card";

const StatsHighlight = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="text-africa-blue text-3xl font-bold">150+</div>
          <div className="mt-2 text-sm text-gray-600">Active VC Firms</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="text-africa-green text-3xl font-bold">40+</div>
          <div className="mt-2 text-sm text-gray-600">African Countries</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="text-africa-gold text-3xl font-bold">$4.8B</div>
          <div className="mt-2 text-sm text-gray-600">2025 Investment</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="text-africa-blue-light text-3xl font-bold">18+</div>
          <div className="mt-2 text-sm text-gray-600">Industries Covered</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsHighlight;
