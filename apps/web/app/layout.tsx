import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import GlassNavbar from "@/components/navbar/page";
import Footer from "@/components/footer/page";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Chat app",
  description: "Crefted by Ayuxx",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body  className= {`${geistSans.variable} ${geistMono.variable} bg-black`}>
        <GlassNavbar/>
        {children}
        
      </body>
    </html>
  );
}
