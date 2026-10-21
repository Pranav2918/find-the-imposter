import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Find the Imposter — Party Game",
  description: "Pass the phone, share a secret word, and figure out who is bluffing. Choose from your favorite categories.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Imposter",
  },
  openGraph: {
    title: "Find the Imposter 🕵️ — Party Edition",
    description: "Party game for cafes and friend groups. Pass the phone, find the imposter!",
    type: "website",
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
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${geist.className} antialiased`}>{children}</body>
    </html>
  );
}
