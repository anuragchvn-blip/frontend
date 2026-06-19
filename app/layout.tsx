import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

export const metadata: Metadata = {
  title: "Cryptik: Real-Time Satellite Tracking & Collision Avoidance Platform",
  description: "Building the world's most advanced optical surveillance network for LEO. Track 24,000+ space objects in real-time with physics-informed drag modeling and triple-validated collision risk assessment.",
  keywords: "space debris tracking,satellite collision avoidance,space traffic management,leo orbit satellites,satellite constellation management,orbital debris monitoring,conjunction assessment,space domain awareness,space company india,indian space technology,bangalore space startup,tle data,two line element,space analytics,satellite tracking software,kessler syndrome,space situational awareness,spacetech india,real-time satellite tracking system,automated collision avoidance system,space debris mitigation solutions,leo satellite constellation management,indian space situational awareness,bangalore aerospace companies,commercial space traffic management,orbital data analytics platform,SSA operations platform,conjunction analysis software,satellite tracking system,orbital debris detection,defense satellite tracking,low earth orbit satellite,satellite map,live satellite tracking,space debris,mega constellation,spacetech startups in india",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Cryptik: Real-Time Satellite Tracking & Collision Avoidance",
    description: "Track 24,000+ space objects with physics-informed drag modeling. Triple-validated collision risk and automated alerts for operators worldwide.",
    url: "https://www.cryptik.tech",
    siteName: "Cryptik SSA Systems",
    images: [
      {
        url: "https://www.cryptik.tech/logo.png",
        width: 192,
        height: 192,
        alt: "Cryptik SSA Systems - Space Traffic Management Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cryptik: Real-Time Satellite Tracking & Collision Avoidance",
    description: "Track 24,000+ space objects with physics-informed drag modeling. Triple-validated collision risk and automated alerts for operators worldwide.",
    creator: "@cryptik_ssa",
    images: ["https://www.cryptik.tech/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
