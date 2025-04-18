import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  const currency = useAppSelector((state) => state.currency)
  const {
    data: data = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useAllCoinsQuery({currency: currency});

  let content: React.ReactNode;

  if (isLoading) {
    content = (
      <TableRow>
        <TableCell>Loading...</TableCell>
      </TableRow>
    );
  } else if (isSuccess) {
    const formattedData = formatAllCoins(data);

    content = formattedData.map((data: any) => {
      return (
        <TableRow
          key={data.id}
          className="bg-[#191925] w-full h-[77px] border-none"
        >
          <TableCell className="rounded-l-xl">
            <span className="px-[10px]">{data.number}</span>
          </TableCell>
          <TableCell>
            <Link
              className="flex items-center gap-[16px]"
              href={`/coin/${data.id}`}
            >
              {data.image !== null && (
                <Avatar>
                  <AvatarImage src={data.image} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              )}
              {data.name}
            </Link>
          </TableCell>
          <TableCell>${data.price.toLocaleString()}</TableCell>

          {data.percents.map((percent: any) => (
            <TableCell key={Math.random()}>
              <div
                className={`flex text-sm ${
                  percent.rising ? "text-[--rising]" : "text-[--falling]"
                } gap-[8px]`}
              >
                <Arrow rising={percent.rising} />
                {percent.value}
              </div>
            </TableCell>
          ))}

          <TableCell className="">
            <ProgressContainer
              numbers={data.volumeMarketCap}
              rising={data.percents[0].rising}
            />
          </TableCell>
          <TableCell className="">
            <ProgressContainer
              numbers={data.circulatingSupply}
              rising={data.percents[0].rising}
            />
          </TableCell>
          <TableCell className="rounded-r-xl w-fit p-0">
            <AreaChartComponent
              xAxis={false}
              height={"h-[37px]"}
              width={"w-[120px]"}
              data={data.lastSevenDays}
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

  return (
    <Table className="rounded-xl border-separate border-spacing-y-[8px]">
      <TableHeader>
        <TableRow className="border-none">
          <TableHead>#</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>1h%</TableHead>
          <TableHead>24h%</TableHead>
          <TableHead>7d%</TableHead>
          <TableHead>24h volume / Market Cap</TableHead>
          <TableHead>Circulating / Total supply</TableHead>
          <TableHead>Last 7d</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{content}</TableBody>
    </Table>
  );
};
export default TableComponent;
