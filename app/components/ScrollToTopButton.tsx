import { ChevronUp } from "lucide-react";
const ScrollToTopButton = () => {
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <button onClick={scrollUp} className="fixed bottom-[4vh] max-sm:bottom-[72px] right-[2vw] max-sm:right-[4vw] z-20 w-[44px] lg:2xl:w-[88px] aspect-square rounded-full flex justify-center items-center bg-[--dark-slate-blue] hover:bg-[--soft-blue] shadow-md dark:shadow-[--space-cadet]">
      <ChevronUp className="h-6 lg:2xl:h-12 w-auto text-white" />
    </button>
  );
};

export default ScrollToTopButton;
