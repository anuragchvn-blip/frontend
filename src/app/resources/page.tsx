import Link from "next/link";
import Navbar from "@/components/Navbar";
import { FileText, BookOpen, Layers, Zap, ArrowRight } from "lucide-react";

export const metadata = {
  title: "SSA Resources | Satellite Tracking Knowledge Base",
  description: "Technical documentation, white papers, and industry insights for Space Situational Awareness.",
};

export default function ResourcesPage() {
  const sections = [
    {
      title: "Blog & Insights",
      description: "Latest updates on orbital mechanics, debris tracking, and SSA industry trends.",
      link: "/resources/blog",
      icon: Layers,
    },
    {
      title: "White Papers",
      description: "Deep-dive technical reports on conjunction analysis algorithms and sensor fusion.",
      link: "/resources/white-papers",
      icon: FileText,
    },
    {
      title: "Use Cases",
      description: "Real-world applications for government defense and commercial satellite operators.",
      link: "/resources/use-cases",
      icon: Zap,
    },
    {
      title: "Knowledge Base",
      description: "Tutorials, documentation, and fundamental concepts of orbital dynamics.",
      link: "/resources/knowledge-base",
      icon: BookOpen,
    },
  ];

  return (
    <main className="min-h-screen bg-space-black text-white selection:bg-white selection:text-space-black relative overflow-hidden">
        <div className="atmospheric-bg" />
        <Navbar />
        
        <div className="max-w-7xl mx-auto px-4 pt-32 pb-20 relative z-10">
            <div className="mb-20">
                <span className="text-technical mb-4 block">Knowledge Center</span>
                <h1 className="text-5xl md:text-7xl font-sans font-medium text-white tracking-tighter uppercase mb-6">
                    Resources
                </h1>
                <p className="text-xl text-stellar-grey max-w-2xl font-light">
                    Comprehensive documentation and industry analysis for the next generation of space operations.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {sections.map((section, idx) => (
                    <Link href={section.link} key={idx} className="group relative p-10 glass-panel border border-white/10 rounded-2xl hover:bg-white/[0.05] transition-all overflow-hidden hud-corner">
                        <span className="hidden" />
                        <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowRight className="text-white w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                        </div>
                        
                        <div className="mb-6 w-12 h-12 rounded-lg bg-cosmic-blue/10 flex items-center justify-center border border-cosmic-blue/20">
                            <section.icon className="w-6 h-6 text-cosmic-blue" />
                        </div>
                        
                        <h2 className="text-2xl font-medium mb-3 group-hover:text-cosmic-blue transition-colors">{section.title}</h2>
                        <p className="text-stellar-grey font-light leading-relaxed">
                            {section.description}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    </main>
  );
}
