import searchStore from './searchStore.js'
import searchActions from './searchActions.js'


export const Search = {
  store: searchStore,
  actions: searchActions,
}

/*
import p1s from './playlistStore.js';
import pla from './playlistActions.js';

export const Playlist = {
  store: pls,
  actions: pla
};
*/

import ps from './playerStore.js';
import pa from './playerActions.js';

export const Player = {
  store: ps,
  actions: pa
};

