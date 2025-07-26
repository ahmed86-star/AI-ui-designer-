import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Home, Book, Code, Sparkles, User, Users } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();

  const navItems = [
    {
      path: "/",
      label: "UI Designer",
      icon: Sparkles,
      description: "Generate UI with AI"
    },
    {
      path: "/api-guide",
      label: "API Guide",
      icon: Book,
      description: "LLM API documentation"
    },
    {
      path: "/collaborate",
      label: "Collaborate",
      icon: Users,
      description: "Real-time collaboration"
    },
    {
      path: "/about",
      label: "About",
      icon: User,
      description: "Meet the creator"
    }
  ];

  return (
    <>
      {/* Trust Banner */}
      <div className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-green-500/10 border-b border-purple-500/20 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="text-purple-300 font-medium text-sm">More projects dropping soon</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:block text-center">
                <p className="text-sm text-slate-300">
                  Join thousands of developers creating amazing UIs with AI.
                </p>
                <p className="text-xs text-slate-400">
                  Your project could be featured next!
                </p>
              </div>
              
              <Link href="/">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 text-sm font-medium">
                  Start Building
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <nav className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Code className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI UI Designer
              </span>
            </div>
          </Link>

          <div className="flex items-center space-x-2">
            {navItems.map((item) => {
              const isActive = location === item.path;
              return (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={
                      isActive
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        : "text-slate-300 hover:text-slate-50 hover:bg-slate-700/50"
                    }
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      </nav>
    </>
  );
}