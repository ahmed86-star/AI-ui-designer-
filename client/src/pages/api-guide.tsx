import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Code, 
  Key, 
  ExternalLink, 
  CheckCircle, 
  AlertTriangle,
  Zap,
  Brain,
  Bot,
  Globe,
  Lock,
  Play,
  Copy
} from "lucide-react";
import { useState } from "react";

interface APIProvider {
  id: string;
  name: string;
  icon: string;
  website: string;
  description: string;
  models: string[];
  steps: string[];
  example: string;
  endpoint: string;
  keyFormat: string;
}

const apiProviders: APIProvider[] = [
  {
    id: "openai",
    name: "OpenAI",
    icon: "🧠",
    website: "https://platform.openai.com",
    description: "GPT-4o, GPT-4 Turbo - Industry leading language models",
    models: ["gpt-4o", "gpt-4-turbo", "gpt-3.5-turbo"],
    steps: [
      "Sign in and go to the API Keys page",
      "Copy your secret key",
      "Use it in Authorization header",
      "Explore playground at platform.openai.com/playground"
    ],
    example: `curl https://api.openai.com/v1/chat/completions \\
-H "Authorization: Bearer YOUR_API_KEY" \\
-H "Content-Type: application/json" \\
-d '{
  "model": "gpt-4o",
  "messages": [{"role": "user", "content": "Hello!"}]
}'`,
    endpoint: "https://api.openai.com/v1/chat/completions",
    keyFormat: "sk-..."
  },
  {
    id: "anthropic",
    name: "Anthropic",
    icon: "🤖",
    website: "https://console.anthropic.com",
    description: "Claude 3 (Opus, Sonnet, Haiku) - Advanced reasoning models",
    models: ["claude-3-opus", "claude-3-sonnet", "claude-3-haiku"],
    steps: [
      "Join at console.anthropic.com",
      "Go to API Keys and create a key",
      "Use x-api-key header",
      "Set anthropic-version header"
    ],
    example: `curl https://api.anthropic.com/v1/messages \\
-H "x-api-key: YOUR_API_KEY" \\
-H "anthropic-version: 2023-06-01" \\
-H "content-type: application/json" \\
-d '{
  "model": "claude-3-sonnet-20240229",
  "messages": [{"role": "user", "content": "Summarize this"}],
  "max_tokens": 500
}'`,
    endpoint: "https://api.anthropic.com/v1/messages",
    keyFormat: "sk-ant-..."
  },
  {
    id: "google",
    name: "Google",
    icon: "🔍",
    website: "https://ai.google.dev",
    description: "Gemini 2.5, 1.5 Pro, Flash - Multimodal AI models",
    models: ["gemini-2.5-flash", "gemini-1.5-pro", "gemini-1.5-flash"],
    steps: [
      "Sign in with Google to AI Studio",
      "Try it live in browser first",
      "Get your key from Google Cloud Console",
      "Use generativelanguage API"
    ],
    example: `curl -X POST \\
-H "Authorization: Bearer YOUR_API_KEY" \\
-H "Content-Type: application/json" \\
https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent \\
-d '{"contents":[{"parts":[{"text":"Explain quantum computing"}]}]}'`,
    endpoint: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
    keyFormat: "AIza..."
  },
  {
    id: "mistral",
    name: "Mistral",
    icon: "🚀",
    website: "https://mistral.ai",
    description: "Mistral-7B, Mixtral - Open-source models via OpenRouter",
    models: ["mixtral-8x7b", "mistral-7b", "mistral-medium"],
    steps: [
      "Visit openrouter.ai for hosted access",
      "Create account and get API key",
      "Use OpenAI-compatible format",
      "Select mistral models"
    ],
    example: `curl https://openrouter.ai/api/v1/chat/completions \\
-H "Authorization: Bearer YOUR_OPENROUTER_KEY" \\
-H "Content-Type: application/json" \\
-d '{
  "model": "mistralai/mixtral-8x7b-instruct",
  "messages": [{"role": "user", "content": "Give me startup ideas"}]
}'`,
    endpoint: "https://openrouter.ai/api/v1/chat/completions",
    keyFormat: "sk-or-..."
  }
];

const gateways = [
  {
    name: "OpenRouter",
    url: "https://openrouter.ai",
    description: "Access 50+ models from one API",
    features: ["Unified API", "Model fallbacks", "Cost optimization"]
  },
  {
    name: "Fireworks.ai",
    url: "https://fireworks.ai",
    description: "Fast inference for open-source models",
    features: ["High speed", "Open source", "Custom deployments"]
  },
  {
    name: "Groq",
    url: "https://console.groq.com",
    description: "Ultra-fast inference with specialized hardware",
    features: ["Lightning fast", "Low latency", "Hardware acceleration"]
  },
  {
    name: "Together.ai",
    url: "https://together.ai",
    description: "Collaborative AI model hosting",
    features: ["Multiple models", "Fine-tuning", "Custom training"]
  }
];

const tips = [
  {
    icon: Play,
    title: "Start in Playground Mode",
    description: "Always test your prompts in a web UI first before building code."
  },
  {
    icon: Zap,
    title: "Use Free Tiers First",
    description: "GPT-4o, Claude, Gemini, OpenRouter all offer generous free tokens monthly."
  },
  {
    icon: Lock,
    title: "Keep Your API Key Safe",
    description: "Never share your keys or commit them to GitHub!"
  },
  {
    icon: Code,
    title: "Explore SDKs",
    description: "Use openai, anthropic, or google-generativeai Python SDKs to simplify requests."
  }
];

export default function APIGuide() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Brain className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI LAB API Guide
            </h1>
            <Bot className="w-8 h-8 text-pink-400" />
          </div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Your comprehensive starter guide to LLM APIs. From chatbots to full app automation - 
            discover how to tap into AI superpowers using APIs.
          </p>
          <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-slate-400">
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>No experience required</span>
            </div>
            <div className="flex items-center space-x-1">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>Start with free tiers</span>
            </div>
            <div className="flex items-center space-x-1">
              <Lock className="w-4 h-4 text-blue-400" />
              <span>Secure by default</span>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <Card className="glass border-slate-600/30 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-slate-50">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>What You'll Need</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <div>
                  <div className="text-slate-50 font-medium">Email Account</div>
                  <div className="text-xs text-slate-400">Gmail, Outlook, etc.</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <div>
                  <div className="text-slate-50 font-medium">Payment Method</div>
                  <div className="text-xs text-slate-400">For paid tiers (optional)</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <div>
                  <div className="text-slate-50 font-medium">REST API Basics</div>
                  <div className="text-xs text-slate-400">Mostly POST and JSON</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <div>
                  <div className="text-slate-50 font-medium">API Testing Tool</div>
                  <div className="text-xs text-slate-400">Postman, curl, Python</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="providers" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 glass border-slate-600/50">
            <TabsTrigger value="providers" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500">
              API Providers
            </TabsTrigger>
            <TabsTrigger value="gateways" className="data-[state=active]:bg-slate-700/50">
              Gateways
            </TabsTrigger>
            <TabsTrigger value="tips" className="data-[state=active]:bg-slate-700/50">
              Pro Tips
            </TabsTrigger>
          </TabsList>

          {/* API Providers */}
          <TabsContent value="providers" className="space-y-6">
            {apiProviders.map((provider) => (
              <Card key={provider.id} className="glass border-slate-600/30">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{provider.icon}</div>
                      <div>
                        <CardTitle className="text-slate-50">{provider.name}</CardTitle>
                        <p className="text-slate-400 text-sm">{provider.description}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="glass border-slate-600/50"
                      onClick={() => window.open(provider.website, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Visit
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {provider.models.map((model) => (
                      <Badge key={model} variant="outline" className="bg-slate-700/50 text-slate-300 border-slate-600/50">
                        {model}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-slate-50 font-medium mb-2 flex items-center space-x-2">
                      <Key className="w-4 h-4" />
                      <span>Setup Steps</span>
                    </h4>
                    <ol className="space-y-1">
                      {provider.steps.map((step, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm text-slate-400">
                          <span className="w-5 h-5 bg-purple-500/20 text-purple-300 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-slate-50 font-medium flex items-center space-x-2">
                        <Code className="w-4 h-4" />
                        <span>Example Usage</span>
                      </h4>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(provider.example, provider.id)}
                        className="text-slate-400 hover:text-slate-200"
                      >
                        {copiedCode === provider.id ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    <pre className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4 text-sm text-slate-300 overflow-x-auto">
                      <code>{provider.example}</code>
                    </pre>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Endpoint:</span>
                      <code className="ml-2 text-slate-300 bg-slate-800/50 px-2 py-1 rounded text-xs">
                        {provider.endpoint}
                      </code>
                    </div>
                    <div>
                      <span className="text-slate-400">Key Format:</span>
                      <code className="ml-2 text-slate-300 bg-slate-800/50 px-2 py-1 rounded text-xs">
                        {provider.keyFormat}
                      </code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Gateways */}
          <TabsContent value="gateways" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-50 mb-2">Universal API Gateways</h2>
              <p className="text-slate-400">Access multiple LLMs from one place</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6">
              {gateways.map((gateway) => (
                <Card key={gateway.name} className="glass border-slate-600/30">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-50">{gateway.name}</h3>
                        <p className="text-slate-400 text-sm">{gateway.description}</p>
                      </div>
                      <Globe className="w-5 h-5 text-purple-400" />
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-slate-300 mb-2">Features:</h4>
                        <div className="flex flex-wrap gap-2">
                          {gateway.features.map((feature) => (
                            <Badge key={feature} variant="outline" className="bg-purple-500/10 text-purple-300 border-purple-500/30">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Button
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                        onClick={() => window.open(gateway.url, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit {gateway.name}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tips */}
          <TabsContent value="tips" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-50 mb-2">Pro Tips for Success</h2>
              <p className="text-slate-400">Essential best practices for working with LLM APIs</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6">
              {tips.map((tip) => (
                <Card key={tip.title} className="glass border-slate-600/30">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <tip.icon className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-50 mb-2">{tip.title}</h3>
                        <p className="text-slate-400">{tip.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card className="glass border-yellow-500/30 bg-yellow-500/5">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-300 mb-2">Security Warning</h3>
                    <p className="text-slate-300">
                      Never expose your API keys in client-side code or commit them to version control. 
                      Always use environment variables and server-side proxies for production applications.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}