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
    <Panel className="flex justify-center items-center px-[20px] max-sm:px-[2vw] lg:2xl:px-[40px] max-sm:py-[8px] gap-[16px] lg:2xl:gap-[32px] font-medium text-base h-[52px] lg:2xl:h-[104px] max-sm:h-auto">
      <a
        href={link}
        target="_blank"
        className="flex items-center justify-center bg-[--perano] dark:bg-transparent aspect-square w-[24px] lg:2xl:w-[48px] p-[2px] lg:2xl:p-[4px] rounded-[4px] lg:2xl:rounded-[8px]"
      >
        <Image
          src={LinkWhite}
          alt=""
          className="w-[20px] lg:2xl:w-[40px] h-auto"
        />
      </a>
      <p className="mx-[16px] max-sm:mx-0 lg:2xl:mx-[32px] w-full text-center text-sm lg:2xl:text-2xl truncate">
        {shortenedLink}
      </p>
      <button
        onClick={copyText}
        className="flex items-center justify-center bg-[--perano] dark:bg-transparent aspect-square w-[24px] lg:2xl:w-[48px] p-[4px] lg:2xl:p-[8px] rounded-[4px] lg:2xl:rounded-[8px]"
      >
        <Image
          src={CopyWhite}
          alt=""
          className="w-[20px] lg:2xl:w-[40px] h-auto"
        />
      </button>
    </Panel>
  );
};

export default LinkContainer;
