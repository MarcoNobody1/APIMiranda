"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactsController = void 0;
const express_1 = require("express");
const contacts_1 = require("../services/contacts");
const ContactSchema_1 = require("../models/ContactSchema");
const validation_1 = require("../middleware/validation");
exports.contactsController = (0, express_1.Router)();
exports.contactsController.get("/", async (_req, res) => {
    try {
        const contacts = await contacts_1.contactService.getAllContacts();
        res.json(contacts);
    }
    catch (error) {
        res.status(500).json(`${error}`);
    }
});
exports.contactsController.get("/:id", async (req, res) => {
    try {
        const contact = await contacts_1.contactService.getOneContact(req.params.id);
        res.json(contact);
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
});
exports.contactsController.delete("/:id", async (req, res) => {
    try {
        const deleted = await contacts_1.contactService.delete(req.params.id);
        res.json(deleted);
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
});
exports.contactsController.put("/:id", (0, validation_1.genValidationMiddleware)(ContactSchema_1.ContactSchema), async (req, res) => {
    try {
        const updated = await contacts_1.contactService.updateContact(req.params.id, req.body);
        res.json(updated);
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
});
exports.contactsController.post("/", (0, validation_1.genValidationMiddleware)(ContactSchema_1.ContactSchema), async (req, res) => {
    try {
        const added = await contacts_1.contactService.postNewContact(req.body);
        res.json(added);
    }
    catch (error) {
        res.status(500).json(`${error}`);
    }
});
