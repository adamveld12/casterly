'use strict';

import Episode from './Episode.js';
import * as xU from '../utils.js';

/*
 * Represents a podcast
 */
export default class Podcast {
  constructor(id, title, description, img, link, feedUrl, date, episodes){
    this.__id = id;
    this.title = title;
    this.description = description || "";
    this.image = img;
    this.link = link;
    this.feedUrl = feedUrl;
    this.date = date || "";
    this.episodes = episodes || [];
  }

  get id() {
    return this.__id;
  }
}

Podcast.convertToCast = function(feedUrl, xml){
  var raw = xU.collapse(xml);

  var id = xU.slugify(feedUrl);
  var title = raw.title;
  var description = raw.description || "";
  var link = raw.link || "";
  var feedUrl = feedUrl;
  var pubdate = (raw.pubDate || [""])[0];
  var image = xU.getImage(null, raw);

  var podcast = new Podcast(id,
                            title,
                            description,
                            image,
                            link,
                            feedUrl,
                            pubdate, []);

  var episodes = (raw.item || [])
        .filter((item) => item.guid && item.enclosure)
        .map((item, index) => Episode.convertToEpisode(podcast, index, item));

  // this is so we don't have circular refs
  return new Podcast(id, title, description, image, link, feedUrl, pubdate, episodes);
}

