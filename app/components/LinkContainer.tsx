"use client";
import Image from "next/image";
import LinkWhite from "../../src/icons/Link_White.svg";
import CopyWhite from "../../src/icons/Copy_White.svg";
import Panel from "./Panel";

const LinkContainer = (props: { link: string; sliceIndex: number }) => {
  const { link, sliceIndex } = props;
  const shortenedLink = link.slice(sliceIndex);

  const copyText = () => {
    navigator.clipboard.writeText(link);
  };

  return (
    <Panel className="flex justify-center items-center px-[20px] gap[16px] font-medium text-base/[24px] h-[52px]">
      <a
        href={link}
        target="_blank"
        className="flex items-center justify-center bg-[--perano] dark:bg-transparent aspect-square w-[24px] h-[24px] p-[2px] rounded-[4px]"
      >
        <Image src={LinkWhite} alt="" className="w-[20px] h-auto" />
      </a>
      <p className="mx-[16px] w-full text-center truncate">{shortenedLink}</p>
      <button
        onClick={copyText}
        className="flex items-center justify-center bg-[--perano] dark:bg-transparent aspect-square w-[24px] h-[24px] p-[4px] rounded-[4px]"
      >
        <Image src={CopyWhite} alt="" className="w-[20px] h-auto" />
      </button>
    </Panel>
  );
};

export default LinkContainer;