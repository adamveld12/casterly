'use strict';

import './app.less';

import React from 'react';
import { Router, Route, IndexRoute, Redirect } from 'react-router';
import injectTapEventPlugin from "react-tap-event-plugin";

injectTapEventPlugin();


function loadSearch(l, cb) {
  require.ensure(['./search/index.js'], () => cb(null, require('./search/index.js')));
}

function loadDetails(l, cb){
  require.ensure(['./details/index.js'], () => cb(null, require('./details/index.js')));
}

function loadPlaylists(l, cb){
  require.ensure(['./playlists/index.js'], () => cb(null, require('./playlists/index.js')));
}

function loadPlaylistDetails(l, cb){
  require.ensure(['./playlistDetails/index.js'], () => cb(null, require('./playlistDetails/index.js')));
}

class App extends React.Component {
  render(){
    return (
      <section id="main">
        { this.props.children }
      </section>
    );
  }
}

React.render(
  <Router>
    <Route path="/" component={App}>
      <IndexRoute getComponent={ loadSearch } />
      <Route path="/search" getComponent={ loadSearch } />
      <Route path="/details/:encodedFeedUrl" getComponent={ loadDetails } />
      <Route path="/playlists" getComponent={ loadPlaylists } />
      <Route path="/playlist/:name" getComponent={ loadPlaylistDetails } />
      <Redirect from="*" to="/" />
    </Route>
  </Router>

, document.body);
