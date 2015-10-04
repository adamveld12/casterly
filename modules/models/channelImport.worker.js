'use strict';
import Podcast from './Podcast.js';

onmessage = function({ data: payload }){
  const { feedUrl, channel } = JSON.parse(payload);

  console.log(channel);

  const results = Podcast.convertToCast(feedUrl, channel);
  console.log(`Successfully parsed RSS: ${results}`);
  postMessage(JSON.stringify({ results }));
}
