"use client";

 const Banner = (props: { children: any }) => {
   const { children } = props;
    return (
      <div className="flex justify-center text-xs bg-[--dark-slate-blue] dark:bg-[--haiti] w-full py-[16px] max-sm:py-[8px] lg:2xl:py-[32px] border-y border-[--space-cadet]">
        {children}
      </div>
  );
};
export default Banner;
