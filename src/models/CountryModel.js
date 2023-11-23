const mongoose = require('mongoose')

const zipCodeSchema = mongoose.Schema(
    {
        subCityName: {
            type: String
        },
        zipCode: {
            type: String
        }
    }
)

const countrySchema = mongoose.Schema(
    {
        countryName: {
            type: String,
            required: true,
            index: true
        },
        tax: {
            type: Number,
            required: true
        },
        cityName: {
            type: String,
            required: true,
            index: true
        },
        zipCodes: [
            zipCodeSchema
        ],
        telephoneCode: {
            type: String,
            required: true,
            index: true
        }
    }
)

const Country = mongoose.model("Country", countrySchema)
module.exports = Country