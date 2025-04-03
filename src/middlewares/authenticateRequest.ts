import { NextFunction, Request, Response } from "express";
import prisma from "../resources/prisma";
import jwt from "jsonwebtoken";
import { verifyToken } from "../utils/Token";
export default (
    {
      noRedirect,
    }: {
      noRedirect?: boolean;
    } = {
      noRedirect: false,
    }
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization + "";

    const token = authHeader.split(" ").at(-1);
    if (token) {
      let userId = verifyToken(token, "http");
      if (userId) {
        req.userId = userId;
      }
    }

    if (!req.userId && !noRedirect) {
      return res.status(401).json({ error: "not signed in" });
    }

    next();
  };
