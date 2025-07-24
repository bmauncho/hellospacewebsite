"use server";

import { z } from "zod";
import nodemailer from "nodemailer";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get("email");

  const parseResult = schema.safeParse({ email });

  if (!parseResult.success) {
    const firstError = parseResult.error.issues[0]?.message || "Invalid input";
    return { success: false, message: firstError };
  }

  const {
    EMAIL_USER,
    EMAIL_APP_PASSWORD,
    NEWSLETTER_EMAIL,
    FROM_NAME,
    FROM_EMAIL,
    SUPPORT_EMAIL,
    WEBSITE_URL,
  } = process.env;

  if (!EMAIL_USER || !EMAIL_APP_PASSWORD || !NEWSLETTER_EMAIL || !FROM_EMAIL) {
    console.error("Missing email config in .env");
    return { success: false, message: "Server email configuration error." };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_APP_PASSWORD,
    },
  });

  try {
    // 1. Notify admin
    await transporter.sendMail({
      from: `"Newsletter Signup" <${EMAIL_USER}>`,
      to: NEWSLETTER_EMAIL,
      subject: "New Newsletter Subscription",
      text: `New subscriber: ${email}`,
    });

    // 2. Auto-reply to subscriber
    await transporter.sendMail({
      from: {
        name: FROM_NAME || "Newsletter",
        address: FROM_EMAIL,
      },
      to: email as string,
      subject: "Welcome to our Newsletter! 🎉",
      html: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Welcome to our Newsletter</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #ffffff;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        background: #f8f9fa;
        padding: 30px;
        text-align: center;
        border-radius: 8px;
      }
      .content {
        padding: 30px 0;
      }
      .footer {
        background: #f8f9fa;
        padding: 20px;
        text-align: center;
        border-radius: 8px;
        font-size: 14px;
        color: #666;
      }
      .button {
        display: inline-block;
        background: #007bff;
        color: white;
        padding: 12px 24px;
        text-decoration: none;
        border-radius: 5px;
        margin: 20px 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Welcome to our Newsletter! 🎉</h1>
        <p>Thank you for subscribing to our updates</p>
      </div>
      <div class="content">
        <p>Hi there!</p>
        <p>
          We're excited to have you join our community! You'll now receive our
          latest news, insights, and updates directly in your inbox.
        </p>
        <p>Here's what you can expect from us:</p>
        <ul>
          <li>📧 Weekly newsletter with curated content</li>
          <li>🎯 Exclusive tips and insights</li>
          <li>🚀 Early access to new features and products</li>
          <li>📈 Industry trends and analysis</li>
        </ul>
        <p>
          We respect your inbox and promise to only send valuable content. You
          can unsubscribe at any time.
        </p>
        <div style="text-align: center;">
          <a href="${
            WEBSITE_URL || "#"
          }" class="button text-white">Visit Our Website</a>
        </div>
      </div>
      <div class="footer">
        <p>Thanks for subscribing!</p>
        <p>
          If you have any questions, feel free to reply to this email or contact
          us at
          <a href="mailto:${SUPPORT_EMAIL || FROM_EMAIL}">
            ${SUPPORT_EMAIL || FROM_EMAIL}
          </a>
        </p>
        <p>
          <a href="${WEBSITE_URL || "#"}/unsubscribe?email=${encodeURIComponent(
        email as string
      )}">Unsubscribe</a> |
          <a href="${WEBSITE_URL || "#"}/privacy">Privacy Policy</a>
        </p>
      </div>
    </div>
  </body>
</html>
`,

      text: `
Welcome to our Newsletter! 🎉

Hi there!

We're excited to have you join our community! You'll now receive our latest news, insights, and updates directly in your inbox.

Here's what you can expect from us:
• Weekly newsletter with curated content
• Exclusive tips and insights
• Early access to new features and products
• Industry trends and analysis

We respect your inbox and promise to only send valuable content. You can unsubscribe at any time.

Thanks for subscribing!

If you have any questions, feel free to reply to this email or contact us at ${
        SUPPORT_EMAIL || FROM_EMAIL
      }

Unsubscribe: ${WEBSITE_URL || "#"}/unsubscribe?email=${encodeURIComponent(
        email as string
      )}
Privacy Policy: ${WEBSITE_URL || "#"}/privacy
`,
    });

    return { success: true };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, message: "Failed to send email." };
  }
}
