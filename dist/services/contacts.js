"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactService = void 0;
const connection_1 = require("../util/connection");
async function getAllContacts() {
    const query = "SELECT * FROM contact";
    const contacts = await (0, connection_1.QueryHandler)(query);
    return contacts;
}
async function getOneContact(contactId) {
    const query = "SELECT * FROM contact WHERE id = ?";
    const fields = [contactId];
    const contact = await (0, connection_1.QueryHandler)(query, fields);
    return contact;
}
async function postNewContact(contact) {
    const query = "INSERT INTO contact (date, name, email, phone, subject, comment, archived) VALUES (?,?,?,?,?,?,?)";
    const fields = [
        contact.date,
        contact.name,
        contact.email,
        contact.phone,
        contact.subject,
        contact.comment,
        contact.archived,
    ];
    const newContact = await (0, connection_1.QueryHandler)(query, fields);
    return newContact;
}
async function updateContact(contactId, update) {
    const query = "UPDATE contact SET date = ?, name = ?, email = ?, phone = ?, subject = ?, comment = ?, archived = ? WHERE id = ?";
    const fields = [
        update.date,
        update.name,
        update.email,
        update.phone,
        update.subject,
        update.comment,
        update.archived,
        contactId
    ];
    const updatedContact = await (0, connection_1.QueryHandler)(query, fields);
    return updatedContact;
}
async function deleteContact(contactId) {
    const query = "DELETE FROM contact WHERE id = ?";
    const fields = [contactId];
    const deletedContact = await (0, connection_1.QueryHandler)(query, fields);
    return deletedContact;
}
exports.contactService = {
    getAllContacts,
    getOneContact,
    postNewContact,
    updateContact,
    delete: deleteContact,
};
