import { ChevronUp } from "lucide-react";
const ScrollToTopButton = () => {
  return (
    <button className="fixed bottom-[4vh] right-[2vw] z-20 w-[44px] max:sm:w-[36px] lg:2xl:w-[88px] aspect-square rounded-full flex justify-center items-center bg-[--dark-slate-blue] hover:bg-[--soft-blue] shadow-md dark:shadow-[--space-cadet]">
      <ChevronUp className="h-6 max-sm:h-4 lg:2xl:h-12 w-auto text-white" />
    </button>
  );
};

export default ScrollToTopButton;
