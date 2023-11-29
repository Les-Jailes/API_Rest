const emailRouter = require('express').Router();

const { sendEmail } = require('../controllers/EmailController')


emailRouter.post('/', sendEmail);


module.exports = emailRouter;