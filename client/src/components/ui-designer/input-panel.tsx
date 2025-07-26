import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Edit3, Lightbulb, Trash2, Wand2, Loader2, Sparkles, Palette } from "lucide-react";
import TemplateShowcase from "./template-showcase";
import ShowcaseGallery from "./showcase-gallery";
import ProjectShowcase from "../project-showcase";
import type { GenerateUIRequest, GenerateUIResponse } from "@shared/schema";

interface InputPanelProps {
  onGenerate: (html: string) => void;
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
}

const templates = {
  // Modern & Animated Templates
  modernLanding: "Create a stunning modern landing page with gradient backgrounds, glassmorphism cards, animated hero text with typewriter effect, floating particles in the background, smooth scroll animations, parallax sections, and interactive hover effects on buttons and cards.",
  
  neonDashboard: "Design a futuristic dashboard with dark theme, neon accents, glowing borders, animated data visualizations, pulsing notification badges, slide-in sidebar with smooth transitions, and cyber-punk style cards with hover glow effects.",
  
  glassBlog: "Create a modern blog with glassmorphism design, blurred backgrounds, floating cards with subtle shadows, animated blog post previews that scale on hover, smooth page transitions, and elegant typography with fade-in animations.",
  
  motionEcommerce: "Design an e-commerce site with product cards that flip on hover, smooth image carousels, animated shopping cart icon, floating action buttons, parallax product showcases, and interactive size/color selectors with smooth transitions.",
  
  animatedPortfolio: "Create a portfolio with animated skill bars, projects that slide in from different directions, smooth scroll reveal animations, interactive timeline, floating social media icons, and dynamic background patterns that respond to mouse movement.",
  
  // Business & Professional
  landing: "Create a professional SaaS landing page with clean hero section, feature highlights, customer testimonials with rotating carousel, pricing tiers with hover effects, and call-to-action buttons with subtle animations.",
  
  dashboard: "Design a clean business dashboard with sidebar navigation, real-time data cards with animated counters, interactive charts, notification center, and user profile dropdown with smooth animations.",
  
  startup: "Create a modern startup website with bold hero section, problem-solution showcase, animated team member cards, investor logo carousel, and newsletter signup with success animations.",
  
  // Lifestyle & Creative
  restaurant: "Design an elegant restaurant website with hero video background, animated menu sections, chef spotlight with image hover effects, reservation form with smooth validation, and location map with custom markers.",
  
  fitness: "Create a dynamic fitness website with energetic hero section, class schedule grid with hover effects, trainer profiles with social links, membership pricing cards with animated benefits, and progress tracking elements.",
  
  // Tech & Innovation
  crypto: "Design a cryptocurrency platform with dark theme, real-time price tickers with color animations, trading interface with smooth charts, wallet cards with balance animations, and security features showcase.",
  
  ai: "Create an AI service website with futuristic design, animated neural network background, feature cards with flip animations, interactive demo sections, and pricing plans with gradient overlays.",
  
  // Social & Community
  social: "Design a social media platform with news feed, animated post interactions, story circles with gradient borders, user profile cards with hover effects, and real-time messaging interface.",
  
  education: "Create an online learning platform with course cards featuring progress rings, instructor profiles with rating animations, video player interface, achievement badges, and interactive lesson navigation.",
  
  // Creative & Artistic
  creative: "Design a creative agency website with split-screen layouts, animated project showcases, team member cards with creative hover effects, client logo animations, and contact form with artistic flourishes."
};

export default function InputPanel({ onGenerate, isGenerating, setIsGenerating }: InputPanelProps) {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState<"gpt-4o" | "gpt-4-turbo" | "gpt-3.5-turbo" | "claude-sonnet-4-20250514" | "claude-3-5-sonnet" | "claude-3-opus" | "claude-3-haiku" | "gemini-1.5-pro" | "gemini-1.5-flash" | "gemini-2.0" | "gemini-2.5-flash" | "grok-2-1212" | "grok-2-vision-1212" | "grok-1" | "command-r" | "command-r-plus">("gpt-4o");
  const [responsive, setResponsive] = useState(true);
  const { toast } = useToast();

  const generateMutation = useMutation({
    mutationFn: async (data: GenerateUIRequest) => {
      const response = await apiRequest("POST", "/api/generate", data);
      return response.json() as Promise<GenerateUIResponse>;
    },
    onMutate: () => {
      setIsGenerating(true);
    },
    onSuccess: (data) => {
      onGenerate(data.html);
      toast({
        title: "Success!",
        description: "UI generated successfully",
      });
    },
    onError: (error) => {
      console.error("Generation error:", error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate UI. Please try again.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsGenerating(false);
    },
  });

  const handleGenerate = () => {
    if (prompt.trim().length < 10) {
      toast({
        title: "Invalid Prompt",
        description: "Please enter a more detailed description (at least 10 characters)",
        variant: "destructive",
      });
      return;
    }

    generateMutation.mutate({
      prompt: prompt.trim(),
      model,
      responsive,
    });
  };

  const useTemplate = (templateKey: keyof typeof templates) => {
    setPrompt(templates[templateKey]);
  };

  const clearPrompt = () => {
    setPrompt("");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center animate-glow">
            <Edit3 className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-50">Describe Your UI</h2>
            <p className="text-xs text-slate-400">Transform ideas into stunning interfaces</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {isGenerating && (
            <div className="flex items-center space-x-2 text-sm text-slate-300 glass rounded-full px-3 py-1">
              <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
              <span>Generating...</span>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={clearPrompt}
            disabled={isGenerating}
            className="glass hover:bg-slate-700/30 transition-all duration-300"
          >
            <Trash2 className="w-4 h-4 text-slate-400" />
          </Button>
        </div>
      </div>

      {/* Templates Section */}
      <div className="border-b border-slate-700/50">
        <Tabs defaultValue="showcase" className="w-full">
          <TabsList className="grid w-full grid-cols-4 glass border-slate-600/50">
            <TabsTrigger value="showcase" className="flex items-center space-x-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 transition-all duration-300">
              <Sparkles className="w-3 h-3" />
              <span className="text-xs">Showcase</span>
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center space-x-1 data-[state=active]:bg-slate-700/50 transition-all duration-300">
              <Palette className="w-3 h-3" />
              <span className="text-xs">Gallery</span>
            </TabsTrigger>
            <TabsTrigger value="quick" className="flex items-center space-x-1 data-[state=active]:bg-slate-700/50 transition-all duration-300">
              <Lightbulb className="w-3 h-3" />
              <span className="text-xs">Quick</span>
            </TabsTrigger>
            <TabsTrigger value="modern" className="flex items-center space-x-1 data-[state=active]:bg-slate-700/50 transition-all duration-300">
              <Wand2 className="w-3 h-3" />
              <span className="text-xs">Modern</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="showcase" className="p-4 mt-0 max-h-80 overflow-y-auto">
            <ProjectShowcase />
          </TabsContent>
          
          <TabsContent value="gallery" className="p-4 mt-0 max-h-80 overflow-y-auto">
            <ShowcaseGallery 
              onSelectTemplate={(prompt) => setPrompt(prompt)} 
              isGenerating={isGenerating} 
            />
          </TabsContent>
          
          <TabsContent value="quick" className="p-4 mt-0">
        <div className="space-y-3">
          {/* Modern & Animated Section */}
          <div>
            <h4 className="text-xs font-medium text-purple-400 mb-2 flex items-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
              Modern & Animated
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => useTemplate("modernLanding")}
                disabled={isGenerating}
                className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border-purple-500/30 text-sm text-purple-300"
              >
                ✨ Modern Landing
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => useTemplate("neonDashboard")}
                disabled={isGenerating}
                className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 border-cyan-500/30 text-sm text-cyan-300"
              >
                🚀 Neon Dashboard
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => useTemplate("glassBlog")}
                disabled={isGenerating}
                className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 border-emerald-500/30 text-sm text-emerald-300"
              >
                💎 Glass Blog
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => useTemplate("motionEcommerce")}
                disabled={isGenerating}
                className="bg-gradient-to-r from-orange-500/10 to-red-500/10 hover:from-orange-500/20 hover:to-red-500/20 border-orange-500/30 text-sm text-orange-300"
              >
                🛍️ Motion Shop
              </Button>
            </div>
          </div>

          {/* Business & Tech Section */}
          <div>
            <h4 className="text-xs font-medium text-blue-400 mb-2 flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              Business & Tech
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => useTemplate("landing")}
                disabled={isGenerating}
                className="bg-dev-border hover:bg-slate-600 border-dev-border text-xs"
              >
                SaaS Landing
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => useTemplate("dashboard")}
                disabled={isGenerating}
                className="bg-dev-border hover:bg-slate-600 border-dev-border text-xs"
              >
                Dashboard
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => useTemplate("startup")}
                disabled={isGenerating}
                className="bg-dev-border hover:bg-slate-600 border-dev-border text-xs"
              >
                Startup
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => useTemplate("crypto")}
                disabled={isGenerating}
                className="bg-dev-border hover:bg-slate-600 border-dev-border text-xs"
              >
                Crypto
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => useTemplate("ai")}
                disabled={isGenerating}
                className="bg-dev-border hover:bg-slate-600 border-dev-border text-xs"
              >
                AI Service
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => useTemplate("education")}
                disabled={isGenerating}
                className="bg-dev-border hover:bg-slate-600 border-dev-border text-xs"
              >
                Education
              </Button>
            </div>
          </div>

          {/* Lifestyle & Creative Section */}
          <div>
            <h4 className="text-xs font-medium text-green-400 mb-2 flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              Lifestyle & Creative
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => useTemplate("animatedPortfolio")}
                disabled={isGenerating}
                className="bg-dev-border hover:bg-slate-600 border-dev-border text-xs"
              >
                Portfolio
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => useTemplate("restaurant")}
                disabled={isGenerating}
                className="bg-dev-border hover:bg-slate-600 border-dev-border text-xs"
              >
                Restaurant
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => useTemplate("fitness")}
                disabled={isGenerating}
                className="bg-dev-border hover:bg-slate-600 border-dev-border text-xs"
              >
                Fitness
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => useTemplate("social")}
                disabled={isGenerating}
                className="bg-dev-border hover:bg-slate-600 border-dev-border text-xs"
              >
                Social
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => useTemplate("creative")}
                disabled={isGenerating}
                className="bg-dev-border hover:bg-slate-600 border-dev-border text-xs"
              >
                Creative
              </Button>
            </div>
          </div>
        </div>
          </TabsContent>
          
          <TabsContent value="modern" className="p-4 mt-0">
            <TemplateShowcase 
              onSelectTemplate={(template) => useTemplate(template as keyof typeof templates)} 
              isGenerating={isGenerating} 
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Prompt Input Area */}
      <div className="flex-1 p-6">
        <div className="h-full glass rounded-xl border border-slate-600/30 overflow-hidden">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGenerating}
            className="w-full h-full bg-transparent border-0 text-slate-50 placeholder-slate-400 resize-none focus:ring-0 focus:outline-none p-4"
            placeholder="Describe the UI you want to create...

🎨 Modern Examples:
• A futuristic dashboard with neon accents and glowing data visualizations
• A glassmorphism landing page with floating particles and smooth animations  
• An e-commerce site with product cards that flip on hover and animated cart
• A portfolio with animated skill bars and projects sliding in from different directions
• A crypto platform with real-time price tickers and animated balance cards

✨ Include motion keywords: animated, hover effects, transitions, parallax, glassmorphism, gradients, floating, pulsing, glowing"
          />
        </div>
      </div>

      {/* Generate Controls */}
      <div className="p-6 border-t border-slate-700/50 glass">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm text-slate-300 font-medium">AI Model</Label>
              <Select value={model} onValueChange={(value) => setModel(value as any)} disabled={isGenerating}>
                <SelectTrigger className="glass border-slate-600/50 text-slate-50 bg-transparent">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass border-slate-600/50 max-h-64 overflow-y-auto">
                  {/* OpenAI Models */}
                  <SelectItem value="gpt-4o">GPT-4o ⚡ (Multimodal)</SelectItem>
                  <SelectItem value="gpt-4-turbo">GPT-4 Turbo 🚀</SelectItem>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                  
                  {/* Anthropic Models */}
                  <SelectItem value="claude-sonnet-4-20250514">Claude 4.0 Sonnet 🧠</SelectItem>
                  <SelectItem value="claude-3-5-sonnet">Claude 3.5 Sonnet ⭐</SelectItem>
                  <SelectItem value="claude-3-opus">Claude 3 Opus 💎</SelectItem>
                  <SelectItem value="claude-3-haiku">Claude 3 Haiku ⚡</SelectItem>
                  
                  {/* Google Models */}
                  <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro 🌟</SelectItem>
                  <SelectItem value="gemini-1.5-flash">Gemini 1.5 Flash ⚡</SelectItem>
                  <SelectItem value="gemini-2.0">Gemini 2.0 🔥</SelectItem>
                  <SelectItem value="gemini-2.5-flash">Gemini 2.5 Flash 🚀</SelectItem>
                  
                  {/* xAI Models */}
                  <SelectItem value="grok-2-1212">Grok 2.0 🤖</SelectItem>
                  <SelectItem value="grok-2-vision-1212">Grok 2.0 Vision 👁️</SelectItem>
                  <SelectItem value="grok-1">Grok 1 (Open) 🌐</SelectItem>
                  
                  {/* Cohere Models */}
                  <SelectItem value="command-r">Command-R 🎯</SelectItem>
                  <SelectItem value="command-r-plus">Command-R+ ⭐</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm text-slate-300 font-medium">Settings</Label>
              <div className="flex items-center space-x-3 h-10">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="responsive"
                    checked={responsive}
                    onCheckedChange={(checked) => setResponsive(checked as boolean)}
                    disabled={isGenerating}
                    className="border-slate-600 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                  />
                  <Label htmlFor="responsive" className="text-sm text-slate-300">Responsive</Label>
                </div>
                <div className="text-xs text-slate-400 ml-auto">
                  {prompt.length}/2000
                </div>
              </div>
            </div>
          </div>
          
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || prompt.trim().length < 10}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed text-white font-medium py-3 shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" />
                Generate UI
              </>
            )}
          </Button>
          
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              <span>AI Powered</span>
            </span>
            <span>~3-5 seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
}
