import { getAccessToken } from "./auth.js";

// ────────────────────────────────────────────────────────
//  Typen
// ────────────────────────────────────────────────────────

/** Das saubere Interface, das der Praktikant im Frontend bekommt. */
export interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: "Event" | "Projekt" | "Info";
  imageUrl: string | null;
  createdAt: string; // ISO-8601
}

/** Roh-Felder, wie sie aus der Graph API kommen (ListItem.fields). */
interface SharePointFields {
  Title?: string;
  Inhalt?: string;
  Kategorie?: string;
  Bild?: { Url?: string } | string;
}

interface GraphListItemsResponse {
  value: Array<{
    id: string;
    createdDateTime: string;
    fields: SharePointFields;
  }>;
}

// ────────────────────────────────────────────────────────
//  Graph API Abfrage
// ────────────────────────────────────────────────────────

const GRAPH_BASE = "https://graph.microsoft.com/v1.0";

function buildListItemsUrl(): string {
  console.log("Build Link war erfolgreich")
  const siteId = process.env.SHAREPOINT_SITE_ID!;
  const listId = process.env.SHAREPOINT_NEWS_LIST_ID!;
  return `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items?$expand=fields&$top=50`;
}

/**
 * Holt die News-Einträge aus der SharePoint-Liste «TeamNews»
 * und mappt sie auf ein einfaches, flaches Objekt.
 */
export async function getNewsItems(): Promise<NewsItem[]> {
  const token = await getAccessToken();

  
  const res = await fetch(buildListItemsUrl(), {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  
  if (!res.ok) {
    const body = await res.text();
    console.log("body", body);
    throw new Error(
      `Graph API Fehler ${res.status}: ${body.substring(0, 500)}`
    );
  }
  

  const data: GraphListItemsResponse = await res.json();

  return data.value.map((item) => mapToNewsItem(item));
}

// ────────────────────────────────────────────────────────
//  Mapping  Graph → NewsItem
// ────────────────────────────────────────────────────────

function mapToNewsItem(raw: GraphListItemsResponse["value"][number]): NewsItem {
  const f = raw.fields;

  // Bild kann als Objekt {Url:""} oder als reiner String kommen
  let imageUrl: string | null = null;
  if (typeof f.Bild === "string" && f.Bild) {
    imageUrl = f.Bild;
        console.log("Bild-URL f+bild:", imageUrl);

  } else if (typeof f.Bild === "object" && f.Bild?.Url) {
    imageUrl = f.Bild.Url;
    console.log("Bild-URL f+bild+url:", imageUrl);
  }

  return {
    id: raw.id,
    title: f.Title ?? "(Ohne Titel)",
    content: f.Inhalt ?? "",
    category: validateCategory(f.Kategorie),
    imageUrl,
    createdAt: raw.createdDateTime,
  };
}

function validateCategory(
  value: string | undefined
): NewsItem["category"] {
  const allowed: NewsItem["category"][] = ["Event", "Projekt", "Info"];
  if (value && allowed.includes(value as NewsItem["category"])) {
    console.log("Kategorie war gültig:", value);
    return value as NewsItem["category"];
  }
  console.log("Ungültige Kategorie:", value);
  return "Event"; // Fallback
}
