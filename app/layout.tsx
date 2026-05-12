import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lawu Media | Digital-First Marketing Agency",
  description:
    "We combine data-driven digital marketing with authentic influencer marketing to help brands dominate the digital landscape. Based in Sandton, Johannesburg.",
  keywords: [
    "digital marketing",
    "influencer marketing",
    "social media management",
    "South Africa",
    "Johannesburg",
    "brand growth",
    "content creation",
  ],
  openGraph: {
    title: "Lawu Media | Digital-First Marketing Agency",
    description:
      "We combine data-driven digital marketing with authentic influencer marketing to help brands dominate the digital landscape.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-text-primary">
        {children}
      </body>
    </html>
  );
}
