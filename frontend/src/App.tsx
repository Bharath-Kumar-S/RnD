import { useEffect, useState } from "react";
import "./App.css";
import { settings } from "./settings";

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
    <div className="flex justify-center gap-4">
      {prices && (
        <h3 className="font-bold">
          TON/USDT: <span className="font-extrabold">{prices}</span>
        </h3>
      )}
      {invertedPrices && (
        <h3 className="font-bold">
          USDT/TON: <span className="font-extrabold">{invertedPrices}</span>
        </h3>
      )}
    </div>
  );
}

export default App;
