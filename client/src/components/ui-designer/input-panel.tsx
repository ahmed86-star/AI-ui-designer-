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
  const [model, setModel] = useState<"gpt-4o" | "gpt-3.5-turbo" | "claude-sonnet-4-20250514" | "claude-3-7-sonnet-20250219" | "grok-2-1212" | "grok-2-vision-1212">("gpt-4o");
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
    <div className="flex flex-col lg:w-1/2 border-r border-dev-border bg-dev-surface">
      {/* Input Header */}
      <div className="flex items-center justify-between p-4 border-b border-dev-border">
        <div className="flex items-center space-x-3">
          <Edit3 className="w-5 h-5 text-dev-accent" />
          <h2 className="font-semibold text-slate-50">Describe Your UI</h2>
        </div>
        
        <div className="flex items-center space-x-2">
          {isGenerating && (
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Generating...</span>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={clearPrompt}
            disabled={isGenerating}
            className="p-2 hover:bg-dev-border"
          >
            <Trash2 className="w-4 h-4 text-slate-400" />
          </Button>
        </div>
      </div>

      {/* Templates Section */}
      <div className="border-b border-dev-border">
        <Tabs defaultValue="quick" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-dev-border">
            <TabsTrigger value="quick" className="flex items-center space-x-2 data-[state=active]:bg-dev-accent">
              <Lightbulb className="w-3 h-3" />
              <span className="text-xs">Quick</span>
            </TabsTrigger>
            <TabsTrigger value="showcase" className="flex items-center space-x-2 data-[state=active]:bg-purple-500">
              <Sparkles className="w-3 h-3" />
              <span className="text-xs">Modern</span>
            </TabsTrigger>
          </TabsList>
          
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
          
          <TabsContent value="showcase" className="p-4 mt-0">
            <TemplateShowcase 
              onSelectTemplate={useTemplate} 
              isGenerating={isGenerating} 
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Prompt Input Area */}
      <div className="flex-1 p-4">
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isGenerating}
          className="w-full h-full bg-dev-bg border-dev-border text-slate-50 placeholder-slate-400 resize-none focus:ring-dev-accent focus:border-dev-accent"
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

      {/* Generate Controls */}
      <div className="p-4 border-t border-dev-border bg-dev-surface">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Label className="text-sm text-slate-300">Model:</Label>
              <Select value={model} onValueChange={(value: "gpt-4o" | "gpt-3.5-turbo" | "claude-sonnet-4-20250514" | "claude-3-7-sonnet-20250219" | "grok-2-1212" | "grok-2-vision-1212") => setModel(value)} disabled={isGenerating}>
                <SelectTrigger className="w-48 bg-dev-bg border-dev-border text-slate-50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="claude-sonnet-4-20250514">Claude 4.0 Sonnet</SelectItem>
                  <SelectItem value="claude-3-7-sonnet-20250219">Claude 3.7 Sonnet</SelectItem>
                  <SelectItem value="grok-2-1212">Grok 2.0</SelectItem>
                  <SelectItem value="grok-2-vision-1212">Grok 2.0 Vision</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="responsive"
                checked={responsive}
                onCheckedChange={(checked) => setResponsive(checked as boolean)}
                disabled={isGenerating}
                className="border-dev-border data-[state=checked]:bg-dev-accent"
              />
              <Label htmlFor="responsive" className="text-sm text-slate-300">Responsive</Label>
            </div>
          </div>
          
          <div className="text-xs text-slate-400">
            {prompt.length} / 2000 chars
          </div>
        </div>
        
        <Button
          onClick={handleGenerate}
          disabled={isGenerating || prompt.trim().length < 10}
          className="w-full bg-dev-accent hover:bg-blue-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium"
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
        
        <div className="flex items-center justify-between mt-3 text-xs text-slate-400">
          <span>⚡ Powered by OpenAI</span>
          <span>~3-5 seconds</span>
        </div>
      </div>
    </div>
  );
}
