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

  let chartContent: React.ReactNode;

  if (isLoading) {
    chartContent = <p>Loading...</p>;
  } else if (isSuccess) {
    const formattedData = formatCompareCoins(data, days, intervalDaily);
    chartContent = (
      <AreaChartComponent
        xAxis={true}
        height={"h-[165px]"}
        width={"w-full"}
        data={formattedData.pricesData}
        color={"var(--soft-blue"}
        fill={"url(#area-blue)"}
      />
    );
  } else if (isError) {
    chartContent = <p>{error.toString()}</p>;
  }

  return (
    <ChartContainer className="h-auto flex justify-between">
      <h3>
        {`${coinA.name} (${coinA.symbol.toUpperCase()}) to ${
          coinB.name
        } (${coinB.symbol.toUpperCase()})`}
      </h3>
      {chartContent}
    </ChartContainer>
  );
};
export default ConverterChart;
