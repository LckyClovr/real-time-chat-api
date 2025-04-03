import type { Request, Response } from "express";
import authenticateRequest from "../../middlewares/authenticateRequest";
import prisma from "../../resources/prisma";
export const GET = [
  authenticateRequest(),
  async (req: Request, res: Response) => {
    const user = prisma.user.findUnique({
      where: {
        id: req.userId,
      },
    });
    return res.json({ message: "Hello World!" });
  },
];
