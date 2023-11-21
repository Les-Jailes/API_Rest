const mongoose = require('mongoose')

const countrySchema = mongoose.Schema(
    {
        countryName: {
            type: String,
            required: true
        },
        tax: {
            type: Number,
            required: true
        },
        cityName: {
            type: String,
            required: true
        },
        zipCode: {
            type: String,
            required: true
        },
        telephoneCode: {
            type: String,
            required: true
        }
    }
)