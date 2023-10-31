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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactService = exports.contacts = void 0;
const Contacts_json_1 = __importDefault(require("../data/Contacts.json"));
exports.contacts = Contacts_json_1.default;
function getAllContacts() {
    return __awaiter(this, void 0, void 0, function* () {
        //logica futura en DB.
        const data = yield exports.contacts;
        if (data.length === 0)
            throw new Error("No existen reservas.");
        return data;
    });
}
function getOneContact(contactId) {
    return __awaiter(this, void 0, void 0, function* () {
        //logica futura en DB.
        const data = yield exports.contacts.filter((contact) => contact.date.id === contactId.toString());
        if (data.length === 0)
            throw new Error("No hay ninguna reserva con ese id.");
        return data;
    });
}
function postNewContact(contact) {
    return __awaiter(this, void 0, void 0, function* () {
        //logica futura en DB.
        const initialLength = exports.contacts.length;
        const data = yield exports.contacts.push(contact);
        if (data === initialLength)
            throw new Error("Tu reserva no se añadio correctamente.");
        return data;
    });
}
function updateContact(contactId, update) {
    return __awaiter(this, void 0, void 0, function* () {
        //logica futura en DB.
        const contactIndex = yield exports.contacts.findIndex((contact) => contact.date.id === contactId.toString());
        if (contactIndex === -1)
            throw new Error("No puedes modificar una reserva que no existe.");
        const data = [...exports.contacts];
        Object.assign(data[contactIndex], update);
        return data;
    });
}
function deleteContact(contactId) {
    return __awaiter(this, void 0, void 0, function* () {
        //logica futura en DB.
        const contactIndex = yield exports.contacts.findIndex((contact) => contact.date.id === contactId.toString());
        if (contactIndex === -1)
            throw new Error("No hay ninguna reserva con ese id.");
        const data = exports.contacts.splice(contactIndex, 1);
        return data;
    });
}
exports.contactService = {
    getAllContacts,
    getOneContact,
    postNewContact,
    updateContact,
    delete: deleteContact,
};
