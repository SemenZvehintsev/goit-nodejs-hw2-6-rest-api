const gravatar = require('gravatar')

const { v4: uuidv4 } = require('uuid')

const addServices = (body) => {
    
    const avatarURL = gravatar.url(body.email, {s: '250', r: 'g', d: 'robohash'}, true)
    const verificationToken = uuidv4()

    const newUser = {...body, avatarURL, verificationToken}

    return newUser
}

module.exports = addServices