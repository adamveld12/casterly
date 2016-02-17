'use strict';

import $ from 'jquery';
import { parseString } from "xml2js";
import { Podcast } from './models';

const buildSearchUrl = (term) => `https://itunes.apple.com/search?term=${term}&limit=200&entity=podcast&media=podcast`;

const corsProxy = (url) => `http://cors.veldhousen.ninja/${url}`;

export const ImportRss = (feedUrl) => {
  return new Promise((resolve, reject) => {
    if (feedUrl.includes("feedburner")) {
      reject("We don't support feedburner feeds at this time.");
    } else {
      return fetch(corsProxy(feedUrl), {
        type: 'GET',
        dataType: 'json',
      }).then((response) => response.text())
        .then((text) => {
            return new Promise((a, r) => {
                parseString(text, function(err, data){
                  if (err) r(err);
                  else a(Podcast.convertToCast(feedUrl, data.rss.channel[0]));
                });
            });
          })
        .then((content) => resolve(content));
      }
  });
}


export const SearchPodcasts = (term) => {
  const url = buildSearchUrl(term)

  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      jsonp: "callback",
      dataType: 'jsonp',
      success: (response) => resolve(response),
      error: (msg) => reject(msg)
    });
  });
}
