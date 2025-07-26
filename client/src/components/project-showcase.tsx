import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Heart, Eye, ExternalLink, Code, Sparkles, TrendingUp, Clock } from "lucide-react";

interface ShowcaseProject {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  views: string;
  likes: string;
  rating: number;
  tags: string[];
  timeAgo: string;
  featured: boolean;
}

const showcaseProjects: ShowcaseProject[] = [
  {
    id: "crypto-dashboard",
    title: "CryptoVision Dashboard",
    description: "Real-time cryptocurrency trading dashboard with advanced charts, portfolio tracking, and AI-powered market insights.",
    category: "Finance",
    image: "📊",
    views: "12.4k",
    likes: "847",
    rating: 4.9,
    tags: ["Dashboard", "Crypto", "Charts", "Real-time"],
    timeAgo: "2 hours ago",
    featured: true
  },
  {
    id: "saas-landing",
    title: "CloudFlow SaaS Platform",
    description: "Modern SaaS landing page with glassmorphism design, animated features section, and conversion-optimized pricing.",
    category: "Business",
    image: "🚀",
    views: "8.2k",
    likes: "623",
    rating: 4.8,
    tags: ["SaaS", "Landing", "Glassmorphism", "Modern"],
    timeAgo: "5 hours ago",
    featured: true
  },
  {
    id: "ai-platform",
    title: "NeuralAI Analytics",
    description: "AI-powered analytics platform with machine learning insights, data visualization, and predictive modeling interface.",
    category: "Technology",
    image: "🤖",
    views: "15.7k",
    likes: "1.2k",
    rating: 4.9,
    tags: ["AI", "Analytics", "ML", "Data Viz"],
    timeAgo: "1 day ago",
    featured: true
  },
  {
    id: "ecommerce-store",
    title: "Fashion Hub Store",
    description: "Premium e-commerce platform with AR try-on features, personalized recommendations, and seamless checkout flow.",
    category: "E-commerce",
    image: "🛍️",
    views: "9.8k",
    likes: "756",
    rating: 4.7,
    tags: ["E-commerce", "Fashion", "AR", "Shopping"],
    timeAgo: "1 day ago",
    featured: false
  },
  {
    id: "social-media",
    title: "CreativeSpace Social",
    description: "Next-gen social media platform for creators with advanced content tools, live streaming, and community features.",
    category: "Social",
    image: "📱",
    views: "18.3k",
    likes: "1.5k",
    rating: 4.8,
    tags: ["Social", "Creators", "Streaming", "Community"],
    timeAgo: "2 days ago",
    featured: false
  },
  {
    id: "healthcare-app",
    title: "MedCare Patient Portal",
    description: "Comprehensive healthcare platform with telemedicine, appointment booking, health tracking, and medical records.",
    category: "Healthcare",
    image: "🏥",
    views: "6.4k",
    likes: "445",
    rating: 4.6,
    tags: ["Healthcare", "Telemedicine", "Portal", "Medical"],
    timeAgo: "3 days ago",
    featured: false
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
            <span>200k+ total views</span>
          </div>
          <div className="flex items-center space-x-1">
            <Heart className="w-4 h-4" />
            <span>15k+ likes</span>
          </div>
          <div className="flex items-center space-x-1">
            <Code className="w-4 h-4" />
            <span>500+ projects</span>
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
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                      {project.image}
                    </div>
                    <div className="flex items-center space-x-1 text-xs">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-slate-300">{project.rating}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-50 group-hover:text-purple-300 transition-colors">
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
                  
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{project.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>{project.likes}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{project.timeAgo}</span>
                    </div>
                  </div>
                  
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-colors h-7"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    View Project
                  </Button>
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
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300">
                    {project.image}
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
                        <span>{project.timeAgo}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-xs text-slate-400">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{project.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-3 h-3" />
                          <span>{project.likes}</span>
                        </div>
                      </div>
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