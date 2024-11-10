import { useMemo, useState } from "react";
import "./App.css";
import { PriceCard } from "./components/PriceCard/PriceCard";
import { useGetPrice } from "./hooks/api/useGetPrice";

function App() {
  const [currency, setCurrency] = useState("TON/USDT");
  const invertedCurrency = useMemo(
    () => currency.split("/").reverse().join("/"),
    [currency]
  );
  const { data, isError, isLoading } = useGetPrice(currency);
  const prices = data ? data[currency.replace("/", "")] : null;
  const invertedPrices = data
    ? data[currency.split("/").reverse().join("")]
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      <div className="container mx-auto px-4 pt-8 pb-12">
        <h4 className="font-semibold text-white text-center">
          {currency} Price
        </h4>
      </div>
      <div className="flex justify-center">
        <select
          value={currency}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setCurrency(e.target.value)
          }
          className="bg-blue-600 border-l-blue-500 text-white p-1.5 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-[40%]"
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
        {prices && <PriceCard currency={currency} price={prices} />}
        {invertedPrices && (
          <PriceCard currency={invertedCurrency} price={invertedPrices} />
        )}
      </div>
    </div>
  );
}

export default App;
