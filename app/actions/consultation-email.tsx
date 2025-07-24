"use server";

import { z } from "zod";
import nodemailer from "nodemailer";

// Schema validation using zod
const consultationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  consultationType: z.string().min(1, "Consultation type is required"),
  projectType: z.string().optional(),
  preferredDate: z.string().min(1, "Preferred date is required"),
  preferredTime: z.string().min(1, "Preferred time is required"),
  message: z.string().optional(),
});

// Schema for mini consultation form
const miniConsultationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  service: z.string().min(1, "Service selection is required"),
  message: z.string().optional(),
});

export async function sendConsultationEmail(formData: FormData) {
  const raw = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone") || "",
    consultationType: formData.get("consultationType"),
    projectType: formData.get("projectType") || "",
    preferredDate: formData.get("preferredDate"),
    preferredTime: formData.get("preferredTime"),
    message: formData.get("message") || "",
  };

  const parsed = consultationSchema.safeParse(raw);

  if (!parsed.success) {
    const errorMsg = parsed.error.issues[0]?.message || "Invalid input";
    return { success: false, message: errorMsg };
  }

  const data = parsed.data;

  const {
    EMAIL_USER,
    EMAIL_APP_PASSWORD,
    CONTACT_EMAIL,
    FROM_NAME,
    FROM_EMAIL,
  } = process.env;

  if (!EMAIL_USER || !EMAIL_APP_PASSWORD || !CONTACT_EMAIL) {
    console.error("Missing environment configuration");
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
    await transporter.sendMail({
      from: `"${FROM_NAME || "Hello Space"}" <${FROM_EMAIL || EMAIL_USER}>`,
      to: CONTACT_EMAIL,
      subject: `New Consultation Request from ${data.firstName} ${data.lastName}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Consultation Booking Details</title>
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
              min-width: 140px;
              margin-right: 15px;
            }
            .detail-value {
              color: #3c3a36;
              flex: 1;
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
              padding: 20px;
              color: #3c3a36;
              font-style: italic;
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
            .divider {
              height: 1px;
              background-color: #e2ded9;
              margin: 30px 0;
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
              <h1 class="title">New Consultation Request</h1>
              
              <div class="details-grid">
                <div class="detail-row">
                  <div class="detail-label">Client Name:</div>
                  <div class="detail-value">${data.firstName} ${data.lastName}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Email Address:</div>
                  <div class="detail-value">${data.email}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Phone Number:</div>
                  <div class="detail-value">${data.phone || "Not provided"}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Consultation Type:</div>
                  <div class="detail-value">${data.consultationType}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Project Type:</div>
                  <div class="detail-value">${data.projectType || "Not specified"}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Preferred Date:</div>
                  <div class="detail-value">${data.preferredDate}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Preferred Time:</div>
                  <div class="detail-value">${data.preferredTime}</div>
                </div>
              </div>
              
              <div class="message-section">
                <div class="message-label">Additional Message:</div>
                <div class="message-content">
                  ${(data.message ?? "").replace(/\n/g, "<br>") || "No additional message provided."}
                </div>
              </div>
            </div>
            
            <div class="footer">
              <p>This consultation request was submitted through the <span class="footer-brand">Hello Space</span> website.</p>
              <p>Please respond to the client within 24 hours to maintain our professional standards.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Consultation Booking Details

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone || "Not provided"}
Consultation Type: ${data.consultationType}
Project Type: ${data.projectType || "Not specified"}
Preferred Date: ${data.preferredDate}
Preferred Time: ${data.preferredTime}

Message:
${data.message || "No message"}
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Consultation email error:", error);
    return {
      success: false,
      message: "Failed to send email. Please try again.",
    };
  }
}

export async function sendMiniConsultationEmail(formData: FormData) {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || "",
    service: formData.get("service"),
    message: formData.get("message") || "",
  };

  const parsed = miniConsultationSchema.safeParse(raw);

  if (!parsed.success) {
    const errorMsg = parsed.error.issues[0]?.message || "Invalid input";
    return { success: false, message: errorMsg };
  }

  const data = parsed.data;

  const {
    EMAIL_USER,
    EMAIL_APP_PASSWORD,
    CONTACT_EMAIL,
    FROM_NAME,
    FROM_EMAIL,
  } = process.env;

  if (!EMAIL_USER || !EMAIL_APP_PASSWORD || !CONTACT_EMAIL) {
    console.error("Missing environment configuration");
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
    await transporter.sendMail({
      from: `"${FROM_NAME || "Hello Space"}" <${FROM_EMAIL || EMAIL_USER}>`,
      to: CONTACT_EMAIL,
      subject: `Quick Consultation Request from ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Quick Consultation Request</title>
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
            .quick-badge {
              background-color: #c17c60;
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
              min-width: 140px;
              margin-right: 15px;
            }
            .detail-value {
              color: #3c3a36;
              flex: 1;
            }
            .service-highlight {
              background-color: #91623d;
              color: #ffffff;
              padding: 4px 8px;
              border-radius: 4px;
              font-weight: 600;
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
              padding: 20px;
              color: #3c3a36;
              font-style: italic;
            }
            .action-note {
              background-color: #fff3cd;
              border: 1px solid #ffeaa7;
              border-radius: 6px;
              padding: 20px;
              margin-top: 30px;
              text-align: center;
            }
            .action-note-title {
              color: #856404;
              font-weight: 600;
              margin-bottom: 10px;
            }
            .action-note-text {
              color: #856404;
              font-size: 14px;
              margin: 0;
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
                <div class="quick-badge">Quick Request</div>
              </div>
              <h1 class="title">Mini Consultation Request</h1>
              
              <div class="details-grid">
                <div class="detail-row">
                  <div class="detail-label">Client Name:</div>
                  <div class="detail-value">${data.name}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Email Address:</div>
                  <div class="detail-value">${data.email}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Phone Number:</div>
                  <div class="detail-value">${data.phone || "Not provided"}</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">Service Interest:</div>
                  <div class="detail-value"><span class="service-highlight">${data.service}</span></div>
                </div>
              </div>
              
              <div class="message-section">
                <div class="message-label">Additional Message:</div>
                <div class="message-content">
                  ${(data.message ?? "").replace(/\n/g, "<br>") || "No additional message provided."}
                </div>
              </div>
              
              <div class="action-note">
                <div class="action-note-title">⚡ Quick Action Required</div>
                <p class="action-note-text">This is a quick consultation request. Please contact the client within 4 hours to schedule a consultation and maintain our rapid response standards.</p>
              </div>
            </div>
            
            <div class="footer">
              <p>This quick consultation request was submitted through the <span class="footer-brand">Hello Space</span> website.</p>
              <p>Prioritize quick responses to maintain client satisfaction and conversion rates.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Mini Consultation Request

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "Not provided"}
Service Interested In: ${data.service}

Message:
${data.message || "No message"}

---
This is a quick consultation request. Please contact the client to schedule a consultation.
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Mini consultation email error:", error);
    return {
      success: false,
      message: "Failed to send email. Please try again.",
    };
  }
}
