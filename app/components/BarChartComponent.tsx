"use client";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

const chartConfig = {
  uv: {
    label: "uv",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const BarChartComponent = (props: {
  xAxis: boolean;
  height: string;
  width: string;
  data: any;
  yRange: any;
  color: any;
  fill: any;
}) => {
  const { xAxis, height, width, data, yRange, fill } = props;
  return (
    <ChartContainer
      className={`${height} ${width} p-auto m-0`}
      config={chartConfig}
    >
      <BarChart accessibilityLayer data={data}>
        <defs>
          <linearGradient id="area-purple" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#B374F2" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#B374F2" stopOpacity={0} />
          </linearGradient>
        </defs>
        {xAxis && <XAxis dataKey="name" axisLine={false} tickLine={false} />}
        {yRange && (
          <YAxis
            domain={[yRange.min, yRange.max]}
            axisLine={false}
            tick={false}
            width={0}
          />
        )}
        <Bar dataKey="uv" radius={4} fillOpacity={1} fill={fill} />
      </BarChart>
    </ChartContainer>
  );
};
export default BarChartComponent;
