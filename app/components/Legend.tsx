const Legend = (props: { activeCoins: any }) => {
  const { activeCoins } = props;
  const colors = ["bg-[--soft-blue]", "bg-[--light-purple]", "bg-[--magenta]"];
  return (
    <ul className="w-fit max-sm:w-full list-none flex justify-between max-sm:justify-around items-center gap-[2vw] grow bg-white dark:bg-[--mirage] text-[--american-blue] dark:text-white p-[16px] rounded-[10px] lg:2xl:rounded-[15px]">
      {activeCoins.map((element: any, index: number) => {
        const { name } = element;
        return (
          <li key={name} className="flex items-center gap-[8px] lg:2xl:gap-[12px]">
            <span className={`w-[8px] lg:2xl:w-[12px] aspect-square ${colors[index]} rounded-full`}></span>
            <span className="text-sm lg:2xl:text-xl">{name}</span>
          </li>
        );
      })}
    </ul>
  );
};
export default Legend;
