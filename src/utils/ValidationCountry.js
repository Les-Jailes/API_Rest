const getCountryCodeByName = require('./SearchTelephoneCode')

function validateCountry(country) {
    validateFieldLength(country.countryName, 'The country name must have a minimum of 4 characters.', 4)
    validateRegex(country.countryName, /^[a-zA-Z]+(?: [a-zA-Z]+)*$/, 'The country name must have only letters and may include spaces.')

    const countryName = formatName(country.countryName)
    validateEqual(countryName, country.countryName, 'The country name must have each word starting with an uppercase letter and the rest in lowercase.')

    validateRange(country.tax, 0, 100, 'Taxes must be a minimum of 0 and a maximum of 100')

    validateFieldLength(country.cityName, 'The city name must have a minimum of 4 characters.', 4)
    validateRegex(country.cityName, /^[a-zA-Z]+(?: [a-zA-Z]+)*$/, 'The city name must have only letters and may include spaces.')

    const cityName = formatName(country.cityName)
    validateEqual(cityName, country.cityName, 'The city name must have each word starting with an uppercase letter and the rest in lowercase.')

    validateFieldLength(country.telephoneCode, 'Telephone code must have a minimum of 2 characters.', 2)
    validateRegex(country.telephoneCode, /^\+\d+$/, 'Telephone code must have the format +XXX.')

    const telephoneCode = getCountryCodeByName(country.countryName)
    validateEqual(country.telephoneCode, telephoneCode, `The telephone code ${country.telephoneCode} does not correspond to ${country.countryName}.`)

    const zipCodes = country.zipCodes

    if (zipCodes && zipCodes.length > 0) {
        for (const element of zipCodes) {
            let subCityInformation = element
            validateFieldLength(subCityInformation.subCityName, 'The sub city name must have a minimum of 4 characters.', 4)
            validateRegex(subCityInformation.subCityName, /^[a-zA-Z]+(?: [a-zA-Z]+)*$/, 'The sub city name must have only letters and may include spaces.')
            let subCityName = formatName(subCityInformation.subCityName)
            validateEqual(subCityName, subCityInformation.subCityName, `The sub city name of " ${subCityInformation.subCityName} " must have each word starting with an uppercase letter and the rest in lowercase.`)
        }
    }
}

function validateFieldLength(value, errorMessage, minimum) {
    if (value.length < minimum) {
        throw createError(400, errorMessage)
    }
}

function validateRegex(value, regex, errorMessage) {
    if (!regex.test(value)) {
        throw createError(400, errorMessage)
    }
}

function validateEqual(value1, value2, errorMessage) {
    if (value1 !== value2) {
        throw createError(400, errorMessage)
    }
}

function validateRange(value, min, max, errorMessage) {
    if (value < min || value > max) {
        throw createError(400, errorMessage)
    }
}

function formatName(inputName) {
    const words = inputName.split(' ')
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
}

function createError(status, message) {
    const error = new Error(message)
    error.status = status
    return error
}

module.exports = validateCountry