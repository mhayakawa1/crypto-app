"use client";
import { Button, TimeRanges } from "./homeStyles";
import { useState } from "react";

const TimeRangeButtons = () => {
  const [timeRanges, setTimeRanges] = useState([
    { time: "1D", active: true },
    { time: "7D", active: false },
    { time: "14D", active: false },
    { time: "1M", active: false },
    { time: "1Y", active: false },
    { time: "5Y", active: false },
  ]);

  const toggleTimeButton = (time: string) => {
    const newTimeRanges = [...timeRanges];
    newTimeRanges.map((element) => {
      if (element.time === time) {
        element.active = true;
      } else {
        element.active = false;
      }
      return element;
    });
    setTimeRanges(newTimeRanges);
  };

  return (
    <TimeRanges>
      {timeRanges.map((element, index) => (
        <Button
          key={index}
          onClick={() => toggleTimeButton(element.time)}
          className={`${
            element.active ? "active" : "inactive"
          } time-range-button`}
        >
          {element.time}
        </Button>
      ))}
    </TimeRanges>
  );
};
export default TimeRangeButtons;
