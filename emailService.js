import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

/**
 * Send a share-link email to a signer
 * @param {object} opts
 * @param {string} opts.to       — recipient email
 * @param {string} opts.name     — recipient name
 * @param {string} opts.docTitle — document title
 * @param {string} opts.shareUrl — full share URL
 * @param {string} opts.expiresAt — ISO date string
 */
export async function sendShareLinkEmail({ to, name, docTitle, shareUrl, expiresAt }) {
  const expiryDate = new Date(expiresAt).toLocaleDateString('en-NA', {
    day: '2-digit', month: 'long', year: 'numeric',
  })

  const html = `
    <div style="font-family: Inter, sans-serif; max-width: 520px; margin: 0 auto; color: #1a1a1a;">
      <div style="background: #0F2544; padding: 24px; border-radius: 12px 12px 0 0;">
        <p style="color: #E8571A; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 4px;">Tushiya Conform · by Tushiya HS Consulting</p>
        <h1 style="color: #fff; font-size: 20px; margin: 0;">Document Signature Request</h1>
      </div>
      <div style="background: #fff; border: 1px solid #e0dad0; border-top: none; padding: 24px; border-radius: 0 0 12px 12px;">
        <p>Hi ${name || 'there'},</p>
        <p>You have been asked to read and sign the following HSE document:</p>
        <div style="background: #f8f5ee; border-left: 4px solid #E8571A; padding: 12px 16px; margin: 16px 0; border-radius: 4px;">
          <strong>${docTitle}</strong>
        </div>
        <p>Click the button below to view and sign the document:</p>
        <a href="${shareUrl}" style="display: inline-block; background: #E8571A; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 8px 0;">
          View &amp; Sign Document →
        </a>
        <p style="font-size: 12px; color: #999; margin-top: 24px;">
          This link expires on ${expiryDate}. If you did not expect this email, please contact your HSE Manager.
        </p>
        <hr style="border: none; border-top: 1px solid #e0dad0; margin: 20px 0;" />
        <p style="font-size: 11px; color: #bbb; margin: 0;">
          Tushiya Conform · Tushiya HS Consulting · Walvis Bay &amp; Windhoek, Namibia<br />
          oswald@tushiyahs.com · +264 81 260 9767 · tushiyahs.com
        </p>
      </div>
    </div>
  `

  return transporter.sendMail({
    from: process.env.SMTP_FROM || 'Tushiya Conform <noreply@tushiyahs.com>',
    to,
    subject: `Action Required: Please sign "${docTitle}"`,
    html,
  })
}
