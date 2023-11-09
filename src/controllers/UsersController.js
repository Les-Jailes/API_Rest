const User = require("../models/UserModel.js");
const asyncHandler = require('express-async-handler');

const getUsers = asyncHandler( async(req, res) =>{
        try {
            const users = await User.find({});
            res.status(200).json(users)
        } catch (error) {
            res.status(error.status)
            throw new Error(error.message);

        }
    })

const getUser =  asyncHandler( async (req, res) =>{
        try {
            const {id} = req.params;
            const user = await User.findById(id);
            if (!user){
                res.status(error.status)
                throw new Error(`Can not find product with ID: ${id}`);
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(error.status)
            throw new Error(error.message);
        }
    })


const createUser = asyncHandler( async (req, res) =>{
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(error.status)
        throw new Error(error.message);
    }
})

const updateUser =  asyncHandler( async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        if (!user){
            res.status(error.status)
                throw new Error(`Can not find product with ID: ${id}`);
        }
        res.status(200).json(await User.findById(id))
    } catch (error) {
        res.status(error.status)
        throw new Error(error.message);
    }
})

const deleteUser =  asyncHandler( async (req, res) =>{
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user){
            res.status(error.status)
            throw new Error(`Can not find product with ID: ${id}`);
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(error.status)
        throw new Error(error.message);
    }   
})


const getUserByEmail = asyncHandler(async (req, res) => {
    const { email } = req.params;
  
    const user = await User.findOne({ email: email });
  
    if (!user) {
      res.status(404).json({ message: 'User not found with email: ' + email });
      return;
    }
  
    res.status(200).json(user);
  });

module.exports = {
    getUser, getUsers, createUser, updateUser, deleteUser, getUserByEmail
}