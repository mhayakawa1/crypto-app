"use client";
import AssetListItem from "./AssetListItem";

const AssetList = (props: { data: any; heading: string; children: any }) => {
  const { data, heading, children } = props;
  return (
    <div className="grow">
      <div className="flex justify-between">
        <h4 className="lg:2xl:text-4xl">{heading}</h4>
        {children}
      </div>
      <ul className="flex justify-between items-start max-md:flex-wrap max-md:gap-y-[4vh] max-md:gap-x-[4%] list-none pt-[14px] lg:2xl:pt-[28px]">
        {data.map((listItem: any) => (
          <AssetListItem key={listItem.name} listItem={listItem} />
        ))}
      </ul>
    </div>
  );
};

export default AssetList;
