export function formatPortfolioCoin(apiData: any) {
  const {
    id,
    symbol,
    name,
    image,
    current_price,
    total_volume,
    market_cap,
    price_change_percentage_24h_in_currency,
    circulating_supply,
  } = apiData;

  return {
    id: id,
    symbol: symbol,
    name: name,
    src: image,
    price: current_price,
    priceChange: price_change_percentage_24h_in_currency,
    totalVolume: total_volume,
    marketCap: market_cap,
    circulating: circulating_supply,
  };
}
