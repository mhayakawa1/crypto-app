import Link from "next/link";
import Image from "next/image";
import GradientBorderButton from "./GradientBorderButton";

const NavLink = (props: {
  path: string;
  src: any;
  text: string;
  isLinkActive: boolean;
  updateActiveLink: any;
}) => {
  const { path, src, text, isLinkActive, updateActiveLink } = props;

  return (
    <GradientBorderButton
      handleClick={updateActiveLink}
      argumentList={[text]}
      background=""
      buttonClasses="w-[88px] aspect-[2/1] text-xs"
      spanClasses=""
      text={text}
      active={isLinkActive}
    >
      <Link
        href={`/${path}`}
        className={`flex flex-col justify-center items-center w-full h-full bg-none`}
      >
        <Image
          src={src}
          alt=""
          width="0"
          height="0"
          className="mx-auto w-[16px] h-auto"
        />
        <span
          className={`${
            isLinkActive ? "text-white" : "text-[--dark-slate-blue]"
          } dark:text-white text-[10px]`}
        >
          {text}
        </span>
      </Link>
    </GradientBorderButton>
  );
};

export default NavLink;
