const express = require('express')

const router = express.Router()

const {addUser, loginUser, logoutUser, getUserDetails} = require('../../controllers')
const {asyncFuncCatch, userValidation, userTokenValidation} = require('../../middlewares')

router.post('/register', userValidation, asyncFuncCatch(addUser))
router.post('/login', userValidation, asyncFuncCatch(loginUser))
router.post('/logout', asyncFuncCatch(userTokenValidation), asyncFuncCatch(logoutUser))
router.post('/current', asyncFuncCatch(userTokenValidation), asyncFuncCatch(getUserDetails))

module.exports = router
