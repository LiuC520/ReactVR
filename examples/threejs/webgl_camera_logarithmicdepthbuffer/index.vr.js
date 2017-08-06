

'use strict';

import React from 'react';
import {
  AppRegistry,
  AmbientLight
} from 'react-vr';

class VideoSample extends React.Component {
  componentDidMount(){
  }
  render() {
    return (
      <AmbientLight style={{color:'#222222'}}/>
    )
  }
}

AppRegistry.registerComponent('VideoSample', () => VideoSample);
