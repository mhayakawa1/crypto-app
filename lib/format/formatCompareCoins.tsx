export function formatCompareCoins(apiData: any, days: number, intervalDaily: boolean) {
  const { prices, total_volumes } = apiData;
  const formatData = (data: any) => {
    let newData = data.slice(1);
    if (!intervalDaily && days !== 365) {
      newData = newData.filter(
        (element: any, index: number) => index % 12 === 0
      );
    }

    return newData.map((element: any, index: number) => {
      return {
        name: index + 1,
        uv: element[1],
      };
    });
  };

  return {
    pricesData: formatData(prices),
    volumesData: formatData(total_volumes),
  };
}
