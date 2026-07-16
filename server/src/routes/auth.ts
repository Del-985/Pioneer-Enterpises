import { Router } from "express";
import { z } from "zod";

import { authenticate } from "../middleware/authenticate.js";
import { createAccessToken, hashPassword, verifyPassword } from "../lib/auth.js";
import { prisma } from "../lib/prisma.js";

const router = Router();

const registerSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().transform((value) => value.toLowerCase()),
  phone: z.string().trim().min(7).max(30),
  password: z.string().min(8).max(128)
});

const loginSchema = z.object({
  email: z.string().trim().email().transform((value) => value.toLowerCase()),
  password: z.string().min(1)
});

router.post("/register", async (request, response) => {
  const input = registerSchema.parse(request.body);
  const existingUser = await prisma.user.findUnique({ where: { email: input.email } });

  if (existingUser) {
    response.status(409).json({ message: "An account already exists for that email address." });
    return;
  }

  const passwordHash = await hashPassword(input.password);
  const user = await prisma.user.create({
    data: {
      email: input.email,
      passwordHash,
      firstName: input.firstName,
      lastName: input.lastName,
      phone: input.phone,
      customer: {
        create: {
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          phone: input.phone
        }
      }
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true
    }
  });

  const token = createAccessToken({ sub: user.id, email: user.email, role: user.role });
  response.status(201).json({ user, token });
});

router.post("/login", async (request, response) => {
  const input = loginSchema.parse(request.body);
  const user = await prisma.user.findUnique({ where: { email: input.email } });

  if (!user || !(await verifyPassword(input.password, user.passwordHash))) {
    response.status(401).json({ message: "Invalid email address or password." });
    return;
  }

  if (user.status !== "ACTIVE") {
    response.status(403).json({ message: "This account is not active." });
    return;
  }

  const token = createAccessToken({ sub: user.id, email: user.email, role: user.role });
  response.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role
    }
  });
});

router.get("/me", authenticate, async (request, response) => {
  const user = await prisma.user.findUnique({
    where: { id: request.auth!.sub },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      role: true,
      emailVerifiedAt: true,
      customer: { select: { id: true } }
    }
  });

  if (!user) {
    response.status(404).json({ message: "Account not found." });
    return;
  }

  response.json({ user });
});

router.post("/forgot-password", async (request, response) => {
  z.object({ email: z.string().email() }).parse(request.body);
  response.status(202).json({
    message: "If an account exists for this email, a password reset link will be sent."
  });
});

export default router;
