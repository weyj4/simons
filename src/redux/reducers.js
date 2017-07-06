import { combineReducers } from 'redux'
import { REQUEST_WORLD_POPULATION, RECEIVE_WORLD_POPULATION,
  REQUEST_SHORT_NAMES, RECEIVE_SHORT_NAMES,
    REQUEST_COUNTRY, RECEIVE_COUNTRY,
    REQUEST_RANK, RECEIVE_RANK
} from './actions'

function loadingState(state) {
  return Object.assign({}, state, {
    loading: true
  })
}

function mainData(state = { totalDisplayedPopulation: 0 }, action) {
  switch (action.type) {
    case REQUEST_WORLD_POPULATION:
      return loadingState(state)
    case RECEIVE_WORLD_POPULATION:
      return Object.assign({}, state, {
        loading: false,
        worldPopulation: action.data
      })
    case REQUEST_SHORT_NAMES:
      return loadingState(state)
    case RECEIVE_SHORT_NAMES:
      return Object.assign({}, state, {
        loading: false,
        shortNames: action.data
      })
    case REQUEST_COUNTRY:
      return loadingState(state)
    case RECEIVE_COUNTRY:
      return Object.assign({}, state, {
        loading: false,
        countryData: Object.assign({}, state.countryData, {
          [action.country]: action.data
        }),
        totalDisplayedPopulation: state.totalDisplayedPopulation + action.data.overall
      })
    case REQUEST_RANK:
      return loadingState(state)
    case RECEIVE_RANK:
      return Object.assign({}, state, {
        loading: false,
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
