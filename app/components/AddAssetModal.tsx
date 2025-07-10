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
import { useCoinQuery } from "@/lib/features/api/apiSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addAsset, editAsset } from "@/lib/features/portfolio/portfolioSlice";
import { formatAllCoins } from "@/lib/format/formatAllCoins";
import Exit from "../../src/icons/Close_Circle.svg";

const AddAssetModal = (props: {
  toggleAddModal: any;
  assetData: any;
  index: number;
}) => {
  const { toggleAddModal, assetData, index } = props;
  const [asset, setAsset] = useState({
    id: Math.random(),
    coinId: "",
    name: "",
    symbol: "",
    src: "",
    initialPrice: {},
    coinAmount: 1,
    date: "",
    apiDate: "",
  });
  const [skip, setSkip] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [defaultValue, setDefaultValue] = useState("");
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [updated, setUpdated] = useState(false);
  const coinsList: any = useAppSelector((state) => state.coinsList);
  const dispatch = useAppDispatch();

  const { data: coinData = {}, isSuccess: coinIsSuccess } = useCoinQuery(
    {
      coinId: asset.coinId,
      date: asset.apiDate,
    },
    { skip: skip }
  );

  function handleSubmit(event: any) {
    event.preventDefault();
    if (asset.coinId.length) {
      const newAsset: any = JSON.parse(JSON.stringify(asset));
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
      const apiData = coinsList.find((coin: any) => coin.id === event);
      if (apiData) {
        const { id, name, symbol, image } = apiData;
        newAsset.coinId = id;
        newAsset.name = name;
        newAsset.symbol = symbol;
        newAsset.src = image;
      }
    } else if (keyName === "coinAmount") {
      newAsset.coinAmount = Number(event.target.value);
    } else if (keyName === "date") {
      const {
        target: { value },
      } = event;
      if (value !== asset.apiDate && value.length) {
        newAsset.date = value;
        const newApiDate = `${value.slice(8)}${value.slice(4, 8)}${value.slice(
          0,
          4
        )}`;
        newAsset.apiDate = newApiDate;
        setSkip(false);
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
    if (coinIsSuccess) {
      const newAsset = asset;
      newAsset.initialPrice = coinData.market_data.current_price;
      setAsset(newAsset);
    }
    if (Object.keys(asset.initialPrice).length) {
      setDisabled(false);
    }
    if (!day) {
      const today = new Date();
      setDay(today.getDate());
      setMonth(today.getMonth() + 1);
      setYear(today.getFullYear());
    }
  }, [
    assetData,
    asset,
    coinData,
    coinIsSuccess,
    coinsList,
    day,
    defaultValue,
    updated,
  ]);

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center w-[100vw] h-[100vh] bg-black/5 dark:bg-white/5 backdrop-blur-sm">
      <div className="w-fit flex flex-col gap-[32px] max-md:gap-[2vh] rounded-[20px] max-md:rounded-[10px] px-[4vw] py-[8vh] max-md:p-[16px] bg-white text-[--dark-slate-blue] dark:text-white dark:bg-[--black-russian]">
        <div className="flex justify-between items-center">
          <h2 className="max-md:text-sm lg:2xl:text-2xl">Select Coins</h2>
          <button
            onClick={() => toggleAddModal(null)}
            className="w-[24px] lg:2xl:w-[36px] h-[24px] lg:2xl:h-[36px] flex items-center justify-center rounded-full bg-[--perano] dark:bg-transparent"
          >
            <Image src={Exit} alt="" className="w-full"></Image>
          </button>
        </div>
        <div className="flex max-md:flex-col gap-[2vw]">
          <div className="px-[2vw] max-md:p-[8px] flex flex-col max-md:flex-row justify-center max-md:justify-start items-center gap-[24px] max-md:gap-[12px] lg:2xl:gap-[36px] aspect-[49/40] max-md:aspect-auto text-2xl bg-white dark:bg-[--mirage] rounded-[8px] lg:2xl:rounded-[12px]">
            <div className="aspect-square p-[16px] max-md:p-[8px] lg:2xl:p-[24px] rounded-[8px] lg:2xl:rounded-[12px] flex justify-center items-center bg-[--lavender] dark:bg-[--space-cadet]">
              <Avatar className="lg:2xl:w-[48px] max-md:w-[24px] lg:2xl:h-[48px] max-md:h-[24px]">
                <AvatarImage src={asset.src} />
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </div>
            <h3 className="font-bold text-2xl max-md:text-base lg:2xl:text-4xl">
              {asset.name.length
                ? `${asset.name} (${asset.symbol.toUpperCase()})`
                : null}
            </h3>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-[16px] lg:2xl:gap-[24px] p-0"
          >
            <Select
              defaultValue={assetData ? assetData.coinId : ""}
              onValueChange={(event) => handleChange(event, "coinId")}
              required={true}
            >
              <SelectTrigger className="w-full h-[44px] max-md:h-[36px] lg:2xl:h-[66px] rounded-[4px] lg:2xl:rounded-[6px] p-[8px] lg:2xl:p-[12px] max-md:text-sm lg:2xl:text-2xl bg-white dark:bg-[--mirage]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-md:h-[40vh] max-md:w-[224px] lg:2xl:text-2xl">
                {coinsList
                  ? formatAllCoins(coinsList).map((coin: any) => {
                      return (
                        <SelectItem
                          key={coin.id}
                          value={coin.id}
                          className="w-full lg:2xl:text-2xl"
                        >
                          {coin.name}
                        </SelectItem>
                      );
                    })
                  : null}
              </SelectContent>
            </Select>
            <input
              onChange={(event) => handleChange(event, "coinAmount")}
              className="w-full h-[44px] max-md:h-[36px] lg:2xl:h-[66px] rounded-[4px] lg:2xl:rounded-[6px] p-[8px] lg:2xl:p-[12px] border max-md:text-sm lg:2xl:text-2xl text-[--dark-slate-blue] dark:text-[white] dark:bg-[--mirage]"
              placeholder={asset.coinAmount.toString()}
              min="1"
              type="number"
            />
            <input
              onChange={(event) => handleChange(event, "date")}
              className="w-full h-[44px] max-md:h-[36px] lg:2xl:h-[66px] max-md:text-sm lg:2xl:text-2xl rounded-[4px] lg:2xl:rounded-[6px] p-[8px] lg:2xl:p-[12px] border dark:bg-[--mirage]"
              type="date"
              defaultValue={asset.date}
              max={`${year}-${month < 10 ? 0 : ""}${month}-${
                day < 10 ? 0 : ""
              }${day}`}
              required
            />
            <div className="flex max-md:flex-col justify-between gap-[16px] lg:2xl:gap-[24px] mt-[16px] lg:2xl:mt-[24px]">
              <button
                onClick={() => {
                  toggleAddModal(null, -1);
                }}
                className="h-[44px] max-md:h-[40px] lg:2xl:h-[66px] w-[224px] lg:2xl:w-[336px] rounded-[6px] lg:2xl:rounded-[9px] max-md:text-sm lg:2xl:text-2xl border bg-[--lavender] dark:bg-[--dark-gunmetal]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={disabled}
                className={`${
                  disabled && "opacity-50"
                } h-[44px] max-md:h-[40px] lg:2xl:h-[66px] w-[224px] lg:2xl:w-[336px] p-[1px] lg:2xl:p-[2px] rounded-[6px] lg:2xl:rounded-[9px] flex items-center justify-center bg-gradient-to-b from-[--soft-blue] to-[--perano] dark:to-[--american-blue] shadow-[4px_4px_15px_2px_#7878fa26]`}
              >
                <span className="max-md:text-sm lg:2xl:text-2xl bg-[--perano] dark:bg-[--american-blue] rounded-[6px] lg:2xl:rounded-[9px] w-full h-full flex items-center justify-center">
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
