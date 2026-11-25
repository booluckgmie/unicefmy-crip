/**
 * Vercel Function: GET /api/news?type=bing|alerts|all
 * Port of netlify/functions/news.ts, reusing the shared feed fetchers.
 */
import { fetchBingNewsFeed } from "../server/lib/bing-news";
import { fetchGoogleAlertsFeeds } from "../server/lib/google-alerts";

export async function GET(request: Request) {
  const type = new URL(request.url).searchParams.get("type") ?? "all";
  let items: Awaited<ReturnType<typeof fetchBingNewsFeed>> = [];

  if (type === "bing" || type === "all") {
    items = await fetchBingNewsFeed(process.env.BING_NEWS_API_KEY ?? "").catch(() => []);
  }
  if (type === "alerts" || type === "all") {
    const seen = new Set(items.map((i) => i.url));
    const alerts = await fetchGoogleAlertsFeeds().catch(() => []);
    items = [...items, ...alerts.filter((a) => !seen.has(a.url))];
  }
  items.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return Response.json(
    { items, live: items.length > 0, count: items.length },
    { headers: { "Access-Control-Allow-Origin": "*", "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=600" } },
  );
}
