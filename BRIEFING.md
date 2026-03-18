# 📋 VIU News-Wall – Technical Briefing

Willkommen zum Probetag! Du baust heute eine kleine Web-App, die **Team-News aus SharePoint** ausliest und ansprechend darstellt.

Die SharePoint-Anbindung (Authentifizierung, API-Calls) ist bereits fertig. Du kannst dich voll auf das **Frontend** konzentrieren.

Die Daten kommen aus dieser SharePoint-Liste: [TeamNews](https://steinbloc.sharepoint.com/sites/viu-probetag-2026/Lists/TeamNews)

---

## 🚀 Setup

```bash
# 1. Dependencies installieren (Root + Server + Client)
npm run install:all

# 2. Beide Server starten (Backend + Frontend)
npm run dev
```

Nach dem Start läuft:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3001/api/news

Öffne http://localhost:5173 im Browser – du solltest eine Meldung sehen, dass News geladen wurden. In der **Browser-Konsole (F12)** siehst du die Daten.

---

## 📡 API-Dokumentation

### `GET /api/news`

Gibt ein Array aller News-Einträge zurück.

**Beispiel-Response:**

```json
[
  {
    "id": "1",
    "title": "Sommerfest 2026",
    "content": "Am 15. Juli findet unser jährliches Sommerfest statt...",
    "category": "Event",
    "imageUrl": "https://example.com/sommerfest.jpg",
    "createdAt": "2026-03-10T09:30:00Z"
  },
  {
    "id": "2",
    "title": "Neues Projekt: Cloud Migration",
    "content": "Wir starten die Migration unserer Infrastruktur...",
    "category": "Projekt",
    "imageUrl": null,
    "createdAt": "2026-03-08T14:00:00Z"
  }
]
```

### `NewsItem` – Felder

| Feld         | Typ                                 | Beschreibung                                |
| ------------ | ----------------------------------- | ------------------------------------------- |
| `id`         | `string`                            | Eindeutige ID                               |
| `title`      | `string`                            | Titel der News                              |
| `content`    | `string`                            | Inhalt (kann HTML enthalten)                |
| `category`   | `"Event" \| "Projekt" \| "Info"`    | Kategorie des Eintrags                      |
| `imageUrl`   | `string \| null`                    | Bild-URL (kann `null` sein)                 |
| `createdAt`  | `string`                            | Erstelldatum (ISO-8601)                     |

Das TypeScript-Interface findest du in `client/src/types/news.ts`.

---

## 🌅 Vormittag (09:30 – 12:00): Daten anzeigen & Styling

### Ziel
Die News-Einträge als **Cards** darstellen – schön gestaltet, sauber strukturiert.

### Anforderungen

1. **Komponenten erstellen** im Ordner `client/src/components/`:
   - `NewsCard.tsx` – Zeigt eine einzelne News an (Titel, Kategorie-Badge, Inhalt, Bild, Datum)
   - `NewsList.tsx` – Rendert eine Liste von `NewsCard`-Komponenten

2. **Layout mit CSS** (Flexbox oder Grid):
   - Die Cards sollen in einem responsiven Grid angeordnet sein
   - Nutze die vorbereiteten CSS Custom Properties in `App.css` (z.B. `var(--viu-primary)`, `var(--viu-card-bg)`, `var(--color-event)`)

3. **Kategorie als farbigen Badge** anzeigen:
   - Event → rot (`--color-event`)
   - Projekt → grün (`--color-projekt`)
   - Info → blau (`--color-info`)

4. **Empty State**: Was zeigst du an, wenn keine News vorhanden sind?

5. **Bild-Handling**: Was passiert, wenn `imageUrl` `null` ist? (Platzhalter oder Bild weglassen)

### Tipps
- Die Daten bekommst du mit `fetchNews()` aus `src/services/newsService.ts`
- In `App.tsx` ist bereits ein `useEffect` vorbereitet, der die Daten lädt
- State-Variablen `news`, `loading` und `error` sind schon definiert

---

## ☀️ Nachmittag (14:00 – 15:30): Interaktivität & Logik

### Ziel
Die App um **Filter** und **Suche** erweitern.

### Anforderungen

1. **Kategorie-Filter**:
   - Buttons oder ein Dropdown, um News nach Kategorie zu filtern
   - z.B. "Alle", "Event", "Projekt", "Info"
   - Aktiver Filter soll visuell hervorgehoben sein

2. **Such-Leiste**:
   - Ein Textfeld für Echtzeit-Suche über die Titel
   - Die Liste soll sich beim Tippen sofort aktualisieren

3. **Bonus – Like-Button** ❤️:
   - Jede Card bekommt einen Like-Button mit Zähler
   - Rein lokaler State (muss nicht gespeichert werden)
   - Überlege: Wo speicherst du den Like-State? (In der Card? Im Parent?)

---

## 📁 Projektstruktur (für dich relevant)

```
client/src/
├── App.tsx                  ← Hier bindest du deine Komponenten ein
├── App.css                  ← Basis-Styles & CSS Custom Properties
├── types/
│   └── news.ts              ← NewsItem Interface (read-only)
├── services/
│   └── newsService.ts       ← fetchNews() Funktion (read-only)
└── components/
    └── (leer – hier baust du!)
```

**Du arbeitest primär in:**
- `client/src/components/` – Neue Komponenten erstellen
- `client/src/App.tsx` – Komponenten einbinden
- CSS-Dateien für Styling

**Nicht anfassen:**
- `server/` – Backend mit SharePoint-Anbindung (läuft bereits)
- `client/src/services/` – API-Service (fertig)
- `.env` – Zugangsdaten

---

## 🎨 Design-Hinweise

- Die Schriftart **Inter** ist bereits eingebunden
- VIU-Blau: `#0f4c81` / Akzent-Rot: `#e63946`
- Nutze die CSS-Variablen aus `App.css`:
  - `--viu-primary`, `--viu-card-bg`, `--viu-shadow`, `--viu-radius`
  - `--color-event`, `--color-projekt`, `--color-info`

---

Viel Erfolg – und bei Fragen einfach melden! 💪



url zusammenstellung :serverUrl + serverRelativeUrl
