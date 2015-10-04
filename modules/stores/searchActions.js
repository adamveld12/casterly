'use strict';

import mcFly from '../factory.js';


export default mcFly.createActions({
  search: function(searchTerm){
    return { actionType: 'SEARCH', searchTerm };
  },
  addFromUrl: function(rssFeedUrl){
    return { actionType: 'ADD_FROM_URL', rssFeedUrl };
  }
});
