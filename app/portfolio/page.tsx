"use client";
import React, { useState, useEffect } from "react";
import AddAssetModal from "../components/AddAssetModal";
import DeleteAssetModal from "../components/DeleteAssetModal";
import PortfolioAsset from "../components/PortfolioAsset";
import GradientBorderButton from "../components/GradientBorderButton";
import {
  addLocalStorage,
  deleteAsset,
} from "@/lib/features/portfolio/portfolioSlice";
import { formatPortfolioCoin } from "@/lib/format/formatPortfolioCoin";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";

export default function Portfolio() {
  const currency = useAppSelector((state) => state.currency);
  const [addAssetVisible, setAddAssetVisible] = useState(false);
  const [deleteAssetVisible, setDeleteAssetVisible] = useState(false);
  const [assetData, setAssetData] = useState(null);
  const [index, setIndex] = useState(-1);
  const portfolio = useAppSelector((state) => state.portfolio);
  const coinsList = useAppSelector((state) => state.coinsList);
  const dispatch = useAppDispatch();

  const toggleAddModal = (assetData: any, index: number) => {
    setAssetData(assetData);
    setIndex(index);
    setAddAssetVisible((current) => !current);
  };

  const toggleDeleteModal = (coinsList: any, index: number, id: any) => {
    setAssetData(coinsList);
    setIndex(index);
    setDeleteAssetVisible((current) => !current);
    if (id) {
      dispatch(deleteAsset(id));
    }
  };

  useEffect(() => {
    const storageItem = localStorage.getItem("portfolio");
    if (storageItem) {
      dispatch(addLocalStorage(JSON.parse(storageItem)));
    }
  }, [dispatch, coinsList, currency]);

  return (
    <div className="relative flex flex-col gap-[2vh] py-[4vh] max-md:py-[0vh] max-sm:pb-[100px] max-md:w-full">
      <div className="flex justify-between items-center">
        <h2 className="lg:2xl:text-4xl text-[--dark-slate-blue] dark:text-white">
          Your statistics
        </h2>
        <GradientBorderButton
          handleClick={toggleAddModal}
          argumentList={[assetData, -1]}
          background=""
          buttonClasses="w-[244px] max-sm:w-[140px] lg:2xl:w-[366px] h-[44px] max-sm:h-[32px] lg:2xl:h-[66px]"
          spanClasses="lg:2xl:text-2xl max-sm:text-sm"
          text={"Add Asset"}
          active={true}
        >
          {null}
        </GradientBorderButton>
      </div>
      {coinsList.length && (
        <div className="w-full flex flex-col gap-[2vh]">
          {portfolio.length ? (
            portfolio.map((assetData: any, index: number) => {
              const apiData = formatPortfolioCoin(
                coinsList.find(
                  (element: any) => element.id === assetData.coinId
                )
              );
              return (
                <PortfolioAsset
                  key={assetData.id}
                  toggleAddModal={toggleAddModal}
                  toggleDeleteModal={toggleDeleteModal}
                  assetData={assetData}
                  apiData={
                    apiData
                      ? apiData
                      : {
                          circulating: null,
                          marketCap: null,
                          price: null,
                          priceChange: null,
                          totalVolume: null,
                        }
                  }
                  index={index}
                  currency={currency}
                />
              );
            })
          ) : (
            <h3 className="text-center mt-[16vh] text-[--dark-slate-blue] dark:text-white">
              Your portfolio is empty.
            </h3>
          )}
        </div>
      )}
      {addAssetVisible && (
        <AddAssetModal
          toggleAddModal={toggleAddModal}
          assetData={assetData}
          index={index}
        />
      )}
      {deleteAssetVisible && (
        <DeleteAssetModal
          toggleDeleteModal={toggleDeleteModal}
          assetData={assetData}
        />
      )}
    </div>
  );
}
