"use client";
import Converter from "../components/Converter";
import { useAppSelector } from "@/lib/hooks";

export default function ConverterMobile() {
  const coinsList = useAppSelector((state) => state.coinsList);
  const currency = useAppSelector((state) => state.currency);
  return <Converter currency={currency} coinsList={coinsList} />;
}
