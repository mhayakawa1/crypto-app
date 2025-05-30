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
  symbol: string;
}) => {
  const { coinA, coinB, days, intervalDaily, symbol } = props;
  const [coinData, setCoinData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    data: data = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useCompareCoinsQuery({
    coin: coinA.id,
    vsCurrency: coinB.symbol,
    days: days,
    intervalDaily: intervalDaily,
  });

  useEffect(() => {
    if (isSuccess) {
      setCoinData(formatCompareCoins(data, days, intervalDaily).pricesData);
    } else if (isError && "error" in error) {
      setErrorMessage(error.error);
    }
  }, [error, isError, data, days, intervalDaily, isSuccess]);

  return (
    <ChartContainer
      className="h-fit flex justify-between text-xl"
      dataLength={coinData.length}
      symbol={symbol}
      chartInfo={`${coinA.name} (${coinA.symbol.toUpperCase()}) to ${
        coinB.name
      } (${coinB.symbol.toUpperCase()})`}
      isLoading={isLoading}
      isSuccess={isSuccess}
      errorMessage={errorMessage}
      activeCoins={null}
      compareData={false}
    >
      <AreaChartComponent
        xAxis={true}
        height={"h-[32vh] max-md:max-xl:h-[16vh]"}
        width={"w-full"}
        data={coinData}
        color={"var(--soft-blue"}
        fill={"url(#area-blue)"}
        dataB={null}
        activeCoins={null}
        compareData={false}
        shouldUpdateChart={true}
        toggleUpdateCharts={null}
      />
    </ChartContainer>
  );
};
export default ConverterChart;
