import { combineReducers } from 'redux'

import { reducer as search, fetchSearchResultsIfNeeded, openDialog } from './search.js'

export const reducers = combineReducers({ search })

export const searchActions = {
  fetchSearchResultsIfNeeded,
  openDialog,
}
