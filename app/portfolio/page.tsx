"use client";
import React, { useState, useEffect } from "react";
import AddAssetModal from "../components/AddAssetModal";
import DeleteAssetModal from "../components/DeleteAssetModal";
import PortfolioAsset from "../components/PortfolioAsset";
import { useAllCoinsQuery } from "@/lib/features/api/apiSlice";
import { addLocalStorage } from "@/lib/features/portfolio/portfolioSlice";
import { formatPortfolioCoin } from "@/lib/format/formatPortfolioCoin";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";

const AddAssetButton = (props: { toggleAddModal: any; assetData: any }) => {
  const { toggleAddModal, assetData } = props;
  return (
    <button
      onClick={() => toggleAddModal(assetData, -1)}
      className="w-[244px] h-[45px] p-[1px] rounded-[6px] flex items-center justify-center bg-gradient-to-b from-[--soft-blue] to-[--perano] dark:to-[--american-blue] shadow-[4px_4px_15px_2px_#7878fa26]"
    >
      <span className="bg-[--perano] dark:bg-[--american-blue] rounded-[6px] w-full h-full flex items-center justify-center">
        Add Asset
      </span>
    </button>
  );
};

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
  } = useAllCoinsQuery({currency: currency.currency, page: 1});

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
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-[2vh] py-[4vh]">
      <div className="flex justify-between items-center">
        <h2 className="text-[--dark-slate-blue] dark:text-white">
          Your statistics
        </h2>
        <AddAssetButton toggleAddModal={toggleAddModal} assetData={assetData} />
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
                ></PortfolioAsset>
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
          Error: {error.toString()}
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
