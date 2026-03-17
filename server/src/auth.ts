import {
  ConfidentialClientApplication,
  type Configuration,
} from "@azure/msal-node";

// Lazy-initialisiert, damit process.env erst nach dotenv.config() gelesen wird.
let cca: ConfidentialClientApplication | null = null;

function getClient(): ConfidentialClientApplication {
  if (!cca) {
    const msalConfig: Configuration = {
      auth: {
        clientId: process.env.AZURE_CLIENT_ID!,
        clientSecret: process.env.AZURE_CLIENT_SECRET!,
        authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
      },
    };
    cca = new ConfidentialClientApplication(msalConfig);
  }
  return cca;
}

/**
 * Holt ein Access-Token für die Microsoft Graph API
 * via Client-Credentials-Flow (Application Permissions).
 *
 * MSAL cached das Token automatisch bis kurz vor Ablauf.
 */
export async function getAccessToken(): Promise<string> {
  const result = await getClient().acquireTokenByClientCredential({
    scopes: ["https://graph.microsoft.com/.default"],
  });

  if (!result?.accessToken) {
    throw new Error("Kein Access-Token erhalten – Azure-Konfiguration prüfen.");
  }

  return result.accessToken;
}
