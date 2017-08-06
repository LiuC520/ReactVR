

'use strict';

import React from 'react';
import {
  AppRegistry,
} from 'react-vr';

class VideoSample extends React.Component {
  componentDidMount(){
    window.postMessage({type:'focalLength',data:135})//1-135
    window.postMessage({type:'fstops',data:1.8}) //1.8-22
    window.postMessage({type:'showFocus',data:true}) //fasle true
  }
  render() {
    return null
  }
}

AppRegistry.registerComponent('VideoSample', () => VideoSample);
