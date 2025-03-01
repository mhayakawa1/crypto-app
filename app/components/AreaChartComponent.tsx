"use client";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useState, useEffect } from "react";
import { Area, AreaChart, XAxis, YAxis, Line } from "recharts";

const chartConfig = {
  uv: {
    label: "uv",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const AreaChartComponent = (props: {
  xAxis: boolean;
  height: string;
  width: string;
  data: any;
  color: any;
}) => {
  const { xAxis, height, width, data, color } = props;
  const [yRange, setYRange] = useState({ min: 0, max: 100 });

  const minMax = () => {
    const sortedPrices = data
      .map((element: any) => element.uv)
      .sort((x: any, y: any) => x - y);
    setYRange({
      min: sortedPrices[0],
      max: sortedPrices[sortedPrices.length - 1],
    });
  };

  useEffect(() => {
    minMax();
  });
  
  return (
    <ChartContainer
      className={`aspect-auto ${height} ${width} p-0 m-0`}
      config={chartConfig}
    >
      <AreaChart accessibilityLayer data={data}>
        <defs>
          <linearGradient id="area-colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.8} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Line type="monotone" dataKey="uv" stroke={color} dot={false} />
        {xAxis && <XAxis dataKey="name" axisLine={false} tickLine={false} />}
        <YAxis
          domain={[yRange.min, yRange.max]}
          axisLine={false}
          tick={false}
          width={0}
        />
        <Area
          dataKey="uv"
          radius={4}
          type="natural"
          stroke={color}
          fillOpacity={1}
          fill="url(#area-colorUv)"
        />
      </AreaChart>
    </ChartContainer>
  );
};
export default AreaChartComponent;
