import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AreaChartComponent from "./AreaChartComponent";
import Arrow from "./Arrow";
import ProgressContainer from "./ProgressContainer";

const RowContent = (props: {
  coinList: any;
  sortValue: any;
  reverse: boolean;
  symbol: any;
}) => {
  const { coinList, sortValue, reverse, symbol } = props;
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
          price,
          percents,
          volumeMarketCap,
          circulatingSupply,
          lastSevenDays,
        } = data;
        return (
          <TableRow
            key={uuidv4()}
            className="flex justify-between items-center gap-[8px] rounded-xl bg-white hover:bg-[--lavender] text-[--dark-slate-blue] dark:text-white dark:bg-[--mirage] w-full h-[77px] border-none"
          >
            <TableCell className="flex justify-between items-center gap-[8px] p-0 w-[4%]">
              <span className="px-[10px] grow text-center">{index + 1}</span>
            </TableCell>
            <TableCell className="w-[16%] flex items-center p-0">
              <Link
                className="flex items-center gap-[16px] w-full"
                href={`/coin/${id}`}
              >
                {image !== null && (
                  <Avatar>
                    <AvatarImage src={image} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                )}
                <p className="truncate">{name}</p>
              </Link>
            </TableCell>
            <TableCell className="w-[8%] truncate">
              {price
                ? `${symbol}${
                    symbol.length > 1 ? " " : ""
                  }${price.toLocaleString()}`
                : "--"}
            </TableCell>
            {percents.map((percent: any, index: number) => (
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
            <TableCell className="grow">
              <ProgressContainer
                numbers={volumeMarketCap}
                rising={percents[0].rising}
                symbol={symbol}
              />
            </TableCell>
            <TableCell className="grow">
              <ProgressContainer
                numbers={circulatingSupply}
                rising={percents[0].rising}
                symbol={symbol}
              />
            </TableCell>
            <TableCell className="rounded-r-xl p-0 w-grow h-full flex items-center">
              <AreaChartComponent
                xAxis={false}
                height={"h-[37px]"}
                width={"w-[120px]"}
                data={lastSevenDays}
                color={percents[0].rising ? "var(--rising)" : "var(--falling)"}
                fill={
                  percents[0].rising
                    ? "url(#area-rising)"
                    : "url(#area-falling)"
                }
              />
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default RowContent;