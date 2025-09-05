import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User, Mail, Phone, Linkedin, Globe, GraduationCap, 
  Briefcase, Code, Heart, Award, Target, TrendingUp 
} from "lucide-react";
import { ResumeAnalysis } from "@/types/resume";

interface ResumeDetailsProps {
  analysis: ResumeAnalysis;
}

const ResumeDetails = ({ analysis }: ResumeDetailsProps) => {
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Personal Information */}
      <Card className="lg:col-span-1 shadow-medium bg-gradient-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="h-5 w-5 text-primary" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {analysis.name && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{analysis.name}</span>
            </div>
          )}
          {analysis.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{analysis.email}</span>
            </div>
          )}
          {analysis.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{analysis.phone}</span>
            </div>
          )}
          {analysis.linkedin_url && (
            <div className="flex items-center gap-2">
              <Linkedin className="h-4 w-4 text-muted-foreground" />
              <a href={analysis.linkedin_url} target="_blank" rel="noopener noreferrer" 
                 className="text-sm text-primary hover:underline">LinkedIn Profile</a>
            </div>
          )}
          {analysis.portfolio_url && (
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <a href={analysis.portfolio_url} target="_blank" rel="noopener noreferrer" 
                 className="text-sm text-primary hover:underline">Portfolio</a>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resume Rating & AI Analysis */}
      <Card className="lg:col-span-2 shadow-medium bg-gradient-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="h-5 w-5 text-primary" />
            AI Analysis & Rating
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getRatingColor(analysis.resume_rating)}`}>
                {analysis.resume_rating}/10
              </div>
              <Badge variant={getRatingBadgeVariant(analysis.resume_rating)} className="mt-2">
                Overall Score
              </Badge>
            </div>
            <div className="flex-1">
              <h4 className="font-medium mb-2">Areas for Improvement</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {analysis.improvement_areas}
              </p>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Upskilling Suggestions
            </h4>
            <div className="flex flex-wrap gap-2">
              {analysis.upskill_suggestions.map((suggestion, index) => (
                <Badge key={index} variant="outline" className="bg-primary/5">
                  {suggestion}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professional Summary */}
      {analysis.summary && (
        <Card className="lg:col-span-3 shadow-medium bg-gradient-card border-0">
          <CardHeader>
            <CardTitle className="text-lg">Professional Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{analysis.summary}</p>
          </CardContent>
        </Card>
      )}

      {/* Work Experience */}
      {analysis.work_experience.length > 0 && (
        <Card className="lg:col-span-2 shadow-medium bg-gradient-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Briefcase className="h-5 w-5 text-primary" />
              Work Experience
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analysis.work_experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-primary/20 pl-4 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <h4 className="font-medium">{exp.role}</h4>
                  <Badge variant="outline">{exp.duration}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{exp.company}</p>
                <ul className="text-sm space-y-1">
                  {exp.description.map((desc, idx) => (
                    <li key={idx} className="text-muted-foreground">• {desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Education */}
      {analysis.education.length > 0 && (
        <Card className="lg:col-span-1 shadow-medium bg-gradient-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <GraduationCap className="h-5 w-5 text-primary" />
              Education
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {analysis.education.map((edu, index) => (
              <div key={index} className="space-y-1">
                <h4 className="font-medium text-sm">{edu.degree}</h4>
                <p className="text-sm text-muted-foreground">{edu.institution}</p>
                <Badge variant="outline" className="text-xs">{edu.graduation_year}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Skills */}
      <Card className="lg:col-span-2 shadow-medium bg-gradient-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Code className="h-5 w-5 text-primary" />
            Skills
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {analysis.technical_skills.length > 0 && (
            <div>
              <h4 className="font-medium mb-2 text-sm">Technical Skills</h4>
              <div className="flex flex-wrap gap-2">
                {analysis.technical_skills.map((skill, index) => (
                  <Badge key={index} className="bg-primary/10 text-primary border-primary/20">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {analysis.soft_skills.length > 0 && (
            <div>
              <h4 className="font-medium mb-2 text-sm flex items-center gap-1">
                <Heart className="h-3 w-3" />
                Soft Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysis.soft_skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-accent/50">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Projects & Certifications */}
      <Card className="lg:col-span-1 shadow-medium bg-gradient-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Award className="h-5 w-5 text-primary" />
            Additional Info
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {analysis.projects.length > 0 && (
            <div>
              <h4 className="font-medium mb-2 text-sm">Projects</h4>
              <div className="space-y-2">
                {analysis.projects.map((project, index) => (
                  <div key={index} className="text-sm">
                    <p className="font-medium">{project.name}</p>
                    <p className="text-muted-foreground text-xs">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {analysis.certifications.length > 0 && (
            <div>
              <h4 className="font-medium mb-2 text-sm">Certifications</h4>
              <div className="space-y-1">
                {analysis.certifications.map((cert, index) => (
                  <Badge key={index} variant="outline" className="text-xs w-full justify-start">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeDetails;