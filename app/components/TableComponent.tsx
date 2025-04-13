import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAllCoinsQuery } from "@/lib/features/api/apiSlice";
import { formatAllCoins } from "@/lib/format/formatAllCoins";
import { Progress } from "../../components/ui/progress";
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
          {formatNumber(values[0])}
        </div>
        <div className="flex content-between items-center gap-[4px]">
          <span
            className={`w-[6px] h-[6px] rounded-full ${classes.barColor}`}
          ></span>
          {formatNumber(values[1])}
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

  const updateValue = (value: any) => {
    if (sortValue === value) {
      setReverse((current) => !current);
    } else {
      setReverse(false);
      setSortValue(value);
    }
  };

  const {
    data: data = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useAllCoinsQuery();

  let content: React.ReactNode;

  if (isLoading) {
    content = (
      <TableRow>
        <TableCell>Loading...</TableCell>
      </TableRow>
    );
  } else if (isSuccess) {
    let formattedData = formatAllCoins(data);
    if (sortValue === "#") {
      formattedData = formatAllCoins(data);
    } else if (sortValue === "Name") {
      formattedData = formattedData.sort((a: any, b: any) =>
        a.name.localeCompare(b.name)
      );
    } else if (sortValue === "Price") {
      formattedData = formattedData.sort(function (a: any, b: any) {
        return a.price - b.price;
      });
    } else if (typeof sortValue === "number") {
      formattedData = formattedData.sort(function (a: any, b: any) {
        return a.percents[sortValue].value - b.percents[sortValue].value;
      });
    }

    if (reverse) {
      formattedData = formattedData.reverse();
    }

    content = formattedData.map((data: any, index: number) => {
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
          key={data.id}
          className="bg-white text-[--dark-gunmetal] dark:text-white dark:bg-[#191925] w-full h-[77px] border-none"
        >
          <TableCell className="rounded-l-xl">
            <span className="px-[10px]">{index + 1}</span>
          </TableCell>
          <TableCell>
            <Link className="flex items-center gap-[16px]" href={`/coin/${id}`}>
              {image !== null && (
                <Avatar>
                  <AvatarImage src={image} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              )}
              {name}
            </Link>
          </TableCell>
          <TableCell>${price.toLocaleString()}</TableCell>

          {percents.map((percent: any) => (
            <TableCell key={Math.random()}>
              <div
                className={`flex text-sm ${
                  percent.rising ? "text-[--rising]" : "text-[--falling]"
                } gap-[8px]`}
              >
                <Arrow rising={percent.rising} />
                {percent.value}%
              </div>
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
              color={"white"}
              fill={"url(#area-white)"}
            />
          </TableCell>
        </TableRow>
      );
    });
  } else if (isError) {
    content = (
      <TableRow>
        <TableCell>{error.toString()}</TableCell>
      </TableRow>
    );
  }

  const SortButton = (props: { name: string; sortValue: any }) => {
    const { name, sortValue } = props;
    return (
      <button
        onClick={() => updateValue(sortValue)}
        className="w-full h-full rounded-[4px] hover:bg-[--lavender] hover:text-[--soft-blue]"
      >
        {name}
      </button>
    );
  };

  const refresh = () => {};

  const updateQuery = () => {};

  return (
    <InfiniteScroll
      dataLength={10}
      next={updateQuery}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
      refreshFunction={refresh}
      pullDownToRefresh
      pullDownToRefreshThreshold={50}
      pullDownToRefreshContent={
        <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
      }
      releaseToRefreshContent={
        <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
      }
    >
      <Table className="rounded-xl border-separate border-spacing-y-[8px]">
        <TableHeader>
          <TableRow className="border-none hover:bg-transparent">
            <TableHead>#</TableHead>
            <TableHead>
              <SortButton name="Name" sortValue="Name" />
            </TableHead>
            <TableHead>
              <SortButton name="Price" sortValue="Price" />
            </TableHead>
            <TableHead>
              <SortButton name="1h%" sortValue={0} />
            </TableHead>
            <TableHead>
              <SortButton name="24h%" sortValue={1} />
            </TableHead>
            <TableHead>
              <SortButton name="7d%" sortValue={2} />
            </TableHead>
            <TableHead>24h volume / Market Cap</TableHead>
            <TableHead>Circulating / Total supply</TableHead>
            <TableHead>Last 7d</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{content}</TableBody>
      </Table>
    </InfiniteScroll>
  );
};
export default TableComponent;
