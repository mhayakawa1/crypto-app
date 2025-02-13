"use client";
import { Chart, ChartData } from "./homeStyles";

const ChartContainer = (props: { children: any }) => {
  const { children } = props;
  return (
    <Chart>
      {children}
      <ChartData></ChartData>
    </Chart>
  );
};

export default ChartContainer;
