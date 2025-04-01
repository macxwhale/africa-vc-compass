
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/contexts/DataContext";
import { Link } from "react-router-dom";
import VCCard from "@/components/VCCard";

const RegionsPage = () => {
  const { vcFirms, regionNames } = useData();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  // Count VCs per region
  const regionCounts = regionNames.reduce((acc, region) => {
    const count = vcFirms.filter(vc => vc.regionsOfInterest.includes(region)).length;
    return { ...acc, [region]: count };
  }, {} as Record<string, number>);
  
  // Get VCs for selected region
  const regionalVCs = selectedRegion 
    ? vcFirms.filter(vc => vc.regionsOfInterest.includes(selectedRegion))
    : [];

  // Assign colors based on region names
  const getRegionColor = (name: string) => {
    if (name.includes("East")) return "bg-africa-green";
    if (name.includes("West")) return "bg-africa-gold";
    if (name.includes("North")) return "bg-africa-blue-light";
    if (name.includes("Southern")) return "bg-africa-green-light";
    if (name.includes("Central")) return "bg-gray-500";
    if (name.includes("Pan")) return "bg-purple-500";
    return "bg-africa-blue";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gray-50 py-8 md:py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-africa-blue mb-2">African Regions</h1>
            <p className="text-gray-600 mb-6">Explore VC investment activity across different regions of Africa</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <div className="aspect-[4/3] bg-gray-100 rounded-lg relative">
                      {/* Africa map outline - Detailed SVG map */}
                      <svg 
                        viewBox="0 0 1000 1100" 
                        className="absolute inset-0 w-full h-full"
                      >
                        {/* Base Map - Africa Outline */}
                        <path
                          d="M500,177.6c0.9,1.8,1.8,3.7,2.9,5.4c5.5,8.2,9.7,16.9,12.5,26.6c0.9,3.2,1.7,6.5,2.2,9.8c1.1,6.6-1.8,11.5-7.7,14.6
                           c-6.7,3.5-13.7,6.4-20.5,9.5c-11.4,5.2-22.7,10.3-33.9,15.8c-4.8,2.4-8.9,6-11.3,10.9c-3.2,6.3-5.9,12.8-8.5,19.4
                           c-1.2,3.2-2.5,6.3-3.9,9.3c-6.1,12.8-9.7,26.4-10.5,40.5c-0.4,7.2-0.5,14.4-0.9,21.5c-0.3,5.2-0.7,10.3-1.6,15.4
                           c-0.8,4.9-1.7,9.9-3.2,14.6c-6.6,20.7-14.5,40.8-25.1,59.6c-5.1,9-7.8,18.7-8,28.9c0,2.1-0.2,4.3-0.4,6.4
                           c-1.2,15.7-0.7,31.5,1.5,47.1c0.5,3.8,1.5,7.6,2.1,11.4c1.5,9.1,4.9,17.4,10.4,24.7c5,6.6,10.2,13.1,15.3,19.6
                           c7.7,9.7,16.6,18.4,25.5,27c4.8,4.6,9.4,9.4,13.5,14.7c3.3,4.4,5.9,9.3,8.5,14.1c6.1,11,10.9,22.5,15.7,34.1
                           c1.4,3.5,2.6,7.2,3.5,10.9c1.4,6,0,11.4-4.3,15.8c-2.7,2.7-5.6,5.3-8.4,7.8c-2.7,2.4-5.6,4.6-8.1,7.2c-2.6,2.7-3.6,6.5-2.7,10.1
                           c1.1,4.8,1.8,9.8,3.7,14.2c3.7,8.5,7.9,16.8,12.1,25.1c6,11.7,11.8,23.4,16.3,35.7c2.3,6.3,3.7,12.9,5.1,19.5
                           c0.8,4.1,1.7,8.1,2,12.2c0.7,9.6,0.5,19.1-0.9,28.6c-1.8,12.3-3.9,24.6-7.1,36.6c-1.6,6-3.3,12-5.8,17.6
                           c-3.2,7.1-7.8,12.8-15,16c-8.1,3.6-16.6,4.9-25.3,5.2c-8.1,0.3-16.2,0.2-24.2,2.2c-5.2,1.3-10.4,2.7-15.4,4.7
                           c-11.5,4.6-21.1,11.8-28.8,21.5c-5.2,6.6-9.5,13.6-12,21.6c-3.2,10.2-8.8,19.1-17.1,26.1c-11.3,9.5-24.2,16.1-38.4,19.4
                           c-5.4,1.3-10.8,2.8-16.2,4.2c-8.8,2.3-13.6,8.1-16.1,16.5c-2.5,8.2-2.8,16.7-2.3,25.2c0.4,6.8,0.6,13.5,0.5,20.3
                           c-0.2,11.5-1.6,22.9-5,33.9c-2.1,6.9-5.2,13.5-7.9,20.2c-0.9,2.1-1.8,4.2-2.7,6.3c-1.9,4.4-3.9,8.7-6.1,12.9
                           c-8.7,16.5-24.3,21.5-41.6,18c-7.5-1.5-14.4-4.5-20.5-9c-4.1-3-6.3-7.3-7-12.3c-0.7-5.2-0.9-10.5-0.8-15.8
                           c0.2-10.9,4.5-20.2,10.9-28.5c4.9-6.4,10.1-12.6,14.4-19.5c1.9-3.1,3.2-7,3.4-10.6c0.6-8.8,0.7-17.6,0.7-26.4
                           c0-10.5-0.4-21-0.7-31.5c-0.1-4-0.2-8-1-11.9c-1.2-5.8-5.4-9-11.3-9.9c-7.3-1.1-13.8,1.2-20,4.6c-11,6-21.6,12.7-31.8,19.9
                           c-6.6,4.7-13.3,9.2-19.9,13.9c-1.9,1.4-3.5,3.2-5.2,4.8c-8.7,8.5-12.9,19.2-14.8,31.1c-1.2,7.3-1.8,14.6-2.7,21.9
                           c-0.4,3.4-0.7,6.9-1.5,10.2c-2.1,9-8.3,13.7-17.3,14.4c-5.9,0.4-11.9-0.5-17.8-0.5c-5.1-0.1-9.9,0.5-14.8,2.2
                           c-8.1,2.9-13.1,8.8-14.5,17.3c-0.9,5.2-1.2,10.5-1.5,15.7c-0.3,5.5-0.2,11-0.4,16.5c-0.4,11.2-5.9,18.7-15.9,22.9
                           c-8.1,3.4-16.6,3.8-25.2,2.7c-7.1-0.9-12.5-5-14.5-12c-1.9-6.3-0.8-12.5,1.3-18.5c0.8-2.4,1.5-4.8,2.3-7.1c2.2-6.5,3-13.3,3.3-20.1
                           c0.6-14.2,1.7-28.3,3.3-42.4c1.1-9.6,3.8-18.8,7-27.8c2.6-7.3,5.2-14.6,8.2-21.8c6.9-16.5,10.2-33.8,11.8-51.4
                           c1.2-13.4,2.7-26.8,4.5-40.1c0.3-2.5,1.4-5.2,2.8-7.3c4.7-7.4,9.9-14.4,14.8-21.7c6.6-9.7,13.1-19.4,19.7-29.1
                           c1.8-2.7,3.5-5.4,5.5-8c12.8-16.2,24.9-32.9,34.2-51.5c4.1-8.2,7.7-16.7,11.1-25.3c5.9-14.8,11.6-29.8,17.2-44.8
                           c2.3-6.2,3.9-12.6,5.7-19c3.5-12.5,6.7-25.1,10.4-37.5c4.1-13.9,8.5-27.7,13.1-41.5c3.6-10.9,7.5-21.6,11.8-32.3
                           c1.6-4,4.6-7.7,7.5-11.1c6.2-7.5,14.2-12.7,23.2-16.4c5.8-2.4,11.8-4.2,17.9-5.6c10.1-2.2,19.8-5.6,29.1-10.2
                           c7.9-3.9,15.3-8.5,22.8-13c14.6-8.9,29.1-18,43.8-26.8c2.5-1.5,5.5-2.4,8.4-3.2c7.3-2,14.7-3.6,22.1-5.5c14.1-3.7,28.4-3.2,42.7-1
                           c5.4,0.8,11,1,16.2,2.4c10.7,2.9,18.2,9.8,23.5,19.3c2.6,4.7,5.3,9.3,7.7,14.2c3.5,7.3,8.1,14,13.4,20.1
                           C498.2,174.6,499.1,176.1,500,177.6z"
                          fill="#FFFFFF" 
                          stroke="#555555" 
                          strokeWidth="2"
                        />

                        {/* North Africa region */}
                        <path
                          d="M500,177.6c-0.9-1.5-1.8-3-2.9-4.4c-5.2-6.1-9.9-12.8-13.4-20.1c-2.4-4.9-5.1-9.5-7.7-14.2c-5.3-9.5-12.8-16.4-23.5-19.3
                           c-5.2-1.4-10.8-1.6-16.2-2.4c-14.3-2.1-28.7-2.7-42.7,1c-7.4,1.9-14.8,3.5-22.1,5.5c-2.9,0.8-5.9,1.7-8.4,3.2
                           c-14.7,8.8-29.2,17.9-43.8,26.8c-7.5,4.5-14.9,9.1-22.8,13c-9.3,4.6-19,8-29.1,10.2c-6.1,1.3-12.1,3.2-17.9,5.6
                           c-9,3.7-17,8.9-23.2,16.4c-2.9,3.4-5.9,7.1-7.5,11.1c-4.3,10.7-8.2,21.4-11.8,32.3c-4.6,13.8-9,27.6-13.1,41.5
                           c-3.7,12.4-6.9,25-10.4,37.5c-1.8,6.3-3.4,12.8-5.7,19c-5.6,15-11.3,30-17.2,44.8c-3.3,8.6-7,17.1-11.1,25.3
                           c-9.3,18.6-21.4,35.3-34.2,51.5c-2,2.6-3.7,5.4-5.5,8L500,177.6z"
                          fill={selectedRegion === "North Africa" ? "rgba(118, 169, 250, 0.5)" : "rgba(118, 169, 250, 0.2)"}
                          stroke="rgba(118, 169, 250, 0.7)"
                          strokeWidth={selectedRegion === "North Africa" ? "3" : "1.5"}
                          className="cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => setSelectedRegion(selectedRegion === "North Africa" ? null : "North Africa")}
                        />
                        
                        {/* West Africa region */}
                        <path
                          d="M132.8,392.6c-1.8,2.7-3.5,5.4-5.5,8c-6.6,9.7-13.1,19.4-19.7,29.1c-4.9,7.3-10.1,14.3-14.8,21.7
                           c-1.4,2.1-2.5,4.8-2.8,7.3c-1.8,13.3-3.3,26.7-4.5,40.1c-1.6,17.6-4.9,34.9-11.8,51.4c-3,7.2-5.6,14.5-8.2,21.8
                           c-3.2,9-5.9,18.2-7,27.8l192-207.2z"
                          fill={selectedRegion === "West Africa" ? "rgba(252, 211, 77, 0.5)" : "rgba(252, 211, 77, 0.2)"}
                          stroke="rgba(252, 211, 77, 0.7)"
                          strokeWidth={selectedRegion === "West Africa" ? "3" : "1.5"}
                          className="cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => setSelectedRegion(selectedRegion === "West Africa" ? null : "West Africa")}
                        />
                        
                        {/* Central Africa region */}
                        <path
                          d="M58.5,570c-1.6,14.1-2.7,28.2-3.3,42.4c-0.3,6.8-1.1,13.6-3.3,20.1c-0.8,2.4-1.5,4.8-2.3,7.1
                           c-2.1,6-3.2,12.2-1.3,18.5c2,7,7.4,11.1,14.5,12c8.6,1.1,17.1,0.7,25.2-2.7c10-4.2,15.5-11.7,15.9-22.9
                           c0.2-5.5,0.1-11,0.4-16.5c0.3-5.2,0.6-10.5,1.5-15.7c1.4-8.5,6.4-14.4,14.5-17.3c4.9-1.7,9.7-2.3,14.8-2.2
                           c5.9,0,11.9,0.9,17.8,0.5c9-0.7,15.2-5.4,17.3-14.4c0.8-3.3,1.1-6.8,1.5-10.2c0.9-7.3,1.5-14.6,2.7-21.9
                           c1.9-11.9,6.1-22.6,14.8-31.1c1.8-1.7,3.4-3.5,5.2-4.8c6.6-4.7,13.3-9.2,19.9-13.9c10.2-7.2,20.8-13.9,31.8-19.9
                           c6.2-3.4,12.7-5.7,20-4.6c5.9,0.9,10.1,4.1,11.3,9.9c0.8,3.9,0.9,7.9,1,11.9c0.3,10.5,0.7,21,0.7,31.5c0,8.8-0.1,17.6-0.7,26.4
                           c-0.2,3.6-1.5,7.5-3.4,10.6c-4.3,6.9-9.5,13.1-14.4,19.5c-6.4,8.3-10.7,17.6-10.9,28.5c-0.1,5.3,0.1,10.6,0.8,15.8
                           c0.7,5,2.9,9.3,7,12.3c6.1,4.5,13,7.5,20.5,9c17.3,3.5,32.9-1.5,41.6-18c2.2-4.2,4.2-8.5,6.1-12.9L58.5,570z"
                          fill={selectedRegion === "Central Africa" ? "rgba(156, 163, 175, 0.5)" : "rgba(156, 163, 175, 0.2)"}
                          stroke="rgba(156, 163, 175, 0.7)"
                          strokeWidth={selectedRegion === "Central Africa" ? "3" : "1.5"}
                          className="cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => setSelectedRegion(selectedRegion === "Central Africa" ? null : "Central Africa")}
                        />
                        
                        {/* East Africa region */}
                        <path
                          d="M500,177.6l-120.9,300.8c-2.6-4.8-5.2-9.7-8.5-14.1c-4.1-5.3-8.7-10.1-13.5-14.7c-8.9-8.6-17.8-17.3-25.5-27
                           c-5.1-6.5-10.3-13-15.3-19.6c-5.5-7.3-8.9-15.6-10.4-24.7c-0.6-3.8-1.6-7.6-2.1-11.4c-2.2-15.6-2.7-31.4-1.5-47.1
                           c0.2-2.1,0.4-4.3,0.4-6.4c0.2-10.2,2.9-19.9,8-28.9c10.6-18.8,18.5-38.9,25.1-59.6c1.5-4.7,2.4-9.7,3.2-14.6
                           c0.9-5.1,1.3-10.2,1.6-15.4c0.4-7.1,0.5-14.3,0.9-21.5c0.8-14.1,4.4-27.7,10.5-40.5c1.4-3,2.7-6.1,3.9-9.3
                           c2.6-6.6,5.3-13.1,8.5-19.4c2.4-4.9,6.5-8.5,11.3-10.9c11.2-5.5,22.5-10.6,33.9-15.8c6.8-3.1,13.8-6,20.5-9.5
                           c5.9-3.1,8.8-8,7.7-14.6c-0.5-3.3-1.3-6.6-2.2-9.8c-2.8-9.7-7-18.4-12.5-26.6c-1.1-1.7-2-3.6-2.9-5.4L500,177.6z"
                          fill={selectedRegion === "East Africa" ? "rgba(52, 211, 153, 0.5)" : "rgba(52, 211, 153, 0.2)"}
                          stroke="rgba(52, 211, 153, 0.7)"
                          strokeWidth={selectedRegion === "East Africa" ? "3" : "1.5"}
                          className="cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => setSelectedRegion(selectedRegion === "East Africa" ? null : "East Africa")}
                        />
                        
                        {/* Southern Africa region */}
                        <path
                          d="M266.5,672.9c0.9-2.1,1.8-4.2,2.7-6.3c2.7-6.7,5.8-13.3,7.9-20.2c3.4-11,4.8-22.4,5-33.9
                           c0.1-6.8-0.1-13.5-0.5-20.3c-0.5-8.5-0.2-17,2.3-25.2c2.5-8.4,7.3-14.2,16.1-16.5c5.4-1.4,10.8-2.9,16.2-4.2
                           c14.2-3.3,27.1-9.9,38.4-19.4c8.3-7,13.9-15.9,17.1-26.1c2.5-8,6.8-15,12-21.6c7.7-9.7,17.3-16.9,28.8-21.5
                           c5-2,10.2-3.4,15.4-4.7c8-2,16.1-1.9,24.2-2.2c8.7-0.3,17.2-1.6,25.3-5.2c7.2-3.2,11.8-8.9,15-16c2.5-5.6,4.2-11.6,5.8-17.6
                           c3.2-12,5.3-24.3,7.1-36.6c1.4-9.5,1.6-19,0.9-28.6c-0.3-4.1-1.2-8.1-2-12.2c-1.4-6.6-2.8-13.2-5.1-19.5
                           c-4.5-12.3-10.3-24-16.3-35.7c-4.2-8.3-8.4-16.6-12.1-25.1c-1.9-4.4-2.6-9.4-3.7-14.2c-0.9-3.6,0.1-7.4,2.7-10.1
                           c2.5-2.6,5.4-4.8,8.1-7.2c2.8-2.5,5.7-5.1,8.4-7.8c4.3-4.4,5.7-9.8,4.3-15.8c-0.9-3.7-2.1-7.4-3.5-10.9
                           c-4.8-11.6-9.6-23.1-15.7-34.1L266.5,672.9z"
                          fill={selectedRegion === "Southern Africa" ? "rgba(110, 231, 183, 0.5)" : "rgba(110, 231, 183, 0.2)"}
                          stroke="rgba(110, 231, 183, 0.7)"
                          strokeWidth={selectedRegion === "Southern Africa" ? "3" : "1.5"}
                          className="cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => setSelectedRegion(selectedRegion === "Southern Africa" ? null : "Southern Africa")}
                        />
                        
                        {/* Madagascar */}
                        <path
                          d="M636,500c0,3.3-0.6,6.3-1.9,9c-2,4.4-4.2,8.8-6.9,12.8c-5.2,7.9-11.2,15.1-17.8,21.9c-2.7,2.8-5.6,5.3-8.5,7.8
                           c-3.9,3.4-7.9,3.5-12.2,0.8c-5.2-3.2-8.3-8.1-10.9-13.5c-3.2-6.8-5.5-13.8-7.3-21.1c-2-8.3-3.7-16.8-5.3-25.2
                           c-0.7-3.7-0.8-7.5-1.2-11.3c-0.1-1.3,0-2.7,0.1-4c0.4-7.5,2.5-14.6,7.9-20.1c2.5-2.5,5.3-4.8,8.3-6.7c10.2-6.8,19.6-14.7,28.5-23.3
                           c1.8-1.7,3.7-3.2,5.9-4.3c5.8-2.9,11.2-1.7,15.1,3.4c2.4,3.2,3.9,6.8,5.1,10.6c1.3,4.1,1.8,8.3,2.6,12.6c1.4,7.2,1.8,14.5,0.7,21.8
                           c-0.9,6.1-1.3,12.3-1.9,18.5C636.1,493.6,636,496.8,636,500z"
                          fill="#F5F5F5"
                          stroke="#555555"
                          strokeWidth="2"
                        />
                        
                        {/* Pan-African indicator */}
                        {selectedRegion === "Pan-African" && (
                          <circle
                            cx="380"
                            cy="380"
                            r="150"
                            fill="rgba(168, 85, 247, 0.2)"
                            stroke="rgba(168, 85, 247, 0.7)"
                            strokeWidth="3"
                            strokeDasharray="10,10"
                          />
                        )}
                        
                        {/* Region Labels */}
                        <text x="250" y="250" className="text-sm font-bold" fill="#555" textAnchor="middle">North Africa</text>
                        <text x="140" y="400" className="text-sm font-bold" fill="#555" textAnchor="middle">West Africa</text>
                        <text x="180" y="550" className="text-sm font-bold" fill="#555" textAnchor="middle">Central Africa</text>
                        <text x="400" y="300" className="text-sm font-bold" fill="#555" textAnchor="middle">East Africa</text>
                        <text x="350" y="600" className="text-sm font-bold" fill="#555" textAnchor="middle">Southern Africa</text>
                      </svg>
                      
                      {/* Region markers with VC counts */}
                      {regionNames.map((region) => {
                        // Position markers on the map
                        let position = { top: "50%", left: "50%" };
                        
                        if (region === "North Africa") position = { top: "25%", left: "35%" };
                        if (region === "West Africa") position = { top: "42%", left: "22%" };
                        if (region === "Central Africa") position = { top: "55%", left: "35%" };
                        if (region === "East Africa") position = { top: "40%", left: "55%" };
                        if (region === "Southern Africa") position = { top: "70%", left: "40%" };
                        if (region === "Pan-African") position = { top: "35%", left: "40%" };
                        
                        const isSelected = region === selectedRegion;
                        const color = getRegionColor(region);
                        
                        return (
                          <div 
                            key={region} 
                            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${isSelected ? 'scale-125 z-10' : 'hover:scale-110'}`}
                            style={{ top: position.top, left: position.left }}
                            onClick={() => setSelectedRegion(region === selectedRegion ? null : region)}
                          >
                            <div className="flex flex-col items-center cursor-pointer">
                              <div className={`w-14 h-14 rounded-full ${color} flex items-center justify-center text-white font-bold shadow-lg ${isSelected ? 'ring-4 ring-white' : ''}`}>
                                {regionCounts[region]}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="h-full">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-medium mb-4">VC Distribution by Region</h3>
                    
                    <div className="space-y-3">
                      {regionNames.map((region) => (
                        <div 
                          key={region} 
                          className={`p-3 rounded-md cursor-pointer transition-colors ${selectedRegion === region ? 'bg-africa-blue text-white' : 'hover:bg-gray-50'}`}
                          onClick={() => setSelectedRegion(region === selectedRegion ? null : region)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className={`w-3 h-3 rounded-full ${getRegionColor(region)} mr-2`}></div>
                              <span className="font-medium">{region}</span>
                            </div>
                            <Badge variant={selectedRegion === region ? "secondary" : "outline"}>
                              {regionCounts[region]} VCs
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {selectedRegion && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-africa-blue mb-4">
                  VCs in {selectedRegion} <Badge className="ml-2">{regionalVCs.length}</Badge>
                </h2>
                
                {regionalVCs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regionalVCs.slice(0, 6).map((vc) => (
                      <VCCard key={vc.id} vc={vc} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No VC firms found for this region</p>
                  </div>
                )}
                
                {regionalVCs.length > 6 && (
                  <div className="mt-6 text-center">
                    <Link 
                      to={`/directory?region=${encodeURIComponent(selectedRegion)}`}
                      className="text-africa-blue hover:underline"
                    >
                      View all {regionalVCs.length} VC firms in {selectedRegion}
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RegionsPage;
