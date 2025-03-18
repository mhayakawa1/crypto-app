let data: any[] = [];
const allCoinsData = () => {
  fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d"
  )
    .then((res) => res.json())
    .then((result) => {
      const newResult = result.map((data: any, index: number) => {
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
          const result = { value: number, rising: true };
          if (isPercent) {
            result.value = `${number.toFixed(2)}%`;
            result.rising = Number(number) >= 0;
            return result;
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
          lastSevenDays: sparkline_in_7d.price.map(
            (price: any, index: number) => {
              return { name: index, uv: price };
            }
          ),
        };
      });
      data = newResult;
      return data;
    })
    .catch((err) => console.log(err));
  setTimeout(() => {
    return data;
  }, 1000);
};

allCoinsData();
export default allCoinsData;
