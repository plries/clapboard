import type { Metadata } from "next";
import { DM_Sans, Space_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "clapboard | movie library",
  description: "find your favorites and discover new ones with clapboard!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${dmSans.variable} ${spaceMono.variable} mx-auto max-w-[1440px] overflow-hidden bg-slate-950 lowercase antialiased`}
      >
        <div
          className="fixed top-0 left-0 z-[-1] h-full w-full bg-cover bg-center bg-no-repeat opacity-50"
          style={{ backgroundImage: "url(/texture.jpg)" }}
        />
        {children}
      </body>
    </html>
  );
}
