import type { Request, Response } from "express";
import authenticateRequest from "../../middlewares/authenticateRequest";
import prisma from "../../resources/prisma";
import { z } from "zod";
import { validateSchema } from "../../middlewares/validateSchema";

const chatSchema = z.object({
  chatName: z.string().min(1).max(100),
});

export const POST = [
  validateSchema(chatSchema),
  async (req: Request, res: Response) => {
    const body = req.body as z.infer<typeof chatSchema>;

    const chat = await prisma.chat.create({
      data: {
        name: body.chatName,
      },
    });

    if (!chat) {
      return res.status(500).json({ error: "Failed to create chat" });
    }

    return res.status(201).json({ chat: chat });
  },
];
