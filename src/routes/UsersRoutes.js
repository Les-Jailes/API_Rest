const express = require('express');
const { getUser, getUsers, createUser, updateUser, deleteUser, getUserByEmail } = require('../controllers/UsersController.js')

const userRouter = express.Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', getUser);

userRouter.post('/', createUser);

userRouter.put('/:id', updateUser);

userRouter.delete('/:id', deleteUser);

userRouter.get('/email/:email', getUserByEmail)

module.exports = userRouter;