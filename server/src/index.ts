import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// .env liegt im Projekt-Root (eine Ebene über /server)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

import express from "express";
import cors from "cors";
import { getNewsItems } from "./sharepoint.js";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

// CORS erlauben (für den Fall, dass jemand direkt auf :3001 zugreift)
app.use(cors());

// ──────────────────────────────── API Routes ────────────────────────────────

/** GET /api/news – Alle News-Einträge aus SharePoint */
app.get("/api/news", async (_req, res) => {
  try {
    const items = await getNewsItems();
    res.json(items);
  } catch (err) {
    console.error("❌ Fehler beim Laden der News:", err);
    res.status(502).json({
      error: "News konnten nicht geladen werden.",
      details: err instanceof Error ? err.message : String(err),
    });
  }
});

/** Health-Check */
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ──────────────────────────────── Start ─────────────────────────────────────

app.listen(PORT, () => {
  console.log();
  console.log(`  🚀  VIU News-Wall API läuft:`);
  console.log(`       http://localhost:${PORT}/api/news`);
  console.log(`       http://localhost:${PORT}/api/health`);
  console.log();
});
