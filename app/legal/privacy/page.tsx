import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NoiseBackground } from "@/components/ui/noise-background";

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen w-full bg-cream pt-32 pb-24 px-6 flex flex-col items-center">
        <div className="w-full max-w-3xl z-10">
          <div className="mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-black mb-4">
              Privacy Policy
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
                <h2 className="font-display text-2xl font-bold text-black mb-4">1. Information We Collect</h2>
                <p className="text-black/70 leading-relaxed">
                  Currently, we only collect your email address when you sign up for our communications or contact us. In the future, we may collect additional information such as your name and technical data related to your use of our hardware or software interfaces.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-black mb-4">2. How We Use Your Information</h2>
                <p className="text-black/70 leading-relaxed mb-4">
                  We use your email address to:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-black/70">
                  <li>Send you mission updates and product announcements.</li>
                  <li>Provide support and respond to your inquiries.</li>
                  <li>Communicate important service changes and security alerts.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-black mb-4">3. Data Sharing & Disclosure</h2>
                <p className="text-black/70 leading-relaxed">
                  We do not sell your personal information to third parties. We only share data with trusted service providers (like email delivery services) necessary to operate our business, or when required by law.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-black mb-4">4. Security</h2>
                <p className="text-black/70 leading-relaxed">
                  We implement industry-standard security measures to protect your information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section className="pt-8 border-t border-black/10">
                <h2 className="font-display text-2xl font-bold text-black mb-4">Contact Us</h2>
                <p className="text-black/70 leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at:
                  <br />
                  <a href="mailto:team@cryptik.space" className="text-blue font-bold hover:underline mt-2 inline-block">team@cryptik.space</a>
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
