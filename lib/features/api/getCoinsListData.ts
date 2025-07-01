"use server";

type Coin = {
  currency: string;
  result: any;
  error: any;
};

type Data = [Coin, Coin, Coin, Coin, Coin];

export async function getCoinsListData() {
  const coinData: Data = [
    { currency: "usd", result: [], error: null },
    { currency: "gbp", result: [], error: null },
    { currency: "eur", result: [], error: null },
    { currency: "btc", result: [], error: null },
    { currency: "eth", result: [], error: null },
  ];
  for (let i = 0; i < coinData.length; i++) {
    const { currency } = coinData[i];
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`;
    try {
      const options = {
        next: { revalidate: 3600 },
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const json = await response.json();
      coinData[i].result = json;
    } catch (error) {
      coinData[i].error = error;
    }
  }
  return coinData;
}
