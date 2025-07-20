import ArrowUpGreen from "../../src/icons/Arrow_Up_Green.svg";
import ArrowDownRed from "../../src/icons/Arrow_Down_Red.svg";
import Image from "next/image";

const Arrow = (props: { rising: boolean }) => {
  const { rising } = props;
  return (
    <Image
      src={rising ? ArrowUpGreen : ArrowDownRed}
      alt=""
      width="0"
      height="0"
      className="my-auto w-[8px] lg:2xl:w-[12px] h-[4px] lg:2xl:h-[6px] mx-[2px] lg:2xl:mx-[3px]"
    />
  );
};
export default Arrow;
