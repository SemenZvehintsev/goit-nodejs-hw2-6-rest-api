const nodemailer = require('nodemailer')
require('dotenv').config();

//////////////////// for SendGrid
// const sendGridMail = require('@sendgrid/mail')

const config = {
    host: 'smtp.meta.ua',
    port: 465,
    secure: true,
    auth: {
        user: process.env.NODEMAIL_EMAIL,
        pass: process.env.NODEMAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false
    }
}

const transporter = nodemailer.createTransport(config);

const sendVerify = (email, verificationToken) => {

    const emailOptions = {
        from: process.env.NODEMAIL_EMAIL,
        to: email,
        subject: 'Посилання для верифікації email',
        text: `http://localhost:${process.env.NODEMAIL_EMAIL}/api/users/verify/${verificationToken}`,
        html: `<a href="http://localhost:${process.env.NODEMAIL_EMAIL}/api/users/verify/${verificationToken}">/users/verify/${verificationToken}</a>`
    };
    
    transporter
        .sendMail(emailOptions)
        .then(info => console.log(info))
        .catch(error => console.log(error))

    //////////////////// for SendGrid


    // sendGridMail.setApiKey(process.env.SENDGRID_API_KEY)

    // sendGridMail
    //     .send(emailOptions)
    //     .then(() => {
    //         console.log('Email sent');
    //     })
    //     .catch(error => console.error(error));
}


module.exports = sendVerify