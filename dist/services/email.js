"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv/config");
const sender = process.env.EMAIL_SENDER || "";
const password = process.env.EMAIL_PASSWORD || "";
const receiver = process.env.EMAIL_RECEIVER || "";
async function sendEmail(subject, text) {
    const transporter = nodemailer_1.default.createTransport({
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
exports.sendEmailService = {
    sendEmail,
};
