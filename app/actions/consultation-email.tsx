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
        <h2>Consultation Booking Details</h2>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
        <p><strong>Consultation Type:</strong> ${data.consultationType}</p>
        <p><strong>Project Type:</strong> ${
          data.projectType || "Not specified"
        }</p>
        <p><strong>Preferred Date:</strong> ${data.preferredDate}</p>
        <p><strong>Preferred Time:</strong> ${data.preferredTime}</p>
        <p><strong>Message:</strong></p>
        <p>${(data.message ?? "").replace(/\n/g, "<br>") || "No message"}</p>
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
        <h2>Mini Consultation Request</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
        <p><strong>Service Interested In:</strong> ${data.service}</p>
        <p><strong>Message:</strong></p>
        <p>${(data.message ?? "").replace(/\n/g, "<br>") || "No message"}</p>
        <hr>
        <p><em>This is a quick consultation request. Please contact the client to schedule a consultation.</em></p>
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
