"use server";

export async function getCoinsListData(currency: string) {
  let result;
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
      result = json;
    } catch (error) {
      result = error;
    }
  return result;
}
