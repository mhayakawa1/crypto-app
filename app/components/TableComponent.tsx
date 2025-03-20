import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "../../components/ui/progress";
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
  const [coinsData, setCoinsData] = useState([
    {
      image: null,
      percents: [{ rising: true }],
      volumeMarketCap: {
        totalVolume: 1,
        marketCap: 1,
      },
      circulatingSupply: {
        ciruclating: 1,
        totalSupply: 1,
      },
      lastSevenDays: [
        { name: 1, uv: 1 },
        { name: 1, uv: 2 },
      ],
      yRange: { min: 0, max: 100 },
    },
  ]);

  const callAPI = () => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d"
    )
      .then((res) => res.json())
      .then((result) => {
        const newResult = result.map((data: any, index: number) => {
          const {
            id,
            name,
            image,
            current_price,
            price_change_percentage_1h_in_currency,
            price_change_percentage_24h_in_currency,
            price_change_percentage_7d_in_currency,
            total_volume,
            market_cap,
            circulating_supply,
            total_supply,
            sparkline_in_7d,
          } = data;
          const prices = sparkline_in_7d.price.map(
            (price: any, index: number) => {
              return { name: index, uv: price };
            }
          );
          const sortedPrices = prices
            .map((element: any) => element.uv)
            .sort((x: any, y: any) => x - y);
          const lowest = sortedPrices[0];
          const formatValue = (number: any, isPercent: boolean) => {
            const result = { value: number, rising: true };
            if (isPercent) {
              result.value = `${number.toFixed(2)}%`;
              result.rising = Number(number) >= 0;
              return result;
            } else {
              return `$${number.toLocaleString()}`;
            }
          };

          return {
            number: index + 1,
            id: id,
            name: name,
            image: image,
            price: formatValue(current_price, false),
            percents: [
              formatValue(price_change_percentage_1h_in_currency, true),
              formatValue(price_change_percentage_24h_in_currency, true),
              formatValue(price_change_percentage_7d_in_currency, true),
            ],
            volumeMarketCap: {
              totalVolume: total_volume,
              marketCap: market_cap,
            },
            circulatingSupply: {
              circulating: circulating_supply,
              totalSupply: total_supply,
            },
            lastSevenDays: prices,
            yRange: {
              min: lowest - 0.05 * lowest,
              max: sortedPrices[sortedPrices.length - 1],
            },
          };
        });
        setCoinsData(newResult);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    callAPI();
  }, []);

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
      <TableBody className="">
        {coinsData.map((data: any) => {
          return (
            <TableRow
              key={Math.random()}
              className="bg-[#191925] w-full h-[77px] border-none"
            >
              <TableCell className="rounded-l-xl">
                <span className="px-[10px]">{data.number}</span>
              </TableCell>
              <TableCell className="">
                <div className="flex items-center gap-[16px]">
                  {data.image !== null && (
                    <Avatar>
                      <AvatarImage src={data.image} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  )}
                  {data.name}
                </div>
              </TableCell>
              <TableCell className="">{data.price}</TableCell>

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
        })}
      </TableBody>
    </Table>
  );
};
export default TableComponent;
