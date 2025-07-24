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
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Hello Space Newsletter</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        background-color: #f8f5f2;
        color: #3c3a36;
        line-height: 1.6;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border: 1px solid #e2ded9;
      }
      .header {
        background-color: #f8f5f2;
        padding: 40px;
        text-align: center;
        border-bottom: 1px solid #e2ded9;
      }
      .logo {
        font-size: 28px;
        font-weight: bold;
        color: #161616;
        margin-bottom: 15px;
      }
      .tagline {
        color: #6b6963;
        font-size: 14px;
        margin: 0 0 20px 0;
      }
      .welcome-badge {
        background-color: #91623d;
        color: #ffffff;
        padding: 8px 16px;
        border-radius: 25px;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        display: inline-block;
      }
      .content {
        padding: 40px;
      }
      .title {
        color: #161616;
        font-size: 28px;
        font-weight: 600;
        margin: 0 0 20px 0;
        text-align: center;
      }
      .subtitle {
        color: #6b6963;
        font-size: 16px;
        text-align: center;
        margin: 0 0 30px 0;
      }
      .greeting {
        color: #3c3a36;
        font-size: 16px;
        margin-bottom: 25px;
      }
      .description {
        color: #3c3a36;
        font-size: 16px;
        margin-bottom: 30px;
      }
      .features-section {
        background-color: #f8f5f2;
        border: 1px solid #e2ded9;
        border-radius: 8px;
        padding: 30px;
        margin: 30px 0;
      }
      .features-title {
        color: #161616;
        font-size: 18px;
        font-weight: 600;
        margin: 0 0 20px 0;
        text-align: center;
      }
      .features-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .features-list li {
        color: #3c3a36;
        padding: 8px 0;
        border-bottom: 1px solid #e2ded9;
        display: flex;
        align-items: center;
      }
      .features-list li:last-child {
        border-bottom: none;
      }
      .feature-icon {
        background-color: #c17c60;
        color: #ffffff;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
        font-size: 12px;
        font-weight: 600;
        flex-shrink: 0;
      }
      .cta-section {
        text-align: center;
        margin: 40px 0;
      }
      .cta-button {
        display: inline-block;
        background-color: #91623d;
        color: #ffffff;
        padding: 15px 30px;
        text-decoration: none;
        border-radius: 6px;
        font-weight: 600;
        font-size: 16px;
        transition: background-color 0.3s ease;
      }
      .cta-button:hover {
        background-color: #7a5234;
      }
      .promise {
        background-color: #fff3cd;
        border: 1px solid #ffeaa7;
        border-radius: 6px;
        padding: 20px;
        margin: 30px 0;
        text-align: center;
      }
      .promise-text {
        color: #856404;
        font-size: 14px;
        margin: 0;
        font-style: italic;
      }
      .footer {
        background-color: #161616;
        color: #f9f9f9;
        padding: 40px;
        text-align: center;
        font-size: 14px;
      }
      .footer-brand {
        color: #91623d;
        font-weight: 600;
      }
      .footer-links {
        margin-top: 20px;
      }
      .footer-links a {
        color: #c17c60;
        text-decoration: none;
        margin: 0 10px;
      }
      .footer-links a:hover {
        text-decoration: underline;
      }
      .support-email {
        color: #c17c60;
        text-decoration: none;
      }
      .support-email:hover {
        text-decoration: underline;
      }
      @media only screen and (max-width: 600px) {
        .container {
          width: 100% !important;
        }
        .header, .content, .footer {
          padding: 25px !important;
        }
        .features-section {
          padding: 20px !important;
        }
        .title {
          font-size: 24px !important;
        }
        .cta-button {
          padding: 12px 24px !important;
          font-size: 14px !important;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="logo">Hello Space</div>
        <p class="tagline">Professional Design & Development Services</p>
        <div class="welcome-badge">Newsletter Signup</div>
      </div>
      
      <div class="content">
        <h1 class="title">Welcome to Our Newsletter! 🎉</h1>
        <p class="subtitle">Thank you for joining our creative community</p>
        
        <p class="greeting">Hi there!</p>
        
        <p class="description">
          We're thrilled to have you join our community of design enthusiasts and business owners! 
          You'll now receive our carefully curated insights, tips, and updates directly in your inbox.
        </p>
        
        <div class="features-section">
          <h2 class="features-title">What to Expect from Us</h2>
          <ul class="features-list">
            <li>
              <div class="feature-icon">📧</div>
              <div>Weekly newsletter with design insights and business tips</div>
            </li>
            <li>
              <div class="feature-icon">🎯</div>
              <div>Exclusive design trends and development strategies</div>
            </li>
            <li>
              <div class="feature-icon">🚀</div>
              <div>Early access to new services and special offers</div>
            </li>
            <li>
              <div class="feature-icon">📈</div>
              <div>Industry insights and growth strategies for your business</div>
            </li>
          </ul>
        </div>
        
        <div class="promise">
          <p class="promise-text">
            We respect your inbox and promise to only send valuable, actionable content. 
            You can unsubscribe at any time with just one click.
          </p>
        </div>
        
        <div class="cta-section">
          <a href="${
            WEBSITE_URL || "#"
          }" class="cta-button">Explore Our Services</a>
        </div>
      </div>
      
      <div class="footer">
        <p>Thanks for subscribing to <span class="footer-brand">Hello Space</span>!</p>
        <p>
          Questions? Feel free to reply to this email or contact us at
          <a href="mailto:${SUPPORT_EMAIL || FROM_EMAIL}" class="support-email">
            ${SUPPORT_EMAIL || FROM_EMAIL}
          </a>
        </p>
        <div class="footer-links">
          <a href="${WEBSITE_URL || "#"}/unsubscribe?email=${encodeURIComponent(
        email as string
      )}">Unsubscribe</a>
          <span style="color: #6b6963;">|</span>
          <a href="${WEBSITE_URL || "#"}/privacy">Privacy Policy</a>
        </div>
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
