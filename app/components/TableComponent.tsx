import { useState } from "react";
import { Table, TableHeader } from "@/components/ui/table";
import InfiniteScroll from "react-infinite-scroll-component";
import queryString from "query-string";
import TableHeaderContent from "./TableHeaderContent";
import LoadingSkeleton from "./LoadingSkeleton";
import RowContent from "./RowContent";

const TableComponent = (props: {
  currency: any;
  coinList: any;
  isError: any;
  errorMessage: string;
  updateQuery: any;
  mobileView: boolean;
}) => {
  const {
    currency,
    coinList,
    isError,
    errorMessage,
    updateQuery,
    mobileView
  } = props;
  const [sortValue, setSortValue] = useState("#");
  const [reverse, setReverse] = useState(false);
  //   data: data = [],
  //   isSuccess,
  //   isError,
  //   error,
  //   refetch,
  // } = useAllCoinsQuery({ currency: currency, page: page });

  // const updateQuery = () => {
  //   setPage(Number(page) + 1);
  // };

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
        <Table className="flex flex-col gap-[8px] border-separate border-spacing-y-[8px] w-full max-lg:w-[980px] max-sm:w-full max-lg:overflow-x-scroll">
          <TableHeader className="p-0">
            <TableHeaderContent updateValue={updateValue} mobileView={mobileView} />
          </TableHeader>
          {coinList.length > 1 && (
            <RowContent
              coinList={coinList}
              sortValue={sortValue}
              reverse={reverse}
              mobileView={mobileView}
              currency={currency}
            />
          )}
        </Table>
      </div>
    </InfiniteScroll>
  );
};
export default TableComponent;
