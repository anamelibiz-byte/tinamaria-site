// Stripe Checkout Session — creates a checkout session for booking a service
// Requires STRIPE_SECRET_KEY environment variable in Netlify

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  // CORS headers
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
    const { serviceName, price, duration, customerEmail, customerName } = JSON.parse(event.body);

    if (!serviceName || price === undefined) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Missing required fields" }) };
    }

    // Skip checkout for free services (Discovery Call)
    if (price === 0) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ free: true, message: "This is a complimentary session — no payment needed!" }),
      };
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: customerEmail || undefined,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: serviceName,
              description: `${duration}-minute session with Tina Maria`,
              images: [], // Add your brand image URL here if desired
            },
            unit_amount: price * 100, // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      metadata: {
        service_name: serviceName,
        customer_name: customerName || "",
        duration: String(duration),
      },
      success_url: `${process.env.URL || "https://tinamaria.com"}/book?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.URL || "https://tinamaria.com"}/book?canceled=true`,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ url: session.url, sessionId: session.id }),
    };
  } catch (error) {
    console.error("Stripe error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
