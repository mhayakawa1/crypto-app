"use client";
import { useState, useEffect } from "react";
import StoreProvider from "./StoreProvider";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import MobileNavbar from "./components/MobileNavbar";
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
  const [initialRender, setInitialRender] = useState(true);
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640 && !mobileView) {
        setMobileView(true);
      } else if (window.innerWidth >= 640 && mobileView) {
        setMobileView(false);
      }
    };
    window.addEventListener("resize", handleResize);

    if (initialRender) {
      handleResize();
      setInitialRender(false);
    }
  }, [initialRender, mobileView]);

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
            <div className="">
              <header className="flex flex-col gap-[2vh] pb-[2vh] bg-white dark:bg-transparent">
                <Banner />
                <Navbar />
              </header>
              <main className="py-[4vh] px-[8vh]">{children}</main>
              {mobileView && <MobileNavbar />}
            </div>
          </ThemeProvider>
        </body>
      </StoreProvider>
    </html>
  );
}
