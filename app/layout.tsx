"use client";
import StoreProvider from "./StoreProvider";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Html } from "./globalStyles";

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
        <body
          className={`${spaceGrotesk.className} antialiased bg-[#13121a] text-white`}
        >
          <header className="flex flex-col gap-[2vh]">
            <Banner />
            <Navbar />
          </header>
          <main className="py-[4vh] px-[8vh]">{children}</main>
        </body>
      </StoreProvider>
    </Html>
  );
}
