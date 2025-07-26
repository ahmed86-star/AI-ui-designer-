import { useState } from "react";
import InputPanel from "../components/ui-designer/input-panel";
import PreviewPanel from "../components/ui-designer/preview-panel";
import SettingsModal from "../components/ui-designer/settings-modal";
import { Wand2, Settings, BookOpen, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [showSettings, setShowSettings] = useState(false);
  const [generatedHTML, setGeneratedHTML] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationCount, setGenerationCount] = useState(0);
  const [lastGenerated, setLastGenerated] = useState<Date | null>(null);

  const handleGenerate = (html: string) => {
    setGeneratedHTML(html);
    setGenerationCount(prev => prev + 1);
    setLastGenerated(new Date());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-slate-700/50 backdrop-blur-xl bg-slate-900/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center animate-glow shadow-2xl">
                  <Wand2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    AI UI Designer
                  </h1>
                  <p className="text-sm text-slate-400">Create stunning interfaces with AI</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="hidden sm:flex items-center space-x-4 text-sm text-slate-300">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-purple-400" />
                  <span className="font-medium">{generationCount}</span>
                  <span className="text-slate-400">generations</span>
                </div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-slate-400">Live</span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(true)}
                className="glass border-slate-600/50 hover:bg-slate-700/30 text-slate-300 transition-all duration-300"
              >
                <Settings className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Settings</span>
              </Button>
              
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                onClick={() => window.open("https://tailwindcss.com/docs", "_blank")}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Docs</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <main className="relative z-10 flex flex-col lg:flex-row h-[calc(100vh-88px)]">
        <div className="w-full lg:w-1/2 border-r border-slate-700/50 backdrop-blur-xl bg-slate-900/20">
          <InputPanel
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            setIsGenerating={setIsGenerating}
          />
        </div>
        <div className="w-full lg:w-1/2 backdrop-blur-xl bg-slate-900/20">
          <PreviewPanel
            generatedHTML={generatedHTML}
            isGenerating={isGenerating}
            lastGenerated={lastGenerated}
          />
        </div>
      </main>

      {/* Settings Modal */}
      <SettingsModal
        open={showSettings}
        onOpenChange={setShowSettings}
      />
    </div>
  );
}
