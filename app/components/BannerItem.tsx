"use client";

const BannerItem = (props: { children: any }) => {
  const { children } = props;
  return <div className="flex items-center gap-[8px] max-sm:gap-[4spx]">{children}</div>;
};

export default BannerItem;