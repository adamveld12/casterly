'use strict';

import mcFly from '../factory.js';
import { SearchPodcasts, ImportRss } from '../api.js';

let playlists = [];

function create(name, initialTracks){
  playlists.push({ name, tracks: initialTracks });
}

function remove(name){
  const results = playlists.map((p, index) => (p.name === name) ? { playlist: p, index } : undefined)
                           .filter(item => item !== undefined);

  if (results.length > 0) {
    const { index } = results[0];
    playlists.splice(1, index);
  }
}

function clearAll() {
  playlists = [];
}

const PlaylistStore =  mcFly.createStore({
  getPlaylists: () => {
    return playlists;
  }
},
function({ actionType, name, initialTracks}){
  if (actionType === "CREATE_PLAYLIST")
    create(name, initialTracks || []);
  else if (actionType === "DELETE_PLAYLIST")
    remove(name)
  else if (actionType === "CLEAR_PLAYLISTS")
    clear();
  else
    return false;

  PlaylistStore.emitChange();
  return true;
});

export default PlaylistStore;

