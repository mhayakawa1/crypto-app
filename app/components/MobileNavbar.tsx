import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Overview from "../../src/icons/Overview_White.svg";
import Convert from "../../src/icons/Convert_White.svg";
import Portfolio from "../../src/icons/Portfolio_White.svg";

const NavLink = (props: {
  path: string;
  src: any;
  text: string;
  activeLink: string;
  updateActiveLink: any;
}) => {
  const { path, src, text, activeLink, updateActiveLink } = props;
  const isLinkActive = activeLink === text;
  return (
    <button
      onClick={() => updateActiveLink(text)}
      className={`${
        isLinkActive
          ? "p-[1px] bg-gradient-to-b from-[--soft-blue] to-[--american-blue] shadow-[4px_4px_15px_2px_#7878fa26]"
          : "bg-[--dark-gunmetal]"
      }flex flex-col justify-center items-center w-[106px] h-[53px] text-xs rounded-[6px]`}
    >
      <Link
        href={`/${path}`}
        className={`${
          isLinkActive ? "bg-[--american-blue]" : "bg-none"
        } w-full h-full flex flex-col justify-center itmes-center rounded-[5px]`}
      >
        <Image src={src} alt="" width={20} height={20} className="mx-auto" />
        <span>{text}</span>
      </Link>
    </button>
  );
};

const MobileNavbar = () => {
  const [activeLink, setActiveLink] = useState("Overview");

  const updateActiveLink = (name: string) => {
    setActiveLink(name);
  };

  return (
    <div className="flex justify-evenly items-center fixed bottom-0 z-10 border-t border-[--lavender] dark:border-[--space-cadet] bg-white/80 dark:bg-[rgb(25,25,37)]/80 text-[--dark-slate-blue] dark:text-white backdrop-blur-sm w-full h-[80px]">
      <NavLink
        path=""
        src={Overview.src}
        text="Overview"
        activeLink={activeLink}
        updateActiveLink={updateActiveLink}
      />
      <NavLink
        path="convert"
        src={Convert.src}
        text="Convert"
        activeLink={activeLink}
        updateActiveLink={updateActiveLink}
      />
      <NavLink
        path="portfolio"
        src={Portfolio.src}
        text="Portfolio"
        activeLink={activeLink}
        updateActiveLink={updateActiveLink}
      />
    </div>
  );
};

export default MobileNavbar;
