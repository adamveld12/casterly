'use strict';

import mcFly from '../factory.js';
import { SearchPodcasts, ImportRss } from '../api.js';

let podcastResults = [];
let details = {};

const SearchStore =  mcFly.createStore({
  getPodcasts: () => {
    return podcastResults;
  },
  getDetailsFor: (rssFeedUrl) => {
    return details[rssFeedUrl];
  }
},
function({ actionType, searchTerm, rssFeedUrl}){
   if(actionType === "SEARCH"){
     return SearchPodcasts(searchTerm).then((data) => { 
        podcastResults = data.results;
        setTimeout(() => SearchStore.emitChange(), 0);
        return true;
      })
      .catch((msg) => {
        alert("something went wrong" + msg);
        return false;
      });
   } else if (actionType === "ADD_FROM_URL") {
      if (details[rssFeedUrl]){
        setTimeout(() => SearchStore.emitChange(), 0);
        return true;
      } else {
        return ImportRss(rssFeedUrl).then(data => {
          details[rssFeedUrl] = data;
          setTimeout(() => SearchStore.emitChange(), 0);
          return true;
        })
        .catch(msg => {
          alert("something went wrong" + msg);
          return false;
        });
     }
   }
});

export default SearchStore;

