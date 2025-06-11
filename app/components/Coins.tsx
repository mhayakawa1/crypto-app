"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Charts from "./Charts";
import CarouselComponent from "./CarouselComponent";
import TableComponent from "./TableComponent";
import TimeRangeButtons from "./TimeRangeButtons";
import CompareButton from "./CompareButton";
import { useAllCoinsQuery } from "@/lib/features/api/apiSlice";
import { formatAllCoins } from "@/lib/format/formatAllCoins";

const Coins = (props: { currency: any; mobileView: boolean }) => {
  const { currency, mobileView } = props;
  const [compareData, setCompareData] = useState(false);
  const [days, setDays] = useState(1);
  const [intervalDaily, setIntervalDaily] = useState(false);
  const [activeCoins, setActiveCoins] = useState([
    {
      id: "bitcoin",
      name: "",
      symbol: "",
      price: 0,
      volumeMarketCap: { totalVolume: 0 },
    },
  ]);
  const [coinBId, setCoinBId] = useState("");
  const [shouldUpdateCharts, setShouldUpdateCharts] = useState(false);
  const prevCurrency = useRef<any>(currency);
  const [firstPrice, setFirstPrice] = useState(null);
  const [currencyUpdated, setCurrencyUpdated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState<any>(1);
  const [coinList, setCoinList] = useState<any[]>([{ price: null }]);
  const [initialRender, setInitialRender] = useState(true);

  const {
    data: data = [],
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useAllCoinsQuery({ currency: currency.currency, page: page });

  const updateQuery = () => {
    if (coinList.length > 1) {
      setPage(Number(page) + 1);
    }
  };

  const updateActiveCoins = (newCoins: any) => {
    setActiveCoins(newCoins);
    if (newCoins.length === 2) {
      setCoinBId(newCoins[1].id);
    } else {
      setCoinBId(newCoins[0].id);
      setShouldUpdateCharts(true);
    }
  };

  const updateCoinList = useCallback(
    (newCurrency: boolean) => {
      if (isSuccess) {
        const formattedData = formatAllCoins(data);
        let newCoinList;
        if (newCurrency || coinList.length === 1) {
          newCoinList = formattedData;
        } else {
          newCoinList = coinList.concat(formattedData);
        }
        if (currencyUpdated) {
          const newActiveCoins = activeCoins;
          updateActiveCoins(
            newActiveCoins.map((element: any) => {
              element.price = formattedData.find(
                (data: any) => data.id === element.id
              ).price;
              return element;
            })
          );
        }
        setCoinList(newCoinList);
        setFirstPrice(newCoinList[0].price);
      }
    },
    [coinList, data, activeCoins, currencyUpdated, isSuccess]
  );

  useEffect(() => {
    if (
      !initialRender &&
      prevCurrency.current &&
      prevCurrency.current !== currency
    ) {
      setPage(1);
      setCoinList([{ price: null }]);
      prevCurrency.current = currency;
      setCurrencyUpdated(true);
    }
    if (
      currencyUpdated &&
      firstPrice &&
      data[0].current_price &&
      firstPrice !== data[0].current_price
    ) {
      updateCoinList(true);
      setCurrencyUpdated(false);
    } else if (
      isSuccess &&
      !currencyUpdated &&
      !coinList.find((coin: any) => coin.id === data[0].id)
    ) {
      const formattedData = formatAllCoins(data);
      updateCoinList(false);
      prevCurrency.current = currency;
      if (initialRender) {
        setInitialRender(false);
        updateActiveCoins([formattedData[0]]);
      }
    } else if (isError && "error" in error) {
      if (error.status === "FETCH_ERROR") {
        setTimeout(() => {
          refetch();
        }, 20000);
        setErrorMessage(`${error.error}. Refetching...`);
      } else {
        setErrorMessage(error.error);
      }
    }
  }, [
    currencyUpdated,
    firstPrice,
    initialRender,
    updateCoinList,
    currency,
    page,
    isError,
    error,
    isSuccess,
    data,
    coinList,
    refetch,
  ]);

  const toggleUpdateCharts = (shouldUpdateCharts: boolean) => {
    setShouldUpdateCharts(shouldUpdateCharts);
  };

  const updateCharts = (element: any) => {
    const { days, intervalDaily } = element;
    setDays(days);
    setIntervalDaily(intervalDaily);
  };

  const toggleCompare = () => {
    setCompareData((current) => !current);
    if (compareData && activeCoins.length === 2) {
      const newActiveCoins = activeCoins.slice(1);
      setActiveCoins(newActiveCoins);
    }
  };

  return (
    <div>
      <div>
        <div className="w-full flex justify-between items-center pb-[4vh]">
          <h2 className="text-[--dark-slate-blue] lg:2xl:text-3xl max-sm:text-xs dark:text-white mr-[16px] max-sm:mr-0 max-sm:w-[50%] text-wrap">
            Select the currency to view statistics
          </h2>
          <CompareButton
            compareData={compareData}
            toggleCompare={toggleCompare}
          />
        </div>
        <CarouselComponent
          updateActiveCoins={updateActiveCoins}
          activeCoins={activeCoins}
          currency={currency}
          compareData={compareData}
          isLoading={isLoading}
          isError={isError}
          errorMessage={errorMessage}
          isSuccess={isSuccess}
          coinList={coinList}
          mobileView={mobileView}
        />
        <Charts
          currency={currency}
          coinBId={coinBId}
          compareData={compareData}
          days={days}
          intervalDaily={intervalDaily}
          activeCoins={activeCoins}
          shouldUpdateCharts={shouldUpdateCharts}
          toggleUpdateCharts={toggleUpdateCharts}
          currencyUpdated={currencyUpdated}
        />
        <TimeRangeButtons updateChart={updateCharts} />
      </div>
      <TableComponent
        currency={currency}
        coinList={coinList}
        isError={isError}
        errorMessage={errorMessage}
        updateQuery={updateQuery}
        mobileView={mobileView}
      />
    </div>
  );
};

export default Coins;
