"use client";

const ChartContainer = (props: { children: any; className: string }) => {
  const { children, className } = props;
  return (
    <div className={`flex flex-col justify-between gap-[4vh] grow bg-white dark:bg-[#191932] text-[--american-blue] dark:text-white p-[24px] lg:2xl:p-[48px] rounded-[16px] lg:2xl:rounded-[32px] ${className}`}>
      {children}
    </div>
  );
};

export default ChartContainer;
