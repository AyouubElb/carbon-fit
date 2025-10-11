import { google } from "googleapis";
import { OrderSheetPayload } from "../types";

function requireEnv(name: string) {
  const val = process.env[name];
  if (!val) throw new Error(`Missing env var ${name}`);
  return val;
}

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

function getJwtClient() {
  const clientEmail = requireEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  const rawKey = requireEnv("GOOGLE_PRIVATE_KEY");
  const privateKey = rawKey.replace(/\\n/g, "\n");

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

export async function appendOrderToSheet(order: OrderSheetPayload) {
  const spreadsheetId = requireEnv("GOOGLE_SHEET_ID");
  const sheetName = (
    process.env.GOOGLE_SHEET_NAME || "CarbonFit_Orders"
  ).trim();

  const auth = getJwtClient();
  const sheets = google.sheets({ version: "v4", auth });

  // fetch sheet titles for debugging
  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const sheetTitles = (meta.data.sheets ?? [])
    .map((s) => s.properties?.title)
    .filter(Boolean);
  console.log("Spreadsheet sheets:", sheetTitles);

  if (!sheetTitles.includes(sheetName)) {
    throw new Error(
      `Sheet/tab "${sheetName}" not found in spreadsheet. Available tabs: ${sheetTitles.join(
        ", "
      )}. Make sure GOOGLE_SHEET_NAME matches a tab title exactly.`
    );
  }

  // Escape single quotes in sheet name and add quotes if needed
  const escapedSheetName = sheetName.replace(/'/g, "''");
  const simpleNameRegex = /^[A-Za-z0-9_]+$/;
  const range = simpleNameRegex.test(escapedSheetName)
    ? `${escapedSheetName}!A2:K`
    : `'${escapedSheetName}'!A2:K`;

  const createdAt = new Date(order.created_at ?? Date.now());

  const formattedCreatedAt = `${pad(createdAt.getDate())}/${pad(
    createdAt.getMonth() + 1
  )}/${createdAt.getFullYear()} ${pad(createdAt.getHours())}:${pad(
    createdAt.getMinutes()
  )}`;

  const row = [
    String(order.fullName ?? ""),
    String(order.phone ?? ""),
    String(order.address ?? ""),
    String(order.city ?? ""),
    order.notes ?? "",
    Array.isArray(order.items)
      ? JSON.stringify(order.items)
      : String(order.items ?? ""),
    Number(order.total ?? 0),
    String(order.status ?? "Pending"),
    formattedCreatedAt,
  ];

  // Ensure exactly 12 columns
  const expectedCols = 11;
  if (row.length < expectedCols) {
    while (row.length < expectedCols) row.push("");
  } else if (row.length > expectedCols) {
    row.length = expectedCols;
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [row],
    },
  });
}

/*
async function debugGoogleKey() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;

  console.log("GSA EMAIL present:", Boolean(clientEmail));
  console.log("GSA PRIVATE KEY present:", Boolean(rawKey));

  if (!rawKey) return;

  // try common sanitization
  const singleLineEscaped = rawKey.includes("\\n");

  let privateKey = singleLineEscaped ? rawKey.replace(/\\n/g, "\n") : rawKey;
  privateKey = privateKey.replace(/^\uFEFF/, ""); // remove BOM
  privateKey = privateKey.replace(/\u200B/g, ""); // remove zero-width space
  privateKey = privateKey.replace(/\r/g, ""); // normalize CRLF -> LF
  privateKey = privateKey.trim();
  console.log(
    "Private key looks multiline:",
    privateKey.includes("-----BEGIN")
  );
  console.log(
    "Private key ends with footer:",
    privateKey.includes("-----END PRIVATE KEY-----")
  );
  console.log(
    "Contains non-ascii chars:",
    /[^\x00-\x7F]/.test(privateKey) ? true : false
  );
  // Attempt to create JWT and authorize
  try {
    const jwt = new google.auth.JWT({
      email: clientEmail!,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const tokens = await jwt.authorize(); // triggers the decoding / auth step
    console.log(
      "JWT authorize succeeded (debug). Token keys:",
      Object.keys(tokens)
    );
  } catch (err) {
    console.error("JWT authorize failed:", err);
  }
}
// call it once at startup for debugging
debugGoogleKey().catch((e) => console.error("debug error:", e));
*/
