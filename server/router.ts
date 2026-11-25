import { authRouter } from "./auth-router.js";
import { cripRouter } from "./crip-router.js";
import { adminRouter } from "./admin-router.js";
import { createRouter, publicQuery } from "./middleware.js";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  crip: cripRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
