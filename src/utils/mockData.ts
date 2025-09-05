import { ResumeAnalysis } from "@/types/resume";

export const mockResumeAnalysis = (fileName: string): ResumeAnalysis => {
  const sampleData = {
    names: ["John Smith", "Sarah Johnson", "Michael Chen", "Emily Davis", "Alex Rodriguez"],
    emails: ["john.smith@email.com", "sarah.j@email.com", "mchen@email.com", "emily.davis@email.com", "alex.r@email.com"],
    phones: ["+1 (555) 123-4567", "+1 (555) 987-6543", "+1 (555) 456-7890", "+1 (555) 321-0987", "+1 (555) 654-3210"],
    linkedins: ["linkedin.com/in/johnsmith", "linkedin.com/in/sarahjohnson", "linkedin.com/in/michaelchen", "linkedin.com/in/emilydavis", "linkedin.com/in/alexrodriguez"],
    portfolios: ["johnsmith.dev", "sarahdesigns.com", "mchen-portfolio.com", "emilydavis.io", "alexdev.com"],
    
    summaries: [
      "Experienced software engineer with 5+ years in full-stack development, specializing in React and Node.js applications.",
      "Creative UX/UI designer with expertise in user-centered design and modern web technologies.",
      "Data scientist with strong background in machine learning and statistical analysis.",
      "Product manager with proven track record in agile methodologies and cross-functional team leadership.",
      "Marketing specialist focused on digital campaigns and brand strategy development."
    ],

    workExperience: [
      [
        {
          role: "Senior Software Engineer",
          company: "Tech Corp",
          duration: "2021 - Present",
          description: ["Led development of microservices architecture", "Mentored junior developers", "Improved system performance by 40%"]
        },
        {
          role: "Software Engineer",
          company: "StartupXYZ",
          duration: "2019 - 2021",
          description: ["Built responsive web applications", "Collaborated with design team", "Implemented CI/CD pipelines"]
        }
      ],
      [
        {
          role: "UX Designer",
          company: "Design Studio",
          duration: "2022 - Present",
          description: ["Created user-centered design solutions", "Conducted user research and testing", "Improved conversion rates by 25%"]
        }
      ]
    ],

    education: [
      [
        { degree: "Bachelor of Computer Science", institution: "Tech University", graduation_year: "2019" },
        { degree: "Master of Software Engineering", institution: "Advanced Tech Institute", graduation_year: "2021" }
      ],
      [
        { degree: "Bachelor of Design", institution: "Art Institute", graduation_year: "2020" }
      ]
    ],

    technicalSkills: [
      ["JavaScript", "React", "Node.js", "Python", "AWS", "PostgreSQL", "Docker"],
      ["Figma", "Adobe Creative Suite", "HTML/CSS", "JavaScript", "Prototyping", "User Research"],
      ["Python", "R", "TensorFlow", "SQL", "Tableau", "Machine Learning", "Statistics"],
      ["Jira", "Confluence", "Agile", "Scrum", "Product Strategy", "Data Analysis"],
      ["Google Analytics", "SEO", "Content Marketing", "Social Media", "A/B Testing"]
    ],

    softSkills: [
      ["Leadership", "Problem Solving", "Communication", "Team Collaboration"],
      ["Creativity", "Critical Thinking", "Attention to Detail", "Time Management"],
      ["Analytical Thinking", "Communication", "Project Management", "Adaptability"]
    ],

    projects: [
      [
        { name: "E-commerce Platform", description: "Full-stack web application with payment integration", technologies: ["React", "Node.js", "Stripe"] },
        { name: "Task Management App", description: "Real-time collaborative task manager", technologies: ["Vue.js", "Firebase", "WebSocket"] }
      ],
      [
        { name: "Mobile Banking App", description: "User interface design for financial services", technologies: ["Figma", "Principle", "User Testing"] }
      ]
    ],

    certifications: [
      ["AWS Certified Developer", "Google Cloud Professional", "Scrum Master Certified"],
      ["Adobe Certified Expert", "UX Design Certificate", "Google Analytics Certified"],
      ["TensorFlow Developer Certificate", "AWS Machine Learning Specialty"]
    ],

    improvementAreas: [
      "Consider adding more specific metrics and quantifiable achievements to work experience. Include relevant certifications and expand on leadership experience.",
      "Resume could benefit from more detailed project descriptions and technical implementations. Consider adding open-source contributions.",
      "Add more industry-specific keywords and consider reorganizing sections for better visual hierarchy. Include portfolio links.",
      "Strengthen the professional summary with more specific achievements. Add relevant technical skills section.",
      "Include more quantifiable results from marketing campaigns. Add relevant digital marketing certifications."
    ],

    upskillSuggestions: [
      ["Cloud Architecture", "DevOps", "System Design", "GraphQL", "Kubernetes"],
      ["Advanced React", "TypeScript", "Mobile Development", "API Design", "Testing"],
      ["Design Systems", "Motion Design", "Accessibility", "Frontend Development", "Product Strategy"],
      ["Data Analysis", "Business Intelligence", "Advanced Excel", "SQL", "Tableau"],
      ["Marketing Automation", "Data Analytics", "Content Strategy", "SEO Optimization", "Social Media Management"]
    ]
  };

  // Generate random data
  const randomIndex = Math.floor(Math.random() * sampleData.names.length);
  const rating = Math.floor(Math.random() * 4) + 6; // Rating between 6-10
  
  return {
    id: `resume_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    file_name: fileName,
    uploaded_at: new Date().toISOString(),
    name: sampleData.names[randomIndex],
    email: sampleData.emails[randomIndex],
    phone: sampleData.phones[randomIndex],
    linkedin_url: `https://${sampleData.linkedins[randomIndex]}`,
    portfolio_url: `https://${sampleData.portfolios[randomIndex]}`,
    summary: sampleData.summaries[randomIndex],
    work_experience: sampleData.workExperience[Math.floor(Math.random() * sampleData.workExperience.length)],
    education: sampleData.education[Math.floor(Math.random() * sampleData.education.length)],
    technical_skills: sampleData.technicalSkills[Math.floor(Math.random() * sampleData.technicalSkills.length)],
    soft_skills: sampleData.softSkills[Math.floor(Math.random() * sampleData.softSkills.length)],
    projects: sampleData.projects[Math.floor(Math.random() * sampleData.projects.length)],
    certifications: sampleData.certifications[Math.floor(Math.random() * sampleData.certifications.length)],
    resume_rating: rating,
    improvement_areas: sampleData.improvementAreas[Math.floor(Math.random() * sampleData.improvementAreas.length)],
    upskill_suggestions: sampleData.upskillSuggestions[Math.floor(Math.random() * sampleData.upskillSuggestions.length)]
  };
};