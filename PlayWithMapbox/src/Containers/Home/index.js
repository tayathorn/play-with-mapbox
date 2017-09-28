import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Map from '../../Components/Map'

export default class Home extends Component {
  render() {
    return(
      <View style={{flex:1}}>
        <Map
          ref={map => { this._map = map; }}
          style={{flex:1}}
          initialZoomLevel={0}
          initialDirection={0}
          rotateEnabled={true}
          scrollEnabled={true}
          zoomEnabled={true}
          showsUserLocation={false}
        />
    </View>
    )
  }
}