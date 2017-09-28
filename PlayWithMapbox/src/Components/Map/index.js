import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Mapbox, { MapView } from 'react-native-mapbox-gl'
import { Config } from '../../config'

const accessToken = Config.map.accessToken
Mapbox.setAccessToken(accessToken);

export default class Map extends Component {

  setZoomLevel = (zoomLevel, animated = true, callback = ()=>{}) => {
    // console.log('setZoomLevel')
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
      />
    )
  }
}