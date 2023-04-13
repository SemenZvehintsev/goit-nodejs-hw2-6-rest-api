const Jimp = require('jimp')
const path = require('path')

const newAvatarURL = (file) => {

    const newAvatarPath = path.join(process.cwd(), '/public/avatars', file.filename)

    Jimp.read(file.path, function (err, avatar) {
        if (err) throw err;
        avatar
        .resize(250, 250)
        .write(newAvatarPath);
    });

    const newAvatarURL = `/avatars/${file.filename}`

    return newAvatarURL

}

module.exports = newAvatarURL