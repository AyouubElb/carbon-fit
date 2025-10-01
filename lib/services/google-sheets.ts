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
    String(order.email ?? ""),
    String(order.phone ?? ""),
    String(order.address ?? ""),
    String(order.city ?? ""),
    String(order.postalCode ?? ""),
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
