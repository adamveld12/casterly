'use strict';

import React from 'react';
import { IconButton, CircularProgress, Avatar, ListItem, ListDivider, Card, CardHeader, CardTitle, CardMedia, CardText, CardActions } from 'material-ui';

import { Search } from '../stores';
import { SearchInput } from '../components';


import './details.less';


export default class Details extends React.Component {
  constructor(){
    super();
    this.state = { 
      podcast: { title: "", description: "", image: "", link: "", episodes: [] }, 
      episodeResults: [],
      loading: true
    };
  }

  componentDidMount(){
    Search.store.on('change', ()=> {
      const { feedUrl } = this.state;
      const podcast = Search.store.getDetailsFor(feedUrl);
      if (podcast) {
        this.setState({ loading: false, podcast, episodeResults: podcast.episodes });
      }
    });

    const { location: { state: { feedUrl } }, routeParams: { encodedFeedUrl } } = this.props;

    // check location state first for our feedUrl
    if (feedUrl) {
      Search.actions.addFromUrl(feedUrl);
      this.setState({ feedUrl });
    // if not present load from route params
    } else {
      const { decodedFeedUrl } = decodeURIComponent(encodedFeedUrl);
      Search.actions.addFromUrl(decodedFeedUrl);
      this.setState({ feedUrl: decodedFeedUrl });
    }
  }

  addToPlaylist(){
  }

  play(){
  }

  filter(term){
    const { podcast: { episodes } } = this.state;
    const lowerCaseTerm = term.toLowerCase().trim(' ');
    setTimeout(() => {
      this.setState({ episodeResults: episodes.filter(item => item.title.toLowerCase().includes(lowerCaseTerm)) });
    }, 0);
  }

  render(){
    const {
        loading,
        podcast: {
          title,
          description,
          image,
          link,
          episodes
        },
        episodeResults
      } = this.state;

    return (
      <section id="castDetails">
        <section className={ loading ? "animated fadeIn loader" : "loader hide"}>
          <CircularProgress className={ loading ? "animated fadeIn" : "animated fadeOut hide" } size={4} />
        </section>

        <section className={ loading ? "hide" : "animated fadeIn"} >
          <Card className="header">
            <CardMedia overlay={
                <section className="detailsHeader">
                  <CardTitle>
                    <h1><a target="_blank" href={ link }>{ title }</a></h1>
                    <p> { episodes.length } Episodes </p>
                  </CardTitle>
                  <CardText> { description } </CardText>
                </section>
            }>
              <img className="headerImage" src={ image } />
            </CardMedia>
          </Card>

          <Card>
            <CardActions>
              <IconButton iconClassName="fa fa-play"
                          tooltip="Listen"
                          touch={true}
                          onClick={ this.play.bind(this) } />

              <IconButton iconClassName="fa fa-plus"
                          tooltip="Add to Playlist"
                          touch={true}
                          onClick={ this.addToPlaylist.bind(this) } />
            </CardActions>
            <section className="meta">
              <SearchInput hint="Search episodes" onSubmit={ this.filter.bind(this) } onUpdate={ this.filter.bind(this) } />
            </section>
            <ul className="episodeList">
              {
                episodeResults.map((episode, index) => {
                  return (
                   <li>
                    <ListItem leftAvatar={<Avatar src={ episode.image } />}
                              primaryText={ episode.title }
                              secondaryTextLines={1}
                              secondaryText= {
                                <p dangerouslySetInnerHtml={{ __html: episode.description }}> </p>
                                } />
                      <ListDivider inset={true} />
                  </li>
                  );
                })
              }
            </ul>
          </Card>
        </section>

      </section>
    );
  }
}

