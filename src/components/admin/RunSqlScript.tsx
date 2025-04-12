
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Copy, Check, ExternalLink } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

// Import the SQL script as a string
import sqlScript from '@/sql/create_tables.sql?raw';

export default function RunSqlScript() {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlScript);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "SQL script copied to clipboard!"
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>SQL Script to Create Tables</CardTitle>
        <CardDescription>
          Copy this script and run it in your Supabase SQL Editor to create all necessary tables
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Textarea
            className="font-mono text-sm h-80 bg-gray-50"
            readOnly
            value={sqlScript}
          />
          <Button
            variant="outline"
            size="sm"
            className="absolute top-2 right-2"
            onClick={copyToClipboard}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </>
            )}
          </Button>
        </div>
        
        <Alert className="bg-blue-50 border-blue-200">
          <AlertTitle>How to run this SQL script</AlertTitle>
          <AlertDescription className="space-y-2">
            <p>1. Go to your Supabase Dashboard</p>
            <p>2. Go to the SQL Editor</p>
            <p>3. Create a new SQL query</p>
            <p>4. Paste the SQL script above</p>
            <p>5. Run the query</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              asChild
            >
              <a 
                href="https://supabase.com/dashboard/project/_/sql" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center"
              >
                Open Supabase SQL Editor
                <ExternalLink className="ml-2 h-3 w-3" />
              </a>
            </Button>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
