import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Arrow from "./Arrow";
import AreaChartComponent from "./AreaChartComponent";
import ProgressContainer from "./ProgressContainer";
import NoData from "./NoData";

const RowContent = (props: {
  coinList: any;
  sortValue: any;
  reverse: boolean;
  mobileView: boolean;
  currency: any;
}) => {
  const { coinList, sortValue, reverse, mobileView, currency } = props;
  let sortedList = coinList;
  if (sortValue === "#") {
    sortedList = sortedList.sort(function (a: any, b: any) {
      return a.number - b.number;
    });
  } else if (sortValue === "Name") {
    sortedList = sortedList.sort((a: any, b: any) =>
      a.name.localeCompare(b.name)
    );
  } else if (sortValue === "Price") {
    sortedList = sortedList.sort(function (a: any, b: any) {
      return a.price - b.price;
    });
  } else if (typeof sortValue === "number") {
    sortedList = sortedList.sort(function (a: any, b: any) {
      return a.percents[sortValue].value - b.percents[sortValue].value;
    });
  }

  if (reverse) {
    sortedList = sortedList.reverse();
  }

  return (
    <TableBody className="flex flex-col gap-[8px] lg:2xl:gap-[12px]">
      {sortedList.map((data: any, index: number) => {
        const {
          id,
          tableId,
          image,
          name,
          symbol,
          price,
          percents,
          volumeMarketCap,
          circulatingSupply,
          lastSevenDays,
        } = data;
        const { marketCap, totalVolume } = volumeMarketCap;
        const { circulating, totalSupply } = circulatingSupply;
        const showProgressBar1 =
          typeof marketCap === "number" && typeof totalVolume === "number";
        const showProgressBar2 =
          typeof circulating === "number" && typeof totalSupply === "number";

        return (
          <TableRow
            key={tableId}
            className="flex justify-between items-center gap-[8px] lg:2xl:gap-[12px] rounded-xl bg-white hover:bg-[--lavender] text-[--dark-slate-blue] dark:text-white dark:bg-[--mirage] w-full h-[78px] lg:2xl:h-[117px] border-none"
          >
            {!mobileView && (
              <TableCell className="flex justify-between items-center gap-[8px] lg:2xl:gap-[12px] p-0 w-[4%]">
                <span className="lg:2xl:text-2xl px-[10px] lg:2xl:px-[15px] grow text-center">
                  {index + 1}
                </span>
              </TableCell>
            )}
            <TableCell className="w-[16%] max-sm:w-[30%] h-full flex items-center p-0">
              <Link
                className="flex max-sm:justify-center items-center gap-[16px] max-sm:gap-[8px] lg:2xl:gap-[24px] max-sm:pl-[8px] w-full"
                href={`/coin/${id}`}
              >
                {image !== null && (
                  <Avatar>
                    <AvatarImage src={image} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                )}
                <p className="lg:2xl:text-2xl max-sm:flex flex-col w-[100px] lg:2xl:w-auto truncate">
                  {mobileView && <span>{symbol.toUpperCase()}</span>}
                  <span className="max-sm:text-xs">{name}</span>
                </p>
              </Link>
            </TableCell>
            <TableCell className="w-[8%] max-sm:w-[30%] h-full lg:2xl:text-2xl max-sm:text-center flex flex-col justify-center items-center">
              <span>
                {price
                  ? `${currency.symbol}${
                      currency.symbol.length > 1 ? " " : ""
                    }${price.toLocaleString()}`
                  : "--"}
              </span>
              {mobileView && (
                <span
                  className={`text-xs ${
                    percents[2].rising ? "text-[--rising]" : "text-[--falling]"
                  }`}
                >
                  {percents[2].value ? (
                    <div className="flex gap-[4px] w-full m-0">
                      <Arrow rising={percents[2].rising} />
                      {percents[2].value}%
                    </div>
                  ) : (
                    <NoData />
                  )}
                </span>
              )}
            </TableCell>
            {!mobileView &&
              percents.map((percent: any, index: number) => (
                <TableCell
                  key={index}
                  className={`text-sm ${
                    percent.rising ? "text-[--rising]" : "text-[--falling]"
                  } w-[6%] p-0 lg:2xl:text-2xl flex`}
                >
                  {percent.value ? (
                    <div className="flex w-full m-0">
                      <Arrow rising={percent.rising} />
                      <span>{percent.value}%</span>
                    </div>
                  ) : (
                    <NoData />
                  )}
                </TableCell>
              ))}
            {!mobileView && (
              <TableCell className="grow">
                {showProgressBar1 ? (
                  <ProgressContainer
                    numbers={volumeMarketCap}
                    rising={percents[0].rising}
                    symbol={currency.symbol}
                  />
                ) : (
                  <NoData />
                )}
              </TableCell>
            )}
            {!mobileView && (
              <TableCell className="grow">
                {showProgressBar2 ? (
                  <ProgressContainer
                    numbers={circulatingSupply}
                    rising={percents[0].rising}
                    symbol={currency.symbol}
                  />
                ) : (
                  <NoData />
                )}
              </TableCell>
            )}
            <TableCell className="rounded-r-xl p-0 w-grow max-sm:w-[40%] h-full flex items-center">
              {lastSevenDays.length ? (
                <AreaChartComponent
                  height={"h-[36px] lg:2xl:h-[54px]"}
                  width={"w-[120px] lg:2xl:w-[180px] max-sm:grow"}
                  data={lastSevenDays}
                  className="pr-[10px] lg:2xl:pr-[15px]"
                  color={
                    percents[2].rising ? "var(--rising)" : "var(--falling)"
                  }
                  fill={
                    percents[2].rising
                      ? "url(#area-rising)"
                      : "url(#area-falling)"
                  }
                  shouldUpdateChart={true}
                />
              ) : (
                <NoData />
              )}
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default RowContent;
