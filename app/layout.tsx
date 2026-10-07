import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import AudioPlayer from "@/components/AudioPlayer";
import Preloader from "@/components/Preloader";
import { site } from "@/lib/site";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const anton = Anton({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.meta.title,
  description: site.meta.description,
  keywords: [...site.meta.keywords],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: "TRISHULAM Martial Arts",
    title: site.meta.title,
    description: site.meta.description,
    locale: "en_IN",
    images: [
      {
        url: "/media/og-icon.jpg",
        width: 1024,
        height: 1024,
        alt: "TRISHULAM Martial Arts — the trident emblem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.meta.title,
    description: site.meta.description,
    images: ["/media/og-icon.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#060607",
  colorScheme: "dark",
};

/** JSON-LD: tells Google this is a martial arts school with a real founder,
 *  phone and Instagram — enables rich results for brand searches. */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "TRISHULAM Martial Arts",
  alternateName: "Trishulam",
  url: site.url,
  image: `${site.url}/media/photos/p02.jpg`,
  logo: `${site.url}/media/logo.webp`,
  slogan: "Strike first. Strike hard. No mercy.",
  description: site.meta.description,
  telephone: "+918949924203",
  sameAs: [site.contact.instagramLink],
  address: { "@type": "PostalAddress", addressCountry: "IN" },
  founder: {
    "@type": "Person",
    name: "Abhijeet Sharma",
    jobTitle: "Sensei, 1st Dan Black Belt",
  },
  sport: "Martial Arts",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${anton.variable} antialiased`}
    >
      <body className="grain bg-bg text-fg">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Preloader />
        <SmoothScroll>{children}</SmoothScroll>
        <AudioPlayer />
      </body>
    </html>
  );
}
