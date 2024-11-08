import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [prices, setPrices] = useState();
  const [invertedPrices, setInvertedPrices] = useState();

  useEffect(() => {
    fetch("http://localhost:5001/price?symbol=TON/USDT")
      .then((response) => response.json())
      .then((data) => {
        setPrices(data.TONUSDT);
        setInvertedPrices(data.USDTTON);
      })
      .catch((error) => console.error("Error fetching prices:", error));
  }, []);

  return (
    <div style={{ display: "flex", gap: "5rem", justifyContent: "center" }}>
      {prices && <h3>TON/USDT: {prices}</h3>}
      {invertedPrices && <h3>USDT/TON: {invertedPrices}</h3>}
    </div>
  );
}

export default App;
