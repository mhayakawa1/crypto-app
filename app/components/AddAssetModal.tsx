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
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { addAsset, editAsset } from "@/lib/features/portfolio/portfolioSlice";
import { formatAllCoins } from "@/lib/format/formatAllCoins";
import Exit from "../../src/icons/Close_Circle.svg";

const AddAssetModal = (props: {
  toggleAddModal: any;
  assetData: any;
  index: number;
}) => {
  const currency = useAppSelector((state) => state.currency);
  const { toggleAddModal, assetData, index } = props;
  const [asset, setAsset] = useState({
    id: Math.random(),
    coinId: "",
    name: "",
    symbol: "",
    src: "",
    initialPrice: 1,
    coinAmount: 1,
    date: "",
    apiDate: "",
  });
  const [defaultValue, setDefaultValue] = useState("");
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const [updated, setUpdated] = useState(false);
  const dispatch = useAppDispatch();

  const { data: coinData = {} } = useCoinQuery({
    coinId: asset.coinId,
    date: asset.apiDate,
  });

  const {
    data: data = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useAllCoinsQuery({currency: currency});

  function handleSubmit(event: any) {
    event.preventDefault();
    if (asset.coinId.length) {
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
    if (keyName === "coinId") {
      const apiData = data.find((coin: any) => coin.id === event);
      if (apiData) {
        const { id, name, symbol, image } = apiData;
        newAsset.coinId = id;
        newAsset.name = name;
        newAsset.symbol = symbol;
        newAsset.src = image;
      }
    } else if (keyName === "coinAmount") {
      newAsset.coinAmount = Number(event.target.value);
    } else {
      const {
        target: { value },
      } = event;
      if (value !== asset.date) {
        newAsset.date = value;
        const newApiDate = `${value.slice(8)}${value.slice(4, 8)}${value.slice(
          0,
          4
        )}`;
        newAsset.apiDate = newApiDate;
      }
    }
    setAsset(newAsset);
  };

  useEffect(() => {
    if (assetData && !updated) {
      setAsset(assetData);
      setDefaultValue(assetData.coinId);
      setUpdated(true);
    }
  }, [assetData, asset, defaultValue, updated]);

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center w-[100vw] h-[100vh] bg-black/5 dark:bg-white/5 backdrop-blur-sm">
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
                <AvatarImage src={asset.src} />
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </div>
            <h3 className="h-[28px] font-bold text-[28px]">
              {asset.name.length
                ? `${asset.name} (${asset.symbol.toUpperCase()})`
                : null}
            </h3>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-[16px] p-0"
          >
            <Select
              defaultValue={assetData ? assetData.coinId : ""}
              onValueChange={(event) => handleChange(event, "coinId")}
              required={true}
            >
              <SelectTrigger className="w-full h-[44px] rounded-[4px] p-[8px] bg-white dark:bg-[#191925]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {isLoading && <SelectItem value="">Loading...</SelectItem>}
                {isSuccess &&
                  formatAllCoins(data).map((coin: any) => {
                    return (
                      <SelectItem key={coin.id} value={coin.id}>
                        {coin.name}
                      </SelectItem>
                    );
                  })}
                {isError && <SelectItem value="">Error: {error.toString()}</SelectItem>}
              </SelectContent>
            </Select>
            <input
              onChange={(event) => handleChange(event, "coinAmount")}
              className="w-full h-[44px] rounded-[4px] p-[8px] border text-[--dark-slate-blue] dark:text-[white] dark:bg-[#191925]"
              placeholder={asset.coinAmount.toString()}
              min="1"
              type="number"
            />
            <input
              onChange={(event) => handleChange(event, "date")}
              className="w-full h-[44px] rounded-[4px] p-[8px] border dark:bg-[#191925]"
              type="date"
              defaultValue={asset.date}
              max={`${year}-${month < 10 ? 0 : ""}${month}-${
                day < 10 ? 0 : ""
              }${day}`}
              required
            />
            <div className="flex justify-between gap-[16px] mt-[16px]">
              <button
                onClick={() => {
                  toggleAddModal(null, -1);
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
