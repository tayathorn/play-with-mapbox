import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Map from '../../Components/Map'
import { Config } from '../../config'

const initialMap = {
  zoom: 0,
  center: {
    latitude: 0,
    longitude: 0,
  },
}

const ZOOM_LEVEL = 15

export default class Home extends Component {
  constructor() {
    super()
  }

  onUpdateUserLocation = (res) => {

    let { latitude, longitude } = res
    this._map.setCenterCoordinateZoomLevel(latitude, longitude, ZOOM_LEVEL, true)
    
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Map
          ref={map => { this._map = map; }}
          style={{ flex: 1 }}
          initialZoomLevel={initialMap.zoom}
          initialCenterCoordinate={initialMap.center}
          initialDirection={0}
          rotateEnabled={true}
          scrollEnabled={true}
          pitchEnabled={false}
          zoomEnabled={true}
          showsUserLocation={true}
          styleURL={Config.map.styleUrl}
          onUpdateUserLocation={this.onUpdateUserLocation}
        />
      </View>
    )
  }
}