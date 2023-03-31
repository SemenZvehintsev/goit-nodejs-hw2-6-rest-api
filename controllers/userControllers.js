const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const Jimp = require('jimp')
const path = require('path')
const {User} = require('../models')


const addUser = async (req, res) => {

    const userIsExist = await User.findOne({email: req.body.email})

    if (userIsExist) {
      res.status('409').json({"message": "Email in use"})
      return 
    }

    const avatar = gravatar.url(req.body.email, {s: '250', r: 'g', d: 'robohash'}, true)

    const newUser = {...req.body, avatar}

    const user = await User.create(newUser)

    res.status('201').json({
      "user": {
        "email": user.email,
        "subscription": user.subscription
    }})
}

const loginUser = async (req, res) => {

  const user = await User.findOne({email: req.body.email})

  if (!user) {
    res.status('401').json({"message": "Email or password is wrong"})
    return 
  }

  const passwordIsValid = await user.checkPassword(req.body.password, user.password)
  
  if (!passwordIsValid) {
    res.status('401').json({"message": "Email or password is wrong"})
    return 
  }

  const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'})

  const loginUser = await User.findByIdAndUpdate(user._id, {token: token},  { new: true })

  res.status('200').json({
    "token": loginUser.token,
    "user": {
      "email": loginUser.email,
      "subscription": loginUser.subscription
    }})
}

const logoutUser = async (req, res, next) => {

  const user = await User.findById(req.user._id)

  if (!user) {
    res.status('401').json({"message": "Not authorized"})
    return
  }

  user.token = undefined;
  await user.save()

  res.status("204").send()
}

const getUserDetails = async (req, res, next) => {
  
  const user = await User.findById(req.user._id)

  if(!user) {
    res.status('401').json({"message": "Not authorized"})
    return
  }

  res.status('200').json({
    "email": user.email,
    "subscription": user.subscription
  })
}

const updateUserAvatar = async (req, res, next) => {

  const user = await User.findById(req.user._id)

  if(!user) {
    res.status('401').json({"message": "Not authorized"})
    return
  }

  const newAvatarPath = path.join(process.cwd(), '/public/avatars', req.file.filename)

  Jimp.read(req.file.path, function (err, avatar) {
    if (err) throw err;
    avatar
     .resize(250, 250)
     .write(newAvatarPath);
    next();
   });

  const avatarUrl = `/avatars/${req.file.filename}`

  user.avatarUrl = avatarUrl

  await user.save()

  res.status('200').json({"avatarURL": user.avatarUrl})

}
  
module.exports = { addUser, loginUser, logoutUser, getUserDetails, updateUserAvatar }
  