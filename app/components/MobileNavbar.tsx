import { useState } from "react";
import NavLink from "./NavLink";
import OverviewWhite from "../../src/icons/Overview_White.svg";
import OverviewBlue from "../../src/icons/Overview_Blue.svg";
import ConvertWhite from "../../src/icons/Convert_White.svg";
import ConvertBlue from "../../src/icons/Convert_Blue.svg";
import PortfolioWhite from "../../src/icons/Portfolio_White.svg";
import PortfolioBlue from "../../src/icons/Portfolio_Blue.svg";
import { useAppSelector } from "@/lib/hooks";

const MobileNavbar = () => {
  const darkActive = useAppSelector((state) => state.theme)[0].darkActive;
  const [activeLink, setActiveLink] = useState("Overview");

  const updateActiveLink = (name: string) => {
    setActiveLink(name);
  };

  const linksData = [
    {
      path: "",
      src: { white: OverviewWhite.src, blue: OverviewBlue.src },
      text: "Overview",
    },
    {
      path: "convert",
      src: { white: ConvertWhite.src, blue: ConvertBlue.src },
      text: "Convert",
    },
    {
      path: "portfolio",
      src: { white: PortfolioWhite.src, blue: PortfolioBlue.src },
      text: "Portfolio",
    },
  ];

  return (
    <div className="flex justify-evenly items-center fixed bottom-0 left-0 z-10 border border-[--lavender] dark:border-[--space-cadet] bg-white/80 dark:bg-[rgb(25,25,37)]/80 text-[--dark-slate-blue] dark:text-white backdrop-blur-sm w-full py-[8px]">
      {linksData.map((data: any) => {
        const {
          path,
          src: { white, blue },
          text,
        } = data;
        const isLinkActive = activeLink === text;
        return (
          <NavLink
            key={text}
            path={path}
            src={darkActive || isLinkActive ? white : blue}
            text={text}
            isLinkActive={isLinkActive}
            updateActiveLink={updateActiveLink}
          />
        );
      })}
    </div>
  );
};

export default MobileNavbar;
