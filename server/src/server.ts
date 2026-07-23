import { app } from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./lib/prisma.js";
import { logEvent } from "./lib/logger.js";

const server = app.listen(env.PORT, () => {
  logEvent("info", "server_started", { port: env.PORT, environment: env.NODE_ENV });
});

async function shutdown(signal: string) {
  logEvent("info", "server_shutdown_started", { signal });
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));
