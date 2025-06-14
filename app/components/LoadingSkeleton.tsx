const LoadingSkeleton = (props: { isError: boolean; errorMessage: string }) => {
  const { isError, errorMessage } = props;
  return (
    <div className="flex flex-col gap-[8px] lg:2xl:gap-[16px] w-full mt-[8px] lg:2xl:mt-[16px]">
      {[...Array(5).keys()].map((key) => (
        <div
          key={key}
          className="flex items-center pl-[20px] lg:2xl:pl-[40px] w-full bg-white hover:bg-[--lavender] text-[--dark-gunmetal] dark:text-white dark:bg-[--mirage] h-[78px] lg:2xl:h-[156px] border-none rounded-xl"
        >
          <p className="lg:2xl:text-3xl">
            {isError ? errorMessage : "Loading..."}
          </p>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
