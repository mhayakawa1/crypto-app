"use client";
import { useState } from "react";

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

  return (
    <div className="w-fit h-[42px] p-[4px] mt-[56px] flex gap-[8px] rounded-[6px] bg-[--dark-gunmetal]">
      {timeRanges.map((element, index) => (
        <button
          key={index}
          onClick={() => {
            toggleTimeButton(element.time);
            updateChart(element);
          }}
          className={`${
            element.active
              ? "p-[1px] bg-gradient-to-b from-[--soft-blue] to-[--american-blue] shadow-[4px_4px_15px_2px_#7878fa26]"
              : "bg-none"
          } flex items-center justify-center w-[56px] h-[34px] rounded-[6px] text-sm font-medium`}
        >
          <span
            className={`${
              element.active && "bg-[--american-blue]"
            } flex items-center justify-center w-full h-full rounded-[5px]`}
          >
            {element.time}
          </span>
        </button>
      ))}
    </div>
  );
};
export default TimeRangeButtons;
