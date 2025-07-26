import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCollaboration } from "@/hooks/use-collaboration";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  Wifi, 
  WifiOff, 
  Copy, 
  Download,
  Sparkles,
  MousePointer,
  Eye,
  EyeOff,
  UserPlus,
  Share
} from "lucide-react";
// Generate a simple UUID for the browser
const generateUUID = () => {
  return 'xxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

interface CollaborativeModeProps {
  onHtmlGenerated?: (html: string) => void;
}

interface Cursor {
  userId: string;
  username: string;
  color: string;
  position: { x: number; y: number };
  lastSeen: number;
}

export default function CollaborativeMode({ onHtmlGenerated }: CollaborativeModeProps) {
  const { toast } = useToast();
  const [roomId, setRoomId] = useState("");
  const [isInRoom, setIsInRoom] = useState(false);
  const [username, setUsername] = useState("");
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("gpt-4o");
  const [generatedHtml, setGeneratedHtml] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCursors, setShowCursors] = useState(true);
  const [cursors, setCursors] = useState<Map<string, Cursor>>(new Map());
  const [userId] = useState(() => generateUUID());
  const cursorTimeoutRef = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);

  // Memoize callback functions to prevent infinite re-renders
  const onPromptUpdate = useCallback((newPrompt: string, fromUserId: string, fromUsername: string) => {
    if (fromUserId !== userId) {
      setPrompt(newPrompt);
      toast({
        title: "Prompt Updated",
        description: `${fromUsername} updated the prompt`,
      });
    }
  }, [userId, toast]);

  const onGenerationStart = useCallback((fromUserId: string, fromUsername: string, promptText?: string, modelName?: string) => {
    if (fromUserId !== userId) {
      setIsGenerating(true);
      toast({
        title: "Generation Started",
        description: `${fromUsername} is generating UI...`,
      });
    }
  }, [userId, toast]);

  const onGenerationComplete = useCallback((html: string, generationId?: string) => {
    setGeneratedHtml(html);
    setIsGenerating(false);
    onHtmlGenerated?.(html);
    toast({
      title: "UI Generated",
      description: "New UI design is ready!",
    });
  }, [onHtmlGenerated, toast]);

  const onGenerationError = useCallback((error: string) => {
    setIsGenerating(false);
    toast({
      title: "Generation Failed",
      description: error,
      variant: "destructive",
    });
  }, [toast]);

  const onCursorMove = useCallback((fromUserId: string, fromUsername: string, color: string, position: { x: number; y: number }) => {
    if (fromUserId !== userId && showCursors) {
      setCursors(prev => {
        const newCursors = new Map(prev);
        
        // Clear existing timeout for this user
        const existingTimeout = cursorTimeoutRef.current.get(fromUserId);
        if (existingTimeout) {
          clearTimeout(existingTimeout);
        }
        
        // Set cursor position
        newCursors.set(fromUserId, {
          userId: fromUserId,
          username: fromUsername,
          color,
          position,
          lastSeen: Date.now(),
        });
        
        // Set timeout to remove cursor after 5 seconds
        const timeout = setTimeout(() => {
          setCursors(current => {
            const updated = new Map(current);
            updated.delete(fromUserId);
            return updated;
          });
          cursorTimeoutRef.current.delete(fromUserId);
        }, 5000);
        
        cursorTimeoutRef.current.set(fromUserId, timeout);
        
        return newCursors;
      });
    }
  }, [userId, showCursors]);

  const collaboration = useCollaboration({
    roomId: isInRoom ? roomId : "",
    userId,
    username,
    onPromptUpdate,
    onGenerationStart,
    onGenerationComplete,
    onGenerationError,
    onParticipantsChange: () => {}, // Empty function
    onCursorMove,
  });
  
  const { isConnected, participants, sendPromptChange, sendGenerate, sendCursorMove, disconnect } = collaboration;

  const joinRoom = () => {
    if (!roomId.trim() || !username.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both room ID and username",
        variant: "destructive",
      });
      return;
    }
    
    setIsInRoom(true);
  };

  const leaveRoom = () => {
    disconnect();
    setIsInRoom(false);
    setPrompt("");
    setGeneratedHtml("");
    setCursors(new Map());
  };

  const handlePromptChange = useCallback((newPrompt: string) => {
    setPrompt(newPrompt);
    if (isConnected && sendPromptChange) {
      sendPromptChange(newPrompt);
    }
  }, [isConnected, sendPromptChange]);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty Prompt",
        description: "Please enter a UI description",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    if (isConnected && sendGenerate) {
      sendGenerate(prompt, model);
    }

    try {
      const response = await fetch("/api/generate/collaborative", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          model,
          roomId,
          userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Generation failed");
      }

      const data = await response.json();
      setGeneratedHtml(data.html);
      onHtmlGenerated?.(data.html);
    } catch (error) {
      console.error("Generation error:", error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate UI. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isConnected && containerRef.current && sendCursorMove) {
      const rect = containerRef.current.getBoundingClientRect();
      const position = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      sendCursorMove(position);
    }
  }, [isConnected, sendCursorMove]);

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    toast({
      title: "Room ID Copied",
      description: "Share this ID with others to collaborate",
    });
  };

  const downloadHtml = () => {
    if (!generatedHtml) return;
    
    const blob = new Blob([generatedHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "collaborative-ui.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Generate random room ID if empty
  useEffect(() => {
    if (!roomId) {
      setRoomId(generateUUID().slice(0, 8));
    }
  }, []);

  if (!isInRoom) {
    return (
      <Card className="glass border-slate-600/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-slate-50">
            <Users className="w-5 h-5" />
            <span>Join Collaborative Room</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-slate-300 mb-2 block">Room ID</label>
            <div className="flex space-x-2">
              <Input
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Enter room ID or use generated one"
                className="glass border-slate-600/50 text-slate-50"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={copyRoomId}
                className="glass border-slate-600/50"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div>
            <label className="text-sm text-slate-300 mb-2 block">Your Name</label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              className="glass border-slate-600/50 text-slate-50"
            />
          </div>
          
          <Button 
            onClick={joinRoom}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Join Room
          </Button>
          
          <div className="text-center">
            <p className="text-xs text-slate-400">
              Share the Room ID with others to collaborate in real-time
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="space-y-6 relative"
    >
      {/* Collaborative cursors */}
      {showCursors && Array.from(cursors.values()).map((cursor) => (
        <div
          key={cursor.userId}
          className="fixed pointer-events-none z-50 transition-all duration-100"
          style={{
            left: cursor.position.x,
            top: cursor.position.y,
            color: cursor.color,
          }}
        >
          <MousePointer 
            className="w-4 h-4" 
            style={{ color: cursor.color }}
          />
          <span 
            className="text-xs px-2 py-1 rounded ml-2 text-white"
            style={{ backgroundColor: cursor.color }}
          >
            {cursor.username}
          </span>
        </div>
      ))}

      {/* Room Header */}
      <Card className="glass border-slate-600/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {isConnected ? (
                  <Wifi className="w-4 h-4 text-green-400" />
                ) : (
                  <WifiOff className="w-4 h-4 text-red-400" />
                )}
                <span className="text-sm text-slate-300">
                  Room: {roomId}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-300">
                  {participants.length} participant{participants.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCursors(!showCursors)}
                className="glass border-slate-600/50"
              >
                {showCursors ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={copyRoomId}
                className="glass border-slate-600/50"
              >
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={leaveRoom}
                className="glass border-slate-600/50 text-red-400"
              >
                Leave
              </Button>
            </div>
          </div>
          
          {/* Participants */}
          {participants.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {participants.map((participant) => (
                <Badge
                  key={participant.id}
                  variant="outline"
                  className="glass border-slate-600/50"
                  style={{ 
                    borderColor: participant.color + '80',
                    color: participant.color
                  }}
                >
                  {participant.username}
                  {participant.id === userId && " (You)"}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Input Panel */}
      <Card className="glass border-slate-600/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-slate-50">
            <Sparkles className="w-5 h-5" />
            <span>Collaborative UI Designer</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-slate-300 mb-2 block">
              Describe your UI (everyone can edit)
            </label>
            <Textarea
              value={prompt}
              onChange={(e) => handlePromptChange(e.target.value)}
              placeholder="Describe the UI you want to create..."
              className="glass border-slate-600/50 text-slate-50 min-h-[100px]"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="text-sm text-slate-300 mb-2 block">AI Model</label>
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger className="glass border-slate-600/50 text-slate-50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="claude-sonnet-4-20250514">Claude 4.0 Sonnet</SelectItem>
                  <SelectItem value="gemini-2.5-flash">Gemini 2.5 Flash</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 mt-6"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate UI
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Generated HTML Preview */}
      {generatedHtml && (
        <Card className="glass border-slate-600/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-slate-50">Generated UI</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={downloadHtml}
                className="glass border-slate-600/50"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border border-slate-600/30 rounded-lg overflow-hidden">
              <iframe
                srcDoc={generatedHtml}
                className="w-full h-96 bg-white"
                title="Generated UI Preview"
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}