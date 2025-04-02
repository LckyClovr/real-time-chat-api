import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./env";

export function generateTokens(userId: string) {
  const httpToken = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "30d",
  });

  const wsToken = jwt.sign({ wsUserId: userId }, JWT_SECRET, {
    expiresIn: "30d",
  });

  return {
    token: httpToken,
    wsToken,
  };
}

export function verifyToken(token: string, type: "http" | "ws" = "http") {
  let userId = null;

  try {
    let payload = jwt.verify(token, JWT_SECRET);

    switch (type) {
      case "http":
        userId = (payload as { userId: string }).userId || null;
        break;
      case "ws":
        userId = (payload as { wsUserId: string }).wsUserId || null;
        break;
      default:
        break;
    }
  } catch {}

  return userId;
}
