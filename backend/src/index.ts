import express, { Request, Response } from "express";
import { priceRouter } from "./router/priceRouter";

const app = express();

app.use(express.json());

app.get("/health-check", (req: Request, res: Response) => {
  return res.status(200).json({ message: "Server is running" });
});

app.use("/price", priceRouter);

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
