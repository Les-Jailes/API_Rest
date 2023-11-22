const express = require('express');
const { getUserHistoryById } = require('../controllers/OrderHistoryController');
 
const HistoryRouter = express.Router();

HistoryRouter.get('/:id', getUserHistoryById)
module.exports = {HistoryRouter}