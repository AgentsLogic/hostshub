import React from 'react'
import { Button } from "@/components/ui/button"
import { Briefcase, Code, BrainCircuit, BarChart } from "lucide-react"

const CareersPage = () => {
  const jobs = [
    {
      title: "AI Marketing Master",
      type: "Full-time",
      location: "Remote",
      description: "Lead our AI-driven marketing initiatives, leveraging machine learning to optimize campaigns and drive growth.",
      responsibilities: [
        "Develop and implement AI-powered marketing strategies",
        "Analyze customer data to personalize marketing efforts",
        "Optimize ad performance using predictive algorithms",
        "Collaborate with engineering to build marketing automation tools"
      ],
      requirements: [
        "5+ years marketing experience with 2+ years in AI/ML",
        "Expertise in data analysis and marketing analytics",
        "Experience with AI tools like ChatGPT, Midjourney, etc.",
        "Strong understanding of digital marketing channels"
      ],
      icon: "BarChart"
    },
    {
      title: "Full Stack Old School Coder",
      type: "Full-time", 
      location: "Remote",
      description: "Bridge the gap between traditional coding and AI, ensuring our systems remain robust while integrating AI capabilities.",
      responsibilities: [
        "Develop and maintain core application infrastructure",
        "Integrate AI APIs and services into existing systems",
        "Optimize performance of AI-enhanced features",
        "Mentor team on software engineering best practices"
      ],
      requirements: [
        "10+ years full stack development experience",
        "Expertise in JavaScript/TypeScript, Node.js, React",
        "Experience with AI/ML integration patterns",
        "Strong systems architecture knowledge",
        "Passion for both cutting-edge and proven technologies"
      ],
      icon: "Code"
    },
    {
      title: "AI Solutions Architect",
      type: "Full-time",
      location: "Remote",
      description: "Design and implement AI solutions that enhance our product offerings and internal operations.",
      responsibilities: [
        "Evaluate and select AI technologies for business needs",
        "Design scalable AI system architectures",
        "Prototype and test new AI features",
        "Collaborate across teams to implement AI solutions"
      ],
      requirements: [
        "7+ years software engineering experience",
        "3+ years working with AI/ML systems",
        "Strong knowledge of cloud AI services",
        "Experience with prompt engineering and fine-tuning",
        "Excellent problem-solving and communication skills"
      ],
      icon: "BrainCircuit"
    }
  ]

  return (
    <div className="container py-12 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Join Our AI-Powered Team</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're building the future of vacation rental technology with AI at the core. Come help us shape it.
          </p>
        </div>

        <div className="space-y-8">
          {jobs.map((job, index) => (
            <div key={index} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  {job.icon === "BarChart" && <BarChart className="h-6 w-6 text-primary" />}
                  {job.icon === "Code" && <Code className="h-6 w-6 text-primary" />}
                  {job.icon === "BrainCircuit" && <BrainCircuit className="h-6 w-6 text-primary" />}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <h2 className="text-2xl font-bold">{job.title}</h2>
                      <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                        <span>{job.type}</span>
                        <span>•</span>
                        <span>{job.location}</span>
                      </div>
                    </div>
                    <Button className="mt-2 md:mt-0">Apply Now</Button>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">About the Role</h3>
                    <p className="text-muted-foreground mb-4">{job.description}</p>
                    
                    <div className="grid gap-6 md:grid-cols-2 mt-6">
                      <div>
                        <h3 className="font-semibold mb-2">Responsibilities</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          {job.responsibilities.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span>•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Requirements</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          {job.requirements.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span>•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Don't See Your Dream Role?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We're always looking for talented individuals passionate about AI and hospitality tech.
            Send us your resume and tell us how you can contribute.
          </p>
          <Button variant="outline">Submit General Application</Button>
        </div>
      </div>
    </div>
  )
}
