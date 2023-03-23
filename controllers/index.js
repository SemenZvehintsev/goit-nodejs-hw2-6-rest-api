const { addUser, loginUser, logoutUser, getUserDetails } = require("./userControllers");
const { listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact } = require("./contactControllers");

module.exports = { addUser, loginUser, logoutUser, getUserDetails, listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact };