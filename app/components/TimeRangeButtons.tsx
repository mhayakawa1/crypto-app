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
    <div className="w-fit h-[42px] p-[4px] mt-[56px] flex gap-[8px] rounded-[6px] bg-[--lavender] dark:bg-[--dark-gunmetal]">
      {timeRanges.map((element) => (
        <GradientBorderButton
          key={element.time}
          handleClick={handleClick}
          argumentList={[element]}
          background="bg-transparent"
          buttonClasses="w-[56px] h-[34px]"
          spanClasses="text-[--dark-slate-blue] dark:text-white"
          text={element.time}
          active={element.active}
        />
      ))}
    </div>
  );
};
export default TimeRangeButtons;
