# VIU News-Wall – Probetag Starter-Kit

Monorepo mit Express-Backend (MSAL Auth + Graph API Proxy) und Vite+React+TypeScript Frontend.

## Architektur

```
React Frontend (Vite :5173)
  → Vite Dev Proxy (/api)
    → Express Backend (:3001, MSAL Client-Credentials)
      → Microsoft Graph API
        → SharePoint Liste «TeamNews»
```

## Setup

```bash
npm run install:all   # Dependencies für Root + Server + Client
npm run dev           # Startet beide Server (concurrently)
```

## 1. SharePoint-Liste erstellen

Erstelle auf der gewünschten SharePoint-Site eine **Custom List** namens **TeamNews** mit diesen Spalten:

| Spaltenname  | Typ                          | Hinweise                                                |
| ------------ | ---------------------------- | ------------------------------------------------------- |
| **Title**    | Single line of text          | Existiert bereits (Standard-Spalte), umbenennen in "Titel" ist optional – der interne Name bleibt `Title` |
| **Inhalt**   | Multiple lines of text       | „Plain text" reicht, oder „Rich text" falls HTML gewünscht |
| **Kategorie**| Choice                       | Choices: `Event`, `Projekt`, `Info`                     |
| **Bild**     | Hyperlink or Picture         | Format: **Picture**. Dort wird die Bild-URL eingegeben   |

> **Tipp:** 2–4 Test-Einträge in der Liste anlegen, damit der Praktikant sofort Daten sieht.

### Spalten anlegen (Schritt für Schritt)

1. Gehe zur SharePoint-Site → **Site Contents** → **New** → **List** → Name: `TeamNews`
2. In der Liste oben auf **+ Add column** klicken:
   - **Inhalt:** → „Multiple lines of text" → Save
   - **Kategorie:** → „Choice" → Choices eintragen (`Event`, `Projekt`, `Info`) → Save
   - **Bild:** → „Hyperlink" → Format auf „Picture" stellen → Save

## 2. Site ID und List ID ermitteln

### Site ID

Öffne folgenden URL im Browser (eingeloggt mit einem Admin-Account):

```
https://graph.microsoft.com/v1.0/sites/{hostname}:/{site-path}
```

**Beispiel:** Wenn die SharePoint-Site unter `https://steinbloc.sharepoint.com/sites/VIU-News` liegt:

```
https://graph.microsoft.com/v1.0/sites/steinbloc.sharepoint.com:/sites/VIU-News
```

Alternativ im **[Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer)** ausführen. Die Response enthält:

```json
{
  "id": "steinbloc.sharepoint.com,8aee24db-745e-4e5a-baea-d1732b23456c,1e3df4ba-45a3-4ab8-9787-88002047328f"
}
```

→ Den kompletten `id`-Wert in `.env` als `SHAREPOINT_SITE_ID` eintragen.

### List ID

Sobald du die Site ID hast, die Listen abrufen:

```
https://graph.microsoft.com/v1.0/sites/{SITE_ID}/lists
```

In der Response die Liste **TeamNews** suchen und deren `id` kopieren → `.env` als `SHAREPOINT_NEWS_LIST_ID` eintragen.

**Oder Kurzweg:** Direkt nach Name filtern:

```
https://graph.microsoft.com/v1.0/sites/{SITE_ID}/lists?$filter=displayName eq 'TeamNews'
```

## 3. Azure AD App Registration

Die App Registration benötigt folgende **Application Permissions** (nicht Delegated!):

| API             | Permission        | Typ         |
| --------------- | ----------------- | ----------- |
| Microsoft Graph | `Sites.Read.All`  | Application |

- Im Azure Portal: **App Registrations** → deine App → **API permissions** → **Add a permission** → **Microsoft Graph** → **Application permissions** → `Sites.Read.All`
- Dann **Grant admin consent** klicken (Button oben)

## 4. `.env` befüllen

```env
AZURE_CLIENT_ID=<aus App Registration → Overview → Application (client) ID>
AZURE_CLIENT_SECRET=<aus App Registration → Certificates & secrets → Client secret Value>
AZURE_TENANT_ID=<aus App Registration → Overview → Directory (tenant) ID>
SHAREPOINT_SITE_ID=<Site ID aus Schritt 2>
SHAREPOINT_NEWS_LIST_ID=<List ID aus Schritt 2>
```

## Dateien für den Praktikanten

- [`BRIEFING.md`](BRIEFING.md) – Aufgabenstellung & API-Doku
- `client/src/components/` – Hier baut der Praktikant seine Komponenten
- `client/src/App.tsx` – App-Shell mit vorbereiteten State-Variablen