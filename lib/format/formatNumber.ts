export function formatNumber(number: number, currency: string) {
  const placeValues = [
    { letter: "Q", value: 1000000000000000 },
    { letter: "T", value: 1000000000000 },
    { letter: "B", value: 1000000000 },
    { letter: "M", value: 1000000 },
    { letter: "K", value: 1000 },
  ];
  const placeValue = placeValues.find((element) => element.value <= number) || {
    letter: "",
  };
  const numberValues = number.toLocaleString().split(",");
  let newNumber;
  const length = numberValues.length;
  if (length === 1) {
    newNumber = `${numberValues[0]}`;
  } else {
    newNumber = `${numberValues[0]}.${Math.round(
      Number(numberValues[1][0] + "." + numberValues[1][1])
    )}${placeValue.letter}`;
  }
  return `${currency}${currency.length > 1 ? " " : ""}${newNumber}`;
}
