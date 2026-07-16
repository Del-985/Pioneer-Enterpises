import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export function notFound(request: Request, response: Response) {
  response.status(404).json({
    message: "Route not found.",
    path: request.originalUrl
  });
}

export function errorHandler(
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction
) {
  if (error instanceof ZodError) {
    response.status(400).json({
      message: "Validation failed.",
      issues: error.flatten().fieldErrors
    });
    return;
  }

  console.error(error);
  response.status(500).json({ message: "An unexpected server error occurred." });
}
