import Navbar from "@/components/Navbar";

export const metadata = {
  title: "SSA Use Cases | Government & Commercial",
  description: "Real-world applications of Cryptik SSA platform for defense and commercial sectors.",
};

export default function UseCasesPage() {
  return (
    <main className="min-h-screen bg-space-black text-white selection:bg-white selection:text-space-black relative">
        <div className="atmospheric-bg" />
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 pt-32 relative z-10">
            <h1 className="text-4xl md:text-6xl font-medium tracking-tighter mb-8">Use Cases</h1>
            <div className="p-12 border border-white/10 rounded-2xl bg-white/[0.02] text-center">
                <p className="text-stellar-grey">Explore how our platform serves defense and commercial operators.</p>
            </div>
        </div>
    </main>
  );
}
