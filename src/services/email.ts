import nodemailer from "nodemailer";
import "dotenv/config";

const sender = process.env.EMAIL_SENDER || "";
const password = process.env.EMAIL_PASSWORD || "";
const receiver = process.env.EMAIL_RECEIVER || "";

async function sendEmail(subject: string, text: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: sender,
      pass: password,
    },
  });

  const mailOptions = {
    from: sender,
    to: receiver,
    subject,
    html: `<html>
    <body>
      ${text}
    </body>
  </html>`,
  };

  await transporter.sendMail(mailOptions);
}

export const sendEmailService = {
  sendEmail,
};
