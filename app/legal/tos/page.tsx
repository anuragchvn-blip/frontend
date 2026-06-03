import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NoiseBackground } from "@/components/ui/noise-background";

export default function TermsOfService() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen w-full bg-cream pt-32 pb-24 px-6 flex flex-col items-center">
        <div className="w-full max-w-3xl z-10">
          <div className="mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-black mb-4">
              Terms of Service
            </h1>
            <p className="text-sm font-semibold text-black/40 uppercase tracking-widest">
              Last updated: May 5, 2026
            </p>
          </div>

          <NoiseBackground
            containerClassName="w-full rounded-3xl p-8 md:p-12 bg-white/50 border border-black/5"
            gradientColors={["rgba(0,0,0,0.02)", "rgba(0,0,0,0.05)", "rgba(0,0,0,0.01)"]}
            noiseIntensity={0.5}
            group={false}
          >
            <div className="prose max-w-none space-y-12">
              <section>
                <h2 className="font-display text-2xl font-bold text-black mb-4">1. Acceptance of Terms</h2>
                <p className="text-black/70 leading-relaxed">
                  By accessing or using Cryptik ("the Service"), provided by Cryptik Tech. ("we", "us", or "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-black mb-4">2. Description of Service</h2>
                <p className="text-black/70 leading-relaxed">
                  Cryptik is a spacetech company developing onboard systems for orbit determination, perception, and state estimation. We currently offer information about our hardware and software stack. Future updates may include access to data services and deployment portals.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-black mb-4">3. User Information & Communication</h2>
                <p className="text-black/70 leading-relaxed">
                  To use certain features of the Service, you may be required to provide your email address. You agree that we may use your email address to send you service-related notifications and updates.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-black mb-4">4. Intellectual Property</h2>
                <p className="text-black/70 leading-relaxed">
                  All content, features, and functionality of the Service, including but not limited to the logo, design, text, and algorithms, are the exclusive property of Cryptik Tech. and are protected by international copyright and trademark laws.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-black mb-4">5. Limitation of Liability</h2>
                <p className="text-black/70 leading-relaxed">
                  Cryptik Tech. shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Service. The Service is provided "as is" without warranty of any kind.
                </p>
              </section>

              <section className="pt-8 border-t border-black/10">
                <h2 className="font-display text-2xl font-bold text-black mb-4">Contact Us</h2>
                <p className="text-black/70 leading-relaxed">
                  If you have any questions about these Terms, please contact us at:
                  <br />
                  <a href="mailto:team@cryptik.tech" className="text-blue font-bold hover:underline mt-2 inline-block">team@cryptik.tech</a>
                </p>
              </section>
            </div>
          </NoiseBackground>
        </div>
      </main>
      <Footer />
    </>
  );
}
