import { Response, Request } from "express";
import * as dotenv from "dotenv";
import { PriceHistory } from "../../models/priceHistory";
import { redisClient } from "../../service/redis"; // Import Redis client
dotenv.config();

export const getPrice = async (req: Request, res: Response) => {
  const symbol = req.query.symbol;

  if (!symbol) {
    return res.status(400).json({ error: "Symbol is required" });
  }

  const pair = String(symbol).replace(/\//g, "");
  const reversePair = String(symbol).split("/").reverse().join("");
  const redisKey = `price:${pair}`;

  try {
    const cachedPrice = await redisClient.get(redisKey);
    if (cachedPrice) {
      console.log("cachedPrice", cachedPrice);
      return res.status(200).json(JSON.parse(cachedPrice));
    }

    const pricingServiceUrl = `${process.env.PRICING_SERVICE_API}?symbol=${pair}`;
    const response = await fetch(pricingServiceUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const tonUsdtPrice = parseFloat(data.price);

    const prices = {
      [pair]: tonUsdtPrice,
      [reversePair]: 1 / tonUsdtPrice,
    };

    const newPriceHistory = new PriceHistory({
      pair,
      price: tonUsdtPrice,
      inversePrice: 1 / tonUsdtPrice,
    });

    await newPriceHistory.save();
    await redisClient.setEx(redisKey, 1800, JSON.stringify(prices));
    return res.status(200).json(prices);
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "External API failure" });
  }
};
