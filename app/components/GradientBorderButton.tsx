const GradientBorderButton = (props: {
  handleClick: any;
  argumentList: any;
  background: string;
  buttonClasses: string;
  spanClasses: string;
  text: string;
  active: boolean;
  children: any;
}) => {
  const {
    handleClick,
    argumentList,
    background,
    buttonClasses,
    spanClasses,
    text,
    active,
    children,
  } = props;
  return (
    <button
      onClick={() => handleClick(...argumentList)}
      className={`${
        active
          ? "p-[1px] lg:2xl:p-[2px] bg-gradient-to-b from-[--soft-blue] to-[--perano] dark:to-[--american-blue] shadow-[4px_4px_15px_2px_#7878fa26]"
          : `${background}`
      } rounded-[6px] lg:2xl:rounded-[9px] flex ${buttonClasses}`}
    >
      <span
        className={`${
          active ? "bg-[--perano] dark:bg-[--american-blue]" : "bg-none"
        } w-full h-full rounded-[4px] lg:2xl:rounded-[6px] flex justify-center items-center ${spanClasses}`}
      >
        {children ? children : text}
      </span>
    </button>
  );
};
export default GradientBorderButton;
