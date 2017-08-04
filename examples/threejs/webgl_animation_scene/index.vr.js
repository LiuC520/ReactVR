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
    AmbientLight,

} from 'react-vr';


class VideoSample extends React.Component {

  render() {
    return (
      <View>
        <AmbientLight style={{color:'#404040',transform: [{translate:  [-10, 3.43, 11.31]}],}}/>

         {/* <Pano source={asset('chess-world.jpg')}/>  */}
      </View>
    );
  }
}

AppRegistry.registerComponent('VideoSample', () => VideoSample);
