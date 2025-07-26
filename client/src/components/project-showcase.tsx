import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Heart, Eye, ExternalLink, Code, Sparkles, TrendingUp, Clock } from "lucide-react";

interface ShowcaseProject {
  id: string;
  title: string;
  description: string;
  category: string;
  preview: string;
  views: string;
  rating: number;
  tags: string[];
  featured: boolean;
  colors: string[];
}

const showcaseProjects: ShowcaseProject[] = [
  {
    id: "crypto-dashboard",
    title: "CryptoVision Dashboard",
    description: "Real-time cryptocurrency trading dashboard with advanced charts, portfolio tracking, and AI-powered market insights.",
    category: "Finance",
    preview: `
      <div class="bg-slate-900 p-4 rounded-lg">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-green-400 font-bold">₿ 67,340.82</h3>
          <span class="text-green-400">+2.4%</span>
        </div>
        <div class="h-16 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded flex items-end">
          <div class="w-2 h-8 bg-green-500 mx-1 rounded"></div>
          <div class="w-2 h-12 bg-green-400 mx-1 rounded"></div>
          <div class="w-2 h-6 bg-blue-500 mx-1 rounded"></div>
          <div class="w-2 h-14 bg-green-500 mx-1 rounded"></div>
        </div>
      </div>
    `,
    views: "147",
    rating: 4.9,
    tags: ["Dashboard", "Crypto", "Charts"],
    featured: true,
    colors: ["#10b981", "#3b82f6", "#1e293b"]
  },
  {
    id: "saas-landing",
    title: "CloudFlow SaaS Platform",
    description: "Modern SaaS landing page with glassmorphism design, animated features section, and conversion-optimized pricing.",
    category: "Business",
    preview: `
      <div class="bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-4 rounded-lg backdrop-blur">
        <div class="text-center">
          <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg mx-auto mb-2"></div>
          <h3 class="text-white font-bold text-sm">CloudFlow</h3>
          <p class="text-slate-300 text-xs">Scale your business</p>
          <div class="mt-3 px-3 py-1 bg-white/10 rounded text-xs text-white">Get Started</div>
        </div>
      </div>
    `,
    views: "89",
    rating: 4.8,
    tags: ["SaaS", "Landing", "Glassmorphism"],
    featured: true,
    colors: ["#8b5cf6", "#3b82f6", "#f8fafc"]
  },
  {
    id: "ai-platform",
    title: "NeuralAI Analytics",
    description: "AI-powered analytics platform with machine learning insights, data visualization, and predictive modeling interface.",
    category: "Technology",
    preview: `
      <div class="bg-slate-800 p-4 rounded-lg">
        <div class="flex items-center mb-3">
          <div class="w-6 h-6 bg-gradient-to-r from-cyan-500 to-purple-500 rounded mr-2"></div>
          <span class="text-cyan-400 text-sm font-bold">NeuralAI</span>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div class="bg-cyan-500/20 p-2 rounded text-cyan-300 text-xs">94% Accuracy</div>
          <div class="bg-purple-500/20 p-2 rounded text-purple-300 text-xs">2.3M Data</div>
        </div>
      </div>
    `,
    views: "203",
    rating: 4.9,
    tags: ["AI", "Analytics", "ML"],
    featured: true,
    colors: ["#06b6d4", "#8b5cf6", "#1e293b"]
  },
  {
    id: "ecommerce-store",
    title: "Fashion Hub Store",
    description: "Premium e-commerce platform with AR try-on features, personalized recommendations, and seamless checkout flow.",
    category: "E-commerce",
    preview: `
      <div class="bg-white p-4 rounded-lg">
        <div class="w-full h-12 bg-gradient-to-r from-pink-200 to-purple-200 rounded mb-2"></div>
        <h4 class="text-slate-800 font-bold text-sm">Summer Collection</h4>
        <div class="flex justify-between items-center mt-2">
          <span class="text-pink-600 font-bold">$89</span>
          <div class="px-2 py-1 bg-pink-500 text-white text-xs rounded">Buy</div>
        </div>
      </div>
    `,
    views: "76",
    rating: 4.7,
    tags: ["E-commerce", "Fashion", "Shopping"],
    featured: false,
    colors: ["#ec4899", "#8b5cf6", "#f8fafc"]
  },
  {
    id: "social-media",
    title: "CreativeSpace Social",
    description: "Next-gen social media platform for creators with advanced content tools, live streaming, and community features.",
    category: "Social",
    preview: `
      <div class="bg-gradient-to-br from-orange-500/20 to-red-500/20 p-4 rounded-lg">
        <div class="flex items-center mb-2">
          <div class="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-2"></div>
          <span class="text-orange-300 text-sm">@creator</span>
        </div>
        <div class="text-white text-xs mb-2">Live streaming now</div>
        <div class="flex gap-1">
          <div class="w-4 h-4 bg-red-500 rounded"></div>
          <div class="w-4 h-4 bg-orange-500 rounded"></div>
        </div>
      </div>
    `,
    views: "124",
    rating: 4.8,
    tags: ["Social", "Creators", "Streaming"],
    featured: false,
    colors: ["#f97316", "#ef4444", "#1e293b"]
  },
  {
    id: "healthcare-app",
    title: "MedCare Patient Portal",
    description: "Comprehensive healthcare platform with telemedicine, appointment booking, health tracking, and medical records.",
    category: "Healthcare",
    preview: `
      <div class="bg-blue-50 p-4 rounded-lg">
        <div class="flex items-center mb-2">
          <div class="w-6 h-6 bg-blue-500 rounded mr-2"></div>
          <span class="text-blue-800 text-sm font-bold">MedCare</span>
        </div>
        <div class="text-blue-600 text-xs mb-2">Next Appointment</div>
        <div class="bg-blue-500 text-white text-xs p-2 rounded">Dr. Smith - 2:00 PM</div>
      </div>
    `,
    views: "52",
    rating: 4.6,
    tags: ["Healthcare", "Telemedicine", "Portal"],
    featured: false,
    colors: ["#3b82f6", "#dbeafe", "#1e40af"]
  }
];

export default function ProjectShowcase() {
  const featuredProjects = showcaseProjects.filter(p => p.featured);
  const recentProjects = showcaseProjects.filter(p => !p.featured);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            The Showcase
          </h2>
          <TrendingUp className="w-5 h-5 text-green-400" />
        </div>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Discover amazing projects built by our agent AI UI Designer. 
          From enterprise dashboards to creative portfolios - see what's possible.
        </p>
        <div className="flex items-center justify-center space-x-6 text-sm text-slate-400">
          <div className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>2.8k total views</span>
          </div>
          <div className="flex items-center space-x-1">
            <Heart className="w-4 h-4" />
            <span>150+ likes</span>
          </div>
          <div className="flex items-center space-x-1">
            <Code className="w-4 h-4" />
            <span>30+ projects</span>
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <h3 className="text-lg font-semibold text-slate-50">Featured Projects</h3>
          <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
            Trending
          </Badge>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-4">
          {featuredProjects.map((project) => (
            <Card 
              key={project.id}
              className="glass border-slate-600/30 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="space-y-0">
                  {/* UI Preview */}
                  <div className="h-24 p-3 border-b border-slate-700/30">
                    <div 
                      className="w-full h-full rounded overflow-hidden transform group-hover:scale-105 transition-transform duration-300"
                      dangerouslySetInnerHTML={{ __html: project.preview }}
                    />
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-slate-50 group-hover:text-purple-300 transition-colors text-sm">
                          {project.title}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1" style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {project.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1 text-xs ml-2">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-slate-300">{project.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((tag, index) => (
                        <Badge 
                          key={index}
                          variant="outline" 
                          className="text-xs px-2 py-0 bg-slate-700/50 text-slate-300 border-slate-600/50"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-xs text-slate-400">
                        <Eye className="w-3 h-3" />
                        <span>{project.views} views</span>
                      </div>
                      
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-colors h-6 px-3 text-xs"
                        onClick={() => {
                          const links: Record<string, string> = {
                            'crypto-dashboard': 'https://www.behance.net/gallery/195305239/Crypto-Vision-UI-Dashboard-Design',
                            'saas-landing': 'https://www.steveroseik.com/projects/web-saas-platform',
                            'ai-platform': 'https://neuralai.mt/'
                          };
                          const link = links[project.id];
                          if (link) {
                            window.open(link, '_blank');
                          }
                        }}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Projects */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-slate-50">Recent Projects</h3>
        </div>
        
        <div className="grid gap-3">
          {recentProjects.map((project) => (
            <Card 
              key={project.id}
              className="glass border-slate-600/30 hover:border-purple-500/30 transition-all duration-300 cursor-pointer group"
            >
              <CardContent className="p-3">
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <div 
                      className="w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                      dangerouslySetInnerHTML={{ __html: project.preview }}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-slate-50 text-sm group-hover:text-purple-300 transition-colors">
                          {project.title}
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5" style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {project.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-slate-400 ml-2">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span>{project.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2 text-xs text-slate-400">
                        <Badge variant="outline" className="text-xs px-1.5 py-0 bg-slate-700/50 text-slate-400 border-slate-600/50">
                          {project.category}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{project.views}</span>
                        </div>
                      </div>
                      
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-colors h-5 px-2 text-xs"
                      >
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center space-y-4 pt-4">
        <div className="glass border-slate-600/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-50 mb-2">
            More projects dropping soon
          </h3>
          <p className="text-sm text-slate-400 mb-4">
            Join thousands of developers creating amazing UIs with AI. 
            Your project could be featured next!
          </p>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
            <Sparkles className="w-4 h-4 mr-2" />
            Start Building
          </Button>
        </div>
      </div>
    </div>
  );
}