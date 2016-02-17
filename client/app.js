import './app.less'

import React, { Component } from 'react'
import injectTapEventPlugin from "react-tap-event-plugin"
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router'

import Player from './player'


injectTapEventPlugin()

const pages = {
  Search:  (l, cb) => require.ensure(['./search'], () => cb(null, require('./search').default)),
  Details: (l, cb) => require.ensure(['./details'], () => cb(null, require('./details').default)),
  Playlists: (l, cb) => require.ensure(['./playlists'], () => cb(null, require('./playlists').default)),
}


const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))


class App extends Component {
  render(){
    return (
      <section id="main">
        { this.props.children }
        <Player />
      </section>
    )
  }
}

render(
  <Provider store={ store }>
    <Router history={hashHistory}>
      <Route path="/" component={ App }>
        <IndexRoute getComponent={ pages.Search } />
        <Route path="/search" getComponent={ pages.Search } />
        <Route path="/details/:encodedFeedUrl" getComponent={ pages.Details } />
        <Route path="/playlists" getComponent={ pages.Playlists } />
        <Route path="/playlist/:name" getComponent={ pages.Playlists } />
        <Redirect from="*" to="/" />
      </Route>
    </Router>
  </Provider>
, document.getElementById("app_container"))
