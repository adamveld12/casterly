'use strict';

import React from 'react';
import { IconButton, CircularProgress } from 'material-ui';
import { SearchInput, PodcastCard, AddFromFeedDialog, Intro } from '../components';

import { Search } from '../stores';

import './search.less';

export default class SearchPage extends React.Component {
  constructor(){
    super();
    this.state = { podcastResults: [], loading: false };
  }

  componentDidMount(){
    Search.store.on('change', () => {
      const podcastResults = Search.store.getPodcasts();
      this.setState({ podcastResults, loading: false });
    });
  }

  search(value){
    this.setState({ loading: true });
    Search.actions.search(value);
  }

  openDialog(){
    this.setState({ showDialog: true });
  }

  closeDialog(){
    this.setState({ showDialog: false });
  }

  openDetails(feedUrl){
    const { history } = this.props;
    console.log(`importing ${feedUrl}`);
    history.pushState({ feedUrl }, `/details/${encodeURIComponent(feedUrl)}`);
  }


  render(){
    const { loading, podcastResults, showDialog } = this.state;

    const dialog = (<AddFromFeedDialog open={ showDialog }
                                       onDismiss={ this.closeDialog.bind(this) }
                                       onSubmit={ this.openDetails.bind(this) } />);
    return (
      <div id="searchPage">
        <header className="searchHeader">
          { dialog }
          <IconButton iconClassName="fa fa-rss"
                      tooltip="Add a feed from url"
                      touch={ true }
                      onClick={ () => this.openDialog() } />
          <SearchInput disabled={ loading } onSubmit={ this.search.bind(this) } />
        </header>

        <section className={ loading ? "notifications" : "notifications hide"}>
          <CircularProgress className={ loading ? "animated fadeIn" : "animated fadeOut" }
                            mode="indeterminate" size={ 2 } />
        </section>

        <ul className="searchResults">
          {
            podcastResults.length > 0 ? 
              podcastResults.filter(item => !item.feedUrl.includes("feedburner"))
                            .map(item => (
                  <li key={item.collectionId} className="animated fadeIn">
                    <PodcastCard podcast={ item } handle={ this.openDetails.bind(this) } />
                 </li>
              ))
            : ( <Intro /> )
          }
        </ul>
      </div>
    );
  }
}
