const User = require("../models/UserModel.js");

const getUsers = async(req, res) =>{
        try {
            const users = await User.find({});
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json({message: error.message})

        }
    }

const getUser =  async (req, res) =>{
        try {
            const {id} = req.params;
            const user = await User.findById(id);
            if (!user){
                res.status(404).json({message: `Can not find user with ID: ${id}`})         
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }


const createUser = async (req, res) =>{
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const updateUser =  async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        if (!user){
            res.status(404).json({message: `Can not find user with ID: ${id}`})         
        }
        res.status(200).json(await User.findById(id))
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const deleteUser =  async (req, res) =>{
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user){
            res.status(404).json({message: `Can not find user with ID: ${id}`})         
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    getUser, getUsers, createUser, updateUser, deleteUser
}