
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VCFirm } from "@/data/vcData";
import { Link } from "react-router-dom";

interface VCFirmSelectorProps {
  vcFirms: VCFirm[];
  selectedFirm: VCFirm | null;
  onSelectFirm: (firm: VCFirm | null) => void;
}

const VCFirmSelector = ({ vcFirms, selectedFirm, onSelectFirm }: VCFirmSelectorProps) => {
  const handleSelectFirm = (value: string) => {
    const firm = vcFirms.find(f => f.id === value);
    console.log("Selected firm in selector:", firm);
    
    // Log contact person information if available
    if (firm && firm.contactPerson) {
      console.log("Contact person from selector:", firm.contactPerson);
    } else {
      console.log("No contact person data available for this firm");
    }
    
    onSelectFirm(firm || null);
  };

  return (
    <div className="md:col-span-5">
      <Card>
        <CardHeader>
          <CardTitle>Select a VC Firm</CardTitle>
          <CardDescription>
            Choose a firm to view their contact information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select onValueChange={handleSelectFirm}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a VC firm" />
            </SelectTrigger>
            <SelectContent>
              {vcFirms.map((firm) => (
                <SelectItem key={firm.id} value={firm.id}>
                  {firm.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedFirm && (
        <div className="mt-8">
          <Link to={`/vc/${selectedFirm.id}`}>
            <Button variant="outline" className="w-full">
              View Full VC Profile
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default VCFirmSelector;
