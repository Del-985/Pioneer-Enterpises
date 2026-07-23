import { randomUUID } from "node:crypto";
import type { NextFunction, Request, Response } from "express";

import { logEvent } from "../lib/logger.js";

export function requestContext(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const requestId = randomUUID();
  const startedAt = process.hrtime.bigint();

  response.locals.requestId = requestId;
  response.setHeader("X-Request-Id", requestId);

  response.on("finish", () => {
    const durationMs = Number(process.hrtime.bigint() - startedAt) / 1_000_000;
    const level = response.statusCode >= 500
      ? "error"
      : response.statusCode >= 400
        ? "warn"
        : "info";

    logEvent(level, "http_request_completed", {
      requestId,
      method: request.method,
      path: request.path,
      statusCode: response.statusCode,
      durationMs: Number(durationMs.toFixed(2))
    });
  });

  next();
}
