"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailController = void 0;
const express_1 = require("express");
const email_1 = require("../services/email");
exports.emailController = (0, express_1.Router)();
exports.emailController.post("/", async (req, res) => {
    try {
        const { subject, text } = req.body;
        await email_1.sendEmailService.sendEmail(subject, text);
        res.json({ message: "Email sent successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
