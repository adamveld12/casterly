'use strict';

import React from 'react';


import { IconButton, IconMenu } from 'material-ui';
const MenuItem = require('material-ui/lib/menus/menu-item');
const MenuDivider = require('material-ui/lib/menus/menu-divider');

import { Player } from '../stores';

import './controls.less';


export default class Controls extends React.Component {
  constructor(){
    super();
    this.state = { playing: false, repeat: false, queue: [], currentlyPlayingPtr: 0 };
  }

  play(){
    const { onPlay } = this.props;

    if (onPlay)
      onPlay();
  }

  pause(){
    const { onPause } = this.props;

    if (onPause)
      onPause();
  }

  previousTrack(){
    const { onPrevious } = this.props;

    if (onPrevious)
      onPrevious();

    Player.actions.previous();
  }

  nextTrack(){
    const { onNext } = this.props;

    if (onNext)
      onNext();

    Player.actions.next();
  }

  render(){
    const { repeat } = this.state;
    const { playing, queue } = this.props;
    const hasNext = queue.length > 0;
    const queueElement = <IconButton iconClassName="fa fa-list-ul"
                                      tooltip="Play Queue"
                                      tooltipPosition="top-center"
                                      touch={ true } />
    return (
      <section id="playerControl">

          <IconMenu maxHeight={ 300 }
                    iconButtonElement={queueElement}
                    openDirection={ "top-left" }>
            {
              queue.length > 0 ? queue.map((track, index) => (
                  <MenuItem primaryText={ `${index+1}. ${track.title}`} onClick={ () => Player.actions.skipTo(track) }/>
                ))
              : (<MenuItem primaryText="Go add something to your queue!" />)
            }
          </IconMenu>

          <IconButton iconClassName="fa fa-step-backward"
                      disabled={ !hasNext }
                      touch={ true }
                      tooltipPosition="top-center"
                      onClick={ () => this.previousTrack() } />

          <IconButton iconClassName={ playing ? "fa fa-pause" : hasNext ? "fa fa-play" : "fa fa-stop" }
                      disabled={ !hasNext }
                      touch={ true }
                      tooltipPosition="top-center"
                      onClick={ () => playing && hasNext ? this.pause() : this.play() } />

          <IconButton iconClassName="fa fa-step-forward"
                      disabled={ !hasNext }
                      touch={ true }
                      tooltipPosition="top-center"
                      onClick={ () => this.nextTrack() } />

          <IconButton iconClassName={ repeat && playing ? "fa fa-repeat fa-spin" : "fa fa-repeat" }
                      disabled={ !hasNext }
                      tooltip="repeat"
                      touch={ true }
                      tooltipPosition="top-center"
                      onClick={ () => this.setState({ repeat: !repeat }) } />

      </section>
    );
  }
}


Controls.propTypes = {
  enabled: React.PropTypes.bool,
  playing: React.PropTypes.bool,
  onPlay: React.PropTypes.func.isRequired,
  onPause: React.PropTypes.func.isRequired,
  onNext: React.PropTypes.func,
  onPrevious: React.PropTypes.func,
};

Controls.defaultProps = {
  playing: false,
  enabled: false,
  queue: []
};

