import React from 'react';
import {AppRegistry, Text, View} from 'react-vr';
import HUD from './HUD.react';
// var echarts = require('echarts');
// 加载 Highmaps
// var Highcharts = require('highcharts/highmaps.src.js');

// // 加载 proj4，用于将经纬度转换成坐标值
// var proj4 = require('./proj4.js');
const ReactHighcharts = require('react-highcharts');
const config = {
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  series: [{
    data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
  }]
};

class MultiRootExample extends React.Component {
  render() {
    return (
      <View>
        <Text
          style={{
            backgroundColor: '#777879',
            fontSize: 0.8,
            fontWeight: '400',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [0, 0, -3]}],
          }}>
          Main Scene
        </Text>
        <ReactHighcharts config = {config}></ReactHighcharts>
      </View>
    );
  }
}

// Make the HUD component available to mount
AppRegistry.registerComponent('HUD', () => HUD);
AppRegistry.registerComponent('text', () => MultiRootExample);
