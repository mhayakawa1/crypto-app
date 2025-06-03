export function formatChartData(
  data: any,
  dataB: any,
) {
  return data.map((element: any, index: number) => {
    return {
      name: element.name,
      value: element.value,
      valueB: dataB[index].value,
    };
  });
}
