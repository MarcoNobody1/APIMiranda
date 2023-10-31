"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactsController = void 0;
const express_1 = require("express");
const contacts_1 = require("../services/contacts");
exports.contactsController = (0, express_1.Router)();
exports.contactsController.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contacts = yield contacts_1.contactService.getAllContacts();
        res.json(contacts);
    }
    catch (error) {
        res.status(500).json(`${error}`);
    }
}));
exports.contactsController.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contact = yield contacts_1.contactService.getOneContact(req.params.id);
        res.json(contact);
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
}));
exports.contactsController.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield contacts_1.contactService.delete(req.params.id);
        res.json(deleted);
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
}));
exports.contactsController.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield contacts_1.contactService.updateContact(req.params.id, req.body);
        res.json(updated);
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
}));
exports.contactsController.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const added = yield contacts_1.contactService.postNewContact(req.body);
        res.json(added);
    }
    catch (error) {
        res.status(500).json(`${error}`);
    }
}));
