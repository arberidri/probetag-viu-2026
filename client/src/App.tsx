import { useEffect, useState } from "react";
import { fetchNews } from "./services/newsService";
import type { NewsItem } from "./types/news";
import { NewsList } from "./components/NewsList";

function App() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNews()
      .then((items) => {
        setNews(items);
        console.log("✅ News geladen:", items);
      })
      .catch((err) => {
        console.error("❌ Fehler:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>VIU News-Wall</h1>
        <p className="app-subtitle">Team-News aus SharePoint</p>
      </header>

      <main className="app-main">
        {/* ──────────────────────────────────────────────
            DEINE KOMPONENTEN HIER

            Du hast Zugriff auf:
            - news:    NewsItem[]   → Die News-Einträge
            - loading: boolean      → true während geladen wird
            - error:   string|null  → Fehlermeldung, falls etwas schief ging

            Erstelle z.B. <NewsList /> und <NewsCard /> Komponenten
            im Ordner src/components/
            ────────────────────────────────────────────── */}

        <NewsList news={news} />

        {loading && <p>Lade News…</p>}
        {error && <p style={{ color: "red" }}>Fehler: {error}</p>}

        {!loading && !error && (
          <pre style={{ textAlign: "left", fontSize: "0.85rem" }}>
            {JSON.stringify(news, null, 2)}
          </pre>
        )}
      </main>
    </div>
  );
}

export default App;
