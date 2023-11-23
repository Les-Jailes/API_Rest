const Country = require('../models/CountryModel')
const asyncHandler = require('express-async-handler')
const validateCountry = require('../utils/ValidationCountry')

const getCountries = asyncHandler(async (request, response) => {
    try {
        const countries = await Country.find({})
        response.status(200).json(countries)
    } catch (error) {
        response.status(error.status || 500).json({
            message: error.message || 'Internal Server Error',
        })
    }
})

const getCountryById = asyncHandler(async (request, response) => {
    try {
        const { id } = request.params
        const country = await Country.findById(id)
        if (!country) {
            response.status(error.status)
            throw new Error(`Can not find country with id: ${id}`)
        }
        response.status(200).json(country)
    } catch (error) {
        response.status(error.status || 500).json({
            message: error.message || 'Internal Server Error',
        })
    }
})

const getCountryByName = asyncHandler(async (request, response) => {
    try {
        const { name } = request.params
        const listCountry = await Country.find({ countryName: name })
        if (listCountry.length === 0) {
            response.status(404).json({ error: `${name} is not available` })
        } else {
            response.status(200).json({
                message: `${listCountry.length} ${ listCountry.length === 1 ? 'item' : 'items' } found for the search of ${name}`,
                listCountry
            })
        }
    } catch (error) {
        response.status(error.status || 500).json({
            message: error.message || 'Internal Server Error',
        })
    }
})

const getCountryByTelephoneCode = asyncHandler(async (request, response) => {
    try {
        const { telephoneCode } = request.params
        const listCountry = await Country.find({ telephoneCode: telephoneCode })

        if (listCountry.length === 0) {
            response.status(404).json({ error: `No country with telephone code: ${telephoneCode}` })
        } else {
            response.status(200).json({
                message: `Total countries with telephone code ${telephoneCode}: ${listCountry.length}`, listCountry
            })
        }
    } catch (error) {
        response.status(error.status || 500).json({
            message: error.message || 'Internal Server Error',
        })
    }
})

const createCountry = asyncHandler(async (request, response) => {
    try {
        const country = request.body
        validateCountry(country)
        response.status(200).json(country)
        await Country.create(country)
    } catch (error) {
        response.status(error.status || 500).json({
            message: error.message || 'Internal Server Error',
        })
    }
})

const deleteCountry = asyncHandler(async (request, response) => {
    try {
        const { id } = request.params
        const country = await Country.findByIdAndDelete(id)
        if (!country) {
            response.status(error.status)
            throw new Error(`Can not find country with id: ${id}`)
        }
        response.status(200).json(country)
    } catch (error) {
        response.status(error.status || 500).json({
            message: error.message || 'Internal Server Error',
        })
    }
})

const deleteCountryByName = asyncHandler(async (request, response) => {
    try {
        const { name } = request.params
        const result = await Country.deleteMany({ countryName: name })

        response.status(200).json({
            message: `Deleted ${result.deletedCount} objects of: ${name}`
        })
    } catch (error) {
        response.status(error.status || 500).json({
            message: error.message || 'Internal Server Error',
        })
    }
})

const deleteCity = asyncHandler(async (request, response) => {
    try {
        const { countryName, cityName } = request.params

        const country = await Country.findOne({ countryName: countryName })

        if (!country) {
            response.status(404)
            throw new Error(`${countryName} not found`)
        }

        const city = await Country.findOne({ countryName: countryName, cityName: cityName })

        if (!city) {
            response.status(404)
            throw new Error(`${cityName} of ${countryName} not found`)
        }

        const deletedCity = await Country.findOneAndDelete({ countryName: countryName, cityName: cityName })

        response.status(200).json({
            message: `City '${cityName}' in country '${countryName}' deleted successfully`,
            deletedCity
        })
    } catch (error) {
        response.status(error.status || 500).json({
            message: error.message || 'Internal Server Error',
        })
    }
})

const updateCountry = asyncHandler(async (request, response) => {
    try {
        const { id } = request.params
        const country = await Country.findByIdAndUpdate(id, request.body)
        if (!country) {
            response.status(error.status)
            throw new Error(`Can not find country with id ${id}`)
        }
        response.status(200).json(await Country.findById(id))
    } catch (error) {
        response.status(error.status || 500).json({
            message: error.message || 'Internal Server Error',
        })
    }
})

module.exports = { createCountry, getCountries, getCountryById, getCountryByName, getCountryByTelephoneCode, deleteCountry, deleteCountryByName, deleteCity, updateCountry }