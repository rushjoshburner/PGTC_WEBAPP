import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mail";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        // Send email to Admin
        await sendEmail({
            to: "admin@pologtclub.com", // Replace with real admin email
            subject: `New Contact Form: ${subject || "General Inquiry"}`,
            html: `
        <h1>New Message from ${name}</h1>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        });

        // Send auto-reply to User
        await sendEmail({
            to: email,
            subject: "We received your message - Polo GT Club",
            html: `
            <p>Hi ${name},</p>
            <p>Thanks for reaching out! We've received your message and will get back to you shortly.</p>
            <br>
            <p>Best,</p>
            <p>The Polo GT Club Team</p>
        `
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Contact API Error:", error);
        return NextResponse.json(
            { error: "Failed to send message" },
            { status: 500 }
        );
    }
}
