import Link from "next/link";
const SearchItem = (props: { id: string; name: string; searchCoins: any }) => {
  const { id, name, searchCoins } = props;
  return (
    <li className="px-[8px] py-[6px] hover:bg-white dark:hover:bg-[--dark-gunmetal]">
      <Link
        className="flex items-center gap-[16px]"
        href={`/coin/${id}`}
        onClick={() => searchCoins("")}
      >
        {name}
      </Link>
    </li>
  );
};

export default SearchItem;
