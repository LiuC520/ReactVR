/**
 * The examples provided by Oculus are for non-commercial testing and
 * evaluation purposes only.
 *
 * Oculus reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * OCULUS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

'use strict';

/**
 * VideoSample displays a flat 2d video, along with a video control component.
 * 
 * The video can be controlled by the video control component. To do this, a 
 * MediaPlayerState is created and hooked to video and video control component.
 * See [MediaPlayerState](docs/mediaplayerstate.html)
 */

import React from 'react';
import {
  asset,
  AppRegistry,
  Pano,
  View,
  NativeModules,
  VrButton,
  Text
} from 'react-vr';

const changModule = NativeModules.ChangModule;

class VideoSample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wind:false,
      pins:true
    };
  }
//是否有风
wind=()=>{
  this.setState({wind:!this.state.wind},function(e){
    changModule.changeWind(this.state.wind)
  })
}

//是否显示球
pins=()=>{
  this.setState({pins:!this.state.pins},function(e){
    changModule.changPins()
  })
}

  render() {
    return (
      <View>
        <VrButton 
          style={{backgroundColor:'white',alignItems:'center',justifyContent:'center',width:100,height:50,transform:[{translate:[0,200,0]}]}}
          onClick={ this.wind }>
          <Text style={{color:'black',fontSize:30}}>wind</Text>
        </VrButton>

        <VrButton 
          style={{backgroundColor:'white',alignItems:'center',justifyContent:'center',width:100,height:50,transform:[{translate:[0,320,0]}]}}
          onClick={ this.pins }>
          <Text style={{color:'black',fontSize:30}}>pins</Text>
        </VrButton>
      </View>
    );
  }
}

AppRegistry.registerComponent('VideoSample', () => VideoSample);
