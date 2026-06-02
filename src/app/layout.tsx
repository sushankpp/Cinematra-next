import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import { cn } from "@/lib/util";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

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
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col bg-secondary-Body">
        <NextTopLoader color="#e50914" height={3} showSpinner={false} />
        <AuthProvider>
          <Header />

          <main>
          {children}
          </main>
          <Toaster position="top-right" richColors />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
