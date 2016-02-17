'use strict';

import mcFly from '../factory.js';


export default mcFly.createActions({
  next: function(){
    return { actionType: 'NEXT_TRACK' };
  },
  previous: function(){
    return { actionType: 'PREVIOUS_TRACK' };
  },
  enqueue: function(track){
    return { actionType: 'ENQUEUE', track };
  },
  playNext: function(track){
    return { actionType: 'PLAY_NEXT', track };
  },
  skipTo: function(track){
    return { actionType: 'SKIP_TO', track };
  },
  playPlaylist: function(playlist){
    return { actionType: 'PLAY_PLAYLIST', playlist };
  },
  clear: function(){
    return { actionType: 'CLEAR' };
  }
});
