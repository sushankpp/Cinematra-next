import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cineमात्र - Share your cinematic experiences",
  description:
    "Cineमात्र is a platform for movie enthusiasts to share their cinematic experiences, reviews, and recommendations. Join our community and discover new films, connect with fellow cinephiles, and express your love for cinema in a vibrant and engaging environment.",
  icons: {
    icon: "/favicon.png",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream-100">
        <AuthProvider>
          <Header />
          <main>
          {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
