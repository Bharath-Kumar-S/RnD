import { useEffect, useState } from "react";
import "./App.css";
import { settings } from "./settings";
import { PriceCard } from "./components/PriceCard/PriceCard";

function App() {
  const [currency, setCurrency] = useState("TON/USDT");
  const [prices, setPrices] = useState();
  const [invertedPrices, setInvertedPrices] = useState();

  useEffect(() => {
    fetch(`${settings.api.baseUrl}/price?symbol=${currency}`)
      .then((response) => response.json())
      .then((data) => {
        setPrices(data[currency.replace("/", "")]);
        setInvertedPrices(data[currency.split("/").reverse().join("")]);
      })
      .catch((error) => console.error("Error fetching prices:", error));
  }, [currency]);

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
        {prices && <PriceCard currency="TON/USDT" price={prices} />}
        {invertedPrices && (
          <PriceCard currency="USDT/TON" price={invertedPrices} />
        )}
      </div>
    </div>
  );
}

export default App;
