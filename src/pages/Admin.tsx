
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { industries, stages, regions } from "@/data/vcData";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("regions");

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
                          Backend integration coming soon. Currently displaying static data.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {regions.map((region, index) => (
                          <div key={index} className="p-4 border rounded-md flex justify-between items-center">
                            <span>{region}</span>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" disabled>Edit</Button>
                              <Button variant="outline" size="sm" disabled>Delete</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button className="w-full mt-4" disabled>Add New Region</Button>
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
                          Backend integration coming soon. Currently displaying static data.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {industries.map((industry, index) => (
                          <div key={index} className="p-4 border rounded-md flex justify-between items-center">
                            <span>{industry}</span>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" disabled>Edit</Button>
                              <Button variant="outline" size="sm" disabled>Delete</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button className="w-full mt-4" disabled>Add New Industry</Button>
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
                          Backend integration coming soon. Currently displaying static data.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {stages.map((stage, index) => (
                          <div key={index} className="p-4 border rounded-md flex justify-between items-center">
                            <span>{stage}</span>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" disabled>Edit</Button>
                              <Button variant="outline" size="sm" disabled>Delete</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button className="w-full mt-4" disabled>Add New Stage</Button>
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
