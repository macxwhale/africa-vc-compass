
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
  Globe,
  BriefcaseBusiness,
  LineChart,
  Handshake,
  Target,
  Lightbulb,
  Building
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Methodologies = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-africa-blue text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Research Methodologies</h1>
            <p className="text-xl max-w-3xl mx-auto">
              The systematic approach used to identify, analyze, and evaluate venture capital firms 
              investing in African startups, with comprehensive investment pattern analysis.
            </p>
          </div>
        </div>
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-4">Our Research Approach</h2>
                <p className="text-lg text-gray-700 mb-4">
                  The Africa VC Compass employs a rigorous, multi-faceted research methodology to identify, 
                  catalog, and evaluate venture capital firms actively investing in African startups.
                </p>
                <p className="text-lg text-gray-700">
                  Our approach combines quantitative data analysis with qualitative assessments, 
                  focusing on investment patterns, sector preferences, and geographical focus
                  within the African startup ecosystem.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div className="bg-gray-100 p-6 rounded-lg">
                  <Search className="h-32 w-32 text-africa-blue mx-auto mb-4" />
                  <p className="text-center text-gray-700 font-medium">
                    Comprehensive research methods for African VC investment landscape
                  </p>
                </div>
              </div>
            </div>
            
            <Tabs defaultValue="data-collection" className="mb-12">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
                <TabsTrigger value="data-collection">Data Collection</TabsTrigger>
                <TabsTrigger value="analysis-frameworks">Analysis Frameworks</TabsTrigger>
                <TabsTrigger value="validation-methods">Validation Methods</TabsTrigger>
              </TabsList>
              
              <TabsContent value="data-collection" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <Database className="h-10 w-10 text-africa-blue mb-2" />
                      <CardTitle>Primary Research</CardTitle>
                      <CardDescription>Direct data sources</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">
                        We conducted interviews with VC firm partners, fund managers, and executives. This includes 
                        detailed questionnaires about investment criteria, portfolio structure, and fund deployment strategies.
                        Analysis of annual reports, portfolio announcements, and direct engagement with funded startups
                        provided key insights into actual investment patterns.
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
                        We systematically reviewed industry reports from organizations like AVCA, Partech Africa, 
                        and Disrupt Africa. Academic studies, public databases, press releases, 
                        funding announcements, and regulatory filings were thoroughly analyzed. 
                        Cross-validation of data points across multiple sources ensured accuracy.
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
                        We mapped connections between VCs, startups, accelerators, and other ecosystem players,
                        identifying co-investment patterns, sector specialization trends, and regional investment flows.
                        This allowed for understanding the structure of VC networks and how capital flows
                        through the African startup ecosystem.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="analysis-frameworks" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <BriefcaseBusiness className="h-10 w-10 text-africa-blue mb-2" />
                      <CardTitle>Investment Pattern Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">
                        We tracked deal flow, investment stages (seed, Series A, B, etc.), ticket sizes, and
                        follow-on investment patterns. This included analyzing investment frequency,
                        portfolio construction strategies, and changes in investment focus over time.
                        Special attention was paid to changes in investment theses and adaptation to market conditions.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <LineChart className="h-10 w-10 text-africa-blue mb-2" />
                      <CardTitle>Sector/Vertical Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">
                        We classified investments by industry vertical (fintech, healthtech, agritech, etc.)
                        and conducted comparative analysis across sectors. This included tracking
                        emerging sector trends, investment concentration, and identifying underserved 
                        sectors with growth potential. Sector-specific return profiles were also evaluated.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <Target className="h-10 w-10 text-africa-blue mb-2" />
                      <CardTitle>Geographic Focus Evaluation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">
                        We mapped investment distribution across African regions and countries,
                        identifying investment hotspots and emerging markets. Analysis included
                        comparing investment allocation across different markets,
                        country-specific investment barriers, and strategic geographic positioning
                        of VC firms across the continent.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="validation-methods" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <Handshake className="h-10 w-10 text-africa-blue mb-2" />
                      <CardTitle>Stakeholder Validation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">
                        We conducted validation interviews with ecosystem stakeholders including
                        entrepreneurs, industry experts, and policy makers. This helped verify
                        findings, identify blind spots, and incorporate diverse perspectives.
                        Feedback sessions with VC representatives ensured accurate representation
                        of investment strategies and priorities.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <Building className="h-10 w-10 text-africa-blue mb-2" />
                      <CardTitle>Portfolio Performance Assessment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">
                        We analyzed portfolio company performance metrics where available, including
                        growth rates, follow-on funding success, market traction, and exits.
                        This provided insights into the effectiveness of various VC investment
                        strategies and their actual market outcomes. Success patterns across
                        different investment approaches were identified.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <Lightbulb className="h-10 w-10 text-africa-blue mb-2" />
                      <CardTitle>Comparative Benchmarking</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">
                        We compared African VC investment patterns with global benchmarks and
                        other emerging markets. This contextualized findings within broader
                        venture capital trends and highlighted unique aspects of the African
                        VC landscape. Comparative analysis included investment terms, 
                        return expectations, and fund structures.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
            
            <Separator className="my-12" />
            
            <h2 className="text-3xl font-bold mb-8 text-center">Investor Evaluation Criteria</h2>
            
            <div className="bg-gray-50 rounded-lg p-8 mb-12">
              <h3 className="text-2xl font-bold mb-6 text-center">VC Firm Assessment Framework</h3>
              
              <Table className="mb-6">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/3">Criterion</TableHead>
                    <TableHead className="w-2/3">Assessment Methodology</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Fund Structure & Size</TableCell>
                    <TableCell>
                      Analysis of fund capitalization, investment period, fund lifecycle stage,
                      LP composition, and committed capital vs. deployed capital ratios
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Investment Thesis</TableCell>
                    <TableCell>
                      Documentation of stated vs. actual investment focus, stage preferences,
                      sector specialization, and evolution of investment strategy over time
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Portfolio Construction</TableCell>
                    <TableCell>
                      Evaluation of portfolio diversity, investment concentration, 
                      follow-on strategy, check size distribution, and reserve allocation practices
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Value Addition</TableCell>
                    <TableCell>
                      Assessment of operational support, network access, strategic guidance,
                      follow-on fundraising assistance, and other non-financial contributions
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Track Record & Team</TableCell>
                    <TableCell>
                      Analysis of historical returns, successful exits, failed investments,
                      team experience, local presence, sector expertise, and team diversity
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            <Separator className="my-12" />
            
            <h2 className="text-3xl font-bold mb-8">Core Investment Research Approaches</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardHeader>
                  <Microscope className="h-10 w-10 text-africa-blue mb-2" />
                  <CardTitle>Due Diligence Practices</CardTitle>
                  <CardDescription>VC investment assessment</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    We studied how VCs conduct technological, market, financial, and legal due diligence
                    on potential investments. This included evaluation of proprietary deal flow channels,
                    screening criteria, and decision-making processes. Special attention was paid to
                    Africa-specific due diligence challenges and adaptations.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <Users className="h-10 w-10 text-africa-blue mb-2" />
                  <CardTitle>Founder Assessment</CardTitle>
                  <CardDescription>Evaluating entrepreneur potential</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    We analyzed how VCs evaluate founding teams, including experience assessment methods,
                    background verification approaches, and criteria for determining team capability.
                    This included studying the importance placed on local market knowledge,
                    previous entrepreneurial experience, and team composition diversity.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <BarChart4 className="h-10 w-10 text-africa-blue mb-2" />
                  <CardTitle>Market Opportunity Analysis</CardTitle>
                  <CardDescription>Understanding market validation</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    We explored methodologies used by VCs to determine market size, growth potential,
                    competitive landscape, and entry barriers for African startups. This included
                    analysis of tools and frameworks used for market sizing in emerging economies
                    with limited data availability and high market uncertainty.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Separator className="my-12" />
            
            <h2 className="text-3xl font-bold mb-8">Specialized Research Methodologies</h2>
            
            <Accordion type="single" collapsible className="w-full mb-12">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-xl font-medium">
                  Investment Performance Measurement
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  <p className="mb-4">
                    We analyzed how African VCs measure investment performance across multiple dimensions:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Financial return metrics (IRR, MOIC, DPI, TVPI) interpretation and benchmarking</li>
                    <li>Exit mechanism analysis including M&A activity, secondary sales, and IPO readiness</li>
                    <li>Comparative performance analysis against global and regional benchmarks</li>
                    <li>Portfolio company growth metrics beyond pure financial returns</li>
                    <li>Methodology adaptations for measuring returns in volatile emerging markets</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-xl font-medium">
                  Risk Assessment Frameworks
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  <p className="mb-4">
                    We documented approaches to evaluating and mitigating investment risks:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Currency risk management strategies specific to African markets</li>
                    <li>Political and regulatory risk assessment methodologies</li>
                    <li>Market risk analysis in nascent and rapidly evolving sectors</li>
                    <li>Execution risk evaluation for early-stage ventures</li>
                    <li>Liquidity risk considerations and exit planning in limited-liquidity markets</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-xl font-medium">
                  Deal Structure Analysis
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  <p className="mb-4">
                    We researched investment terms and structures used in African venture deals:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Equity structures, valuations, and term sheet provisions commonly used</li>
                    <li>Convertible instrument design and implementation (SAFE, convertible notes)</li>
                    <li>Investor protection mechanisms and their adaptation to local contexts</li>
                    <li>Alternative financing structures including revenue-based financing</li>
                    <li>Cross-border investment structures and regulatory compliance frameworks</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-xl font-medium">
                  Portfolio Management Practices
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  <p className="mb-4">
                    We analyzed post-investment management approaches:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Board representation practices and governance approaches</li>
                    <li>Strategic support frameworks and operational assistance methodologies</li>
                    <li>Monitoring systems and reporting requirements</li>
                    <li>Follow-on investment decision frameworks</li>
                    <li>Portfolio company milestone development and progress tracking</li>
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
                  <h3 className="text-2xl font-bold mb-3">Emerging Market VC Research Challenges</h3>
                  <p className="text-gray-700 mb-4">
                    Researching VC activities in African markets presents unique methodological 
                    challenges including limited data availability, non-standardized reporting, 
                    private transaction details, and rapidly evolving ecosystems.
                  </p>
                  <p className="text-gray-700">
                    Our research approach addresses these challenges through multi-source 
                    triangulation, primary data collection, local ecosystem engagement, 
                    and continuous database updating to ensure comprehensive and accurate 
                    representation of the African VC landscape.
                  </p>
                </div>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold mb-6 text-center">Research Documentation & Reporting</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <FileText className="h-10 w-10 text-africa-blue mb-2" />
                  <CardTitle>Documentation Standards</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Our research documentation includes:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Comprehensive VC firm profiles with standardized information architecture</li>
                    <li>Investment activity timelines and detailed deal histories</li>
                    <li>Source attribution and verification notes</li>
                    <li>Methodological limitations and data confidence assessments</li>
                    <li>Periodic data validation and update logs</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <TrendingUp className="h-10 w-10 text-africa-blue mb-2" />
                  <CardTitle>Trend Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Our approach to identifying and analyzing investment trends includes:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Longitudinal tracking of investment patterns over time</li>
                    <li>Cross-regional comparative analysis</li>
                    <li>Sector-specific investment flow tracking</li>
                    <li>New investor entry and exit pattern documentation</li>
                    <li>Correlation analysis between investment trends and ecosystem developments</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-center">Research Quality Standards</h3>
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
                      Comprehensive investigation of investment strategies, portfolio construction, and value-add approaches
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
                      Regular updates to reflect new investments, fund announcements, and market developments
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
