const LoadingSkeleton = (props: {isError: boolean, errorMessage: string}) => {
    const {isError, errorMessage} = props;
    return (
      <div className="flex flex-col gap-[8px] w-full mt-[8px]">
        {[...Array(5).keys()].map((key) => (
          <div
            key={key}
            className="flex items-center pl-[20px] w-full bg-white hover:bg-[--lavender] text-[--dark-gunmetal] dark:text-white dark:bg-[--mirage] h-[77px] border-none rounded-xl"
          >
            {isError ? errorMessage : "Loading..."}
          </div>
        ))}
      </div>
    );
  };

  export default LoadingSkeleton;