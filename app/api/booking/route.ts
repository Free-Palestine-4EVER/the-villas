import { NextResponse } from "next/server"
import { Resend } from "resend"

// Initialize Resend with the environment variable
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    // Parse the request body
    const formData = await request.json()
    console.log("API route received booking request:", formData)

    // Format the villa selection for the email
    const villasBooked = []
    if (formData.villas.doubleRoom > 0) {
      villasBooked.push(`${formData.villas.doubleRoom} Double Room(s)`)
    }
    if (formData.villas.twinRoom > 0) {
      villasBooked.push(`${formData.villas.twinRoom} Twin Room(s)`)
    }
    if (formData.villas.tripleRoom > 0) {
      villasBooked.push(`${formData.villas.tripleRoom} Triple Room(s)`)
    }

    // Send email to resort with customer information
    console.log("Sending email to resort")
    try {
      const { data, error } = await resend.emails.send({
        from: "Resend <onboarding@resend.dev>", // Using Resend's default domain
        to: ["thevillaswr@gmail.com"],
        subject: `New Booking Request from ${formData.name}`,
        html: `
<h1>New Booking Request</h1>
<p><strong>Name:</strong> ${formData.name}</p>
<p><strong>Email:</strong> ${formData.email}</p>
<p><strong>Phone:</strong> ${formData.phone}</p>
<p><strong>Country:</strong> ${formData.country}</p>
<p><strong>Arrival Date:</strong> ${formData.arrivalDate}</p>
<p><strong>Number of Guests:</strong> ${formData.guests}</p>
<p><strong>Accommodation:</strong> ${villasBooked.join(", ")}</p>
<p><strong>Experiences:</strong> ${
          formData.experiences.length > 0
            ? formData.experiences.map((exp: any) => `${exp.name} (${exp.price} JOD per person)`).join(", ")
            : "None"
        }</p>
<p><strong>Special Requests:</strong> ${formData.message}</p>
<p><strong>Total Price:</strong> ${formData.totalPrice} JOD</p>
`,
      })

      if (error) {
        console.error("Error sending email to resort:", error)
        return NextResponse.json(
          {
            success: false,
            message: `Error sending email: ${error.message}`,
          },
          { status: 500 },
        )
      }
    } catch (emailError) {
      console.error("Exception sending main email:", emailError)
      return NextResponse.json(
        {
          success: false,
          message: `Exception sending email: ${emailError instanceof Error ? emailError.message : String(emailError)}`,
        },
        { status: 500 },
      )
    }

    // Send a copy of the confirmation email to the resort owner
    console.log("Sending confirmation email copy to resort owner")
    try {
      await resend.emails.send({
        from: "Resend <onboarding@resend.dev>", // Using Resend's default domain
        to: ["thevillaswr@gmail.com"],
        subject: `COPY - Confirmation for ${formData.name} (${formData.email})`,
        html: `
<h1>COPY OF CUSTOMER CONFIRMATION - PLEASE FORWARD TO: ${formData.email}</h1>
<p>This is a copy of the confirmation email that would be sent to the customer. Please forward this to ${formData.email} manually.</p>
<hr>
<h1>Thank You for Your Booking Request</h1>
<p>Dear ${formData.name},</p>
<p>We have received your booking request and will get back to you shortly to confirm your reservation.</p>
<h2>Booking Details:</h2>
<p><strong>Arrival Date:</strong> ${formData.arrivalDate}</p>
<p><strong>Number of Guests:</strong> ${formData.guests}</p>
<p><strong>Accommodation:</strong> ${villasBooked.join(", ")}</p>
<p><strong>Experiences:</strong> ${
          formData.experiences.length > 0
            ? formData.experiences.map((exp: any) => `${exp.name} (${exp.price} JOD per person)`).join(", ")
            : "None"
        }</p>
<p><strong>Total Price:</strong> ${formData.totalPrice} JOD</p>
<p>If you have any questions, please don't hesitate to contact us.</p>
<p>Best regards,<br>The Villas Bedouin Resort Team</p>
`,
      })
    } catch (confirmationError) {
      console.error("Error sending confirmation copy:", confirmationError)
      // Don't return an error here, as the main booking notification was sent successfully
    }

    console.log("Emails sent successfully")
    return NextResponse.json({
      success: true,
      message:
        "Your booking request has been sent successfully! We'll contact you shortly to confirm your reservation.",
    })
  } catch (error) {
    console.error("Error in API route:", error)
    return NextResponse.json(
      {
        success: false,
        message: `Failed to send booking request. Error: ${error instanceof Error ? error.message : String(error)}`,
      },
      { status: 500 },
    )
  }
}

