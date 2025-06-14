import { Progress } from "../../components/ui/progress";

const ProgressContainer = (props: {
  numbers: object;
  rising: boolean;
  symbol: string;
}) => {
  const { numbers, rising, symbol } = props;
  const values = Object.values(numbers);
  const allClasses = [
    {
      barColor: "bg-[--bg-rising]",
      progressColor: "--rising",
      progressColorBG: "bg-[--rising]",
    },
    {
      barColor: "bg-[--bg-falling]",
      progressColor: "--falling",
      progressColorBG: "bg-[--falling]",
    },
  ];

  const classes = allClasses[Number(!rising)];

  const formatNumber = (number: number) => {
    const placeValues = [
      { letter: "Q", value: 1000000000000000 },
      { letter: "T", value: 1000000000000 },
      { letter: "B", value: 1000000000 },
      { letter: "M", value: 1000000 },
      { letter: "K", value: 1000 },
    ];
    const placeValue = placeValues.find(
      (element) => element.value <= number
    ) || {
      letter: "",
    };
    const numberValues = number.toLocaleString().split(",");

    if (numberValues.length === 1) {
      return `${symbol}${numberValues[0]}`;
    } else {
      return `${symbol}${numberValues[0]}.${numberValues[1].slice(0, 2)}${
        placeValue.letter
      }`;
    }
  };

  return (
    <div>
      <div className="w-full flex justify-between items-center h-[16px] lg:2xl:h-[32px]">
        <div
          className={`lg:2xl:text-3xl flex justify-between items-center gap-[4px] lg:2xl:gap-[8px] text-[${classes.progressColor}]`}
        >
          <span
            className={`w-[6px] lg:2xl:w-[12px] h-[6px] lg:2xl:h-[12px] rounded-full ${classes.progressColorBG}`}
          >
          </span>
            {values[0] ? formatNumber(values[0]) : "--"}
        </div>
        <div className="lg:2xl:text-3xl flex content-between items-center gap-[4px] lg:2xl:gap-[8px]">
          <span
            className={`w-[6px] lg:2xl:w-[12px] h-[6px] lg:2xl:h-[12px] rounded-full ${classes.barColor}`}
          ></span>
          {values[1] ? formatNumber(values[1]) : "--"}
        </div>
      </div>
      <Progress
        className={classes.barColor}
        value={(values[0] / (values[0] + values[1])) * 100}
        color={classes.progressColorBG}
      ></Progress>
    </div>
  );
};

export default ProgressContainer;
