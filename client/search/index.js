import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSearchResultsIfNeeded } from '../reducers/search.js'

import { IconButton, CircularProgress } from 'material-ui'
import { SearchInput, PodcastCard, AddFromURL, Intro } from '../components'

import './search.less'

const SearchPage = ({ dispatch, results, loading, history }) =>  {
      const openDetails = (feedUrl) => {
        history.pushState({ feedUrl }, `/details/${encodeURIComponent(feedUrl)}`)
      }

      return (
        <div id="searchPage">
          <header className="searchHeader">
            <IconButton iconClassName="fa fa-rss"
                        tooltip="Add a feed from url"
                        touch={ true }
                        onClick={ () => this.openDialog() } />
            <SearchInput disabled={ loading } onSubmit={ (term) => dispatch(fetchSearchResultsIfNeeded(term)) } />
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
