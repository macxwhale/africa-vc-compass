
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { CheckCircle, XCircle, Eye } from "lucide-react";
import { PendingVCFirm } from "@/contexts/DataContext";
import { format } from "date-fns";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

interface PendingVCFirmsListProps {
  firms: PendingVCFirm[];
  onView: (firm: PendingVCFirm) => void;
  onApprove: (firm: PendingVCFirm) => void;
  onReject: (firm: PendingVCFirm, notes: string) => void;
}

export default function PendingVCFirmsList({ 
  firms, 
  onView, 
  onApprove, 
  onReject 
}: PendingVCFirmsListProps) {
  const [firmToReject, setFirmToReject] = useState<PendingVCFirm | null>(null);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectNotes, setRejectNotes] = useState("");

  const handleRejectConfirm = () => {
    if (firmToReject) {
      onReject(firmToReject, rejectNotes);
      setRejectDialogOpen(false);
      setFirmToReject(null);
      setRejectNotes("");
    }
  };

  const promptReject = (firm: PendingVCFirm) => {
    setFirmToReject(firm);
    setRejectNotes("");
    setRejectDialogOpen(true);
  };

  const pendingFirms = firms.filter(firm => firm.status === 'pending');

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Pending VC Firms</h2>
        <Badge variant="outline">{pendingFirms.length} pending</Badge>
      </div>
      
      {pendingFirms.length > 0 ? (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Logo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingFirms.map((firm) => (
                <TableRow key={firm.id}>
                  <TableCell>
                    <img 
                      src={firm.logo || '/placeholder.svg'} 
                      alt={`${firm.name} logo`} 
                      className="h-8 w-8 object-cover rounded-md"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{firm.name}</TableCell>
                  <TableCell>{firm.headquarters}</TableCell>
                  <TableCell>
                    {firm.submittedAt ? 
                      format(new Date(firm.submittedAt), 'MMM d, yyyy') : 
                      'Unknown date'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => onView(firm)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-green-600 hover:text-green-700" 
                        onClick={() => onApprove(firm)}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-600 hover:text-red-700" 
                        onClick={() => promptReject(firm)}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-8 border rounded-md">
          <p className="text-gray-500">No pending VC firms found</p>
        </div>
      )}
      
      {/* Reject Confirmation Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject VC Firm</DialogTitle>
            <DialogDescription>
              Please provide feedback on why you're rejecting {firmToReject?.name}. This information may be shared with the submitter.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Rejection notes (optional)"
              value={rejectNotes}
              onChange={(e) => setRejectNotes(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRejectConfirm}>
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
