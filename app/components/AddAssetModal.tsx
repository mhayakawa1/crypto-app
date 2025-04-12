"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAllCoinsQuery, useCoinQuery } from "@/lib/features/api/apiSlice";
import { useAppDispatch } from "@/lib/hooks";
import { addAsset, editAsset } from "@/lib/features/portfolio/portfolioSlice";
import { formatAllCoins } from "@/lib/format/formatAllCoins";
import Exit from "../../src/icons/Close_Circle.svg";

const emptyData = {
  id: Math.random(),
  coinId: "",
  initialPrice: null,
  coinAmount: 1,
  change: 1,
  date: "",
  apiDate: "",
};

const AddAssetModal = (props: {
  toggleAddModal: any;
  assetData: any;
  apiData: any;
  index: number;
}) => {
  const { toggleAddModal, assetData, apiData, index } = props;
  const [asset, setAsset] = useState(JSON.parse(JSON.stringify(emptyData)));
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const [coinId, setCoinId] = useState("");
  const [src, setSrc] = useState("");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [date, setDate] = useState("");
  const [apiDate, setApiDate] = useState("");
  const [updated, setUpdated] = useState(false);
  const dispatch = useAppDispatch();

  const { data: coinData = {} } = useCoinQuery(
    { coinId: coinId, date: apiDate },
    { skip: Boolean(apiDate) }
  );

  const {
    data: data = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useAllCoinsQuery();

  function handleSubmit(event: any) {
    event.preventDefault();
    console.log(coinData)
    if (Boolean(coinId.length)) {
      const newAsset: any = JSON.parse(JSON.stringify(asset));
      newAsset.initialPrice = coinData.market_data.current_price.usd;
      if (assetData) {
        const updatedAsset = {
          asset: newAsset,
          index: index,
        };
        dispatch(editAsset(updatedAsset));
      } else {
        dispatch(addAsset(newAsset));
      }
      toggleAddModal(null, -1);
    }
  }
  
  const handleChange = (event: any, keyName: any) => {
    const newAsset: any = JSON.parse(JSON.stringify(asset));
    const propertyName: keyof any = keyName;
    let newValue: any;
    if (keyName === "coinId") {
      const { id, name, symbol, image } = JSON.parse(event);
      newValue = id;
      setCoinId(id);
      setSrc(image);
      setName(name);
      setSymbol(symbol);
    } else if (keyName === "coinAmount") {
      newValue = Number(event.target.value);
    } else {
      newValue = event.target.value;
      if (newValue !== date) {
        const newApiDate = `${newValue.slice(8)}${newValue.slice(
          4,
          8
        )}${newValue.slice(0, 4)}`;
        newAsset.apiDate = newApiDate;
        setApiDate(newApiDate);
      }
    }
    newAsset[propertyName] = newValue;
    setAsset(newAsset);
  };

  useEffect(() => {
    if (assetData && apiData && !updated) {
      setAsset(assetData);
      setDate(assetData.date);
      setCoinId(assetData.coinId);
      setName(apiData.name);
      setSrc(apiData.src);
      setSymbol(apiData.symbol);
      setUpdated(true);
    }
  }, [assetData, asset, apiData, updated]);

  let content: React.ReactNode;

  if (isLoading) {
    content = <span>Loading...</span>;
  } else if (isSuccess) {
    const formattedData = formatAllCoins(data);
    content = formattedData.map((coin: any) => {
      const data = JSON.stringify(coin);
      return (
        <SelectItem key={coin.id} value={data}>
          {coin.name}
        </SelectItem>
      );
    });
  } else if (isError) {
    content = <span>{error.toString()}</span>;
  }

  return (
    <div className="absolute top-0 left-0 flex justify-center items-center w-[100vw] h-[100vh] bg-black/5 dark:bg-white/5 backdrop-blur-sm">
      <div className="w-fit flex flex-col gap-[32px] rounded-[20px] p-[48px] bg-white text-[--dark-slate-blue] dark:text-white dark:bg-[#13121a]">
        <div className="flex justify-between items-center">
          <h2>Select Coins</h2>
          <button
            onClick={() => toggleAddModal(null)}
            className="w-[24px] h-[24px] flex items-center justify-center rounded-full bg-[--perano] dark:bg-transparent"
          >
            <Image src={Exit} alt=""></Image>
          </button>
        </div>
        <div className="flex gap-[32px]">
          <div className="w-[297px] flex flex-col justify-center items-center gap-[24px] aspect-[49/40] p-[24px] text-[28px] bg-white dark:bg-[#191932] rounded-[8px]">
            <div className="w-[64px] h-[64px] rounded-[8px] flex justify-center items-center bg-[--lavender] dark:bg-[--space-cadet]">
              <Avatar>
                <AvatarImage src={src} />
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </div>
            <h3 className="h-[28px] font-bold text-[28px]">
              {Boolean(name.length) && `${name} (${symbol.toUpperCase()})`}
            </h3>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-[16px] p-0"
          >
            <Select
              defaultValue={coinId}
              onValueChange={(event) => handleChange(event, "coinId")}
              required={true}
            >
              <SelectTrigger className="w-full h-[44px] rounded-[4px] p-[8px] bg-white dark:bg-[#191925]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>{content}</SelectContent>
            </Select>
            <input
              onChange={(event) => handleChange(event, "coinAmount")}
              className="w-full h-[44px] rounded-[4px] p-[8px] border text-[--dark-slate-blue] dark:text-[white] dark:bg-[#191925]"
              placeholder="1"
              min="1"
              type="number"
            />
            <input
              onChange={(event) => handleChange(event, "date")}
              className="w-full h-[44px] rounded-[4px] p-[8px] border dark:bg-[#191925]"
              type="date"
              defaultValue={date}
              max={`${year}-${month < 10 && 0}${month}-${day < 10 && 0}${day}`}
              required
            />
            <div className="flex justify-between gap-[16px] mt-[16px]">
              <button
                onClick={() => {
                  toggleAddModal(null, -1);
                  setAsset(JSON.parse(JSON.stringify(emptyData)));
                }}
                className="h-[45px] w-[224px] rounded-[6px] border bg-[--lavender] dark:bg-[#232336]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="h-[45px] w-[244px]  p-[1px] rounded-[6px] flex items-center justify-center bg-gradient-to-b from-[--soft-blue] to-[--perano] dark:to-[--american-blue] shadow-[4px_4px_15px_2px_#7878fa26]"
              >
                <span className="bg-[--perano] dark:bg-[--american-blue] rounded-[6px] w-full h-full flex items-center justify-center">
                  Save & Continue
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAssetModal;
