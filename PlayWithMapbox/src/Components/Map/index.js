import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Mapbox, { MapView, Annotation } from 'react-native-mapbox-gl'
import { Config } from '../../config'

const accessToken = Config.map.accessToken
Mapbox.setAccessToken(accessToken);

export default class Map extends Component {

  setZoomLevel = (zoomLevel, animated = true, callback = ()=>{}) => {
    this._map.setZoomLevel(zoomLevel, animated, callback)
  }

  setCenterCoordinateZoomLevel = (latitude, longitude, zoomLevel, animated = true, callback = ()=>{}) => {
    this._map.setCenterCoordinateZoomLevel(latitude, longitude, zoomLevel, animated, callback)
  }

  render() {
    return(
      <MapView 
        ref={map => { this._map = map; }}
        {...this.props}
      >
        <Annotation
          id="annotation1"
          coordinate={{latitude: 13.726286, longitude: 100.5252063057}}
          style={{alignItems: 'center', justifyContent: 'center', position: 'absolute'}}
        >
        <View style={{width: 100, height: 100, borderWidth: 4, borderColor: 'blue', borderRadius: 50, backgroundColor: 'white', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>React View</Text>
        </View>
        </Annotation>
      </MapView>
    )
  }
}