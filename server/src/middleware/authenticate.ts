import type { NextFunction, Request, Response } from "express";

import { verifyAccessToken, type AccessTokenPayload } from "../lib/auth.js";

declare global {
  namespace Express {
    interface Request {
      auth?: AccessTokenPayload;
    }
  }
}

export function authenticate(request: Request, response: Response, next: NextFunction) {
  const authorization = request.header("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    response.status(401).json({ message: "Authentication required." });
    return;
  }

  try {
    request.auth = verifyAccessToken(authorization.slice(7));
    next();
  } catch {
    response.status(401).json({ message: "Invalid or expired access token." });
  }
}

export function requireRole(...roles: AccessTokenPayload["role"][]) {
  return (request: Request, response: Response, next: NextFunction) => {
    if (!request.auth || !roles.includes(request.auth.role)) {
      response.status(403).json({ message: "You do not have permission to perform this action." });
      return;
    }

    next();
  };
}
