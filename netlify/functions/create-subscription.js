// Stripe Subscription — creates a recurring payment checkout session
// Requires STRIPE_SECRET_KEY environment variable in Netlify

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
    const { productName, priceAmount, customerEmail, customerName } = JSON.parse(event.body);

    if (!productName || !priceAmount) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Missing required fields" }) };
    }

    // Create a Stripe Checkout Session in subscription mode
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer_email: customerEmail || undefined,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: productName,
              description: "Monthly subscription — delivered to your door with love",
            },
            unit_amount: priceAmount * 100, // Stripe uses cents
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        product_name: productName,
        customer_name: customerName || "",
      },
      success_url: `${process.env.URL || "https://tinamaria.com"}/?subscribed=true`,
      cancel_url: `${process.env.URL || "https://tinamaria.com"}/#creative`,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ url: session.url, sessionId: session.id }),
    };
  } catch (error) {
    console.error("Stripe subscription error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
