const { getAbbreviation } = require('./SearchTelephoneCode')

async function getFormatZipCode(countryName) {
    try {
        const countryCode = getAbbreviation(countryName)

        if (countryCode) {
            const url = `https://restcountries.com/v3.1/alpha/${countryCode}`
            const response = await fetch(url)

            if (response.ok) {
                const data = await response.json()
                const postalCodeFormat = data[0]?.postalCode?.regex || null
                return postalCodeFormat
            } else {
                throw new Error(`Failed to fetch data. Status code: ${response.status}`)
            }
        } else {
            throw new Error('Invalid country code.')
        }
    } catch (error) {
        throw new Error(`Error in getFormatZipCode: ${error.message}`)
    }
}

module.exports = getFormatZipCode