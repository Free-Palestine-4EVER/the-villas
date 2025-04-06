"use server"

import { Resend } from "resend"

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY)

export type ContactFormData = {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export async function sendContactEmail(formData: ContactFormData) {
  try {
    // Send email to resort
    const { data, error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["thevillaswr@gmail.com"],
      subject: `New Contact Form Submission: ${formData.subject}`,
      html: `
      <h1>New Contact Form Submission</h1>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ""}
      <p><strong>Subject:</strong> ${formData.subject}</p>
      <p><strong>Message:</strong> ${formData.message}</p>
    `,
    })

    // Send a copy of the confirmation email to the resort owner
    // This way you can forward it to the customer manually
    try {
      await resend.emails.send({
        from: "The Villas Bedouin Resort <onboarding@resend.dev>",
        to: ["thevillaswr@gmail.com"],
        subject: `COPY - Confirmation for ${formData.name} (${formData.email})`,
        html: `
        <h1>COPY OF CUSTOMER CONFIRMATION - PLEASE FORWARD TO: ${formData.email}</h1>
        <p>This is a copy of the confirmation email that would be sent to the customer. Please forward this to ${formData.email} manually.</p>
        <hr>
        <h1>Thank You for Contacting Us</h1>
        <p>Dear ${formData.name},</p>
        <p>We have received your message and will get back to you shortly.</p>
        <p>Here's a copy of your message:</p>
        <p><strong>Subject:</strong> ${formData.subject}</p>
        <p><strong>Message:</strong> ${formData.message}</p>
        <p>Best regards,<br>The Villas Bedouin Resort Team</p>
      `,
      })
    } catch (confirmationError) {
      console.error("Error sending confirmation copy:", confirmationError)
      // Don't return an error here, as the main contact notification was sent successfully
    }

    if (error) {
      return { success: false, message: error.message }
    }

    return { success: true, message: "Your message has been sent successfully! We'll get back to you soon." }
  } catch (error) {
    return { success: false, message: "Failed to send message. Please try again later." }
  }
}

