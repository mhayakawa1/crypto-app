const SortButton = (props: {
  name: string;
  sortValue: any;
  updateValue: any;
}) => {
  const { name, sortValue, updateValue } = props;
  return (
    <button
      onClick={() => updateValue(name, sortValue)}
      className="w-full h-full rounded-[4px] lg:2xl:rounded-[8px] hover:bg-[--lavender] hover:text-[--soft-blue] dark:hover:bg-[--mirage] dark:hover:text-white"
    >
      {name}
    </button>
  );
};

export default SortButton;
