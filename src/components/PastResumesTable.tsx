import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Calendar, FileText, Trash2 } from "lucide-react";
import { ResumeAnalysis } from "@/types/resume";
import ResumeDetails from "./ResumeDetails";
import { useToast } from "@/hooks/use-toast";

const PastResumesTable = () => {
  const [analyses, setAnalyses] = useState<ResumeAnalysis[]>([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState<ResumeAnalysis | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadAnalyses = () => {
      const stored = localStorage.getItem("resumeAnalyses");
      if (stored) {
        setAnalyses(JSON.parse(stored));
      }
    };
    loadAnalyses();
  }, []);

  const deleteAnalysis = (id: string) => {
    const updatedAnalyses = analyses.filter(analysis => analysis.id !== id);
    setAnalyses(updatedAnalyses);
    localStorage.setItem("resumeAnalyses", JSON.stringify(updatedAnalyses));
    
    toast({
      title: "Analysis deleted",
      description: "Resume analysis has been removed from history.",
    });
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return "text-success";
    if (rating >= 6) return "text-warning";
    return "text-destructive";
  };

  const getRatingBadgeVariant = (rating: number) => {
    if (rating >= 8) return "default";
    if (rating >= 6) return "secondary";
    return "destructive";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (analyses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <FileText className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">No analyses yet</h3>
        <p className="text-muted-foreground mb-4">
          Upload your first resume to start building your analysis history.
        </p>
        <Button variant="outline" onClick={() => window.location.hash = "#analyze"}>
          Upload Resume
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border shadow-soft bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File Name</TableHead>
              <TableHead>Candidate</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {analyses.map((analysis) => (
              <TableRow key={analysis.id} className="hover:bg-accent/50">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    {analysis.file_name}
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{analysis.name || "Unknown"}</div>
                    {analysis.email && (
                      <div className="text-sm text-muted-foreground">{analysis.email}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getRatingBadgeVariant(analysis.resume_rating)}>
                    <span className={getRatingColor(analysis.resume_rating)}>
                      {analysis.resume_rating}/10
                    </span>
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {formatDate(analysis.uploaded_at)}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedAnalysis(analysis)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            Analysis Details - {selectedAnalysis?.file_name}
                          </DialogTitle>
                        </DialogHeader>
                        {selectedAnalysis && (
                          <div className="mt-4">
                            <ResumeDetails analysis={selectedAnalysis} />
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteAnalysis(analysis.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="text-sm text-muted-foreground text-center">
        Showing {analyses.length} analysis{analyses.length !== 1 ? "es" : ""}
      </div>
    </div>
  );
};

export default PastResumesTable;