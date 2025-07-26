import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Zap, Palette, Rocket, Layers, Eye } from "lucide-react";

interface TemplateShowcaseProps {
  onSelectTemplate: (template: string) => void;
  isGenerating: boolean;
}

const showcaseTemplates = [
  {
    id: "modernLanding",
    title: "Modern Landing",
    description: "Glassmorphism design with animated particles and smooth scroll effects",
    icon: Sparkles,
    gradient: "from-purple-500 to-pink-500",
    preview: `
      <div class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <!-- Animated Background -->
        <div class="absolute inset-0">
          <div class="absolute top-20 left-20 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div class="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <!-- Hero Section -->
        <div class="relative z-10 container mx-auto px-6 pt-20">
          <div class="text-center space-y-8">
            <h1 class="text-6xl font-bold text-white mb-6">
              The Future of
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse">
                Innovation
              </span>
            </h1>
            <p class="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the next generation of technology with our cutting-edge platform.
            </p>
            <button class="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              Get Started
            </button>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "neonDashboard",
    title: "Neon Dashboard",
    description: "Cyberpunk-style interface with glowing elements and data visualizations",
    icon: Zap,
    gradient: "from-cyan-500 to-blue-500",
    preview: `
      <div class="min-h-screen bg-gray-900 text-white">
        <!-- Sidebar -->
        <div class="fixed left-0 top-0 h-full w-64 bg-gray-800 border-r border-cyan-500/50">
          <div class="p-6">
            <h2 class="text-2xl font-bold text-cyan-400">NEXUS</h2>
          </div>
          <nav class="space-y-2 px-4">
            <a class="block p-3 rounded-lg bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/30 transition-all">
              Dashboard
            </a>
            <a class="block p-3 rounded-lg hover:bg-gray-700 transition-all">Analytics</a>
            <a class="block p-3 rounded-lg hover:bg-gray-700 transition-all">Users</a>
          </nav>
        </div>
        
        <!-- Main Content -->
        <div class="ml-64 p-8">
          <div class="grid grid-cols-3 gap-6 mb-8">
            <div class="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-6 rounded-xl border border-cyan-500/30 hover:border-cyan-400 transition-all">
              <h3 class="text-lg font-semibold text-cyan-300">Active Users</h3>
              <p class="text-3xl font-bold text-white mt-2">2,847</p>
              <div class="w-full bg-gray-700 rounded-full h-2 mt-4">
                <div class="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full w-3/4 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "glassBlog",
    title: "Glass Blog",
    description: "Elegant glassmorphism blog with floating cards and smooth animations",
    icon: Layers,
    gradient: "from-emerald-500 to-teal-500",
    preview: `
      <div class="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
        <!-- Header -->
        <header class="backdrop-blur-md bg-white/30 border-b border-white/20 sticky top-0 z-50">
          <div class="container mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
              <h1 class="text-2xl font-bold text-gray-800">GlassBlog</h1>
              <nav class="flex space-x-6">
                <a class="text-gray-700 hover:text-emerald-600 transition-colors">Home</a>
                <a class="text-gray-700 hover:text-emerald-600 transition-colors">Articles</a>
                <a class="text-gray-700 hover:text-emerald-600 transition-colors">About</a>
              </nav>
            </div>
          </div>
        </header>
        
        <!-- Content -->
        <main class="container mx-auto px-6 py-12">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article class="backdrop-blur-md bg-white/40 rounded-2xl p-6 border border-white/20 hover:bg-white/50 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div class="w-full h-48 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-xl mb-4"></div>
              <h2 class="text-xl font-semibold text-gray-800 mb-3">Modern Web Design</h2>
              <p class="text-gray-600 mb-4">Exploring the latest trends in web design and user experience.</p>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">5 min read</span>
                <button class="text-emerald-600 hover:text-emerald-700 font-medium">Read More</button>
              </div>
            </article>
          </div>
        </main>
      </div>
    `
  }
];

export default function TemplateShowcase({ onSelectTemplate, isGenerating }: TemplateShowcaseProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    onSelectTemplate(templateId);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center space-x-2">
          <Palette className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-semibold text-slate-50">Modern UI Showcase</h3>
        </div>
        <p className="text-slate-400 text-sm">
          Click any template to generate stunning, modern interfaces with animations
        </p>
      </div>

      <div className="grid gap-4">
        {showcaseTemplates.map((template) => {
          const IconComponent = template.icon;
          return (
            <Card 
              key={template.id} 
              className="bg-dev-surface border-dev-border hover:border-purple-500/50 transition-all duration-300 cursor-pointer group"
              onClick={() => handleTemplateSelect(template.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${template.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-50 group-hover:text-purple-300 transition-colors">
                        {template.title}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-slate-400" />
                        <span className="text-xs text-slate-400">Preview</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-400 mb-3">
                      {template.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full">
                          Animated
                        </span>
                        <span className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full">
                          Modern
                        </span>
                      </div>
                      
                      <Button
                        size="sm"
                        disabled={isGenerating}
                        className={`${
                          selectedTemplate === template.id 
                            ? 'bg-purple-500 hover:bg-purple-600' 
                            : 'bg-dev-accent hover:bg-blue-600'
                        } text-white transition-colors`}
                      >
                        {selectedTemplate === template.id ? 'Selected' : 'Generate'}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center">
        <Button
          variant="outline"
          size="sm"
          className="bg-dev-border hover:bg-slate-600 border-dev-border text-slate-300"
          onClick={() => onSelectTemplate("modernLanding")}
          disabled={isGenerating}
        >
          <Rocket className="w-4 h-4 mr-2" />
          Try Random Modern Template
        </Button>
      </div>
    </div>
  );
}