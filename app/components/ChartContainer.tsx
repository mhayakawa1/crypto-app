"use client";

const ChartContainer = (props: { children: any; className: string }) => {
  const { children, className } = props;
  return (
    <div className={`flex flex-col justify-between gap-[24px] grow bg-white dark:bg-[#191932] p-[24px] rounded-[12] ${className}`}>
      {children}
    </div>
  );
};

export default ChartContainer;
