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
  const { currency } = useAppSelector((state) => state.currency);
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
  } = useAllCoinsQuery({ currency: currency, page: 1 });

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
      <div className="w-fit flex flex-col gap-[32px] max-md:gap-[2vh] rounded-[20px] max-md:rounded-[10px] px-[4vw] py-[8vh] max-md:p-[16px] bg-white text-[--dark-slate-blue] dark:text-white dark:bg-[--black-russian]">
        <div className="flex justify-between items-center">
          <h2 className="max-md:text-sm lg:2xl:text-3xl">Select Coins</h2>
          <button
            onClick={() => toggleAddModal(null)}
            className="w-[24px] lg:2xl:w-[48px] h-[24px] lg:2xl:h-[48px] flex items-center justify-center rounded-full bg-[--perano] dark:bg-transparent"
          >
            <Image src={Exit} alt="" className="w-full"></Image>
          </button>
        </div>
        <div className="flex max-md:flex-col gap-[2vw]">
          <div className="px-[2vw] max-md:p-[8px] flex flex-col max-md:flex-row justify-center max-md:justify-start items-center gap-[24px] max-md:gap-[12px] lg:2xl:gap-[24px] aspect-[49/40] max-md:aspect-auto text-2xl bg-white dark:bg-[--mirage] rounded-[8px] lg:2xl:rounded-[16px]">
            <div className="aspect-square p-[16px] max-md:p-[8px] lg:2xl:p-[32px] rounded-[8px] lg:2xl:rounded-[16px] flex justify-center items-center bg-[--lavender] dark:bg-[--space-cadet]">
              <Avatar className="lg:2xl:w-[64px] max-md:w-[24px] lg:2xl:h-[64px] max-md:h-[24px]">
                <AvatarImage src={asset.src} />
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </div>
            <h3 className="font-bold text-2xl max-md:text-base lg:2xl:text-5xl">
              {asset.name.length
                ? `${asset.name} (${asset.symbol.toUpperCase()})`
                : null}
            </h3>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-[16px] lg:2xl:gap-[32px] p-0"
          >
            <Select
              defaultValue={assetData ? assetData.coinId : ""}
              onValueChange={(event) => handleChange(event, "coinId")}
              required={true}
            >
              <SelectTrigger className="w-full h-[44px] max-md:h-[36px] lg:2xl:h-[88px] rounded-[4px] lg:2xl:rounded-[8px] p-[8px] lg:2xl:p-[16px] max-md:text-sm lg:2xl:text-3xl bg-white dark:bg-[--mirage]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-md:h-[40vh] max-md:w-[224px] lg:2xl:text-3xl">
                {isLoading && (
                  <SelectItem value="" className="w-full lg:2xl:text-3xl">
                    Loading...
                  </SelectItem>
                )}
                {isSuccess &&
                  formatAllCoins(data).map((coin: any) => {
                    return (
                      <SelectItem key={coin.id} value={coin.id} className="w-full lg:2xl:text-3xl">
                        {coin.name}
                      </SelectItem>
                    );
                  })}
                {isError && null}
              </SelectContent>
            </Select>
            <input
              onChange={(event) => handleChange(event, "coinAmount")}
              className="w-full h-[44px] max-md:h-[36px] lg:2xl:h-[88px] rounded-[4px] lg:2xl:rounded-[8px] p-[8px] lg:2xl:p-[16px] border max-md:text-sm lg:2xl:text-3xl text-[--dark-slate-blue] dark:text-[white] dark:bg-[--mirage]"
              placeholder={asset.coinAmount.toString()}
              min="1"
              type="number"
            />
            <input
              onChange={(event) => handleChange(event, "date")}
              className="w-full h-[44px] max-md:h-[36px] lg:2xl:h-[88px] max-md:text-sm lg:2xl:text-3xl rounded-[4px] lg:2xl:rounded-[8px] p-[8px] lg:2xl:p-[16px] border dark:bg-[--mirage]"
              type="date"
              defaultValue={asset.date}
              max={`${year}-${month < 10 ? 0 : ""}${month}-${
                day < 10 ? 0 : ""
              }${day}`}
              required
            />
            <div className="flex max-md:flex-col justify-between gap-[16px] lg:2xl:gap-[32px] mt-[16px] lg:2xl:mt-[32px]">
              <button
                onClick={() => {
                  toggleAddModal(null, -1);
                }}
                className="h-[44px] max-md:h-[40px] lg:2xl:h-[88px] w-[224px] lg:2xl:w-[488px] rounded-[6px] lg:2xl:rounded-[12px] max-md:text-sm lg:2xl:text-3xl border bg-[--lavender] dark:bg-[--dark-gunmetal]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="h-[44px] max-md:h-[40px] lg:2xl:h-[88px] w-[224px] lg:2xl:w-[488px] p-[1px] lg:2xl:p-[2px] rounded-[6px] lg:2xl:rounded-[12px] flex items-center justify-center bg-gradient-to-b from-[--soft-blue] to-[--perano] dark:to-[--american-blue] shadow-[4px_4px_15px_2px_#7878fa26]"
              >
                <span className="max-md:text-sm lg:2xl:text-3xl bg-[--perano] dark:bg-[--american-blue] rounded-[6px] lg:2xl:rounded-[12px] w-full h-full flex items-center justify-center">
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
