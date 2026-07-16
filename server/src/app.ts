import cors from "cors";
import express from "express";

import { env } from "./config/env.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import authRoutes from "./routes/auth.js";
import publicRoutes from "./routes/public.js";

export const app = express();

app.disable("x-powered-by");
app.use(cors({ origin: env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json({ limit: "2mb" }));

app.get("/health", (_request, response) => {
  response.json({ status: "ok", service: "pioneer-enterprises-api" });
});

app.use("/api/auth", authRoutes);
app.use("/api/public", publicRoutes);

app.use(notFound);
app.use(errorHandler);
