import express, { Request, Response } from "express";
import { redisClient } from "./service/redis";
import * as dotenv from "dotenv";
import { priceRouter } from "./router/priceRouter";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 5001;

app.use(express.json());

app.get("/health-check", (req: Request, res: Response) => {
  return res.status(200).json({ message: "Server is running" });
});

app.use("/price", priceRouter);

app.listen(PORT, () => {
  console.log(
    `⚡️⚡️⚡️[server]: Server is running at https://localhost:${PORT} ⚡️⚡️⚡️`
  );
  if (redisClient.isOpen) {
    console.log("Redis client is connected");
  }
});
