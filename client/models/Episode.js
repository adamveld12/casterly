'use strict';

import * as xU from '../utils.js';

/*
 * Represents a podcast episode
 *
 */
export default class Episode {
  constructor(id, parentPodcast, number, title, description, img, link, downloadLink, listened){
    this.__id = id;
    this.parentPodcast = parentPodcast;
    this.number = number;
    this.title = title;
    this.description = description || "";
    this.image = img;
    this.link = link;
    this.downloadLink = downloadLink;
    this.listened = !!listened;
  }

  get id() {
    return this.__id;
  }
}

Episode.convertToEpisode = function(parentCast, epNum, raw){
  const id = xU.slugify(raw.title);
  const title = raw.title;
  const description = xU.isNullOrWhitespace(raw.desription) ? raw['itunes:summary'] : raw.description;
  const link = raw.link || raw.guid;
  const download = (raw.enclosure.$.url || raw.enclosure.href);
  const image = xU.getImage(parentCast, raw);

  return new Episode(id,
                     parentCast,
                     epNum,
                     title,
                     description,
                     image,
                     link,
                     download);
}
