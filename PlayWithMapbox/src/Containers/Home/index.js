import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Config } from '../../config'

import Map from '../../Components/Map'
import CenterDetail from '../../Components/Map/CenterDetail'

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

    this.state = {
      centerMapDetail: {
        latitude: 0,
        longitude: 0,
        zoomLevel: 0
      }
    }

    this.centerMapDetail = {
      latitude: 0,
      longitude: 0,
      zoomLevel: 0
    }
  }

  onUpdateUserLocation = (location) => {

    let { latitude, longitude } = location
    this._map.setCenterCoordinateZoomLevel(latitude, longitude, ZOOM_LEVEL, true)

  }

  onRegionDidChange = (location) => {
    let { latitude, longitude, zoomLevel } = location

    this.centerMapDetail = {
      latitude, longitude, zoomLevel
    }

    this.setState({
      centerMapDetail: {
        latitude, longitude, zoomLevel
      }
    })
  }

  getAnnotation = () => {
    
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
          onRegionDidChange={this.onRegionDidChange}
          logoIsHidden={true}
          attributionButtonIsHidden={true}
        />
        <CenterDetail center={this.centerMapDetail} />
      </View>
    )
  }
}