const jwt = require('jsonwebtoken')
const {User} = require('../models')
const { addServices, sendVerify, newAvatarURL } = require('../utils')


const addUser = async (req, res) => {

  const userIsExist = await User.findOne({email: req.body.email})

  if (userIsExist) {
    res.status(409).json({"message": "Email in use"})
    return 
  }
  
  const newUser = addServices(req.body)

  const {email, subscription, avatarURL, verificationToken} = await User.create(newUser)

  sendVerify(email, verificationToken)

  res.status(201).json({"user": {email, subscription, avatarURL}})
}

const loginUser = async (req, res) => {

  const user = await User.findOne({email: req.body.email})

  if (!user) {
    res.status(401).json({"message": "Email or password is wrong"})
    return 
  }

  if (!user.verify) {
    res.status(401).json({"message": "User is not verified"})
    return 
  }

  const passwordIsValid = await user.checkPassword(req.body.password, user.password)
  
  if (!passwordIsValid) {
    res.status(401).json({"message": "Email or password is wrong"})
    return 
  }

  const newToken = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'})

  const {token, email, subscription, avatarURL} = await User.findByIdAndUpdate(user._id, {token: newToken},  { new: true })

  res.status(200).json({
    token,
    "user": {email, subscription, avatarURL}})
}

const logoutUser = async (req, res) => {

  const user = await User.findById(req.user._id)

  if (!user) {
    res.status(401).json({"message": "Not authorized"})
    return
  }

  user.token = undefined;
  await user.save()

  res.status(204).send()
}

const getUserDetails = async (req, res) => {
  
  const user = await User.findById(req.user._id)

  if(!user) {
    res.status(401).json({"message": "Not authorized"})
    return
  }

  const {email, subscription, avatarURL} = user

  res.status(200).json({email, subscription, avatarURL})
}

const updateUserAvatar = async (req, res) => {

  const user = await User.findById(req.user._id)

  if(!user) {
    res.status(401).json({"message": "Not authorized"})
    return
  }

  user.avatarURL = newAvatarURL(req.file)
  await user.save()

  res.status(200).json({"avatarURL": user.avatarURL})

}

const verifyUser = async (req, res) => {

  const user = await User.findOne({verificationToken: req.params.verificationToken})

  if(!user) {
    res.status(404).json({"message": "User not found"})
    return
  }

  user.verificationToken = null
  user.verify = true
  await user.save()

  res.status(200).json({"message": "Verification successful"})
}

const reVerifyUser = async (req, res) => {

  const { email, verificationToken } = req.body.user

  sendVerify(email, verificationToken)

  res.status(200).json({"message": "Verification email sent"})
}
  
module.exports = { addUser, loginUser, logoutUser, getUserDetails, updateUserAvatar, verifyUser, reVerifyUser }
  