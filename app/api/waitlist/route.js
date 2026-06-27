import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Meal Port Waitlist <onboarding@resend.dev>",
      to: "achomaduonyinye@gmail.com",
      subject: "🎉 New Waitlist Signup — Meal Port",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;">
          <div style="background:#1A7070;padding:28px 32px;border-radius:12px 12px 0 0;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;">🎉 New Waitlist Signup!</h1>
          </div>
          <div style="background:#f9fafb;padding:28px 32px;border-radius:0 0 12px 12px;border:1px solid #e5e7eb;border-top:none;">
            <p style="margin:0 0 16px;font-size:15px;color:#374151;">Someone just joined the <strong>Meal Port</strong> waitlist:</p>
            <div style="background:#ffffff;padding:16px 20px;border-radius:8px;border-left:4px solid #1A7070;margin-bottom:20px;">
              <p style="margin:0;font-size:15px;color:#111827;"><strong>Email:</strong> ${email}</p>
            </div>
            <p style="margin:0;font-size:13px;color:#9ca3af;">Signed up at: ${new Date().toLocaleString("en-US", { timeZone: "UTC", dateStyle: "full", timeStyle: "short" })} UTC</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Waitlist email error:", err);
    return NextResponse.json({ error: "Failed to process signup" }, { status: 500 });
  }
}
