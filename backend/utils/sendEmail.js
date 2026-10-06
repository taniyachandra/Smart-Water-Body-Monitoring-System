import nodemailer from "nodemailer";

// SMTP settings .env me ho to asli email jayegi.
// Na ho to link backend terminal me print hoga (local testing ke liye).
export default async function sendEmail({ to, subject, text }) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.log("\n--- EMAIL (SMTP not configured, showing here) ---");
    console.log(`To: ${to}\nSubject: ${subject}\n\n${text}`);
    console.log("--------------------------------------------------\n");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transporter.sendMail({
    from: MAIL_FROM || SMTP_USER,
    to,
    subject,
    text,
  });
}