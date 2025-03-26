import type { Request, Response } from "express";

export const GET = [
  async (req: Request, res: Response) => {
    res.json({ message: "Hello World!" });
  },
];
