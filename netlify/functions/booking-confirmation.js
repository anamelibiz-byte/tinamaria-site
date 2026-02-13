// Booking Confirmation — sends email + SMS after successful payment
// Called from the frontend after Stripe checkout success
// Requires RESEND_API_KEY, and optionally TWILIO_* env vars

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
    const { customerName, customerEmail, customerPhone, serviceName, price, duration, sessionId } = JSON.parse(event.body);

    if (!customerName || !customerEmail || !serviceName) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Missing required fields" }) };
    }

    const results = { email: null, sms: null };

    // ---- SEND CONFIRMATION EMAIL via Resend ----
    if (process.env.RESEND_API_KEY) {
      const emailHtml = `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 0;">
          <div style="text-align: center; margin-bottom: 32px;">
            <div style="width: 56px; height: 56px; border-radius: 50%; background: linear-gradient(135deg, #7B9E89, #C4A882); margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;">
              <span style="color: white; font-size: 24px;">&#10024;</span>
            </div>
            <h1 style="color: #1D1D1D; font-size: 26px; font-weight: 700; margin: 0;">You're Booked!</h1>
          </div>

          <p style="color: #555; font-size: 16px; line-height: 1.7;">
            Hi ${customerName},
          </p>
          <p style="color: #555; font-size: 16px; line-height: 1.7;">
            Thank you for booking with me! I'm so excited to work with you. Here are your session details:
          </p>

          <div style="background: #F8F8F6; border-radius: 12px; padding: 24px; margin: 24px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #999; font-size: 14px;">Service</td>
                <td style="padding: 8px 0; color: #1D1D1D; font-size: 14px; font-weight: 600; text-align: right;">${serviceName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #999; font-size: 14px;">Duration</td>
                <td style="padding: 8px 0; color: #1D1D1D; font-size: 14px; font-weight: 600; text-align: right;">${duration} minutes</td>
              </tr>
              ${price > 0 ? `<tr>
                <td style="padding: 8px 0; color: #999; font-size: 14px;">Amount Paid</td>
                <td style="padding: 8px 0; color: #7B9E89; font-size: 14px; font-weight: 700; text-align: right;">$${price}</td>
              </tr>` : ''}
              <tr>
                <td style="padding: 8px 0; color: #999; font-size: 14px;">Confirmation</td>
                <td style="padding: 8px 0; color: #1D1D1D; font-size: 14px; font-weight: 600; text-align: right;">#${(sessionId || '').slice(-8).toUpperCase() || 'CONFIRMED'}</td>
              </tr>
            </table>
          </div>

          <p style="color: #555; font-size: 16px; line-height: 1.7;">
            I'll reach out within 24 hours to confirm your session date and time. In the meantime, think about what you'd most like to focus on during our time together.
          </p>

          <p style="color: #555; font-size: 16px; line-height: 1.7;">
            With gratitude,<br/>
            <strong style="color: #1D1D1D;">Tina Maria</strong><br/>
            <span style="color: #999; font-size: 14px;">Life Coach & Hypnotherapist</span>
          </p>

          <hr style="border: none; border-top: 1px solid #E8E8E5; margin: 32px 0;" />

          <p style="text-align: center; font-size: 13px; color: #ADADAD;">
            Questions? Reply to this email or visit <a href="https://tinamaria.com" style="color: #7B9E89;">tinamaria.com</a>
          </p>
        </div>
      `;

      try {
        const emailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Tina Maria <hello@tinamaria.com>",
            to: [customerEmail],
            subject: `You're booked! ${serviceName} with Tina Maria`,
            html: emailHtml,
          }),
        });

        const emailData = await emailRes.json();
        results.email = emailRes.ok ? { success: true, id: emailData.id } : { success: false, error: emailData };
      } catch (emailErr) {
        console.error("Email error:", emailErr);
        results.email = { success: false, error: emailErr.message };
      }
    }

    // ---- SEND CONFIRMATION SMS via Twilio ----
    if (customerPhone && process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER) {
      try {
        const smsMessage = `Hi ${customerName}! Your ${serviceName} session with Tina Maria is confirmed. I'll reach out soon with date/time details. So excited to work with you! - Tina Maria`;

        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const fromNumber = process.env.TWILIO_PHONE_NUMBER;
        const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
        const auth = Buffer.from(`${accountSid}:${authToken}`).toString("base64");

        const smsRes = await fetch(url, {
          method: "POST",
          headers: {
            "Authorization": `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            To: customerPhone,
            From: fromNumber,
            Body: smsMessage,
          }).toString(),
        });

        const smsData = await smsRes.json();
        results.sms = smsRes.ok ? { success: true, sid: smsData.sid } : { success: false, error: smsData.message };
      } catch (smsErr) {
        console.error("SMS error:", smsErr);
        results.sms = { success: false, error: smsErr.message };
      }
    }

    // ---- ALSO NOTIFY TINA via email ----
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "TinaMaria Bookings <hello@tinamaria.com>",
            to: ["hello@tinamaria.com"],
            subject: `New Booking: ${customerName} — ${serviceName}`,
            html: `
              <h2>New Booking!</h2>
              <p><strong>Client:</strong> ${customerName}</p>
              <p><strong>Email:</strong> ${customerEmail}</p>
              <p><strong>Phone:</strong> ${customerPhone || 'Not provided'}</p>
              <p><strong>Service:</strong> ${serviceName}</p>
              <p><strong>Duration:</strong> ${duration} min</p>
              <p><strong>Amount:</strong> ${price > 0 ? '$' + price : 'Free (Discovery Call)'}</p>
              <p><strong>Stripe Session:</strong> ${sessionId || 'N/A'}</p>
            `,
          }),
        });
      } catch (notifyErr) {
        console.error("Admin notification error:", notifyErr);
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, results }),
    };
  } catch (error) {
    console.error("Booking confirmation error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
