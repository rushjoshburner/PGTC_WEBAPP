import { Resend } from 'resend';

// Initialize Resend safely (prevents build error if key is missing)
const resendKey = process.env.RESEND_API_KEY || "re_123456789"; // Fallback for build
export const resend = new Resend(resendKey);

export async function sendEmail({
    to,
    subject,
    html,
}: {
    to: string;
    subject: string;
    html: string;
}) {
    try {
        const data = await resend.emails.send({
            from: 'Polo GT Club <onboarding@resend.dev>', // Default testing domain
            to,
            subject,
            html,
        });
        return { success: true, data };
    } catch (error) {
        return { success: false, error };
    }
}
