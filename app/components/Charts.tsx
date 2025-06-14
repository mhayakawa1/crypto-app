"use client";
import { useState, useEffect, useRef, useCallback } from "react";
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
    isError: isErrorB,
    error: errorB,
    refetch: refetchB,
  } = useCompareCoinsQuery({
    coin: coinBId.length > 1 ? coinBId : activeCoins[0].id,
    vsCurrency: currency.currency,
    days: days,
    intervalDaily: intervalDaily,
  });

  const queryRefetch = useCallback(
    (isError: boolean, error: any, isQueryA: boolean) => {
      if (isError && "error" in error) {
        setIsSuccess(false);
        setTimeout(() => {
          if (isQueryA) {
            refetch();
          } else {
            refetchB();
          }
        }, 10000);
        setErrorMessage(`${error.error}. Refetching...`);
      }
    },
    [refetch, refetchB]
  );

  const getFormattedData = useCallback(
    (
      queryData: any,
      shouldToggleCharts: boolean,
      isSuccess: boolean,
      isCoinA: boolean
    ) => {
      toggleUpdateCharts(shouldToggleCharts);
      setIsSuccess(isSuccess);
      const formattedData = formatCompareCoins(queryData, days, intervalDaily);
      const { pricesData, volumesData } = formattedData;
      if (isCoinA) {
        setPricesA(pricesData);
        setVolumesA(volumesData);
      } else {
        setPricesB(pricesData);
        setVolumesB(volumesData);
      }
    },
    [days, intervalDaily, toggleUpdateCharts]
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
      getFormattedData(data, twoCoinsActive, !twoCoinsActive, true);
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
    }
    if (
      dataB &&
      activeCoins.length === 2 &&
      !initialRender &&
      JSON.stringify(data) !== JSON.stringify(dataB)
    ) {
      getFormattedData(dataB, true, Boolean(data), false);
    } else if ((!dataB || activeCoins.length === 1) && pricesB.length) {
      setPricesB([]);
      setVolumesB([]);
    }
    queryRefetch(isError, error, true);
    queryRefetch(isErrorB, errorB, false);
  }, [
    activeCoins.length,
    currency,
    currencyUpdated,
    data,
    dataB,
    error,
    errorB,
    initialRender,
    isError,
    isErrorB,
    isSuccess,
    isSuccessA,
    pricesB.length,
    shouldUpdateCharts,
    refetch,
    refetchB,
    queryRefetch,
    getFormattedData,
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
