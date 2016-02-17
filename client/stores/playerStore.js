'use strict';

import mcFly from '../factory.js';

let queue = [];
let currentlyPlayingPtr = 0;

function next(){
  let newPtr = currentlyPlayingPtr + 1;
  if (newPtr >= queue.length) {
    newPtr = 0;
  }
  currentlyPlayingPtr = newPtr;
}

function prev(){
  let newPtr = currentlyPlayingPtr - 1;
  if (newPtr < 0) {
    newPtr = queue.length - 1;
  }
  currentlyPlayingPtr = newPtr;
}

function skipTo(track){
  const results = queue.map((ep, index) => (ep.title === track.title) ? { track, index } : undefined)
                       .filter(item => item !== undefined);

  if (results.length > 0) {
    const { index } = results[0];
     currentlyPlayingPtr = index;
  }
}

function remove(track){
  const results = queue.map((ep, index) => (ep.title === track.title) ? { track, index } : undefined)
                       .filter(item => item !== undefined);

  if (results.length > 0) {
    const { index } = results[0];
    queue.splice(1, index);
  }
}

const PlayStore =  mcFly.createStore({
  getQueue: () => {
    return queue;
  },
  getCurrentlyPlaying: () => {
    return queue[currentlyPlayingPtr];
  }
},
function({ actionType, track, playlist }){
  if(actionType === "NEXT_TRACK")
    next();
  else if (actionType === "PREVIOUS_TRACK")
    prev();
  else if (actionType === "ENQUEUE") {
    console.log('enqueuing ', track);
    queue.push(track);
  } else if (actionType === "PLAY_NEXT")
    queue.splice(currentlyPlayingPtr, 0, track);
  else if (actionType === "PLAY_PLAYLIST")
    queue = playlist.tracks;
  else if (actionType === "CLEAR")
    queue = [];
  else if (actionType === "SKIP_TO")
    skipTo(track);
  else if (actionType === "REMOVE")
    remove(track);
  else
    return false;

  PlayStore.emitChange();
  return true;
});

export default PlayStore;

