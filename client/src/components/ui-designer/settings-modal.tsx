import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const [apiKey, setApiKey] = useState("");
  const [defaultModel, setDefaultModel] = useState<"gpt-4o" | "gpt-3.5-turbo" | "claude-sonnet-4-20250514" | "claude-3-7-sonnet-20250219" | "grok-2-1212" | "grok-2-vision-1212">("gpt-4o");
  const [autoSave, setAutoSave] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const { toast } = useToast();

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("ai-ui-designer-settings");
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        setApiKey(settings.apiKey || "");
        setDefaultModel(settings.defaultModel || "gpt-4o");
        setAutoSave(settings.autoSave ?? true);
        setDarkMode(settings.darkMode ?? true);
      } catch (error) {
        console.error("Failed to load settings:", error);
      }
    }
  }, [open]);

  const saveSettings = () => {
    const settings = {
      apiKey,
      defaultModel,
      autoSave,
      darkMode,
    };

    try {
      localStorage.setItem("ai-ui-designer-settings", JSON.stringify(settings));
      toast({
        title: "Settings Saved",
        description: "Your preferences have been saved successfully",
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  const resetSettings = () => {
    setApiKey("");
    setDefaultModel("gpt-4o");
    setAutoSave(true);
    setDarkMode(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-dev-surface border-dev-border text-slate-50 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Settings</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div>
            <Label className="block text-sm font-medium text-slate-300 mb-2">
              OpenAI API Key
            </Label>
            <Input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="bg-dev-bg border-dev-border text-slate-50 placeholder-slate-400 focus:ring-dev-accent focus:border-dev-accent"
            />
            <p className="text-xs text-slate-400 mt-1">
              Your API key is stored locally and never shared.
            </p>
          </div>
          
          <div>
            <Label className="block text-sm font-medium text-slate-300 mb-2">
              Default Model
            </Label>
            <Select value={defaultModel} onValueChange={(value: "gpt-4o" | "gpt-3.5-turbo" | "claude-sonnet-4-20250514" | "claude-3-7-sonnet-20250219" | "grok-2-1212" | "grok-2-vision-1212") => setDefaultModel(value)}>
              <SelectTrigger className="bg-dev-bg border-dev-border text-slate-50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-dev-surface border-dev-border">
                <SelectItem value="gpt-4o">GPT-4o (OpenAI)</SelectItem>
                <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo (OpenAI)</SelectItem>
                <SelectItem value="claude-sonnet-4-20250514">Claude 4.0 Sonnet (Anthropic)</SelectItem>
                <SelectItem value="claude-3-7-sonnet-20250219">Claude 3.7 Sonnet (Anthropic)</SelectItem>
                <SelectItem value="grok-2-1212">Grok 2.0 (xAI)</SelectItem>
                <SelectItem value="grok-2-vision-1212">Grok 2.0 Vision (xAI)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-slate-300">Auto-save prompts</Label>
            <Checkbox
              checked={autoSave}
              onCheckedChange={(checked) => setAutoSave(checked as boolean)}
              className="border-dev-border data-[state=checked]:bg-dev-accent"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-slate-300">Dark mode</Label>
            <Checkbox
              checked={darkMode}
              onCheckedChange={(checked) => setDarkMode(checked as boolean)}
              className="border-dev-border data-[state=checked]:bg-dev-accent"
            />
          </div>
        </div>
        
        <div className="flex justify-between pt-4 border-t border-dev-border">
          <Button
            variant="outline"
            onClick={resetSettings}
            className="border-dev-border text-slate-400 hover:text-slate-300 hover:bg-dev-border"
          >
            Reset
          </Button>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-dev-border text-slate-400 hover:text-slate-300 hover:bg-dev-border"
            >
              Cancel
            </Button>
            <Button
              onClick={saveSettings}
              className="bg-dev-accent hover:bg-blue-600 text-white"
            >
              Save Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
