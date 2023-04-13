const asyncFuncCatch = require("./asyncFuncCatch");
const { validationAddContact, validationUpdContact, validationUpdStatusContact } = require("./contactsValidation");
const { userValidation, userTokenValidation, userVerificationValidation, userReVerificationValidation  } = require("./usersValidation.js");
const avatarUpload = require('./avatarsMiddleware')

module.exports = { asyncFuncCatch, validationAddContact, validationUpdContact, validationUpdStatusContact, userValidation, userTokenValidation, userVerificationValidation, userReVerificationValidation, avatarUpload };