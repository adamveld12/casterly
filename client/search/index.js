import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchActions  } from '../reducers'

import { IconButton, CircularProgress } from 'material-ui'
import { SearchInput, PodcastCard, AddFromURL, Intro } from '../components'

import './search.less'

const SearchPage = ({ term, isDialogOpen, dispatch, results, loading, history }) =>  {

      const { fetchSearchResultsIfNeeded, openDialog } = searchActions

      const openDetails = (feedUrl) => {
        history.pushState({ feedUrl }, `/details/${encodeURIComponent(feedUrl)}`)
      }


      function closeDialog(){
        dispatch(openDialog(false))
      }

      return (
        <div id="searchPage">
          <AddFromURL onSubmit={ () => {} }
                      onDismiss={ () => { closeDialog() } }
                      open={ isDialogOpen } />

          <header className="searchHeader">
            <IconButton iconClassName="fa fa-rss"
                        tooltip="Add a feed from url"
                        touch={ true }
                        onClick={ () => dispatch(openDialog(true)) } />
            <SearchInput disabled={ loading }
                         text={ term }
                         onSubmit={ (term) => dispatch(fetchSearchResultsIfNeeded(term)) } />
          </header>

          <section className={ loading ? "notifications" : "notifications hide"}>
            <CircularProgress className={ loading ? "animated fadeIn" : "animated fadeOut" }
                              mode="indeterminate" size={ 2 } />
          </section>

          <ul className="searchResults">
            {
              results.length > 0 ? 
                results.filter(item => !item.feedUrl.includes("feedburner"))
                              .map(item => (
                    <li key={item.collectionId} className="animated fadeIn">
                      <PodcastCard podcast={ item } handle={ openDetails.bind(this) } />
                   </li>
                ))
              : ( <Intro /> )
            }
          </ul>
        </div>
      )
}

export default connect(({ search }) => search)(SearchPage)
