const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');


const sendEmail = (req, res) => {
    res.status(200).json({hello: "hello"})
}

module.exports = {
    sendEmail
}