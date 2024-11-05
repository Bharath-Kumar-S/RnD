import express, { Request, Response } from "express";
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
});
