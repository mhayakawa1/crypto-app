"use client";
import React, { useState, useEffect } from "react";
import AddAssetModal from "../components/AddAssetModal";
import DeleteAssetModal from "../components/DeleteAssetModal";
import PortfolioAsset from "../components/PortfolioAsset";
import GradientBorderButton from "../components/GradientBorderButton";
import { useAllCoinsQuery } from "@/lib/features/api/apiSlice";
import { addLocalStorage } from "@/lib/features/portfolio/portfolioSlice";
import { formatPortfolioCoin } from "@/lib/format/formatPortfolioCoin";
import { formatErrorMessage } from "@/lib/format/formatErrorMessage";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";

export default function Portfolio() {
  const currency = useAppSelector((state) => state.currency);
  const [addAssetVisible, setAddAssetVisible] = useState(false);
  const [deleteAssetVisible, setDeleteAssetVisible] = useState(false);
  const [assetData, setAssetData] = useState(null);
  const [index, setIndex] = useState(-1);
  const portfolio = useAppSelector((state) => state.portfolio);
  const dispatch = useAppDispatch();

  const {
    data: data = [],
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useAllCoinsQuery({ currency: currency.currency, page: 1 });

  const toggleAddModal = (assetData: any, index: number) => {
    setAssetData(assetData);
    setIndex(index);
    setAddAssetVisible((current) => !current);
  };

  const toggleDeleteModal = (data: any, index: number) => {
    setAssetData(data);
    setIndex(index);
    setDeleteAssetVisible((current) => !current);
  };

  useEffect(() => {
    const storageItem = localStorage.getItem("portfolio");
    if (storageItem) {
      dispatch(addLocalStorage(JSON.parse(storageItem)));
    }
    if (currency) {
      refetch();
    }
  }, [dispatch, currency, refetch]);

  return (
    <div className="relative flex flex-col gap-[2vh] py-[4vh] max-md:py-[0vh] max-md:w-full">
      <div className="flex justify-between items-center">
        <h2 className="lg:2xl:text-5xl text-[--dark-slate-blue] dark:text-white">
          Your statistics
        </h2>
        <GradientBorderButton
          handleClick={toggleAddModal}
          argumentList={[assetData, -1]}
          background=""
          buttonClasses="w-[244px] max-sm:w-[140px] lg:2xl:w-[488px] h-[44px] max-sm:h-[32px] lg:2xl:h-[88px]"
          spanClasses="lg:2xl:text-3xl max-sm:text-sm"
          text={"Add Asset"}
          active={true}
        />
      </div>
      {isLoading && (
        <span className="text-center mt-[16vh] text-[--dark-slate-blue] dark:text-white">
          Loading...
        </span>
      )}
      {isSuccess && (
        <div className="w-full flex flex-col gap-[2vh]">
          {portfolio.length ? (
            portfolio.map((assetData: any, index: number) => {
              const apiData = formatPortfolioCoin(
                data.find((element: any) => element.id === assetData.coinId)
              );
              return (
                <PortfolioAsset
                  key={assetData.id}
                  toggleAddModal={toggleAddModal}
                  toggleDeleteModal={toggleDeleteModal}
                  assetData={assetData}
                  apiData={apiData}
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
      {isError && (
        <span className="text-center mt-[16vh] text-[--dark-slate-blue] dark:text-white">
          {formatErrorMessage(error)}
        </span>
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
