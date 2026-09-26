import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Contact / Authority-Audit form → email. Sends every enquiry to the
// inbox configured below (from the same authenticated mailbox), with the
// enquirer's address set as reply-to so replies go straight to them.
const SMTP_HOST = process.env.SMTP_HOST || "smtp.zoho.in";
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";
const CONTACT_TO = process.env.CONTACT_TO || SMTP_USER;
const CONTACT_FROM = process.env.CONTACT_FROM || SMTP_USER;

function clean(v: unknown, max = 5000): string {
  return String(v ?? "").trim().slice(0, max);
}

export async function POST(request: Request) {
  if (!SMTP_USER || !SMTP_PASS) {
    return NextResponse.json({ error: "Email is not configured." }, { status: 500 });
  }

  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = clean(data.name, 200);
  const email = clean(data.email, 200);
  const company = clean(data.company, 200);
  const linkedin = clean(data.linkedin, 500);
  const challenge = clean(data.challenge);
  const goal = clean(data.goal);

  if (!name || !email || !company || !challenge) {
    return NextResponse.json({ error: "Please fill in the required fields." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Company", company],
    ["LinkedIn", linkedin || "—"],
    ["Authority challenge", challenge],
    ["Business goal", goal || "—"],
  ];

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const html = `
    <h2 style="font-family:sans-serif;color:#071a3d">New Authority Audit enquiry</h2>
    <table style="font-family:sans-serif;font-size:14px;color:#1f2937;border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:6px 12px;font-weight:600;color:#071a3d;vertical-align:top">${k}</td><td style="padding:6px 12px;white-space:pre-wrap">${esc(v)}</td></tr>`,
        )
        .join("")}
    </table>`;

  try {
    await transporter.sendMail({
      from: `"WRDS.PRO — Website enquiry" <${CONTACT_FROM}>`,
      to: CONTACT_TO,
      replyTo: `"${name}" <${email}>`,
      subject: `New enquiry from ${name}${company ? ` (${company})` : ""}`,
      text,
      html,
    });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json({ error: "Could not send your message. Please email us directly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
