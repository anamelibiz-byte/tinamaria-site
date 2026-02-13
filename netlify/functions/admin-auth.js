// Admin Authentication — simple password check
// Requires ADMIN_PASSWORD environment variable in Netlify

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
    const { password } = JSON.parse(event.body);
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error("ADMIN_PASSWORD not set in environment variables");
      return { statusCode: 500, headers, body: JSON.stringify({ error: "Admin password not configured" }) };
    }

    // Constant-time comparison to prevent timing attacks
    const isMatch = password && password.length === adminPassword.length &&
      password.split("").every((char, i) => char === adminPassword[i]);

    if (isMatch) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ authenticated: true }),
      };
    }

    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ authenticated: false }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
