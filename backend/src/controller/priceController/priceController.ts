import { Response, Request } from "express";
import * as dotenv from "dotenv";
dotenv.config();

export const getPrice = async (req: Request, res: Response) => {
  const symbol = req.query.symbol;

  if (!symbol) {
    return res.status(400).json({ error: "Symbol is required" });
  }

  const pricingServiceUrl = `${process.env.PRICING_SERVICE_API}?symbol=${String(
    symbol
  ).replace(/\//g, "")}`;
  console.log(req.query.symbol);

  try {
    const response = await fetch(pricingServiceUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const tonUsdtPrice = parseFloat(data.price);

    const prices = {
      [String(symbol).replace(/\//g, "")]: tonUsdtPrice,
      [String(symbol).split("/").reverse().join("")]: 1 / tonUsdtPrice,
    };

    return res.status(200).send(prices);
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "External API failure" });
  }
};
