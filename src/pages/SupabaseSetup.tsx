
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Alert, 
  AlertDescription, 
  AlertTitle 
} from "@/components/ui/alert";
import {
  Check,
  Copy,
  Database,
  Code,
  ExternalLink,
  AlertTriangle,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { isSupabaseConfigured } from "@/services/supabaseService";

export default function SupabaseSetup() {
  const [activeTab, setActiveTab] = useState("setup");
  const [copiedTables, setCopiedTables] = useState(false);
  
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  const createTablesSQL = `
CREATE TABLE IF NOT EXISTS regions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS industries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS stages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS vc_firms (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  logo TEXT,
  description TEXT,
  website TEXT,
  headquarters TEXT,
  "foundedYear" INTEGER,
  "investmentFocus" TEXT[],
  industries TEXT[],
  "stagePreference" TEXT[],
  "ticketSize" TEXT,
  "regionsOfInterest" TEXT[],
  "portfolioCompanies" TEXT[],
  "keyPartners" JSONB,
  "contactInfo" JSONB
);`;

  const execSqlFunctionCode = `
-- Enable the pg_cron extension (requires admin/superuser privileges)
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Create a function to execute dynamic SQL
CREATE OR REPLACE FUNCTION exec_sql(query text) 
RETURNS void AS $$
BEGIN
  EXECUTE query;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
`;

  const copyToClipboard = (text: string, type: 'tables' | 'function') => {
    navigator.clipboard.writeText(text);
    
    if (type === 'tables') {
      setCopiedTables(true);
      setTimeout(() => setCopiedTables(false), 2000);
    }
    
    toast({
      title: "Copied to clipboard",
      description: `${type === 'tables' ? 'Create Tables SQL' : 'Function SQL'} copied to clipboard!`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gray-50 py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-africa-blue mb-2">
                  Supabase Setup
                </h1>
                <p className="text-gray-600">
                  Configure your Supabase project for this application
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link to="/admin">Back to Admin</Link>
              </Button>
            </div>
            
            {!isSupabaseConfigured ? (
              <Alert variant="destructive" className="mb-6">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Environment Variables Missing</AlertTitle>
                <AlertDescription>
                  Your Supabase environment variables are missing or invalid. Check that you have set:
                  <ul className="list-disc ml-6 mt-2">
                    <li><code className="bg-gray-100 px-1 rounded">VITE_SUPABASE_URL</code> - Your Supabase project URL</li>
                    <li><code className="bg-gray-100 px-1 rounded">VITE_SUPABASE_ANON_KEY</code> - Your Supabase anon/public key</li>
                  </ul>
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="mb-6 bg-green-50 border-green-200">
                <Check className="h-4 w-4 text-green-500" />
                <AlertTitle>Environment Variables Detected</AlertTitle>
                <AlertDescription>
                  Your Supabase environment variables are configured correctly.
                </AlertDescription>
              </Alert>
            )}
            
            <Tabs defaultValue="setup" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-8">
                <TabsTrigger value="setup">Setup Guide</TabsTrigger>
                <TabsTrigger value="tables">Create Tables</TabsTrigger>
                <TabsTrigger value="advanced">Advanced Config</TabsTrigger>
              </TabsList>
              
              <TabsContent value="setup">
                <Card>
                  <CardHeader>
                    <CardTitle>Getting Started with Supabase</CardTitle>
                    <CardDescription>Follow these steps to set up your Supabase project</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="p-4 border rounded-md bg-blue-50 border-blue-200">
                        <h3 className="text-lg font-medium mb-2 flex items-center">
                          <Database className="h-5 w-5 mr-2" />
                          Step 1: Create a Supabase Project
                        </h3>
                        <p className="mb-3">
                          If you haven't already, create a Supabase project at{" "}
                          <a 
                            href="https://supabase.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 flex items-center inline-flex"
                          >
                            supabase.com
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        </p>
                        <Button 
                          variant="outline" 
                          asChild 
                          size="sm" 
                          className="bg-white"
                        >
                          <a 
                            href="https://supabase.com/dashboard/new" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center"
                          >
                            Create New Project
                            <ExternalLink className="h-3 w-3 ml-2" />
                          </a>
                        </Button>
                      </div>
                      
                      <div className="p-4 border rounded-md bg-purple-50 border-purple-200">
                        <h3 className="text-lg font-medium mb-2 flex items-center">
                          <Code className="h-5 w-5 mr-2" />
                          Step 2: Get Your API Credentials
                        </h3>
                        <p className="mb-3">
                          Go to your project's API settings to get your URL and anon key.
                        </p>
                        <Button 
                          variant="outline" 
                          asChild 
                          size="sm" 
                          className="bg-white"
                        >
                          <a 
                            href="https://supabase.com/dashboard/project/_/settings/api" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center"
                          >
                            View API Settings
                            <ExternalLink className="h-3 w-3 ml-2" />
                          </a>
                        </Button>
                      </div>
                      
                      <div className="p-4 border rounded-md bg-amber-50 border-amber-200">
                        <h3 className="text-lg font-medium mb-2 flex items-center">
                          <Code className="h-5 w-5 mr-2" />
                          Step 3: Create Required Tables
                        </h3>
                        <p className="mb-3">
                          Go to the SQL Editor in your Supabase dashboard and run the SQL to create necessary tables.
                        </p>
                        <Button 
                          onClick={() => setActiveTab("tables")}
                          size="sm"
                        >
                          See Create Tables SQL
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="tables">
                <Card>
                  <CardHeader>
                    <CardTitle>Create Tables in Supabase</CardTitle>
                    <CardDescription>Run this SQL in the Supabase SQL Editor</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 p-4 border bg-gray-50 rounded-md">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">SQL to Create Tables</h3>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => copyToClipboard(createTablesSQL, 'tables')}
                          className="flex items-center"
                        >
                          {copiedTables ? (
                            <>
                              <Check className="h-4 w-4 mr-1" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4 mr-1" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                        {createTablesSQL}
                      </pre>
                    </div>
                    
                    <div className="space-y-4">
                      <Alert>
                        <AlertTitle>How to Run This SQL</AlertTitle>
                        <AlertDescription>
                          <ol className="list-decimal ml-6 mt-2 space-y-2">
                            <li>Go to the SQL Editor in your Supabase dashboard</li>
                            <li>Create a new query</li>
                            <li>Paste the SQL above</li>
                            <li>Click "Run" to execute the query</li>
                          </ol>
                        </AlertDescription>
                      </Alert>
                      
                      <Button
                        asChild
                        className="mt-4"
                      >
                        <a 
                          href="https://supabase.com/dashboard/project/_/sql/new" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center"
                        >
                          Open SQL Editor
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="advanced">
                <Card>
                  <CardHeader>
                    <CardTitle>Advanced Supabase Configuration</CardTitle>
                    <CardDescription>Additional functions for better database interaction</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="mb-4 p-4 border bg-gray-50 rounded-md">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">SQL Function for Executing Dynamic SQL</h3>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => copyToClipboard(execSqlFunctionCode, 'function')}
                          className="flex items-center"
                        >
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </Button>
                      </div>
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                        {execSqlFunctionCode}
                      </pre>
                    </div>
                    
                    <Alert className="bg-yellow-50 border-yellow-200">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Admin Privileges Required</AlertTitle>
                      <AlertDescription>
                        The function above requires admin privileges to create. If you don't have admin access, you can skip this step and use the manual table creation instead.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Current Configuration</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-md">
                          <h4 className="text-sm font-medium text-gray-500">SUPABASE URL</h4>
                          <code className="text-sm">{supabaseUrl || "Not configured"}</code>
                        </div>
                        <div className="p-4 border rounded-md">
                          <h4 className="text-sm font-medium text-gray-500">SUPABASE ANON KEY</h4>
                          <code className="text-sm">
                            {supabaseKey ? `${supabaseKey.slice(0, 20)}...${supabaseKey.slice(-5)}` : "Not configured"}
                          </code>
                        </div>
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
}
