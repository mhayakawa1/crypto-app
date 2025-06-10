import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import AreaChartComponent from "./AreaChartComponent";
import Arrow from "./Arrow";
import ProgressContainer from "./ProgressContainer";

const RowContent = (props: {
  coinList: any;
  sortValue: any;
  reverse: boolean;
  mobileView: boolean;
  currency:any;
}) => {
  const { coinList, sortValue, reverse, mobileView, currency } = props;
  let sortedList = coinList;
  if (sortValue === "#") {
    sortedList = coinList;
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
    <TableBody className="flex flex-col gap-[8px]">
      {sortedList.map((data: any, index: number) => {
        const {
          id,
          image,
          name,
          symbol,
          price,
          percents,
          volumeMarketCap,
          circulatingSupply,
          lastSevenDays,
        } = data;

        return (
          <TableRow
            key={id}
            className="flex justify-between items-center gap-[8px] rounded-xl bg-white hover:bg-[--lavender] text-[--dark-slate-blue] dark:text-white dark:bg-[--mirage] w-full h-[77px] border-none"
          >
            {!mobileView && (
              <TableCell className="flex justify-between items-center gap-[8px] p-0 w-[4%]">
                <span className="px-[10px] grow text-center">{index + 1}</span>
              </TableCell>
            )}
            <TableCell className="w-[16%] max-sm:w-[30%] h-full flex items-center p-0">
              <Link
                className="flex max-sm:justify-center items-center gap-[16px] max-sm:gap-[8px] w-full"
                href={`/coin/${id}`}
              >
                {image !== null && (
                  <Avatar>
                    <AvatarImage src={image} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                )}
                <p className='max-sm:flex flex-col'>
                  {mobileView && <span className=''>{symbol.toUpperCase()}</span>}
                  <span className="truncate max-sm:text-xs">{name}</span>
                </p>
              </Link>
            </TableCell>
            <TableCell className="w-[8%] max-sm:w-[30%] h-full max-sm:text-center flex flex-col justify-center items-center">
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
                    <div className="flex gap-[8px] w-full m-0">
                      <Arrow rising={percents[2].rising} />
                      {percents[2].value}%
                    </div>
                  ) : (
                    <span>--</span>
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
                  } w-[6%] p-0`}
                >
                  {percent.value ? (
                    <div className="flex gap-[8px] w-full m-0">
                      <Arrow rising={percent.rising} />
                      {percent.value}%
                    </div>
                  ) : (
                    <span>--</span>
                  )}
                </TableCell>
              ))}
            {!mobileView && (
              <TableCell className="grow">
                <ProgressContainer
                  numbers={volumeMarketCap}
                  rising={percents[0].rising}
                  symbol={currency.symbol}
                />
              </TableCell>
            )}
            {!mobileView && (
              <TableCell className="grow">
                <ProgressContainer
                  numbers={circulatingSupply}
                  rising={percents[0].rising}
                  symbol={currency.symbol}
                />
              </TableCell>
            )}
            <TableCell className="rounded-r-xl p-0 w-grow max-sm:w-[40%] h-full flex items-center">
              <AreaChartComponent
                xAxis={false}
                height={"h-[37px]"}
                width={"w-[120px] max-sm:grow"}
                data={lastSevenDays}
                color={percents[2].rising ? "var(--rising)" : "var(--falling)"}
                fill={
                  percents[2].rising
                    ? "url(#area-rising)"
                    : "url(#area-falling)"
                }
                dataB={null}
                activeCoins={[]}
                compareData={false}
                shouldUpdateChart={true}
                toggleUpdateCharts={null}
              />
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default RowContent;
