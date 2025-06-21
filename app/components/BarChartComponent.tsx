"use client";
import { useState, useEffect, useRef } from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
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
} satisfies ChartConfig;


const BarChartComponent = (props: {
  xAxis: boolean;
  height: string;
  width: string;
  data: any;
  color: any;
  fill: any;
  dataB: any;
  activeCoins: any;
  compareData: boolean;
  shouldUpdateChart: boolean;
  toggleUpdateCharts: any;
}) => {
  const {
    xAxis,
    height,
    width,
    data,
    color,
    fill,
    dataB,
    activeCoins,
    compareData,
    shouldUpdateChart,
    toggleUpdateCharts,
  } = props;
  const twoCoinsActive = activeCoins.length === 2;
  const prevChartData = useRef<any>([{ name: "", value: 0 }]);
  const [compareActive, setCompareActive] = useState(true);
  const [chartData, setChartData] = useState(data);
  const gradientInfo = [
    { id: "area-blue", stopColor: "var(--soft-blue)" },
    { id: "area-purple", stopColor: "var(--light-purple)" },
  ];


  useEffect(() => {
    if (shouldUpdateChart) {
      if (data[0].value !== chartData[0].value) {
        setChartData(data);
      }
      if (
        twoCoinsActive &&
        dataB.length &&
        JSON.stringify(prevChartData.current) !== JSON.stringify(chartData)
      ) {
        const newData = data.map((element: any, index: number) => {
          if (dataB[index]) {
            return {
              name: element.name,
              value: element.value,
              valueB: dataB[index].value,
            };
          }
        });
        prevChartData.current = chartData;
        toggleUpdateCharts(false);
        setChartData(newData);
        chartConfig.value.label = activeCoins[0].name;
        chartConfig.valueB.label = activeCoins[1].name;
      }
    }
    if (compareData && twoCoinsActive) {
      setCompareActive(true);
    } else {
      setCompareActive(false);
    }
  }, [
    data,
    compareData,
    compareActive,
    twoCoinsActive,
    dataB,
    activeCoins,
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
        <Bar
          dataKey="value"
          stackId="a"
          radius={4}
          fillOpacity={1}
          color={compareActive ? "var(--soft-blue" : color}
          fill={compareActive ? "url(#area-blue)" : fill}
        />
        {compareActive && (
          <Bar
            dataKey="valueB"
            stackId="a"
            radius={4}
            fillOpacity={1}
            color={"var(--light-purple"}
            fill="url(#area-purple)"
          />
        )}
        {compareActive && <ChartLegend content={<ChartLegendContent />} />}
      </BarChart>
    </ChartContainer>
  );
};
export default BarChartComponent;