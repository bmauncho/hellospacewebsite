"use server";

import { z } from "zod";
import nodemailer from "nodemailer";

// Validation schema using zod
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

export async function sendContactMessage(formData: FormData) {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || "",
    message: formData.get("message"),
  };

  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message || "Invalid input";
    return { success: false, message: firstError };
  }

  const { name, email, phone, message } = parsed.data;

  const { EMAIL_USER, EMAIL_APP_PASSWORD, CONTACT_EMAIL, FROM_NAME } =
    process.env;

  if (!EMAIL_USER || !EMAIL_APP_PASSWORD || !CONTACT_EMAIL) {
    console.error("Missing email config in environment.");
    return { success: false, message: "Server configuration error." };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_APP_PASSWORD,
    },
  });

  try {
    // Send to admin
    await transporter.sendMail({
      from: `"${FROM_NAME || "Contact Form"}" <${EMAIL_USER}>`,
      to: CONTACT_EMAIL,
      subject: `New Contact Message from ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Message</title>
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
              padding: 30px 40px;
              text-align: center;
              border-bottom: 1px solid #e2ded9;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #161616;
              margin-bottom: 10px;
            }
            .tagline {
              color: #6b6963;
              font-size: 14px;
              margin: 0;
            }
            .content {
              padding: 40px;
            }
            .title {
              color: #161616;
              font-size: 24px;
              font-weight: 600;
              margin: 0 0 30px 0;
              text-align: center;
            }
            .contact-badge {
              background-color: #91623d;
              color: #ffffff;
              padding: 6px 12px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              display: inline-block;
              margin-bottom: 20px;
            }
            .details-grid {
              background-color: #f8f5f2;
              border: 1px solid #e2ded9;
              border-radius: 8px;
              padding: 30px;
              margin-bottom: 30px;
            }
            .detail-row {
              display: flex;
              margin-bottom: 15px;
              align-items: flex-start;
            }
            .detail-row:last-child {
              margin-bottom: 0;
            }
            .detail-label {
              font-weight: 600;
              color: #161616;
              min-width: 120px;
              margin-right: 15px;
            }
            .detail-value {
              color: #3c3a36;
              flex: 1;
            }
            .email-highlight {
              background-color: #c17c60;
              color: #ffffff;
              padding: 4px 8px;
              border-radius: 4px;
              font-weight: 600;
              text-decoration: none;
            }
            .message-section {
              margin-top: 30px;
            }
            .message-label {
              font-weight: 600;
              color: #161616;
              margin-bottom: 10px;
            }
            .message-content {
              background-color: #ffffff;
              border: 1px solid #e2ded9;
              border-radius: 6px;
              padding: 25px;
              color: #3c3a36;
              font-style: italic;
              border-left: 4px solid #91623d;
            }
            .footer {
              background-color: #161616;
              color: #f9f9f9;
              padding: 30px 40px;
              text-align: center;
              font-size: 14px;
            }
            .footer-brand {
              color: #91623d;
              font-weight: 600;
            }
            @media only screen and (max-width: 600px) {
              .container {
                width: 100% !important;
              }
              .header, .content, .footer {
                padding: 20px !important;
              }
              .details-grid {
                padding: 20px !important;
              }
              .detail-row {
                flex-direction: column;
              }
              .detail-label {
                min-width: auto;
                margin-right: 0;
                margin-bottom: 5px;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">Hello Space</div>
              <p class="tagline">Professional Design & Development Services</p>
            </div>
            
            <div class="content">
              <div style="text-align: center;">
                <div class="contact-badge">Contact Form</div>
              </div>
              <h1 class="title">New Contact Message</h1>
              
              <div class="details-grid">
                <div class="detail-row">
                  <div class="detail-label">Name:</div>
                  <div class="detail-value">${name}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Email:</div>
                  <div class="detail-value"><a href="mailto:${email}" class="email-highlight">${email}</a></div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Phone:</div>
                  <div class="detail-value">${phone || "Not provided"}</div>
                </div>
              </div>
              
              <div class="message-section">
                <div class="message-label">Message:</div>
                <div class="message-content">
                  ${message.replace(/\n/g, "<br>")}
                </div>
              </div>
            </div>
            
            <div class="footer">
              <p>This message was sent through the <span class="footer-brand">Hello Space</span> contact form.</p>
              <p>Please respond promptly to maintain excellent client communication.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        New Message

        Name: ${name}
        Email: ${email}
        Phone: ${phone || "Not provided"}
        Message: ${message}
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return {
      success: false,
      message: "Failed to send message. Please try again.",
    };
  }
}
