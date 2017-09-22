

'use strict';

import React from 'react';
import {
  AppRegistry,
  AmbientLight,
  Model,
  asset,
  LiveEnvCamera,
  View,
  Pano,
  Text,
  VrButton
} from 'react-vr';

class VideoSample extends React.Component {
  componentDidMount(){
  }
  render() {
    return (
      <View>
        
         {/* <LiveEnvCamera>
          <View 
          style={{transform:[{translate:[-10,0,-20]}]}} 
          >
              
              <Text style={{fontSize:2,color:'red'}}>my name is LiuCheng </Text>
              <VrButton 
              onLayout={(e)=>{
            console.log(e.nativeEvent)
            }}
                style={{backgroundColor:'white',alignItems:'center',justifyContent:'center',width:10,height:5}}>
                <Text style={{color:'black',fontSize:5}}>pins</Text>
              </VrButton>
          </View>
        
        </LiveEnvCamera>  */}
      <AmbientLight style={{color:'#222222'}}/>
      </View>
      
    )
  }
}

AppRegistry.registerComponent('VideoSample', () => VideoSample);
