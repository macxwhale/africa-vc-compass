
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
import { Edit, Trash, Plus, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { VCFirm } from "@/data/types";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";

interface VCFirmsListProps {
  firms: VCFirm[];
  onEdit: (firm: VCFirm) => void;
  onDelete: (firmId: string) => void;
  onAddNew: () => void;
}

export default function VCFirmsList({ 
  firms, 
  onEdit, 
  onDelete,
  onAddNew 
}: VCFirmsListProps) {
  const [firmToDelete, setFirmToDelete] = useState<VCFirm | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteConfirm = () => {
    if (firmToDelete) {
      onDelete(firmToDelete.id);
      toast({
        title: "Success",
        description: "VC firm deleted successfully",
      });
      setDeleteDialogOpen(false);
      setFirmToDelete(null);
    }
  };

  const promptDelete = (firm: VCFirm) => {
    setFirmToDelete(firm);
    setDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">VC Firms</h2>
        <Button onClick={onAddNew}>
          <Plus className="h-4 w-4 mr-2" /> Add New VC Firm
        </Button>
      </div>
      
      {firms.length > 0 ? (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Logo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Industries</TableHead>
                <TableHead>Stages</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {firms.map((firm) => (
                <TableRow key={firm.id}>
                  <TableCell>
                    <img 
                      src={firm.logo} 
                      alt={`${firm.name} logo`} 
                      className="h-8 w-8 object-cover rounded-md"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{firm.name}</TableCell>
                  <TableCell>{firm.headquarters}</TableCell>
                  <TableCell>
                    {firm.industries.slice(0, 2).join(", ")}
                    {firm.industries.length > 2 && "..."}
                  </TableCell>
                  <TableCell>
                    {firm.stagePreference.slice(0, 2).join(", ")}
                    {firm.stagePreference.length > 2 && "..."}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/vc/${firm.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => onEdit(firm)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => promptDelete(firm)}
                      >
                        <Trash className="h-4 w-4" />
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
          <p className="text-gray-500">No VC firms found</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-4"
            onClick={onAddNew}
          >
            <Plus className="h-4 w-4 mr-2" /> Add Your First VC Firm
          </Button>
        </div>
      )}
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {firmToDelete?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
