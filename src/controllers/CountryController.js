const Country = require('../models/CountryModel')
const asyncHandler = require('express-async-handler')

const getCountries = asyncHandler(async (request, response) => {
    try {
        const countries = await Country.find({})
        response.status(200).json(countries)
    } catch (error) {
        response.status(error.status).json({
            message: error
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
        res.status(error.status)
        throw new Error(error.message)
    }
})

const getCountryByName = asyncHandler(async (request, response) => {
    try {
        const { name } = request.params
        const listCountry = await Country.find({ countryName: name })
        if (listCountry.length === 0) {
            response.status(404).json({ error: `${name} is not available` })
        } else {
            response.status(200).json(listCountry)
        }
    } catch (error) {
        res.status(error.status)
        throw new Error(error.message)
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
        res.status(error.status)
        throw new Error(error.message)
    }
})

const createCountry = asyncHandler(async (request, response) => {
    try {
        const country = request.body

        const regex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/

        console.log(country)

        if (country.countryName.length < 4) {
            response.status(400).json({
                error: 'The country name must have a minimum of 4 characters.'
            })
        } else if (!regex.test(country.countryName)) {
            response.status(400).json({
                error: 'The country name must have only letters and may include spaces.'
            })
        } else {
            const words = country.countryName.split(' ')

            const formattedCountryName = words
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ')

            if (formattedCountryName !== country.countryName) {
                response.status(400).json({
                    error: 'The country name must have each word starting with an uppercase letter and the rest in lowercase.'
                })
            } else if (country.tax < 0 || country.tax > 100) {
                response.status(400).json({
                    error: 'Taxes must be a minimum of 0 and a maximum of 100'
                })
            } else if (country.cityName.length === 0) {
                response.status(400).json({
                    error: 'The city name must have a minimum of 4 characters'
                })
            } else {
                response.status(200).json(country)
                await Country.create(country)
            }
        }
    } catch (error) {
        response.status(error.status)
        throw new Error(error.message)
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
        response.status(error.status)
        throw new Error(error.message)
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
        response.status(error.status)
        throw new Error(error.message)
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
        response.status(error.status || 500)
        throw new Error(error.message)
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
        response.status(error.status)
        throw new Error(error.message)
    }
})

module.exports = { createCountry, getCountries, getCountryById, getCountryByName, getCountryByTelephoneCode, deleteCountry, deleteCountryByName, deleteCity, updateCountry }