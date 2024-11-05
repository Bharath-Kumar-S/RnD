import { Response, Request } from "express";

export const getPrice = (req: Request, res: Response) => {
  return res.status(200).json({ message: "getPrice" });
};
