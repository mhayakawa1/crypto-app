"use client";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  addToCoinsList,
  resetCoinsList,
} from "@/lib/features/coinsList/coinsListSlice";

const Main = (props: { children: any; initialCoinsList: any }) => {
  const { children, initialCoinsList } = props;
  const { currency } = useAppSelector((state) => state.currency);
  const coinsList = useAppSelector((state) => state.coinsList);
  const [initialRender, setInitialRender] = useState(true);
  const dispatch = useAppDispatch();
  const prevCurrency = useRef<any>(null);

  useEffect(() => {
    const coinsListItem = initialCoinsList.find(
      (element: any) => element.currency === currency
    );
    if (initialRender && currency === localStorage.getItem("currency")) {
      setInitialRender(false);
    }
    if (!coinsList.length && coinsListItem) {
      const { result } = coinsListItem;
      dispatch(addToCoinsList(result));
    }
    if (!initialRender && currency !== prevCurrency.current) {
      const { result } = coinsListItem;
      dispatch(resetCoinsList(result));
    }
    prevCurrency.current = currency;
  }, [coinsList.length, currency, dispatch, initialCoinsList, initialRender]);

  return <main className="py-[4vh] px-[5vw]">{children}</main>;
};
export default Main;
