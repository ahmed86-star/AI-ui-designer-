import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Eye, Monitor, Tablet, Smartphone, RotateCcw, Download, ChevronDown, Copy, Code, FileCode } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PreviewPanelProps {
  generatedHTML: string;
  isGenerating: boolean;
  lastGenerated: Date | null;
}

type PreviewMode = "desktop" | "tablet" | "mobile";

export default function PreviewPanel({ generatedHTML, isGenerating, lastGenerated }: PreviewPanelProps) {
  const [previewMode, setPreviewMode] = useState<PreviewMode>("desktop");
  const { toast } = useToast();

  const hasContent = Boolean(generatedHTML && !isGenerating);

  const getPreviewStyles = () => {
    switch (previewMode) {
      case "mobile":
        return { maxWidth: "375px", margin: "0 auto" };
      case "tablet":
        return { maxWidth: "768px", margin: "0 auto" };
      default:
        return { maxWidth: "100%", margin: "0" };
    }
  };

  const getFullHTML = (bodyContent: string) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated UI</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { margin: 0; padding: 0; }
    </style>
</head>
<body>
${bodyContent}
</body>
</html>`;
  };

  const refreshPreview = () => {
    if (hasContent) {
      // Force iframe reload by updating src
      const iframe = document.getElementById('previewFrame') as HTMLIFrameElement;
      if (iframe) {
        iframe.src = iframe.src;
      }
    }
  };

  const copyCode = async () => {
    if (!generatedHTML) return;
    
    try {
      await navigator.clipboard.writeText(generatedHTML);
      toast({
        title: "Copied!",
        description: "HTML code copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy code to clipboard",
        variant: "destructive",
      });
    }
  };

  const exportHTML = () => {
    if (!generatedHTML) return;
    
    const fullHTML = getFullHTML(generatedHTML);
    const blob = new Blob([fullHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "generated-ui.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "HTML file downloaded successfully",
    });
  };

  const exportReact = () => {
    if (!generatedHTML) return;
    
    // Simple conversion to JSX (basic transformation)
    let jsxContent = generatedHTML
      .replace(/class=/g, "className=")
      .replace(/for=/g, "htmlFor=")
      .replace(/<!--.*?-->/g, ""); // Remove HTML comments
    
    const reactComponent = `import React from 'react';

export default function GeneratedComponent() {
  return (
    <>
${jsxContent.split('\n').map(line => '      ' + line).join('\n')}
    </>
  );
}`;
    
    const blob = new Blob([reactComponent], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "GeneratedComponent.jsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "React component downloaded successfully",
    });
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center animate-glow">
            <Eye className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-50">Live Preview</h2>
            {lastGenerated ? (
              <p className="text-xs text-slate-400">
                Generated {formatTime(lastGenerated)}
              </p>
            ) : (
              <p className="text-xs text-slate-400">Real-time interface preview</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Responsive Preview Toggles */}
          <div className="flex items-center space-x-1 bg-dev-border rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPreviewMode("desktop")}
              className={`p-1 h-8 w-8 ${
                previewMode === "desktop" 
                  ? "bg-dev-accent text-white" 
                  : "hover:bg-slate-600 text-slate-400"
              }`}
            >
              <Monitor className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPreviewMode("tablet")}
              className={`p-1 h-8 w-8 ${
                previewMode === "tablet" 
                  ? "bg-dev-accent text-white" 
                  : "hover:bg-slate-600 text-slate-400"
              }`}
            >
              <Tablet className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPreviewMode("mobile")}
              className={`p-1 h-8 w-8 ${
                previewMode === "mobile" 
                  ? "bg-dev-accent text-white" 
                  : "hover:bg-slate-600 text-slate-400"
              }`}
            >
              <Smartphone className="w-3 h-3" />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={refreshPreview}
            disabled={!hasContent}
            className="p-2 hover:bg-dev-border"
          >
            <RotateCcw className="w-4 h-4 text-slate-400" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                disabled={!hasContent}
                className="p-2 hover:bg-dev-border"
              >
                <Download className="w-4 h-4 text-slate-400 mr-1" />
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-dev-surface border-dev-border">
              <DropdownMenuItem onClick={exportHTML} className="hover:bg-dev-border">
                <Code className="w-4 h-4 mr-2 text-orange-400" />
                Export HTML
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportReact} className="hover:bg-dev-border">
                <FileCode className="w-4 h-4 mr-2 text-blue-400" />
                Export React
              </DropdownMenuItem>
              <DropdownMenuItem onClick={copyCode} className="hover:bg-dev-border">
                <Copy className="w-4 h-4 mr-2 text-green-400" />
                Copy Code
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Preview Content Area */}
      <div className="flex-1 p-4">
        {!hasContent && !isGenerating && (
          <div className="h-full flex items-center justify-center border-2 border-dashed border-dev-border rounded-lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-dev-border rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-300 mb-2">Ready to Generate</h3>
              <p className="text-slate-400 mb-4 max-w-md">
                Enter a description of your UI in the prompt area and click "Generate UI" to see the magic happen.
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-slate-500">
                <div className="flex items-center space-x-1">
                  <span>⚡</span>
                  <span>Instant</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Smartphone className="w-4 h-4" />
                  <span>Responsive</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>🎨</span>
                  <span>Tailwind CSS</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {isGenerating && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-dev-border border-t-dev-accent rounded-full animate-spin mx-auto mb-4"></div>
              <h3 className="text-lg font-medium text-slate-300 mb-2">Generating Your UI</h3>
              <p className="text-slate-400">AI is crafting your perfect interface...</p>
              <div className="mt-4 w-64 bg-dev-border rounded-full h-2 mx-auto">
                <div className="bg-dev-accent h-2 rounded-full animate-pulse" style={{ width: "45%" }}></div>
              </div>
            </div>
          </div>
        )}

        {hasContent && (
          <iframe
            id="previewFrame"
            className="w-full h-full border border-dev-border rounded-lg bg-white"
            style={getPreviewStyles()}
            srcDoc={getFullHTML(generatedHTML)}
            title="Generated UI Preview"
            sandbox="allow-scripts"
          />
        )}
      </div>

      {/* Preview Footer with Status */}
      <div className="p-4 border-t border-dev-border bg-dev-surface">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                isGenerating ? "bg-yellow-500" : 
                hasContent ? "bg-dev-success" : "bg-slate-500"
              }`}></div>
              <span className="text-slate-300">
                {isGenerating ? "Generating..." : 
                 hasContent ? "Ready" : "Waiting"}
              </span>
            </div>
            
            <div className="text-slate-400">
              {generatedHTML ? `${generatedHTML.split('\n').length} lines generated` : "0 lines generated"}
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-slate-400">
            <span>Tailwind CSS</span>
            <span>•</span>
            <span>Responsive</span>
            <span>•</span>
            <span className="capitalize">{previewMode}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
