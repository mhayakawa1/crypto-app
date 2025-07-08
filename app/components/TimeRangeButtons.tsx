"use client";
import { useState } from "react";
import GradientBorderButton from "./GradientBorderButton";

const TimeRangeButtons = (props: { updateChart: any }) => {
  const { updateChart } = props;
  const [timeRanges, setTimeRanges] = useState([
    { time: "1D", days: 1, intervalDaily: false, active: true },
    { time: "7D", days: 7, intervalDaily: false, active: false },
    { time: "14D", days: 14, intervalDaily: true, active: false },
    { time: "1M", days: 30, intervalDaily: true, active: false },
    { time: "1Y", days: 365, intervalDaily: true, active: false },
  ]);

  const toggleTimeButton = (value: string) => {
    const newTimeRanges = [...timeRanges];
    newTimeRanges.map((element) => {
      if (element.time === value) {
        element.active = true;
      } else {
        element.active = false;
      }
      return element;
    });
    setTimeRanges(newTimeRanges);
  };

  const handleClick = (element: any) => {
    toggleTimeButton(element.time);
    updateChart(element);
  };

  return (
    <div className="w-fit h-[42px] lg:2xl:h-[63px] p-[4px] lg:2xl:p-[6px] mt-[2vh] flex gap-[8px] lg:2xl:gap-[12px] rounded-[6px] lg:2xl:rounded-[9px] bg-[--lavender] dark:bg-[--dark-gunmetal]">
      {timeRanges.map((element) => (
        <GradientBorderButton
          key={element.time}
          handleClick={handleClick}
          argumentList={[element]}
          background="bg-transparent"
          buttonClasses="w-[56px] max-sm:w-[40px] lg:2xl:w-[84px] h-[34px] max-sm:h-[32px] lg:2xl:h-[51px]"
          spanClasses="text-[--dark-slate-blue] dark:text-white text-sm max-sm:text-xs lg:2xl:text-xl"
          text={element.time}
          active={element.active}
        >{null}</GradientBorderButton>
      ))}
    </div>
  );
};
export default TimeRangeButtons;
