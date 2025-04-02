
import { Card, CardContent } from "@/components/ui/card";
import { useData } from "@/contexts/DataContext";
import { useEffect, useState } from "react";
import { regionCountriesMap } from "@/pages/RegionsPage";

const StatsHighlight = () => {
  const { vcFirms, regionItems, industryItems } = useData();
  const [stats, setStats] = useState({
    vcCount: "150+",
    countryCount: "40+",
    investment: "$4.8B",
    industryCount: "18+"
  });
  
  useEffect(() => {
    // Calculate real stats from the database data
    if (vcFirms && regionItems && industryItems) {
      // Count unique VCs
      const activeVcCount = vcFirms.length;
      
      // Count unique countries by extracting from regionCountriesMap
      // First collect all countries from all regions
      const allCountries = new Set<string>();
      regionItems.forEach(region => {
        const countries = regionCountriesMap[region.name as keyof typeof regionCountriesMap];
        if (countries) {
          countries.forEach(country => allCountries.add(country));
        }
      });
      const countriesCount = allCountries.size;
      
      // Count unique industries
      const industriesCount = industryItems.length;
      
      setStats({
        vcCount: activeVcCount > 0 ? `${activeVcCount}+` : "150+",
        countryCount: countriesCount > 0 ? `${countriesCount}+` : "40+",
        investment: "$4.8B", // This is a projection, so we keep it static
        industryCount: industriesCount > 0 ? `${industriesCount}+` : "18+"
      });
    }
  }, [vcFirms, regionItems, industryItems]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="text-africa-blue text-3xl font-bold">{stats.vcCount}</div>
          <div className="mt-2 text-sm text-gray-600">Active VC Firms</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="text-africa-green text-3xl font-bold">{stats.countryCount}</div>
          <div className="mt-2 text-sm text-gray-600">African Countries</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="text-africa-gold text-3xl font-bold">{stats.investment}</div>
          <div className="mt-2 text-sm text-gray-600">2025 Investment</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="text-africa-blue-light text-3xl font-bold">{stats.industryCount}</div>
          <div className="mt-2 text-sm text-gray-600">Industries Covered</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsHighlight;
