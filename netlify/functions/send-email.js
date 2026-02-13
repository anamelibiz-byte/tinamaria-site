// Resend Email — sends marketing emails via Resend API
// Requires RESEND_API_KEY environment variable in Netlify

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const { to, subject, html, from } = JSON.parse(event.body);

    if (!to || !subject || !html) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Missing required fields: to, subject, html" }) };
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: from || "Tina Maria <hello@tinamaria.com>",
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { statusCode: response.status, headers, body: JSON.stringify({ error: data }) };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, data }),
    };
  } catch (error) {
    console.error("Resend error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
