
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { industries, stages, regions } from "@/data/vcData";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Trash, Plus, Check, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface Item {
  id: string;
  name: string;
}

const Admin = () => {
  const [activeTab, setActiveTab] = useState("regions");
  
  // State for each category
  const [regionItems, setRegionItems] = useState<Item[]>([]);
  const [industryItems, setIndustryItems] = useState<Item[]>([]);
  const [stageItems, setStageItems] = useState<Item[]>([]);
  
  // State for new item inputs
  const [newRegion, setNewRegion] = useState("");
  const [newIndustry, setNewIndustry] = useState("");
  const [newStage, setNewStage] = useState("");
  
  // State for editing
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  // Initialize data on component mount
  useEffect(() => {
    // Convert string arrays to Item arrays with IDs
    setRegionItems(regions.map((name, index) => ({ id: `region-${index}`, name })));
    setIndustryItems(industries.map((name, index) => ({ id: `industry-${index}`, name })));
    setStageItems(stages.map((name, index) => ({ id: `stage-${index}`, name })));
  }, []);

  // Handle adding new items
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
      description: "Region added successfully",
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
      description: "Industry added successfully",
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
      description: "Investment stage added successfully",
    });
  };

  // Handle editing items
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
      description: "Item updated successfully",
    });
  };

  // Handle deleting items
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
      description: "Item deleted successfully",
    });
  };

  // Render item with edit/delete controls
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
                <p className="text-gray-600">Manage regions, industries, and investment stages</p>
              </div>
              <Button variant="outline" asChild>
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
            
            <Tabs defaultValue="regions" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="regions">Regions</TabsTrigger>
                <TabsTrigger value="industries">Industries</TabsTrigger>
                <TabsTrigger value="stages">Investment Stages</TabsTrigger>
              </TabsList>
              
              <TabsContent value="regions" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Regions Management</CardTitle>
                    <CardDescription>Add, edit, or remove investment regions in Africa</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                        <p className="text-yellow-700">
                          Changes are stored in local state. Backend integration will be implemented later.
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
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                        <p className="text-yellow-700">
                          Changes are stored in local state. Backend integration will be implemented later.
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
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                        <p className="text-yellow-700">
                          Changes are stored in local state. Backend integration will be implemented later.
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
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
