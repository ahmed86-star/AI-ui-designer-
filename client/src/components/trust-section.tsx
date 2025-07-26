import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Zap, Shield, Award, TrendingUp } from "lucide-react";

export default function TrustSection() {
  const stats = [
    {
      icon: Users,
      value: "30+",
      label: "Developers",
      description: "Building with AI"
    },
    {
      icon: Zap,
      value: "150+",
      label: "UI Components",
      description: "Generated successfully"
    },
    {
      icon: Star,
      value: "4.8/5",
      label: "Rating",
      description: "From early users"
    },
    {
      icon: TrendingUp,
      value: "Growing",
      label: "Community",
      description: "Join us early"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption and data protection"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate professional UIs in seconds"
    },
    {
      icon: Award,
      title: "Industry Leading",
      description: "Trusted by top companies worldwide"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="glass border-slate-600/30 hover:border-purple-500/30 transition-all duration-300">
            <CardContent className="p-4 text-center">
              <div className="flex justify-center mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="font-bold text-lg text-slate-50">{stat.value}</div>
              <div className="font-medium text-sm text-slate-300">{stat.label}</div>
              <div className="text-xs text-slate-400 mt-1">{stat.description}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features */}
      <div className="grid lg:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <Card key={index} className="glass border-slate-600/30 hover:border-purple-500/30 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center animate-glow">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-50 mb-1">{feature.title}</h4>
                  <p className="text-sm text-slate-400">{feature.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trust Badges */}
      <div className="flex flex-wrap justify-center gap-3">
        <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-3 py-1">
          ✓ SOC 2 Certified
        </Badge>
        <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-3 py-1">
          ✓ GDPR Compliant
        </Badge>
        <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-3 py-1">
          ✓ 24/7 Support
        </Badge>
        <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 px-3 py-1">
          ✓ Enterprise Ready
        </Badge>
      </div>

      {/* Testimonial */}
      <Card className="glass border-slate-600/30">
        <CardContent className="p-6 text-center">
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
            ))}
          </div>
          <blockquote className="text-slate-300 italic mb-4">
            "This AI UI Designer transformed our development process. We can prototype 
            and build beautiful interfaces in minutes instead of hours."
          </blockquote>
          <div className="text-sm">
            <div className="font-semibold text-slate-50">Sarah Chen</div>
            <div className="text-slate-400">Lead Designer at TechCorp</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}