const LoadingSkeleton = (props: { isError: boolean; errorMessage: string }) => {
  const { isError, errorMessage } = props;
  return (
    <div className="flex flex-col gap-[8px] lg:2xl:gap-[12px] w-full mt-[8px] lg:2xl:mt-[12px]">
      {[...Array(5).keys()].map((key) => (
        <div
          key={key}
          className="flex items-center pl-[20px] lg:2xl:pl-[30px] w-full bg-white hover:bg-[--lavender] text-[--dark-gunmetal] dark:text-white dark:bg-[--mirage] h-[78px] lg:2xl:h-[117px] border-none rounded-xl"
        >
          <p className="lg:2xl:text-2xl">
            {isError ? errorMessage : "Loading..."}
          </p>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
