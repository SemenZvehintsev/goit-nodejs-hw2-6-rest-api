const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.resolve('models/contacts.json')

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(contacts)
  } catch (error) {
    console.log(error)
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactFind = contacts.filter(contact => Number(contact.id) === Number(contactId));
    return contactFind
  } catch (error) {
    console.log(error)
  }
}

const removeContact = async (contactId) => {
  try {
    const data = await listContacts();
    const contactsUpdate = data.filter(contact => Number(contact.id) !== Number(contactId));
    await fs.writeFile(contactsPath, JSON.stringify(contactsUpdate));
    return data.length - contactsUpdate.length
  } catch (error) {
    console.log(error)
  }  
}

const addContact = async ({name, email, phone}) => {
  const id = Date.now()
  const newContact = {id, name, email, phone};
  try {
      const data = await listContacts();
      data.push(newContact);
      await fs.writeFile(contactsPath, JSON.stringify(data))
      return newContact  
  } catch (error) {
      console.log(error)
  }    
}

const updateContact = async (contactId, body) => {
  try {
    const data = await listContacts();
    const contactIndex = data.map(({id})=> id).indexOf(contactId);

    if (contactIndex < 0) {
      return 
    }

    data[contactIndex] = {...data[contactIndex], ...body}
    await fs.writeFile(contactsPath, JSON.stringify(data));
    console.log(data[contactIndex], data)
    return data[contactIndex]
  } catch (error) {
    console.log(error)
  }  
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
