import type { Response } from "express";
import { rateLimit } from "express-rate-limit";

function rateLimitResponse(response: Response) {
  response.status(429).json({
    message: "Too many requests. Please try again later.",
    requestId: response.locals.requestId
  });
}

export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  handler: (_request, response) => rateLimitResponse(response)
});

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  handler: (_request, response) => rateLimitResponse(response)
});

export const publicSubmissionRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 30,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  handler: (_request, response) => rateLimitResponse(response)
});
