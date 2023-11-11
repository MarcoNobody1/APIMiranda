"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactService = void 0;
const Contacts_model_1 = require("../models/Contacts.model");
async function getAllContacts() {
    const contacts = await Contacts_model_1.Contacts.find();
    if (contacts.length === 0)
        throw new Error("Error al obtener los mensajes.");
    return contacts;
}
async function getOneContact(contactId) {
    const contact = await Contacts_model_1.Contacts.findById(contactId);
    if (!contact)
        throw new Error("No hay ningun mensaje con ese id.");
    return contact;
}
async function postNewContact(contact) {
    const newContact = await Contacts_model_1.Contacts.create(contact);
    if (!newContact)
        throw new Error("Tu mensaje no se añadio correctamente.");
    return newContact;
}
async function updateContact(contactId, update) {
    const updatedContact = await Contacts_model_1.Contacts.findByIdAndUpdate(contactId, update, {
        new: true,
    });
    if (!updatedContact) {
        throw new Error("No puedes modificar un mensaje que no existe.");
    }
    return updatedContact;
}
async function deleteContact(contactId) {
    const deletedContact = await Contacts_model_1.Contacts.findByIdAndDelete(contactId);
    if (!deletedContact) {
        throw new Error("No hay ningun mensaje con ese id.");
    }
    return deletedContact;
}
exports.contactService = {
    getAllContacts,
    getOneContact,
    postNewContact,
    updateContact,
    delete: deleteContact,
};
