const express = require('express')
const { createCountry, getCountries, deleteCountry, updateCountry, getCountryById, getCountryByName, deleteCountryByName, deleteCity, getCountryByTelephoneCode, getCityByName } = require('../controllers/CountryController.js')

const countryRouter = express.Router()

// GET request
countryRouter.get('/', getCountries)
countryRouter.get('/:id', getCountryById)
countryRouter.get('/name/:name', getCountryByName)
countryRouter.get('/telephone-code/:telephoneCode', getCountryByTelephoneCode)
countryRouter.get('/name/:countryName/city/:cityName', getCityByName)

// POST request
countryRouter.post('/', createCountry)

// PUT request
countryRouter.put('/:id', updateCountry)

// DELETE request
countryRouter.delete('/:id', deleteCountry)
countryRouter.delete('/name/:name', deleteCountryByName)
countryRouter.delete('/name/:countryName/city/:cityName', deleteCity)

module.exports = countryRouter