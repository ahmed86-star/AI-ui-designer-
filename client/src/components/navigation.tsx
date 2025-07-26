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
      {/* Comprehensive Trust Section */}
      <div className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-green-500/10 border-b border-purple-500/20 py-6">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Why developers trust us
            </h2>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-1">30+</div>
              <div className="text-sm text-slate-300 font-medium">Developers</div>
              <div className="text-xs text-slate-400">Building with AI</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-1">150+</div>
              <div className="text-sm text-slate-300 font-medium">UI Components</div>
              <div className="text-xs text-slate-400">Generated successfully</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-1">4.8/5</div>
              <div className="text-sm text-slate-300 font-medium">Rating</div>
              <div className="text-xs text-slate-400">From early users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-1">Growing</div>
              <div className="text-sm text-slate-300 font-medium">Community</div>
              <div className="text-xs text-slate-400">Join us early</div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-slate-200 mb-2">Enterprise Security</h3>
              <p className="text-sm text-slate-400 mb-3">Bank-level encryption and data protection</p>
              <div className="space-y-1">
                <div className="flex items-center text-xs text-green-400">
                  <span className="mr-2">✓</span>SOC 2 Certified
                </div>
                <div className="flex items-center text-xs text-green-400">
                  <span className="mr-2">✓</span>GDPR Compliant
                </div>
                <div className="flex items-center text-xs text-green-400">
                  <span className="mr-2">✓</span>24/7 Support
                </div>
                <div className="flex items-center text-xs text-green-400">
                  <span className="mr-2">✓</span>Enterprise Ready
                </div>
              </div>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-slate-200 mb-2">Lightning Fast</h3>
              <p className="text-sm text-slate-400">Generate professional UIs in seconds</p>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-slate-200 mb-2">Industry Leading</h3>
              <p className="text-sm text-slate-400">Trusted by top companies worldwide</p>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 mb-6">
            <div className="text-center">
              <p className="text-slate-300 italic mb-4">
                "This AI UI Designer transformed our development process. We can prototype and build beautiful interfaces in minutes instead of hours."
              </p>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">SC</span>
                </div>
                <div>
                  <div className="text-slate-200 font-medium text-sm">Sarah Chen</div>
                  <div className="text-slate-400 text-xs">Lead Designer at TechCorp</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link href="/">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 text-lg font-medium">
                Start Building
              </Button>
            </Link>
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