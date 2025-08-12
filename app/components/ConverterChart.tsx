import { useState, useEffect } from "react";
import ChartContainer from "./ChartContainer";
import AreaChartComponent from "./AreaChartComponent";
import { useCompareCoinsQuery } from "@/lib/features/api/apiSlice";
import { formatCompareCoins } from "@/lib/format/formatCompareCoins";

const ConverterChart = (props: {
  coinA: any;
  coinB: any;
  days: number;
  intervalDaily: boolean;
  currency: any;
}) => {
  const {
    coinA,
    coinB,
    days,
    intervalDaily,
    currency: { currency, symbol },
  } = props;
  const [coinData, setCoinData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [chartInfo, setChartInfo] = useState("");

  function useQuery(coin: string) {
    const [prices, setPrices] = useState([]);
    const { data, isLoading, isSuccess, isError, error, refetch } =
      useCompareCoinsQuery({
        coin,
        vsCurrency: currency,
        days,
        intervalDaily,
      });

    useEffect(() => {
      if (isSuccess) {
        const formattedData = formatCompareCoins(data, days, intervalDaily);
        const { pricesData } = formattedData;
        setPrices(pricesData);
      } else if (isError) {
        setIsSuccess(false);
        setTimeout(() => {
          refetch();
        }, 10000);
      }
    }, [isSuccess, data, isError, error, refetch]);
    return [data, isLoading, isSuccess, prices, refetch];
  }

  const [dataA, isLoadingA, isSuccessA, pricesA] = useQuery(coinA.id);
  const [dataB, isLoadingB, isSuccessB, pricesB] = useQuery(coinB.id);

  useEffect(() => {
    if (isLoadingA || isLoadingB) {
      setIsLoading(true);
    }
    if (isSuccessA && isSuccessB && pricesA.length && pricesB.length) {
      setIsLoading(false);
      setIsSuccess(true);
      const { name: nameA, symbol: symbolA } = coinA;
      const { name: nameB, symbol: symbolB } = coinB;
      setChartInfo(
        `${nameA} (${symbolA.toUpperCase()}) to ${nameB} (${symbolB.toUpperCase()})`
      );
      const comparedPrices = pricesA.map((element: any, index: number) => {
        if (pricesB[index]) {
          return {
            name: element.name,
            value: element.value / pricesB[index].value,
          };
        }
      });
      setCoinData(comparedPrices);
    }
  }, [
    coinA,
    coinB,
    dataA,
    dataB,
    days,
    intervalDaily,
    isLoadingA,
    isLoadingB,
    isSuccessA,
    isSuccessB,
    pricesA,
    pricesB,
    pricesA.length,
    pricesB.length,
  ]);

  return (
    <ChartContainer
      className="relative w-full h-fit flex justify-between text-xl"
      dataLength={coinData.length}
      days={days}
      symbol={symbol}
      chartInfo={chartInfo}
      isLoading={isLoading}
      isSuccess={isSuccess}
      activeCoins={null}
      compareData={false}
      xAxis={true}
    >
      {isSuccess ? (
        <AreaChartComponent
          height={"h-[32vh] max-md:max-xl:h-[16vh]"}
          width={"w-full"}
          data={coinData}
          className="pb-[2vh]"
          color={"var(--soft-blue)"}
          fill={"url(#area-blue)"}
          shouldUpdateChart={true}
        />
      ) : null}
    </ChartContainer>
  );
};
export default ConverterChart;
