"use client";
import { useState, useEffect } from "react";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Area, AreaChart, YAxis, Line } from "recharts";

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
  height: string;
  width: string;
  data: any;
  className: string;
  color: any;
  fill: any;
  shouldUpdateChart: boolean;
}) => {
  const {
    height,
    width,
    data,
    className,
    color,
    fill,
    shouldUpdateChart,
  } = props;
  const [chartData, setChartData] = useState(data);
  const gradientInfo = [
    { id: "area-blue", stopColor: "var(--soft-blue)" },
    { id: "area-purple", stopColor: "var(--light-purple)" },
    { id: "area-magenta", stopColor: "var(--magenta)" },
    { id: "area-rising", stopColor: "var(--rising)" },
    { id: "area-falling", stopColor: "var(--falling)" },
  ];

  useEffect(() => {
    if (shouldUpdateChart) {
      if (data[0].value !== chartData[0].value) {
        setChartData(data);
      }
    }
  }, [data, chartData, shouldUpdateChart]);

  return (
      <ChartContainer
        className={`${height} ${width} ${className} m-0 bottom-[2vh]`}
        config={chartConfig}
      >
        <AreaChart accessibilityLayer data={chartData} className="h-[164px]">
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
          <YAxis
            dataKey="value"
            domain={["auto", "dataMax+(dataMax/2)"]}
            axisLine={false}
            tick={false}
            width={0}
            scale="log"
            allowDataOverflow={false}
          />
          <Area
            dataKey="value"
            radius={4}
            stroke={color}
            type="natural"
            fillOpacity={1}
            fill={fill}
            width={200}
          />
        </AreaChart>
      </ChartContainer>
  );
};
export default AreaChartComponent;
