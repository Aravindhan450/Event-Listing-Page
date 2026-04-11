import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "VickyBytes — Live Tech Events Platform",
  description: "Discover and join live summits, workshops, and bootcamps from senior engineers. Free to attend.",
  keywords: "live events, tech events, developer platform, coding workshops, AI/ML, DevOps, cloud summit",
  openGraph: {
    title: "VickyBytes — Live Tech Events Platform",
    description: "Discover and join live summits, workshops, and bootcamps from senior engineers. Free to attend.",
    type: "website",
    url: "https://vickybytes.vercel.app",
    images: [
      "https://res.cloudinary.com/dvsklwfcf/image/upload/v1775828549/Kubernetes_robot_in_a_futuristic_city_dzsdyg.png",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VickyBytes — Live Tech Events Platform",
    description: "Discover and join live summits, workshops, and bootcamps from senior engineers. Free to attend.",
    images: [
      "https://res.cloudinary.com/dvsklwfcf/image/upload/v1775828549/Kubernetes_robot_in_a_futuristic_city_dzsdyg.png",
    ],
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#4f46e5',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} bg-surface text-on-background min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
