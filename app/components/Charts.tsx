"use client";
import { useState, useEffect, useRef } from "react";
import { useCompareCoinsQuery } from "@/lib/features/api/apiSlice";
import { formatCompareCoins } from "@/lib/format/formatCompareCoins";
import AreaChartComponent from "./AreaChartComponent";
import BarChartComponent from "./BarChartComponent";
import ChartContainer from "./ChartContainer";

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
  const [pricesA, setPricesA]: any[] = useState([]);
  const [volumesA, setVolumesA]: any[] = useState([]);
  const [pricesB, setPricesB]: any[] = useState([]);
  const [volumesB, setVolumesB]: any[] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    data: data = [],
    isLoading,
    isSuccess: isSuccessA,
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
    data: dataB = [],
    isSuccess: isSuccessB,
    isError: isErrorB,
    error: errorB,
    refetch: refetchB,
  } = useCompareCoinsQuery({
    coin: coinBId.length > 1 ? coinBId : activeCoins[0].id,
    vsCurrency: currency.currency,
    days: days,
    intervalDaily: intervalDaily,
  });

  useEffect(() => {
    const shouldUpdateActiveCoins =
      !initialRender && currencyUpdated && isSuccess;
    if (
      isSuccessA ||
      (isSuccessA && shouldUpdateCharts) ||
      shouldUpdateActiveCoins
    ) {
      const formattedData = formatCompareCoins(data, days, intervalDaily);
      const { pricesData, volumesData } = formattedData;
      setPricesA(pricesData);
      setVolumesA(volumesData);
      if (activeCoins.length !== 2) {
        toggleUpdateCharts(false);
        setIsSuccess(true);
      }
      prevCurrency.current = currency;
      if (initialRender) {
        setInitialRender(false);
      }
      if (data) {
        setTimeout(() => {
          refetch();
          if (activeCoins.length === 2 && dataB) {
            refetchB();
          }
        }, 60000);
      }
    } else if (isError && "error" in error) {
      setIsSuccess(false);
      setTimeout(() => {
        refetch();
      }, 10000);
      setErrorMessage(`${error.error}. Refetching...`);
    }
    if (
      dataB &&
      activeCoins.length === 2 &&
      !initialRender &&
      JSON.stringify(data) !== JSON.stringify(dataB)
    ) {
      const formattedData = formatCompareCoins(dataB, days, intervalDaily);
      const { pricesData, volumesData } = formattedData;
      setPricesB(pricesData);
      setVolumesB(volumesData);
      toggleUpdateCharts(true);
      if (data) {
        setIsSuccess(true);
      }
    } else if ((!dataB || activeCoins.length === 1) && pricesB.length) {
      setPricesB([]);
      setVolumesB([]);
    }
    if (isErrorB && "error" in errorB) {
      setIsSuccess(false);
      setErrorMessage(`${errorB.error}. Refetching...`);
      setTimeout(() => {
        refetchB();
      }, 10000);
    }
  }, [
    currency,
    currencyUpdated,
    dataB,
    errorB,
    pricesB.length,
    activeCoins,
    shouldUpdateCharts,
    toggleUpdateCharts,
    isError,
    data,
    days,
    error,
    intervalDaily,
    isSuccess,
    isSuccessA,
    initialRender,
    isErrorB,
    isSuccessB,
    refetch,
    refetchB,
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
