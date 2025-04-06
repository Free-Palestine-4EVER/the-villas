"use server"

import { Resend } from "resend"

// Initialize Resend with the environment variable
const resend = new Resend(process.env.RESEND_API_KEY)

// Update the BookingFormData type to use an array of experiences
// Replace the existing BookingFormData type with:
export type BookingFormData = {
  name: string
  email: string
  phone: string
  country: string
  arrivalDate: string
  guests: number
  villas: {
    doubleRoom: number
    twinRoom: number
    tripleRoom: number
  }
  experiences: { name: string; price: number }[]
  message: string
  totalPrice: number
}

export async function sendBookingEmail(formData: BookingFormData) {
  try {
    console.log("Starting to send booking email", formData)

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
        from: "The Villas Bedouin Resort <onboarding@resend.dev>",
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
            ? formData.experiences.map((exp) => `${exp.name} (${exp.price} JOD per person)`).join(", ")
            : "None"
        }</p>
<p><strong>Special Requests:</strong> ${formData.message}</p>
<p><strong>Total Price:</strong> ${formData.totalPrice} JOD</p>
`,
      })

      if (error) {
        console.error("Error sending email to resort:", error)
        return { success: false, message: `Error sending email: ${error.message}` }
      }
    } catch (emailError) {
      console.error("Exception sending main email:", emailError)
      return {
        success: false,
        message: `Exception sending email: ${emailError instanceof Error ? emailError.message : String(emailError)}`,
      }
    }

    // Send a copy of the confirmation email to the resort owner
    // This way you can forward it to the customer manually
    console.log("Sending confirmation email copy to resort owner")
    try {
      await resend.emails.send({
        from: "The Villas Bedouin Resort <onboarding@resend.dev>",
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
            ? formData.experiences.map((exp) => `${exp.name} (${exp.price} JOD per person)`).join(", ")
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
    return {
      success: true,
      message:
        "Your booking request has been sent successfully! We'll contact you shortly to confirm your reservation.",
    }
  } catch (error) {
    console.error("Error in sendBookingEmail:", error)
    return {
      success: false,
      message: `Failed to send booking request. Error: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}

