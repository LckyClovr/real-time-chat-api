import { NextFunction, Request, Response } from 'express';
import
import prisma from '../resources/prisma';
import jwt from 'jsonwebtoken';

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
    const authHeader = req.headers.authorization + '';

    const token = authHeader.split(' ').at(-1);
    if (token) {
      let userId = verifyToken(token, 'http');
      if (userId) {
        req.userId = userId;
      }
      if (!userId) {
        // try decoding for satori token
        try {
          let decoded: any | null = null;
          try {
            decoded = jwt.verify(token, SATORI_TRANSFER_TOKEN) as {
              userId: string;
            };
          } catch {}
          if (!decoded?.userId)
            return res
              .status(401)
              .json({ success: false, message: 'Invalid token' });

          req.userId = decoded.userId;
        } catch {}
        // can put other tries below here
      }
    }


    if (!req.userId && !noRedirect) {
      return res.status(401).json({ error: 'not signed in' });
    }


    next();
  };

