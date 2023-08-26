import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");
const updateContacts = (contact) =>
  fs.writeFile(contactsPath, JSON.stringify(contact, null, 1));

export const listContacts = async () => {
  const dataContracts = await fs.readFile(contactsPath);
  return JSON.parse(dataContracts);
};

export const getContactById = async (contactId) => {
  const dataContracts = await listContacts();
  const resultContact = dataContracts.find((item) => item.id === contactId);
  return resultContact || null;
};

export const removeContact = async (contactId) => {
  const dataContracts = await listContacts();
  const resultContactIndex = dataContracts.findIndex(
    (dataContract) => dataContract.id === contactId
  );
  if (resultContactIndex === -1) {
    return null;
  }
  const [result] = dataContracts.splice(resultContactIndex, 1);
  await updateContacts(dataContracts);
  return result;
};

export const addContact = async (name, email, phone) => {
  const dataContracts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  dataContracts.push(newContact);
  await updateContacts(dataContracts);
  return newContact;
};

export default { listContacts, getContactById, removeContact, addContact };
