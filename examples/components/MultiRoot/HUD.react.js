import React from 'react';
import {Text, View} from 'react-vr';

/**
 * Simple component designed to be mounted directly to the camera
 */

export default class HUD extends React.Component {
  render() {
    return (
      <View
        style={{
        }}>
        <Text
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            fontSize: 0.1,
            fontWeight: '400',
            layoutOrigin: [0.5, 0],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [0, 0.5, -1]}],
          }}>
          HUD ({this.props.message})
        </Text>
      </View>
    );
  }
}