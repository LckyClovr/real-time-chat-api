import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { StructuredError } from "../lib/error_handling/structured_error.type";

export function validateSchema<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const parseResult = schema.safeParse(req.body);
    if (!parseResult.success) {
      const error: StructuredError = {
        error_code: "ZOD_001",
        title: "Zod Validation Error",
        message: `The request body did not match the expected schema. Here are the details: ${parseResult.error.message}`,
        next_steps: "Please check the request body and try again.",
        origin: "middlewares/validateSchema.ts",
        request_id: req.headers["x-request-id"]?.toString() || null,
        route_to_resolve_issue: "/api-docs",
        HttpStatusCode: 422,
        user_id: req?.userId || null,
      };
      return res.status(400).json({ error: error });
    }

    req.body = parseResult.data;

    next();
  };
}
