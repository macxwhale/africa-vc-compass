
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Edit, Trash, Plus, Check, X, AlertTriangle, Database, FileCheck, Search, Upload } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useData } from "@/contexts/DataContext";
import { VCFirm, vcFirms as staticVCFirms } from "@/data/vcData";
import VCFirmForm from "@/components/admin/VCFirmForm";
import VCFirmsList from "@/components/admin/VCFirmsList";
import PendingVCFirmsList from "@/components/admin/PendingVCFirmsList";
import PendingVCFirmDetail from "@/components/admin/PendingVCFirmDetail";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PendingVCFirm } from "@/hooks/useDataOperations";
import { Badge } from "@/components/ui/badge";
import { AIResearchForm } from "@/components/admin/AIResearchForm";
import AdminLogin from "@/components/admin/AdminLogin";
import { vcFirmService } from "@/services/supabaseService";

interface Item {
  id: string;
  name: string;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("regions");
  const [isMigrating, setIsMigrating] = useState(false);
  
  const { 
    regionItems, 
    industryItems, 
    stageItems,
    vcFirms,
    pendingVCFirms,
    setRegionItems, 
    setIndustryItems, 
    setStageItems,
    addVCFirm,
    updateVCFirm,
    deleteVCFirm,
    approveVCFirm,
    rejectVCFirm,
    setVcFirms
  } = useData();
  
  const [newRegion, setNewRegion] = useState("");
  const [newIndustry, setNewIndustry] = useState("");
  const [newStage, setNewStage] = useState("");
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const [firmFormOpen, setFirmFormOpen] = useState(false);
  const [editingFirm, setEditingFirm] = useState<VCFirm | null>(null);
  
  const [viewingPendingFirm, setViewingPendingFirm] = useState<PendingVCFirm | null>(null);
  const [pendingFirmDetailOpen, setPendingFirmDetailOpen] = useState(false);
  
  // Count pending firms for badge
  const pendingCount = pendingVCFirms.filter(firm => firm.status === 'pending').length;

  // Automatically switch to pending tab if there are pending firms and none are being viewed
  useEffect(() => {
    if (pendingCount > 0 && !viewingPendingFirm && activeTab !== 'pending') {
      // Only show a notification if we're not already on the pending tab
      toast({
        title: "Pending VC Firms",
        description: `You have ${pendingCount} VC firm${pendingCount > 1 ? 's' : ''} pending review`,
      });
    }
  }, [pendingCount, viewingPendingFirm, activeTab]);

  // Check for authentication in localStorage on component mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('admin_authenticated') === 'true';
    setIsAuthenticated(isLoggedIn);
  }, []);

  // Handle successful login
  const handleLogin = () => {
    localStorage.setItem('admin_authenticated', 'true');
    setIsAuthenticated(true);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
  };

  // If not authenticated, show login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <AdminLogin onLogin={handleLogin} />
        <Footer />
      </div>
    );
  }

  const handleAddRegion = () => {
    if (newRegion.trim() === "") {
      toast({
        title: "Error",
        description: "Region name cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    const newItem = { id: `region-${Date.now()}`, name: newRegion };
    setRegionItems([...regionItems, newItem]);
    setNewRegion("");
    toast({
      title: "Success",
      description: "Region added successfully and saved to database",
    });
  };

  const handleAddIndustry = () => {
    if (newIndustry.trim() === "") {
      toast({
        title: "Error",
        description: "Industry name cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    const newItem = { id: `industry-${Date.now()}`, name: newIndustry };
    setIndustryItems([...industryItems, newItem]);
    setNewIndustry("");
    toast({
      title: "Success",
      description: "Industry added successfully and saved to database",
    });
  };

  const handleAddStage = () => {
    if (newStage.trim() === "") {
      toast({
        title: "Error",
        description: "Stage name cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    const newItem = { id: `stage-${Date.now()}`, name: newStage };
    setStageItems([...stageItems, newItem]);
    setNewStage("");
    toast({
      title: "Success",
      description: "Investment stage added successfully and saved to database",
    });
  };

  const startEditing = (id: string, currentValue: string) => {
    setEditingId(id);
    setEditValue(currentValue);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditValue("");
  };

  const saveEdit = (id: string, type: "region" | "industry" | "stage") => {
    if (editValue.trim() === "") {
      toast({
        title: "Error",
        description: "Name cannot be empty",
        variant: "destructive",
      });
      return;
    }

    if (type === "region") {
      setRegionItems(regionItems.map(item => 
        item.id === id ? { ...item, name: editValue } : item
      ));
    } else if (type === "industry") {
      setIndustryItems(industryItems.map(item => 
        item.id === id ? { ...item, name: editValue } : item
      ));
    } else if (type === "stage") {
      setStageItems(stageItems.map(item => 
        item.id === id ? { ...item, name: editValue } : item
      ));
    }

    setEditingId(null);
    setEditValue("");
    toast({
      title: "Success",
      description: "Item updated successfully and saved to database",
    });
  };

  const deleteItem = (id: string, type: "region" | "industry" | "stage") => {
    if (type === "region") {
      setRegionItems(regionItems.filter(item => item.id !== id));
    } else if (type === "industry") {
      setIndustryItems(industryItems.filter(item => item.id !== id));
    } else if (type === "stage") {
      setStageItems(stageItems.filter(item => item.id !== id));
    }

    toast({
      title: "Success",
      description: "Item deleted successfully and removed from database",
    });
  };

  const handleAddFirm = () => {
    setEditingFirm(null);
    setFirmFormOpen(true);
  };

  const handleEditFirm = (firm: VCFirm) => {
    setEditingFirm(firm);
    setFirmFormOpen(true);
  };

  const handleSaveFirm = async (firm: VCFirm) => {
    try {
      if (editingFirm) {
        await updateVCFirm(firm);
      } else {
        await addVCFirm(firm);
      }
    } catch (error) {
      console.error('Error saving firm:', error);
    }
  };

  const handleDeleteFirm = async (firmId: string) => {
    try {
      await deleteVCFirm(firmId);
    } catch (error) {
      console.error('Error deleting firm:', error);
    }
  };

  const handleViewPendingFirm = (firm: PendingVCFirm) => {
    setViewingPendingFirm(firm);
    setPendingFirmDetailOpen(true);
  };

  const handleApprovePendingFirm = async (firm: PendingVCFirm) => {
    try {
      await approveVCFirm(firm);
    } catch (error) {
      console.error('Error approving firm:', error);
    }
  };

  const handleRejectPendingFirm = async (firm: PendingVCFirm, notes?: string) => {
    try {
      await rejectVCFirm(firm, notes);
    } catch (error) {
      console.error('Error rejecting firm:', error);
    }
  };

  const handleMigrateVCFirms = async () => {
    try {
      setIsMigrating(true);
      toast({
        title: "Migration Started",
        description: "Migrating all VC firms to Lovable Cloud...",
      });

      let successCount = 0;
      let errorCount = 0;
      const errors: string[] = [];
      
      for (const firm of staticVCFirms) {
        try {
          const { id, ...firmWithoutId } = firm;
          await vcFirmService.createVCFirm(firmWithoutId);
          successCount++;
          console.log(`Migrated: ${firm.name}`);
        } catch (error) {
          console.error(`Error migrating firm ${firm.name}:`, error);
          errors.push(firm.name);
          errorCount++;
        }
      }
      
      // Reload VC firms from database
      const updatedFirms = await vcFirmService.getAllVCFirms();
      setVcFirms(updatedFirms);
      
      toast({
        title: "Migration Complete",
        description: `Successfully migrated ${successCount} VC firms. ${errorCount > 0 ? `${errorCount} errors.` : ''}`,
        variant: errorCount > 0 ? "destructive" : "default",
      });

      if (errors.length > 0) {
        console.error('Failed to migrate:', errors);
      }
    } catch (error) {
      console.error("Migration error:", error);
      toast({
        title: "Migration Failed",
        description: "Failed to migrate VC firms. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setIsMigrating(false);
    }
  };

  const renderItem = (item: Item, type: "region" | "industry" | "stage") => (
    <div key={item.id} className="p-4 border rounded-md flex justify-between items-center">
      {editingId === item.id ? (
        <div className="flex flex-1 mr-2">
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="mr-2"
          />
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => saveEdit(item.id, type)}>
              <Check className="h-4 w-4 mr-1" /> Save
            </Button>
            <Button variant="outline" size="sm" onClick={cancelEditing}>
              <X className="h-4 w-4 mr-1" /> Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <span>{item.name}</span>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => startEditing(item.id, item.name)}
            >
              <Edit className="h-4 w-4 mr-1" /> Edit
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => deleteItem(item.id, type)}
            >
              <Trash className="h-4 w-4 mr-1" /> Delete
            </Button>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gray-50 py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-africa-blue mb-2">Admin Dashboard</h1>
                <p className="text-gray-600">Manage regions, industries, investment stages, and VC firms</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" asChild>
                  <Link to="/directory">Back to Directory</Link>
                </Button>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
            
            <Alert variant="default" className="bg-green-50 border-green-200 mb-6">
              <AlertTitle>Database connected</AlertTitle>
              <AlertDescription>
                Changes are stored in Lovable Cloud and will persist between sessions.
              </AlertDescription>
            </Alert>
            
            <Tabs defaultValue="regions" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6 mb-8">
                <TabsTrigger value="regions">Regions</TabsTrigger>
                <TabsTrigger value="industries">Industries</TabsTrigger>
                <TabsTrigger value="stages">Investment Stages</TabsTrigger>
                <TabsTrigger value="vcfirms">VC Firms</TabsTrigger>
                <TabsTrigger value="pending" className="relative">
                  Pending Firms
                  {pendingCount > 0 && (
                    <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
                      {pendingCount}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="research">
                  <Search className="h-4 w-4 mr-2" />
                  AI Research
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="regions" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Regions Management</CardTitle>
                    <CardDescription>Add, edit, or remove investment regions in Africa</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="bg-green-50 border-l-4 border-green-400 p-4">
                        <p className="text-green-700">
                          Changes are stored in Lovable Cloud and will persist between sessions.
                        </p>
                      </div>
                      
                      <div className="flex gap-2 mb-4">
                        <Input 
                          placeholder="Enter region name" 
                          value={newRegion}
                          onChange={(e) => setNewRegion(e.target.value)}
                        />
                        <Button onClick={handleAddRegion}>
                          <Plus className="h-4 w-4 mr-1" /> Add Region
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {regionItems.map(item => renderItem(item, "region"))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="industries" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Industries Management</CardTitle>
                    <CardDescription>Add, edit, or remove industry sectors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="bg-green-50 border-l-4 border-green-400 p-4">
                        <p className="text-green-700">
                          Changes are stored in Lovable Cloud and will persist between sessions.
                        </p>
                      </div>
                      
                      <div className="flex gap-2 mb-4">
                        <Input 
                          placeholder="Enter industry name" 
                          value={newIndustry}
                          onChange={(e) => setNewIndustry(e.target.value)}
                        />
                        <Button onClick={handleAddIndustry}>
                          <Plus className="h-4 w-4 mr-1" /> Add Industry
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {industryItems.map(item => renderItem(item, "industry"))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="stages" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Investment Stages Management</CardTitle>
                    <CardDescription>Add, edit, or remove investment stages</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="bg-green-50 border-l-4 border-green-400 p-4">
                        <p className="text-green-700">
                          Changes are stored in Lovable Cloud and will persist between sessions.
                        </p>
                      </div>
                      
                      <div className="flex gap-2 mb-4">
                        <Input 
                          placeholder="Enter investment stage" 
                          value={newStage}
                          onChange={(e) => setNewStage(e.target.value)}
                        />
                        <Button onClick={handleAddStage}>
                          <Plus className="h-4 w-4 mr-1" /> Add Stage
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {stageItems.map(item => renderItem(item, "stage"))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="vcfirms" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>VC Firms Management</CardTitle>
                    <CardDescription>Add, edit, or remove venture capital firms</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="bg-green-50 border-l-4 border-green-400 p-4">
                        <p className="text-green-700">
                          Changes are stored in Lovable Cloud and will persist between sessions.
                        </p>
                      </div>

                      {vcFirms.length === 0 && (
                        <Alert variant="default" className="bg-blue-50 border-blue-200">
                          <Database className="h-4 w-4" />
                          <AlertTitle>No VC Firms Found</AlertTitle>
                          <AlertDescription>
                            <p className="mb-3">Your database is empty. Would you like to migrate the {staticVCFirms.length} default VC firms?</p>
                            <Button 
                              onClick={handleMigrateVCFirms}
                              disabled={isMigrating}
                              size="sm"
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              {isMigrating ? 'Migrating...' : `Migrate ${staticVCFirms.length} VC Firms to Cloud`}
                            </Button>
                          </AlertDescription>
                        </Alert>
                      )}
                      
                      <VCFirmsList
                        firms={vcFirms}
                        onEdit={handleEditFirm}
                        onDelete={handleDeleteFirm}
                        onAddNew={handleAddFirm}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="pending" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileCheck className="h-5 w-5" />
                      Pending Submissions
                    </CardTitle>
                    <CardDescription>Review and approve/reject VC firm submissions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="bg-green-50 border-l-4 border-green-400 p-4">
                        <p className="text-green-700">
                          Approved firms will be added to the public directory.
                        </p>
                      </div>
                      
                      <PendingVCFirmsList
                        firms={pendingVCFirms}
                        onView={handleViewPendingFirm}
                        onApprove={handleApprovePendingFirm}
                        onReject={(firm) => {
                          setViewingPendingFirm(firm);
                          setPendingFirmDetailOpen(true);
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="research" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="h-5 w-5" />
                      AI Research
                    </CardTitle>
                    <CardDescription>Research and automatically add VC firms to the pending queue</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="bg-green-50 border-l-4 border-green-400 p-4">
                        <p className="text-green-700">
                          AI-researched firms will be added to the pending queue for your review.
                        </p>
                      </div>
                      
                      <AIResearchForm />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
      
      <VCFirmForm
        open={firmFormOpen}
        onOpenChange={setFirmFormOpen}
        editingFirm={editingFirm}
        onSave={handleSaveFirm}
      />
      
      <PendingVCFirmDetail
        firm={viewingPendingFirm}
        open={pendingFirmDetailOpen}
        onOpenChange={setPendingFirmDetailOpen}
        onApprove={handleApprovePendingFirm}
        onReject={handleRejectPendingFirm}
      />
    </div>
  );
};

export default Admin;
