const express = require('express')
const path = require('path')
const Joi = require('joi');

const router = express.Router()
const contactsPath = path.resolve('models/contacts.js')
const contacts = require(contactsPath)

router.get('/', async (req, res, next) => {

  const data = await contacts.listContacts()

  res.status('200').json(data)
})

router.get('/:contactId', async (req, res, next) => {

  const [data] = await contacts.getContactById(req.params.contactId)

  if (!data) {
    res.status('404').json({ "message": "Not found" })
    return
  }

  res.status('200').json(data)
})

router.post('/', async (req, res, next) => {

  const {name, email, phone} = req.body

  const schema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    
    phone: [
      Joi.string().required(),
      Joi.number().required()
    ]
})

  const { error } = schema.validate({ name, email, phone });

  if (error) {
    res.status('400').json({"message": "missing required name field"})
    return
  }

  const data = await contacts.addContact(req.body)
  res.status('201').json(data)
})

router.delete('/:contactId', async (req, res, next) => {
  const data = await contacts.removeContact(req.params.contactId)
  
  if (!data) {
    res.status('404').json({ 'message': 'not found' })
    return
  }

  res.status('200').json({ 'message': 'contact deleted' })
})

router.put('/:contactId', async (req, res, next) => {

  if (!req.body) {
    res.status('400').json({"message": "missing fields"})
    return
  }

  const schema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    
    phone: [
      Joi.string(),
      Joi.number()
    ]
})

  const { error } = schema.validate(req.body);

  if (error) {
    const [{message}] = error.details
    res.status('400').json({"message": message})
    return
  }

  const data = await contacts.updateContact(req.params.contactId, req.body)

  if (!data) {
    res.status('404').json({ 'message': 'not found' })
    return
  }

  res.status('200').json(data)
})

module.exports = router
