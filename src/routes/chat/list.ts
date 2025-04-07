import type { Request, Response } from "express";
import authenticateRequest from "../../middlewares/authenticateRequest";
import prisma from "../../resources/prisma";
export const GET = [
  async (req: Request, res: Response) => {
    const allChats = await prisma.chat.findMany({
      include: {
        messages: true,
      },
    });

    return res.json({ chats: allChats });
  },
];
