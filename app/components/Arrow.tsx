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
      className="my-auto w-[8px] lg:2xl:w-[16px] h-[4px] lg:2xl:h-[8px] mx-[2px] lg:2xl:mx-[4px]"
    />
  );
};
export default Arrow;
