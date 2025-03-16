"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import LogoIcon from "../../src/icons/Logo.svg";
import HomeWhite from "../../src/icons/Home_White.svg";
import HomeWhiteOutline from "../../src/icons/Home_White_Outline.svg";
import PortfolioWhite from "../../src/icons/Portfolio_White.svg";
import SearchWhite from "../../src/icons/Search_White.svg";
import Sun from "../../src/icons/Sun.svg";
import Moon from "../../src/icons/Moon.svg";

const Navbar = () => {
  const [homeActive, setHomeActive] = useState(true);
  const [darkActive, setDarkActive] = useState(true);

  const toggleHomeActive = () => {
    setHomeActive((current) => !current);
  };

  const toggleTheme = () => {
    setDarkActive((current) => !current);
  };

  const LinkContainer = (props: { src: any; path: string; name: string }) => {
    const { src, path, name } = props;
    const isHomeActive = path === "" ? homeActive : !homeActive;

    return (
      <button
        onClick={!isHomeActive ? toggleHomeActive : undefined}
        className={`flex justify-between items-center gap-[8px] ${
          !isHomeActive && "opacity-50"
        }`}
      >
        <Image src={src} alt="" />
        <Link href={`/${path}`}>{name}</Link>
      </button>
    );
  };

  return (
    <nav className="flex justify-between items-center px-[4vw]">
      <div className="flex justify-between items-center gap-[20px] text-xl font-bold">
        <Image
          src={LogoIcon.src}
          alt=""
          width={36}
          height={20}
          className="m-auto"
        />
        <h1>Logoipsm</h1>
      </div>
      <div className="flex justify-between gap-[24px]">
        <LinkContainer
          src={homeActive ? HomeWhite : HomeWhiteOutline}
          path=""
          name="Home"
        ></LinkContainer>
        <LinkContainer
          src={PortfolioWhite}
          path="portfolio"
          name="Portfolio"
        ></LinkContainer>
      </div>
      <div className="flex justify-between gap-[16px]">
        <form className="flex justify-center items-center gap-[12px] m-0 p-[16px] h-[48px] w-auto rounded-[6px] border border-[#242430] bg-[#191925]">
          <Image src={SearchWhite} alt="" />
          <input
            placeholder="Search..."
            className="flex justify-center items-center bg-transparent text-sm outline-none"
          />
        </form>

        <button onClick={toggleTheme} className="flex justify-center items-center w-[48px] h-[48px] rounded-[12px] border border-[#242430] bg-[#191925]">
          <Image src={darkActive ? Sun : Moon} alt="" />
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
