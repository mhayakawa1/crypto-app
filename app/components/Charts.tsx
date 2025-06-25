"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useCompareCoinsQuery } from "@/lib/features/api/apiSlice";
import { formatCompareCoins } from "@/lib/format/formatCompareCoins";
import AreaChartComponent from "./AreaChartComponent";
import BarChartComponent from "./BarChartComponent";
import ChartContainer from "./ChartContainer";

let interval: any = null;

const Charts = (props: {
  currency: any;
  coinBId: string;
  compareData: boolean;
  days: number;
  intervalDaily: boolean;
  activeCoins: any;
  shouldUpdateCharts: boolean;
  toggleUpdateCharts: any;
  currencyUpdated: boolean;
}) => {
  const {
    currency,
    coinBId,
    compareData,
    days,
    intervalDaily,
    activeCoins,
    shouldUpdateCharts,
    toggleUpdateCharts,
    currencyUpdated,
  } = props;
  const prevCurrency = useRef<any>(currency);
  const [initialRender, setInitialRender] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [count, setCount] = useState(0);
  const [intervalActive, setIntervalActive] = useState(false);

  const toggleTimer = (start: boolean) => {
    clearInterval(interval);
    if (start) {
      interval = setInterval(() => {
        setCount((count) => count + 1);
      }, 1000);
    } else {
      setCount(0);
      setIntervalActive(false);
      interval = null;
    }
  };

  function useQuery(coin: string) {
    const [prices, setPrices] = useState([]);
    const [volumes, setVolumes] = useState([]);
    const { data, isLoading, isSuccess, isError, error, refetch } =
      useCompareCoinsQuery({
        coin,
        vsCurrency: currency.currency,
        days,
        intervalDaily,
      });

    useEffect(() => {
      if (isSuccess) {
        const formattedData = formatCompareCoins(data, days, intervalDaily);
        const { pricesData, volumesData } = formattedData;
        setPrices(pricesData);
        setVolumes(volumesData);
        if (!intervalActive) {
          toggleTimer(false);
        }
      }
      if (isError && "error" in error) {
        setIsSuccess(false);
        setErrorMessage(`${error.error}. Refetching...`);
        toggleTimer(true);
        if (count % 10 === 0) {
          refetch();
        }
      }
    }, [isSuccess, data, isError, error, refetch]);
    return [data, isLoading, isSuccess, prices, volumes, refetch];
  }

  const [dataA, isLoadingA, isSuccessA, pricesA, volumesA, refetchA] = useQuery(
    activeCoins[0].id
  );
  const [dataB, isLoadingB, isSuccessB, pricesB, volumesB, refetchB] = useQuery(
    coinBId.length > 1 ? coinBId : activeCoins[0].id
  );

  const setChartSuccess = useCallback(
    (shouldToggleCharts: boolean, isSuccess: boolean) => {
      toggleUpdateCharts(shouldToggleCharts);
      setIsSuccess(isSuccess);
    },
    [toggleUpdateCharts]
  );

  useEffect(() => {
    const shouldUpdateActiveCoins =
      !initialRender && currencyUpdated && isSuccess;
    if (
      isSuccessA ||
      (isSuccessA && shouldUpdateCharts) ||
      shouldUpdateActiveCoins
    ) {
      const twoCoinsActive = activeCoins.length === 2;
      setChartSuccess(twoCoinsActive, !twoCoinsActive);
      prevCurrency.current = currency;
      if (initialRender) {
        setInitialRender(false);
      }
      setIntervalActive(true);
      if (!intervalActive) {
        toggleTimer(true);
      }
    }
    if (
      isSuccessB &&
      activeCoins.length === 2 &&
      !initialRender &&
      JSON.stringify(dataA) !== JSON.stringify(dataB)
    ) {
      setChartSuccess(true, Boolean(dataA));
    }
    setIsLoading(
      (isLoadingA && activeCoins.length === 1) || (isLoadingA && isLoadingB)
        ? true
        : false
    );
    if (count === 60) {
      refetchA();
      if (activeCoins.length === 2) {
        refetchB();
      }
      toggleTimer(false);
    }
  }, [
    activeCoins.length,
    currency,
    currencyUpdated,
    count,
    dataA,
    dataB,
    setChartSuccess,
    initialRender,
    intervalActive,
    isLoadingA,
    isLoadingB,
    isSuccess,
    isSuccessA,
    isSuccessB,
    refetchA,
    refetchB,
    shouldUpdateCharts,
  ]);

  return (
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
  );
};

export default Charts;
