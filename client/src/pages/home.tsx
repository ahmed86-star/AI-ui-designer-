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
    <div className="min-h-screen bg-dev-bg text-slate-50">
      {/* Header */}
      <header className="border-b border-dev-border bg-dev-surface px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-dev-accent to-purple-500 rounded-lg flex items-center justify-center">
                <Wand2 className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-50">AI UI Designer</h1>
                <p className="text-xs text-slate-400">Powered by OpenAI GPT-4o</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm text-slate-400">
              <BarChart3 className="w-4 h-4" />
              <span>{generationCount}</span>
              <span>generations</span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSettings(true)}
              className="bg-dev-border hover:bg-slate-600 border-dev-border"
            >
              <Settings className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Settings</span>
            </Button>
            
            <Button
              size="sm"
              className="bg-dev-accent hover:bg-blue-600"
              onClick={() => window.open("https://tailwindcss.com/docs", "_blank")}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Docs</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <main className="flex flex-col lg:flex-row h-[calc(100vh-81px)]">
        <InputPanel
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
          setIsGenerating={setIsGenerating}
        />
        <PreviewPanel
          generatedHTML={generatedHTML}
          isGenerating={isGenerating}
          lastGenerated={lastGenerated}
        />
      </main>

      {/* Settings Modal */}
      <SettingsModal
        open={showSettings}
        onOpenChange={setShowSettings}
      />
    </div>
  );
}
