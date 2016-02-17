import { SearchPodcasts } from '../api.js'

export const RECEIVE_SEARCH_RESULTS = "RECEIVE_SEARCH_RESULTS"
export const REQUEST_SEARCH_RESULTS = "REQUEST_SEARCH_RESULTS"
export const ERROR_REQUEST_SEARCH_RESULTS = "ERROR_REQUEST_SEARCH_RESULTS"

export function fetchSearchResultsIfNeeded(term) {
  return (dispatch, getState) => {
    const { loadingSearchResults } = getState()

    if (loadingSearchResults)
      return Promise.resolve()
    else
      return dispatch(fetchSearchResults(term))
  }
}

export function reducer(state = { results: [], loadingSearchResults: false }, action) {
  switch(action.type){
    case RECEIVE_SEARCH_RESULTS:
      return Object.assign({}, state, { results: action.results, loadingSearchResults: false })
    case REQUEST_SEARCH_RESULTS:
      return Object.assign({}, state, { loadingSearchResults: true })
    case ERROR_REQUEST_SEARCH_RESULTS:
      return Object.assign({}, state, { loadingSearchResults: false,  error: action.error })
    default:
      return state
  }
}

function fetchSearchResults(term) {
  return dispatch => {
    dispatch(requestSearchResults(term))

    return SearchPodcasts(term)
      .then(({ results }) => dispatch(receiveSearchResults(results)))
      .catch((msg) => dispatch(errorRequestSearchResults(msg)))
  }
}

function receiveSearchResults(results) {
  return { type: RECEIVE_SEARCH_RESULTS, results }
}

function requestSearchResults(term) {
  return { type: REQUEST_SEARCH_RESULTS, term, loadingSearchResults: true }
}

function errorRequestSearchResults(msg) {
  return { type: ERROR_REQUEST_SEARCH_RESULTS, error: msg }
}
