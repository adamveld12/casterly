'use strict';

import React from 'react';
import { IconButton, CircularProgress, Avatar, ListItem, ListDivider, Card, CardHeader, CardTitle, CardMedia, CardText, CardActions } from 'material-ui';

import { Search, Player } from '../stores';
import { SearchInput } from '../components';
import { isNullOrWhitespace } from '../utils.js';


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
    const { podcast: { episodes } } = this.state;
    Player.actions.playPlaylist({ tracks: episodes.reverse() });
  }

  playSingle(episode){
    Player.actions.playPlaylist({ tracks: [episode] });
  }

  addToQueue(episode){
    Player.actions.enqueue(episode);
  }

  filter(term){
    const { podcast: { episodes } } = this.state;
    const lowerCaseTerm = term.toLowerCase().trim();
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
          <CircularProgress className={ loading ? "animated fadeIn" : "animated fadeOut hide" } size={ 4 } />
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
                  const nestedItems = isNullOrWhitespace(episode.description) ? [] : [
                      <p className="episodeDetailsDescription" dangerouslySetInnerHTML={{ __html: episode.description }} />
                  ];
                  return (
                   <li key={ index }>
                    <ListItem leftAvatar={<Avatar size={ 50 } src={ episode.image } />}
                              primaryText={ 
                                  <header className="episodeHeader">
                                    <IconButton iconClassName="fa fa-play"
                                                tooltip="Play"
                                                onClick={ () => this.playSingle(episode) }/>
                                    <IconButton iconClassName="fa fa-plus"
                                                tooltip="Add To Queue"
                                                onClick={ () => this.addToQueue(episode) } />
                                    <p>{ episode.title }</p>
                                  </header> }
                              initiallyOpen={ false }
                              nestedItems={ nestedItems } />
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
