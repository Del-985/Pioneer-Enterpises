import bcrypt from "bcryptjs";
import jwt, { type SignOptions } from "jsonwebtoken";

import { env } from "../config/env.js";

export interface AccessTokenPayload {
  sub: string;
  role: "ADMIN" | "EMPLOYEE" | "CUSTOMER";
  email: string;
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}

export function createAccessToken(payload: AccessTokenPayload) {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"]
  });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, env.JWT_SECRET) as AccessTokenPayload;
}
