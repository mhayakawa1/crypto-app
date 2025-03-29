export function formatAllCoins(apiData: any) {
  const newData = apiData.map((data: any, index: number) => {
    const {
      id,
      symbol,
      name,
      image,
      current_price,
      price_change_percentage_1h_in_currency,
      price_change_percentage_24h_in_currency,
      price_change_percentage_7d_in_currency,
      total_volume,
      market_cap,
      circulating_supply,
      total_supply,
      sparkline_in_7d,
    } = data;

    const formatValue = (number: any, isPercent: boolean) => {
      const apiData = { value: number, rising: true };
      if (isPercent) {
        apiData.value = `${number.toFixed(2)}%`;
        apiData.rising = Number(number) >= 0;
        return apiData;
      } else {
        return `$${number.toLocaleString()}`;
      }
    };

    return {
      number: index + 1,
      id: id,
      symbol: symbol,
      name: name,
      image: image,
      price: current_price,
      percents: [
        formatValue(price_change_percentage_1h_in_currency, true),
        formatValue(price_change_percentage_24h_in_currency, true),
        formatValue(price_change_percentage_7d_in_currency, true),
      ],
      volumeMarketCap: {
        totalVolume: total_volume,
        marketCap: market_cap,
      },
      circulatingSupply: {
        circulating: circulating_supply,
        totalSupply: total_supply,
      },
      lastSevenDays: sparkline_in_7d.price.map((price: any, index: number) => {
        return { name: index, uv: price };
      }),
    };
  });
  return newData;
}
