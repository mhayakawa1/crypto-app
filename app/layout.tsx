"use client";
import StoreProvider from "./StoreProvider";
import Navbar from "./components/Navbar";
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
          <header>
            <Navbar />
          </header>
          {children}
        </Body>
      </StoreProvider>
    </Html>
  );
}
