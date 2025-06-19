import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Providers } from "@/store/provider";

import "./globals.css";
import Navbar from "@/components/root components/Navbar";
import Footer from "@/components/root components/Footer";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hackverse",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <nav className="object-cover">
            <Navbar />
          </nav>
          <div className="mt-9 w-full">{children}</div>
          <footer>
            <Footer />
          </footer>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
