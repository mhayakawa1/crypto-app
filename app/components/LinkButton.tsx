"use client";
import Link from "next/link";
import Image from "next/image";

const LinkButton = (props: {
  src: any;
  path: string;
  name: string;
  homeActive: boolean;
  toggleHomeActive: any;
}) => {
  const { src, path, name, homeActive, toggleHomeActive } = props;
  const isHomeActive = path === "" ? homeActive : !homeActive;

  return (
    <button
      onClick={!isHomeActive ? toggleHomeActive : undefined}
      className={`flex justify-between items-center gap-[18px] max-lg:gap-[2px] text-[--dark-slate-blue] dark:text-white ${
        !isHomeActive && "opacity-50"
      }`}
    >
      <Link
        href={`/${path}`}
        className="flex justify-between items-center gap-[18px] max-lg:gap-[2px] max-md:text-sm"
      >
        <Image src={src} alt="" className="w-auto h-[18px]" />
        <span className="max-md:text-xs">{name}</span>
      </Link>
    </button>
  );
};

export default LinkButton;
