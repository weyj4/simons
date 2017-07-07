import { combineReducers } from 'redux'
import { REQUEST_WORLD_POPULATION, RECEIVE_WORLD_POPULATION,
    REQUEST_SHORT_NAMES, RECEIVE_SHORT_NAMES,
    REQUEST_COUNTRY, RECEIVE_COUNTRY,
    REQUEST_RANK, RECEIVE_RANK,
    REQUEST_USA_POPULATION, RECEIVE_USA_POPULATION,
    REQUEST_COUNTRIES, RECEIVE_COUNTRIES
} from './actions'

function loadingState(state, loading) {
  return Object.assign({}, state, {
    [loading]: true
  })
}

function mainData(state = { totalDisplayedPopulation: 0 }, action) {
  switch (action.type) {
    case REQUEST_COUNTRIES:
      return loadingState(state, 'loadingCountries')
    case RECEIVE_COUNTRIES:
      return Object.assign({}, state, {
        loadingCountries: false,
        countries: action.data
      })
    case REQUEST_WORLD_POPULATION:
      return loadingState(state, 'loadingWorldPop')
    case RECEIVE_WORLD_POPULATION:
      return Object.assign({}, state, {
        loadingWorldPop: false,
        worldPopulation: action.data
      })
    case REQUEST_USA_POPULATION:
      return loadingState(state, 'loadingUSAPop')
    case RECEIVE_USA_POPULATION:
      return Object.assign({}, state, {
        loadingUSAPop: false,
        usaPopulation: action.data
      })
    case REQUEST_SHORT_NAMES:
      return loadingState(state, 'loadingShortNames')
    case RECEIVE_SHORT_NAMES:
      return Object.assign({}, state, {
        loadingShortNames: false,
        shortNames: action.data
      })
    case REQUEST_COUNTRY:
      return loadingState(state, 'loadingCountry')
    case RECEIVE_COUNTRY:
      return Object.assign({}, state, {
        loadingCountry: false,
        countryData: Object.assign({}, state.countryData, {
          [action.country]: action.data
        }),
        totalDisplayedPopulation: state.totalDisplayedPopulation + action.data.total
      })
    case REQUEST_RANK:
      return loadingState(state, 'rank')
    case RECEIVE_RANK:
      return Object.assign({}, state, {
        loadingRank: false,
        rank: action.data
      })
    default:
      return state
  }
}

const reducers = {
  mainData
}

export default combineReducers(reducers)
