'use strict';

import React from 'react';
import $ from 'jquery';

import { Slider } from 'material-ui';

import './seekbar.less';

export default class Seekbar extends React.Component {
  constructor(){
    super();
    this.state = { seeking: false };
  }

  onSeekEnd(evt){
    const { onSeekEnd } = this.props;

    if (onSeekEnd)
      onSeekEnd(/* new current time */);
  }

  onSeekStart(){
    const { onSeekStart, currentTime } = this.props;

    if (onSeekStart)
      onSeekStart(currentTime);
  }

  seek(evt, time){
    const { onSeek } = this.props;

    if (onSeek)
      onSeek(time);
  }

  render(){
    const { enabled, duration, currentTime } = this.props;

    return (
          <Slider name="audio-seeker"
                  style={{ margin: "0 5px 5px 5px" }}
                  disabled={ !enabled }
                  step={ 1 } // 1 second
                  max={ duration } // in seconds
                  value={ currentTime }
                  onChange={ this.seek.bind(this) }
                  onDragStart={ (evt, other) => this.onSeekStart() }
                  onDragStop={ (evt, other) => this.onSeekEnd(other) }
                />
      );
  }
}

Seekbar.propTypes = {
  onSeek: React.PropTypes.func,
  onSeekStart: React.PropTypes.func,
  onSeekEnd: React.PropTypes.func,
  duration: React.PropTypes.number,
  currentTime: React.PropTypes.number,
  enabled: React.PropTypes.bool
};

Seekbar.defaultProps = {
  enabled: false,
  currentTime: 0,
  duration: 0,
};
