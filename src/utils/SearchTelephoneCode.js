const PhoneNumber = require('libphonenumber-js')
const countries = require('../utils/CountriesAbbreviation.json')

function getCountryCodeByName(countryName) {
    let abbreviation = getAbbreviation(countryName)

    if (abbreviation) {
        const telephoneCodeApi = PhoneNumber.getCountryCallingCode(abbreviation)

        if (telephoneCodeApi) {
            const telephoneCode = `+${telephoneCodeApi}`
            return telephoneCode
        }
    }

    return null
}

function getAbbreviation(countryName) {
    const countryInfo = countries.countries.find((country) => country.name.toLowerCase() === countryName.toLowerCase())

    if (countryInfo) {
        return countryInfo.abbreviation
    } else {
        return null
    }
}

module.exports = getCountryCodeByName