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
} from 'react-vr';

import CylindricalPanel from 'CylindricalPanel';


class react_vr_flyingbird extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <View>
        <AmbientLight intensity={0.85} />
        <Pano source={asset('chess-world.jpg')} />
            <Text style={Styles.citytext}>React VR中文网：www.vr-react.com </Text>
            <Text style={Styles.citytext}>刘成 </Text>
      </View>
    );
  }
}
const Styles = StyleSheet.create({
  citytext:{
      backgroundColor: 'grey',
      fontSize: 0.8,
      fontWeight: '400',
      paddingLeft: 0.2,
      paddingRight: 0.2,
      textAlign: 'center',
      textAlignVertical: 'center',
      color:'white',
    transform: [{translate: [-6, 3, -10]}],
      
    }
})

AppRegistry.registerComponent('react_vr_flyingbird', () => react_vr_flyingbird);
