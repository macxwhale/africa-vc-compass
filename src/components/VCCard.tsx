
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { type VCFirm } from "@/data/vcData";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface VCCardProps {
  vc: VCFirm;
}

const VCCard = ({ vc }: VCCardProps) => {
  // Prevent link click propagation
  const handleWebsiteLinkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(vc.website, '_blank');
  };
  
  return (
    <Link to={`/vc/${vc.id}`}>
      <Card className="h-full card-hover">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16 rounded-md">
              <AvatarImage 
                src={vc.logo} 
                alt={`${vc.name} logo`}
                className="object-cover"
              />
              <AvatarFallback className="rounded-md text-lg font-bold bg-africa-blue text-white">
                {vc.name.split(' ').map(word => word[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-bold">{vc.name}</h3>
              <p className="text-sm text-gray-500">{vc.headquarters}</p>
            </div>
          </div>
          
          <p className="mt-4 text-sm line-clamp-2">{vc.description}</p>
          
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <span className="font-medium">Ticket Size:</span>
            <span className="ml-2">{vc.ticketSize}</span>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2">
            {vc.stagePreference.slice(0, 2).map((stage) => (
              <Badge key={stage} variant="outline" className="bg-blue-50 text-africa-blue border-africa-blue">
                {stage}
              </Badge>
            ))}
            
            {vc.industries.slice(0, 2).map((industry) => (
              <Badge key={industry} variant="outline" className="bg-green-50 text-africa-green border-africa-green">
                {industry}
              </Badge>
            ))}
            
            {vc.regionsOfInterest.length > 0 && (
              <Badge variant="outline" className="bg-amber-50 text-africa-gold border-africa-gold">
                {vc.regionsOfInterest[0]}
              </Badge>
            )}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
            <span className="text-sm font-medium">Founded {vc.foundedYear}</span>
            <button 
              onClick={handleWebsiteLinkClick}
              className="flex items-center text-africa-blue-light hover:text-africa-blue"
            >
              <span className="text-sm">Website</span>
              <ExternalLink className="ml-1 h-3 w-3" />
            </button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default VCCard;
