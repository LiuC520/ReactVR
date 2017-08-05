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
  VrButton,
  Text,

} from 'react-vr';
let count = 0 ;
let runwalk = ['walk_to_idle','idle_to_walk','walk_to_run','run_to_walk']
let buttons=['run/walk','singlestep','pause/continue','showModel','modifyTimeScale']
class VideoSample extends React.Component {
  constructor(props){
    super(props)
    this.state={show:true}
  }

  //是否有风
  button1=()=>{
    let data;
    if(count % 4 == 0){
      data = runwalk[0]
    }else if((count-1) % 4 == 0){
      data = runwalk[1]
    }else if((count-2) % 4 == 0){
      data = runwalk[2]
    }else if((count-3) % 4 == 0){
      data = runwalk[3]
    }
    window.postMessage({type:'prepareCrossFade',data:data})
    count++;
  }
  //步进
  button2=()=>{
    window.postMessage({type:'singlestep'})
  }
  //暂停播放
  button3=()=>{
    window.postMessage({type:'pauseContinue'})
  }
//显示模型
  button4=()=>{
    this.setState({show:!this.state.show},function(e){
      window.postMessage({type:'showModel',data:this.state.show})
    })
  }
//显示骨骼，这里有点儿问题，骨骼不会随着模型一起动，官网是可以一起动的
  button5=()=>{
    this.setState({show:!this.state.show},function(e){
      window.postMessage({type:'showSkeleton',data:this.state.show})
    })
  }
//调整时间范围的，从0开始，越大，步子越快
  button6=()=>{
    window.postMessage({type:'modifyTimeScale',data:'15'})
  }

  render() {
    let func = [this.button1,this.button2,this.button3,this.button4,this.button6]
    return (
      <View>
        <AmbientLight style={{color:'#ffffff',transform: [{translate:  [-10, 3.43, 11.31]}],}}/>
          <Pano source={asset('chess-world.jpg')}/>  
          {
            buttons.map((d,i)=>{
              return(
                <VrButton 
                  key={i+d}
                  style={{backgroundColor:'white',alignItems:'center',justifyContent:'center',width:1.6,height:0.4,transform:[{translate:[2,2.4-i*0.4,-10]}]}}
                  onClick={ func[i] }>
                  <Text style={{color:'black',fontSize:0.2}}>{d}</Text>
                </VrButton>
              )
            })
          }
      </View>
    );
  }
}

AppRegistry.registerComponent('VideoSample', () => VideoSample);
