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
      <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-b border-green-500/20 py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-300 font-medium">30+ developers trust us</span>
              </div>
              <div className="w-px h-3 bg-slate-600"></div>
              <span className="text-blue-300">2.8k views</span>
              <div className="w-px h-3 bg-slate-600"></div>
              <span className="text-purple-300">150+ likes</span>
              <div className="w-px h-3 bg-slate-600"></div>
              <span className="text-yellow-300">30+ projects</span>
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