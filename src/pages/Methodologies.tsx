
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Book, 
  Microscope, 
  Users, 
  BarChart4, 
  FileText, 
  CircleDollarSign, 
  TrendingUp,
  Search,
  Database,
  PieChart,
  BadgeCheck,
  Scale,
  Globe
} from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Methodologies = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-africa-blue text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Research Methodologies</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Understanding how we research venture capital firms that offer grants to startups,
              with comprehensive evaluation frameworks and impact assessment techniques.
            </p>
          </div>
        </div>
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-4">My Research Approach</h2>
                <p className="text-lg text-gray-700 mb-4">
                  The Africa VC Compass employs a rigorous, multi-faceted research methodology to identify, 
                  catalog, and evaluate venture capital firms that offer grants to African startups.
                </p>
                <p className="text-lg text-gray-700">
                  Our approach combines quantitative data analysis with qualitative assessments, 
                  focusing particularly on grant-giving VCs that prioritize social impact alongside 
                  financial returns in the African innovation ecosystem.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div className="bg-gray-100 p-6 rounded-lg">
                  <Search className="h-32 w-32 text-africa-blue mx-auto mb-4" />
                  <p className="text-center text-gray-700 font-medium">
                    Comprehensive research methods for grant-giving VCs
                  </p>
                </div>
              </div>
            </div>
            
            <Separator className="my-12" />
            
            <h2 className="text-3xl font-bold mb-8 text-center">Data Collection Methodologies</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardHeader>
                  <Database className="h-10 w-10 text-africa-blue mb-2" />
                  <CardTitle>Primary Research</CardTitle>
                  <CardDescription>Direct data sources</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    We conduct interviews with VC firm partners and executives, focusing on 
                    grant-giving organizations. This includes questionnaires sent to firms,
                    analysis of annual reports, and direct engagement with portfolio companies.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <PieChart className="h-10 w-10 text-africa-blue mb-2" />
                  <CardTitle>Secondary Analysis</CardTitle>
                  <CardDescription>Existing data utilization</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    We systematically review industry reports, academic studies, public databases,
                    news coverage, and regulatory filings to gather data on grant-focused VCs.
                    Cross-validation ensures accuracy of information collected.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <Globe className="h-10 w-10 text-africa-blue mb-2" />
                  <CardTitle>Ecosystem Mapping</CardTitle>
                  <CardDescription>Network relationship analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    We map connections between VCs, startups, accelerators, and other ecosystem players,
                    particularly identifying the flow of grant capital and non-financial support to
                    startups across the African continent.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-8 mb-12">
              <h3 className="text-2xl font-bold mb-6 text-center">Grant-Specific Evaluation Criteria</h3>
              
              <Table className="mb-6">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/3">Criterion</TableHead>
                    <TableHead className="w-2/3">Assessment Methodology</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Impact Measurement</TableCell>
                    <TableCell>
                      Analysis of KPIs used by VCs to measure social/environmental impact;
                      alignment with SDGs; community benefit assessment methodologies
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Grant Requirements</TableCell>
                    <TableCell>
                      Documentation of eligibility criteria, application processes,
                      reporting requirements, and conditionality factors
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Technical Assistance</TableCell>
                    <TableCell>
                      Evaluation of non-financial support mechanisms offered alongside grants;
                      mentorship quality; operational support infrastructure
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Geographic Focus</TableCell>
                    <TableCell>
                      Mapping of regional priorities and concentration of grant funding;
                      urban vs. rural distribution; cross-border capabilities
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Ecosystem Development</TableCell>
                    <TableCell>
                      Assessment of VC contributions to broader ecosystem building;
                      policy influence; knowledge sharing practices
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            <Separator className="my-12" />
            
            <h2 className="text-3xl font-bold mb-8">Core Research Approaches</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardHeader>
                  <Microscope className="h-10 w-10 text-africa-blue mb-2" />
                  <CardTitle>Due Diligence</CardTitle>
                  <CardDescription>Comprehensive assessment of startups</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    In-depth investigation into a company's business model, market potential, 
                    team capabilities, financial health, and legal standing before investment.
                    Grant-focused VCs also evaluate alignment with impact objectives.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <Users className="h-10 w-10 text-africa-blue mb-2" />
                  <CardTitle>Team Evaluation</CardTitle>
                  <CardDescription>Assessing founder potential</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Analysis of the founding team's experience, domain expertise, track record, 
                    adaptability, and leadership capabilities. Grant-providing VCs often look for 
                    mission-driven leadership and values alignment.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <BarChart4 className="h-10 w-10 text-africa-blue mb-2" />
                  <CardTitle>Market Analysis</CardTitle>
                  <CardDescription>Understanding market dynamics</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Evaluation of market size, growth potential, competitive landscape, and 
                    adoption barriers. Grant-oriented investors particularly assess potential for 
                    system-level change and social impact alongside market variables.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Separator className="my-12" />
            
            <h2 className="text-3xl font-bold mb-8">Grant-Specific Research Methodologies</h2>
            
            <Accordion type="single" collapsible className="w-full mb-12">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-xl font-medium">
                  Impact Assessment Frameworks
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  <p className="mb-4">
                    Grant-giving VCs utilize specialized frameworks to measure potential social, 
                    environmental, and economic impacts of startups. These typically include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Theory of Change models that map how innovations lead to desired outcomes</li>
                    <li>Impact measurement metrics tailored to specific sectors and challenges</li>
                    <li>Alignment assessment with sustainable development goals (SDGs)</li>
                    <li>Scalability analysis of impact potential</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-xl font-medium">
                  Innovation Evaluation Criteria
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  <p className="mb-4">
                    Grant-focused VCs assess innovation across multiple dimensions:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Novelty and differentiation from existing solutions</li>
                    <li>Appropriateness for target communities or problems</li>
                    <li>Technical feasibility and implementation readiness</li>
                    <li>Potential for catalyzing broader ecosystem innovation</li>
                    <li>Capacity to address root causes rather than symptoms</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-xl font-medium">
                  Community-Based Research
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  <p className="mb-4">
                    Many grant-giving VCs incorporate community perspectives through:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Participatory evaluation involving stakeholders from target communities</li>
                    <li>Local advisory panels to assess relevance and potential uptake</li>
                    <li>Field visits and contextual immersion</li>
                    <li>User testing and feedback incorporation</li>
                    <li>Community partnership assessment</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-xl font-medium">
                  Sustainability Frameworks
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  <p className="mb-4">
                    Methodologies to evaluate long-term sustainability of grant-funded ventures:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Financial sustainability models beyond grant funding</li>
                    <li>Resource efficiency and environmental impact assessment</li>
                    <li>Governance structure evaluation for long-term viability</li>
                    <li>Technology transfer and knowledge sharing capabilities</li>
                    <li>Exit strategy analysis for grant providers</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="bg-gray-50 rounded-lg p-8 mb-12">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-1/3 flex justify-center">
                  <CircleDollarSign className="h-24 w-24 text-africa-gold" />
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold mb-3">Grant vs. Equity Investment Research</h3>
                  <p className="text-gray-700 mb-4">
                    While traditional equity investments focus primarily on financial returns, 
                    grant-giving VCs balance financial sustainability with impact metrics. Their 
                    research methodologies incorporate both dimensions, with greater emphasis on 
                    long-term societal benefits, ecosystem strengthening, and innovation diffusion.
                  </p>
                  <p className="text-gray-700">
                    Grant-oriented research often takes a more collaborative approach, involving 
                    multiple stakeholders and considering broader ecosystem effects beyond 
                    individual company performance.
                  </p>
                </div>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold mb-6 text-center">Documentation & Reporting</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <FileText className="h-10 w-10 text-africa-blue mb-2" />
                  <CardTitle>Research Documentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Grant-giving VCs maintain comprehensive documentation on their research methods 
                    and findings, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Due diligence reports with impact-oriented metrics</li>
                    <li>Stakeholder interview transcripts and findings</li>
                    <li>Market and needs assessment data</li>
                    <li>Technical validation documentation</li>
                    <li>References to academic or field research supporting impact claims</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <TrendingUp className="h-10 w-10 text-africa-blue mb-2" />
                  <CardTitle>Impact Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Post-investment, grant-giving VCs employ ongoing measurement approaches:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Regular milestone reporting against impact targets</li>
                    <li>Longitudinal studies of beneficiary outcomes</li>
                    <li>Ecosystem influence assessment</li>
                    <li>Policy and practice change documentation</li>
                    <li>Knowledge sharing and learning reports</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-center">My Research Quality Standards</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-gray-50">
                  <CardHeader className="pb-2">
                    <BadgeCheck className="h-8 w-8 text-africa-blue mb-1" />
                    <CardTitle className="text-lg">Accuracy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">
                      Rigorous fact-checking and multiple source verification for all VC information
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-50">
                  <CardHeader className="pb-2">
                    <Scale className="h-8 w-8 text-africa-blue mb-1" />
                    <CardTitle className="text-lg">Objectivity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">
                      Balanced assessment criteria applied consistently across all firms
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-50">
                  <CardHeader className="pb-2">
                    <Microscope className="h-8 w-8 text-africa-blue mb-1" />
                    <CardTitle className="text-lg">Depth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">
                      Comprehensive investigation of grant mechanisms, impact philosophies, and support structures
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-50">
                  <CardHeader className="pb-2">
                    <Book className="h-8 w-8 text-africa-blue mb-1" />
                    <CardTitle className="text-lg">Currency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">
                      Regular updates to reflect changing priorities, new funds, and evolving grant strategies
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="text-center">
              <Button asChild size="lg" className="bg-africa-blue hover:bg-africa-blue/90">
                <Link to="/directory">Explore VC Firms</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Methodologies;
