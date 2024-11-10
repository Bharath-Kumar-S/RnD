import { useState } from "react";
import "./App.css";
import { settings } from "./settings";
import { PriceCard } from "./components/PriceCard/PriceCard";
import { useQuery } from "@tanstack/react-query";

const getPrice = async (currency: string) => {
  const response = await fetch(
    `${settings.api.baseUrl}/price?symbol=${currency}`
  );
  const data = await response.json();
  return data;
};

function App() {
  const [currency, setCurrency] = useState("TON/USDT");

  const { data, isError, isLoading } = useQuery({
    queryKey: ["price", currency],
    queryFn: () => getPrice(currency),
    staleTime: 1800000, // 30 minutes cache for API response
  });

  const prices = data ? data[currency.replace("/", "")] : null;
  const invertedPrices = data
    ? data[currency.split("/").reverse().join("")]
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      <div className="container mx-auto px-4 py-8">
        <h4 className="font-semibold text-white text-center mb-4">
          {currency} Price
        </h4>
      </div>
      <div className="flex justify-center mt-4">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
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
        {prices && <PriceCard currency="TON/USDT" price={prices} />}
        {invertedPrices && (
          <PriceCard currency="USDT/TON" price={invertedPrices} />
        )}
      </div>
    </div>
  );
}

export default App;
