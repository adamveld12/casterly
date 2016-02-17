'use strict';

import mcFly from '../factory.js';


export default mcFly.createActions({
  create: function(name, initialTracks = []){
    return { actionType: 'CREATE_PLAYLIST', name, initialTracks };
  },
  delete: function(name){
    return { actionType: 'DELETE_PLAYLIST', name };
  },
  clear: function(){
    return { actionType: 'CLEAR_PLAYLISTS' };
  }
});
