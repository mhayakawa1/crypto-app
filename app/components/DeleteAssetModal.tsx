"use client";
import { deleteAsset } from "@/lib/features/portfolio/portfolioSlice";
import { useAppDispatch } from "@/lib/hooks";

const DeleteAssetModal = (props: { toggleDeleteModal: any; assetData: any }) => {
  const { toggleDeleteModal, assetData } = props;
  const dispatch = useAppDispatch();

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center w-[100vw] h-[100vh] bg-black/5 dark:bg-white/5 backdrop-blur-sm">
      <div className="w-[50%] flex flex-col gap-[32px] rounded-[20px] p-[48px] bg-white text-[--dark-slate-blue] dark:text-white dark:bg-[#13121a]">
        <h2 className="text-center">
          Are you sure you want to delete this asset?
        </h2>
        <div className="flex justify-between gap-[16px] mt-[16px]">
          <button
            onClick={() => toggleDeleteModal(null, -1)}
            className="h-[45px] w-[224px] rounded-[6px] border bg-[--lavender] dark:bg-[#232336]"
          >
            Cancel
          </button>
          <button
            onClick={() => {toggleDeleteModal(null, -1); dispatch(deleteAsset(assetData.id))}}
            type="submit"
            className="h-[45px] w-[244px]  p-[1px] rounded-[6px] flex items-center justify-center bg-gradient-to-b from-[--soft-blue] to-[--perano] dark:to-[--american-blue] shadow-[4px_4px_15px_2px_#7878fa26]"
          >
            <span className="bg-[--perano] dark:bg-[--american-blue] rounded-[6px] w-full h-full flex items-center justify-center">
              Delete
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAssetModal;
