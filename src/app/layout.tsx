import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { TrackingProvider } from "@/context/TrackingContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.cryptik.space'),
  title: {
    default: "Enterprise Space Situational Awareness Platform | Cryptik SSA Systems",
    template: "%s | Cryptik SSA Systems"
  },
  description: "Institutional-grade Space Situational Awareness (SSA) platform providing real-time satellite tracking, orbital debris detection, and collision avoidance analysis for government and commercial operators.",
  keywords: [
    "Satellite tracking system", 
    "Space situational awareness platform", 
    "Orbital debris detection", 
    "Conjunction analysis software", 
    "SSA operations platform",
    "Real-time satellite monitoring",
    "Space debris tracking",
    "Collision avoidance system",
    "Orbital analytics platform",
    "Defense satellite tracking"
  ],
  openGraph: {
    title: "Enterprise Space Situational Awareness Platform",
    description: "Real-time satellite tracking and orbital debris detection for mission-critical space operations.",
    url: 'https://www.cryptik.space',
    siteName: 'Cryptik SSA Systems',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Enterprise Space Situational Awareness Platform",
    description: "Institutional-grade SSA platform for real-time tracking and orbital safety.",
    creator: '@cryptik_ssa', 
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable} antialiased selection:bg-white selection:text-space-black`}
      >
        <TrackingProvider>
          {children}
        </TrackingProvider>
        <Analytics />
      </body>
    </html>
  );
}



