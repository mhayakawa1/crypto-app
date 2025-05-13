import { useState, useRef, useEffect, useCallback } from "react";
import { Table, TableHeader } from "@/components/ui/table";
import InfiniteScroll from "react-infinite-scroll-component";
import queryString from "query-string";
import { useAllCoinsQuery } from "@/lib/features/api/apiSlice";
import { formatAllCoins } from "@/lib/format/formatAllCoins";
import TableHeaderContent from "./TableHeaderContent";
import LoadingSkeleton from "./LoadingSkeleton";
import RowContent from "./RowContent";

const TableComponent = (props: { currency: any }) => {
  const {
    currency: { currency, symbol },
  } = props;
  const prevCurrency = useRef<any>(currency);
  const [firstPrice, setFirstPrice] = useState(null);
  const [currencyUpdated, setCurrencyUpdated] = useState(false);
  const [sortValue, setSortValue] = useState("#");
  const [reverse, setReverse] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState<any>(1);
  const [coinList, setCoinList] = useState<any[]>([{ price: null }]);
  const [initialRender, setInitialRender] = useState(true);

  const {
    data: data = [],
    isSuccess,
    isError,
    error,
    refetch,
  } = useAllCoinsQuery({ currency: currency, page: page });

  const updateQuery = () => {
    setPage(Number(page) + 1);
  };

  const updateValue = (name: string, value: any) => {
    if (sortValue === value) {
      setReverse((current) => !current);
    } else {
      setReverse(false);
      setSortValue(value);
    }
    const parsed = queryString.parse(location.hash);
    parsed.sort = `${name.toLowerCase()}`;
    const stringified =
      sortValue === "#" ? sortValue : queryString.stringify(parsed);
    location.hash = stringified;
  };

  const updateCoinList = useCallback(
    (newCurrency: boolean) => {
      const formattedData = formatAllCoins(data);
      let newCoinList;
      if (newCurrency || coinList.length === 1) {
        newCoinList = formattedData;
      } else {
        newCoinList = coinList.concat(formattedData);
      }
      setCoinList(newCoinList);
      setFirstPrice(newCoinList[0].price);
    },
    [coinList, data]
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
      updateCoinList(false);
      setInitialRender(false);
    } else if (isError && "error" in error) {
      if (error.status === "FETCH_ERROR") {
        setTimeout(() => {
          refetch();
        }, 10000);
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
    refetch
  ]);

  return (
    <InfiniteScroll
      dataLength={coinList.length}
      next={updateQuery}
      hasMore={true}
      loader={
        <LoadingSkeleton
          isError={isError}
          errorMessage={errorMessage}
        ></LoadingSkeleton>
      }
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <div className="w-full mt-[8px]">
        <Table className="flex flex-col gap-[8px] border-separate border-spacing-y-[8px] w-full">
          <TableHeader className="p-0">
            <TableHeaderContent updateValue={updateValue} />
          </TableHeader>
          {coinList.length > 1 && (
            <RowContent
              coinList={coinList}
              sortValue={sortValue}
              reverse={reverse}
              symbol={symbol}
            />
          )}
        </Table>
      </div>
    </InfiniteScroll>
  );
};
export default TableComponent;
