
import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://whotheimposter.vercel.app"),
  title: "Who Is the Imposter? Play the Free Online Party Game",
  description:
    "Play Who Is the Imposter, a free online party game for 3–12 players. Share secret words, give clues, and catch the imposter with friends.",
  applicationName: "Who Is the Imposter",
  manifest: "/manifest.json",
  keywords: [
    "imposter game",
    "who is the imposter game",
    "imposter game online",
    "free imposter game",
    "online party games",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Imposter",
  },
  openGraph: {
    title: "Who Is the Imposter? Play the Free Online Party Game",
    description:
      "Play Who Is the Imposter, a free online party game for 3–12 players. Share secret words, give clues, and catch the imposter with friends.",
    url: "https://whotheimposter.vercel.app",
    type: "website",
    siteName: "Who Is the Imposter",
    images: [
      {
        url: "/icons/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "Who Is the Imposter game icon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Who Is the Imposter? Play the Free Online Party Game",
    description:
      "Play Who Is the Imposter, a free online party game for 3–12 players. Share secret words, give clues, and catch the imposter with friends.",
    images: ["/icons/icon-512x512.png"],
  },
  verification: {
    google: "K207YFi4QlO6zxs9_bwt_5PLHgE37lr8cWnDk502cHc",
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f6f0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          href="/icons/icon-192x192.png"
        />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>

      <body className={`${geist.className} antialiased`}>
        {children}

        <GoogleAnalytics gaId="G-053P22C58N" />
      </body>
    </html>
  );
}