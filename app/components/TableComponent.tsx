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
  const { currency, coinList, isError, errorMessage, updateQuery, mobileView } =
    props;
  const [sortValue, setSortValue] = useState("#");
  const [reverse, setReverse] = useState(false);

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
        <p
          style={{ textAlign: "center" }}
          className="lg:2xl:text-2xl text-[--dark-slate-blue] dark:text-white"
        >
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <div className="w-full mt-[8px] lg:2xl:mt-[12px]">
        <Table className="flex flex-col gap-[8px] lg:2xl:gap-[12px] border-separate border-spacing-y-[8px] lg:2xl:border-spacing-y-[12px] w-full lg:2xl:min-w-[1500px] max-lg:w-[1000px] max-sm:w-full overflow-x-scroll">
          <TableHeader className="p-0">
            <TableHeaderContent
              updateValue={updateValue}
              mobileView={mobileView}
            />
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
