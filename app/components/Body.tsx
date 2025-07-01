"use server";
import Banner from "./Banner";
import BannerItems from "./BannerItems";
import { getGlobalData } from "@/lib/features/api/getGlobalData";
import { getCoinsListData } from "@/lib/features/api/getCoinsListData";
import Navbar from "./Navbar";
import Main from "./Main";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Space_Grotesk } from "next/font/google";
import { Suspense } from "react";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

async function Body(props: { children: any }) {
  const { children } = props;
  let bannerData = {
    noData: true,
    coins: 0,
    marketCap: 0,
    totalVolume: 0,
    btc: 0,
    eth: 0,
  };
  if (bannerData.noData) {
    const globalData = await getGlobalData();
    if (globalData.data) {
      const {
        data: {
          active_cryptocurrencies,
          total_market_cap,
          total_volume,
          market_cap_percentage,
        },
      } = globalData;
      bannerData = {
        noData: false,
        coins: active_cryptocurrencies,
        marketCap: total_market_cap,
        totalVolume: total_volume,
        btc: market_cap_percentage.btc,
        eth: market_cap_percentage.eth,
      };
    }
  }

  let initialCoinsList: any = [];
  if (!initialCoinsList.length) {
    const coinsList = await getCoinsListData();
    initialCoinsList = [...coinsList];
  }

  return (
    <Suspense>
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
            <Banner>
              <BannerItems bannerData={bannerData} />
            </Banner>
            <Navbar />
          </header>
          <Main initialCoinsList={initialCoinsList}>{children}</Main>
        </ThemeProvider>
      </body>
    </Suspense>
  );
}

export default Body;
