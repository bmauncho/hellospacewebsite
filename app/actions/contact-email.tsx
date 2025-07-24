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
        <h2>New Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
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
