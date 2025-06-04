"use client";
import { useState, useEffect } from "react";
import { useCompareCoinsQuery } from "@/lib/features/api/apiSlice";
import { formatCompareCoins } from "@/lib/format/formatCompareCoins";
import AreaChartComponent from "./AreaChartComponent";
import BarChartComponent from "./BarChartComponent";
import CarouselComponent from "./CarouselComponent";
import ChartContainer from "./ChartContainer";
import TableComponent from "./TableComponent";
import TimeRangeButtons from "./TimeRangeButtons";
import CompareButton from "./CompareButton";

const Coins = (props: { currency: any }) => {
  const { currency } = props;
  const [compareData, setCompareData] = useState(false);
  const [days, setDays] = useState(1);
  const [intervalDaily, setIntervalDaily] = useState(false);
  const [activeCoins, setActiveCoins] = useState([
    {
      id: "bitcoin",
      name: "",
      symbol: "",
      price: 0,
      volumeMarketCap: { totalVolume: 0 },
    },
  ]);
  const [initialRender, setInitialRender] = useState(true);
  const [coinBId, setCoinBId] = useState("");
  const [pricesA, setPricesA]: any[] = useState([]);
  const [volumesA, setVolumesA]: any[] = useState([]);
  const [pricesB, setPricesB]: any[] = useState([]);
  const [volumesB, setVolumesB]: any[] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [shouldUpdateCharts, setShouldUpdateCharts] = useState(false);

  const {
    data: data = [],
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useCompareCoinsQuery({
    coin: activeCoins[0].id,
    vsCurrency: currency.currency,
    days: days,
    intervalDaily: intervalDaily,
  });

  const {
    data: coinBData = [],
    isSuccess: isSuccessB,
    isError: isErrorB,
    refetch: refetchB,
  } = useCompareCoinsQuery({
    coin: coinBId.length > 1 ? coinBId : activeCoins[0].id,
    vsCurrency: currency.currency,
    days: days,
    intervalDaily: intervalDaily,
  });

  const toggleUpdateCharts = (shouldUpdateCharts: boolean) => {
    setShouldUpdateCharts(shouldUpdateCharts);
  };

  const updateActiveCoins = (newCoins: any) => {
    setActiveCoins(newCoins);
    if (newCoins.length === 2) {
      setCoinBId(newCoins[1].id);
    } else {
      setCoinBId(newCoins[0].id);
      setShouldUpdateCharts(true);
    }
  };

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
    }
    if (isSuccess || (isSuccess && shouldUpdateCharts)) {
      const formattedData = formatCompareCoins(data, days, intervalDaily);
      const { pricesData, volumesData } = formattedData;
      setPricesA(pricesData);
      setVolumesA(volumesData);
      if (activeCoins.length !== 2) {
        setShouldUpdateCharts(false);
      }
      setTimeout(() => {
        refetch();
        if(activeCoins.length === 2){
          refetchB()
        }
      }, 60000);
    } else if (isError && "error" in error) {
      setTimeout(() => {
        refetch();
      }, 10000);
      setErrorMessage(`${error.error}. Refetching...`);
    }
    if (
      coinBData &&
      activeCoins.length === 2 &&
      !initialRender &&
      JSON.stringify(data) !== JSON.stringify(coinBData)
    ) {
      const formattedData = formatCompareCoins(coinBData, days, intervalDaily);
      const { pricesData, volumesData } = formattedData;
      setPricesB(pricesData);
      setVolumesB(volumesData);
      setShouldUpdateCharts(true);
    } else if ((!coinBData || activeCoins.length === 1) && pricesB.length) {
      setPricesB([]);
      setVolumesB([]);
    }
    if (isErrorB) {
      setTimeout(() => {
        refetchB();
      }, 10000);
    }
  }, [
    coinBData,
    activeCoins,
    shouldUpdateCharts,
    pricesB.length,
    isError,
    data,
    days,
    error,
    intervalDaily,
    isSuccess,
    initialRender,
    isErrorB,
    isSuccessB,
    refetch,
    refetchB,
  ]);

  const updateCharts = (element: any) => {
    const { days, intervalDaily } = element;
    setDays(days);
    setIntervalDaily(intervalDaily);
  };

  const toggleCompare = () => {
    setCompareData((current) => !current);
    if (compareData && activeCoins.length === 2) {
      const newActiveCoins = activeCoins.slice(1);
      setActiveCoins(newActiveCoins);
    }
  };

  return (
    <div>
      <div>
        <div className="flex justify-between items-center pb-[4vh]">
          <h2 className="text-[--dark-slate-blue] lg:2xl:text-3xl max-sm:text-sm dark:text-white mr-[16px] text-wrap">
            Select the currency to view statistics
          </h2>
          <CompareButton
            compareData={compareData}
            toggleCompare={toggleCompare}
          />
        </div>
        <CarouselComponent
          updateActiveCoins={updateActiveCoins}
          activeCoins={activeCoins}
          currency={currency}
          compareData={compareData}
        />
        <div className="w-full h-auto flex max-md:flex-col justify-between gap-[1vw] pt-[120px] lg:2xl:pt-[240px] max-sm:pt-[86px]">
          <ChartContainer
            className="h-auto flex justify-between"
            dataLength={pricesA.length}
            symbol={currency.symbol}
            chartInfo={{
              isPrice: true,
            }}
            isLoading={isLoading}
            isSuccess={isSuccess}
            errorMessage={errorMessage}
            activeCoins={activeCoins}
            compareData={compareData}
          >
            <AreaChartComponent
              xAxis={true}
              height={"h-[165px] lg:2xl:h-[330px] max-sm:h-[100px]"}
              width={"w-full"}
              data={pricesA}
              color={"var(--soft-blue)"}
              fill={"url(#area-blue)"}
              dataB={pricesB}
              activeCoins={activeCoins}
              compareData={compareData}
              shouldUpdateChart={shouldUpdateCharts}
              toggleUpdateCharts={toggleUpdateCharts}
            />
          </ChartContainer>
          <ChartContainer
            className="h-auto flex justify-between"
            dataLength={volumesA.length}
            symbol={currency.symbol}
            chartInfo={{
              isPrice: false,
            }}
            isLoading={isLoading}
            isSuccess={isSuccess}
            errorMessage={errorMessage}
            activeCoins={activeCoins}
            compareData={compareData}
          >
            <BarChartComponent
              xAxis={true}
              height={"h-[165px] lg:2xl:h-[330px] max-sm:h-[100px]"}
              width={"w-full"}
              data={volumesA}
              color={"var(--light-purple"}
              fill={"url(#area-purple)"}
              dataB={volumesB}
              activeCoins={activeCoins}
              compareData={compareData}
              shouldUpdateChart={shouldUpdateCharts}
              toggleUpdateCharts={toggleUpdateCharts}
            />
          </ChartContainer>
        </div>
        <TimeRangeButtons updateChart={updateCharts} />
      </div>
      <TableComponent currency={currency} />
    </div>
  );
};
export default Coins;
