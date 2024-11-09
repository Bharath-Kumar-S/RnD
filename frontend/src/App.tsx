import { useEffect, useState } from "react";
import "./App.css";
import { settings } from "./settings";
import { PriceCard } from "./components/PriceCard/PriceCard";

function App() {
  const [prices, setPrices] = useState();
  const [invertedPrices, setInvertedPrices] = useState();

  useEffect(() => {
    fetch(`${settings.api.baseUrl}/price?symbol=TON/USDT`)
      .then((response) => response.json())
      .then((data) => {
        setPrices(data.TONUSDT);
        setInvertedPrices(data.USDTTON);
      })
      .catch((error) => console.error("Error fetching prices:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center gap-4">
          {prices && <PriceCard currency="TON/USDT" price={prices} />}
          {invertedPrices && (
            <PriceCard currency="USDT/TON" price={invertedPrices} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
