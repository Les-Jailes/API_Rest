const express = require('express');
const { getUser, getUsers, createUser, updateUser, deleteUser } = require('../controllers/UsersController.js')

const userRouter = express.Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', getUser);

userRouter.post('/', createUser);

userRouter.put('/:id', updateUser);

userRouter.delete('/:id', deleteUser);

module.exports = userRouter;