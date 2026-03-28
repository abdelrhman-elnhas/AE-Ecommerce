import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { QueryClientWrapper } from "@/components/QueryClientWrapper";
import NextAuthProvider from "../providers/NextAuthProvider";
import { Providers } from "@/providers/Providers";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AE Ecommerce",
  description: "AE Ecommerce Website built with Next.js, TypeScript, Tailwind CSS, and NextAuth.js for authentication.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
        <NextAuthProvider>
          <QueryClientWrapper>
            <Navbar />
            <main className="flex-1 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
            <Footer />
          </QueryClientWrapper>
        </NextAuthProvider>
        </Providers>

      </body>
    </html>
  );
}
