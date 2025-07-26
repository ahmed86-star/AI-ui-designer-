import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Edit3, Lightbulb, Trash2, Wand2, Loader2 } from "lucide-react";
import type { GenerateUIRequest, GenerateUIResponse } from "@shared/schema";

interface InputPanelProps {
  onGenerate: (html: string) => void;
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
}

const templates = {
  landing: "Create a modern landing page for a SaaS product with a hero section featuring a headline, subtitle, and call-to-action button. Include a features section with 3 columns and a pricing section.",
  dashboard: "Design a clean dashboard interface with a sidebar navigation containing menu items like Dashboard, Analytics, Users, and Settings. Include a main content area with stat cards and a data table.",
  blog: "Create a blog homepage with a header containing navigation and logo, a featured post section, and a grid of recent blog posts with thumbnail images, titles, and excerpts.",
  ecommerce: "Design an e-commerce product page with a large product image gallery on the left and product details on the right including title, price, description, and add to cart button.",
  portfolio: "Create a personal portfolio website with a hero section featuring name and profession, an about section, skills showcase with progress bars, and a project gallery with hover effects.",
  restaurant: "Design a restaurant website with a header featuring the restaurant name and navigation, hero section with food imagery, menu section with categories, and contact information with location map.",
  fitness: "Create a fitness gym website with a bold hero section promoting memberships, class schedule section, trainer profiles with photos, and membership pricing plans.",
  startup: "Design a modern startup website with animated hero section, problem-solution sections, team member cards, investor logos, and a newsletter signup form.",
  social: "Create a social media app interface with a news feed layout, post cards with user avatars, like and comment buttons, trending topics sidebar, and user profile sections.",
  education: "Design an online learning platform with course cards, instructor profiles, progress tracking elements, video player interface, and student dashboard layout."
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

      {/* Prompt Templates */}
      <div className="p-4 border-b border-dev-border">
        <div className="flex items-center space-x-2 mb-3">
          <Lightbulb className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-medium text-slate-300">Quick Templates</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => useTemplate("landing")}
            disabled={isGenerating}
            className="bg-dev-border hover:bg-slate-600 border-dev-border text-sm"
          >
            Landing Page
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => useTemplate("dashboard")}
            disabled={isGenerating}
            className="bg-dev-border hover:bg-slate-600 border-dev-border text-sm"
          >
            Dashboard
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => useTemplate("blog")}
            disabled={isGenerating}
            className="bg-dev-border hover:bg-slate-600 border-dev-border text-sm"
          >
            Blog
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => useTemplate("ecommerce")}
            disabled={isGenerating}
            className="bg-dev-border hover:bg-slate-600 border-dev-border text-sm"
          >
            E-commerce
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => useTemplate("portfolio")}
            disabled={isGenerating}
            className="bg-dev-border hover:bg-slate-600 border-dev-border text-sm"
          >
            Portfolio
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => useTemplate("restaurant")}
            disabled={isGenerating}
            className="bg-dev-border hover:bg-slate-600 border-dev-border text-sm"
          >
            Restaurant
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => useTemplate("fitness")}
            disabled={isGenerating}
            className="bg-dev-border hover:bg-slate-600 border-dev-border text-sm"
          >
            Fitness
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => useTemplate("startup")}
            disabled={isGenerating}
            className="bg-dev-border hover:bg-slate-600 border-dev-border text-sm"
          >
            Startup
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => useTemplate("social")}
            disabled={isGenerating}
            className="bg-dev-border hover:bg-slate-600 border-dev-border text-sm"
          >
            Social Media
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => useTemplate("education")}
            disabled={isGenerating}
            className="bg-dev-border hover:bg-slate-600 border-dev-border text-sm"
          >
            Education
          </Button>
        </div>
      </div>

      {/* Prompt Input Area */}
      <div className="flex-1 p-4">
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isGenerating}
          className="w-full h-full bg-dev-bg border-dev-border text-slate-50 placeholder-slate-400 resize-none focus:ring-dev-accent focus:border-dev-accent"
          placeholder="Describe the UI you want to create...

Examples:
• A modern landing page for a SaaS product with hero section, features, and pricing
• A clean dashboard with sidebar navigation and data cards
• A blog homepage with featured posts and category filters
• An e-commerce product page with image gallery and reviews"
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
