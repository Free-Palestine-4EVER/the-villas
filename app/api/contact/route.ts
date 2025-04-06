import { NextResponse } from "next/server"
import { Resend } from "resend"

// Initialize Resend with the environment variable
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    // Parse the request body
    const formData = await request.json()
    console.log("API route received contact request:", formData)

    // Send email to resort
    try {
      const { data, error } = await resend.emails.send({
        from: "Resend <onboarding@resend.dev>", // Using Resend's default domain
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

      if (error) {
        console.error("Error sending contact email to resort:", error)
        return NextResponse.json(
          {
            success: false,
            message: `Error sending email: ${error.message}`,
          },
          { status: 500 },
        )
      }
    } catch (emailError) {
      console.error("Exception sending main contact email:", emailError)
      return NextResponse.json(
        {
          success: false,
          message: `Exception sending email: ${emailError instanceof Error ? emailError.message : String(emailError)}`,
        },
        { status: 500 },
      )
    }

    // Send a copy of the confirmation email to the resort owner
    try {
      await resend.emails.send({
        from: "Resend <onboarding@resend.dev>", // Using Resend's default domain
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

    console.log("Contact emails sent successfully")
    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully! We'll get back to you soon.",
    })
  } catch (error) {
    console.error("Error in API route:", error)
    return NextResponse.json(
      {
        success: false,
        message: `Failed to send message. Error: ${error instanceof Error ? error.message : String(error)}`,
      },
      { status: 500 },
    )
  }
}

