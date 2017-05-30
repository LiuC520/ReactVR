import React from 'react';
import {
  Animated,
  AmbientLight,
  AppRegistry,
  asset,
  StyleSheet,
  Pano,
  Text,
  View,
  Image,
  Video, 
  VideoControl, 
  MediaPlayerState,
  Sound
} from 'react-vr';

import CityData from './components/json/city2.json';
import GetData from './components/FetchData';
import CylindricalPanel from 'CylindricalPanel';


class TianQi extends React.Component {
  constructor(props) {
    super(props);

    this.spaceSkymap = [
      '../static_assets/space/space_right.png',
      '../static_assets/space/space_left.png',
      '../static_assets/space/space_up.png',
      '../static_assets/space/space_down.png',
      '../static_assets/space/space_back.png',
      '../static_assets/space/space_front.png',
    ];

    this.state = {
      currentIndex : 0,
      weather:null,
      playerState: new MediaPlayerState({autoPlay: true, muted: true}), // init with muted, autoPlay
    };
  }

  componentDidMount() {
    GetData.getData('',true).then(d=>{
      console.log(d)
      console.log(d.content.address_detail.city)
      for(let i = 0;i<CityData.length;i++){
        if(CityData[i]['d4'] === d.content.address_detail.city){
          GetData.getData(CityData[i]['d1'])
            .then(d=>{
              this.setState({
                currentIndex:i,
                weather:d,
              })
            })
            .catch(e=>{
              console.log(e)
            })
        }
      }
    })
    .catch(e=>console.log(e))
  }

  render() {
    var r = 10; // 半径
    du = -90
    // console.log(GetData.getX(r,du))
    // console.log(GetData.getZ(r,du))
    let i = this.state.currentIndex
    let d = CityData[i]
    return (
      <View>
        <AmbientLight intensity={0.85} />
        <Pano source={{uri:this.spaceSkymap}} />
        
        {/*<CylindricalPanel 
            layer={{width: 2000, height: 800}} 
            style={{position: 'absolute'}}
            radius={80}
            density={100}>
        {
        this.state.weather !== null ?
          <Image
              style={Styles.cityTextView}
              source={asset('night.jpg')}
            >
            <View style={Styles.cityView}>
                <Text style={Styles.citytext}>天气预报 </Text>
                <Text style={Styles.citytext}>{d.d4}<Text style={Styles.wheathertext2}></Text></Text>
              </View>
              
            
                  <View >
                    <Text style={[Styles.wheathertext3]}>{this.state.weather.forecast[1].day['wthr']}</Text>
                    <Text style={Styles.wheathertext}>现在温度：
                      <Text style={[Styles.wheathertext2,{marginRight:2}]}>{this.state.weather.observe.temp}°</Text>
                    </Text>
                    <Text style={Styles.wheathertext}>温度范围：
                      <Text style={[Styles.wheathertext2]}>{this.state.weather.forecast[1].low}°-{this.state.weather.forecast[1].high}°</Text>
                    </Text>
                    <Text style={Styles.wheathertext}>体感温度：<Text style={Styles.wheathertext2}>{this.state.weather.observe.tigan}° </Text></Text>
                    <Text style={Styles.wheathertext}>湿度：<Text style={Styles.wheathertext2}>{this.state.weather.observe.shidu} </Text></Text>
                    <Text style={Styles.wheathertext}>风向：<Text style={Styles.wheathertext2}>{this.state.weather.observe.wd} {this.state.weather.observe.wp}</Text></Text>
      
                    <Text style={Styles.wheathertext1}>React VR中文网：www.vr-react.com </Text>
                    <Text style={Styles.wheathertext1}>好大一面广告墙，大家可以用这个打广告挣钱了哦 </Text>
                  
                  </View>
            </Image>:null
            }
           
        </CylindricalPanel>*/}
            {/*<Sound source={asset('mp4/shehuiyao.mp3')} loop={true}/>*/}
       <View
              style={{
                alignItems: 'center',
                layoutOrigin: [0.5, 0.5, 0],
                transform: [{translate: [0, 0, 10]},{rotateY:0}],
              }}>
              <Video
                style={{height: 10, width: 16}}
                source={[
                  asset('mp4/5E04015B7DD57E678CC2895E5E4E7764.mp4', {format: 'mp4'}),
                ]}
                playerState={this.state.playerState}
              />
              <VideoControl style={{height: 0.4, width: 10}} playerState={this.state.playerState} />
            </View>
      </View>
    );
  }
}
const Styles = StyleSheet.create({
  CylindricalPanelView:{
    transform: [{translate: [-2, 3, -200]}],
    position:'absolute',
  },
  cityTextView:{
    backgroundColor: 'white',
    opacity: 1,
    width: 2000,
    height: 800,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  cityView:{
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  citytext:{
      fontSize: 80,
      fontWeight: '400',
      paddingLeft: 0.2,
      paddingRight: 0.2,
      // textAlign: 'center',
      // textAlignVertical: 'center',
      color:'white'
    },

    wheathertext:{
       fontSize: 50,
      paddingLeft: 0.2,
      paddingRight: 0.2,
      textAlign: 'center',
      // textAlignVertical: 'center',
      color:'white'
    },
    wheathertext1:{
       fontSize: 100,
      paddingLeft: 0.2,
      paddingRight: 0.2,
      textAlign: 'center',
      color:'white',
      marginTop:0.2,
      fontWeight: '400',
      
    },
    wheathertext2:{
       fontSize: 100,
      paddingLeft: 0.2,
      paddingRight: 0.2,
      textAlign: 'center',
      color:'orange',
      marginTop:0.2,
      fontWeight: '400',
      
    },
    wheathertext3:{
       fontSize: 60,
      textAlign: 'center',
      color:'orange',
      fontWeight: '400',
      
    }
})

AppRegistry.registerComponent('TianQi', () => TianQi);
