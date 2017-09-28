import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Mapbox, { MapView } from 'react-native-mapbox-gl'

const accessToken = 'Access-Token'
Mapbox.setAccessToken(accessToken);

export default class Map extends Component {
  render() {
    return(
      <View style={{flex:1}}>
        <MapView 
          ref={map => { this._map = map; }}
          style={{flex:1}}
          initialZoomLevel={0}
          initialDirection={0}
          rotateEnabled={true}
          scrollEnabled={true}
          zoomEnabled={true}
          showsUserLocation={false}
          styleURL={Mapbox.mapStyles.dark}
        />
      </View>
    )
  }
}