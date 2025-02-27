import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ArrowUpGreen from "../../src/icons/Arrow_Up_Green.svg";
import ArrowDownRed from "../../src/icons/Arrow_Down_Red.svg";
import Image from "next/image";

const Arrow = (props: { rising: boolean }) => {
  const { rising } = props;
  return <Image src={rising ? ArrowUpGreen : ArrowDownRed} alt="" />;
};

const TableComponent = () => {
  const [coinsData, setCoinsData] = useState([{ image: null, percents: [] }]);

  const callAPI = () => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d"
    )
      .then((res) => res.json())
      .then((result) => {
        const newResult = result.map((data: any, index: number) => {
          const {
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
            name: name,
            image: image,
            price: formatValue(current_price, false),
            oneHour: formatValue(price_change_percentage_1h_in_currency, true),
            oneDay: formatValue(price_change_percentage_24h_in_currency, true),
            oneWeek: formatValue(price_change_percentage_7d_in_currency, true),
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
              ciruclating: circulating_supply,
              totalSupply: total_supply,
            },
            lastSevenDays: sparkline_in_7d.price,
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
    <Table className="rounded-xl">
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
      <TableBody>
        {coinsData.map((data: any) => (
          <TableRow
            key={Math.random()}
            className="bg-[#191925] w-full h-[77px] border-none"
          >
            <TableCell className="rounded-l-xl">
              <span className="px-[10px]">{data.number}</span>
            </TableCell>
            <TableCell className="">
              <div className="flex">
                <Image src={data.image !== "" ? data.image : null} alt="" width={32} height={32} />
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
            <TableCell className=""></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default TableComponent;
