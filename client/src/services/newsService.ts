import type { NewsItem } from "../types/news";

/**
 * Holt alle News-Einträge vom Backend.
 *
 * Der Vite Dev-Server leitet /api/* automatisch an den
 * Express-Server weiter (siehe vite.config.ts → proxy).
 */
export async function fetchNews(): Promise<NewsItem[]> {
  const response = await fetch("/api/news");

  if (!response.ok) {
    throw new Error(`Fehler beim Laden der News (HTTP ${response.status})`);
  }

  const data: NewsItem[] = await response.json();
  return data;
}
