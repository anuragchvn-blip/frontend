import Navbar from "@/components/Navbar";

export const metadata = {
  title: "SSA White Papers | Technical Documentation",
  description: "In-depth technical analysis and white papers on orbital mechanics and debris tracking.",
};

export default function WhitePapersPage() {
  return (
    <main className="min-h-screen bg-space-black text-white selection:bg-white selection:text-space-black relative">
        <div className="atmospheric-bg" />
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 pt-32 relative z-10">
            <h1 className="text-4xl md:text-6xl font-medium tracking-tighter mb-8">White Papers</h1>
            <div className="p-12 border border-white/10 rounded-2xl bg-white/[0.02] text-center">
                <p className="text-stellar-grey">Technical reports and research papers will be available here.</p>
            </div>
        </div>
    </main>
  );
}
