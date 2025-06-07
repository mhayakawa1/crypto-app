import Converter from "../components/Converter";
import { useAppSelector } from "@/lib/hooks";

const ConverterMobile = () => {
  const currency = useAppSelector((state) => state.currency);
  return <Converter currency={currency} />;
};

export default ConverterMobile;
