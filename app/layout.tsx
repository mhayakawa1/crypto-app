"use client";
import StoreProvider from "./StoreProvider";
import Link from "next/link";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Html, Body } from "./globalStyles";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Html lang="en">
      <StoreProvider>
        <Body className={`${spaceGrotesk.className} antialiased`}>
          <Link href="/">Home</Link>
          <Link href="/portfolio">Portfolio</Link>
          {children}
        </Body>
      </StoreProvider>
    </Html>
  );
}
