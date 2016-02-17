import './app.less';

import React from 'react';
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router';
import Player from './player';

import injectTapEventPlugin from "react-tap-event-plugin";

injectTapEventPlugin();


function loadSearch(l, cb) {
  require.ensure(['./search'], () => cb(null, require('./search').default));
}

function loadDetails(l, cb){
  require.ensure(['./details'], () => cb(null, require('./details').default));
}

function loadPlaylists(l, cb){
  require.ensure(['./playlists'], () => cb(null, require('./playlists').default));
}

function loadPlaylistDetails(l, cb){
  require.ensure(['./playlistDetails'], () => cb(null, require('./playlistDetails').default));
}

class App extends React.Component {
  render(){
    return (
      <section id="main">
        { this.props.children }
        <Player />
      </section>
    );
  }
}

render(
  <Router history={hashHistory}>
    <Route path="/" component={ App }>
      <IndexRoute getComponent={ loadSearch } />
      <Route path="/search" getComponent={ loadSearch } />
      <Route path="/details/:encodedFeedUrl" getComponent={ loadDetails } />
      <Route path="/playlists" getComponent={ loadPlaylists } />
      <Route path="/playlist/:name" getComponent={ loadPlaylistDetails } />
      <Redirect from="*" to="/" />
    </Route>
  </Router>
, document.getElementById("app_container"));
