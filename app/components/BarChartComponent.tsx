"use client";
import { useState, useEffect, useRef } from "react";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

const chartConfig = {
  value: {
    label: "",
    color: "var(--chart-1)",
  },
  valueB: {
    label: "",
    color: "var(--chart-2)",
  },
  valueC: {
    label: "",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

const BarChartComponent = (props: {
  activeCoins: any;
  color: any;
  compareData: boolean;
  data: any;
  dataB: any;
  dataC: any;
  fill: any;
  height: string;
  shouldUpdateChart: boolean;
  toggleUpdateCharts: any;
  width: string;
  xAxis: boolean;
}) => {
  const {
    activeCoins,
    color,
    compareData,
    data,
    dataB,
    dataC,
    fill,
    height,
    shouldUpdateChart,
    toggleUpdateCharts,
    width,
    xAxis,
  } = props;
  const activeCount = activeCoins.length;
  const prevChartData = useRef<any>([{ name: "", value: 0 }]);
  const [compareActive, setCompareActive] = useState(true);
  const [chartData, setChartData] = useState(data);
  const gradientInfo = [
    { id: "area-blue", stopColor: "var(--soft-blue)" },
    { id: "area-purple", stopColor: "var(--light-purple)" },
    { id: "area-magenta", stopColor: "var(--magenta)" },
  ];

  useEffect(() => {
    if (shouldUpdateChart) {
      if (data[0].value !== chartData[0].value) {
        setChartData(data);
      }
      if (
        activeCount > 1 &&
        dataB.length &&
        (dataC.length || activeCount < 3) &&
        JSON.stringify(prevChartData.current) !== JSON.stringify(chartData)
      ) {
        const newData = data.map((element: any, index: number) => {
          if (dataB[index]) {
            element.valueB = dataB[index].value;
          }
          if (dataC[index]) {
            element.valueC = dataC[index].value;
          }
          return element;
        });
        prevChartData.current = chartData;
        toggleUpdateCharts(false);
        setChartData(newData);
        chartConfig.value.label = activeCoins[0].name;
        chartConfig.valueB.label = activeCoins[1].name;
      }
    }
    if (compareData && activeCount > 1) {
      setCompareActive(true);
    } else {
      setCompareActive(false);
    }
  }, [
    activeCoins,
    activeCount,
    compareActive,
    compareData,
    data,
    dataB,
    dataC,
    chartData,
    shouldUpdateChart,
    toggleUpdateCharts,
  ]);

  return (
    <ChartContainer
      className={`${height} ${width} p-auto m-0`}
      config={chartConfig}
    >
      <BarChart accessibilityLayer data={chartData}>
        <defs>
          {gradientInfo.map((element: any) => (
            <linearGradient
              key={element.id}
              id={element.id}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor={element.stopColor}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={element.stopColor}
                stopOpacity={0}
              />
            </linearGradient>
          ))}
        </defs>
        {xAxis && <XAxis dataKey="name" axisLine={false} tickLine={false} />}
        <YAxis
          domain={["auto", "dataMax"]}
          axisLine={false}
          tick={false}
          width={0}
        />
        {activeCoins.map((element: any, index: number) => {
          const { stopColor, id } = gradientInfo[index];
          return (
            <Bar
              key={element.id}
              dataKey={`${Object.keys(chartConfig)[index]}`}
              stackId="a"
              radius={4}
              fillOpacity={1}
              color={compareActive ? stopColor : color}
              fill={compareActive ? `url(#${id})` : fill}
            />
          );
        })}
      </BarChart>
    </ChartContainer>
  );
};
export default BarChartComponent;
