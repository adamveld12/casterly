import { SearchPodcasts } from '../api.js'
import { Map } from 'immutable'

export const RECEIVE_SEARCH_RESULTS = "RECEIVE_SEARCH_RESULTS"
export const REQUEST_SEARCH_RESULTS = "REQUEST_SEARCH_RESULTS"
export const ERROR_REQUEST_SEARCH_RESULTS = "ERROR_REQUEST_SEARCH_RESULTS"
export const OPEN_FEED_DIALOG = "OPEN_FEED_DIALOG"

export function fetchSearchResultsIfNeeded(term) {
  return (dispatch, getState) => {
    const { loadingSearchResults } = getState()

    if (loadingSearchResults)
      return Promise.resolve()
    else
      return dispatch(fetchSearchResults(term))
  }
}

export function openDialog(isDialogOpen) {
  return { type: OPEN_FEED_DIALOG, isDialogOpen }
}

export function reducer(state = getInitialState(), { isDialogOpen, type, term, results, loadingSearchResults, error }) {
  let newState = {};
  switch(type){
    case RECEIVE_SEARCH_RESULTS:
      newState =  { results, loadingSearchResults }
      break;
    case REQUEST_SEARCH_RESULTS:
      newState = { term, loadingSearchResults }
      break;
    case ERROR_REQUEST_SEARCH_RESULTS:
      newState =  { loadingSearchResults, error }
      break;
    case OPEN_FEED_DIALOG:
      newState = { isDialogOpen }
      break;
    default:
      return state
  }

  return Map(state).merge(newState).toJS()
}

function getInitialState() {
  return {
    results: [],
    loadingSearchResults: false,
    term: "",
    dialogOpen: false,
    error: ""
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
  return { type: RECEIVE_SEARCH_RESULTS, results, loadingSearchResults: false }
}

function requestSearchResults(term) {
  return { type: REQUEST_SEARCH_RESULTS, term, loadingSearchResults: true }
}

function errorRequestSearchResults(msg) {
  return { type: ERROR_REQUEST_SEARCH_RESULTS, error: msg, loadingSearchResults: false }
}
