import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/dev/navbar";
import { Toaster } from "@/components/ui/toaster";
import { auth } from "@/auth";
import SessionProvider from "@/components/store/session-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "invoicing app",
  description: "invoicing management",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden `}
      >
        <SessionProvider session={session}>
          <Navbar />
          <div className="mx-auto w-full max-w-4xl p-2 md:p-0">{children}</div>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
