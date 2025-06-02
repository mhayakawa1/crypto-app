"use client";
import GradientBorderButton from "./GradientBorderButton";

const DeleteAssetModal = (props: {
  toggleDeleteModal: any;
  assetData: any;
}) => {
  const { toggleDeleteModal, assetData } = props;

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center w-[100vw] h-[100vh] bg-black/5 dark:bg-white/5 backdrop-blur-sm">
      <div className="w-[50%] max-sm:w-[80%] flex flex-col gap-[32px] lg:2xl:gap-[64px] rounded-[10px] lg:2xl:rounded-[20px] px-[6vw] py-[4vh] bg-white text-[--dark-slate-blue] dark:text-white dark:bg-[--black-russian]">
        <h2 className="text-center max-md:text-sm lg:2xl:text-3xl">
          Are you sure you want to delete this asset?
        </h2>
        <div className="flex max-sm:flex-col justify-between gap-[16px] lg:2xl:gap-[32px] mt-[16px] lg:2xl:mt-[32px]">
          <button
            onClick={() => toggleDeleteModal(null, -1, null)}
            className="h-[45px] lg:2xl:h-[90px] w-[224px] max-sm:w-full lg:2xl:w-[448px] rounded-[6px] lg:2xl:rounded-[12px] max-md:text-sm lg:2xl:text-3xl border bg-[--lavender] dark:bg-[--dark-gunmetal]"
          >
            Cancel
          </button>
          <GradientBorderButton
            handleClick={toggleDeleteModal}
            argumentList={[null, -1, assetData.id]}
            background=""
            buttonClasses="h-[45px] lg:2xl:h-[90px] w-[244px] max-sm:w-full lg:2xl:w-[488px] p-[1px] lg:2xl:p-[2px] rounded-[6px] lg:2xl:rounded-[12px] max-md:text-sm lg:2xl:text-3xl"
            spanClasses=""
            text="Delete"
            active={true}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteAssetModal;
