const express = require('express')

const router = express.Router()

const {validationAddContact, validationUpdContact, validationUpdStatusContact} = require('../../middlewares/validation')
const {listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact} = require('../../controllers/contactControllers')
const asyncFuncCatch = require('../../middlewares/asyncFuncCatch')


router.get('/', asyncFuncCatch(listContacts))

router.get('/:contactId', asyncFuncCatch(getContactById))

router.post('/', validationAddContact, asyncFuncCatch(addContact))

router.delete('/:contactId', asyncFuncCatch(removeContact))

router.put('/:contactId', validationUpdContact, asyncFuncCatch(updateContact))

router.patch('/:contactId', validationUpdStatusContact, asyncFuncCatch(updateStatusContact))

module.exports = router
