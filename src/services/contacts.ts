import { ContactInterface } from "../interfaces/Contacts";
import { QueryHandler } from "../util/connection";

async function getAllContacts() {
  const query = "SELECT * FROM contact";

  const contacts = await QueryHandler(query);

  return contacts;
}

async function getOneContact(contactId: string) {
  const query = "SELECT * FROM contact WHERE id = ?";

  const fields = [contactId];

  const contact = await QueryHandler(query, fields);

  return contact;
}

async function postNewContact(contact: ContactInterface) {
  const query =
    "INSERT INTO contact (date, name, email, phone, subject, comment, archived) VALUES (?,?,?,?,?,?,?)";

  const fields = [
    contact.date,
    contact.name,
    contact.email,
    contact.phone,
    contact.subject,
    contact.comment,
    contact.archived,
  ];

  const newContact = await QueryHandler(query, fields);

  return newContact;
}

async function updateContact(
  contactId: string,
  update: Partial<ContactInterface>
) {
  const query =
  "UPDATE contact SET date = ?, name = ?, email = ?, phone = ?, subject = ?, comment = ?, archived = ? WHERE id = ?";

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

const updatedContact = await QueryHandler(query, fields);

return updatedContact;
}

async function deleteContact(contactId: string) {
  const query = "DELETE FROM contact WHERE id = ?";

  const fields = [contactId];

  const deletedContact = await QueryHandler(query, fields);

  return deletedContact;
}

export const contactService = {
  getAllContacts,
  getOneContact,
  postNewContact,
  updateContact,
  delete: deleteContact,
};
