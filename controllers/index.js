const { addUser, loginUser, logoutUser, getUserDetails, updateUserAvatar, verifyUser, reVerifyUser } = require("./userControllers");
const { listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact } = require("./contactControllers");

module.exports = { addUser, loginUser, logoutUser, getUserDetails, updateUserAvatar, verifyUser, reVerifyUser, listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact };