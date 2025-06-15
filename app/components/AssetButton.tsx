import Image from "next/image";

const AssetButton = (props: {toggleAddModal: any, assetData: any, index: number, src: any}) => {
  const {toggleAddModal, assetData, index, src} = props;
    return (
    <button
      className="flex justify-center items-center bg-[--perano] dark:bg-[--american-blue] w-fit h-fit p-[8px] lg:2xl:p-[16px] rounded-[4px] lg:2xl:rounded-[8px]"
      onClick={() => toggleAddModal(assetData, index)}
    >
      <Image
        src={src}
        alt=""
        width="0"
        height="0"
        className="w-auto h-[24px] max-md:h-[16px] lg:2xl:h-[48px]"
      />
    </button>
  );
};

export default AssetButton;