import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, History, Brain, Target } from "lucide-react";
import ResumeUploader from "@/components/ResumeUploader";
import ResumeDetails from "@/components/ResumeDetails";
import PastResumesTable from "@/components/PastResumesTable";
import { ResumeAnalysis } from "@/types/resume";

const ResumeAnalyzer = () => {
  const [currentAnalysis, setCurrentAnalysis] = useState<ResumeAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalysisComplete = (analysis: ResumeAnalysis) => {
    setCurrentAnalysis(analysis);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50 shadow-soft">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-lg shadow-medium">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                Resume Analyzer
              </h1>
              <p className="text-muted-foreground text-sm">
                AI-powered resume analysis and improvement suggestions
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="analyze" className="w-full max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-card shadow-soft">
            <TabsTrigger value="analyze" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Resume Analysis
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              Historical Viewer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analyze" className="space-y-6">
            <Card className="shadow-medium bg-gradient-card border-0">
              <CardHeader className="text-center pb-2">
                <CardTitle className="flex items-center justify-center gap-2 text-xl">
                  <Target className="h-5 w-5 text-primary" />
                  Upload & Analyze Your Resume
                </CardTitle>
                <CardDescription>
                  Get AI-powered insights, ratings, and personalized improvement suggestions
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ResumeUploader 
                  onAnalysisComplete={handleAnalysisComplete}
                  isAnalyzing={isAnalyzing}
                  setIsAnalyzing={setIsAnalyzing}
                />
              </CardContent>
            </Card>

            {currentAnalysis && (
              <ResumeDetails analysis={currentAnalysis} />
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="shadow-medium bg-gradient-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5 text-primary" />
                  Analysis History
                </CardTitle>
                <CardDescription>
                  View and compare all your previous resume analyses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PastResumesTable />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ResumeAnalyzer;