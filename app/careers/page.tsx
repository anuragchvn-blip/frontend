import type { Metadata } from "next";
import CareersClient from "./careers-client";

export const metadata: Metadata = {
  title: "Careers | Cryptik | Onboard Space Navigation Systems",
  description: "Join Cryptik to build the next generation of onboard spacecraft navigation systems. We are recruiting Spacecraft System Engineers, Hardware Researchers, and Content Interns for our villa-based hardware lab.",
  keywords: "space careers, spacecraft system engineer, hardware researcher, content intern, hardware storytelling, satellite hardware jobs, spacetech jobs bangalore, space startup hiring, aerospace engineering jobs, custom circuits prototyping, orbit determination jobs",
  openGraph: {
    title: "Careers | Cryptik | Onboard Space Navigation Systems",
    description: "Join Cryptik to build the next generation of onboard spacecraft navigation systems. We are recruiting Spacecraft System Engineers, Hardware Researchers, and Content Interns for our villa-based hardware lab.",
    url: "https://www.cryptik.tech/careers",
    siteName: "Cryptik",
    images: [
      {
        url: "https://www.cryptik.tech/logo.png",
        width: 192,
        height: 192,
        alt: "Cryptik Careers",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers | Cryptik | Onboard Space Navigation Systems",
    description: "Join Cryptik to build the next generation of onboard spacecraft navigation systems. We are recruiting Spacecraft System Engineers, Hardware Researchers, and Content Interns for our villa-based hardware lab.",
    images: ["https://www.cryptik.tech/logo.png"],
  },
};

export default function CareersPage() {
  return <CareersClient />;
}
