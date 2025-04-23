import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import InfiniteScroll from "react-infinite-scroll-component";
import queryString from "query-string";
import { useAllCoinsQuery } from "@/lib/features/api/apiSlice";
import { formatAllCoins } from "@/lib/format/formatAllCoins";
import { Progress } from "../../components/ui/progress";
import { useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AreaChartComponent from "./AreaChartComponent";
import ArrowUpGreen from "../../src/icons/Arrow_Up_Green.svg";
import ArrowDownRed from "../../src/icons/Arrow_Down_Red.svg";
import Image from "next/image";

const Arrow = (props: { rising: boolean }) => {
  const { rising } = props;
  return (
    <Image
      src={rising ? ArrowUpGreen : ArrowDownRed}
      alt=""
      width="0"
      height="0"
      className="w-[7px] h-auto"
    />
  );
};

const ProgressContainer = (props: { numbers: object; rising: boolean }) => {
  const { numbers, rising } = props;
  const values = Object.values(numbers);
  const allClasses = [
    {
      barColor: "bg-[--bg-rising]",
      progressColor: "--rising",
      progressColorBG: "bg-[--rising]",
    },
    {
      barColor: "bg-[--bg-falling]",
      progressColor: "--falling",
      progressColorBG: "bg-[--falling]",
    },
  ];

  const classes = allClasses[Number(!rising)];

  const formatNumber = (number: number) => {
    const placeValues = [
      { letter: "Q", value: 1000000000000000 },
      { letter: "T", value: 1000000000000 },
      { letter: "B", value: 1000000000 },
      { letter: "M", value: 1000000 },
      { letter: "K", value: 1000 },
    ];
    const placeValue = placeValues.find(
      (element) => element.value <= number
    ) || {
      letter: "",
    };
    const numberValues = number.toLocaleString().split(",");

    if (numberValues.length === 1) {
      return `$${numberValues[0]}`;
    } else {
      return `$${numberValues[0]}.${numberValues[1].slice(0, 2)}${
        placeValue.letter
      }`;
    }
  };

  return (
    <div>
      <div className="w-full flex justify-between items-center h-[16px]">
        <div
          className={`flex justify-between items-center gap-[4px] text-[${classes.progressColor}]`}
        >
          <span
            className={`w-[6px] h-[6px] rounded-full ${classes.progressColorBG}]`}
          ></span>
          {values[0] ? formatNumber(values[0]) : "--"}
        </div>
        <div className="flex content-between items-center gap-[4px]">
          <span
            className={`w-[6px] h-[6px] rounded-full ${classes.barColor}`}
          ></span>
          {values[1] ? formatNumber(values[1]) : "--"}
        </div>
      </div>
      <Progress
        className={classes.barColor}
        value={(values[0] / (values[0] + values[1])) * 100}
        color={classes.progressColorBG}
      ></Progress>
    </div>
  );
};

const TableComponent = () => {
  const [sortValue, setSortValue] = useState("#");
  const [reverse, setReverse] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(1);
  const [coinList, setCoinList] = useState([]);
  const currency = useAppSelector((state) => state.currency);
  const {
    data: data = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useAllCoinsQuery({ currency: currency, page: page });

  const updateQuery = () => {
    setPage(page + 1);
  };

  const updateValue = (name: string, value: any) => {
    if (sortValue === value) {
      setReverse((current) => !current);
    } else {
      setReverse(false);
      setSortValue(value);
    }
    const parsed = queryString.parse(location.hash);
    parsed.sort = `${name.toLowerCase()}`;
    const stringified = queryString.stringify(parsed);
    location.hash = stringified;
  };

  const SortButton = (props: { name: string; sortValue: any }) => {
    const { name, sortValue } = props;
    return (
      <button
        onClick={() => updateValue(name, sortValue)}
        className="w-full h-full rounded-[4px] hover:bg-[--lavender] hover:text-[--soft-blue] dark:hover:bg-[--mirage] dark:hover:text-white"
      >
        {name}
      </button>
    );
  };

  const TableHeaderContent = () => {
    const headerInfo = [
      { name: "#", sortValue: "#" },
      { name: "Name", sortValue: "Name" },
      { name: "Price", sortValue: "Price" },
      { name: "1h%", sortValue: 0 },
      { name: "24h%", sortValue: 1 },
      { name: "7d%", sortValue: 2 },
      { name: "24h volume / Market Cap", sortValue: null },
      { name: "Circulating / Total Supply", sortValue: null },
      { name: "Last 7d", sortValue: null },
    ];
    return (
      <TableRow className="border-none hover:bg-transparent w-[80vw]">
        {headerInfo.map((element: any) => {
          const { name, sortValue } = element;
          return (
            <TableHead key={name} className="w-auto">
              {sortValue !== null ? (
                <SortButton name={name} sortValue={sortValue} />
              ) : (
                name
              )}
            </TableHead>
          );
        })}
      </TableRow>
    );
  };

  const RowContent = () => {
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
      <TableBody>
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
              key={data.id + price}
              className="bg-white hover:bg-[--lavender] text-[--dark-slate-blue] dark:text-white dark:bg-[--mirage] w-auto h-[77px] border-none"
            >
              <TableCell className="rounded-l-xl">
                <span className="px-[10px]">{index + 1}</span>
              </TableCell>
              <TableCell>
                <Link
                  className="flex items-center gap-[16px] truncate"
                  href={`/coin/${id}`}
                >
                  {image !== null && (
                    <Avatar>
                      <AvatarImage src={image} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  )}
                  {name}
                </Link>
              </TableCell>
              <TableCell>
                {price ? `$${price.toLocaleString()}` : "--"}
              </TableCell>
              {percents.map((percent: any, index: number) => (
                <TableCell
                  key={index}
                  className={`text-sm ${
                    percent.rising ? "text-[--rising]" : "text-[--falling]"
                  }`}
                >
                  {percent.value ? (
                    <div className="flex gap-[8px]">
                      <Arrow rising={percent.rising} />
                      {percent.value}%
                    </div>
                  ) : (
                    <span>--</span>
                  )}
                </TableCell>
              ))}
              <TableCell className="">
                <ProgressContainer
                  numbers={volumeMarketCap}
                  rising={percents[0].rising}
                />
              </TableCell>
              <TableCell className="">
                <ProgressContainer
                  numbers={circulatingSupply}
                  rising={percents[0].rising}
                />
              </TableCell>
              <TableCell className="rounded-r-xl w-fit p-0">
                <AreaChartComponent
                  xAxis={false}
                  height={"h-[37px]"}
                  width={"w-[120px]"}
                  data={lastSevenDays}
                  color={
                    percents[0].rising ? "var(--rising)" : "var(--falling)"
                  }
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

  const LoadingSkeleton = () => {
    return (
      <div className="flex flex-col gap-[8px] w-full">
        {[...Array(5).keys()].map((key, index) => (
          <div
            key={key}
            className="flex items-center pl-[20px] w-full bg-white hover:bg-[--lavender] text-[--dark-gunmetal] dark:text-white dark:bg-[--mirage] h-[77px] border-none  rounded-xl"
          >
            {isError && index === 0 && errorMessage}
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    if (isSuccess && data) {
      const newCoinList = coinList.concat(formatAllCoins(data));
      setCoinList(newCoinList);
    } else if (isError && "error" in error) {
      setErrorMessage(error.error);
    }
  }, [isLoading, isError, error, isSuccess, data, coinList]);

  return (
    <InfiniteScroll
      dataLength={coinList.length}
      next={() => updateQuery()}
      hasMore={true}
      loader={<LoadingSkeleton></LoadingSkeleton>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <div className="w-[80vw]">
        <Table className="border-separate border-spacing-y-[8px] w-auto">
          <TableHeader>
            <TableHeaderContent />
          </TableHeader>
          {coinList.length > 0 && <RowContent />}
        </Table>
      </div>
    </InfiniteScroll>
  );
};
export default TableComponent;
