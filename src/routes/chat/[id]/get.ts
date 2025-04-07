import type { Request, Response } from "express";
import authenticateRequest from "../../../middlewares/authenticateRequest";
import prisma from "../../../resources/prisma";

export const GET = [
  async (req: Request, res: Response) => {
    const chatId = req.params.id;
    if (!chatId) {
      return res.status(400).json({ error: "Chat ID is required" });
    }
    const chat = await prisma.chat.findUnique({
      where: { id: chatId },
      include: {
        messages: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    return res.json({ chat: chat });
  },
];
