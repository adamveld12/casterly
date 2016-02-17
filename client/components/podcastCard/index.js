'use strict';

import React from 'react';

import moment from 'moment';
import { Paper, Card, CardMedia, CardActions } from 'material-ui';
import { slugify } from '../../utils.js';

import './podcastCard.less';

export default class PodcastCard extends React.Component {
  render(){
    const {
      handle,
      podcast : {
        feedUrl,
        collectionId: id,
        artistName: artist,
        artworkUrl600: image,
        collectionName: title,
        releaseDate: date
      }
    } = this.props;

    const lastUpdated = moment(date).fromNow();
    return (
      <Paper>
        <section className="podcastCardContent" onClick={ () => handle(feedUrl) }>
          <Card>
            <CardMedia overlay={
              <section className="overlayHeader">
                <h2> { title } </h2>
                <p> { artist } </p>
                <p>updated { lastUpdated}</p>
              </section>
            }>
              <img className="podcastCardImage" src={ image } />
            </CardMedia>
          </Card>
        </section>
      </Paper>
    );
  }
} 


PodcastCard.defaultProps = {
  handle: (feedUrl) => { console.info("undefined handler called for", feedUrl); },
  podcast: { title: "UNDEFINED", artistName: "UNDEFINED", feedUrl: "UNDEFINED" }
};


PodcastCard.propTypes = {
  handle: React.PropTypes.func.isRequired,
  podcast: React.PropTypes.object.isRequired
};
