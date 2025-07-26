import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Cloud, 
  Brain, 
  Code, 
  Sparkles, 
  Github, 
  Linkedin, 
  Mail,
  GraduationCap,
  Lightbulb,
  Zap,
  Heart,
  Star,
  Rocket
} from "lucide-react";

export default function About() {
  const technologies = [
    "React", "TypeScript", "Node.js", "Express", "Tailwind CSS",
    "OpenAI API", "Anthropic Claude", "Google Gemini", "Drizzle ORM",
    "PostgreSQL", "Vite", "shadcn/ui"
  ];

  const features = [
    {
      icon: Brain,
      title: "Multi-AI Integration",
      description: "Support for 15+ AI models from major providers"
    },
    {
      icon: Sparkles,
      title: "Real-time Generation",
      description: "Instant UI creation with live preview"
    },
    {
      icon: Code,
      title: "Clean Code Output",
      description: "Production-ready HTML with Tailwind CSS"
    },
    {
      icon: Zap,
      title: "Professional Templates",
      description: "Curated gallery of modern design patterns"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Meet the Creator
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Built by a passionate cloud engineer and AI enthusiast who believes in making 
            powerful technology accessible to everyone.
          </p>
        </div>

        {/* Creator Profile */}
        <Card className="glass border-slate-600/30 mb-8">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-50 mb-2">Abdirahman Ahmed</h2>
                <div className="flex items-center space-x-2 mb-4">
                  <Cloud className="w-5 h-5 text-blue-400" />
                  <span className="text-slate-300">Cloud Engineer</span>
                  <span className="text-slate-500">•</span>
                  <GraduationCap className="w-5 h-5 text-green-400" />
                  <span className="text-slate-300">ML/AI Student</span>
                </div>
                <p className="text-slate-400 leading-relaxed mb-6">
                  As a cloud engineer with a deep passion for machine learning and artificial intelligence, 
                  I created this application to bridge the gap between powerful AI capabilities and 
                  practical web development. My vision was to democratize UI design by making 
                  professional-quality interfaces accessible through natural language.
                </p>
                <div className="flex space-x-3">
                  <Button variant="outline" className="glass border-slate-600/50">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                  <Button variant="outline" className="glass border-slate-600/50">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                  <Button variant="outline" className="glass border-slate-600/50">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="glass border-slate-600/30 p-4 rounded-lg">
                  <h3 className="text-slate-50 font-medium mb-2 flex items-center">
                    <Cloud className="w-4 h-4 mr-2 text-blue-400" />
                    Cloud Engineering
                  </h3>
                  <p className="text-sm text-slate-400">
                    Specializing in scalable cloud infrastructure, microservices architecture, 
                    and DevOps practices across AWS, Azure, and GCP platforms.
                  </p>
                </div>
                
                <div className="glass border-slate-600/30 p-4 rounded-lg">
                  <h3 className="text-slate-50 font-medium mb-2 flex items-center">
                    <Brain className="w-4 h-4 mr-2 text-purple-400" />
                    ML/AI Studies
                  </h3>
                  <p className="text-sm text-slate-400">
                    Currently pursuing advanced studies in machine learning and artificial intelligence, 
                    with focus on NLP, computer vision, and LLM applications.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* The Vision */}
        <Card className="glass border-slate-600/30 mb-8">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <Lightbulb className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-50 mb-2">The Vision Behind AI UI Designer</h2>
              <p className="text-slate-400">From idea to implementation - the story of this app</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-slate-50 font-medium mb-2">The Problem</h3>
                <p className="text-sm text-slate-400">
                  UI design requires specialized skills and tools that create barriers for developers 
                  and entrepreneurs with great ideas but limited design experience.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-slate-50 font-medium mb-2">The Solution</h3>
                <p className="text-sm text-slate-400">
                  Harness the power of advanced AI models to transform natural language descriptions 
                  into professional, responsive web interfaces instantly.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Rocket className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-slate-50 font-medium mb-2">The Impact</h3>
                <p className="text-sm text-slate-400">
                  Democratize web design by making professional UI creation accessible to anyone, 
                  regardless of their technical design background.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Features */}
        <Card className="glass border-slate-600/30 mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-slate-50 mb-6 text-center">What Makes This App Special</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-slate-50 font-medium mb-1">{feature.title}</h3>
                    <p className="text-sm text-slate-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tech Stack */}
        <Card className="glass border-slate-600/30 mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-slate-50 mb-6 text-center flex items-center justify-center">
              <Code className="w-6 h-6 mr-2" />
              Built With Modern Technology
            </h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="bg-slate-700/50 text-slate-300 border-slate-600/50 px-3 py-1"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Community & Growth */}
        <Card className="glass border-slate-600/30">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-50 mb-2">Join the Growing Community</h2>
              <p className="text-slate-400">
                Built with love for developers, designers, and entrepreneurs worldwide.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">30+</div>
                <div className="text-sm text-slate-400">Developers Building</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">150+</div>
                <div className="text-sm text-slate-400">UI Components Generated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">2.8k</div>
                <div className="text-sm text-slate-400">Total Views</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-slate-300">
                "This project represents my commitment to making AI accessible and practical for real-world applications. 
                Every feature is designed with the user experience in mind, from the intuitive interface to the 
                comprehensive API documentation."
              </p>
              <p className="text-slate-400 italic">
                - Abdirahman Ahmed, Creator
              </p>
            </div>
            
            <div className="mt-8">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8">
                <Star className="w-4 h-4 mr-2" />
                Start Building Your UI
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}