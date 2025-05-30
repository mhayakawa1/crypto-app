"use client";
import { useState, useEffect, useRef } from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis, Line } from "recharts";

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

const AreaChartComponent = (props: {
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
    { id: "area-rising", stopColor: "var(--rising)" },
    { id: "area-falling", stopColor: "var(--falling)" },
  ];

  useEffect(() => {
    if (shouldUpdateChart) {
      if (data[0].value !== chartData[0].value) {
        setChartData(data);
      }

      if (twoCoinsActive && dataB.length) {
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
        if (
          Object.keys(prevChartData.current[0]).length === 3 &&
          JSON.stringify(prevChartData.current) !== JSON.stringify(newData) &&
          JSON.stringify(data) !== JSON.stringify(dataB)
        ) {
          toggleUpdateCharts(false);
        }
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
      className={`${height} ${width} m-0`}
      config={chartConfig}
    >
      <AreaChart accessibilityLayer data={chartData}>
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
        <Line type="monotone" dataKey="value" stroke={color} dot={false} />
        {xAxis && <XAxis dataKey="name" axisLine={false} tickLine={false} className="border border-red-500" />}
        <YAxis
          domain={["auto", "dataMax"]}
          axisLine={false}
          tick={false}
          width={0}
        />
        <Area
          dataKey="value"
          radius={4}
          stroke={color}
          type="natural"
          fillOpacity={1}
          fill={fill}
        />
        {compareActive && (
          <Area
            dataKey="valueB"
            radius={4}
            stroke="var(--light-purple)"
            type="natural"
            fillOpacity={1}
            fill="url(#area-purple)"
          />
        )}
        {compareActive && <ChartLegend content={<ChartLegendContent />} />}
      </AreaChart>
    </ChartContainer>
  );
};
export default AreaChartComponent;
