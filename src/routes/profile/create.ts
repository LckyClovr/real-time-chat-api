import type { Request, Response } from "express";
import authenticateRequest from "@/middlewares/authenticateRequest";
import prisma from "@/resources/prisma";
import { z } from "zod";
import { validateSchema } from "@/middlewares/validateSchema";

const profileSchema = z.object({
  username: z.string().min(1).max(25),
  name: z.string().min(1).max(25).optional(),
  imageUrl: z.string().url().optional(),
  password: z.string().min(8).max(100),
});

export const POST = [
  validateSchema(profileSchema),
  async (req: Request, res: Response) => {
    const { username, name, imageUrl, password } = req.body as z.infer<
      typeof profileSchema
    >;
    const argon2 = require("argon2");
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUser) {
      return res.status(409).json({ error: "Username already exists" });
    }

    // Hash the password before storing it
    const hashedPassword = await argon2.hash(password);
    if (!hashedPassword) {
      return res.status(500).json({ error: "Failed to hash password" });
    }
    // Store the hashed password in the database

    try {
      const user = await prisma.user.create({
        data: {
          username,
          name,
          imageUrl,
          passwordHash: hashedPassword,
        },
      });
      return res.status(201).json(user); // User created successfully
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
];
