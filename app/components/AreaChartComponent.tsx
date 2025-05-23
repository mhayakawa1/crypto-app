"use client";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
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
  fill: any;
}) => {
  const { xAxis, height, width, data, color, fill } = props;
  return (
    <ChartContainer
      className={`${height} ${width} p-auto m-0`}
      config={chartConfig}
    >
      <AreaChart accessibilityLayer data={data}>
        <defs>
          <linearGradient id="area-blue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--soft-blue)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--soft-blue)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="area-rising" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--rising)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--rising)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="area-falling" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--falling)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--falling)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Line type="monotone" dataKey="uv" stroke={color} dot={false} />
        {xAxis && <XAxis dataKey="name" axisLine={false} tickLine={false} />}
        <YAxis
          domain={["auto", "dataMax"]}
          axisLine={false}
          tick={false}
          width={0}
        />
        <Area
          dataKey="uv"
          radius={4}
          stroke={color}
          type="natural"
          fillOpacity={1}
          fill={fill}
        />
      </AreaChart>
    </ChartContainer>
  );
};
export default AreaChartComponent;
