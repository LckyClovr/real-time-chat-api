import type { Request, Response } from "express";
import { z } from "zod";

export const POST = [
  async (req: Request, res: Response) => {
    res.json({ message: "Hello World!" });
  },
];
