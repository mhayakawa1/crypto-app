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
}) => {
  const { coinA, coinB, days, intervalDaily } = props;
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
    if (isError && "error" in error) {
      setErrorMessage(error.error);
    }
  }, [error, isError]);

  return (
    <ChartContainer className="h-fit flex justify-between text-xl">
      <h3 className="lg:2xl:text-2xl">
        {`${coinA.name} (${coinA.symbol.toUpperCase()}) to ${
          coinB.name
        } (${coinB.symbol.toUpperCase()})`}
      </h3>
      {isLoading && <h4>Loading</h4>}
      {isSuccess && (
        <AreaChartComponent
          xAxis={true}
          height={"h-[32vh] max-md:max-xl:h-[16vh]"}
          width={"w-full"}
          data={formatCompareCoins(data, days, intervalDaily).pricesData}
          color={"var(--soft-blue"}
          fill={"url(#area-blue)"}
        />
      )}
      {isError && <h4>{errorMessage}</h4>}
    </ChartContainer>
  );
};
export default ConverterChart;
