"use client";
import StoreProvider from "./StoreProvider";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import { ThemeProvider } from "../components/ui/theme-provider";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

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
    <html className="h-full w-full" lang="en" suppressHydrationWarning>
      <StoreProvider>
        <body
          className={`${spaceGrotesk.className} w-full antialiased bg-[--light-gray] dark:bg-[--black-russian] text-white`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <header className="flex flex-col gap-[2vh] pb-[2vh] bg-white dark:bg-transparent">
              <Banner />
              <Navbar />
            </header>
            <main className="py-[4vh] px-[8vw]">{children}</main>
          </ThemeProvider>
        </body>
      </StoreProvider>
    </html>
  );
}
