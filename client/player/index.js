'use strict';

import React from 'react';
import { findDOMNode } from 'react-dom'

import { IconButton } from 'material-ui';
import Seekbar from './seekbar.js';
import PlayerControls from './controls.js';


import { Player } from '../stores';

import './player.less';


export default class extends React.Component {
  constructor(){
    super();
    this.state = { track: { title: "", link: "" }, queue: [], currentTime: 0, duration: 1, buffering: false };
  }

  componentDidMount(){
    const audioSource = this.audioSource = findDOMNode(this.refs.audioSource);

    var { audioCurrentTime, audioDuration } = audioSource;
    this.setState({ currentTime: audioCurrentTime, duration: audioDuration });

    audioSource.addEventListener('timeupdate', () => {
      this.setState({ currentTime: audioSource.currentTime, duration: audioSource.duration, buffering: false });
    });

    this.audioSource.addEventListener('ended', () => {
      const { queue, playing, repeat } = this.state;

      if (canRepeat)
        Player.actions.next();
      else
        this.setState({ playing: false, buffering: false });
    });

    Player.store.on('change', () => {
      const { queue: currentQueue, playing } = this.state;
      const track = Player.store.getCurrentlyPlaying();
      const queue = Player.store.getQueue();
      this.setState({ queue, track });

      this.play();
    });

  }

  seekTo(time){
    this.audioSource.currentTime = time;
    this.setState({ currentTime: time, buffering: true });
  }

  play(){
    if(this.audioSource){
      this.audioSource.play();
      this.setState({ playing: true });
    }
  }

  pause(){
    if(this.audioSource){
      this.audioSource.pause();
      this.setState({ playing: false });
    }
  }

  render(){
    const { queue, currentTime, duration, track, playing, buffering  } = this.state;
    const canPlay = queue.length > 0;

    return (
      <section id="player">
        <Seekbar enabled={ canPlay && !buffering }
                 currentTime={ currentTime }
                 duration={ duration }
                 onSeek={ time => this.seekTo(time) } />

        <h2 className="currentlyPlayingTitle"> { track.title } </h2>

        <PlayerControls enabled={ canPlay }
                        playing={ playing }
                        queue={ queue }
                        onPlay={ this.play.bind(this) }
                        onPause={ this.pause.bind(this) }
                    />

        <audio ref="audioSource" src={ track.downloadLink } />
      </section>
    );
  }
}

