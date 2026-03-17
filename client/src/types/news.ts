/**
 * Ein News-Eintrag aus der SharePoint-Liste «TeamNews».
 *
 * Dieses Interface beschreibt die Datenstruktur, die du vom
 * API-Endpunkt /api/news bekommst. Verwende es in deinen
 * Komponenten für Type-Safety und Autocomplete.
 */
export interface NewsItem {
  /** Eindeutige ID des Eintrags */
  id: string;

  /** Titel der News */
  title: string;

  /** Inhalt / Beschreibung (kann HTML enthalten) */
  content: string;

  /** Kategorie: "Event", "Projekt" oder "Info" */
  category: "Event" | "Projekt" | "Info";

  /** URL zum Bild (kann null sein, wenn kein Bild hinterlegt ist) */
  imageUrl: string | null;

  /** Erstellungsdatum als ISO-8601 String, z.B. "2026-03-10T09:30:00Z" */
  createdAt: string;
}
