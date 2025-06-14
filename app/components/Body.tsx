"use client";
import MobileNavbar from "./MobileNavbar";
import Banner from "./Banner";
import Navbar from "./Navbar";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { useAppSelector } from "@/lib/hooks";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const Body = (props: { children: any }) => {
  const { children } = props;
  const view = useAppSelector((state) => state.view);
  const mobileView = view[0].mobileView;

  return (
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
        <main className="py-[4vh] px-[5vw]">{children}</main>
        {mobileView && <MobileNavbar />}
      </ThemeProvider>
    </body>
  );
};

export default Body;
