import fetch from 'isomorphic-fetch'

const API_ROOT = 'http://api.population.io/1.0'

export const REQUEST_COUNTRIES = 'REQUEST_COUNTRIES'
export const RECEIVE_COUNTRIES = 'RECEIVE_COUNTRIES'
export const REQUEST_WORLD_POPULATION = 'REQUEST_WORLD_POPULATION'
export const RECEIVE_WORLD_POPULATION = 'RECEIVE_WORLD_POPULATION'
export const REQUEST_USA_POPULATION = 'REQUEST_USA_POPULATION'
export const RECEIVE_USA_POPULATION = 'RECEIVE_USA_POPULATION'
export const REQUEST_SHORT_NAMES = 'REQUEST_SHORT_NAMES'
export const RECEIVE_SHORT_NAMES = 'RECEIVE_SHORT_NAMES'
export const REQUEST_COUNTRY = 'REQUEST_COUNTRY'
export const RECEIVE_COUNTRY = 'RECEIVE_COUNTRY'
export const REQUEST_RANK = 'REQUEST_RANK'
export const RECEIVE_RANK = 'RECEIVE_RANK'

export function requestCountries() {
  return {
    type: REQUEST_COUNTRIES
  }
}

export function receiveCountries(data) {
  return {
    type: RECEIVE_COUNTRIES,
    data
  }
}

export function requestWorldPop() {
  return {
    type: REQUEST_WORLD_POPULATION
  }
}

export function receiveWorldPop(data) {
  return {
    type: RECEIVE_WORLD_POPULATION,
    data
  }
}

export function requestUSAPop() {
  return {
    type: REQUEST_USA_POPULATION
  }
}

export function receiveUSAPop(data) {
  return {
    type: RECEIVE_USA_POPULATION,
    data
  }
}

export function requestShortNames() {
  return {
    type: REQUEST_SHORT_NAMES
  }
}

export function receiveShortNames(data) {
  return {
    type: RECEIVE_SHORT_NAMES,
    data
  }
}

export function requestCountry() {
  return {
    type: REQUEST_COUNTRY
  }
}

export function receiveCountry(country, data) {
  return {
    type: RECEIVE_COUNTRY,
    country,
    data
  }
}

export function requestRank() {
  return {
    type: REQUEST_RANK
  }
}

export function receiveRank(data) {
  return {
    type: RECEIVE_RANK,
    data
  }
}

function sumAges(populationByAge) {
  return populationByAge.reduce((sum, val) => sum + val.total, 0)
}

function listShortest(countryNames) {
  const sorted = countryNames.sort((a, b) => a.length - b.length)
  let idx = 0
  while (sorted[idx].length === sorted[0].length) {
    idx++
  }
  return sorted.slice(0, idx)
}

export function fetchCountries() {
  return function(dispatch) {
    dispatch(requestCountries())
    const countries = mockData
    dispatch(receiveCountries(countries))
  }
}

export function fetchWorldPop() {
  return function(dispatch) {
    dispatch(requestWorldPop())
    const countryGroups = []
    for (let i = 0; i < 100; i++) {
      countryGroups.push(fetch(`${API_ROOT}/population/2017/aged/${i}`)
        .then(response => response.json())
        .then(json => json.reduce((sum, val) => sum + val.total, 0)))
    }
    return Promise.all(countryGroups)
      .then(countries => countries.reduce((sum, val) => sum + val, 0))
      .then(json => dispatch(receiveWorldPop(json)))
  }
}

export function fetchUSAPop() {
  return function(dispatch) {
    dispatch(requestUSAPop())
    return fetch(`${API_ROOT}/population/2017/United States`)
      .then(response => response.json())
      .then(populationByAge => sumAges(populationByAge))
      .then(json => dispatch(receiveUSAPop(json)))
  }
}

export function fetchShortNames() {
  return function(dispatch) {
    dispatch(requestShortNames())
    const shortest = listShortest(mockData)
    dispatch(receiveShortNames(shortest))
  }
}

export function fetchCountry(country) {
  return function(dispatch) {
    dispatch(requestCountry())
    return fetch(`${API_ROOT}/population/2017/${country}/18`)
      .then(response => response.json())
      .then(json => dispatch(receiveCountry(country, json[0])))
  }
}

export function fetchRank(dob, sex, country) {
  return function(dispatch) {
    dispatch(requestRank())
    return fetch(`${API_ROOT}/wp-rank/${dob}/${sex}/${country}/today/`)
      .then(response => response.json())
      .then(json => dispatch(receiveRank(json)))
  }
}

const mockData = [
                "Afghanistan", 
                "Albania", 
                "Algeria", 
                "Angola", 
                "Antigua and Barbuda", 
                "Arab Rep of Egypt", 
                "Argentina", 
                "Armenia", 
                "Aruba", 
                "Australia", 
                "Australia/New Zealand", 
                "Austria", 
                "Azerbaijan", 
                "The Bahamas", 
                "Bahrain", 
                "Bangladesh", 
                "Barbados", 
                "Belarus", 
                "Belgium", 
                "Belize", 
                "Benin", 
                "Bhutan", 
                "Bolivia", 
                "Bosnia and Herzegovina", 
                "Botswana", 
                "Brazil", 
                "Brunei Darussalam", 
                "Bulgaria", 
                "Burkina Faso", 
                "Burundi", 
                "Cote-d-Ivoire", 
                "Cabo Verde", 
                "Cambodia", 
                "Cameroon", 
                "Canada", 
                "Caribbean", 
                "Central African Republic", 
                "Central America", 
                "Central Asia", 
                "Chad", 
                "Channel Islands", 
                "Chile", 
                "China", 
                "Hong Kong SAR-China", 
                "Macao SAR China", 
                "Colombia", 
                "Comoros", 
                "Congo", 
                "Costa Rica", 
                "Croatia", 
                "Cuba", 
                "Curacao", 
                "Cyprus", 
                "Czech Republic", 
                "Dem Peoples Rep of Korea", 
                "Dem Rep of Congo", 
                "Denmark", 
                "Djibouti", 
                "Dominican Republic", 
                "Eastern Africa", 
                "Eastern Asia", 
                "Eastern Europe", 
                "Ecuador", 
                "El Salvador", 
                "Equatorial Guinea", 
                "Eritrea", 
                "Estonia", 
                "Ethiopia", 
                "Federated States of Micronesia", 
                "Fiji", 
                "Finland", 
                "France", 
                "French Guiana", 
                "French Polynesia", 
                "FYR Macedonia", 
                "Gabon", 
                "The Gambia", 
                "Georgia", 
                "Germany", 
                "Ghana", 
                "Greece", 
                "Grenada", 
                "Guadeloupe", 
                "Guam", 
                "Guatemala", 
                "Guinea", 
                "Guinea-Bissau", 
                "Guyana", 
                "Haiti", 
                "Honduras", 
                "Hungary", 
                "Iceland", 
                "India", 
                "Indonesia", 
                "Islamic Republic of Iran", 
                "Iraq", 
                "Ireland", 
                "Israel", 
                "Italy", 
                "Jamaica", 
                "Japan", 
                "Jordan", 
                "Kazakhstan", 
                "Kenya", 
                "Kiribati", 
                "Kuwait", 
                "Kyrgyz Republic", 
                "Lao PDR", 
                "Latvia", 
                "Least developed countries", 
                "Lebanon", 
                "Lesotho", 
                "Less developed regions", 
                "Less developed regions, excluding China", 
                "Less developed regions, excluding least developed countries", 
                "Liberia", 
                "Libya", 
                "Lithuania", 
                "Luxembourg", 
                "Madagascar", 
                "Malawi", 
                "Malaysia", 
                "Maldives", 
                "Mali", 
                "Malta", 
                "Martinique", 
                "Mauritania", 
                "Mauritius", 
                "Mayotte", 
                "Melanesia", 
                "Mexico", 
                "Micronesia", 
                "Middle Africa", 
                "Moldova", 
                "Mongolia", 
                "Montenegro", 
                "More developed regions", 
                "Morocco", 
                "Mozambique", 
                "Myanmar", 
                "Namibia", 
                "Nepal", 
                "The Netherlands", 
                "New Caledonia", 
                "New Zealand", 
                "Nicaragua", 
                "Niger", 
                "Nigeria", 
                "Northern Africa", 
                "Northern Europe", 
                "Norway", 
                "Oman", 
                "Other non-specified areas", 
                "Pakistan", 
                "Panama", 
                "Papua New Guinea", 
                "Paraguay", 
                "Peru", 
                "Philippines", 
                "Poland", 
                "Polynesia", 
                "Portugal", 
                "Puerto Rico", 
                "Qatar", 
                "Reunion", 
                "RB-de-Venezuela", 
                "Rep of Korea", 
                "Rep of Yemen", 
                "Romania", 
                "Russian Federation", 
                "Rwanda", 
                "St-Lucia", 
                "St-Vincent and the Grenadines", 
                "Samoa", 
                "Sao Tome and Principe", 
                "Saudi Arabia", 
                "Senegal", 
                "Serbia", 
                "Seychelles", 
                "Sierra Leone", 
                "Singapore", 
                "Slovak Republic", 
                "Slovenia", 
                "Solomon Islands", 
                "Somalia", 
                "South Africa", 
                "South America", 
                "South Sudan", 
                "South-Central Asia", 
                "South-Eastern Asia", 
                "Southern Africa", 
                "Southern Asia", 
                "Southern Europe", 
                "Spain", 
                "Sri Lanka", 
                "West Bank and Gaza", 
                "Sub-Saharan Africa", 
                "Sudan", 
                "Suriname", 
                "Swaziland", 
                "Sweden", 
                "Switzerland", 
                "Syrian Arab Rep", 
                "Tajikistan", 
                "Tanzania", 
                "Thailand", 
                "Timor-Leste", 
                "Togo", 
                "Tonga", 
                "Trinidad and Tobago", 
                "Tunisia", 
                "Turkey", 
                "Turkmenistan", 
                "Uganda", 
                "Ukraine", 
                "United Arab Emirates", 
                "United Kingdom", 
                "United States", 
                "US Virgin Islands", 
                "Uruguay", 
                "Uzbekistan", 
                "Vanuatu", 
                "Vietnam", 
                "Western Africa", 
                "Western Asia", 
                "Western Europe", 
                "Western Sahara", 
                "World", 
                "Zambia", 
                "Zimbabwe"
            ]
