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
exports.contactService = void 0;
const Contacts_model_1 = require("../models/Contacts.model");
function getAllContacts() {
    return __awaiter(this, void 0, void 0, function* () {
        const contacts = yield Contacts_model_1.Contacts.find();
        if (contacts.length === 0)
            throw new Error("Error al obtener los mensajes.");
        return contacts;
    });
}
function getOneContact(contactId) {
    return __awaiter(this, void 0, void 0, function* () {
        const contact = yield Contacts_model_1.Contacts.findById(contactId);
        if (!contact)
            throw new Error("No hay ningun mensaje con ese id.");
        return contact;
    });
}
function postNewContact(contact) {
    return __awaiter(this, void 0, void 0, function* () {
        const newContact = yield Contacts_model_1.Contacts.create(contact);
        if (!newContact)
            throw new Error("Tu mensaje no se añadio correctamente.");
        return newContact;
    });
}
function updateContact(contactId, update) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedContact = yield Contacts_model_1.Contacts.findByIdAndUpdate(contactId, update, {
            new: true,
        });
        if (!updatedContact) {
            throw new Error("No puedes modificar un mensaje que no existe.");
        }
        return updatedContact;
    });
}
function deleteContact(contactId) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletedContact = yield Contacts_model_1.Contacts.findByIdAndDelete(contactId);
        if (!deletedContact) {
            throw new Error("No hay ningun mensaje con ese id.");
        }
        return deletedContact;
    });
}
exports.contactService = {
    getAllContacts,
    getOneContact,
    postNewContact,
    updateContact,
    delete: deleteContact,
};
