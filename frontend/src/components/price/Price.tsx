import { useState } from "react";
import { useGetPrice } from "@/hooks/api/useGetPrice";
import { PriceCard } from "./PriceCard/PriceCard";
import { Link } from "react-router-dom";

export const Price = () => {
  const [currency, setCurrency] = useState("TON/USDT");
  const { data, isError, isLoading } = useGetPrice(currency);

  return (
    <>
      <div className="container flex justify-between items-center mx-auto px-4 pt-8 pb-12 max-w-7xl">
        <h4 className="font-semibold text-white text-center sm:text-left">
          {currency} Price
        </h4>
        <Link to="/history" className="text-green-500 hover:underline">
          History
        </Link>
      </div>

      <div className="flex justify-center">
        <select
          value={currency}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setCurrency(e.target.value)
          }
          className="bg-green-600 border-l-green-500 text-white p-1.5 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 w-[40%]"
        >
          <option value="TON/USDT">TON/USDT</option>
          <option value="ETH/BTC">ETH/BTC</option>
          <option value="BTC/USDT">BTC/USDT</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto my-10">
        {isLoading && <p className="text-center text-white">Loading...</p>}
        {isError && (
          <p className="text-center text-red-500">Error fetching data.</p>
        )}
        {data &&
          Object.entries(data).map(([pair, price]) => (
            <PriceCard key={pair} pair={pair} price={price} />
          ))}
      </div>
    </>
  );
};
