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
        const result = yield contacts_1.contactService.getAllContacts();
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: true, message: "Error al obtener los mensajes." });
    }
}));
exports.contactsController.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield contacts_1.contactService.getOneContact(parseInt(req.params.id));
        res.json(result);
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
}));
exports.contactsController.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield contacts_1.contactService.delete(parseInt(req.params.id));
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
}));
exports.contactsController.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield contacts_1.contactService.updateContact(parseInt(req.params.id), req.body);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
}));
exports.contactsController.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield contacts_1.contactService.postNewContact(req.body);
        res.status(200).json(`Your contact is number ${result}`);
    }
    catch (error) {
        res.status(500).json(`${error}`);
    }
}));
