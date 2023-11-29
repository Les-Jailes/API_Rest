require('dotenv').config()
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

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
    let MailGenerator = new Mailgen({
        theme: "cerberus",
        product : {
            logo: "https://i.postimg.cc/WpY5Qt18/logo-White.png",
            logoHeight: "200px",
            name: "LES JAILES - CONTACT US FORM",
            link : 'https://test-boutique-clothing.vercel.app/'
        }
    })
    let response = {
        body: {
            title : `Hi Les jailes, from ${name}`,
            intro: `My telephone number is: ${telephone}.\nI have the following message:\n\n"${comments}"`,
            outro: `Thanks, I will hear your response.\n Atte. ${name} - ${email}`
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from : EMAIL,
        to : EMAIL,
        subject: `Contact Us Message - User ${email}`,
        html: mail
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