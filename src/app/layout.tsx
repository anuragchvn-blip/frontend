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
  metadataBase: new URL('https://www.cryptik.tech'),
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
    url: 'https://www.cryptik.tech',
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
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/apple-icon.png",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Cryptik SSA Systems",
                "url": "https://www.cryptik.tech",
                "logo": "https://www.cryptik.tech/logo.png",
                "description": "Institutional-grade Space Situational Awareness platform.",
                "sameAs": [
                  "https://twitter.com/cryptik_ssa",
                  "https://github.com/anuragchvn-blip"
                ],
                "contactPoint": {
                  "@type": "ContactPoint",
                  "contactType": "customer service",
                  "email": "anuragchvn1@gmail.com"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Cryptik SSA",
                "url": "https://www.cryptik.tech",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://www.cryptik.tech/catalog?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "ItemList",
                "name": "Platform Navigation",
                "itemListElement": [
                  {
                    "@type": "SiteNavigationElement",
                    "position": 1,
                    "name": "Team",
                    "url": "https://www.cryptik.tech/team"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 2,
                    "name": "Whitepaper",
                    "url": "https://www.cryptik.tech/resources/whitepaper"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 3,
                    "name": "Academic Grants",
                    "url": "https://www.cryptik.tech/#academic"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 4,
                    "name": "Tools",
                    "url": "https://www.cryptik.tech/tools"
                  }
                ]
              }
            ])
          }}
        />
        <TrackingProvider>
          {children}
        </TrackingProvider>
        <Analytics />
      </body>
    </html>
  );
}



