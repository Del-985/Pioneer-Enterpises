import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import { env } from "../config/env.js";
import { logEvent } from "../lib/logger.js";

export function notFound(request: Request, response: Response) {
  response.status(404).json({
    message: "Route not found.",
    path: request.path,
    requestId: response.locals.requestId
  });
}

export function errorHandler(
  error: unknown,
  request: Request,
  response: Response,
  _next: NextFunction
) {
  if (error instanceof Error && "statusCode" in error && typeof error.statusCode === "number") {
    response.status(error.statusCode).json({ message: error.message, requestId: response.locals.requestId });
    return;
  }
  if (error instanceof ZodError) {
    response.status(400).json({
      message: "Validation failed.",
      issues: error.flatten().fieldErrors,
      requestId: response.locals.requestId
    });
    return;
  }

  logEvent("error", "unhandled_request_error", {
    requestId: response.locals.requestId,
    method: request.method,
    path: request.path,
    errorName: error instanceof Error ? error.name : "UnknownError",
    errorMessage: error instanceof Error ? error.message : "Unknown error",
    stack: env.NODE_ENV === "production" || !(error instanceof Error)
      ? undefined
      : error.stack
  });

  response.status(500).json({
    message: "An unexpected server error occurred.",
    requestId: response.locals.requestId
  });
}
