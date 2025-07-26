import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Star, TrendingUp, Zap, Eye, ExternalLink } from "lucide-react";

interface ShowcaseItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  features: string[];
  complexity: "Simple" | "Medium" | "Advanced";
  rating: number;
  prompt: string;
}

const showcaseItems: ShowcaseItem[] = [
  {
    id: "modern-saas",
    title: "Modern SaaS Landing",
    description: "Professional landing page with glassmorphism design, animated statistics, and gradient call-to-action buttons.",
    category: "Business",
    image: "🚀",
    features: ["Glassmorphism", "Animated counters", "Responsive grid", "Gradient buttons"],
    complexity: "Advanced",
    rating: 4.9,
    prompt: "Create a modern SaaS landing page with glassmorphism design, animated hero section with floating particles background, feature cards with subtle shadows and hover effects, animated statistics counters, customer testimonials carousel, and gradient call-to-action buttons with smooth hover animations."
  },
  {
    id: "crypto-dashboard",
    title: "Crypto Trading Dashboard",
    description: "Dark theme dashboard with real-time price charts, glowing elements, and neon accents for cryptocurrency trading.",
    category: "Finance",
    image: "₿",
    features: ["Dark theme", "Neon effects", "Chart widgets", "Real-time data"],
    complexity: "Advanced",
    rating: 4.8,
    prompt: "Design a cryptocurrency trading dashboard with dark theme, neon blue and green accents, glowing borders, animated price tickers with color-coded changes, chart widgets with smooth transitions, trading interface with hover effects, portfolio balance cards with gradient backgrounds, and pulsing notification badges."
  },
  {
    id: "creative-portfolio",
    title: "Creative Portfolio",
    description: "Animated portfolio with project showcases, interactive timeline, and smooth scroll reveal effects.",
    category: "Creative",
    image: "🎨",
    features: ["Scroll animations", "Interactive timeline", "Project gallery", "Smooth transitions"],
    complexity: "Medium",
    rating: 4.7,
    prompt: "Create a creative portfolio website with animated hero section, interactive project gallery with hover effects and modal previews, skills section with animated progress bars, timeline with scroll-triggered animations, testimonials with rotating carousel, and smooth parallax scrolling throughout the page."
  },
  {
    id: "ecommerce-store",
    title: "E-commerce Store",
    description: "Modern online store with product cards that flip on hover, animated shopping cart, and interactive filters.",
    category: "E-commerce",
    image: "🛍️",
    features: ["Product cards", "Hover animations", "Filter system", "Shopping cart"],
    complexity: "Medium",
    rating: 4.6,
    prompt: "Design an e-commerce product listing page with cards that flip on hover to show product details, animated shopping cart icon with item count badge, interactive filter sidebar with smooth animations, product image gallery with zoom effects, and add-to-cart buttons with success animations."
  },
  {
    id: "glass-blog",
    title: "Glassmorphism Blog",
    description: "Elegant blog design with frosted glass cards, smooth animations, and modern typography.",
    category: "Content",
    image: "📝",
    features: ["Glassmorphism", "Frosted glass", "Typography", "Card layouts"],
    complexity: "Simple",
    rating: 4.5,
    prompt: "Create a modern blog homepage with glassmorphism design, frosted glass cards for blog posts, smooth animations on scroll, elegant typography with proper spacing, hero section with blurred background, category tags with hover effects, and a clean navigation bar with transparent background."
  },
  {
    id: "ai-platform",
    title: "AI Platform Interface",
    description: "Futuristic AI service interface with neural network animations, gradient overlays, and interactive demo sections.",
    category: "Technology",
    image: "🤖",
    features: ["Neural animations", "Gradient overlays", "Interactive demos", "Futuristic design"],
    complexity: "Advanced",
    rating: 4.9,
    prompt: "Design an AI service platform with futuristic interface, animated neural network background, gradient overlays, interactive demo sections with real-time previews, feature cards with flip animations, pricing plans with hover effects, and tech-inspired color scheme with blue and purple gradients."
  }
];

interface ShowcaseGalleryProps {
  onSelectTemplate: (prompt: string) => void;
  isGenerating: boolean;
}

export default function ShowcaseGallery({ onSelectTemplate, isGenerating }: ShowcaseGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  const categories = ["All", "Business", "Finance", "Creative", "E-commerce", "Content", "Technology"];
  
  const filteredItems = selectedCategory === "All" 
    ? showcaseItems 
    : showcaseItems.filter(item => item.category === selectedCategory);

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Simple": return "bg-green-500/20 text-green-300 border-green-500/30";
      case "Medium": return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "Advanced": return "bg-red-500/20 text-red-300 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
          <h3 className="text-xl font-semibold text-slate-50">Template Showcase</h3>
          <TrendingUp className="w-5 h-5 text-green-400" />
        </div>
        <p className="text-slate-400 text-sm max-w-lg mx-auto">
          Professionally designed templates trusted by thousands of developers. 
          Click any template to generate your own version.
        </p>
        
        {/* Trust indicators */}
        <div className="flex items-center justify-center space-x-6 text-xs text-slate-400">
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span>4.8/5 Rating</span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="w-3 h-3 text-blue-400" />
            <span>50k+ Views</span>
          </div>
          <div className="flex items-center space-x-1">
            <Zap className="w-3 h-3 text-purple-400" />
            <span>AI Powered</span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant="outline"
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={`transition-all duration-300 ${
              selectedCategory === category
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent"
                : "glass border-slate-600/50 hover:bg-slate-700/30 text-slate-300"
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Showcase Grid */}
      <div className="grid gap-4">
        {filteredItems.map((item) => (
          <Card 
            key={item.id}
            className="glass border-slate-600/30 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group overflow-hidden"
            onClick={() => onSelectTemplate(item.prompt)}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                  {item.image}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-slate-50 group-hover:text-purple-300 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 text-xs">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-slate-300">{item.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.features.slice(0, 3).map((feature, index) => (
                      <Badge 
                        key={index}
                        variant="outline" 
                        className="text-xs px-2 py-0 bg-slate-700/50 text-slate-300 border-slate-600/50"
                      >
                        {feature}
                      </Badge>
                    ))}
                    {item.features.length > 3 && (
                      <Badge 
                        variant="outline" 
                        className="text-xs px-2 py-0 bg-slate-700/50 text-slate-400 border-slate-600/50"
                      >
                        +{item.features.length - 3}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge className={`text-xs border ${getComplexityColor(item.complexity)}`}>
                        {item.complexity}
                      </Badge>
                      <span className="text-xs text-slate-400">{item.category}</span>
                    </div>
                    
                    <Button
                      size="sm"
                      disabled={isGenerating}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-colors h-7 px-3"
                    >
                      {isGenerating ? "Generating..." : (
                        <>
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Generate
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <p className="text-xs text-slate-400">
          More templates added weekly • Powered by advanced AI models
        </p>
      </div>
    </div>
  );
}