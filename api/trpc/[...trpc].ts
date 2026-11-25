/**
 * Vercel Function: tRPC API (replaces the Hono /api/trpc/* route from server/boot.ts).
 * The Hono server in server/ is still used for local dev and self-hosting.
 */
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "../../server/router";
import { createContext } from "../../server/context";

const handler = (req: Request) =>
  fetchRequestHandler({ endpoint: "/api/trpc", req, router: appRouter, createContext });

export { handler as GET, handler as POST };
