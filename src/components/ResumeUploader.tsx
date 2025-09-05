import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ResumeAnalysis } from "@/types/resume";
import { mockResumeAnalysis } from "@/utils/mockData";

interface ResumeUploaderProps {
  onAnalysisComplete: (analysis: ResumeAnalysis) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (analyzing: boolean) => void;
}

const ResumeUploader = ({ onAnalysisComplete, isAnalyzing, setIsAnalyzing }: ResumeUploaderProps) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file only.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setUploadProgress(0);

    // Simulate upload and analysis progress
    const intervals = [20, 40, 60, 80, 95];
    for (let i = 0; i < intervals.length; i++) {
      setTimeout(() => {
        setUploadProgress(intervals[i]);
      }, (i + 1) * 500);
    }

    // Simulate analysis completion
    setTimeout(() => {
      const analysis = mockResumeAnalysis(file.name);
      
      // Save to localStorage for history
      const existingAnalyses = JSON.parse(localStorage.getItem("resumeAnalyses") || "[]");
      existingAnalyses.unshift(analysis);
      localStorage.setItem("resumeAnalyses", JSON.stringify(existingAnalyses));
      
      setUploadProgress(100);
      onAnalysisComplete(analysis);
      
      toast({
        title: "Analysis Complete!",
        description: "Your resume has been successfully analyzed.",
      });
    }, 3000);

  }, [onAnalysisComplete, setIsAnalyzing, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"]
    },
    maxFiles: 1,
    disabled: isAnalyzing
  });

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer
          ${isDragActive 
            ? "border-primary bg-primary/5 shadow-strong" 
            : "border-muted-foreground/25 hover:border-primary/50 hover:bg-accent/30"
          }
          ${isAnalyzing ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center gap-4">
          {isAnalyzing ? (
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-primary/10 rounded-full animate-pulse">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-lg font-medium">Analyzing your resume...</p>
                <p className="text-sm text-muted-foreground">
                  Our AI is extracting information and generating insights
                </p>
                <div className="w-full max-w-xs mx-auto">
                  <Progress value={uploadProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">{uploadProgress}% complete</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="p-4 bg-gradient-primary rounded-full shadow-medium">
                <Upload className="h-8 w-8 text-white" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-medium">
                  {isDragActive ? "Drop your resume here" : "Upload your resume"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Drag & drop your PDF file here, or click to browse
                </p>
              </div>
              <Button variant="outline" className="mt-4">
                Choose File
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <CheckCircle className="h-4 w-4 text-success" />
          PDF files only
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <CheckCircle className="h-4 w-4 text-success" />
          Max 10MB file size
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <AlertCircle className="h-4 w-4 text-warning" />
          Secure & private
        </div>
      </div>
    </div>
  );
};

export default ResumeUploader;