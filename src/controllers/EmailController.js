require('dotenv').config()
const nodemailer = require('nodemailer');

const emailTemplate = require('../lib/EmailTemplate');

const EMAIL = process.env.EMAIL
const PASSWORD = process.env.PASSWORD

const sendEmail =  (req, res) => {
    const { email, name, telephone, comments } = req.body;
    let config = {
        service : 'gmail',
        auth : {
            user: EMAIL,
            pass: PASSWORD
        }
    }
    let transporter = nodemailer.createTransport(config);


const dynamicContent = {
    email: email,
    name: name,
    subject: `Contact Us Message - User ${email}`,
    telephone: telephone,
    comments: comments
};
const formattedEmail = emailTemplate.replace(/{{(\w+)}}/g, (match, p1) => dynamicContent[p1]);
    let message = {
        from : EMAIL,
        to : EMAIL,
        subject: `Contact Us Message - User ${email}`,
        html: formattedEmail
    }

    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: `Email sent from: ${email}, to: ${EMAIL}`
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })
}

module.exports = {
    sendEmail
}