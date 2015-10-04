'use strict';

import $ from 'jquery';
import { parseString } from "xml2js";
import Worker from './models/channelImport.worker.js';

const buildSearchUrl = (term) => `https://itunes.apple.com/search?term=${term}&limit=200&entity=podcast&media=podcast`;


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


import { Podcast } from './models';

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
                  else { 
                    var channel = data.rss.channel[0];
                    a(Podcast.convertToCast(feedUrl, channel));
                    //var worker = new Worker;
                    //worker.postMessage(JSON.stringify({ feedUrl, channel }));
                    //worker.onmessage = function({ data: workerResponse }){
                      //const { results, reason } = JSON.parse(workerResponse);
                      //console.log('worker completed import');
                      //if (results) a(results);
                      //else r(reason)
                    //}
                  }
                });
            });
          })
        .then((content) => resolve(content));
      }
  });
}

