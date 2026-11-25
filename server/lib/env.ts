import "dotenv/config";

// Self-hosted production fails fast on missing config. On Vercel (serverless) we
// only warn, so routes that need no secrets (news feeds, trends) keep working
// while DB/auth routes return errors until the variables are set.
function required(name: string): string {
  const value = process.env[name];
  if (!value && process.env.NODE_ENV === "production") {
    if (process.env.VERCEL) {
      console.warn(`[env] Missing environment variable: ${name}`);
    } else {
      throw new Error(`Missing required environment variable: ${name}`);
    }
  }
  return value ?? "";
}

export const env = {
  appId: required("APP_ID"),
  appSecret: required("APP_SECRET"),
  isProduction: process.env.NODE_ENV === "production",
  databaseUrl: required("DATABASE_URL"),
  kimiAuthUrl: required("KIMI_AUTH_URL"),
  kimiOpenUrl: required("KIMI_OPEN_URL"),
  ownerUnionId: process.env.OWNER_UNION_ID ?? "",
  bingNewsApiKey: process.env.BING_NEWS_API_KEY ?? "",
};
