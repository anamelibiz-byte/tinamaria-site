// Google Calendar OAuth Callback — exchanges auth code for tokens
// This is a separate function because Google doesn't allow query params in redirect URIs

const { google } = require("googleapis");

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.URL || "https://tinamaria.com"}/.netlify/functions/google-calendar-callback`
    );

    const params = event.queryStringParameters || {};
    const code = params.code;

    if (!code) {
      return {
        statusCode: 400,
        headers: { ...headers, "Content-Type": "text/html" },
        body: `<html><body style="font-family:sans-serif;text-align:center;padding:60px">
          <h2>Error</h2>
          <p>No authorization code received. Please try again.</p>
          <a href="/.netlify/functions/google-calendar?action=auth">Try Again</a>
        </body></html>`,
      };
    }

    const { tokens } = await oauth2Client.getToken(code);

    return {
      statusCode: 200,
      headers: { ...headers, "Content-Type": "text/html" },
      body: `<html><body style="font-family:'Inter',sans-serif;text-align:center;padding:60px;max-width:600px;margin:0 auto">
        <div style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#7B9E89,#C4A882);display:flex;align-items:center;justify-content:center;margin:0 auto 24px;font-size:28px">&#9989;</div>
        <h2 style="color:#1D1D1D;margin-bottom:12px">Google Calendar Connected!</h2>
        <p style="color:#7A7A7A;margin-bottom:24px">Copy the refresh token below and add it to your Netlify environment variables as <strong>GOOGLE_REFRESH_TOKEN</strong></p>
        <textarea readonly onclick="this.select()" style="width:100%;height:80px;font-size:13px;padding:12px;border:2px solid #E8E8E5;border-radius:10px;font-family:monospace;resize:none">${tokens.refresh_token || 'No refresh token received — try revoking access at myaccount.google.com/permissions and retry'}</textarea>
        <p style="color:#7A7A7A;font-size:14px;margin-top:16px">After adding it to Netlify, trigger a redeploy. Then you can close this window.</p>
      </body></html>`,
    };
  } catch (error) {
    console.error("Google Calendar callback error:", error);
    return {
      statusCode: 500,
      headers: { ...headers, "Content-Type": "text/html" },
      body: `<html><body style="font-family:sans-serif;text-align:center;padding:60px">
        <h2>Connection Error</h2>
        <p style="color:red">${error.message}</p>
        <p>Make sure your Google Cloud OAuth credentials are correct and try again.</p>
        <a href="/.netlify/functions/google-calendar?action=auth">Try Again</a>
      </body></html>`,
    };
  }
};
