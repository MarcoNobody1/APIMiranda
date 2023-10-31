import contactsData from "../data/Contacts.json";
import { ContactInterface } from "../interfaces/Contacts";

export const contacts = contactsData as ContactInterface[];

async function getAllContacts() {
  //logica futura en DB.
  const data = await contacts;
  if (data.length === 0) throw new Error("No existen reservas.");
  return data;
}

async function getOneContact(contactId: number) {
  //logica futura en DB.
  const data = await contacts.filter(
    (contact) => contact.date.id === contactId.toString()
  );
  if (data.length === 0) throw new Error("No hay ninguna reserva con ese id.");
  return data;
}

async function postNewContact(contact: ContactInterface) {
  //logica futura en DB.
  const initialLength = contacts.length;
  const data = await contacts.push(contact);
  if(data === initialLength) throw new Error("Tu reserva no se añadio correctamente.")
  return data;
}

async function updateContact(
  contactId: number,
  update: Partial<ContactInterface>
) {
  //logica futura en DB.
  const contactIndex = await contacts.findIndex(
    (contact) => contact.date.id === contactId.toString()
  );

  if (contactIndex === -1) throw new Error("No puedes modificar una reserva que no existe.")
  const data = [...contacts];
  Object.assign(data[contactIndex], update);
  return data;

}

async function deleteContact(contactId: number) {
  //logica futura en DB.

  const contactIndex = await contacts.findIndex(
    (contact) => contact.date.id === contactId.toString()
  );

  if (contactIndex === -1) throw new Error("No hay ninguna reserva con ese id.");

  const data = contacts.splice(contactIndex, 1);
  return data;
}

export const contactService = {
  getAllContacts,
  getOneContact,
  postNewContact,
  updateContact,
  delete: deleteContact,
};
