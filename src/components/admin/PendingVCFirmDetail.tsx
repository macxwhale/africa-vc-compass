
import { PendingVCFirm } from "@/hooks/useDataOperations";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, CheckCircle, XCircle } from "lucide-react";

interface PendingVCFirmDetailProps {
  firm: PendingVCFirm | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApprove: (firm: PendingVCFirm) => void;
  onReject: (firm: PendingVCFirm) => void;
}

export default function PendingVCFirmDetail({
  firm,
  open,
  onOpenChange,
  onApprove,
  onReject
}: PendingVCFirmDetailProps) {
  if (!firm) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-3">
            <div className="relative">
              <img 
                src={firm.logo || '/placeholder.svg'} 
                alt={`${firm.name} logo`} 
                className="h-10 w-10 object-cover rounded-md"
              />
              <Badge className="absolute -top-2 -right-2 text-xs" variant="outline">
                Pending
              </Badge>
            </div>
            {firm.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Submission Date</h3>
              <p>{format(new Date(firm.submittedAt), 'MMMM d, yyyy')}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Headquarters</h3>
              <p>{firm.headquarters || 'Not specified'}</p>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-1">Description</h3>
            <p className="text-sm">{firm.description || 'No description provided'}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Website</h3>
              {firm.website ? (
                <a 
                  href={firm.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  {firm.website}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                <p>Not provided</p>
              )}
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Founded</h3>
              <p>{firm.foundedYear || 'Not specified'}</p>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-1">Industries</h3>
            <div className="flex flex-wrap gap-2">
              {firm.industries && firm.industries.length > 0 ? 
                firm.industries.map(industry => (
                  <Badge key={industry} variant="secondary">{industry}</Badge>
                )) : 
                <p className="text-sm text-muted-foreground">No industries specified</p>
              }
            </div>
          </div>

          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-1">Regions of Interest</h3>
            <div className="flex flex-wrap gap-2">
              {firm.regionsOfInterest && firm.regionsOfInterest.length > 0 ? 
                firm.regionsOfInterest.map(region => (
                  <Badge key={region} variant="secondary">{region}</Badge>
                )) : 
                <p className="text-sm text-muted-foreground">No regions specified</p>
              }
            </div>
          </div>

          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-1">Investment Stages</h3>
            <div className="flex flex-wrap gap-2">
              {firm.stagePreference && firm.stagePreference.length > 0 ? 
                firm.stagePreference.map(stage => (
                  <Badge key={stage} variant="secondary">{stage}</Badge>
                )) : 
                <p className="text-sm text-muted-foreground">No stages specified</p>
              }
            </div>
          </div>

          <div>
            <h3 className="font-medium text-sm text-muted-foreground">Ticket Size</h3>
            <p>{firm.ticketSize || 'Not specified'}</p>
          </div>
        </div>
        
        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300" 
              onClick={() => {
                onReject(firm);
                onOpenChange(false);
              }}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject
            </Button>
            <Button 
              variant="default"
              className="bg-green-600 hover:bg-green-700" 
              onClick={() => {
                onApprove(firm);
                onOpenChange(false);
              }}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
