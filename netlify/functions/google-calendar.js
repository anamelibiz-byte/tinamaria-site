// Google Calendar Sync — Two-way sync with Google Calendar
// Requires: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN
// Calendar: hello@tinamaria.com (Google Workspace)

const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.URL || "https://tinamaria.com"}/.netlify/functions/google-calendar?action=callback`
);

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  const params = event.queryStringParameters || {};
  const action = params.action || "status";

  try {
    // --- AUTH: Generate Google OAuth URL ---
    if (action === "auth") {
      const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: ["https://www.googleapis.com/auth/calendar"],
        prompt: "consent",
      });
      return { statusCode: 200, headers, body: JSON.stringify({ authUrl: url }) };
    }

    // --- CALLBACK: Exchange code for tokens ---
    if (action === "callback") {
      const code = params.code;
      if (!code) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: "Missing auth code" }) };
      }
      const { tokens } = await oauth2Client.getToken(code);
      // In production, store the refresh token securely (e.g., in Netlify env vars)
      return {
        statusCode: 200,
        headers: { ...headers, "Content-Type": "text/html" },
        body: `<html><body style="font-family:sans-serif;text-align:center;padding:60px">
          <h2>Google Calendar Connected!</h2>
          <p>Save this refresh token to your Netlify environment variables as <code>GOOGLE_REFRESH_TOKEN</code>:</p>
          <textarea style="width:100%;height:80px;font-size:12px">${tokens.refresh_token}</textarea>
          <p>You can close this window now.</p>
        </body></html>`,
      };
    }

    // --- For all other actions, set up authenticated client ---
    if (!process.env.GOOGLE_REFRESH_TOKEN) {
      return { statusCode: 401, headers, body: JSON.stringify({ error: "Not connected. Use action=auth to connect Google Calendar." }) };
    }

    oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    // --- STATUS: Check connection ---
    if (action === "status") {
      const calList = await calendar.calendarList.list();
      const primary = calList.data.items.find((c) => c.primary) || calList.data.items[0];
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ connected: true, calendar: primary?.summary, email: primary?.id }),
      };
    }

    // --- LIST: Get upcoming events ---
    if (action === "list") {
      const now = new Date();
      const weekFromNow = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
      const events = await calendar.events.list({
        calendarId: "primary",
        timeMin: now.toISOString(),
        timeMax: weekFromNow.toISOString(),
        singleEvents: true,
        orderBy: "startTime",
        maxResults: 50,
      });
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ events: events.data.items }),
      };
    }

    // --- CREATE: Add event to Google Calendar ---
    if (action === "create" && event.httpMethod === "POST") {
      const { summary, description, startTime, endTime, attendeeEmail } = JSON.parse(event.body);
      const calEvent = {
        summary,
        description: description || `Booking via TinaMaria.com`,
        start: { dateTime: startTime, timeZone: "America/New_York" },
        end: { dateTime: endTime, timeZone: "America/New_York" },
        attendees: attendeeEmail ? [{ email: attendeeEmail }] : [],
        reminders: { useDefault: false, overrides: [{ method: "email", minutes: 60 }, { method: "popup", minutes: 15 }] },
      };
      const result = await calendar.events.insert({ calendarId: "primary", resource: calEvent, sendUpdates: "all" });
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, event: result.data }),
      };
    }

    // --- DELETE: Remove event ---
    if (action === "delete" && event.httpMethod === "POST") {
      const { eventId } = JSON.parse(event.body);
      await calendar.events.delete({ calendarId: "primary", eventId });
      return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
    }

    return { statusCode: 400, headers, body: JSON.stringify({ error: "Unknown action" }) };
  } catch (error) {
    console.error("Google Calendar error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
