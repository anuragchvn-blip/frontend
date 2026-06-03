import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { ScrollReveal } from "@/components/sections/ScrollReveal";
import { Editorial } from "@/components/sections/Editorial";
import { Features } from "@/components/sections/Features";
import { CubeSat } from "@/components/sections/CubeSat";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <ScrollReveal />
      <Editorial />
      <Features />
      <CubeSat />
      <CTA />
      <Footer />
    </>
  );
}
