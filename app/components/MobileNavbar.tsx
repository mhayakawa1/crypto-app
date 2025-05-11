import Image from "next/image";
import Overview from "../../src/icons/Overview_White.svg";
import Convert from "../../src/icons/Convert_White.svg";
import Portfolio from "../../src/icons/Portfolio_White.svg";

const NavButton = (props: { src: any; text: string }) => {
  const { src, text } = props;
  return (
    <button className="flex flex-col justify-center w-[106px] h-[53px] text-xs border">
      <Image src={src} alt="" width={20} height={20} className="mx-auto" />
      <span>{text}</span>
    </button>
  );
};

const MobileNavbar = () => {
  return (
    <div className="flex justify-evenly items-center fixed bottom-0 z-10 border-t border-[--lavender] dark:border-[--space-cadet] bg-white/80 dark:bg-[rgb(25,25,37)]/80 text-[--dark-slate-blue] dark:text-white backdrop-blur-sm w-full h-[80px]">
      <NavButton src={Overview.src} text="Overview" />
      <NavButton src={Convert.src} text="Convert" />
      <NavButton src={Portfolio.src} text="Portfolio" />
    </div>
  );
};

export default MobileNavbar;
