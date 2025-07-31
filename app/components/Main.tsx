"use client";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addToCoinsList } from "@/lib/features/coinsList/coinsListSlice";
import MobileNavbar from "./MobileNavbar";

const Main = (props: { children: any; initialCoinsList: any }) => {
  const { children, initialCoinsList } = props;
  const { currency } = useAppSelector((state) => state.currency);
  const coinsList = useAppSelector((state) => state.coinsList);
  const view = useAppSelector((state) => state.view);
  const mobileView = view[0].mobileView;
  const [initialRender, setInitialRender] = useState(true);
  const dispatch = useAppDispatch();
  const prevCurrency = useRef<any>(null);

  useEffect(() => {
    if (initialRender && currency === localStorage.getItem("currency")) {
      setInitialRender(false);
    }
    if (!coinsList.length && initialCoinsList) {
      dispatch(addToCoinsList(initialCoinsList));
    }
    prevCurrency.current = currency;
  }, [coinsList.length, currency, dispatch, initialCoinsList, initialRender]);

  return (
    <main className="relative pt-[4vh] px-[5vw]">
      {children}
      {mobileView && <MobileNavbar />}
    </main>
  );
};
export default Main;
