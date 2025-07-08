"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useCompareCoinsQuery } from "@/lib/features/api/apiSlice";
import { formatCompareCoins } from "@/lib/format/formatCompareCoins";
import AreaChartComponent from "./AreaChartComponent";
import BarChartComponent from "./BarChartComponent";
import ChartContainer from "./ChartContainer";
import Legend from "./Legend";

let interval: any = null;

const Charts = (props: {
  currency: any;
  coinBId: string;
  coinCId: string;
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
    coinCId,
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
  const [dataC, isLoadingC, isSuccessC, pricesC, volumesC, refetchC] = useQuery(
    coinCId.length > 1 ? coinCId : activeCoins[0].id
  );

  const chartsData = [
    { data: pricesA, color: "var(--soft-blue)", fill: "url(#area-blue)" },
    { data: pricesB, color: "var(--light-purple)", fill: "url(#area-purple)" },
    {
      data: pricesC,
      color: "var(--magenta)",
      fill: "url(#area-magenta)",
    },
  ];

  const setChartSuccess = useCallback(
    (shouldToggleCharts: boolean, isSuccess: boolean) => {
      toggleUpdateCharts(shouldToggleCharts);
      setIsSuccess(isSuccess);
    },
    [toggleUpdateCharts]
  );

  const noDuplicateData = useCallback(() => {
    const stringifiedData = [
      JSON.stringify(dataA),
      JSON.stringify(dataB),
      JSON.stringify(dataC),
    ];
    for (let i = 0; i < activeCoins.length; i++) {
      if (stringifiedData.indexOf(stringifiedData[i]) !== i) {
        return false;
      }
    }
    return true;
  }, [activeCoins.length, dataA, dataB, dataC]);

  const allTrue = useCallback(
    (array: any) => {
      const newArray = array.slice(0, activeCoins.length + 1);
      return newArray.every((element: boolean) => element === true);
    },
    [activeCoins.length]
  );

  useEffect(() => {
    const shouldUpdateActiveCoins =
      !initialRender && currencyUpdated && isSuccess;
    if (
      isSuccessA ||
      (isSuccessA && shouldUpdateCharts) ||
      shouldUpdateActiveCoins
    ) {
      prevCurrency.current = currency;
      if (initialRender) {
        setInitialRender(false);
      }
      setIntervalActive(true);
      if (!intervalActive) {
        toggleTimer(true);
      }
    }
    const isLoadingValues = [isLoadingA, isLoadingB, isLoadingC];
    const isSuccessValues = [isSuccessA, isSuccessB, isSuccessC];
    if (allTrue(isSuccessValues) && !initialRender && noDuplicateData()) {
      setChartSuccess(true, true);
    }
    setIsLoading(allTrue(isLoadingValues));
    if (count === 60) {
      refetchA();
      if (activeCoins.length > 1) {
        refetchB();
      }
      if (activeCoins.length === 3) {
        refetchC();
      }
      toggleTimer(false);
    }
  }, [
    activeCoins.length,
    allTrue,
    count,
    currency,
    currencyUpdated,
    initialRender,
    intervalActive,
    isLoadingA,
    isLoadingB,
    isLoadingC,
    isSuccess,
    isSuccessA,
    isSuccessB,
    isSuccessC,
    noDuplicateData,
    refetchA,
    refetchB,
    refetchC,
    setChartSuccess,
    shouldUpdateCharts,
  ]);

  return (
    <div className="flex flex-col gap-[2vh]">
      <div className="w-full h-auto flex max-md:flex-col justify-between gap-[1vw] pt-[120px] lg:2xl:pt-[180px] max-sm:pt-[86px]">
        <ChartContainer
          className="relative h-auto w-[50%] max-sm:w-full pb-[194px] lg:2xl:pb-[291px] max-sm:pb-[130px] flex justify-between"
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
          {activeCoins.map((coin: any, index: number) => {
            const { data, color, fill } = chartsData[index];
            const firstCoin = Boolean(!index);
            return (
              <AreaChartComponent
                key={coin.id}
                className="absolute"
                color={color}
                data={data}
                fill={fill}
                height={`h-[164px] lg:2xl:h-[246px] max-sm:h-[100px] ${
                  !firstCoin && "pb-[30px] lg:2xl:pb-[45px]"
                }`}
                shouldUpdateChart={shouldUpdateCharts}
                width={"w-[90%]"}
                xAxis={Boolean(!index)}
              />
            );
          })}
        </ChartContainer>
        <ChartContainer
          className="relative h-auto w-[50%] max-sm:w-full flex justify-between"
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
            activeCoins={activeCoins}
            color={"var(--light-purple)"}
            compareData={compareData}
            data={volumesA}
            dataB={volumesB}
            dataC={volumesC}
            fill={"url(#area-purple)"}
            height={`h-[164px] lg:2xl:h-[246px] max-sm:h-[100px]`}
            shouldUpdateChart={shouldUpdateCharts}
            toggleUpdateCharts={toggleUpdateCharts}
            width="w-full"
            xAxis={true}
          />
        </ChartContainer>
      </div>
      {compareData ? <Legend activeCoins={activeCoins} /> : null}
    </div>
  );
};

export default Charts;
