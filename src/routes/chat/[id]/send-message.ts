import type { Request, Response } from "express";
import authenticateRequest from "@/middlewares/authenticateRequest";
import prisma from "@/resources/prisma";
import { z } from "zod";
import { validateSchema } from "@/middlewares/validateSchema";

const messageSchema = z.object({
  message: z.string().min(1).max(100),
});

export const POST = [
  async (req: Request, res: Response) => {
    const user = await prisma.user.findFirst({
      where: {},
    });
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const body = req.body as z.infer<typeof messageSchema>;
    const chatId = req.params.id as string;
    if (!chatId) {
      return res.status(400).json({ error: "Chat ID is required" });
    }
    const chat = await prisma.chat.findUnique({
      where: { id: chatId },
      include: {
        messages: true,
      },
    });
    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }
    const newMessage = await prisma.message.create({
      data: {
        chatId: chat?.id,
        userId: user?.id,
        text: body.message,
      },
    });
    if (!newMessage) {
      return res.status(500).json({ error: "Failed to send message" });
    }
    return res.status(201).json({ message: newMessage });
  },
];
