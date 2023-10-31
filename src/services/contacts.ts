import { ContactInterface } from "../interfaces/Contacts";
import { Contacts } from "../models/Contacts.model";


async function getAllContacts() {
  const contacts = await Contacts.find();
  if (contacts.length === 0) throw new Error("Error al obtener los mensajes.");
  return contacts;
}

async function getOneContact(contactId: string) {
  const contact = await Contacts.findById(contactId);
  if (!contact) throw new Error("No hay ningun mensaje con ese id.");
  return contact;
}

async function postNewContact(contact: ContactInterface) {
  const newContact = await Contacts.create(contact);
  if (!newContact) throw new Error("Tu mensaje no se añadio correctamente.");
  return newContact;
}

async function updateContact(
  contactId: string,
  update: Partial<ContactInterface>
) {
  const updatedContact = await Contacts.findByIdAndUpdate(contactId, update, {
    new: true,
  });

  if (!updatedContact) {
    throw new Error("No puedes modificar un mensaje que no existe.");
  }

  return updatedContact;
}

async function deleteContact(contactId: string) {
  const deletedContact = await Contacts.findByIdAndDelete(contactId);

  if (!deletedContact) {
    throw new Error("No hay ningun mensaje con ese id.");
  }

  return deletedContact;
}


export const contactService = {
  getAllContacts,
  getOneContact,
  postNewContact,
  updateContact,
  delete: deleteContact,
};
