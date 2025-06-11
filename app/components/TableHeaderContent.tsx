import { TableHead, TableRow } from "@/components/ui/table";
import SortButton from "./SortButton";

const TableHeaderContent = (props: { updateValue: any, mobileView: boolean }) => {
  const { updateValue, mobileView } = props;
  const headerInfoDesktop = [
    { name: "#", sortValue: "#", width: "w-[4%]" },
    { name: "Name", sortValue: "Name", width: "w-[16%]" },
    { name: "Price", sortValue: "Price", width: "w-[8%]" },
    { name: "1h%", sortValue: 0, width: "w-[6%]" },
    { name: "24h%", sortValue: 1, width: "w-[6%]" },
    { name: "7d%", sortValue: 2, width: "w-[6%]" },
    { name: "24h Vol. / Market Cap", sortValue: null, width: "grow" },
    { name: "Circulating / Total Supply", sortValue: null, width: "grow" },
    { name: "Last 7d", sortValue: null, width: "w-[120px]" },
  ];
  const headerInfoMobile = [
    { name: "Name", sortValue: "Name", width: "w-[30%]" },
    { name: "Price", sortValue: "Price", width: "w-[30%]" },
    { name: "Last 7d", sortValue: null, width: "w-[40%]" },
  ];
  const headerInfo = mobileView ? headerInfoMobile : headerInfoDesktop;

  return (
    <TableRow className="h-[50px] lg:2xl:h-[100px] hover:bg-transparent flex items-center justify-start gap-[8px] lg:2xl:gap-[16px] p-0 border-none">
      {headerInfo.map((element: any) => {
        const { name, sortValue, width } = element;
        return (
          <TableHead
            key={name}
            className={`${width} h-full flex items-center justify-center p-0 lg:2xl:text-3xl`}
          >
            {sortValue !== null ? (
              <SortButton
                name={name}
                sortValue={sortValue}
                updateValue={updateValue}
              />
            ) : (
              name
            )}
          </TableHead>
        );
      })}
    </TableRow>
  );
};

export default TableHeaderContent;
