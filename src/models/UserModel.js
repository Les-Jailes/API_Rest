const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
    {
        ci:{
            type: String,
            require: true,
        },
        name: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        imagePath: {
            type:String,
            required: true
        }
    },
    {
        timestamps: true,
        collection: 'User' 
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;